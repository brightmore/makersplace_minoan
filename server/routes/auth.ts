import { Router, Request, Response } from 'express';
import crypto from 'node:crypto';
import { db, hashPassword, verifyPassword } from '../db.js';

export const authRouter = Router();

interface AdminUserRow {
  id: number;
  email: string;
  name: string;
  password_hash: string;
  salt: string;
  role: string;
  created_at: string;
  updated_at: string;
}

// POST /api/auth/login
authRouter.post('/login', (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({ success: false, error: 'Email and password are required.' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = db.prepare('SELECT * FROM admin_users WHERE LOWER(email) = ?').get(normalizedEmail) as AdminUserRow | undefined;

    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid credentials. Access denied.' });
    }

    const isMatch = verifyPassword(password, user.password_hash, user.salt);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials. Access denied.' });
    }

    // Generate Session Token (64-char random hex)
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(); // 7 days

    db.prepare(`
      INSERT INTO admin_sessions (token, user_id, expires_at)
      VALUES (?, ?, ?)
    `).run(token, user.id, expiresAt);

    res.json({
      success: true,
      message: 'Access granted. Welcome to MINOAN Tournament Control.',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('[API Auth] Login error:', error);
    res.status(500).json({ success: false, error: 'Internal server error during authentication.' });
  }
});

// POST /api/auth/register
authRouter.post('/register', (req: Request, res: Response) => {
  try {
    const { email, name, password, role = 'scrutineer' } = req.body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return res.status(400).json({ success: false, error: 'Valid organizer email address is required.' });
    }
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({ success: false, error: 'Full staff name is required.' });
    }
    if (!password || typeof password !== 'string' || password.length < 6) {
      return res.status(400).json({ success: false, error: 'Password must be at least 6 characters.' });
    }

    const validRoles = ['superadmin', 'lead_referee', 'scrutineer', 'coordinator'];
    const assignedRole = validRoles.includes(role) ? role : 'scrutineer';

    const normalizedEmail = email.trim().toLowerCase();

    // Check if email already registered
    const existing = db.prepare('SELECT id FROM admin_users WHERE LOWER(email) = ?').get(normalizedEmail);
    if (existing) {
      return res.status(409).json({ success: false, error: 'An admin account with this email address already exists.' });
    }

    const { hash, salt } = hashPassword(password);

    const result = db.prepare(`
      INSERT INTO admin_users (email, name, password_hash, salt, role)
      VALUES (?, ?, ?, ?, ?)
    `).run(normalizedEmail, name.trim(), hash, salt, assignedRole);

    const newUserId = Number(result.lastInsertRowid);

    // Auto-login session
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

    db.prepare(`
      INSERT INTO admin_sessions (token, user_id, expires_at)
      VALUES (?, ?, ?)
    `).run(token, newUserId, expiresAt);

    res.status(201).json({
      success: true,
      message: 'Admin staff account successfully registered.',
      token,
      user: {
        id: newUserId,
        email: normalizedEmail,
        name: name.trim(),
        role: assignedRole,
      },
    });
  } catch (error) {
    console.error('[API Auth] Register error:', error);
    res.status(500).json({ success: false, error: 'Internal server error creating admin account.' });
  }
});

// GET /api/auth/me - Verify current session
authRouter.get('/me', (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, error: 'No authorization token provided.' });
    }

    const token = authHeader.split(' ')[1];
    const row = db.prepare(`
      SELECT s.token, s.expires_at, u.id, u.email, u.name, u.role, u.created_at
      FROM admin_sessions s
      JOIN admin_users u ON s.user_id = u.id
      WHERE s.token = ? AND datetime(s.expires_at) > datetime('now')
    `).get(token) as { id: number; email: string; name: string; role: string; created_at: string } | undefined;

    if (!row) {
      return res.status(401).json({ success: false, error: 'Session expired or invalid.' });
    }

    res.json({
      success: true,
      user: {
        id: row.id,
        email: row.email,
        name: row.name,
        role: row.role,
        createdAt: row.created_at,
      },
    });
  } catch (error) {
    console.error('[API Auth] /me error:', error);
    res.status(500).json({ success: false, error: 'Internal server error verifying session.' });
  }
});

// POST /api/auth/logout
authRouter.post('/logout', (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      db.prepare('DELETE FROM admin_sessions WHERE token = ?').run(token);
    }
    res.json({ success: true, message: 'Logged out successfully.' });
  } catch (error) {
    console.error('[API Auth] Logout error:', error);
    res.status(500).json({ success: false, error: 'Internal server error during logout.' });
  }
});

// GET /api/auth/users - List admin staff
authRouter.get('/users', (_req: Request, res: Response) => {
  try {
    const users = db.prepare(`
      SELECT id, email, name, role, created_at FROM admin_users ORDER BY created_at ASC
    `).all();

    res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error('[API Auth] List users error:', error);
    res.status(500).json({ success: false, error: 'Internal server error listing admin staff.' });
  }
});

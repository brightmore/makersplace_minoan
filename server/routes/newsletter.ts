import { Router, Request, Response } from 'express';
import { db } from '../db.js';

export const newsletterRouter = Router();

interface SubscriberRow {
  id: number;
  email: string;
  status: string;
  source: string;
  created_at: string;
  updated_at: string;
}

// POST /api/newsletter/subscribe - Subscribe to newsletter
newsletterRouter.post('/subscribe', (req: Request, res: Response) => {
  try {
    const { email, source = 'footer_bulletin' } = req.body;

    if (!email || typeof email !== 'string' || !email.includes('@') || email.length < 5) {
      return res.status(400).json({ success: false, error: 'Please provide a valid email address.' });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check existing
    const existing = db.prepare('SELECT * FROM newsletter_subscribers WHERE email = ?').get(normalizedEmail) as SubscriberRow | undefined;

    if (existing) {
      if (existing.status === 'active') {
        return res.status(200).json({
          success: true,
          alreadySubscribed: true,
          message: 'You are already registered for official tournament bulletins!',
        });
      } else {
        // Resubscribe
        db.prepare(`
          UPDATE newsletter_subscribers 
          SET status = 'active', updated_at = datetime('now')
          WHERE id = ?
        `).run(existing.id);

        return res.status(200).json({
          success: true,
          message: 'Welcome back! Your bulletin subscription has been reactivated.',
        });
      }
    }

    // New subscriber
    db.prepare(`
      INSERT INTO newsletter_subscribers (email, status, source)
      VALUES (?, 'active', ?)
    `).run(normalizedEmail, String(source));

    res.status(201).json({
      success: true,
      message: 'Subscribed to official Accra tournament bulletins!',
    });
  } catch (error) {
    console.error('[API] Error subscribing to newsletter:', error);
    res.status(500).json({ success: false, error: 'Internal server error subscribing to newsletter.' });
  }
});

// POST /api/newsletter/unsubscribe - Unsubscribe
newsletterRouter.post('/unsubscribe', (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ success: false, error: 'Valid email is required to unsubscribe.' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existing = db.prepare('SELECT id FROM newsletter_subscribers WHERE email = ?').get(normalizedEmail) as { id: number } | undefined;

    if (existing) {
      db.prepare(`
        UPDATE newsletter_subscribers 
        SET status = 'unsubscribed', updated_at = datetime('now')
        WHERE id = ?
      `).run(existing.id);
    }

    res.json({
      success: true,
      message: 'You have been unsubscribed from the MINOAN tournament newsletter.',
    });
  } catch (error) {
    console.error('[API] Error unsubscribing:', error);
    res.status(500).json({ success: false, error: 'Internal server error processing unsubscription.' });
  }
});

// GET /api/newsletter/subscribers - List subscribers
newsletterRouter.get('/subscribers', (req: Request, res: Response) => {
  try {
    const { search, status = 'all', page = '1', limit = '50' } = req.query;

    const pageNum = Math.max(1, parseInt(String(page), 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(String(limit), 10) || 50));
    const offset = (pageNum - 1) * limitNum;

    const conditions: string[] = [];
    const params: (string | number)[] = [];

    if (search && typeof search === 'string' && search.trim()) {
      conditions.push('email LIKE ?');
      params.push(`%${search.trim().toLowerCase()}%`);
    }

    if (status && typeof status === 'string' && status !== 'all') {
      conditions.push('status = ?');
      params.push(status);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const countRes = db.prepare(`SELECT COUNT(*) as total FROM newsletter_subscribers ${whereClause}`).get(...params) as { total: number };
    const total = countRes?.total || 0;

    const rows = db.prepare(`
      SELECT * FROM newsletter_subscribers
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `).all(...params, limitNum, offset) as SubscriberRow[];

    res.json({
      success: true,
      data: rows,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum) || 1,
      },
    });
  } catch (error) {
    console.error('[API] Error listing subscribers:', error);
    res.status(500).json({ success: false, error: 'Internal server error listing subscribers.' });
  }
});

// DELETE /api/newsletter/subscribers/:id - Remove subscriber
newsletterRouter.delete('/subscribers/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const existing = db.prepare('SELECT email FROM newsletter_subscribers WHERE id = ?').get(id) as { email: string } | undefined;

    if (!existing) {
      return res.status(404).json({ success: false, error: 'Subscriber not found.' });
    }

    db.prepare('DELETE FROM newsletter_subscribers WHERE id = ?').run(id);

    res.json({
      success: true,
      message: `Subscriber ${existing.email} removed.`,
    });
  } catch (error) {
    console.error('[API] Error deleting subscriber:', error);
    res.status(500).json({ success: false, error: 'Internal server error deleting subscriber.' });
  }
});

// GET /api/newsletter/export/csv - Download subscriber CSV
newsletterRouter.get('/export/csv', (_req: Request, res: Response) => {
  try {
    const rows = db.prepare('SELECT * FROM newsletter_subscribers ORDER BY created_at DESC').all() as SubscriberRow[];

    const headers = ['ID', 'Email', 'Status', 'Source', 'Subscribed At', 'Updated At'];
    const escapeCsv = (val: unknown) => `"${String(val ?? '').replace(/"/g, '""')}"`;

    const csvLines = [headers.join(',')];
    for (const row of rows) {
      csvLines.push([
        escapeCsv(row.id),
        escapeCsv(row.email),
        escapeCsv(row.status),
        escapeCsv(row.source),
        escapeCsv(row.created_at),
        escapeCsv(row.updated_at),
      ].join(','));
    }

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="mrc27_newsletter_subscribers_${Date.now()}.csv"`);
    res.send(csvLines.join('\r\n'));
  } catch (error) {
    console.error('[API] Error exporting subscribers CSV:', error);
    res.status(500).json({ success: false, error: 'Internal server error generating CSV.' });
  }
});

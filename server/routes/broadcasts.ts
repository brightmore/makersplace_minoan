import { Router, Request, Response } from 'express';
import { db } from '../db.js';

export const broadcastsRouter = Router();

interface BroadcastRow {
  id: number;
  title: string;
  subject: string;
  category: string;
  content: string;
  target_audience: string;
  sent_count: number;
  status: string;
  created_at: string;
}

// GET /api/broadcasts - List broadcast bulletins
broadcastsRouter.get('/', (_req: Request, res: Response) => {
  try {
    const rows = db.prepare(`
      SELECT * FROM newsletter_broadcasts ORDER BY created_at DESC
    `).all() as BroadcastRow[];

    res.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error('[API] Error fetching broadcasts:', error);
    res.status(500).json({ success: false, error: 'Internal server error fetching broadcasts.' });
  }
});

// POST /api/broadcasts - Send a new broadcast bulletin
broadcastsRouter.post('/', (req: Request, res: Response) => {
  try {
    const { title, subject, category = 'general', content, targetAudience = 'all' } = req.body;

    if (!title || typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ success: false, error: 'Broadcast title is required.' });
    }
    if (!subject || typeof subject !== 'string' || !subject.trim()) {
      return res.status(400).json({ success: false, error: 'Broadcast email subject is required.' });
    }
    if (!content || typeof content !== 'string' || !content.trim()) {
      return res.status(400).json({ success: false, error: 'Broadcast message content is required.' });
    }

    // Determine target recipient count
    let recipientCount = 0;
    if (targetAudience === 'all' || targetAudience === 'newsletter_only') {
      const subCountRes = db.prepare(`
        SELECT COUNT(DISTINCT email) as count FROM newsletter_subscribers WHERE status = 'active'
      `).get() as { count: number };
      recipientCount += subCountRes?.count || 0;
    }

    if (targetAudience === 'all' || targetAudience === 'team_mentors') {
      const mentorCountRes = db.prepare(`
        SELECT COUNT(DISTINCT lead_contact_email) as count FROM registrations
      `).get() as { count: number };
      recipientCount += mentorCountRes?.count || 0;
    }

    const insertStmt = db.prepare(`
      INSERT INTO newsletter_broadcasts (
        title, subject, category, content, target_audience, sent_count, status
      ) VALUES (?, ?, ?, ?, ?, ?, 'sent')
    `);

    const result = insertStmt.run(
      title.trim(),
      subject.trim(),
      category,
      content.trim(),
      targetAudience,
      recipientCount
    );

    const newBroadcast = db.prepare('SELECT * FROM newsletter_broadcasts WHERE id = ?').get(Number(result.lastInsertRowid)) as BroadcastRow;

    res.status(201).json({
      success: true,
      message: `Broadcast bulletin dispatched to ${recipientCount} recipients.`,
      data: newBroadcast,
    });
  } catch (error) {
    console.error('[API] Error creating broadcast:', error);
    res.status(500).json({ success: false, error: 'Internal server error sending broadcast.' });
  }
});

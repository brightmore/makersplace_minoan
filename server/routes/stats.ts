import { Router, Request, Response } from 'express';
import { db } from '../db.js';

export const statsRouter = Router();

// GET /api/stats/overview - Consolidated organizer telemetry dashboard metrics
statsRouter.get('/overview', (_req: Request, res: Response) => {
  try {
    const totalTeamsRes = db.prepare('SELECT COUNT(*) as count FROM registrations').get() as { count: number };
    const totalAthletesRes = db.prepare('SELECT COALESCE(SUM(team_size), 0) as count FROM registrations').get() as { count: number };
    const totalSubscribersRes = db.prepare(`SELECT COUNT(*) as count FROM newsletter_subscribers WHERE status = 'active'`).get() as { count: number };
    const totalBroadcastsRes = db.prepare('SELECT COUNT(*) as count FROM newsletter_broadcasts').get() as { count: number };

    // Registration statuses
    const statusRows = db.prepare(`
      SELECT status, COUNT(*) as count FROM registrations GROUP BY status
    `).all() as { status: string; count: number }[];

    // Division breakdown
    const divisionRows = db.prepare(`
      SELECT division, COUNT(*) as count FROM registrations GROUP BY division
    `).all() as { division: string; count: number }[];

    // Region breakdown
    const regionRows = db.prepare(`
      SELECT city_region, COUNT(*) as count FROM registrations GROUP BY city_region ORDER BY count DESC
    `).all() as { city_region: string; count: number }[];

    // Sport discipline breakdown
    const sportRows = db.prepare(`
      SELECT sport_id, COUNT(*) as count FROM registration_sports GROUP BY sport_id ORDER BY count DESC
    `).all() as { sport_id: string; count: number }[];

    // Recent 5 registrations
    const recentRegistrations = db.prepare(`
      SELECT id, registration_code, team_name, organization_name, division, city_region, status, created_at
      FROM registrations
      ORDER BY created_at DESC
      LIMIT 5
    `).all();

    res.json({
      success: true,
      data: {
        totalTeams: totalTeamsRes?.count || 0,
        totalAthletes: totalAthletesRes?.count || 0,
        activeSubscribers: totalSubscribersRes?.count || 0,
        totalBroadcasts: totalBroadcastsRes?.count || 0,
        statusBreakdown: Object.fromEntries(statusRows.map(r => [r.status, r.count])),
        divisionBreakdown: Object.fromEntries(divisionRows.map(r => [r.division, r.count])),
        regionBreakdown: regionRows,
        sportBreakdown: sportRows,
        recentRegistrations,
      },
    });
  } catch (error) {
    console.error('[API] Error generating stats overview:', error);
    res.status(500).json({ success: false, error: 'Internal server error calculating overview statistics.' });
  }
});

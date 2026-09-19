import { Router, Request, Response } from 'express';
import { db } from '../db.js';

export const registrationsRouter = Router();

interface RegistrationRow {
  id: number;
  registration_code: string;
  team_name: string;
  organization_type: string;
  organization_name: string;
  division: string;
  team_size: number;
  lead_contact_name: string;
  lead_contact_role: string;
  lead_contact_email: string;
  lead_contact_phone: string;
  city_region: string;
  experience_level: string;
  emergency_consent: number;
  status: string;
  scrutineering_notes: string;
  technical_notes: string;
  created_at: string;
  updated_at: string;
}

// Helper to attach sports to a registration row
function attachSports(regId: number): string[] {
  const stmt = db.prepare('SELECT sport_id FROM registration_sports WHERE registration_id = ? ORDER BY sport_id ASC');
  const rows = stmt.all(regId) as { sport_id: string }[];
  return rows.map(r => r.sport_id);
}

// GET /api/registrations - List registrations with filtering & pagination
registrationsRouter.get('/', (req: Request, res: Response) => {
  try {
    const {
      search,
      sport,
      division,
      region,
      status,
      page = '1',
      limit = '50',
      sort_by = 'created_at',
      sort_dir = 'DESC',
    } = req.query;

    const pageNum = Math.max(1, parseInt(String(page), 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(String(limit), 10) || 50));
    const offset = (pageNum - 1) * limitNum;

    const conditions: string[] = [];
    const params: (string | number)[] = [];

    if (search && typeof search === 'string' && search.trim() !== '') {
      const searchTerm = `%${search.trim()}%`;
      conditions.push(`(
        r.team_name LIKE ? OR
        r.organization_name LIKE ? OR
        r.lead_contact_name LIKE ? OR
        r.lead_contact_email LIKE ? OR
        r.lead_contact_phone LIKE ? OR
        r.registration_code LIKE ?
      )`);
      params.push(searchTerm, searchTerm, searchTerm, searchTerm, searchTerm, searchTerm);
    }

    if (division && typeof division === 'string' && division !== 'all') {
      conditions.push('r.division = ?');
      params.push(division);
    }

    if (region && typeof region === 'string' && region !== 'all') {
      conditions.push('r.city_region = ?');
      params.push(region);
    }

    if (status && typeof status === 'string' && status !== 'all') {
      conditions.push('r.status = ?');
      params.push(status);
    }

    if (sport && typeof sport === 'string' && sport !== 'all') {
      conditions.push(`EXISTS (
        SELECT 1 FROM registration_sports rs 
        WHERE rs.registration_id = r.id AND rs.sport_id = ?
      )`);
      params.push(sport);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    // Total count for pagination
    const countSql = `SELECT COUNT(*) as total FROM registrations r ${whereClause}`;
    const countStmt = db.prepare(countSql);
    const countRes = countStmt.get(...params) as { total: number };
    const total = countRes?.total || 0;

    // Sorting safe whitelist
    const safeSortCols: Record<string, string> = {
      created_at: 'r.created_at',
      team_name: 'r.team_name',
      status: 'r.status',
      division: 'r.division',
      city_region: 'r.city_region',
    };
    const orderCol = safeSortCols[String(sort_by)] || 'r.created_at';
    const orderDir = String(sort_dir).toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    const dataSql = `
      SELECT r.* FROM registrations r
      ${whereClause}
      ORDER BY ${orderCol} ${orderDir}
      LIMIT ? OFFSET ?
    `;

    const dataStmt = db.prepare(dataSql);
    const rows = dataStmt.all(...params, limitNum, offset) as RegistrationRow[];

    const data = rows.map(row => ({
      ...row,
      emergency_consent: Boolean(row.emergency_consent),
      sports: attachSports(row.id),
    }));

    res.json({
      success: true,
      data,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum) || 1,
      },
    });
  } catch (error) {
    console.error('[API] Error fetching registrations:', error);
    res.status(500).json({ success: false, error: 'Internal server error fetching registrations' });
  }
});

// GET /api/registrations/stats - Aggregated stats
registrationsRouter.get('/stats', (_req: Request, res: Response) => {
  try {
    const totalTeamsRes = db.prepare('SELECT COUNT(*) as count FROM registrations').get() as { count: number };
    const totalAthletesRes = db.prepare('SELECT COALESCE(SUM(team_size), 0) as count FROM registrations').get() as { count: number };

    // Status distribution
    const statusRows = db.prepare(`
      SELECT status, COUNT(*) as count FROM registrations GROUP BY status
    `).all() as { status: string; count: number }[];

    // Division distribution
    const divisionRows = db.prepare(`
      SELECT division, COUNT(*) as count FROM registrations GROUP BY division
    `).all() as { division: string; count: number }[];

    // Region distribution
    const regionRows = db.prepare(`
      SELECT city_region, COUNT(*) as count FROM registrations GROUP BY city_region ORDER BY count DESC
    `).all() as { city_region: string; count: number }[];

    // Sport distribution
    const sportRows = db.prepare(`
      SELECT sport_id, COUNT(*) as count FROM registration_sports GROUP BY sport_id ORDER BY count DESC
    `).all() as { sport_id: string; count: number }[];

    res.json({
      success: true,
      data: {
        totalTeams: totalTeamsRes?.count || 0,
        totalAthletes: totalAthletesRes?.count || 0,
        statusBreakdown: Object.fromEntries(statusRows.map(r => [r.status, r.count])),
        divisionBreakdown: Object.fromEntries(divisionRows.map(r => [r.division, r.count])),
        regionBreakdown: regionRows,
        sportBreakdown: sportRows,
      },
    });
  } catch (error) {
    console.error('[API] Error fetching registration stats:', error);
    res.status(500).json({ success: false, error: 'Internal server error calculating stats' });
  }
});

// GET /api/registrations/export/csv - Export CSV of registrations
registrationsRouter.get('/export/csv', (_req: Request, res: Response) => {
  try {
    const rows = db.prepare('SELECT * FROM registrations ORDER BY created_at DESC').all() as RegistrationRow[];

    const headers = [
      'Registration Code',
      'Team Name',
      'Organization Name',
      'Organization Type',
      'Division',
      'Team Size',
      'Lead Contact Name',
      'Lead Contact Role',
      'Lead Contact Email',
      'Lead Contact Phone',
      'Ghana Region',
      'Experience Level',
      'Status',
      'Selected Disciplines',
      'Scrutineering Notes',
      'Registration Date',
    ];

    const escapeCsv = (val: unknown) => {
      if (val === null || val === undefined) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    const csvLines = [headers.join(',')];

    for (const row of rows) {
      const sports = attachSports(row.id).join('; ');
      const line = [
        escapeCsv(row.registration_code),
        escapeCsv(row.team_name),
        escapeCsv(row.organization_name),
        escapeCsv(row.organization_type),
        escapeCsv(row.division),
        escapeCsv(row.team_size),
        escapeCsv(row.lead_contact_name),
        escapeCsv(row.lead_contact_role),
        escapeCsv(row.lead_contact_email),
        escapeCsv(row.lead_contact_phone),
        escapeCsv(row.city_region),
        escapeCsv(row.experience_level),
        escapeCsv(row.status),
        escapeCsv(sports),
        escapeCsv(row.scrutineering_notes),
        escapeCsv(row.created_at),
      ];
      csvLines.push(line.join(','));
    }

    const csvContent = csvLines.join('\r\n');
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="mrc27_registrations_${Date.now()}.csv"`);
    res.send(csvContent);
  } catch (error) {
    console.error('[API] Error exporting CSV:', error);
    res.status(500).json({ success: false, error: 'Internal server error generating CSV' });
  }
});

// GET /api/registrations/:idOrCode - Get single registration details
registrationsRouter.get('/:idOrCode', (req: Request, res: Response) => {
  try {
    const { idOrCode } = req.params;
    let row: RegistrationRow | undefined;

    if (/^\d+$/.test(idOrCode)) {
      row = db.prepare('SELECT * FROM registrations WHERE id = ?').get(parseInt(idOrCode, 10)) as RegistrationRow | undefined;
    } else {
      row = db.prepare('SELECT * FROM registrations WHERE registration_code = ?').get(idOrCode) as RegistrationRow | undefined;
    }

    if (!row) {
      return res.status(404).json({ success: false, error: 'Registration record not found' });
    }

    const sports = attachSports(row.id);
    const logs = db.prepare(`
      SELECT * FROM scrutineering_logs WHERE registration_id = ? ORDER BY created_at DESC
    `).all(row.id);

    res.json({
      success: true,
      data: {
        ...row,
        emergency_consent: Boolean(row.emergency_consent),
        sports,
        scrutineering_logs: logs,
      },
    });
  } catch (error) {
    console.error('[API] Error getting registration details:', error);
    res.status(500).json({ success: false, error: 'Internal server error fetching registration' });
  }
});

// POST /api/registrations - Create a new registration
registrationsRouter.post('/', (req: Request, res: Response) => {
  try {
    const {
      teamName,
      organizationType,
      organizationName,
      selectedSports,
      division,
      teamSize = 3,
      leadContactName,
      leadContactRole,
      leadContactEmail,
      leadContactPhone,
      cityRegion,
      experienceLevel = 'intermediate',
      emergencyConsent = true,
      autoSubscribeNewsletter = true,
    } = req.body;

    // Validation
    if (!teamName || typeof teamName !== 'string' || !teamName.trim()) {
      return res.status(400).json({ success: false, error: 'Team name is required.' });
    }
    if (!organizationName || typeof organizationName !== 'string' || !organizationName.trim()) {
      return res.status(400).json({ success: false, error: 'Institution / Club name is required.' });
    }
    if (!division || typeof division !== 'string') {
      return res.status(400).json({ success: false, error: 'Division category is required.' });
    }
    if (!leadContactName || typeof leadContactName !== 'string' || !leadContactName.trim()) {
      return res.status(400).json({ success: false, error: 'Lead contact name is required.' });
    }
    if (!leadContactEmail || typeof leadContactEmail !== 'string' || !leadContactEmail.includes('@')) {
      return res.status(400).json({ success: false, error: 'Valid contact email is required.' });
    }
    if (!leadContactPhone || typeof leadContactPhone !== 'string' || leadContactPhone.trim().length < 9) {
      return res.status(400).json({ success: false, error: 'Valid Ghana contact telephone number is required.' });
    }
    if (!Array.isArray(selectedSports) || selectedSports.length === 0) {
      return res.status(400).json({ success: false, error: 'Select at least one challenge discipline.' });
    }

    // Check duplicate team name in same season
    const existingTeam = db.prepare('SELECT id, registration_code FROM registrations WHERE LOWER(team_name) = LOWER(?)').get(teamName.trim()) as { id: number; registration_code: string } | undefined;
    if (existingTeam) {
      return res.status(409).json({
        success: false,
        error: `A team named "${teamName}" is already registered (Code: ${existingTeam.registration_code}). Please choose a distinct identifier.`,
      });
    }

    // Generate unique confirmation code: MRC27-GH-XXXX
    let confirmationCode = '';
    let codeExists = true;
    while (codeExists) {
      const rand = Math.floor(1000 + Math.random() * 9000);
      confirmationCode = `MRC27-GH-${rand}`;
      const found = db.prepare('SELECT 1 FROM registrations WHERE registration_code = ?').get(confirmationCode);
      if (!found) codeExists = false;
    }

    const insertReg = db.prepare(`
      INSERT INTO registrations (
        registration_code, team_name, organization_type, organization_name,
        division, team_size, lead_contact_name, lead_contact_role,
        lead_contact_email, lead_contact_phone, city_region, experience_level,
        emergency_consent, status, scrutineering_notes, technical_notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', '', '')
    `);

    const result = insertReg.run(
      confirmationCode,
      teamName.trim(),
      organizationType || 'school',
      organizationName.trim(),
      division,
      Number(teamSize) || 3,
      leadContactName.trim(),
      leadContactRole || 'Head Coach / Mentor',
      leadContactEmail.trim().toLowerCase(),
      leadContactPhone.trim(),
      cityRegion || 'Greater Accra',
      experienceLevel || 'intermediate',
      emergencyConsent ? 1 : 0
    );

    const registrationId = Number(result.lastInsertRowid);

    // Insert selected sports
    const insertSport = db.prepare(`
      INSERT OR IGNORE INTO registration_sports (registration_id, sport_id) VALUES (?, ?)
    `);

    for (const sportId of selectedSports) {
      if (typeof sportId === 'string' && sportId.trim()) {
        insertSport.run(registrationId, sportId.trim());
      }
    }

    // Auto-subscribe coach to tournament bulletins
    if (autoSubscribeNewsletter) {
      try {
        db.prepare(`
          INSERT OR IGNORE INTO newsletter_subscribers (email, status, source)
          VALUES (?, 'active', 'coach_registration')
        `).run(leadContactEmail.trim().toLowerCase());
      } catch {
        // Silently skip if error
      }
    }

    const newReg = db.prepare('SELECT * FROM registrations WHERE id = ?').get(registrationId) as RegistrationRow;

    res.status(201).json({
      success: true,
      message: 'Registration successfully confirmed with The MakersPlace Ghana.',
      data: {
        ...newReg,
        emergency_consent: Boolean(newReg.emergency_consent),
        sports: attachSports(registrationId),
      },
    });
  } catch (error) {
    console.error('[API] Error creating registration:', error);
    res.status(500).json({ success: false, error: 'Internal server error processing registration' });
  }
});

// PATCH /api/registrations/:id/status - Update status and scrutineering notes
registrationsRouter.patch('/:id/status', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, scrutineeringNotes, inspectorName = 'Chief Technical Inspector' } = req.body;

    const validStatuses = ['pending', 'approved', 'scrutineering_passed', 'waitlisted', 'rejected'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ success: false, error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
    }

    const existing = db.prepare('SELECT * FROM registrations WHERE id = ?').get(id) as RegistrationRow | undefined;
    if (!existing) {
      return res.status(404).json({ success: false, error: 'Registration record not found.' });
    }

    const newStatus = status || existing.status;
    const newNotes = scrutineeringNotes !== undefined ? String(scrutineeringNotes) : existing.scrutineering_notes;

    db.prepare(`
      UPDATE registrations 
      SET status = ?, scrutineering_notes = ?, updated_at = datetime('now')
      WHERE id = ?
    `).run(newStatus, newNotes, id);

    // If status changed or notes added, log scrutineering event
    if (scrutineeringNotes || status === 'scrutineering_passed' || status === 'approved') {
      const decision = status === 'scrutineering_passed' ? 'pass' : (status === 'rejected' ? 'fail' : 'pending');
      db.prepare(`
        INSERT INTO scrutineering_logs (registration_id, inspector_name, decision, comments)
        VALUES (?, ?, ?, ?)
      `).run(Number(id), inspectorName, decision, newNotes || `Status updated to ${newStatus}`);
    }

    const updated = db.prepare('SELECT * FROM registrations WHERE id = ?').get(id) as RegistrationRow;

    res.json({
      success: true,
      message: `Registration status updated to ${newStatus}.`,
      data: {
        ...updated,
        sports: attachSports(Number(id)),
      },
    });
  } catch (error) {
    console.error('[API] Error updating registration status:', error);
    res.status(500).json({ success: false, error: 'Internal server error updating registration' });
  }
});

// DELETE /api/registrations/:id - Delete a registration
registrationsRouter.delete('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const existing = db.prepare('SELECT id, registration_code, team_name FROM registrations WHERE id = ?').get(id) as { id: number; registration_code: string; team_name: string } | undefined;

    if (!existing) {
      return res.status(404).json({ success: false, error: 'Registration not found' });
    }

    db.prepare('DELETE FROM registrations WHERE id = ?').run(id);

    res.json({
      success: true,
      message: `Team "${existing.team_name}" (${existing.registration_code}) has been archived/removed.`,
    });
  } catch (error) {
    console.error('[API] Error deleting registration:', error);
    res.status(500).json({ success: false, error: 'Internal server error deleting registration' });
  }
});

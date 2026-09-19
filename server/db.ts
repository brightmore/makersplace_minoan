import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';

const dataDir = path.resolve(process.cwd(), 'server', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = process.env.DATABASE_PATH || path.join(dataDir, 'minoan.db');
export const db = new DatabaseSync(dbPath);

// Enable WAL mode & foreign keys
db.exec(`
  PRAGMA journal_mode = WAL;
  PRAGMA foreign_keys = ON;
`);

export function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS registrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      registration_code TEXT UNIQUE NOT NULL,
      team_name TEXT NOT NULL,
      organization_type TEXT NOT NULL,
      organization_name TEXT NOT NULL,
      division TEXT NOT NULL,
      team_size INTEGER NOT NULL DEFAULT 3,
      lead_contact_name TEXT NOT NULL,
      lead_contact_role TEXT NOT NULL,
      lead_contact_email TEXT NOT NULL,
      lead_contact_phone TEXT NOT NULL,
      city_region TEXT NOT NULL,
      experience_level TEXT NOT NULL,
      emergency_consent INTEGER NOT NULL DEFAULT 1,
      status TEXT NOT NULL DEFAULT 'pending',
      scrutineering_notes TEXT DEFAULT '',
      technical_notes TEXT DEFAULT '',
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS registration_sports (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      registration_id INTEGER NOT NULL REFERENCES registrations(id) ON DELETE CASCADE,
      sport_id TEXT NOT NULL,
      UNIQUE(registration_id, sport_id)
    );

    CREATE INDEX IF NOT EXISTS idx_reg_sports_reg_id ON registration_sports(registration_id);
    CREATE INDEX IF NOT EXISTS idx_reg_sports_sport_id ON registration_sports(sport_id);

    CREATE TABLE IF NOT EXISTS scrutineering_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      registration_id INTEGER NOT NULL REFERENCES registrations(id) ON DELETE CASCADE,
      inspector_name TEXT NOT NULL,
      decision TEXT NOT NULL,
      checklist_results TEXT DEFAULT '{}',
      comments TEXT DEFAULT '',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS newsletter_subscribers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      status TEXT NOT NULL DEFAULT 'active',
      source TEXT NOT NULL DEFAULT 'footer_bulletin',
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_subscribers_email ON newsletter_subscribers(email);
    CREATE INDEX IF NOT EXISTS idx_subscribers_status ON newsletter_subscribers(status);

    CREATE TABLE IF NOT EXISTS newsletter_broadcasts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      subject TEXT NOT NULL,
      category TEXT NOT NULL DEFAULT 'general',
      content TEXT NOT NULL,
      target_audience TEXT NOT NULL DEFAULT 'all',
      sent_count INTEGER NOT NULL DEFAULT 0,
      status TEXT NOT NULL DEFAULT 'sent',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  seedInitialData();
}

function seedInitialData() {
  const regCountStmt = db.prepare('SELECT COUNT(*) as count FROM registrations');
  const regCount = (regCountStmt.get() as { count: number }).count;

  if (regCount === 0) {
    console.log('[DB] Seeding initial tournament registrations and subscribers...');

    const sampleRegistrations = [
      {
        code: 'MRC27-GH-1042',
        team_name: 'Achimota Robotics Titans',
        organization_type: 'school',
        organization_name: 'Achimota School STEM Academy',
        division: 'senior',
        team_size: 4,
        lead_contact_name: 'Kwame Mensah',
        lead_contact_role: 'Senior STEM Patron',
        lead_contact_email: 'kwame.mensah@achimota.edu.gh',
        lead_contact_phone: '+233 24 456 7890',
        city_region: 'Greater Accra',
        experience_level: 'veteran',
        emergency_consent: 1,
        status: 'approved',
        scrutineering_notes: 'Chassis passed dimensional envelope check. Kill-switch verified.',
        sports: ['drone', 'sumo', 'sprint'],
      },
      {
        code: 'MRC27-GH-2189',
        team_name: 'Prempeh Autonomous Lab',
        organization_type: 'school',
        organization_name: 'Prempeh College Tech Club',
        division: 'senior',
        team_size: 4,
        lead_contact_name: 'Akua Osei',
        lead_contact_role: 'Robotics Coach',
        lead_contact_email: 'akua.osei@prempeh.edu.gh',
        lead_contact_phone: '+233 20 812 3456',
        city_region: 'Ashanti',
        experience_level: 'intermediate',
        emergency_consent: 1,
        status: 'scrutineering_passed',
        scrutineering_notes: '100% Rule Zero compliance verified. Multi-camera feed calibrated.',
        sports: ['football', 'sumo', 'relay'],
      },
      {
        code: 'MRC27-GH-3055',
        team_name: 'KNUST AeroMakers',
        organization_type: 'university',
        organization_name: 'Kwame Nkrumah University of Science & Technology',
        division: 'open',
        team_size: 5,
        lead_contact_name: 'Dr. Emmanuel Boateng',
        lead_contact_role: 'Faculty Advisor',
        lead_contact_email: 'e.boateng@knust.edu.gh',
        lead_contact_phone: '+233 55 987 6543',
        city_region: 'Ashanti',
        experience_level: 'veteran',
        emergency_consent: 1,
        status: 'approved',
        scrutineering_notes: 'Telemetry transponder online. FPV fail-safe operational.',
        sports: ['drone', 'freestyle', 'shot-put'],
      },
      {
        code: 'MRC27-GH-4120',
        team_name: 'Takoradi CyberSmiths',
        organization_type: 'maker',
        organization_name: 'Western Innovation Hub',
        division: 'senior',
        team_size: 3,
        lead_contact_name: 'Ebenezer Quaye',
        lead_contact_role: 'Hardware Lead',
        lead_contact_email: 'ebenezer@westernmakerhub.org',
        lead_contact_phone: '+233 24 333 4444',
        city_region: 'Western',
        experience_level: 'intermediate',
        emergency_consent: 1,
        status: 'pending',
        scrutineering_notes: 'Awaiting battery test certificate and LiPo containment pouch.',
        sports: ['sumo', 'weightlifting'],
      },
      {
        code: 'MRC27-GH-5893',
        team_name: 'Legon Bipedal Dynamics',
        organization_type: 'university',
        organization_name: 'University of Ghana Computer Science Dept',
        division: 'open',
        team_size: 4,
        lead_contact_name: 'Naa Korkoi Tagoe',
        lead_contact_role: 'Team Captain',
        lead_contact_email: 'nktagoe@st.ug.edu.gh',
        lead_contact_phone: '+233 27 777 8899',
        city_region: 'Greater Accra',
        experience_level: 'intermediate',
        emergency_consent: 1,
        status: 'approved',
        scrutineering_notes: 'Servo torque and center of mass inspected. Ready for sprint qualifiers.',
        sports: ['sprint', 'shot-put', 'football'],
      },
      {
        code: 'MRC27-GH-6721',
        team_name: 'Mawuli Volta Spark',
        organization_type: 'school',
        organization_name: 'Mawuli School Ho',
        division: 'junior',
        team_size: 3,
        lead_contact_name: 'Francis Agbetor',
        lead_contact_role: 'ICT Tutor',
        lead_contact_email: 'f.agbetor@mawuli.edu.gh',
        lead_contact_phone: '+233 50 112 2334',
        city_region: 'Volta',
        experience_level: 'rookie',
        emergency_consent: 1,
        status: 'pending',
        scrutineering_notes: 'Pre-inspection scheduled.',
        sports: ['relay', 'sumo'],
      },
      {
        code: 'MRC27-GH-7419',
        team_name: 'Tamale Horizon Robotics',
        organization_type: 'independent',
        organization_name: 'Northern Youth STEAM Guild',
        division: 'junior',
        team_size: 3,
        lead_contact_name: 'Mariama Yakubu',
        lead_contact_role: 'Lead Mentor',
        lead_contact_email: 'mariama.y@northernguild.org',
        lead_contact_phone: '+233 24 555 1212',
        city_region: 'Northern',
        experience_level: 'rookie',
        emergency_consent: 1,
        status: 'waitlisted',
        scrutineering_notes: 'Pending arena slot allocation for Northern regional heats.',
        sports: ['freestyle', 'weightlifting'],
      },
    ];

    const insertReg = db.prepare(`
      INSERT INTO registrations (
        registration_code, team_name, organization_type, organization_name,
        division, team_size, lead_contact_name, lead_contact_role,
        lead_contact_email, lead_contact_phone, city_region, experience_level,
        emergency_consent, status, scrutineering_notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const insertSport = db.prepare(`
      INSERT OR IGNORE INTO registration_sports (registration_id, sport_id) VALUES (?, ?)
    `);

    for (const item of sampleRegistrations) {
      const res = insertReg.run(
        item.code,
        item.team_name,
        item.organization_type,
        item.organization_name,
        item.division,
        item.team_size,
        item.lead_contact_name,
        item.lead_contact_role,
        item.lead_contact_email,
        item.lead_contact_phone,
        item.city_region,
        item.experience_level,
        item.emergency_consent,
        item.status,
        item.scrutineering_notes
      );
      const regId = Number(res.lastInsertRowid);
      for (const sport of item.sports) {
        insertSport.run(regId, sport);
      }
    }
  }

  // Seed newsletter subscribers if empty
  const subCountStmt = db.prepare('SELECT COUNT(*) as count FROM newsletter_subscribers');
  const subCount = (subCountStmt.get() as { count: number }).count;

  if (subCount === 0) {
    const sampleSubscribers = [
      'coach.kofi@ghanaschools.edu.gh',
      'stem.director@makersplacegh.com',
      'robotics.lead@ug.edu.gh',
      'aero.enthusiast@gmail.com',
      'referee.board@he-ro.gr',
      'media@techghana.news',
      'patron@prempeh.edu.gh',
      'innovation@koforiduatech.edu.gh',
    ];

    const insertSub = db.prepare(`
      INSERT OR IGNORE INTO newsletter_subscribers (email, status, source) VALUES (?, 'active', 'footer_bulletin')
    `);

    for (const email of sampleSubscribers) {
      insertSub.run(email);
    }

    // Seed sample broadcast bulletins
    const insertBroadcast = db.prepare(`
      INSERT INTO newsletter_broadcasts (title, subject, category, content, target_audience, sent_count, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    insertBroadcast.run(
      'Official Scrutineering Regulations Released',
      '[MRC27 BULLETIN] Official Rule Zero & Scrutineering Protocols Finalized',
      'scrutineering',
      'The MakersPlace Ghana technical committee has published the mandatory Rule Zero hardware safety checklist. All autonomous robotics rigs must pass physical scrutiny before arena clearance.',
      'all',
      sampleSubscribers.length,
      'sent'
    );

    insertBroadcast.run(
      'Accra National Arena Staging Announcement',
      '[MRC27 VENUE] Official Tournament Venue & Scrutineering Pits Revealed',
      'venue',
      'Tournament directors are pleased to announce the multi-arena competition layout in Accra featuring dedicated drone netting, dual-sumo dohyos, and precision sprint tracks.',
      'all',
      sampleSubscribers.length,
      'sent'
    );
  }
}

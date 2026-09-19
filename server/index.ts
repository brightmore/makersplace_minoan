import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDatabase } from './db.js';
import { registrationsRouter } from './routes/registrations.js';
import { newsletterRouter } from './routes/newsletter.js';
import { broadcastsRouter } from './routes/broadcasts.js';
import { statsRouter } from './routes/stats.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize SQLite Database schema & initial seeding
initDatabase();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logger
app.use((req: Request, _res: Response, next: NextFunction) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
});

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'online',
    service: 'MINOAN RobotSports Ghana 2027 Tournament Core API',
    organizer: 'The MakersPlace Ghana',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// Mount Routes
app.use('/api/registrations', registrationsRouter);
app.use('/api/newsletter', newsletterRouter);
app.use('/api/broadcasts', broadcastsRouter);
app.use('/api/stats', statsRouter);

// 404 handler for API routes
app.use('/api', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: `Endpoint not found: ${req.method} ${req.originalUrl}`,
  });
});

// Global Error Handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[SERVER ERROR]', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`⚡ [MINOAN Backend] Server running on http://localhost:${PORT}`);
  console.log(`📡 [API Health] http://localhost:${PORT}/api/health`);
  console.log(`📋 [Registrations API] http://localhost:${PORT}/api/registrations`);
  console.log(`📬 [Newsletter API] http://localhost:${PORT}/api/newsletter/subscribers`);
});

export default app;

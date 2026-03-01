import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { validateApiKey } from '../middleware/auth';
import pdfRoutes from '../routes/pdf.routes';

const app = express();

// Middleware de sécurité
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '5mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // 10 requêtes par minute
  message: { error: 'Too many requests, please try again later.' }
});

app.use('/api/', limiter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes (test-html sans auth)
app.use('/api', pdfRoutes);

// Protection des routes API (après les routes pour ne protéger que generate-pdf)
app.use('/api/generate-pdf', validateApiKey);

export default app;
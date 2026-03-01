import express, { Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

const app = express();
const PORT = process.env.PORT || 4000;

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
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`🚀 API Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});

export default app;

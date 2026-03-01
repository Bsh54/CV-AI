import type { VercelRequest, VercelResponse } from '@vercel/node';

// Validation simple de la clé API
function validateApiKey(req: VercelRequest): boolean {
  const apiKey = req.headers['x-api-key'];
  return apiKey === 'test_api_key_123';
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Validation de la clé API
  if (!validateApiKey(req)) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid API Key'
    });
  }

  try {
    const { cvData } = req.body;

    if (!cvData || !cvData.fullName) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'cvData with fullName is required'
      });
    }

    // Pour l'instant, retournons juste une confirmation que l'API fonctionne
    // TODO: Ajouter Puppeteer une fois que la structure de base fonctionne
    return res.status(200).json({
      success: true,
      message: `PDF generation requested for ${cvData.fullName}`,
      data: {
        fullName: cvData.fullName,
        title: cvData.title,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error: any) {
    console.error('❌ API Error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to process request',
      details: error.message
    });
  }
}
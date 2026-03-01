import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log('🚀 [START] Function invoked');
  console.log('📝 [REQUEST] Method:', req.method);
  console.log('📝 [REQUEST] Headers:', JSON.stringify(req.headers, null, 2));

  try {
    if (req.method !== 'POST') {
      console.log('❌ [ERROR] Method not allowed:', req.method);
      return res.status(405).json({ error: 'Method not allowed' });
    }

    console.log('🔑 [AUTH] Checking API key...');
    const apiKey = req.headers['x-api-key'];
    console.log('🔑 [AUTH] Received API key:', apiKey);

    if (apiKey !== 'test_api_key_123') {
      console.log('❌ [AUTH] Invalid API key');
      return res.status(401).json({ error: 'Unauthorized', message: 'Invalid API Key' });
    }
    console.log('✅ [AUTH] API key valid');

    console.log('📦 [BODY] Parsing request body...');
    const { cvData } = req.body;

    if (!cvData || !cvData.fullName) {
      console.log('❌ [VALIDATION] Missing cvData or fullName');
      return res.status(400).json({ error: 'Bad Request', message: 'cvData with fullName is required' });
    }
    console.log('✅ [VALIDATION] cvData valid for:', cvData.fullName);

    // Pour l'instant, retournons du HTML au lieu de PDF pour tester
    console.log('🎨 [HTML] Generating HTML response...');
    const primaryColor = cvData.color || "#00a99d";

    const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>CV - ${cvData.fullName}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, sans-serif; color: #1e293b; padding: 20px; }
    .cv-container { max-width: 800px; margin: 0 auto; background: white; border: 3px solid ${primaryColor}; padding: 20px; }
    h1 { color: ${primaryColor}; margin-bottom: 10px; }
    .section { margin-bottom: 20px; }
    .section-title { font-weight: bold; color: ${primaryColor}; border-bottom: 1px solid #ccc; margin-bottom: 10px; }
  </style>
</head>
<body>
  <div class="cv-container">
    <h1>${cvData.fullName}</h1>
    <p><strong>${cvData.title}</strong></p>

    <div class="section">
      <div class="section-title">CONTACT</div>
      <p>${cvData.contact?.phone || ''}</p>
      <p>${cvData.contact?.email || ''}</p>
      <p>${cvData.contact?.address || ''}</p>
    </div>

    <div class="section">
      <div class="section-title">À PROPOS</div>
      <p>${cvData.about || ''}</p>
    </div>

    <div class="section">
      <div class="section-title">EXPÉRIENCES</div>
      ${(cvData.experiences || []).map((exp: any) => `
        <div style="margin-bottom: 15px;">
          <strong>${exp.role}</strong> - ${exp.company}<br>
          <small>${exp.startDate} - ${exp.endDate || 'Présent'}</small>
          ${exp.description ? `<p>${exp.description}</p>` : ''}
        </div>
      `).join('')}
    </div>

    <div class="section">
      <p><em>API Vercel fonctionnelle ! Prêt pour intégration PDF.</em></p>
      <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
    </div>
  </div>
</body>
</html>`;

    console.log('✅ [HTML] Generated successfully, length:', html.length);
    console.log('📤 [RESPONSE] Sending HTML response...');

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(200).send(html);

    console.log('✅ [SUCCESS] HTML sent successfully');

  } catch (error: any) {
    console.error('❌ [FATAL ERROR]:', error);
    console.error('❌ [FATAL ERROR] Stack:', error.stack);
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
  }
}
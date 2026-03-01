import type { VercelRequest, VercelResponse } from '@vercel/node';
import puppeteer from 'puppeteer';

// Validation simple de la clé API
function validateApiKey(req: VercelRequest): boolean {
  const apiKey = req.headers['x-api-key'];
  return apiKey === 'test_api_key_123';
}

// Génération HTML simple
function generateHTML(cvData: any): string {
  const primaryColor = cvData.color || "#00a99d";

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>CV - ${cvData.fullName}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, sans-serif; color: #1e293b; display: flex; justify-content: center; align-items: flex-start; min-height: 100vh; background-color: #f8fafc; }
    .cv-container { width: 794px; min-height: 1122px; background: white; display: flex; border: 12px solid ${primaryColor}; }
    .sidebar { width: 38%; background: #f0f7f7; padding: 32px; }
    .main-content { width: 62%; padding: 40px; }
    h1 { font-size: 30px; font-weight: 900; margin-bottom: 8px; }
    .title { font-size: 12px; font-weight: 700; color: ${primaryColor}; text-transform: uppercase; }
    .section { margin-bottom: 32px; }
    .section-title { font-size: 10px; font-weight: 900; text-transform: uppercase; margin-bottom: 16px; border-bottom: 2px solid #f1f5f9; padding-bottom: 8px; }
  </style>
</head>
<body>
  <div class="cv-container">
    <div class="sidebar">
      <h1>${cvData.fullName}</h1>
      <p class="title">${cvData.title}</p>
      <div class="section">
        <div class="section-title">CONTACT</div>
        <p>${cvData.contact?.phone || ''}</p>
        <p>${cvData.contact?.email || ''}</p>
        <p>${cvData.contact?.address || ''}</p>
      </div>
    </div>
    <div class="main-content">
      <div class="section">
        <div class="section-title">ABOUT</div>
        <p>${cvData.about || ''}</p>
      </div>
      <div class="section">
        <div class="section-title">EXPERIENCE</div>
        ${(cvData.experiences || []).map((exp: any) => `
          <div style="margin-bottom: 16px;">
            <strong>${exp.role}</strong> - ${exp.company}<br>
            <small>${exp.startDate} - ${exp.endDate || 'Present'}</small>
            ${exp.description ? `<p>${exp.description}</p>` : ''}
          </div>
        `).join('')}
      </div>
    </div>
  </div>
</body>
</html>`;
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

    console.log('🚀 Launching Puppeteer...');

    // Lancer Puppeteer avec configuration optimisée pour Vercel
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--no-first-run',
        '--no-default-browser-check',
        '--disable-web-security'
      ]
    });

    const page = await browser.newPage();

    // Générer et charger le HTML
    const html = generateHTML(cvData);
    await page.setContent(html, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    // Générer le PDF
    const pdfBuffer = await page.pdf({
      width: '794px',
      height: '1122px',
      printBackground: true,
      preferCSSPageSize: false,
      margin: { top: 0, right: 0, bottom: 0, left: 0 }
    });

    await browser.close();

    // Envoyer le PDF
    const filename = `CV_${cvData.fullName.replace(/\s+/g, '_')}.pdf`;
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', pdfBuffer.length);
    res.send(pdfBuffer);

    console.log(`✅ PDF generated successfully: ${filename}`);
  } catch (error: any) {
    console.error('❌ PDF Generation Error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to generate PDF',
      details: error.message
    });
  }
}
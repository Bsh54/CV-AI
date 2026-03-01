import type { VercelRequest, VercelResponse } from '@vercel/node';
import puppeteer from 'puppeteer';

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
    console.log('🔑 [AUTH] Expected API key: test_api_key_123');

    if (apiKey !== 'test_api_key_123') {
      console.log('❌ [AUTH] Invalid API key');
      return res.status(401).json({ error: 'Unauthorized', message: 'Invalid API Key' });
    }
    console.log('✅ [AUTH] API key valid');

    console.log('📦 [BODY] Parsing request body...');
    console.log('📦 [BODY] Raw body:', JSON.stringify(req.body, null, 2));

    const { cvData } = req.body;
    if (!cvData || !cvData.fullName) {
      console.log('❌ [VALIDATION] Missing cvData or fullName');
      return res.status(400).json({ error: 'Bad Request', message: 'cvData with fullName is required' });
    }
    console.log('✅ [VALIDATION] cvData valid for:', cvData.fullName);

    console.log('🎨 [HTML] Generating HTML...');
    const primaryColor = cvData.color || "#00a99d";
    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>CV - ${cvData.fullName}</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:Arial,sans-serif;color:#1e293b;display:flex;justify-content:center;align-items:flex-start;min-height:100vh;background-color:#f8fafc}.cv-container{width:794px;min-height:1122px;background:white;display:flex;border:12px solid ${primaryColor}}.sidebar{width:38%;background:#f0f7f7;padding:32px}.main-content{width:62%;padding:40px}h1{font-size:30px;font-weight:900;margin-bottom:8px}.title{font-size:12px;font-weight:700;color:${primaryColor};text-transform:uppercase}.section{margin-bottom:32px}.section-title{font-size:10px;font-weight:900;text-transform:uppercase;margin-bottom:16px;border-bottom:2px solid #f1f5f9;padding-bottom:8px}</style></head><body><div class="cv-container"><div class="sidebar"><h1>${cvData.fullName}</h1><p class="title">${cvData.title}</p><div class="section"><div class="section-title">CONTACT</div><p>${cvData.contact?.phone || ''}</p><p>${cvData.contact?.email || ''}</p><p>${cvData.contact?.address || ''}</p></div></div><div class="main-content"><div class="section"><div class="section-title">ABOUT</div><p>${cvData.about || ''}</p></div><div class="section"><div class="section-title">EXPERIENCE</div>${(cvData.experiences || []).map((exp: any) => `<div style="margin-bottom:16px"><strong>${exp.role}</strong> - ${exp.company}<br><small>${exp.startDate} - ${exp.endDate || 'Present'}</small>${exp.description ? `<p>${exp.description}</p>` : ''}</div>`).join('')}</div></div></div></body></html>`;
    console.log('✅ [HTML] Generated, length:', html.length);

    console.log('🚀 [PUPPETEER] Launching browser...');
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu', '--no-first-run', '--no-default-browser-check', '--disable-web-security']
    });
    console.log('✅ [PUPPETEER] Browser launched');

    console.log('📄 [PUPPETEER] Creating new page...');
    const page = await browser.newPage();
    console.log('✅ [PUPPETEER] Page created');

    console.log('📝 [PUPPETEER] Setting content...');
    await page.setContent(html, { waitUntil: 'networkidle0', timeout: 30000 });
    console.log('✅ [PUPPETEER] Content set');

    console.log('🖨️ [PUPPETEER] Generating PDF...');
    const pdfBuffer = await page.pdf({
      width: '794px', height: '1122px', printBackground: true, preferCSSPageSize: false,
      margin: { top: 0, right: 0, bottom: 0, left: 0 }
    });
    console.log('✅ [PUPPETEER] PDF generated, size:', pdfBuffer.length);

    console.log('🔒 [PUPPETEER] Closing browser...');
    await browser.close();
    console.log('✅ [PUPPETEER] Browser closed');

    const filename = `CV_${cvData.fullName.replace(/\s+/g, '_')}.pdf`;
    console.log('📤 [RESPONSE] Sending PDF:', filename);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', pdfBuffer.length);
    res.send(pdfBuffer);
    console.log('✅ [SUCCESS] PDF sent successfully');

  } catch (error: any) {
    console.error('❌ [FATAL ERROR]:', error);
    console.error('❌ [FATAL ERROR] Stack:', error.stack);
    console.error('❌ [FATAL ERROR] Message:', error.message);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to generate PDF',
      details: error.message,
      stack: error.stack
    });
  }
}
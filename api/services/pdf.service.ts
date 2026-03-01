import puppeteer from 'puppeteer';

export async function generatePDFFromHTML(html: string): Promise<Buffer> {
  let browser;

  try {
    // Lancer Puppeteer
    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu'
      ]
    });

    const page = await browser.newPage();

    // Charger le HTML
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
      margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    });

    return Buffer.from(pdfBuffer);
  } catch (error: any) {
    console.error('PDF_GENERATION_ERROR:', error.message);
    throw new Error(`Failed to generate PDF: ${error.message}`);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

import { Router, Request, Response } from 'express';
import type { GeneratePDFRequest } from '../types';
import { validateCVData } from '../utils/validation';
import { optimizeCVWithAI } from '../services/ai.service';
import { renderCVToHTML } from '../services/render.service';
import { generatePDFFromHTML } from '../services/pdf.service';

const router = Router();

router.post('/generate-pdf', async (req: Request, res: Response) => {
  try {
    const { cvData, jobOffer, companyInfo }: GeneratePDFRequest = req.body;

    // Validation
    const validation = validateCVData(cvData);
    if (!validation.valid) {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Invalid CVData format',
        errors: validation.errors
      });
    }

    console.log(`📄 Generating PDF for: ${cvData.fullName}`);

    // Étape 1: Optimisation IA (optionnelle)
    let optimizedData = cvData;
    if (jobOffer && jobOffer.trim()) {
      console.log('🤖 Optimizing CV with AI...');
      try {
        optimizedData = await optimizeCVWithAI({
          jobOffer,
          currentData: cvData
        });
        console.log('✅ AI optimization completed');
      } catch (error) {
        console.warn('⚠️  AI optimization failed, using original data');
      }
    }

    // Étape 2: Rendu HTML
    console.log('🎨 Rendering HTML...');
    const html = await renderCVToHTML(optimizedData);
    console.log('✅ HTML rendered');

    // Étape 3: Génération PDF
    console.log('📑 Generating PDF...');
    const pdfBuffer = await generatePDFFromHTML(html);
    console.log('✅ PDF generated');

    // Envoi du PDF
    const filename = `CV_${cvData.fullName.replace(/\s+/g, '_')}.pdf`;
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Length', pdfBuffer.length);
    res.send(pdfBuffer);

    console.log(`✅ PDF sent successfully: ${filename}`);
  } catch (error: any) {
    console.error('❌ PDF Generation Error:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to generate PDF',
      details: error.message
    });
  }
});

export default router;

import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  console.log('🚀 [HEALTH] Function invoked');
  console.log('📝 [HEALTH] Method:', req.method);
  console.log('📝 [HEALTH] URL:', req.url);
  console.log('📝 [HEALTH] Headers:', JSON.stringify(req.headers, null, 2));

  try {
    console.log('✅ [HEALTH] Generating response...');
    const response = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      message: 'CV-AI API is running',
      environment: process.env.NODE_ENV || 'unknown',
      version: '1.0.0'
    };

    console.log('📤 [HEALTH] Sending response:', JSON.stringify(response, null, 2));
    res.status(200).json(response);
    console.log('✅ [HEALTH] Response sent successfully');

  } catch (error: any) {
    console.error('❌ [HEALTH ERROR]:', error);
    console.error('❌ [HEALTH ERROR] Stack:', error.stack);
    res.status(500).json({
      error: 'Health check failed',
      message: error.message,
      stack: error.stack
    });
  }
}
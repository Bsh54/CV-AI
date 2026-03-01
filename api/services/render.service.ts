import React from 'react';
import ReactDOMServer from 'react-dom/server';
import type { CVData } from '../types';
import { getInlineStyles } from '../utils/styles';
import path from 'path';

export async function renderCVToHTML(cvData: CVData): Promise<string> {
  try {
    // Import dynamique du template avec chemin absolu
    const templatePath = path.resolve(__dirname, '../../src/templates/moderne/Moderne01.tsx');
    const Moderne01Module = await import(templatePath);
    const Moderne01 = Moderne01Module.default;

    // Rendu du composant React en HTML
    const cvHTML = ReactDOMServer.renderToString(
      React.createElement(Moderne01, { data: cvData })
    );

    // Construction du document HTML complet
    const fullHTML = `
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>CV - ${cvData.fullName}</title>
        ${getInlineStyles()}
      </head>
      <body>
        <div class="cv-container">
          ${cvHTML}
        </div>
      </body>
      </html>
    `;

    return fullHTML;
  } catch (error: any) {
    console.error('RENDER_ERROR:', error);
    throw new Error(`Failed to render CV: ${error.message}`);
  }
}

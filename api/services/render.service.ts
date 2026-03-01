import type { CVData } from '../types';

export function renderCVToHTML(cvData: CVData): string {
  const primaryColor = cvData.color || "#00a99d";

  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>CV - ${cvData.fullName}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, sans-serif; color: #1e293b; }
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
        <p>${cvData.contact.phone}</p>
        <p>${cvData.contact.email}</p>
        <p>${cvData.contact.address}</p>
      </div>
    </div>
    <div class="main-content">
      <div class="section">
        <div class="section-title">ABOUT</div>
        <p>${cvData.about}</p>
      </div>
      <div class="section">
        <div class="section-title">EXPERIENCE</div>
        ${cvData.experiences.map(exp => `
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

  return html;
}

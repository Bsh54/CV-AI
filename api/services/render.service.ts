import type { CVData } from '../types';

export function renderCVToHTML(cvData: CVData): string {
  const primaryColor = cvData.color || "#00a99d";

  const html = `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>CV - ${cvData.fullName}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: ui-sans-serif, system-ui, -apple-system, sans-serif;
          -webkit-font-smoothing: antialiased;
          color: #1e293b;
        }

        .cv-container {
          width: 794px;
          min-height: 1122px;
          background-color: white;
          display: flex;
          overflow: hidden;
          border: 12px solid ${primaryColor};
        }

        .sidebar {
          width: 38%;
          background-color: #f0f7f7;
          padding: 32px;
          display: flex;
          flex-direction: column;
          border-right: 1px solid #e5e7eb;
        }

        .main-content {
          width: 62%;
          padding: 40px;
          background-color: white;
        }

        .profile-image {
          width: 176px;
          height: 176px;
          border-radius: 50%;
          border: 6px solid white;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          background-color: #e5e7eb;
          margin: 0 auto 40px;
        }

        .profile-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        h1 {
          font-size: 30px;
          font-weight: 900;
          color: #1e293b;
          letter-spacing: -0.05em;
          line-height: 1;
          margin-bottom: 8px;
        }

        .title {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: ${primaryColor};
        }

        .section-title {
          font-size: 10px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #1e293b;
          margin-bottom: 24px;
          padding-bottom: 8px;
          border-bottom: 2px solid #f1f5f9;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 11px;
          font-weight: 500;
          color: #475569;
          margin-bottom: 12px;
        }

        .experience-item {
          margin-bottom: 32px;
        }

        .experience-title {
          font-size: 11px;
          font-weight: 900;
          text-transform: uppercase;
          color: #1e293b;
          letter-spacing: -0.025em;
        }

        .experience-company {
          font-size: 10px;
          font-weight: 700;
          font-style: italic;
          color: ${primaryColor};
          margin-top: 4px;
        }

        .experience-date {
          font-size: 10px;
          font-weight: 900;
          color: #94a3b8;
          letter-spacing: -0.025em;
          font-style: italic;
        }

        .experience-description {
          font-size: 10px;
          line-height: 1.6;
          color: #94a3b8;
          white-space: pre-line;
          margin-top: 8px;
        }

        .skill-item {
          margin-bottom: 16px;
        }

        .skill-name {
          font-size: 10px;
          font-weight: 700;
          color: #334155;
          margin-bottom: 6px;
        }

        .skill-bar {
          height: 6px;
          width: 100%;
          background-color: #f1f5f9;
          border-radius: 9999px;
          overflow: hidden;
        }

        .skill-progress {
          height: 100%;
          background-color: ${primaryColor};
          border-radius: 9999px;
        }

        .list-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          color: #64748b;
          margin-bottom: 8px;
        }

        .bullet {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: ${primaryColor};
        }

        .about-text {
          font-size: 11px;
          line-height: 1.6;
          color: #64748b;
          font-weight: 500;
        }

        .section {
          margin-bottom: 48px;
        }
      </style>
    </head>
    <body>
      <div class="cv-container">
        <!-- SIDEBAR -->
        <div class="sidebar">
          <div style="margin-bottom: 32px;">
            <h1>${cvData.fullName}</h1>
            <p class="title">${cvData.title}</p>
          </div>

          ${cvData.profileImage ? `
            <div class="profile-image">
              <img src="${cvData.profileImage}" alt="Profile" />
            </div>
          ` : ''}

          <div class="section">
            <div class="section-title">CONTACT</div>
            <div class="contact-item">📞 ${cvData.contact.phone}</div>
            <div class="contact-item">✉️ ${cvData.contact.email}</div>
            <div class="contact-item">📍 ${cvData.contact.address}</div>
          </div>

          ${cvData.education && cvData.education.length > 0 ? `
            <div class="section">
              <div class="section-title">EDUCATION</div>
              ${cvData.education.map(edu => `
                <div style="margin-bottom: 24px;">
                  <div style="font-size: 11px; font-weight: 900; text-transform: uppercase; color: #1e293b;">${edu.degree}</div>
                  <div style="font-size: 10px; color: #64748b; font-weight: 700; font-style: italic; margin-top: 4px;">${edu.school}</div>
                  <div style="font-size: 9px; font-weight: 900; color: #94a3b8; letter-spacing: 0.05em; text-transform: uppercase; margin-top: 4px;">${edu.startDate} - ${edu.endDate}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}

          ${cvData.references && cvData.references.length > 0 ? `
            <div class="section">
              <div class="section-title">REFERENCES</div>
              ${cvData.references.map(ref => `
                <div style="margin-bottom: 24px;">
                  <div style="font-size: 11px; font-weight: 900; text-transform: uppercase; color: #1e293b;">${ref.name}</div>
                  <div style="font-size: 10px; color: #64748b; line-height: 1.6; white-space: pre-line; margin-top: 4px;">${ref.contact}</div>
                </div>
              `).join('')}
            </div>
          ` : ''}
        </div>

        <!-- MAIN CONTENT -->
        <div class="main-content">
          <div class="section">
            <div class="section-title">ABOUT ME</div>
            <p class="about-text">${cvData.about}</p>
          </div>

          <div class="section">
            <div class="section-title">JOB EXPERIENCE</div>
            ${cvData.experiences.map(exp => `
              <div class="experience-item">
                <div style="display: flex; justify-content: space-between; align-items: baseline;">
                  <div class="experience-title">${exp.role}</div>
                  <div class="experience-date">${exp.startDate} - ${exp.endDate || 'Present'}</div>
                </div>
                <div class="experience-company">${exp.company}</div>
                ${exp.description ? `<div class="experience-description">${exp.description}</div>` : ''}
              </div>
            `).join('')}
          </div>

          ${cvData.skills && cvData.skills.length > 0 ? `
            <div class="section">
              <div class="section-title">SKILLS</div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px 40px;">
                ${cvData.skills.map(skill => `
                  <div class="skill-item">
                    <div class="skill-name">${skill.name}</div>
                    <div class="skill-bar">
                      <div class="skill-progress" style="width: ${skill.level}%;"></div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px;">
            ${cvData.languages && cvData.languages.length > 0 ? `
              <div class="section">
                <div class="section-title">LANGUAGE</div>
                ${cvData.languages.filter(l => l.trim()).map(lang => `
                  <div class="list-item">
                    <div class="bullet"></div>
                    <span>${lang}</span>
                  </div>
                `).join('')}
              </div>
            ` : ''}

            ${cvData.hobbies && cvData.hobbies.length > 0 ? `
              <div class="section">
                <div class="section-title">HOBBIES</div>
                ${cvData.hobbies.filter(h => h.trim()).map(hobby => `
                  <div class="list-item">
                    <div class="bullet"></div>
                    <span>${hobby}</span>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  return html;
}

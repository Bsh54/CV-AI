export function getInlineStyles(): string {
  return `
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

      /* Corrections OKLCH → HEX pour Tailwind 4 */
      .text-slate-800 { color: #1e293b !important; }
      .text-slate-700 { color: #334155 !important; }
      .text-slate-600 { color: #475569 !important; }
      .text-slate-500 { color: #64748b !important; }
      .text-slate-400 { color: #94a3b8 !important; }
      .bg-slate-50 { background-color: #f8fafc !important; }
      .bg-slate-100 { background-color: #f1f5f9 !important; }
      .border-slate-100 { border-color: #f1f5f9 !important; }
      .bg-\\[\\#f0f7f7\\] { background-color: #f0f7f7 !important; }
      .text-\\[\\#00a99d\\] { color: #00a99d !important; }
      .bg-\\[\\#00a99d\\] { background-color: #00a99d !important; }

      /* Format A4 */
      .cv-container {
        width: 794px;
        min-height: 1122px;
        background-color: white;
        display: flex;
        overflow: hidden;
      }

      /* SVG Icons */
      svg {
        display: inline-block;
        vertical-align: middle;
        stroke: currentColor;
        fill: none;
      }
    </style>
  `;
}

import {
  PERSONAL_METADATA,
  PRIMARY_COMPOSITE_SCORES,
  CORE_COGNITIVE_INDICES,
  SUBTESTS_DATA,
} from '../data/reportData';
import { generateBellCurveSvgPath, iqToSvgX, gaussianSvgY } from './psychometrics';

export function buildStandaloneHtmlDocument(): string {
  const { linePath, areaPath } = generateBellCurveSvgPath(55, 175, 1.5, 48, 752, 228, 180);
  const xMean = iqToSvgX(100, 55, 175, 48, 752);
  const yMean = gaussianSvgY(0, 228, 180, 2);
  const xMensa = iqToSvgX(130, 55, 175, 48, 752);
  const yMensa = gaussianSvgY(2, 228, 180, 2);
  const xFsiq = iqToSvgX(163, 55, 175, 48, 752);
  const yFsiq = gaussianSvgY(4.2, 228, 180, 2);
  const xGai = iqToSvgX(167, 55, 175, 48, 752);
  const yGai = gaussianSvgY(4.47, 228, 180, 2);

  const subtestsRowsHtml = SUBTESTS_DATA.map((s) => {
    const pct = ((s.scaledScore / 22) * 100).toFixed(1);
    const barColor = s.scaledScore >= 20 ? '#D97706' : '#0D9488';
    return `
      <tr data-domain="${s.domainId}">
        <td class="num-col">${s.order}</td>
        <td>${s.domainArabic}</td>
        <td><strong>${s.arabicName}</strong> <span class="en-sub">(${s.englishName})</span></td>
        <td class="score-col" style="color:${barColor}">${s.scaledScore} <small>/ 22</small></td>
        <td>
          <div class="bar-track"><div class="bar-fill" style="width:${pct}%;background:${barColor}"></div></div>
        </td>
        <td>${s.clinicalDescription}</td>
      </tr>`;
  }).join('');

  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${PERSONAL_METADATA.reportTitle} - ${PERSONAL_METADATA.fullName}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&family=IBM+Plex+Mono:wght@400;600&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <style>
    :root {
      --navy: #0F172A;
      --teal: #0D9488;
      --gold: #D97706;
      --bg: #F8FAFC;
      --card: #FFFFFF;
      --border: #E2E8F0;
      --muted: #64748B;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'IBM Plex Sans Arabic', 'Cairo', sans-serif;
      background: var(--bg);
      color: var(--navy);
      line-height: 1.6;
      padding: 24px;
    }
    h1, h2, h3, h4 { font-family: 'Cairo', sans-serif; }
    .container { max-width: 1320px; margin: 0 auto; }
    .top-bar {
      background: var(--navy);
      color: #fff;
      padding: 20px 28px;
      border-radius: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }
    .btn {
      background: var(--teal);
      color: #fff;
      border: none;
      padding: 10px 18px;
      border-radius: 8px;
      font-family: inherit;
      font-weight: 700;
      cursor: pointer;
    }
    .grid {
      display: grid;
      grid-template-columns: 380px 1fr;
      gap: 24px;
    }
    @media (max-width: 1024px) {
      .grid { grid-template-columns: 1fr; }
    }
    .card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 22px;
      margin-bottom: 20px;
    }
    .meta-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid #F1F5F9;
      font-size: 13px;
    }
    .indices-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 14px;
    }
    .bar-track {
      height: 8px;
      background: #E2E8F0;
      border-radius: 99px;
      overflow: hidden;
      margin-top: 6px;
    }
    .bar-fill { height: 100%; border-radius: 99px; }
    table { width: 100%; border-collapse: collapse; font-size: 13px; margin-top: 12px; }
    th { background: var(--navy); color: #fff; padding: 10px 12px; text-align: right; }
    td { padding: 10px 12px; border-bottom: 1px solid var(--border); }
    .num-col, .score-col { font-family: 'IBM Plex Mono', monospace; font-variant-numeric: tabular-nums; text-align: center; font-weight: 700; }
    .en-sub { color: var(--muted); font-size: 11px; font-family: 'IBM Plex Mono', monospace; }
    @media print {
      @page { size: A4 portrait; margin: 10mm; }
      body { background: #fff; padding: 0; }
      .no-print { display: none !important; }
      .grid { grid-template-columns: 1fr; }
      .card { break-inside: avoid; }
    }
  </style>
</head>
<body>
  <div class="container">
    <header class="top-bar">
      <div>
        <h1>${PERSONAL_METADATA.reportTitle}</h1>
        <p style="font-size:13px;color:#CBD5E1">${PERSONAL_METADATA.scaleName} · REF: ${PERSONAL_METADATA.referenceCode}</p>
      </div>
      <button class="btn no-print" onclick="window.print()">طباعة / تصدير PDF</button>
    </header>
    <div class="grid">
      <aside>
        <div class="card">
          <h3>البيانات الشخصية والمرجعية</h3>
          <div class="meta-row"><span>الاسم الكامل:</span><strong>${PERSONAL_METADATA.fullName}</strong></div>
          <div class="meta-row"><span>تاريخ الميلاد:</span><strong>${PERSONAL_METADATA.birthDateText} (${PERSONAL_METADATA.birthDateNumeric})</strong></div>
          <div class="meta-row"><span>تاريخ إجراء التقييم:</span><strong>${PERSONAL_METADATA.assessmentDate}</strong></div>
          <div class="meta-row"><span>العمر الزمني وقت التقييم:</span><strong>${PERSONAL_METADATA.chronologicalAge}</strong></div>
          <div class="meta-row"><span>الكود المرجعي للتوثيق:</span><strong dir="ltr">${PERSONAL_METADATA.referenceCode}</strong></div>
        </div>
        ${PRIMARY_COMPOSITE_SCORES.map(
          (c) => `<div class="card">
            <h3>${c.arabicTitle}: <span style="color:${c.accentColor === 'gold' ? '#D97706' : '#0D9488'}">${c.score}</span></h3>
            <div class="meta-row"><span>الانحراف المعياري:</span><strong dir="ltr">${c.sdText}</strong></div>
            <div class="meta-row"><span>الترتيب المئيني العالمي:</span><strong>${c.percentileText}</strong></div>
            <div class="meta-row"><span>الندرة الإحصائية:</span><strong>${c.rarityText}</strong></div>
            <div class="meta-row"><span>التصنيف الإكلينيكي:</span><strong>${c.clinicalClassificationAr} (${c.clinicalClassificationEn})</strong></div>
          </div>`
        ).join('')}
      </aside>
      <main>
        <div class="card">
          <h3>المؤشرات الإدراكية الأساسية الأربعة</h3>
          <div class="indices-grid" style="margin-top:12px">
            ${CORE_COGNITIVE_INDICES.map(
              (idx) => `<div style="border:1px solid #E2E8F0;border-radius:8px;padding:12px">
                <div style="display:flex;justify-content:space-between">
                  <strong>${idx.arabicName}</strong>
                  <strong style="font-size:18px;color:#0D9488">${idx.score}</strong>
                </div>
                <div class="bar-track"><div class="bar-fill" style="width:${((idx.score - 40) / 135) * 100}%;background:#0D9488"></div></div>
                <div style="font-size:12px;color:#475569;margin-top:6px">المئين: ${idx.percentile} | التقييم: ${idx.evaluation}</div>
              </div>`
            ).join('')}
          </div>
        </div>
        <div class="card">
          <h3>منحنى التوزيع الطبيعي المعياري (Gaussian Normal Distribution)</h3>
          <svg viewBox="0 0 800 260" style="width:100%;height:auto;margin-top:10px" dir="ltr">
            <path d="${areaPath}" fill="rgba(13,148,136,0.18)" />
            <path d="${linePath}" fill="none" stroke="#0F172A" stroke-width="2.5" />
            <line x1="48" y1="228" x2="752" y2="228" stroke="#0F172A" stroke-width="1.5" />
            <circle cx="${xMean}" cy="${yMean}" r="4" fill="#0F172A" />
            <text x="${xMean}" y="${yMean - 10}" text-anchor="middle" font-size="11" font-weight="bold">Mean 100</text>
            <circle cx="${xMensa}" cy="${yMensa}" r="4" fill="#0D9488" />
            <text x="${xMensa}" y="${yMensa - 10}" text-anchor="middle" font-size="11" fill="#0D9488" font-weight="bold">Mensa 130 (+2 SD)</text>
            <circle cx="${xFsiq}" cy="${yFsiq}" r="5" fill="#0D9488" />
            <text x="${xFsiq - 45}" y="${yFsiq - 14}" text-anchor="middle" font-size="11" fill="#0D9488" font-weight="bold">FSIQ 163 (+4.20 SD)</text>
            <circle cx="${xGai}" cy="${yGai}" r="5" fill="#D97706" />
            <text x="${xGai - 35}" y="${yGai - 28}" text-anchor="middle" font-size="11" fill="#D97706" font-weight="bold">GAI 167 (+4.47 SD)</text>
          </svg>
        </div>
        <div class="card">
          <h3>نتائج الاختبارات الفرعية الـ 12 (WAIS-IV Extended Scale)</h3>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>المجال</th>
                <th>الاختبار الفرعي</th>
                <th>الدرجة الموزونة</th>
                <th>التمثيل المعياري</th>
                <th>التوصيف الإكلينيكي</th>
              </tr>
            </thead>
            <tbody>${subtestsRowsHtml}</tbody>
          </table>
        </div>
      </main>
    </div>
  </div>
</body>
</html>`;
}

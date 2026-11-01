import React from 'react';
import {
  generateBellCurveSvgPath,
  iqToSvgX,
  gaussianSvgY,
} from '../utils/psychometrics';

export type MetricSelectorId = 'FSIQ' | 'GAI' | 'VCI' | 'PRI' | 'WMI' | 'PSI';

interface MetricMarkerPoint {
  id: MetricSelectorId;
  labelAr: string;
  score: number;
  sdText: string;
  percentile: string;
  rarity: string;
  classification: string;
  color: string;
}

const METRIC_MARKERS: Record<MetricSelectorId, MetricMarkerPoint> = {
  FSIQ: {
    id: 'FSIQ',
    labelAr: 'الدرجة الكلية للذكاء (FSIQ)',
    score: 163,
    sdText: '+4.20 SD',
    percentile: '99.9987%',
    rarity: '1 من كل 74,900 إنسان',
    classification: 'متفوق بعمق / عبقرية شاملة (Profoundly Gifted)',
    color: '#0D9488',
  },
  GAI: {
    id: 'GAI',
    labelAr: 'مؤشر القدرة العامة الخالصة (GAI)',
    score: 167,
    sdText: '+4.47 SD',
    percentile: '99.9996%',
    rarity: '1 من كل 253,000 إنسان',
    classification: 'تفوق استثنائي نادر في التجريد والاستنتاج (Exceptionally Profound)',
    color: '#D97706',
  },
  VCI: {
    id: 'VCI',
    labelAr: 'الفهم اللفظي (VCI)',
    score: 169,
    sdText: '+4.60 SD',
    percentile: '99.9998%',
    rarity: '1 من كل 490,000 إنسان',
    classification: 'تفوق استثنائي عميق',
    color: '#B45309',
  },
  PRI: {
    id: 'PRI',
    labelAr: 'الاستدلال البصري (PRI)',
    score: 165,
    sdText: '+4.33 SD',
    percentile: '99.9993%',
    rarity: '1 من كل 135,000 إنسان',
    classification: 'تفوق استثنائي عميق',
    color: '#0F766E',
  },
  WMI: {
    id: 'WMI',
    labelAr: 'الذاكرة العاملة (WMI)',
    score: 161,
    sdText: '+4.07 SD',
    percentile: '99.9976%',
    rarity: '1 من كل 42,000 إنسان',
    classification: 'متفوق بعمق',
    color: '#0D9488',
  },
  PSI: {
    id: 'PSI',
    labelAr: 'سرعة المعالجة (PSI)',
    score: 157,
    sdText: '+3.80 SD',
    percentile: '99.9928%',
    rarity: '1 من كل 13,800 إنسان',
    classification: 'متفوق جداً',
    color: '#0284C7',
  },
};

interface BellCurveChartProps {
  activeMetric: MetricSelectorId;
  onSelectMetric: (id: MetricSelectorId) => void;
}

export const BellCurveChart: React.FC<BellCurveChartProps> = ({
  activeMetric,
  onSelectMetric,
}) => {
  const minIq = 55;
  const maxIq = 175;
  const plotLeft = 48;
  const plotRight = 752;
  const baselineY = 228;
  const peakHeight = 180;

  const { linePath, areaPath } = generateBellCurveSvgPath(
    minIq,
    maxIq,
    1.5,
    plotLeft,
    plotRight,
    baselineY,
    peakHeight
  );

  // Key reference coordinates
  const xMean = iqToSvgX(100, minIq, maxIq, plotLeft, plotRight);
  const yMean = gaussianSvgY(0, baselineY, peakHeight, 2);

  const xMensa = iqToSvgX(130, minIq, maxIq, plotLeft, plotRight);
  const yMensa = gaussianSvgY(2, baselineY, peakHeight, 2);

  const xFsiq = iqToSvgX(163, minIq, maxIq, plotLeft, plotRight);
  const yFsiq = gaussianSvgY(4.2, baselineY, peakHeight, 2);

  const xGai = iqToSvgX(167, minIq, maxIq, plotLeft, plotRight);
  const yGai = gaussianSvgY(4.47, baselineY, peakHeight, 2);

  const currentMarker = METRIC_MARKERS[activeMetric];
  const xActive = iqToSvgX(currentMarker.score, minIq, maxIq, plotLeft, plotRight);
  const yActive = gaussianSvgY(
    (currentMarker.score - 100) / 15,
    baselineY,
    peakHeight,
    2
  );

  const sdTicks = [
    { iq: 55, sd: '-3 SD', pct: '0.1%' },
    { iq: 70, sd: '-2 SD', pct: '2.1%' },
    { iq: 85, sd: '-1 SD', pct: '15.9%' },
    { iq: 100, sd: '0 SD', pct: '50%' },
    { iq: 115, sd: '+1 SD', pct: '84.1%' },
    { iq: 130, sd: '+2 SD', pct: '98%' },
    { iq: 145, sd: '+3 SD', pct: '99.87%' },
    { iq: 160, sd: '+4 SD', pct: '99.997%' },
    { iq: 175, sd: '+5 SD', pct: '99.9999%' },
  ];

  return (
    <section
      id="bell-curve-section"
      aria-labelledby="bell-curve-heading"
      className="bg-white border border-slate-200 rounded-xl p-6 print-break-inside-avoid"
    >
      {/* Header & Interactive Selector */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 mb-5 border-b border-slate-200">
        <div>
          <h2
            id="bell-curve-heading"
            className="text-xl font-bold text-[#0F172A] font-display"
          >
            منحنى التوزيع الطبيعي المعياري (Gaussian Normal Distribution)
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            التموضع الإحصائي للمفحوص عند{' '}
            <span className="font-mono font-semibold text-[#0D9488]" dir="ltr">
              +4.20 SD (FSIQ 163)
            </span>{' '}
            و{' '}
            <span className="font-mono font-semibold text-[#D97706]" dir="ltr">
              +4.47 SD (GAI 167)
            </span>{' '}
            مقارنةً بالمتوسط العالمي (100) وعتبة منسا (130)
          </p>
        </div>

        {/* Segmented Control for Interactive Inspection */}
        <div
          className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg no-print"
          role="group"
          aria-label="اختيار المؤشر لعرضه على منحنى التوزيع الطبيعي"
        >
          {(Object.keys(METRIC_MARKERS) as MetricSelectorId[]).map((id) => {
            const isSelected = activeMetric === id;
            const m = METRIC_MARKERS[id];
            return (
              <button
                key={id}
                type="button"
                onClick={() => onSelectMetric(id)}
                className={`px-2.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 tabular-nums cursor-pointer ${
                  isSelected
                    ? 'bg-[#0F172A] text-white shadow-xs'
                    : 'text-slate-600 hover:text-[#0F172A]'
                }`}
              >
                {id} ({m.score})
              </button>
            );
          })}
        </div>
      </div>

      {/* SVG Gaussian Bell Curve Visualization */}
      <div
        className="w-full overflow-x-auto bg-[#F8FAFC] border border-slate-200/80 rounded-lg p-3"
        dir="ltr"
      >
        <svg
          viewBox="0 0 800 285"
          className="w-full h-auto min-w-[620px] select-none"
          role="img"
          aria-label="منحنى جاوس للتوزيع الطبيعي يوضح موقع الدرجة الكلية 163 ومؤشر القدرة العامة 167 في الذيل الأيمن المتطرف"
        >
          <defs>
            <linearGradient id="bellAreaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#94A3B8" stopOpacity="0.12" />
              <stop offset="37.5%" stopColor="#0F172A" stopOpacity="0.16" />
              <stop offset="62.5%" stopColor="#0D9488" stopOpacity="0.28" />
              <stop offset="87.5%" stopColor="#D97706" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#D97706" stopOpacity="0.65" />
            </linearGradient>

            <linearGradient id="mensaTailGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0D9488" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#D97706" stopOpacity="0.45" />
            </linearGradient>
          </defs>

          {/* Horizontal Grid Lines */}
          {[70, 120, 170].map((gy) => (
            <line
              key={gy}
              x1={plotLeft}
              y1={gy}
              x2={plotRight}
              y2={gy}
              stroke="#E2E8F0"
              strokeDasharray="3 3"
              strokeWidth="1"
            />
          ))}

          {/* Standard Deviation Vertical Reference Guides */}
          {sdTicks.map((t) => {
            const tx = iqToSvgX(t.iq, minIq, maxIq, plotLeft, plotRight);
            const ty = gaussianSvgY((t.iq - 100) / 15, baselineY, peakHeight, 2);
            return (
              <g key={t.iq}>
                <line
                  x1={tx}
                  y1={ty}
                  x2={tx}
                  y2={baselineY}
                  stroke={t.iq === 100 ? '#64748B' : '#CBD5E1'}
                  strokeDasharray={t.iq === 100 ? 'none' : '2 3'}
                  strokeWidth={t.iq === 100 ? '1.5' : '1'}
                />
                {/* Axis Tick */}
                <line
                  x1={tx}
                  y1={baselineY}
                  x2={tx}
                  y2={baselineY + 5}
                  stroke="#475569"
                  strokeWidth="1.2"
                />
                {/* IQ Score Label */}
                <text
                  x={tx}
                  y={baselineY + 19}
                  textAnchor="middle"
                  className="text-[11px] font-bold fill-[#0F172A] font-mono"
                >
                  {t.iq}
                </text>
                {/* SD Label */}
                <text
                  x={tx}
                  y={baselineY + 34}
                  textAnchor="middle"
                  direction="ltr"
                  className="text-[10px] fill-slate-500 font-mono"
                >
                  {t.sd}
                </text>
                {/* Percentile Sub-label */}
                <text
                  x={tx}
                  y={baselineY + 47}
                  textAnchor="middle"
                  direction="ltr"
                  className="text-[9px] fill-slate-400 font-mono"
                >
                  ({t.pct})
                </text>
              </g>
            );
          })}

          {/* Filled Area under Gaussian Curve */}
          <path d={areaPath} fill="url(#bellAreaGrad)" />

          {/* Main Gaussian Curve Stroke */}
          <path
            d={linePath}
            fill="none"
            stroke="#0F172A"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Baseline */}
          <line
            x1={plotLeft}
            y1={baselineY}
            x2={plotRight}
            y2={baselineY}
            stroke="#0F172A"
            strokeWidth="1.5"
          />

          {/* 1. Global Mean (100) Callout */}
          <g>
            <circle cx={xMean} cy={yMean} r="4.5" fill="#0F172A" />
            <rect
              x={xMean - 64}
              y={yMean - 34}
              width="128"
              height="24"
              rx="4"
              fill="#0F172A"
            />
            <text
              x={xMean}
              y={yMean - 18}
              textAnchor="middle"
              className="text-[11px] font-semibold fill-white"
            >
              المتوسط العالمي (100)
            </text>
          </g>

          {/* 2. Mensa Threshold (130, +2.00 SD) Callout */}
          <g>
            <line
              x1={xMensa}
              y1={76}
              x2={xMensa}
              y2={baselineY}
              stroke="#0D9488"
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />
            <circle cx={xMensa} cy={yMensa} r="4.5" fill="#0D9488" />
            <rect
              x={xMensa - 74}
              y={46}
              width="148"
              height="26"
              rx="4"
              fill="#F0FDFA"
              stroke="#0D9488"
              strokeWidth="1"
            />
            <text
              x={xMensa}
              y={63}
              textAnchor="middle"
              direction="ltr"
              className="text-[10.5px] font-bold fill-[#0F766E] font-mono"
            >
              Mensa: 130 (+2.00 SD)
            </text>
          </g>

          {/* 3. FSIQ 163 (+4.20 SD) Pin & Flag */}
          <g>
            <line
              x1={xFsiq}
              y1={96}
              x2={xFsiq}
              y2={baselineY}
              stroke="#0D9488"
              strokeWidth={activeMetric === 'FSIQ' ? '2.5' : '1.75'}
            />
            <circle
              cx={xFsiq}
              cy={yFsiq}
              r={activeMetric === 'FSIQ' ? '6' : '4.5'}
              fill="#0D9488"
              stroke="#FFFFFF"
              strokeWidth="1.5"
            />
            <rect
              x={xFsiq - 138}
              y={66}
              width="142"
              height="38"
              rx="5"
              fill="#0D9488"
            />
            <text
              x={xFsiq - 67}
              y={82}
              textAnchor="middle"
              direction="ltr"
              className="text-[11px] font-bold fill-white font-mono"
            >
              FSIQ: 163 (+4.20 SD)
            </text>
            <text
              x={xFsiq - 67}
              y={96}
              textAnchor="middle"
              className="text-[9.5px] fill-teal-50"
            >
              أعلى من 99.9987%
            </text>
          </g>

          {/* 4. GAI 167 (+4.47 SD) Pin & Flag */}
          <g>
            <line
              x1={xGai}
              y1={46}
              x2={xGai}
              y2={baselineY}
              stroke="#D97706"
              strokeWidth={activeMetric === 'GAI' ? '2.5' : '1.75'}
            />
            <circle
              cx={xGai}
              cy={yGai}
              r={activeMetric === 'GAI' ? '6.5' : '5'}
              fill="#D97706"
              stroke="#FFFFFF"
              strokeWidth="1.5"
            />
            <rect
              x={xGai - 134}
              y={14}
              width="142"
              height="38"
              rx="5"
              fill="#D97706"
            />
            <text
              x={xGai - 63}
              y={30}
              textAnchor="middle"
              direction="ltr"
              className="text-[11px] font-bold fill-white font-mono"
            >
              GAI: 167 (+4.47 SD)
            </text>
            <text
              x={xGai - 63}
              y={44}
              textAnchor="middle"
              className="text-[9.5px] fill-amber-50"
            >
              أعلى من 99.9996%
            </text>
          </g>

          {/* 5. Dynamic Selected Cognitive Index Marker (if VCI/PRI/WMI/PSI is selected) */}
          {activeMetric !== 'FSIQ' && activeMetric !== 'GAI' && (
            <g>
              <line
                x1={xActive}
                y1={122}
                x2={xActive}
                y2={baselineY}
                stroke="#0F172A"
                strokeWidth="2.2"
                strokeDasharray="3 2"
              />
              <circle
                cx={xActive}
                cy={yActive}
                r="6.5"
                fill="#0F172A"
                stroke="#FFFFFF"
                strokeWidth="2"
              />
              <rect
                x={Math.min(plotRight - 134, Math.max(plotLeft, xActive - 67))}
                y={114}
                width="134"
                height="26"
                rx="4"
                fill="#0F172A"
              />
              <text
                x={Math.min(plotRight - 67, Math.max(plotLeft + 67, xActive))}
                y={131}
                textAnchor="middle"
                className="text-[10.5px] font-bold fill-white font-mono"
              >
                {currentMarker.id}: {currentMarker.score} ({currentMarker.sdText})
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Selected Metric Comparative Readout Strip */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100 text-xs">
        <div className="bg-slate-50 rounded-lg p-3 border border-slate-200/70">
          <span className="text-slate-500 block">المؤشر المحدد للمعاينة</span>
          <span className="font-bold text-[#0F172A] text-sm mt-0.5 block font-display">
            {currentMarker.labelAr}
          </span>
        </div>
        <div className="bg-slate-50 rounded-lg p-3 border border-slate-200/70">
          <span className="text-slate-500 block">الدرجة والانحراف المعياري</span>
          <span
            className="font-bold text-[#0F172A] text-sm mt-0.5 block font-mono tabular-nums"
            dir="ltr"
          >
            {currentMarker.score} ({currentMarker.sdText})
          </span>
        </div>
        <div className="bg-slate-50 rounded-lg p-3 border border-slate-200/70">
          <span className="text-slate-500 block">الترتيب المئيني والندرة</span>
          <span className="font-bold text-[#0D9488] text-sm mt-0.5 block tabular-nums">
            {currentMarker.percentile} · {currentMarker.rarity}
          </span>
        </div>
        <div className="bg-slate-50 rounded-lg p-3 border border-slate-200/70">
          <span className="text-slate-500 block">الفارق عن عتبة منسا (130)</span>
          <span
            className="font-bold text-[#D97706] text-sm mt-0.5 block font-mono tabular-nums"
            dir="ltr"
          >
            +{currentMarker.score - 130} pts (+{((currentMarker.score - 130) / 15).toFixed(2)} SD)
          </span>
        </div>
      </div>
    </section>
  );
};

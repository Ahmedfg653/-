import React, { useState } from 'react';
import { CoreCognitiveIndex, SubtestItem } from '../data/reportData';
import { calculateRadarPolygonPoints } from '../utils/psychometrics';
import { MetricSelectorId } from './BellCurveChart';

interface CognitiveRadarChartProps {
  indices: CoreCognitiveIndex[];
  subtests: SubtestItem[];
  selectedMetric: MetricSelectorId;
  onSelectMetric: (id: MetricSelectorId) => void;
}

export const CognitiveRadarChart: React.FC<CognitiveRadarChartProps> = ({
  indices,
  subtests,
  selectedMetric,
  onSelectMetric,
}) => {
  const [radarMode, setRadarMode] = useState<'INDICES_4' | 'SUBTESTS_12'>('INDICES_4');

  const centerX = 290;
  const centerY = 215;
  const maxRadius = 128;

  // Mode 1: 4 Core Indices (Scale 70 to 175 so differences between 100, 130, and 157-169 are geometrically clear)
  const minIndexScale = 70;
  const maxIndexScale = 175;
  const indexItems = indices.map((i) => ({
    code: i.code,
    label: i.arabicName.replace(/\s*\([^)]*\)/, ''),
    value: i.score,
  }));

  const examineeIndicesPoly = calculateRadarPolygonPoints(
    indexItems,
    minIndexScale,
    maxIndexScale,
    centerX,
    centerY,
    maxRadius
  );

  const mean100Poly = calculateRadarPolygonPoints(
    indexItems.map((i) => ({ ...i, value: 100 })),
    minIndexScale,
    maxIndexScale,
    centerX,
    centerY,
    maxRadius
  );

  const mensa130Poly = calculateRadarPolygonPoints(
    indexItems.map((i) => ({ ...i, value: 130 })),
    minIndexScale,
    maxIndexScale,
    centerX,
    centerY,
    maxRadius
  );

  const ringLevels4 = [100, 130, 150, 175];

  // Mode 2: 12 Subtests (Scale 0 to 22)
  const minSubtestScale = 0;
  const maxSubtestScale = 22;
  const subtestItems = subtests.map((s) => ({
    code: `${s.order}`,
    label: s.arabicName,
    value: s.scaledScore,
  }));

  const examineeSubtestsPoly = calculateRadarPolygonPoints(
    subtestItems,
    minSubtestScale,
    maxSubtestScale,
    centerX,
    centerY,
    maxRadius
  );

  const subtestMean10Poly = calculateRadarPolygonPoints(
    subtestItems.map((s) => ({ ...s, value: 10 })),
    minSubtestScale,
    maxSubtestScale,
    centerX,
    centerY,
    maxRadius
  );

  const subtestGifted16Poly = calculateRadarPolygonPoints(
    subtestItems.map((s) => ({ ...s, value: 16 })),
    minSubtestScale,
    maxSubtestScale,
    centerX,
    centerY,
    maxRadius
  );

  const ringLevels12 = [10, 14, 18, 22];

  // Pairwise Discrepancy Comparisons
  const discrepancies = [
    {
      pair: 'الفهم اللفظي (VCI: 169) مقابل الاستدلال البصري (PRI: 165)',
      diff: '+4 نقاط',
      sdDiff: '0.27 SD',
      interpretation: 'تجانس وتوازن فائق بين الذكاء المتبلور اللغوي والذكاء السائل البصري الكمي',
      statusColor: '#0D9488',
    },
    {
      pair: 'مؤشر القدرة العامة (GAI: 167) مقابل الكفاءة المعرفية (CPI: 159)',
      diff: '+8 نقاط',
      sdDiff: '0.53 SD',
      interpretation: 'تفوق نسبي للقدرات التجريدية والاستنتاجية العليا مع كفاءة تنفيذية في المئين 99.99%',
      statusColor: '#D97706',
    },
    {
      pair: 'الفهم اللفظي (VCI: 169) مقابل الذاكرة العاملة (WMI: 161)',
      diff: '+8 نقاط',
      sdDiff: '0.53 SD',
      interpretation: 'سعة ذاكرة عاملة فائقة تدعم المعالجة المفاهيمية واللغوية المعقدة دون اختناق معرفي',
      statusColor: '#0D9488',
    },
    {
      pair: 'أقصى مدى بين المؤشرات الأربعة (VCI: 169 ↔ PSI: 157)',
      diff: '+12 نقطة',
      sdDiff: '0.80 SD',
      interpretation: 'جميع المؤشرات الأربعة تقع فوق +3.80 SD مما يؤكد توازناً شاملاً في قمة التوزيع الطبيعي',
      statusColor: '#0F172A',
    },
  ];

  return (
    <section
      id="radar-chart-section"
      aria-labelledby="radar-chart-heading"
      className="bg-white border border-slate-200 rounded-xl p-6 print-break-inside-avoid"
    >
      {/* Section Header & Mode Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 mb-5 border-b border-slate-200">
        <div>
          <h2
            id="radar-chart-heading"
            className="text-xl font-bold text-[#0F172A] font-display"
          >
            المخطط الراداري لتوازن القدرات الإدراكية (Cognitive Balance Radar Chart)
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            رؤية بصرية مقارنة لميزان القدرات والتباين البيني عبر الفهم اللفظي (169)، الاستدلال البصري (165)، الذاكرة العاملة (161)، وسرعة المعالجة (157)
          </p>
        </div>

        {/* Interactive Mode Toggle */}
        <div
          className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg no-print shrink-0"
          role="tablist"
          aria-label="نمط عرض المخطط الراداري"
        >
          <button
            type="button"
            role="tab"
            aria-selected={radarMode === 'INDICES_4'}
            onClick={() => setRadarMode('INDICES_4')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              radarMode === 'INDICES_4'
                ? 'bg-[#0F172A] text-white shadow-xs'
                : 'text-slate-600 hover:text-[#0F172A]'
            }`}
          >
            المؤشرات الأربعة (4 محاور)
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={radarMode === 'SUBTESTS_12'}
            onClick={() => setRadarMode('SUBTESTS_12')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              radarMode === 'SUBTESTS_12'
                ? 'bg-[#0F172A] text-white shadow-xs'
                : 'text-slate-600 hover:text-[#0F172A]'
            }`}
          >
            الاختبارات الفرعية (12 محوراً)
          </button>
        </div>
      </div>

      {/* Main Content Split: Radar SVG on Right/Top + Discrepancy Balance Matrix on Left/Bottom */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
        {/* SVG Radar Visualization */}
        <div className="xl:col-span-6 bg-[#F8FAFC] border border-slate-200/80 rounded-xl p-4 flex flex-col items-center justify-between">
          {radarMode === 'INDICES_4' ? (
            <svg
              viewBox="0 0 580 430"
              className="w-full max-w-[500px] h-auto select-none my-auto"
              role="img"
              aria-label="مخطط راداري رباعي المحاور يوضح توازن مؤشرات الفهم اللفظي 169 والاستدلال البصري 165 والذاكرة العاملة 161 وسرعة المعالجة 157 مقارنة بالمتوسط العالمي 100 وعتبة منسا 130"
            >
              <defs>
                <radialGradient id="radarTealFill" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#0D9488" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#0D9488" stopOpacity="0.38" />
                </radialGradient>
              </defs>

              {/* Concentric Reference Polygons (100, 130, 150, 175) */}
              {ringLevels4.map((lvl) => {
                const ringPoly = calculateRadarPolygonPoints(
                  indexItems.map((i) => ({ ...i, value: lvl })),
                  minIndexScale,
                  maxIndexScale,
                  centerX,
                  centerY,
                  maxRadius
                );
                return (
                  <g key={lvl}>
                    <polygon
                      points={ringPoly.svgPointsString}
                      fill="none"
                      stroke={lvl === 175 ? '#CBD5E1' : '#E2E8F0'}
                      strokeWidth={lvl === 175 ? '1.5' : '1'}
                    />
                    <text
                      x={centerX + 6}
                      y={
                        centerY -
                        ((lvl - minIndexScale) / (maxIndexScale - minIndexScale)) *
                          maxRadius +
                        11
                      }
                      textAnchor="start"
                      direction="ltr"
                      className="text-[9.5px] fill-slate-400 font-mono"
                    >
                      {lvl}
                    </text>
                  </g>
                );
              })}

              {/* 4 Orthogonal Axis Spokes */}
              {indexItems.map((_, idx) => {
                const outerPt = calculateRadarPolygonPoints(
                  indexItems.map((i) => ({ ...i, value: maxIndexScale })),
                  minIndexScale,
                  maxIndexScale,
                  centerX,
                  centerY,
                  maxRadius
                ).points[idx];

                return (
                  <line
                    key={idx}
                    x1={centerX}
                    y1={centerY}
                    x2={outerPt.x}
                    y2={outerPt.y}
                    stroke="#CBD5E1"
                    strokeWidth="1.2"
                  />
                );
              })}

              {/* Population Mean (100) Reference Polygon */}
              <polygon
                points={mean100Poly.svgPointsString}
                fill="rgba(100, 116, 139, 0.08)"
                stroke="#64748B"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />

              {/* Mensa Threshold (130) Reference Polygon */}
              <polygon
                points={mensa130Poly.svgPointsString}
                fill="rgba(217, 119, 6, 0.06)"
                stroke="#D97706"
                strokeWidth="1.6"
                strokeDasharray="5 3"
              />

              {/* Examinee's 4-Index Polygon (169, 165, 161, 157) */}
              <polygon
                points={examineeIndicesPoly.svgPointsString}
                fill="url(#radarTealFill)"
                stroke="#0D9488"
                strokeWidth="2.8"
                strokeLinejoin="round"
              />

              {/* Vertex Points & Interactive Callout Labels */}
              {examineeIndicesPoly.points.map((pt, idx) => {
                const idxObj = indices[idx];
                const isSelected = selectedMetric === idxObj.id;
                // Position outer labels cleanly around top, right, bottom, left
                const labelOffsets: Array<{ dx: number; dy: number }> = [
                  { dx: 0, dy: -32 },   // Top: VCI 169
                  { dx: 82, dy: -6 },   // Right: PRI 165
                  { dx: 0, dy: 34 },    // Bottom: WMI 161
                  { dx: -82, dy: -6 },  // Left: PSI 157
                ];
                const off = labelOffsets[idx];
                const outerVertex = calculateRadarPolygonPoints(
                  indexItems.map((i) => ({ ...i, value: maxIndexScale })),
                  minIndexScale,
                  maxIndexScale,
                  centerX,
                  centerY,
                  maxRadius
                ).points[idx];

                const badgeX = outerVertex.x + off.dx;
                const badgeY = outerVertex.y + off.dy;

                return (
                  <g
                    key={pt.code}
                    onClick={() => onSelectMetric(idxObj.id)}
                    className="cursor-pointer"
                  >
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isSelected ? 7 : 5.5}
                      fill={pt.value >= 165 ? '#D97706' : '#0D9488'}
                      stroke="#FFFFFF"
                      strokeWidth="2"
                    />
                    <rect
                      x={badgeX - 68}
                      y={badgeY - 16}
                      width="136"
                      height="38"
                      rx="6"
                      fill={isSelected ? '#0F172A' : '#FFFFFF'}
                      stroke={isSelected ? '#0F172A' : '#CBD5E1'}
                      strokeWidth="1.2"
                    />
                    <text
                      x={badgeX}
                      y={badgeY - 1}
                      textAnchor="middle"
                      className={`text-[11px] font-bold ${
                        isSelected ? 'fill-white' : 'fill-[#0F172A]'
                      }`}
                    >
                      {pt.label}
                    </text>
                    <text
                      x={badgeX}
                      y={badgeY + 14}
                      textAnchor="middle"
                      direction="ltr"
                      className={`text-[11px] font-extrabold font-mono ${
                        isSelected
                          ? 'fill-teal-300'
                          : pt.value >= 165
                          ? 'fill-[#D97706]'
                          : 'fill-[#0D9488]'
                      }`}
                    >
                      {pt.code}: {pt.value} ({idxObj.sdText})
                    </text>
                  </g>
                );
              })}
            </svg>
          ) : (
            /* 12-Axis Subtest Profile Radar SVG */
            <svg
              viewBox="0 0 580 430"
              className="w-full max-w-[500px] h-auto select-none my-auto"
              role="img"
              aria-label="مخطط راداري ذو 12 محوراً يوضح توازن جميع الاختبارات الفرعية الـ 12 مقارنة بالمتوسط السكاني 10 من 22"
            >
              {ringLevels12.map((lvl) => {
                const ringPoly = calculateRadarPolygonPoints(
                  subtestItems.map((s) => ({ ...s, value: lvl })),
                  minSubtestScale,
                  maxSubtestScale,
                  centerX,
                  centerY,
                  maxRadius
                );
                return (
                  <polygon
                    key={lvl}
                    points={ringPoly.svgPointsString}
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="1"
                  />
                );
              })}

              {/* 12 Spokes & Outer Labels */}
              {subtestItems.map((item, idx) => {
                const outerPt = calculateRadarPolygonPoints(
                  subtestItems.map((s) => ({ ...s, value: maxSubtestScale })),
                  minSubtestScale,
                  maxSubtestScale,
                  centerX,
                  centerY,
                  maxRadius
                ).points[idx];

                const labelPt = calculateRadarPolygonPoints(
                  subtestItems.map((s) => ({ ...s, value: maxSubtestScale })),
                  minSubtestScale,
                  maxSubtestScale,
                  centerX,
                  centerY,
                  maxRadius + 30
                ).points[idx];

                return (
                  <g key={item.code}>
                    <line
                      x1={centerX}
                      y1={centerY}
                      x2={outerPt.x}
                      y2={outerPt.y}
                      stroke="#CBD5E1"
                      strokeWidth="1"
                    />
                    <text
                      x={labelPt.x}
                      y={labelPt.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-[10px] font-bold fill-[#0F172A]"
                    >
                      {item.label} ({item.value})
                    </text>
                  </g>
                );
              })}

              {/* Population Mean (10/22) Polygon */}
              <polygon
                points={subtestMean10Poly.svgPointsString}
                fill="rgba(100, 116, 139, 0.08)"
                stroke="#64748B"
                strokeWidth="1.4"
                strokeDasharray="3 3"
              />

              {/* Gifted (+2 SD = 16/22) Polygon */}
              <polygon
                points={subtestGifted16Poly.svgPointsString}
                fill="rgba(217, 119, 6, 0.05)"
                stroke="#D97706"
                strokeWidth="1.4"
                strokeDasharray="4 3"
              />

              {/* Examinee 12 Subtests Polygon */}
              <polygon
                points={examineeSubtestsPoly.svgPointsString}
                fill="rgba(13, 148, 136, 0.25)"
                stroke="#0D9488"
                strokeWidth="2.5"
              />

              {examineeSubtestsPoly.points.map((pt) => (
                <circle
                  key={pt.code}
                  cx={pt.x}
                  cy={pt.y}
                  r="4"
                  fill={pt.value >= 20 ? '#D97706' : '#0D9488'}
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                />
              ))}
            </svg>
          )}

          {/* Legend Strip */}
          <div className="mt-2 pt-3 border-t border-slate-200/80 w-full flex flex-wrap items-center justify-center gap-5 text-xs text-slate-600">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-xs bg-[#0D9488] inline-block" />
              <span className="font-semibold text-[#0F172A]">
                {radarMode === 'INDICES_4'
                  ? 'أداء المفحوص (157 – 169)'
                  : 'الدرجات الموزونة للمفحوص (18 – 21 / 22)'}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 border-b-2 border-dashed border-[#D97706] inline-block" />
              <span>
                {radarMode === 'INDICES_4'
                  ? 'عتبة التفوق / منسا (130)'
                  : 'عتبة التفوق (+2 SD = 16/22)'}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 border-b-2 border-dashed border-slate-500 inline-block" />
              <span>
                {radarMode === 'INDICES_4'
                  ? 'المتوسط العالمي (100)'
                  : 'المتوسط السكاني (10/22)'}
              </span>
            </div>
          </div>
        </div>

        {/* Cognitive Balance & Discrepancy Analysis Panel */}
        <div className="xl:col-span-6 space-y-4">
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4">
            <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-200">
              <div>
                <h3 className="text-base font-bold text-[#0F172A] font-display">
                  قراءة ميزان القدرات والتباين البيني (Index Discrepancy Analysis)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  مقارنة الفروق المعيارية بين القدرات اللفظية والبصرية والذاكرة وسرعة المعالجة
                </p>
              </div>
              <span
                className="text-xs font-mono font-bold text-[#0D9488] shrink-0"
                dir="ltr"
              >
                GAI 167 vs CPI 159
              </span>
            </div>

            <div className="space-y-3">
              {discrepancies.map((d, index) => (
                <div
                  key={index}
                  className="bg-white border border-slate-200/90 rounded-lg p-3.5"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-xs font-bold text-[#0F172A] font-display">
                      {d.pair}
                    </span>
                    <span
                      className="text-xs font-mono font-extrabold shrink-0 tabular-nums"
                      style={{ color: d.statusColor }}
                      dir="ltr"
                    >
                      {d.diff} ({d.sdDiff})
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {d.interpretation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Balance Bar Comparing GAI (VCI+PRI) vs CPI (WMI+PSI) */}
          <div className="bg-[#0F172A] text-white rounded-xl p-4">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <div>
                <span className="text-teal-300 font-semibold block">
                  خلاصة التوازن الإدراكي الشامل
                </span>
                <p className="text-slate-300 mt-0.5 leading-relaxed">
                  يُظهر المضلع الراداري اتساعاً متماثلاً يقترب من الحافة القصوى للمقياس الممتد (175)، حيث تتصدر المحاكمة اللفظية (169) والاستدلال البصري (165) قمة الأداء، مدعومتين بذاكرة عاملة (161) وسرعة معالجة (157) في المئين 99.99%.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

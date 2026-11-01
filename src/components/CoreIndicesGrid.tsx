import React from 'react';
import { CoreCognitiveIndex } from '../data/reportData';

interface CoreIndicesGridProps {
  indices: CoreCognitiveIndex[];
  selectedIndexId: string;
  onSelectIndex: (id: 'FSIQ' | 'GAI' | 'VCI' | 'PRI' | 'WMI' | 'PSI') => void;
}

export const CoreIndicesGrid: React.FC<CoreIndicesGridProps> = ({
  indices,
  selectedIndexId,
  onSelectIndex,
}) => {
  return (
    <section
      id="cognitive-indices"
      aria-labelledby="indices-heading"
      className="bg-white border border-slate-200 rounded-xl p-6 print-break-inside-avoid"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-4 pb-4 mb-5 border-b border-slate-200">
        <div>
          <h2
            id="indices-heading"
            className="text-xl font-bold text-[#0F172A] font-display"
          >
            المؤشرات الإدراكية الأساسية الأربعة (Core Cognitive Indices)
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            تحليل الأداء المعرفي عبر الأبعاد الأربعة لمقياس WAIS-IV (المتوسط المعياري = 100 · الانحراف المعياري = 15)
          </p>
        </div>
        <div className="text-xs text-slate-500 tabular-nums">
          <span>انقر على أي مؤشر لتسليط الضوء عليه في منحنى التوزيع الطبيعي</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 print-grid-2">
        {indices.map((idx) => {
          const isSelected = selectedIndexId === idx.id;
          // Calculate percentage along scale 40 to 175
          const progressPct = Math.min(100, Math.max(10, ((idx.score - 40) / (175 - 40)) * 100));
          const meanMarkerPct = ((100 - 40) / (175 - 40)) * 100; // ~44.4%
          const mensaMarkerPct = ((130 - 40) / (175 - 40)) * 100; // ~66.7%

          const isGoldTier = idx.score >= 165;

          return (
            <button
              key={idx.id}
              type="button"
              onClick={() => onSelectIndex(idx.id)}
              aria-pressed={isSelected}
              className={`w-full text-right rounded-lg p-4 border transition-all duration-150 focus-visible:outline-2 focus-visible:outline-[#0D9488] ${
                isSelected
                  ? 'border-[#0D9488] bg-[#F8FAFC]'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-[#0F172A] font-display">
                      {idx.arabicName}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">
                    {idx.englishName}
                  </p>
                </div>

                <div className="text-left shrink-0">
                  <div className="text-2xl font-extrabold text-[#0F172A] tabular-nums font-display leading-none">
                    {idx.score}
                  </div>
                  <div
                    className={`text-xs font-semibold font-mono tabular-nums mt-1 ${
                      isGoldTier ? 'text-[#D97706]' : 'text-[#0D9488]'
                    }`}
                    dir="ltr"
                  >
                    {idx.sdText}
                  </div>
                </div>
              </div>

              {/* Sleek Progress Bar with Mean (100) and Mensa (130) Reference Ticks */}
              <div className="mt-4">
                <div className="relative h-2.5 w-full bg-slate-100 rounded-full overflow-hidden flex items-center justify-start">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${progressPct}%`,
                      backgroundColor: isGoldTier ? '#D97706' : '#0D9488',
                    }}
                  />
                  {/* Reference tick at 100 */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-slate-400/80"
                    style={{ right: `${meanMarkerPct}%` }}
                    title="المتوسط العالمي (100)"
                  />
                  {/* Reference tick at 130 */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-slate-700/70"
                    style={{ right: `${mensaMarkerPct}%` }}
                    title="عتبة التفوق / منسا (130)"
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1 tabular-nums">
                  <span>40</span>
                  <span>المتوسط: 100</span>
                  <span>منسا: 130</span>
                  <span>السقف الممتد: 175</span>
                </div>
              </div>

              {/* Clean unboxed metadata row */}
              <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
                <div className="flex items-center gap-1.5 tabular-nums">
                  <span className="text-slate-500">المئين:</span>
                  <span className="font-bold text-[#0F172A] font-mono">{idx.percentile}</span>
                  <span aria-hidden="true" className="text-slate-300">·</span>
                  <span className="text-slate-500">فترة الثقة 95%:</span>
                  <span className="font-mono text-slate-700" dir="ltr">{idx.confidenceInterval}</span>
                </div>
                <div
                  className={`font-semibold ${
                    isGoldTier ? 'text-[#B45309]' : 'text-[#0F766E]'
                  }`}
                >
                  التقييم: {idx.evaluation}
                </div>
              </div>

              <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                {idx.description}
              </p>
            </button>
          );
        })}
      </div>
    </section>
  );
};

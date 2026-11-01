import React, { useState } from 'react';
import { PersonalMetadata, CompositeScore } from '../data/reportData';
import { CircularGauge } from './CircularGauge';
import { MetricSelectorId } from './BellCurveChart';
import { Check, Copy, ShieldCheck } from 'lucide-react';

interface ExamineeSidebarProps {
  metadata: PersonalMetadata;
  compositeScores: CompositeScore[];
  activeMetric: MetricSelectorId;
  onSelectMetric: (id: MetricSelectorId) => void;
}

export const ExamineeSidebar: React.FC<ExamineeSidebarProps> = ({
  metadata,
  compositeScores,
  activeMetric,
  onSelectMetric,
}) => {
  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopyRefCode = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(metadata.referenceCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <aside
      aria-label="الملف الشخصي والدرجات الكلية المركبة"
      className="space-y-6"
    >
      {/* 1. Personal & Test Metadata Official Card */}
      <section
        id="personal-profile"
        aria-labelledby="profile-heading"
        className="bg-white border border-slate-200 rounded-xl overflow-hidden print-break-inside-avoid"
      >
        <div className="bg-[#0F172A] text-white px-6 py-4">
          <p className="text-[11px] text-teal-300 font-medium tracking-wide">
            بيانات المفحوص والتوثيق المرجعي
          </p>
          <h2 id="profile-heading" className="text-xl font-bold font-display mt-0.5">
            {metadata.fullName}
          </h2>
          <p className="text-xs text-slate-300 mt-1 font-mono tabular-nums" dir="ltr">
            REF: {metadata.referenceCode}
          </p>
        </div>

        <div className="p-6">
          <dl className="divide-y divide-slate-100 text-xs">
            <div className="py-2.5 flex items-baseline justify-between gap-4">
              <dt className="text-slate-500 shrink-0">الاسم الكامل</dt>
              <dd className="font-bold text-[#0F172A] text-sm text-left">
                {metadata.fullName}
              </dd>
            </div>

            <div className="py-2.5 flex items-baseline justify-between gap-4">
              <dt className="text-slate-500 shrink-0">تاريخ الميلاد</dt>
              <dd className="font-semibold text-[#0F172A] tabular-nums text-left">
                {metadata.birthDateText} ({metadata.birthDateNumeric})
              </dd>
            </div>

            <div className="py-2.5 flex items-baseline justify-between gap-4">
              <dt className="text-slate-500 shrink-0">تاريخ إجراء التقييم</dt>
              <dd className="font-semibold text-[#0F172A] tabular-nums text-left">
                {metadata.assessmentDate}
              </dd>
            </div>

            <div className="py-2.5 flex items-baseline justify-between gap-4">
              <dt className="text-slate-500 shrink-0">العمر الزمني وقت التقييم</dt>
              <dd className="font-semibold text-[#0D9488] tabular-nums text-left">
                {metadata.chronologicalAge}
              </dd>
            </div>

            <div className="py-3">
              <dt className="text-slate-500 mb-1">اسم المقياس المعتمد</dt>
              <dd className="font-semibold text-[#0F172A] leading-relaxed">
                {metadata.scaleName}
              </dd>
            </div>

            <div className="pt-3 flex items-center justify-between gap-2">
              <div>
                <dt className="text-slate-500">الكود المرجعي للتوثيق</dt>
                <dd
                  className="font-mono font-bold text-[#0F172A] text-xs mt-0.5 select-all tabular-nums"
                  dir="ltr"
                >
                  {metadata.referenceCode}
                </dd>
              </div>
              <button
                type="button"
                onClick={handleCopyRefCode}
                aria-label="نسخ الكود المرجعي للتوثيق"
                className="no-print inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors shrink-0 cursor-pointer"
              >
                {copiedCode ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#0D9488]" />
                    <span>تم النسخ</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span>نسخ الكود</span>
                  </>
                )}
              </button>
            </div>
          </dl>
        </div>
      </section>

      {/* 2. Primary Composite Scores (Hero Cards: FSIQ 163 & GAI 167) */}
      <div id="composite-scores" className="space-y-4">
        {compositeScores.map((comp) => {
          const isSelected = activeMetric === comp.id;
          const isGold = comp.accentColor === 'gold';

          return (
            <section
              key={comp.id}
              aria-labelledby={`hero-${comp.id}-title`}
              onClick={() => onSelectMetric(comp.id)}
              className={`bg-white border rounded-xl p-6 transition-all cursor-pointer print-break-inside-avoid ${
                isSelected
                  ? isGold
                    ? 'border-[#D97706] ring-1 ring-[#D97706]/30'
                    : 'border-[#0D9488] ring-1 ring-[#0D9488]/30'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Top Row: Title + Circular Gauge */}
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <span
                    className={`text-xs font-bold tracking-wide ${
                      isGold ? 'text-[#D97706]' : 'text-[#0D9488]'
                    }`}
                  >
                    {isGold ? 'مؤشر التجريد والاستنتاج الخالص' : 'المؤشر المركب الشامل'}
                  </span>
                  <h3
                    id={`hero-${comp.id}-title`}
                    className="text-lg font-extrabold text-[#0F172A] font-display leading-snug"
                  >
                    {comp.arabicTitle}:{' '}
                    <span className="tabular-nums font-mono">{comp.score}</span>
                  </h3>
                  <p className="text-xs text-slate-500 font-mono">{comp.englishTitle}</p>
                </div>

                <CircularGauge
                  score={comp.score}
                  code={comp.code}
                  sdText={comp.sdText}
                  accentColor={comp.accentColor}
                  size={124}
                />
              </div>

              {/* Exact Statistical Metrics Breakdown */}
              <dl className="mt-5 pt-4 border-t border-slate-100 space-y-2.5 text-xs">
                <div className="flex items-baseline justify-between gap-2">
                  <dt className="text-slate-500">الانحراف المعياري:</dt>
                  <dd
                    className="font-mono font-bold text-[#0F172A] tabular-nums"
                    dir="ltr"
                  >
                    {comp.sdText}
                  </dd>
                </div>

                <div className="flex items-baseline justify-between gap-2">
                  <dt className="text-slate-500">الترتيب المئيني العالمي:</dt>
                  <dd className="font-bold text-[#0D9488] tabular-nums">
                    {comp.percentileText}
                  </dd>
                </div>

                <div className="flex items-baseline justify-between gap-2">
                  <dt className="text-slate-500">الندرة الإحصائية:</dt>
                  <dd className="font-bold text-[#D97706] tabular-nums">
                    {comp.rarityText}
                  </dd>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <dt className="text-slate-500 mb-1">التصنيف الإكلينيكي:</dt>
                  <dd className="font-bold text-[#0F172A] text-sm font-display">
                    {comp.clinicalClassificationAr} ({comp.clinicalClassificationEn})
                  </dd>
                </div>
              </dl>

              <p className="mt-3 text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200/60">
                {comp.summaryNote}
              </p>
            </section>
          );
        })}
      </div>

      {/* 3. Executive Clinical Summary & Official Seal */}
      <section
        id="executive-summary"
        aria-labelledby="exec-summary-heading"
        className="bg-white border border-slate-200 rounded-xl p-6 print-break-inside-avoid"
      >
        <div className="flex items-center justify-between gap-3 pb-3 mb-3 border-b border-slate-200">
          <h3
            id="exec-summary-heading"
            className="text-base font-bold text-[#0F172A] font-display"
          >
            الملخص التنفيذي والتوصيف الإكلينيكي
          </h3>
          <ShieldCheck className="w-5 h-5 text-[#0D9488] shrink-0" />
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          تُظهر نتائج التقييم السيكومتري الشامل للمفحوص{' '}
          <strong className="text-[#0F172A]">{metadata.fullName}</strong> على مقياس وكسلر
          لذكاء البالغين (WAIS-IV Extended Norms) ملفاً إدراكياً استثنائياً يقع في أقصى الذيل
          الأيمن للتوزيع الطبيعي البشري. بتحقيق درجة كلية{' '}
          <strong className="text-[#0F172A] font-mono tabular-nums">163 (+4.20 SD)</strong>{' '}
          ومؤشر قدرة عامة خالصة{' '}
          <strong className="text-[#D97706] font-mono tabular-nums">167 (+4.47 SD)</strong>،
          يتجاوز الأداء عتبة القبول في جمعيات الذكاء العالي العالمية (مثل Mensa عند 130 أي +2.00 SD)
          بفارق يتخطى انحرافين معياريين كاملين إضافيين.
        </p>

        <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            <p className="font-bold text-[#0F172A]">حالة التوثيق الإكلينيكي</p>
            <p className="mt-0.5">معتمد ومطابق للمعايير الممتدة · WAIS-IV Extended Norms</p>
          </div>
          {/* Official Vector Verification Emblem */}
          <div className="text-left font-mono text-[10px] text-slate-600 border border-slate-200 rounded px-2.5 py-1.5 bg-slate-50 shrink-0" dir="ltr">
            <div className="font-bold text-[#0F172A]">VERIFIED REPORT</div>
            <div className="text-[#0D9488]">SD = 15 · MEAN = 100</div>
          </div>
        </div>
      </section>
    </aside>
  );
};

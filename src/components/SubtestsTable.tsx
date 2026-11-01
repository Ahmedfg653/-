import React, { useState } from 'react';
import { SubtestItem } from '../data/reportData';
import { filterSubtests, calculateSubtestSummary } from '../utils/psychometrics';
import { Search, X } from 'lucide-react';

interface SubtestsTableProps {
  subtests: SubtestItem[];
}

export const SubtestsTable: React.FC<SubtestsTableProps> = ({ subtests }) => {
  const [domainFilter, setDomainFilter] = useState<'ALL' | 'VCI' | 'PRI' | 'WMI' | 'PSI'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const filtered = filterSubtests(subtests, domainFilter, searchQuery);
  const summary = calculateSubtestSummary(filtered);

  const filterTabs: Array<{ id: 'ALL' | 'VCI' | 'PRI' | 'WMI' | 'PSI'; label: string }> = [
    { id: 'ALL', label: 'جميع الاختبارات (12)' },
    { id: 'VCI', label: 'الفهم اللفظي (VCI)' },
    { id: 'PRI', label: 'الاستدلال البصري (PRI)' },
    { id: 'WMI', label: 'الذاكرة العاملة (WMI)' },
    { id: 'PSI', label: 'سرعة المعالجة (PSI)' },
  ];

  return (
    <section
      id="subtests-table"
      aria-labelledby="subtests-heading"
      className="bg-white border border-slate-200 rounded-xl p-6 print-break-inside-avoid"
    >
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 mb-5 border-b border-slate-200">
        <div>
          <h2
            id="subtests-heading"
            className="text-xl font-bold text-[#0F172A] font-display"
          >
            نتائج الاختبارات الفرعية الـ 12 (Detailed Subtest Scaled Scores)
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            الدرجات الموزونة على المقياس الممتد (Extended Scale 1–22) · المتوسط السكاني = 10 · الدرجات 18–21 تمثل أعلى 0.01% عالمياً
          </p>
        </div>

        {/* Summary Metrics unboxed text with separators */}
        <div className="flex items-center gap-2 text-xs text-slate-600 tabular-nums bg-slate-50 px-3 py-2 rounded-lg border border-slate-200/70">
          <span>مجموع الدرجات الموزونة: <strong className="text-[#0F172A] font-mono">{summary.sumScaledScores}</strong></span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span>المتوسط الموزون: <strong className="text-[#0D9488] font-mono">{summary.meanScaledScore} / 22</strong></span>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <span>المدى: <strong className="text-[#D97706] font-mono" dir="ltr">{summary.minScore}–{summary.maxScore}</strong></span>
        </div>
      </div>

      {/* Interactive Filter & Search Controls (Hidden in Print) */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 mb-5 no-print">
        <div
          className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg"
          role="tablist"
          aria-label="تصفية الاختبارات الفرعية حسب المجال الإدراكي"
        >
          {filterTabs.map((tab) => {
            const active = domainFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setDomainFilter(tab.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-white text-[#0F172A] shadow-xs'
                    : 'text-slate-600 hover:text-[#0F172A]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="relative w-full md:w-64">
          <label htmlFor="subtest-search" className="sr-only">
            بحث في الاختبارات الفرعية
          </label>
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            id="subtest-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="بحث باسم الاختبار (مثال: المفردات)..."
            className="w-full pr-9 pl-8 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-[#0F172A] placeholder:text-slate-400 focus:outline-none focus:border-[#0D9488] focus:bg-white transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              aria-label="مسح البحث"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="text-center py-10 bg-slate-50 rounded-lg border border-slate-200/70">
          <p className="text-sm font-semibold text-slate-700">
            لا توجد اختبارات فرعية مطابقة لمعايير البحث الحالية
          </p>
          <button
            type="button"
            onClick={() => {
              setDomainFilter('ALL');
              setSearchQuery('');
            }}
            className="mt-3 px-4 py-1.5 text-xs font-semibold text-white bg-[#0F172A] rounded-lg hover:bg-slate-800 transition-colors"
          >
            إعادة ضبط التصفية
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto border border-slate-200 rounded-lg">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-[#0F172A] text-white text-xs">
                <th className="py-3 px-3 font-semibold w-10 text-center">#</th>
                <th className="py-3 px-3.5 font-semibold">المجال الإدراكي</th>
                <th className="py-3 px-3.5 font-semibold">الاختبار الفرعي (Subtest)</th>
                <th className="py-3 px-3.5 font-semibold text-center">الدرجة الموزونة (من 22)</th>
                <th className="py-3 px-3.5 font-semibold w-44">التمثيل المعياري (المتوسط = 10)</th>
                <th className="py-3 px-3.5 font-semibold">التوصيف الإكلينيكي للأداء</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs">
              {filtered.map((item) => {
                const isExpanded = expandedRow === item.order;
                const pctOfScale = (item.scaledScore / item.maxScaledScore) * 100;
                const meanPct = (10 / item.maxScaledScore) * 100;
                const isRareGold = item.scaledScore >= 20;

                return (
                  <React.Fragment key={item.order}>
                    <tr
                      onClick={() => setExpandedRow(isExpanded ? null : item.order)}
                      className="hover:bg-slate-50/90 transition-colors cursor-pointer"
                    >
                      <td className="py-3 px-3 text-center font-mono font-semibold text-slate-500 tabular-nums">
                        {item.order}
                      </td>
                      <td className="py-3 px-3.5 font-medium text-slate-700 whitespace-nowrap">
                        {item.domainArabic}
                      </td>
                      <td className="py-3 px-3.5">
                        <div className="font-bold text-[#0F172A] text-sm font-display">
                          {item.arabicName}
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono">
                          {item.englishName}
                        </div>
                      </td>
                      <td className="py-3 px-3.5 text-center tabular-nums">
                        <span
                          className={`inline-block font-mono text-base font-extrabold ${
                            isRareGold ? 'text-[#D97706]' : 'text-[#0D9488]'
                          }`}
                        >
                          {item.scaledScore}
                        </span>
                        <span className="text-slate-400 font-mono text-[11px]"> / 22</span>
                        <div
                          className="text-[10px] text-slate-500 font-mono"
                          dir="ltr"
                        >
                          {item.sdAboveMean}
                        </div>
                      </td>
                      <td className="py-3 px-3.5">
                        <div className="relative h-2.5 w-full bg-slate-100 rounded-full overflow-hidden flex items-center justify-start">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${pctOfScale}%`,
                              backgroundColor: isRareGold ? '#D97706' : '#0D9488',
                            }}
                          />
                          {/* Population Average (10) Marker */}
                          <div
                            className="absolute top-0 bottom-0 w-0.5 bg-slate-500"
                            style={{ right: `${meanPct}%` }}
                            title="المتوسط السكاني (10)"
                          />
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono tabular-nums">
                          <span>1</span>
                          <span>متوسط: 10</span>
                          <span>22</span>
                        </div>
                      </td>
                      <td className="py-3 px-3.5">
                        <span className="font-semibold text-[#0F172A] block">
                          {item.clinicalDescription}
                        </span>
                        <span className="text-[11px] text-slate-500 block mt-0.5">
                          {item.cognitiveProcess}
                        </span>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr className="bg-slate-50/70 no-print">
                        <td colSpan={6} className="py-3 px-5 text-xs text-slate-600">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div>
                              <strong className="text-[#0F172A]">التحليل الوظيفي ({item.arabicName} — {item.englishName}): </strong>
                              <span>{item.cognitiveProcess} — أداء يقع في المئين </span>
                              <span className="font-mono font-bold text-[#0D9488]" dir="ltr">{item.percentileRank}</span>
                              <span> مقارنةً بالعينة المعيارية العالمية.</span>
                            </div>
                            <span className="font-mono text-[11px] text-slate-500" dir="ltr">
                              Scaled Score: {item.scaledScore}/22 ({item.sdAboveMean})
                            </span>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

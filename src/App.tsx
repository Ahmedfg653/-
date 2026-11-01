import React, { useState } from 'react';
import {
  PERSONAL_METADATA,
  PRIMARY_COMPOSITE_SCORES,
  CORE_COGNITIVE_INDICES,
  SUBTESTS_DATA,
} from './data/reportData';
import { ExamineeSidebar } from './components/ExamineeSidebar';
import { CoreIndicesGrid } from './components/CoreIndicesGrid';
import { BellCurveChart, MetricSelectorId } from './components/BellCurveChart';
import { SubtestsTable } from './components/SubtestsTable';
import { buildStandaloneHtmlDocument } from './utils/standaloneHtmlGenerator';
import { Printer, Download, Eye } from 'lucide-react';

export default function App() {
  const [activeMetric, setActiveMetric] = useState<MetricSelectorId>('FSIQ');
  const [a4PreviewMode, setA4PreviewMode] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadStandaloneHtml = () => {
    const htmlContent = buildStandaloneHtmlDocument();
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `WAIS-IV-Report-${PERSONAL_METADATA.referenceCode}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      dir="rtl"
      lang="ar"
      className={`min-h-screen overflow-x-hidden bg-[#F8FAFC] text-[#0F172A] transition-all ${
        a4PreviewMode ? 'py-8 px-4 bg-slate-200/70' : ''
      }`}
    >
      {/* Top Bar Contract: 3 Zones separated by gap-8 (Hidden in Print) */}
      <header className="no-print bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4 sm:gap-8">
          {/* Zone 1: Single text element Brand Wordmark */}
          <a
            href="#report-top"
            className="text-base font-extrabold tracking-tight text-[#0F172A] font-display whitespace-nowrap shrink-0"
          >
            المختبر السيكومتري الإكلينيكي المتقدم
          </a>

          {/* Zone 2: 4 concise single-line navigation links */}
          <nav
            aria-label="أقسام التقرير"
            className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600"
          >
            <a
              href="#personal-profile"
              className="hover:text-[#0F172A] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              الملف الشخصي
            </a>
            <a
              href="#cognitive-indices"
              className="hover:text-[#0F172A] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              المؤشرات الأربعة
            </a>
            <a
              href="#bell-curve-section"
              className="hover:text-[#0F172A] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              منحنى التوزيع الطبيعي
            </a>
            <a
              href="#subtests-table"
              className="hover:text-[#0F172A] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              الاختبارات الفرعية (12)
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action Button */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#0F172A] rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-[#0D9488]" />
              <span>طباعة / تصدير PDF</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Document Container */}
      <main
        id="report-top"
        className={`mx-auto transition-all ${
          a4PreviewMode
            ? 'max-w-[960px] bg-white shadow-xl border border-slate-300 rounded-xl p-8'
            : 'max-w-[1380px] px-4 sm:px-6 py-8'
        }`}
      >
        {/* Official Certificate Banner Header */}
        <section
          aria-label="ترويسة التقرير السيكومتري الرسمي"
          className="bg-[#0F172A] text-white rounded-xl p-6 sm:p-8 mb-6 border border-slate-800 print-break-inside-avoid"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              {/* Unboxed institutional metadata */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-teal-300">
                <span>وثيقة إكلينيكية معتمدة</span>
                <span aria-hidden="true">·</span>
                <span>{PERSONAL_METADATA.institutionName}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums" dir="ltr">
                  {PERSONAL_METADATA.referenceCode}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-extrabold font-display leading-tight text-white">
                {PERSONAL_METADATA.reportTitle}
              </h1>

              <p className="text-sm text-slate-300 leading-relaxed">
                {PERSONAL_METADATA.scaleName}
              </p>
            </div>

            {/* Secondary Workspace Controls (Print Preview & Standalone HTML Export) */}
            <div className="flex flex-wrap items-center gap-2.5 shrink-0 no-print">
              <button
                type="button"
                onClick={() => setA4PreviewMode((prev) => !prev)}
                aria-pressed={a4PreviewMode}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  a4PreviewMode
                    ? 'bg-[#0D9488] text-white border-[#0D9488]'
                    : 'bg-slate-800/90 text-slate-200 border-slate-700 hover:bg-slate-800'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{a4PreviewMode ? 'عرض الشاشة الكاملة' : 'معاينة تنسيق A4'}</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadStandaloneHtml}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-amber-200 bg-slate-800/90 border border-slate-700 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#D97706]" />
                <span>تحميل التقرير (HTML)</span>
              </button>
            </div>
          </div>

          {/* Key Quantitative Strip inside Official Banner */}
          <div className="mt-6 pt-5 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-slate-400 block">الاسم الكامل للمفحوص</span>
              <span className="font-bold text-white text-sm mt-0.5 block font-display">
                {PERSONAL_METADATA.fullName}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block">تاريخ التقييم والعمر الزمني</span>
              <span className="font-semibold text-white text-sm mt-0.5 block tabular-nums">
                {PERSONAL_METADATA.assessmentDate} · {PERSONAL_METADATA.chronologicalAge}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block">الدرجة الكلية للذكاء (FSIQ)</span>
              <span className="font-extrabold text-teal-400 text-sm mt-0.5 block font-mono tabular-nums" dir="ltr">
                163 (+4.20 SD · 99.9987%)
              </span>
            </div>
            <div>
              <span className="text-slate-400 block">مؤشر القدرة العامة الخالصة (GAI)</span>
              <span className="font-extrabold text-amber-400 text-sm mt-0.5 block font-mono tabular-nums" dir="ltr">
                167 (+4.47 SD · 99.9996%)
              </span>
            </div>
          </div>
        </section>

        {/* Responsive Two-Column Dashboard Layout:
            In RTL, the first grid child renders on the RIGHT (Personal Profile & Executive Summary + Hero Composite Cards),
            and the second grid child renders on the LEFT (Core Indices, Gaussian Bell Curve SVG, and 12 Subtest Scaled Scores Table). */}
        <div
          className={`grid grid-cols-1 gap-6 items-start ${
            a4PreviewMode ? 'lg:grid-cols-1' : 'lg:grid-cols-12'
          }`}
        >
          {/* Right/Top Column: Personal Profile, Hero Composite Scores (FSIQ 163, GAI 167), Executive Summary */}
          <div className={`min-w-0 ${a4PreviewMode ? 'w-full' : 'lg:col-span-4 print-full-width'}`}>
            <ExamineeSidebar
              metadata={PERSONAL_METADATA}
              compositeScores={PRIMARY_COMPOSITE_SCORES}
              activeMetric={activeMetric}
              onSelectMetric={setActiveMetric}
            />
          </div>

          {/* Left/Bottom Column: 4 Core Cognitive Indices, Bell Curve SVG, and 12 Subtests Table */}
          <div className={`min-w-0 space-y-6 ${a4PreviewMode ? 'w-full' : 'lg:col-span-8 print-full-width'}`}>
            <CoreIndicesGrid
              indices={CORE_COGNITIVE_INDICES}
              selectedIndexId={activeMetric}
              onSelectIndex={setActiveMetric}
            />

            <BellCurveChart
              activeMetric={activeMetric}
              onSelectMetric={setActiveMetric}
            />

            <SubtestsTable subtests={SUBTESTS_DATA} />
          </div>
        </div>

        {/* Official Document Footer */}
        <footer className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500 print-break-inside-avoid">
          <div>
            <p className="font-semibold text-[#0F172A]">
              {PERSONAL_METADATA.reportTitle} — {PERSONAL_METADATA.fullName}
            </p>
            <p className="mt-0.5">
              تم إعداد هذا التقرير السيكومتري وفق الجداول المعيارية الممتدة (WAIS-IV Extended Norms Technical Manual) بمتوسط معياري 100 وانحراف معياري 15.
            </p>
          </div>
          <div className="font-mono text-left shrink-0 tabular-nums" dir="ltr">
            <span>DOC REF: {PERSONAL_METADATA.referenceCode}</span>
          </div>
        </footer>
      </main>
    </div>
  );
}

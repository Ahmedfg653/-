export interface PersonalMetadata {
  reportTitle: string;
  reportSubtitle: string;
  fullName: string;
  birthDateText: string;
  birthDateNumeric: string;
  assessmentDate: string;
  chronologicalAge: string;
  scaleName: string;
  referenceCode: string;
  institutionName: string;
  normativeGroup: string;
}

export interface CompositeScore {
  id: 'FSIQ' | 'GAI';
  code: string;
  arabicTitle: string;
  englishTitle: string;
  score: number;
  maxExtendedScore: number;
  sdText: string;
  sdNumeric: number;
  percentileText: string;
  percentileNumeric: string;
  rarityText: string;
  rarityRatio: string;
  clinicalClassificationAr: string;
  clinicalClassificationEn: string;
  confidenceInterval95: string;
  accentColor: 'teal' | 'gold';
  summaryNote: string;
}

export interface CoreCognitiveIndex {
  id: 'VCI' | 'PRI' | 'WMI' | 'PSI';
  code: string;
  arabicName: string;
  englishName: string;
  score: number;
  maxScale: number;
  sdNumeric: number;
  sdText: string;
  percentile: string;
  evaluation: string;
  confidenceInterval: string;
  description: string;
}

export interface SubtestItem {
  order: number;
  domainId: 'VCI' | 'PRI' | 'WMI' | 'PSI';
  domainArabic: string;
  arabicName: string;
  englishName: string;
  scaledScore: number;
  maxScaledScore: number;
  populationMean: number;
  sdAboveMean: string;
  percentileRank: string;
  clinicalDescription: string;
  cognitiveProcess: string;
}

export const PERSONAL_METADATA: PersonalMetadata = {
  reportTitle: 'تقرير التقييم السيكومتري المتقدم للقدرات الإدراكية والذكاء العام',
  reportSubtitle: 'شهادة توثيق إكلينيكي رسمي للقدرات المعرفية العليا وفق المعايير السيكومترية الممتدة',
  fullName: 'أحمد عبد القادر أحمد الشال',
  birthDateText: '6 يناير 2008',
  birthDateNumeric: '06 / 01 / 2008',
  assessmentDate: '1 نوفمبر 2026',
  chronologicalAge: '18 سنة و 9 شهور و 26 يوماً',
  scaleName: 'مقياس وكسلر لذكاء البالغين – الإصدار الرابع (المعايير الممتدة WAIS-IV Extended Norms)',
  referenceCode: 'WAIS4-EG-2026-K9M4X7B2Q1',
  institutionName: 'وحدة القياس السيكومتري والتقييم العصبي المعرفي المتقدم',
  normativeGroup: 'الفئة العمرية المعيارية (18:0 – 19:11 سنة) · المعايير الممتدة عالية السقف (Extended Ceiling Norms)',
};

export const PRIMARY_COMPOSITE_SCORES: CompositeScore[] = [
  {
    id: 'FSIQ',
    code: 'FSIQ',
    arabicTitle: 'الدرجة الكلية للذكاء (FSIQ)',
    englishTitle: 'Full Scale Intelligence Quotient',
    score: 163,
    maxExtendedScore: 175,
    sdText: '+4.20 SD',
    sdNumeric: 4.2,
    percentileText: 'أعلى من 99.9987% من البشر',
    percentileNumeric: '99.9987%',
    rarityText: '1 من كل 74,900 إنسان على مستوى العالم',
    rarityRatio: '1 : 74,900',
    clinicalClassificationAr: 'متفوق بعمق / عبقرية شاملة',
    clinicalClassificationEn: 'Profoundly Gifted',
    confidenceInterval95: '159 – 166',
    accentColor: 'teal',
    summaryNote:
      'يمثل الأداء الكلي تكاملاً فائقاً بين المحاكمة اللفظية، الاستدلال البصري الكمي، كفاءة الذاكرة العاملة، وسرعة المعالجة الإدراكية عند مستوى يتجاوز سقف المقاييس التقليدية (+4.20 انحراف معياري فوق المتوسط العالمي).',
  },
  {
    id: 'GAI',
    code: 'GAI',
    arabicTitle: 'مؤشر القدرة العامة الخالصة (GAI)',
    englishTitle: 'General Ability Index',
    score: 167,
    maxExtendedScore: 175,
    sdText: '+4.47 SD',
    sdNumeric: 4.47,
    percentileText: 'أعلى من 99.9996% من البشر',
    percentileNumeric: '99.9996%',
    rarityText: '1 من كل 253,000 إنسان على مستوى العالم',
    rarityRatio: '1 : 253,000',
    clinicalClassificationAr: 'تفوق استثنائي نادر في التجريد والاستنتاج',
    clinicalClassificationEn: 'Exceptionally Profound',
    confidenceInterval95: '163 – 170',
    accentColor: 'gold',
    summaryNote:
      'يعكس مؤشر القدرة العامة الخالصة (GAI) جوهر الذكاء السائل والمتبلور في أنقى صورهما دون التأثر بقيود السرعة الحركية، كاشفاً عن قدرة تجريدية واستنتاجية نادرة إحصائياً.',
  },
];

export const CORE_COGNITIVE_INDICES: CoreCognitiveIndex[] = [
  {
    id: 'VCI',
    code: 'VCI',
    arabicName: 'الفهم اللفظي (VCI)',
    englishName: 'Verbal Comprehension Index',
    score: 169,
    maxScale: 175,
    sdNumeric: 4.6,
    sdText: '+4.60 SD',
    percentile: '99.9998%',
    evaluation: 'تفوق استثنائي عميق',
    confidenceInterval: '164 – 172',
    description: 'القدرة على تكوين المفاهيم اللفظية، التجريد اللغوي، واستدعاء المعرفة الموسوعية المنظمة.',
  },
  {
    id: 'PRI',
    code: 'PRI',
    arabicName: 'الاستدلال البصري (PRI)',
    englishName: 'Perceptual Reasoning Index',
    score: 165,
    maxScale: 175,
    sdNumeric: 4.33,
    sdText: '+4.33 SD',
    percentile: '99.9993%',
    evaluation: 'تفوق استثنائي عميق',
    confidenceInterval: '160 – 168',
    description: 'الذكاء السائل غير اللفظي، التحليل المكاني الهندسي، واستنباط القواعد المنطقية والكمية المعقدة.',
  },
  {
    id: 'WMI',
    code: 'WMI',
    arabicName: 'الذاكرة العاملة (WMI)',
    englishName: 'Working Memory Index',
    score: 161,
    maxScale: 175,
    sdNumeric: 4.07,
    sdText: '+4.07 SD',
    percentile: '99.9976%',
    evaluation: 'متفوق بعمق',
    confidenceInterval: '156 – 164',
    description: 'الاحتفاظ النشط بالمعلومات ومعالجتها ذهنياً وإعادة ترتيبها تحت ضغط الحمل المعرفي العالي.',
  },
  {
    id: 'PSI',
    code: 'PSI',
    arabicName: 'سرعة المعالجة (PSI)',
    englishName: 'Processing Speed Index',
    score: 157,
    maxScale: 175,
    sdNumeric: 3.8,
    sdText: '+3.80 SD',
    percentile: '99.9928%',
    evaluation: 'متفوق جداً',
    confidenceInterval: '151 – 161',
    description: 'سرعة المسح الإدراكي البصري، الدقة الانتباهية، والتآزر البصري الحركي الفوري.',
  },
];

export const SUBTESTS_DATA: SubtestItem[] = [
  // الفهم اللفظي (VCI)
  {
    order: 1,
    domainId: 'VCI',
    domainArabic: 'الفهم اللفظي (VCI)',
    arabicName: 'المفردات',
    englishName: 'Vocabulary',
    scaledScore: 21,
    maxScaledScore: 22,
    populationMean: 10,
    sdAboveMean: '+3.67 SD',
    percentileRank: '> 99.99%',
    clinicalDescription: 'قوة لفظية وتجريدية استثنائية',
    cognitiveProcess: 'عمق الذخيرة اللغوية ودقة صياغة المفاهيم المجردة',
  },
  {
    order: 2,
    domainId: 'VCI',
    domainArabic: 'الفهم اللفظي (VCI)',
    arabicName: 'التشابهات',
    englishName: 'Similarities',
    scaledScore: 20,
    maxScaledScore: 22,
    populationMean: 10,
    sdAboveMean: '+3.33 SD',
    percentileRank: '99.96%',
    clinicalDescription: 'تفكير مجرد واستنباط علاقات فائق',
    cognitiveProcess: 'الربط المفاهيمي التجريدي بين الظواهر المتباينة',
  },
  {
    order: 3,
    domainId: 'VCI',
    domainArabic: 'الفهم اللفظي (VCI)',
    arabicName: 'المعلومات',
    englishName: 'Information',
    scaledScore: 20,
    maxScaledScore: 22,
    populationMean: 10,
    sdAboveMean: '+3.33 SD',
    percentileRank: '99.96%',
    clinicalDescription: 'حصيلة معرفية موسوعية واسعة',
    cognitiveProcess: 'استرجاع المعارف العلمية والتاريخية والثقافية من الذاكرة طويلة المدى',
  },
  {
    order: 4,
    domainId: 'VCI',
    domainArabic: 'الفهم اللفظي (VCI)',
    arabicName: 'الفهم',
    englishName: 'Comprehension',
    scaledScore: 19,
    maxScaledScore: 22,
    populationMean: 10,
    sdAboveMean: '+3.00 SD',
    percentileRank: '99.87%',
    clinicalDescription: 'فهم عملي واستيعاب منطقي ممتاز',
    cognitiveProcess: 'الحكم الاجتماعي العملي وتحليل المبادئ السلوكية والمنطقية',
  },
  // الاستدلال البصري والكمي (PRI)
  {
    order: 5,
    domainId: 'PRI',
    domainArabic: 'الاستدلال البصري والكمي (PRI)',
    arabicName: 'أوزان الأشكال',
    englishName: 'Figure Weights',
    scaledScore: 20,
    maxScaledScore: 22,
    populationMean: 10,
    sdAboveMean: '+3.33 SD',
    percentileRank: '99.96%',
    clinicalDescription: 'تفكير كمي واستنتاج رياضي فائق',
    cognitiveProcess: 'الاستدلال القياسي الكمي وموازنة العلاقات الجبرية البصرية',
  },
  {
    order: 6,
    domainId: 'PRI',
    domainArabic: 'الاستدلال البصري والكمي (PRI)',
    arabicName: 'حل الألغاز البصرية',
    englishName: 'Matrix Reasoning',
    scaledScore: 20,
    maxScaledScore: 22,
    populationMean: 10,
    sdAboveMean: '+3.33 SD',
    percentileRank: '99.96%',
    clinicalDescription: 'استدلال منطقي وتفكيك أنماط متقدم',
    cognitiveProcess: 'الذكاء السائل الخالص واستخراج القواعد المنطقية من المصفوفات غير اللفظية',
  },
  {
    order: 7,
    domainId: 'PRI',
    domainArabic: 'الاستدلال البصري والكمي (PRI)',
    arabicName: 'الألغاز البصرية',
    englishName: 'Visual Puzzles',
    scaledScore: 19,
    maxScaledScore: 22,
    populationMean: 10,
    sdAboveMean: '+3.00 SD',
    percentileRank: '99.87%',
    clinicalDescription: 'إدراك مكاني وهندسي قوي جداً',
    cognitiveProcess: 'التصور البصري المكاني والتركيب الهندسي الذهني دون معالجة يدوية',
  },
  // الذاكرة العاملة (WMI)
  {
    order: 8,
    domainId: 'WMI',
    domainArabic: 'الذاكرة العاملة (WMI)',
    arabicName: 'الذاكرة الرقمية',
    englishName: 'Digit Span',
    scaledScore: 19,
    maxScaledScore: 22,
    populationMean: 10,
    sdAboveMean: '+3.00 SD',
    percentileRank: '99.87%',
    clinicalDescription: 'سعة ذاكرة عاملة فائقة',
    cognitiveProcess: 'الاحتفاظ السمعي المباشر والعكسي والتسلسلي لسلاسل رقمية ممتدة',
  },
  {
    order: 9,
    domainId: 'WMI',
    domainArabic: 'الذاكرة العاملة (WMI)',
    arabicName: 'ترقيم-حروف',
    englishName: 'Letter-Number Sequencing',
    scaledScore: 19,
    maxScaledScore: 22,
    populationMean: 10,
    sdAboveMean: '+3.00 SD',
    percentileRank: '99.87%',
    clinicalDescription: 'معالجة وتسلسل ذهني متقدم',
    cognitiveProcess: 'المعالجة المزدوجة المتزامنة وإعادة الترتيب الأبجدي والرقمي في الذاكرة النشطة',
  },
  {
    order: 10,
    domainId: 'WMI',
    domainArabic: 'الذاكرة العاملة (WMI)',
    arabicName: 'الحساب الذهني',
    englishName: 'Arithmetic',
    scaledScore: 18,
    maxScaledScore: 22,
    populationMean: 10,
    sdAboveMean: '+2.67 SD',
    percentileRank: '99.62%',
    clinicalDescription: 'مهارات معالجة حسابية عالية الكفاءة',
    cognitiveProcess: 'المعالجة العددية الذهنية السريعة والتركيز الانتباهي الموجه',
  },
  // سرعة المعالجة (PSI)
  {
    order: 11,
    domainId: 'PSI',
    domainArabic: 'سرعة المعالجة (PSI)',
    arabicName: 'بحث الرموز',
    englishName: 'Symbol Search',
    scaledScore: 18,
    maxScaledScore: 22,
    populationMean: 10,
    sdAboveMean: '+2.67 SD',
    percentileRank: '99.62%',
    clinicalDescription: 'دقة وسرعة مسح بصري عالية',
    cognitiveProcess: 'التمييز البصري السريع واتخاذ القرار الإدراكي الفوري بأعلى دقة',
  },
  {
    order: 12,
    domainId: 'PSI',
    domainArabic: 'سرعة المعالجة (PSI)',
    arabicName: 'الترميز',
    englishName: 'Coding',
    scaledScore: 18,
    maxScaledScore: 22,
    populationMean: 10,
    sdAboveMean: '+2.67 SD',
    percentileRank: '99.62%',
    clinicalDescription: 'سرعة معالجة وتآزر بصري حركي متقدم',
    cognitiveProcess: 'السرعة النفس-حركية، التعلم الاجرائي السريع للرموز، والمرونة الانتباهية',
  },
];

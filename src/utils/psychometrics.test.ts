import test from 'node:test';
import assert from 'node:assert/strict';
import {
  PERSONAL_METADATA,
  PRIMARY_COMPOSITE_SCORES,
  CORE_COGNITIVE_INDICES,
  SUBTESTS_DATA,
} from '../data/reportData';
import {
  calculateStandardDeviation,
  iqToSvgX,
  generateBellCurveSvgPath,
  filterSubtests,
  calculateSubtestSummary,
} from './psychometrics';

test('Examinee metadata matches exact specifications', () => {
  assert.equal(PERSONAL_METADATA.fullName, 'أحمد عبد القادر أحمد الشال');
  assert.equal(PERSONAL_METADATA.referenceCode, 'WAIS4-EG-2026-K9M4X7B2Q1');
  assert.equal(PERSONAL_METADATA.birthDateNumeric, '06 / 01 / 2008');
  assert.equal(PERSONAL_METADATA.assessmentDate, '1 نوفمبر 2026');
  assert.equal(PERSONAL_METADATA.chronologicalAge, '18 سنة و 9 شهور و 26 يوماً');
});

test('Primary composite scores FSIQ (163) and GAI (167) match exact SD and rarity', () => {
  const fsiq = PRIMARY_COMPOSITE_SCORES.find((c) => c.id === 'FSIQ');
  const gai = PRIMARY_COMPOSITE_SCORES.find((c) => c.id === 'GAI');

  assert.ok(fsiq);
  assert.equal(fsiq.score, 163);
  assert.equal(calculateStandardDeviation(fsiq.score), 4.2);
  assert.equal(fsiq.sdText, '+4.20 SD');

  assert.ok(gai);
  assert.equal(gai.score, 167);
  assert.equal(calculateStandardDeviation(gai.score), 4.47);
  assert.equal(gai.sdText, '+4.47 SD');
});

test('Core cognitive indices match VCI 169, PRI 165, WMI 161, PSI 157', () => {
  const scoresMap = Object.fromEntries(CORE_COGNITIVE_INDICES.map((i) => [i.id, i.score]));
  assert.deepEqual(scoresMap, {
    VCI: 169,
    PRI: 165,
    WMI: 161,
    PSI: 157,
  });
});

test('12 subtests are complete and filter accurately by domain and search query', () => {
  assert.equal(SUBTESTS_DATA.length, 12);
  assert.equal(filterSubtests(SUBTESTS_DATA, 'VCI').length, 4);
  assert.equal(filterSubtests(SUBTESTS_DATA, 'PRI').length, 3);
  assert.equal(filterSubtests(SUBTESTS_DATA, 'WMI').length, 3);
  assert.equal(filterSubtests(SUBTESTS_DATA, 'PSI').length, 2);
  assert.equal(filterSubtests(SUBTESTS_DATA, 'ALL', 'Vocabulary').length, 1);

  const summary = calculateSubtestSummary(SUBTESTS_DATA);
  assert.equal(summary.count, 12);
  assert.equal(summary.maxScore, 21);
  assert.equal(summary.minScore, 18);
  assert.equal(summary.sumScaledScores, 231);
});

test('SVG Gaussian Bell Curve coordinate generator produces valid ordered coordinates', () => {
  const xMean = iqToSvgX(100);
  const xMensa = iqToSvgX(130);
  const xFsiq = iqToSvgX(163);
  const xGai = iqToSvgX(167);

  assert.ok(xMean < xMensa, 'Mean (100) X should be left of Mensa (130) X');
  assert.ok(xMensa < xFsiq, 'Mensa (130) X should be left of FSIQ (163) X');
  assert.ok(xFsiq < xGai, 'FSIQ (163) X should be left of GAI (167) X');

  const { linePath, areaPath } = generateBellCurveSvgPath();
  assert.ok(linePath.startsWith('M 50'));
  assert.ok(areaPath.endsWith('Z'));
});

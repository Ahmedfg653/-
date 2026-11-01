import { SubtestItem } from '../data/reportData';

/**
 * Calculates the z-score (Standard Deviations from mean=100, sd=15)
 */
export function calculateStandardDeviation(iqScore: number, mean = 100, sd = 15): number {
  return Number(((iqScore - mean) / sd).toFixed(2));
}

/**
 * Maps an IQ score in the range [55, 175] to an SVG X coordinate
 */
export function iqToSvgX(iqScore: number, minIq = 55, maxIq = 175, plotLeft = 50, plotRight = 750): number {
  const clamped = Math.max(minIq, Math.min(maxIq, iqScore));
  const ratio = (clamped - minIq) / (maxIq - minIq);
  return Number((plotLeft + ratio * (plotRight - plotLeft)).toFixed(2));
}

/**
 * Computes the Gaussian normal density height at a given z-score,
 * with optional visual right-tail floor so extreme scores (+4.20 SD, +4.47 SD) remain clearly visible on the chart.
 */
export function gaussianSvgY(
  zScore: number,
  baselineY = 230,
  peakHeight = 185,
  visualFloor = 6
): number {
  const rawDensity = Math.exp(-0.5 * zScore * zScore);
  // Subtle visual tail amplification past +2.5 SD so markers at +4.20 SD and +4.47 SD remain legible on screen and print
  const tailBoost = Math.abs(zScore) > 2.2 ? Math.exp(-0.22 * Math.abs(zScore)) * 18 : 0;
  const height = Math.max(visualFloor * rawDensity, rawDensity * peakHeight + tailBoost * (rawDensity < 0.08 ? 1 : 0));
  return Number((baselineY - Math.min(peakHeight, height)).toFixed(2));
}

/**
 * Generates an SVG path string (`d` attribute) for the Gaussian Bell Curve between minIq and maxIq.
 */
export function generateBellCurveSvgPath(
  minIq = 55,
  maxIq = 175,
  step = 1.5,
  plotLeft = 50,
  plotRight = 750,
  baselineY = 230,
  peakHeight = 185
): { linePath: string; areaPath: string } {
  const points: Array<{ x: number; y: number }> = [];
  for (let iq = minIq; iq <= maxIq; iq += step) {
    const z = (iq - 100) / 15;
    const x = iqToSvgX(iq, minIq, maxIq, plotLeft, plotRight);
    const y = gaussianSvgY(z, baselineY, peakHeight, 2);
    points.push({ x, y });
  }
  if (points[points.length - 1].x !== plotRight) {
    const zEnd = (maxIq - 100) / 15;
    points.push({
      x: plotRight,
      y: gaussianSvgY(zEnd, baselineY, peakHeight, 2),
    });
  }

  const linePath = points
    .map((pt, idx) => `${idx === 0 ? 'M' : 'L'} ${pt.x} ${pt.y}`)
    .join(' ');

  const areaPath = `${linePath} L ${plotRight} ${baselineY} L ${plotLeft} ${baselineY} Z`;
  return { linePath, areaPath };
}

/**
 * Filters the 12 subtests by domain and optional search query.
 */
export function filterSubtests(
  subtests: SubtestItem[],
  domainFilter: 'ALL' | 'VCI' | 'PRI' | 'WMI' | 'PSI',
  searchQuery = ''
): SubtestItem[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();
  return subtests.filter((item) => {
    const matchesDomain = domainFilter === 'ALL' || item.domainId === domainFilter;
    if (!matchesDomain) return false;
    if (!normalizedQuery) return true;
    return (
      item.arabicName.toLowerCase().includes(normalizedQuery) ||
      item.englishName.toLowerCase().includes(normalizedQuery) ||
      item.clinicalDescription.toLowerCase().includes(normalizedQuery) ||
      item.domainArabic.toLowerCase().includes(normalizedQuery)
    );
  });
}

/**
 * Calculates summary statistics for a set of subtests.
 */
export function calculateSubtestSummary(subtests: SubtestItem[]): {
  count: number;
  meanScaledScore: number;
  maxScore: number;
  minScore: number;
  sumScaledScores: number;
} {
  if (subtests.length === 0) {
    return { count: 0, meanScaledScore: 0, maxScore: 0, minScore: 0, sumScaledScores: 0 };
  }
  const scores = subtests.map((s) => s.scaledScore);
  const sumScaledScores = scores.reduce((acc, val) => acc + val, 0);
  const meanScaledScore = Number((sumScaledScores / subtests.length).toFixed(2));
  return {
    count: subtests.length,
    meanScaledScore,
    maxScore: Math.max(...scores),
    minScore: Math.min(...scores),
    sumScaledScores,
  };
}

export interface RadarPoint {
  x: number;
  y: number;
  angleDeg: number;
  value: number;
  label: string;
  code: string;
}

/**
 * Calculates 2D SVG coordinates for an N-axis Radar Chart polygon.
 * Angles start at -90 deg (top) and proceed clockwise.
 */
export function calculateRadarPolygonPoints(
  items: Array<{ code: string; label: string; value: number }>,
  minVal: number,
  maxVal: number,
  centerX = 250,
  centerY = 210,
  maxRadius = 145
): { points: RadarPoint[]; svgPointsString: string } {
  const count = items.length;
  const points: RadarPoint[] = items.map((item, idx) => {
    const angleDeg = -90 + (idx * 360) / count;
    const angleRad = (angleDeg * Math.PI) / 180;
    const clamped = Math.max(minVal, Math.min(maxVal, item.value));
    const normalized = (clamped - minVal) / (maxVal - minVal);
    const r = normalized * maxRadius;
    const x = Number((centerX + r * Math.cos(angleRad)).toFixed(2));
    const y = Number((centerY + r * Math.sin(angleRad)).toFixed(2));
    return {
      x,
      y,
      angleDeg,
      value: item.value,
      label: item.label,
      code: item.code,
    };
  });

  const svgPointsString = points.map((p) => `${p.x},${p.y}`).join(' ');
  return { points, svgPointsString };
}


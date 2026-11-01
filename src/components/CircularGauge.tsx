import React from 'react';

interface CircularGaugeProps {
  score: number;
  minScore?: number;
  maxScore?: number;
  code: string;
  sdText: string;
  accentColor: 'teal' | 'gold';
  size?: number;
}

export const CircularGauge: React.FC<CircularGaugeProps> = ({
  score,
  minScore = 40,
  maxScore = 175,
  code,
  sdText,
  accentColor,
  size = 132,
}) => {
  const strokeWidth = 9;
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(minScore, Math.min(maxScore, score));
  const progress = (clamped - minScore) / (maxScore - minScore);
  const dashOffset = circumference * (1 - progress);

  const strokeHex = accentColor === 'teal' ? '#0D9488' : '#D97706';
  const trackHex = accentColor === 'teal' ? '#CCFBF1' : '#FEF3C7';

  return (
    <div
      className="relative inline-flex items-center justify-center shrink-0 select-none"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`مؤشر ${code} بقيمة ${score} وانحراف معياري ${sdText}`}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90 transform overflow-visible"
      >
        {/* Background Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={trackHex}
          strokeWidth={strokeWidth}
          className="opacity-65"
        />
        {/* Mean (100) Tick Indicator */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#94A3B8"
          strokeWidth={strokeWidth + 2}
          strokeDasharray={`2 ${circumference}`}
          strokeDashoffset={circumference * (1 - (100 - minScore) / (maxScore - minScore))}
          className="opacity-50"
        />
        {/* Animated Value Arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={strokeHex}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={
            {
              '--gauge-circumference': circumference,
              '--gauge-target': dashOffset,
            } as React.CSSProperties
          }
          className="animate-gauge transition-all duration-300"
        />
      </svg>

      {/* Center Score Display */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-[11px] font-semibold tracking-wider text-slate-500 font-mono">
          {code}
        </span>
        <span className="text-3xl font-extrabold text-[#0F172A] tabular-nums leading-none my-0.5 font-display">
          {score}
        </span>
        <span
          className="text-[11px] font-semibold tabular-nums font-mono"
          style={{ color: strokeHex }}
          dir="ltr"
        >
          {sdText}
        </span>
      </div>
    </div>
  );
};

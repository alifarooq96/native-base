'use client';

import { useState } from 'react';

const CHART_WIDTH = 280;
const CHART_HEIGHT = 120;
const PADDING = { top: 8, right: 8, bottom: 24, left: 8 };
const HIT_RADIUS = 14;

interface DashboardLineChartProps {
  title: string;
  values: number[];
  dateLabels: string[];
  color?: string;
}

export function DashboardLineChart({
  title,
  values,
  dateLabels,
  color = 'var(--accent)',
}: DashboardLineChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const innerWidth = CHART_WIDTH - PADDING.left - PADDING.right;
  const innerHeight = CHART_HEIGHT - PADDING.top - PADDING.bottom;
  const maxY = Math.max(1, ...values);
  const points = values.map((v, i) => {
    const x = PADDING.left + (i / (values.length - 1 || 1)) * innerWidth;
    const y = PADDING.top + innerHeight - (v / maxY) * innerHeight;
    return { x, y, v };
  });
  const pathD = points.length ? `M ${points.map((p) => `${p.x},${p.y}`).join(' L ')}` : '';

  return (
    <div
      style={{
        position: 'relative',
        background: 'var(--bg)',
        border: '1px solid var(--border)',
        borderRadius: 12,
        padding: '1rem',
        minWidth: 0,
        overflow: 'visible',
      }}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <div
        style={{
          fontSize: '0.8125rem',
          fontWeight: 600,
          color: 'var(--text)',
          marginBottom: '0.75rem',
        }}
      >
        {title}
      </div>
      <svg
        viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
        style={{ width: '100%', height: 'auto', maxHeight: 140, display: 'block', overflow: 'visible' }}
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={HIT_RADIUS}
            fill="transparent"
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => setHoveredIndex(i)}
          />
        ))}
        {hoveredIndex !== null &&
          hoveredIndex < dateLabels.length &&
          hoveredIndex < values.length && (
            <g transform={`translate(${points[hoveredIndex].x}, ${points[hoveredIndex].y})`}>
              <rect
                x={-28}
                y={-22}
                width={56}
                height={18}
                rx={6}
                ry={6}
                fill="#1e293b"
                stroke="var(--border)"
                strokeWidth={1}
              />
              <text
                x={0}
                y={-9}
                textAnchor="middle"
                fontSize="11"
                fontWeight={600}
                fill="#fff"
              >
                {`${dateLabels[hoveredIndex]}: ${values[hoveredIndex]}`}
              </text>
            </g>
          )}
        {dateLabels.map((label, i) => (
          <text
            key={label + i}
            x={PADDING.left + (i / (dateLabels.length - 1 || 1)) * innerWidth}
            y={CHART_HEIGHT - 4}
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-muted)"
          >
            {label}
          </text>
        ))}
      </svg>
    </div>
  );
}

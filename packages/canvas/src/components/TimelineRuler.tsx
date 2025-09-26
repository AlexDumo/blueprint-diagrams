import React from 'react';
import { TimelineSettings } from '../types/musical-form';

interface TimelineRulerProps {
  totalMeasures: number;
  measuresPerPixel: number;
  orientation: 'horizontal' | 'vertical';
  showRuler: boolean;
  className?: string;
}

export const TimelineRuler: React.FC<TimelineRulerProps> = ({
  totalMeasures,
  measuresPerPixel,
  orientation,
  showRuler,
  className = '',
}) => {
  if (!showRuler) return null;

  const rulerWidth = totalMeasures * measuresPerPixel;
  const rulerHeight = 30;

  // Generate measure markers
  const measureMarkers = [];
  for (let measure = 1; measure <= totalMeasures; measure++) {
    const position = measure * measuresPerPixel;
    const isMajorTick = measure % 4 === 1; // Every 4 measures

    measureMarkers.push(
      <div
        key={measure}
        style={{
          position: 'absolute',
          [orientation === 'horizontal' ? 'left' : 'top']: `${position}px`,
          [orientation === 'horizontal' ? 'top' : 'left']: '0px',
          [orientation === 'horizontal' ? 'width' : 'height']: '1px',
          [orientation === 'horizontal' ? 'height' : 'width']: isMajorTick ? `${rulerHeight}px` : `${rulerHeight * 0.6}px`,
          backgroundColor: isMajorTick ? '#333' : '#999',
          zIndex: 1,
        }}
      />
    );

    // Add measure numbers for major ticks
    if (isMajorTick) {
      measureMarkers.push(
        <div
          key={`label-${measure}`}
          style={{
            position: 'absolute',
            [orientation === 'horizontal' ? 'left' : 'top']: `${position}px`,
            [orientation === 'horizontal' ? 'top' : 'left']: `${rulerHeight + 2}px`,
            fontSize: '10px',
            color: '#333',
            fontWeight: 'bold',
            transform: orientation === 'horizontal'
              ? 'translateX(-50%)'
              : 'translateY(-50%)',
            zIndex: 1,
          }}
        >
          {measure}
        </div>
      );
    }
  }

  const rulerStyle: React.CSSProperties = {
    position: 'relative',
    [orientation === 'horizontal' ? 'width' : 'height']: `${rulerWidth}px`,
    [orientation === 'horizontal' ? 'height' : 'width']: `${rulerHeight}px`,
    backgroundColor: '#f8f8f8',
    borderBottom: orientation === 'horizontal' ? '1px solid #ccc' : 'none',
    borderRight: orientation === 'vertical' ? '1px solid #ccc' : 'none',
  };

  return (
    <div className={`timeline-ruler ${className}`} style={rulerStyle}>
      {measureMarkers}
    </div>
  );
};

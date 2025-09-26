import React from 'react';
import { Block, BlockLabels, Style } from '../types/musical-form';
import { styleToCss, formatMeasureRange } from '../utils/musical-form';

interface BlockComponentProps {
  block: Block;
  measuresPerPixel: number;
  trackHeight: number;
  isSelected?: boolean;
  isHovered?: boolean;
  onClick?: (blockId: string) => void;
  onHover?: (blockId: string | undefined) => void;
  className?: string;
}

export const BlockComponent: React.FC<BlockComponentProps> = ({
  block,
  measuresPerPixel,
  trackHeight,
  isSelected = false,
  isHovered = false,
  onClick,
  onHover,
  className = '',
}) => {
  const startPixel = measureToPixel(block.span.start.measure, measuresPerPixel);
  const endPixel = measureToPixel(block.span.end.measure, measuresPerPixel);
  const width = endPixel - startPixel;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick?.(block.id);
  };

  const handleMouseEnter = () => {
    onHover?.(block.id);
  };

  const handleMouseLeave = () => {
    onHover?.(undefined);
  };

  const blockStyle: React.CSSProperties = {
    position: 'absolute',
    left: `${startPixel}px`,
    top: '0px',
    width: `${width}px`,
    height: `${trackHeight}px`,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    ...styleToCss(block.style || {}),
    ...(isSelected && {
      boxShadow: '0 0 0 2px #007bff',
      zIndex: 10,
    }),
    ...(isHovered && !isSelected && {
      boxShadow: '0 0 0 1px #007bff',
      zIndex: 5,
    }),
  };

  return (
    <div
      className={`musical-block ${className}`}
      style={blockStyle}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      title={`${block.name || 'Unnamed Block'} (${formatMeasureRange(block.span)})`}
    >
      <BlockLabelsComponent labels={block.labels} />
    </div>
  );
};

interface BlockLabelsComponentProps {
  labels?: BlockLabels;
}

const BlockLabelsComponent: React.FC<BlockLabelsComponentProps> = ({ labels }) => {
  if (!labels) return null;

  return (
    <div className="block-labels" style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      padding: '4px',
      fontSize: '12px',
      fontWeight: '500',
    }}>
      {/* Center label */}
      {labels.center && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '14px',
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#333',
        }}>
          {labels.center}
        </div>
      )}

      {/* Top-left label */}
      {labels.tl && (
        <div style={{
          position: 'absolute',
          top: '2px',
          left: '4px',
          fontSize: '10px',
          color: '#666',
        }}>
          {labels.tl}
        </div>
      )}

      {/* Top-right label */}
      {labels.tr && (
        <div style={{
          position: 'absolute',
          top: '2px',
          right: '4px',
          fontSize: '10px',
          color: '#666',
        }}>
          {labels.tr}
        </div>
      )}

      {/* Bottom-left label */}
      {labels.bl && (
        <div style={{
          position: 'absolute',
          bottom: '2px',
          left: '4px',
          fontSize: '10px',
          color: '#666',
        }}>
          {labels.bl}
        </div>
      )}

      {/* Bottom-right label */}
      {labels.br && (
        <div style={{
          position: 'absolute',
          bottom: '2px',
          right: '4px',
          fontSize: '10px',
          color: '#666',
        }}>
          {labels.br}
        </div>
      )}
    </div>
  );
};

// Helper function for measure to pixel conversion
function measureToPixel(measure: number, measuresPerPixel: number): number {
  return measure * measuresPerPixel;
}

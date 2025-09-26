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
  parentBlock?: Block | null;
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
  parentBlock = null,
}) => {
  // Calculate position relative to parent or track
  const startPixel = parentBlock
    ? measureToPixel(block.span.start.measure - parentBlock.span.start.measure, measuresPerPixel)
    : measureToPixel(block.span.start.measure, measuresPerPixel);
  const endPixel = parentBlock
    ? measureToPixel(block.span.end.measure - parentBlock.span.start.measure, measuresPerPixel)
    : measureToPixel(block.span.end.measure, measuresPerPixel);
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
    top: parentBlock ? '8px' : '0px',
    width: `${width}px`,
    height: parentBlock ? `${trackHeight - 16}px` : `${trackHeight}px`,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    borderRadius: '16px',
    border: '2px solid #333',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '12px',
    boxSizing: 'border-box',
    ...styleToCss(block.style || {}),
    ...(isSelected && {
      boxShadow: '0 0 0 3px #007bff',
      zIndex: 10,
      transform: 'scale(1.02)',
    }),
    ...(isHovered && !isSelected && {
      boxShadow: '0 0 0 2px #007bff',
      zIndex: 5,
      transform: 'scale(1.01)',
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

      {/* Render child blocks */}
      {block.children && block.children.length > 0 && (
        <div style={{
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          pointerEvents: 'auto',
        }}>
          {block.children.map((childBlock) => (
            <BlockComponent
              key={childBlock.id}
              block={childBlock}
              measuresPerPixel={measuresPerPixel}
              trackHeight={trackHeight}
              isSelected={isSelected}
              isHovered={isHovered}
              onClick={onClick}
              onHover={onHover}
              parentBlock={block}
            />
          ))}
        </div>
      )}
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
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      {/* Top row - title and key */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 'auto',
      }}>
        {/* Top-left label (measure range) */}
        {labels.tl && (
          <div style={{
            fontSize: '13px',
            fontWeight: '600',
            color: '#333',
            textShadow: '0 1px 2px rgba(255, 255, 255, 0.8)',
          }}>
            {labels.tl}
          </div>
        )}

        {/* Top-right label (key) */}
        {labels.tr && (
          <div style={{
            fontSize: '13px',
            fontWeight: '600',
            color: '#333',
            textShadow: '0 1px 2px rgba(255, 255, 255, 0.8)',
          }}>
            {labels.tr}
          </div>
        )}
      </div>

      {/* Center label (main title) */}
      {labels.center && (
        <div style={{
          fontSize: '18px',
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#333',
          textShadow: '0 1px 2px rgba(255, 255, 255, 0.8)',
          marginTop: 'auto',
          marginBottom: 'auto',
        }}>
          {labels.center}
        </div>
      )}

      {/* Bottom row - lyrics/notes */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginTop: 'auto',
      }}>
        {/* Bottom-left label (lyrics) */}
        {labels.bl && (
          <div style={{
            fontSize: '12px',
            fontWeight: '500',
            color: '#555',
            fontStyle: 'italic',
            textShadow: '0 1px 2px rgba(255, 255, 255, 0.8)',
          }}>
            {labels.bl}
          </div>
        )}

        {/* Bottom-right label */}
        {labels.br && (
          <div style={{
            fontSize: '12px',
            fontWeight: '500',
            color: '#555',
            textShadow: '0 1px 2px rgba(255, 255, 255, 0.8)',
          }}>
            {labels.br}
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function for measure to pixel conversion
function measureToPixel(measure: number, measuresPerPixel: number): number {
  return measure * measuresPerPixel;
}

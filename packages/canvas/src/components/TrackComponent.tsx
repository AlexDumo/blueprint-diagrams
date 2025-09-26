import React from 'react';
import { Track, Block } from '../types/musical-form';
import { BlockComponent } from './BlockComponent';

interface TrackComponentProps {
  track: Track;
  measuresPerPixel: number;
  trackHeight: number;
  totalMeasures: number;
  selectedBlockId?: string;
  hoveredBlockId?: string;
  onBlockSelect?: (blockId: string) => void;
  onBlockHover?: (blockId: string | undefined) => void;
  className?: string;
}

export const TrackComponent: React.FC<TrackComponentProps> = ({
  track,
  measuresPerPixel,
  trackHeight,
  totalMeasures,
  selectedBlockId,
  hoveredBlockId,
  onBlockSelect,
  onBlockHover,
  className = '',
}) => {
  const trackWidth = totalMeasures * measuresPerPixel;

  const trackStyle: React.CSSProperties = {
    position: 'relative',
    width: `${trackWidth}px`,
    height: `${trackHeight}px`,
    borderBottom: '2px solid #e0e0e0',
    backgroundColor: '#fafafa',
    borderRadius: '4px',
    marginBottom: '4px',
    padding: '8px',
    boxSizing: 'border-box',
  };

  return (
    <div className={`musical-track ${className}`} style={trackStyle}>
      {/* Track label */}
      {track.label && (
        <div style={{
          position: 'absolute',
          left: '-120px',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: '12px',
          fontWeight: '500',
          color: '#666',
          width: '100px',
          textAlign: 'right',
          paddingRight: '8px',
        }}>
          {track.label}
        </div>
      )}

      {/* Render blocks */}
      {track.blocks.map((block) => (
        <BlockComponent
          key={block.id}
          block={block}
          measuresPerPixel={measuresPerPixel}
          trackHeight={trackHeight}
          isSelected={selectedBlockId === block.id}
          isHovered={hoveredBlockId === block.id}
          onClick={onBlockSelect}
          onHover={onBlockHover}
          parentBlock={null}
        />
      ))}
    </div>
  );
};

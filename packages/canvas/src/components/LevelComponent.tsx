import React from 'react';
import { Level, Track } from '../types/musical-form';
import { TrackComponent } from './TrackComponent';

interface LevelComponentProps {
  level: Level;
  measuresPerPixel: number;
  trackHeight: number;
  totalMeasures: number;
  isCollapsed?: boolean;
  selectedBlockId?: string;
  hoveredBlockId?: string;
  onBlockSelect?: (blockId: string) => void;
  onBlockHover?: (blockId: string | undefined) => void;
  onToggleCollapse?: (levelId: string) => void;
  className?: string;
}

export const LevelComponent: React.FC<LevelComponentProps> = ({
  level,
  measuresPerPixel,
  trackHeight,
  totalMeasures,
  isCollapsed = false,
  selectedBlockId,
  hoveredBlockId,
  onBlockSelect,
  onBlockHover,
  onToggleCollapse,
  className = '',
}) => {
  const levelWidth = totalMeasures * measuresPerPixel;
  const levelHeight = isCollapsed ? 40 : level.tracks.length * trackHeight;

  const handleToggleCollapse = () => {
    onToggleCollapse?.(level.id);
  };

  const levelStyle: React.CSSProperties = {
    position: 'relative',
    width: `${levelWidth}px`,
    height: `${levelHeight}px`,
    borderBottom: '2px solid #333',
    backgroundColor: isCollapsed ? '#f0f0f0' : '#ffffff',
  };

  return (
    <div className={`musical-level ${className}`} style={levelStyle}>
      {/* Level header */}
      <div style={{
        position: 'absolute',
        left: '-120px',
        top: '0px',
        width: '100px',
        height: `${levelHeight}px`,
        backgroundColor: '#333',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        fontSize: '12px',
        fontWeight: 'bold',
      }} onClick={handleToggleCollapse}>
        <div style={{ textAlign: 'center' }}>
          <div>{level.label || `Level ${level.index}`}</div>
          <div style={{ fontSize: '10px', opacity: 0.8 }}>
            {isCollapsed ? '▼' : '▲'}
          </div>
        </div>
      </div>

      {/* Render tracks if not collapsed */}
      {!isCollapsed && level.tracks.map((track) => (
        <TrackComponent
          key={track.id}
          track={track}
          measuresPerPixel={measuresPerPixel}
          trackHeight={trackHeight}
          totalMeasures={totalMeasures}
          selectedBlockId={selectedBlockId}
          hoveredBlockId={hoveredBlockId}
          onBlockSelect={onBlockSelect}
          onBlockHover={onBlockHover}
        />
      ))}
    </div>
  );
};

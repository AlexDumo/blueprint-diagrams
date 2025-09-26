import React, { useState, useRef, useCallback } from 'react';
import { FormProject, FormEditorState, FormEditorEvents } from '../types/musical-form';
import { LevelComponent } from './LevelComponent';
import { TimelineRuler } from './TimelineRuler';

interface MusicalFormEditorProps {
  project: FormProject;
  state: FormEditorState;
  events: FormEditorEvents;
  className?: string;
  width?: number;
  height?: number;
}

export const MusicalFormEditor: React.FC<MusicalFormEditorProps> = ({
  project,
  state,
  events,
  className = '',
  width = 1200,
  height = 800,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate measures per pixel based on zoom
  const measuresPerPixel = 20 * state.zoom;
  const trackHeight = 40;
  const timelineHeight = 30;
  const levelLabelWidth = 120;

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.target === containerRef.current) {
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging) {
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;

      // Update scroll offset
      events.onBlockMove?.(project.id, {
        start: { measure: state.scrollOffset.x + deltaX / measuresPerPixel },
        end: { measure: state.scrollOffset.y + deltaY / measuresPerPixel }
      } as any);
    }
  }, [isDragging, dragStart, measuresPerPixel, state.scrollOffset, events, project.id]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
    const newZoom = Math.max(0.1, Math.min(5, state.zoom * zoomFactor));

    // Update zoom in state
    events.onBlockMove?.(project.id, {
      start: { measure: newZoom },
      end: { measure: newZoom }
    } as any);
  }, [state.zoom, events, project.id]);

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: `${width}px`,
    height: `${height}px`,
    overflow: 'hidden',
    border: '1px solid #ccc',
    backgroundColor: '#ffffff',
    cursor: isDragging ? 'grabbing' : 'grab',
  };

  const contentStyle: React.CSSProperties = {
    position: 'absolute',
    left: `${state.scrollOffset.x}px`,
    top: `${state.scrollOffset.y}px`,
    width: `${project.measures * measuresPerPixel + levelLabelWidth}px`,
    height: `${project.levels.length * (trackHeight * 3) + timelineHeight}px`,
  };

  return (
    <div
      ref={containerRef}
      className={`musical-form-editor ${className}`}
      style={containerStyle}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onWheel={handleWheel}
    >
      <div style={contentStyle}>
        {/* Timeline Ruler */}
        <div style={{ marginLeft: `${levelLabelWidth}px` }}>
          <TimelineRuler
            totalMeasures={project.measures}
            measuresPerPixel={measuresPerPixel}
            orientation={project.timeline.orientation}
            showRuler={project.timeline.showTimelineRuler}
          />
        </div>

        {/* Levels */}
        {project.levels.map((level) => (
          <LevelComponent
            key={level.id}
            level={level}
            measuresPerPixel={measuresPerPixel}
            trackHeight={trackHeight}
            totalMeasures={project.measures}
            isCollapsed={state.collapsedLevels.has(level.id)}
            selectedBlockId={state.selectedBlockId}
            hoveredBlockId={state.hoveredBlockId}
            onBlockSelect={events.onBlockSelect}
            onBlockHover={events.onBlockHover}
            onToggleCollapse={(levelId) => events.onLevelToggle?.(levelId, !state.collapsedLevels.has(levelId))}
          />
        ))}
      </div>

      {/* Zoom controls */}
      <div style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        display: 'flex',
        gap: '5px',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: '5px',
        borderRadius: '4px',
        border: '1px solid #ccc',
      }}>
        <button
          onClick={() => events.onBlockMove?.(project.id, {
            start: { measure: Math.max(0.1, state.zoom * 0.8) },
            end: { measure: Math.max(0.1, state.zoom * 0.8) }
          } as any)}
          style={{ padding: '2px 6px', fontSize: '12px' }}
        >
          −
        </button>
        <span style={{ fontSize: '12px', padding: '2px 4px' }}>
          {Math.round(state.zoom * 100)}%
        </span>
        <button
          onClick={() => events.onBlockMove?.(project.id, {
            start: { measure: Math.min(5, state.zoom * 1.25) },
            end: { measure: Math.min(5, state.zoom * 1.25) }
          } as any)}
          style={{ padding: '2px 6px', fontSize: '12px' }}
        >
          +
        </button>
      </div>
    </div>
  );
};

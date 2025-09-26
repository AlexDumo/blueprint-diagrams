import React, { useState, useCallback } from 'react';
import { FormProject, FormEditorState, FormEditorEvents, Block, Track, Level } from '../types/musical-form';
import { MusicalFormEditor } from './MusicalFormEditor';
import { generateId } from '../utils/musical-form';

interface ProjectManagerProps {
  initialProject?: FormProject;
  className?: string;
}

export const ProjectManager: React.FC<ProjectManagerProps> = ({
  initialProject,
  className = '',
}) => {
  const [project, setProject] = useState<FormProject>(
    initialProject || {
      id: 'default-project',
      title: 'New Song Form',
      measures: 80,
      timeline: {
        orientation: 'horizontal',
        showTimelineRuler: true,
        showLevelRuler: true,
      },
      levels: [],
    }
  );

  const [state, setState] = useState<FormEditorState>({
    selectedBlockId: undefined,
    selectedTrackId: undefined,
    selectedLevelId: undefined,
    hoveredBlockId: undefined,
    collapsedLevels: new Set(),
    zoom: 1,
    scrollOffset: { x: 0, y: 0 },
  });

  const events: FormEditorEvents = {
    onBlockSelect: useCallback((blockId: string) => {
      setState(prev => ({ ...prev, selectedBlockId: blockId }));
    }, []),

    onBlockHover: useCallback((blockId: string | undefined) => {
      setState(prev => ({ ...prev, hoveredBlockId: blockId }));
    }, []),

    onBlockMove: useCallback((blockId: string, newSpan: any) => {
      // This is a simplified version - in a real app you'd update the actual block
      console.log('Block move:', blockId, newSpan);
    }, []),

    onBlockResize: useCallback((blockId: string, newSpan: any) => {
      console.log('Block resize:', blockId, newSpan);
    }, []),

    onBlockCreate: useCallback((parentId: string, newBlock: Omit<Block, 'id'>) => {
      const block: Block = {
        ...newBlock,
        id: generateId(),
      };

      setProject(prev => ({
        ...prev,
        levels: prev.levels.map(level => ({
          ...level,
          tracks: level.tracks.map(track => ({
            ...track,
            blocks: track.id === parentId ? [...track.blocks, block] : track.blocks,
          })),
        })),
      }));
    }, []),

    onBlockDelete: useCallback((blockId: string) => {
      setProject(prev => ({
        ...prev,
        levels: prev.levels.map(level => ({
          ...level,
          tracks: level.tracks.map(track => ({
            ...track,
            blocks: track.blocks.filter(block => block.id !== blockId),
          })),
        })),
      }));
    }, []),

    onLevelToggle: useCallback((levelId: string) => {
      setState(prev => {
        const newCollapsed = new Set(prev.collapsedLevels);
        if (newCollapsed.has(levelId)) {
          newCollapsed.delete(levelId);
        } else {
          newCollapsed.add(levelId);
        }
        return { ...prev, collapsedLevels: newCollapsed };
      });
    }, []),

    onTrackCreate: useCallback((levelId: string, newTrack: Omit<Track, 'id' | 'blocks'>) => {
      const track: Track = {
        ...newTrack,
        id: generateId(),
        blocks: [],
      };

      setProject(prev => ({
        ...prev,
        levels: prev.levels.map(level =>
          level.id === levelId
            ? { ...level, tracks: [...level.tracks, track] }
            : level
        ),
      }));
    }, []),

    onTrackDelete: useCallback((trackId: string) => {
      setProject(prev => ({
        ...prev,
        levels: prev.levels.map(level => ({
          ...level,
          tracks: level.tracks.filter(track => track.id !== trackId),
        })),
      }));
    }, []),
  };

  const addLevel = useCallback(() => {
    const newLevel: Level = {
      id: generateId(),
      index: project.levels.length,
      label: `Level ${project.levels.length}`,
      tracks: [{
        id: generateId(),
        label: 'Main',
        blocks: [],
      }],
    };

    setProject(prev => ({
      ...prev,
      levels: [...prev.levels, newLevel],
    }));
  }, [project.levels.length]);

  const addTrack = useCallback((levelId: string) => {
    const level = project.levels.find(l => l.id === levelId);
    if (!level) return;

    const newTrack: Track = {
      id: generateId(),
      label: `Track ${level.tracks.length + 1}`,
      blocks: [],
    };

    setProject(prev => ({
      ...prev,
      levels: prev.levels.map(level =>
        level.id === levelId
          ? { ...level, tracks: [...level.tracks, newTrack] }
          : level
      ),
    }));
  }, [project.levels]);

  return (
    <div className={`project-manager ${className}`} style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      backgroundColor: '#f8f9fa',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
    }}>
      {/* Header */}
      <div style={{
        padding: '20px',
        backgroundColor: '#fff',
        borderBottom: '3px solid #333',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      }}>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>
          {project.title}
        </h1>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={addLevel}
            style={{
              padding: '12px 24px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              boxShadow: '0 2px 4px rgba(0, 123, 255, 0.3)',
              transition: 'all 0.2s ease',
            }}
          >
            Add Level
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '20px', backgroundColor: '#f8f9fa' }}>
        <MusicalFormEditor
          project={project}
          state={state}
          events={events}
          width={1400}
          height={1000}
        />
      </div>

      {/* Sidebar */}
      <div style={{
        position: 'absolute',
        right: '16px',
        top: '80px',
        width: '250px',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px' }}>Project Info</h3>
        <div style={{ fontSize: '14px', color: '#666' }}>
          <div>Measures: {project.measures}</div>
          <div>Levels: {project.levels.length}</div>
          <div>Total Blocks: {project.levels.reduce((sum, level) =>
            sum + level.tracks.reduce((trackSum, track) => trackSum + track.blocks.length, 0), 0
          )}</div>
        </div>

        {state.selectedBlockId && (
          <div style={{ marginTop: '16px' }}>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '14px' }}>Selected Block</h4>
            <div style={{ fontSize: '12px', color: '#666' }}>
              ID: {state.selectedBlockId}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

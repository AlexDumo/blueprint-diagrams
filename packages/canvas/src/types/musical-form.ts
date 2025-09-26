export type Id = string;

/** Musical position */
export interface Pos {
    measure: number; // 1-based measure number
    beatFrac?: number; // optional fractional offset, 0..1
}

/** Inclusive span */
export interface Span {
    start: Pos;
    end: Pos;
}

/** Color definitions */
export interface RGBA {
    r: number;
    g: number;
    b: number;
    a?: number; // 0..1
}

export interface GradientStop {
    at: number; // 0..1
    color: RGBA;
}

export interface Gradient {
    type: "linear" | "radial";
    stops: GradientStop[];
}

/** Visual style for blocks/events */
export interface Style {
    fill?: RGBA | Gradient;
    stroke?: RGBA;
    cornerRadius?: number;
    minPixelWidth?: number;
    manualPixelWidth?: number;
    dashed?: boolean;
}

/** Labels inside a block */
export interface BlockLabels {
    center?: string; // big label in center
    tl?: string; // top-left
    tr?: string; // top-right
    bl?: string; // bottom-left
    br?: string; // bottom-right
}

/** Core block unit */
export interface Block {
    id: Id;
    name?: string;
    levelId: Id;
    trackId: Id;
    span: Span;
    labels?: BlockLabels;
    style?: Style;
    isExpanded?: boolean;
    children?: Block[];
}

/** Track = parallel lane in a level */
export interface Track {
    id: Id;
    label?: string;
    blocks: Block[];
}

/** Level = hierarchical depth */
export interface Level {
    id: Id;
    index: number; // 0 or 1 = top
    label?: string;
    tracks: Track[];
    collapsedByDefault?: boolean;
}

/** Timeline settings */
export interface TimelineSettings {
    orientation: "horizontal" | "vertical";
    showTimelineRuler: boolean;
    showLevelRuler: boolean;
}

/** Root project */
export interface FormProject {
    id: Id;
    title: string;
    measures: number;
    timeline: TimelineSettings;
    levels: Level[];
}

/** UI State for managing the form editor */
export interface FormEditorState {
    selectedBlockId?: Id;
    selectedTrackId?: Id;
    selectedLevelId?: Id;
    hoveredBlockId?: Id;
    collapsedLevels: Set<Id>;
    zoom: number;
    scrollOffset: { x: number; y: number };
}

/** Events for form editor interactions */
export interface FormEditorEvents {
    onBlockSelect?: (blockId: Id) => void;
    onBlockHover?: (blockId: Id | undefined) => void;
    onBlockMove?: (blockId: Id, newSpan: Span) => void;
    onBlockResize?: (blockId: Id, newSpan: Span) => void;
    onBlockCreate?: (parentId: Id, newBlock: Omit<Block, 'id'>) => void;
    onBlockDelete?: (blockId: Id) => void;
    onLevelToggle?: (levelId: Id, collapsed: boolean) => void;
    onTrackCreate?: (levelId: Id, newTrack: Omit<Track, 'id' | 'blocks'>) => void;
    onTrackDelete?: (trackId: Id) => void;
}

/** Props for the main FormEditor component */
export interface FormEditorProps {
    project: FormProject;
    state: FormEditorState;
    events: FormEditorEvents;
    className?: string;
    width?: number;
    height?: number;
}

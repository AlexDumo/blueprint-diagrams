export { BlueprintCanvas } from './components/BlueprintCanvas'
export type { BlueprintCanvasProps, CanvasElement } from './types'

// Musical Form Components
export { BlockComponent } from './components/BlockComponent'
export { TrackComponent } from './components/TrackComponent'
export { LevelComponent } from './components/LevelComponent'
export { TimelineRuler } from './components/TimelineRuler'
export { MusicalFormEditor } from './components/MusicalFormEditor'
export { ProjectManager } from './components/ProjectManager'

// Musical Form Types
export type {
    Id,
    Pos,
    Span,
    RGBA,
    GradientStop,
    Gradient,
    Style,
    BlockLabels,
    Block,
    Track,
    Level,
    TimelineSettings,
    FormProject,
    FormEditorState,
    FormEditorEvents,
    FormEditorProps,
} from './types/musical-form'

// Musical Form Utils
export {
    rgbaToCss,
    gradientToCss,
    styleToCss,
    spanDuration,
    spansOverlap,
    measureToPixel,
    pixelToMeasure,
    generateId,
    formatMeasureRange,
} from './utils/musical-form'

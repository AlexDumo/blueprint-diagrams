import { RGBA, Gradient, Style, Span, Pos } from '../types/musical-form';

/** Convert RGBA to CSS color string */
export function rgbaToCss(rgba: RGBA): string {
    const { r, g, b, a = 1 } = rgba;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

/** Convert Gradient to CSS gradient string */
export function gradientToCss(gradient: Gradient): string {
    const stops = gradient.stops
        .map(stop => `${rgbaToCss(stop.color)} ${stop.at * 100}%`)
        .join(', ');

    if (gradient.type === 'linear') {
        return `linear-gradient(to right, ${stops})`;
    } else {
        return `radial-gradient(circle, ${stops})`;
    }
}

/** Convert Style to CSS properties */
export function styleToCss(style: Style): React.CSSProperties {
    const css: React.CSSProperties = {};

    if (style.fill) {
        if ('type' in style.fill) {
            css.background = gradientToCss(style.fill);
        } else {
            css.backgroundColor = rgbaToCss(style.fill);
        }
    }

    if (style.stroke) {
        css.borderColor = rgbaToCss(style.stroke);
        css.borderWidth = '2px';
        css.borderStyle = 'solid';
    }

    if (style.cornerRadius !== undefined) {
        css.borderRadius = `${style.cornerRadius}px`;
    }

    if (style.minPixelWidth !== undefined) {
        css.minWidth = `${style.minPixelWidth}px`;
    }

    if (style.manualPixelWidth !== undefined) {
        css.width = `${style.manualPixelWidth}px`;
    }

    if (style.dashed) {
        css.borderStyle = 'dashed';
    }

    return css;
}

/** Calculate the duration of a span in measures */
export function spanDuration(span: Span): number {
    const startMeasure = span.start.measure + (span.start.beatFrac || 0);
    const endMeasure = span.end.measure + (span.end.beatFrac || 0);
    return endMeasure - startMeasure;
}

/** Check if two spans overlap */
export function spansOverlap(span1: Span, span2: Span): boolean {
    const start1 = span1.start.measure + (span1.start.beatFrac || 0);
    const end1 = span1.end.measure + (span1.end.beatFrac || 0);
    const start2 = span2.start.measure + (span2.start.beatFrac || 0);
    const end2 = span2.end.measure + (span2.end.beatFrac || 0);

    return !(end1 <= start2 || end2 <= start1);
}

/** Convert measure position to pixel position */
export function measureToPixel(measure: number, measuresPerPixel: number): number {
    return measure * measuresPerPixel;
}

/** Convert pixel position to measure position */
export function pixelToMeasure(pixel: number, measuresPerPixel: number): number {
    return pixel / measuresPerPixel;
}

/** Generate a unique ID */
export function generateId(): string {
    return Math.random().toString(36).substr(2, 9);
}

/** Format measure range for display */
export function formatMeasureRange(span: Span): string {
    const start = span.start.beatFrac
        ? `${span.start.measure}+${Math.round(span.start.beatFrac * 4)}/4`
        : `${span.start.measure}`;

    const end = span.end.beatFrac
        ? `${span.end.measure}+${Math.round(span.end.beatFrac * 4)}/4`
        : `${span.end.measure}`;

    return `${start}–${end}`;
}

import { ReactNode } from 'react'

export interface BlueprintCanvasProps {
    /**
     * Width of the canvas
     */
    width?: number
    /**
     * Height of the canvas
     */
    height?: number
    /**
     * Children to render on the canvas
     */
    children?: ReactNode
    /**
     * Additional CSS class name
     */
    className?: string
    /**
     * Canvas background color
     */
    backgroundColor?: string
    /**
     * Callback when canvas is ready
     */
    onReady?: (canvas: HTMLCanvasElement) => void
    /**
     * Callback when canvas is resized
     */
    onResize?: (width: number, height: number) => void
}

export interface CanvasElement {
    id: string
    type: 'rectangle' | 'circle' | 'line' | 'text'
    x: number
    y: number
    width?: number
    height?: number
    radius?: number
    text?: string
    color?: string
    strokeColor?: string
    strokeWidth?: number
}

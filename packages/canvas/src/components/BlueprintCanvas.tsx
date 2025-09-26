import React, { useRef, useEffect, useState, useCallback } from 'react'
import { BlueprintCanvasProps } from '../types'

export const BlueprintCanvas: React.FC<BlueprintCanvasProps> = ({
  width = 800,
  height = 600,
  children,
  className = '',
  backgroundColor = '#ffffff',
  onReady,
  onResize,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [canvasSize, setCanvasSize] = useState({ width, height })

  const handleResize = useCallback(() => {
    if (canvasRef.current) {
      const newSize = { width, height }
      setCanvasSize(newSize)
      onResize?.(newSize.width, newSize.height)
    }
  }, [width, height, onResize])

  useEffect(() => {
    handleResize()
  }, [handleResize])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = canvasSize.width
    canvas.height = canvasSize.height

    // Set background
    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, canvasSize.width, canvasSize.height)

    // Notify that canvas is ready
    onReady?.(canvas)

    // Cleanup function
    return () => {
      ctx.clearRect(0, 0, canvasSize.width, canvasSize.height)
    }
  }, [canvasSize, backgroundColor, onReady])

  return (
    <div className={className}>
     asdf
    </div>
  )
}

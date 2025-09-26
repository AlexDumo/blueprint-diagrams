# @blueprint-diagrams/blueprint-canvas

A React canvas component for blueprint diagrams.

## Installation

```bash
pnpm add @blueprint-diagrams/blueprint-canvas
```

## Usage

```tsx
import React from 'react'
import { BlueprintCanvas } from '@blueprint-diagrams/blueprint-canvas'

function App() {
  return (
    <BlueprintCanvas
      width={800}
      height={600}
      backgroundColor="#f0f0f0"
      onReady={(canvas) => {
        const ctx = canvas.getContext('2d')
        // Draw something on the canvas
        ctx?.fillRect(100, 100, 50, 50)
      }}
    />
  )
}

export default App
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `width` | `number` | `800` | Width of the canvas |
| `height` | `number` | `600` | Height of the canvas |
| `children` | `ReactNode` | - | Children to render |
| `className` | `string` | `''` | Additional CSS class name |
| `backgroundColor` | `string` | `'#ffffff'` | Canvas background color |
| `onReady` | `(canvas: HTMLCanvasElement) => void` | - | Callback when canvas is ready |
| `onResize` | `(width: number, height: number) => void` | - | Callback when canvas is resized |

## Development

```bash
# Install dependencies
pnpm install

# Build the package
pnpm build

# Run in watch mode
pnpm dev

# Type check
pnpm type-check
```

## License

AGPL-3.0

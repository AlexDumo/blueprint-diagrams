import { defineConfig } from 'tsup'

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    external: ['react', 'react-dom'],
    treeshake: true,
    minify: false,
    target: 'es2020',
    outDir: 'dist',
    outExtension({ format }) {
        return {
            js: format === 'cjs' ? '.js' : '.mjs',
        }
    },
})

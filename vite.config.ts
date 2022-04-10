import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [react(), dts({ exclude: 'example', outputDir: 'dist' })],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'useOOState',
      fileName: (format) => `use-oop-state.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React'
        }
      },
    }
  }
})

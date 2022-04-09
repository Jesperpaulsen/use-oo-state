import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'
import typescript from '@rollup/plugin-typescript';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'useOOPState',
      fileName: (format) => `use-oop-state.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React'
        }
      },
      plugins: [typescript()]
    }
  }
})

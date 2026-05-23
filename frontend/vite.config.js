import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/todo-in-react/' : '/',
  plugins: [react()],
  build: {
    // This will make the build fail if there are TypeScript errors
    typescript: {
      noEmit: true,
      composite: true
    }
  }
}))

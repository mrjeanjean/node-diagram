import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    base: '',
    server: {
        port: 3003
    },
    resolve: {
        alias: {
            'canvas-core': 'canvas-core/src/index.ts'
        }
    }
})

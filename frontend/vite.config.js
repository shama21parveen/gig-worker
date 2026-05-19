import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    'react-core': ['react', 'react-dom', 'react-router-dom'],
                    'query-store': ['@tanstack/react-query', 'zustand'],
                    'forms-validation': ['react-hook-form', '@hookform/resolvers', 'zod'],
                    charts: ['recharts'],
                    motion: ['framer-motion'],
                    maps: ['leaflet', 'react-leaflet'],
                },
            },
        },
    },
});

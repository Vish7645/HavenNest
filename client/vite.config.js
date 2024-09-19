import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api':{
        // target:'https://real-estate-back-end-three.vercel.app',
        target: 'http://localhost:3000',
        secure: true,
        changeOrigin: true, // Add this to modify the origin of the host header
      },
    },
  },
  plugins: [react()],
})
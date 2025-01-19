import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const function_key = process.env.VITE_FUNCTION_KEY; // Access the variable

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/test_repo/",
  server: {
    proxy: {
      '/api/': {
        target: 'https://oresight-proxy-server.azurewebsites.net',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
        headers: {
          'x-functions-key': function_key  // Ensure this line is correctly fetching the key
        }
      }
    },
  },
})

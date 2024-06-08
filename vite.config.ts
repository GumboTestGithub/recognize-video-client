import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://is.taewonkim.store', // 백엔드 서버 주소
        changeOrigin: true,
      },
    },
  },
})

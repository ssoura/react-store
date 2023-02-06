import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [react()],
    server: {
      host: true,
      proxy: {
        "/api": {
          target: env.VITE_APP_API,
          changeOrigin: true,
          secure: true,
        },
      },
    },
  };
});

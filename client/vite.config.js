import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
// export default {
//   proxy: {
//     "/api": {
//       target: "http://localhost:8000",
//       changeOrigin: true,
//       rewrite: (path) => path.replace(/^\/api/, ""),
//     },
//   },
// };

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});

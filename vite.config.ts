/**
 * @file vite.config.ts
 * @description vite 配置文件
 * @since Beta v0.6.5
 */

import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import VueDevtools from "vite-plugin-vue-devtools";
import vuetify from "vite-plugin-vuetify";

import buildTimePlugin from "./src/utils/TGBuild.js";

const env: TauriProcessEnv = process.env;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vuetify(), buildTimePlugin(), VueDevtools()],
  resolve: {
    alias: {
      "@/": "/src/",
      "@comp/": "/src/components/",
      "@Hutao/": "/src/plugins/Hutao/",
      "@Mys/": "/src/plugins/Mys/",
      "@Sqlite/": "/src/plugins/Sqlite/",
      "@Bili/": "/src/plugins/Bili/",
    },
  },
  clearScreen: false,
  server: { port: 4000, strictPort: true },
  envPrefix: ["VITE_", "TAURI_"],
  esbuild: { supported: { "top-level-await": true } },
  build: {
    // Tauri supports es2021
    target: env.TAURI_PLATFORM === "windows" ? "chrome105" : "safari13",
    // don't minify for debug builds
    minify: !env.TAURI_DEBUG ? "esbuild" : false,
    // produce sourcemaps for debug builds
    sourcemap: !!env.TAURI_DEBUG,
    // chunk size warning limit, default is 500kB,here set 4096KB which is 4MB
    chunkSizeWarningLimit: 4096, // KB
    // rollup options
    rollupOptions: {
      // chunking
      output: {
        manualChunks(id: string) {
          // pnpm 依赖包路径格式为 本地路径/node_modules/.pnpm/包名@版本号/node_modules/依赖包名/文件路径
          if (id.includes("node_modules")) {
            const arr = id.split("node_modules/");
            return arr[2].split("/")[0];
          }
        },
      },
    },
  },
});

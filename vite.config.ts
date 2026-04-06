import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "loce-ds/styles.css": path.resolve(__dirname, "loce-ds-src/styles.css"),
      "loce-ds": path.resolve(__dirname, "loce-ds-src/index.ts"),
    },
  },
});

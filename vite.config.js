import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Alias @ to point to /src folder
    },
  },
  server: {
    port: 5174, // Define a custom port for the development server
  },
});

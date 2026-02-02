import path from "path"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "tekimax-ts/react": path.resolve(__dirname, "../../packages/tekimax-ts/src/react/index.ts"),
      "tekimax-ts": path.resolve(__dirname, "../../packages/tekimax-ts/src/index.ts"),
    },
    dedupe: ['react', 'react-dom'],
  },
})

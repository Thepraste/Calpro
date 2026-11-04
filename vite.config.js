
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),

    // IMPORTANT: This plugin enables Tailwind CSS inside our Vite project.
    tailwindcss(),
  ],
})

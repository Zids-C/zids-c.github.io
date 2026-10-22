import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // This is a user-site repository: https://Zids-C.github.io/
  base: '/',
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// base './' lets the built site work from any folder, including GitHub Pages (username.github.io/repo-name/)
export default defineConfig({ base: './', plugins: [react()] });

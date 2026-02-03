import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Base path for GitHub Pages - update this to match your repository name
  // For example, if your repo is 'username/my-project', set base to '/my-project/'
  // For a user/org site (username.github.io), use '/'
  base: './',

  build: {
    // Output directory
    outDir: 'dist',

    // Multi-page configuration
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        page2: resolve(__dirname, 'page2.html'),
        page3: resolve(__dirname, 'page3.html'),
      },
    },

    // Copy Shoelace assets
    assetsDir: 'assets',
  },

  // Development server configuration
  server: {
    port: 3000,
    open: true,
  },

  // Optimize dependencies
  optimizeDeps: {
    include: ['@shoelace-style/shoelace'],
  },
});

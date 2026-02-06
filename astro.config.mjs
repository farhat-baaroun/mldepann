import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import path from 'path';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false, // We have our own base styles
    }),
  ],
  output: 'static',
  compressHTML: true,
  build: {
    assets: '_assets',
    inlineStylesheets: 'always', // Inline all CSS to avoid render-blocking
  },
  image: {
    domains: [],
    remotePatterns: [],
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: false,
      },
    },
  },
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), './src'),
      },
    },
    optimizeDeps: {
      exclude: [
        // Exclude unused UI components from dependency optimization
        '@radix-ui/react-accordion',
        '@radix-ui/react-alert-dialog',
        '@radix-ui/react-aspect-ratio',
        '@radix-ui/react-avatar',
        '@radix-ui/react-checkbox',
        '@radix-ui/react-collapsible',
        '@radix-ui/react-context-menu',
        '@radix-ui/react-dialog',
        '@radix-ui/react-dropdown-menu',
        '@radix-ui/react-hover-card',
        '@radix-ui/react-menubar',
        '@radix-ui/react-navigation-menu',
        '@radix-ui/react-popover',
        '@radix-ui/react-progress',
        '@radix-ui/react-radio-group',
        '@radix-ui/react-scroll-area',
        '@radix-ui/react-select',
        '@radix-ui/react-slider',
        '@radix-ui/react-switch',
        '@radix-ui/react-tabs',
        '@radix-ui/react-toggle',
        '@radix-ui/react-toggle-group',
        'cmdk',
        'embla-carousel-react',
        'input-otp',
        'react-day-picker',
        'react-hook-form',
        'react-resizable-panels',
        'recharts',
        'sonner',
        'vaul',
        'next-themes',
        'zod',
        'date-fns',
      ],
      include: ['react', 'react-dom'],
    },
    build: {
      minify: 'esbuild',
      cssMinify: true,
      cssCodeSplit: true,
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // Split React core into smaller chunks for better tree-shaking
            if (id.includes('node_modules/react/') && !id.includes('react-dom')) {
              return 'react-core';
            }
            if (id.includes('node_modules/react-dom/')) {
              return 'react-dom-core';
            }
            // Split lucide-react icons into separate chunk - load on demand
            if (id.includes('node_modules/lucide-react')) {
              return 'ui-vendor';
            }
            // Split each React component into its own chunk for better parallel loading
            if (id.includes('/components/react/')) {
              const componentName = id.split('/components/react/')[1]?.split('.')[0];
              if (componentName) {
                return `component-${componentName}`;
              }
            }
            // Keep vendor chunks separate
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          compact: true,
        },
      },
      target: 'es2020',
      chunkSizeWarningLimit: 1000,
    },
    optimizeDeps: {
      include: ['react', 'react-dom'],
    },
    esbuild: {
      legalComments: 'none',
      minifyIdentifiers: true,
      minifySyntax: true,
      minifyWhitespace: true,
    },
  },
});


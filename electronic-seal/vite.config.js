/* eslint-disable import/no-unresolved */
import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import Icons from 'unplugin-icons/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

const plugins = [];

if (process.env.NODE_ENV === 'production') {
  // 打包依赖展示
}

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    Icons(),
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    ...plugins,
  ],
  define: {
    'process.env': {},
  },
  server: {
    port: 4000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://81.70.204.70:9000/',
        changeOrigin: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve('./src'),
      '@img': resolve('./src/assets/img'),
    },
  },
});

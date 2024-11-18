import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue(), VueSetupExtend(), AutoImport({
    resolvers: [ElementPlusResolver()],
  }),
  Components({
    resolvers: [ElementPlusResolver()],
  }),],
  build: {
    target: 'modules',
    outDir: 'es',
    minify: true,
    rollupOptions: {
      external: ['vue', 'element-plus'],
      input: ['index.ts'],
      output: [
        {
          format: 'es',
          entryFileNames: '[name].js',
          // 让打包目录和我们目录对应
          preserveModules: true,
          // preserveModulesRoot: resolve(__dirname, './dist/es'),
          exports: 'named',
          // 配置打包根目录
          dir: resolve(__dirname, './dist/es')
        },
        {
          format: 'cjs',
          entryFileNames: '[name].js',
          //让打包目录和我们目录对应
          preserveModules: true,
          // preserveModulesRoot: resolve(__dirname, './dist/es'),
          exports: 'named',
          //配置打包根目录
          dir: resolve(__dirname, './dist/lib'),
        },
      ]
    },
    lib: {
      entry: './index.js',
      name: 'xxl',
      formats: ['es', 'cjs'],
    },
  }
})

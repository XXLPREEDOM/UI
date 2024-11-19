import { defineConfig } from 'vitepress'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import genRoutes from './routes'
console.log(genRoutes('sdk'));

export default defineConfig({
  title: 'DP Front Docs',
  description: 'A VitePress Site',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: '组件库', link: '/components/start' },
      { text: 'Hooks', link: '/hooks/start' },
    ],

    sidebar: {
      "/components": [
        {
          text: 'xxl-ui',
          items: genRoutes('components')
        }
      ],
      // components: [
      //   {
      //     text: 'xxl-ui',
      //     items: genRoutes('components')
      //   }
      // ],
      // hooks: [
      //   {
      //     text: '@dp/hooks',
      //     items: genRoutes('hooks')
      //   }
      // ],
    },

    socialLinks: [{ icon: 'github', link: 'https://git.easycodesource.com/h5-int/dp-ui' }]
  },
  vite: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ],
    ssr: { noExternal: [/element-plus/, '@dp/components', '@dp/hooks', 'vue'] }
  }
})

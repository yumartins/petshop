import { defineNuxtConfig } from 'nuxt3'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

export default defineNuxtConfig({
  meta: {
    title: 'Petshop',
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ]
  },

  vite: {
    plugins: [
      Components({
        resolvers: [AntDesignVueResolver()]
      })
    ],
    // @ts-expect-error: Missing ssr key
    ssr: {
      noExternal: ['ant-design-vue']
    }
  },

  components: true,

  buildModules: [
    '@nuxtjs/tailwindcss'
  ]
})

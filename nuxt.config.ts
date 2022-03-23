import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
  css: ['ant-design-vue/dist/antd.css'],

  meta: {
    title: 'Petshop',
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ]
  },

  build: {
    transpile: ['ant-design-vue']
  },

  components: true,

  buildModules: [
    '@nuxtjs/tailwindcss'
  ]
})

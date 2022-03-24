import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
  meta: {
    title: 'Petshop',
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ]
  },

  components: true,

  buildModules: [
    '@nuxtjs/tailwindcss',
    ['@nuxtjs/google-fonts', {
      families: {
        Inter: [300, 400, 500, 600, 700]
      }
    }]
  ]
})

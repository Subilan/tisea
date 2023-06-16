// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Tisea - Anything Titanium.'
    },
    pageTransition: {
      name: 'default-fade',
      mode: 'out-in'
    }
  }
})

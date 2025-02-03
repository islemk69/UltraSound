export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  devServer: {
    port: 8000,
  },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  css: [
    '~/assets/css/tailwind.css',
    '~/assets/css/base.css',
  ],
  tailwindcss: {
    cssPath: ['~/assets/css/tailwind.css', { injectPosition: 'first' }],
    config: {},
    viewer: true,
    exposeConfig: false,
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'UltraSound',
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Azeret+Mono:ital,wght@0,100..900;1,14..32,100..900&display=swap',
        },
      ],
      script: [
        {
          src: 'https://kit.fontawesome.com/3db1c2f3ab.js',
          crossorigin: 'anonymous',
          async: true,
        },
      ],
    },
  },
});

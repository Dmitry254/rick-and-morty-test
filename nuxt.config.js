import {defineNuxtConfig} from 'nuxt/config';

export default defineNuxtConfig({
  devtools: {enabled: true},

  css: ["@/assets/index.css"],

  modules: ['@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt'],

  app: {
    head: {
      title: "Rick and Morty",
      meta: [
        {charset: 'utf-8'},
        {name: 'viewport', content: 'width=device-width, initial-scale=1'},
        {hid: 'description', name: 'description', content: ''},
        {name: 'format-detection', content: 'telephone=no'},
      ],
      link: [
        {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
      ],
      bodyAttrs: {
        class: 'body'
      },
    },
  }
});

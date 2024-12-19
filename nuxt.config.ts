// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxt/icon", "nuxt-lodash"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  build: {
    transpile: [
      "@fortawesome/fontawesome-svg-core",
      "@fortawesome/pro-solid-svg-icons",
      "@fortawesome/pro-regular-svg-icons",
      "@fortawesome/pro-light-svg-icons",
      "@fortawesome/free-brands-svg-icons",
    ],
  },
  icon: {
    serverBundle: {
      collections: ["uil", "mdi"],
    },
  },
  runtimeConfig: {
    public: {
      appName: process.env.NUXT_PUBLIC_APP_NAME || "App Name",
      webBase: process.env.NUXT_PUBLIC_WEB_BASE || "http://localhost:3000",
      webPath: process.env.NUXT_PUBLIC_WEB_PATH || "/",
      apiBase:
        process.env.NUXT_PUBLIC_API_BASE ||
        "https://exam-api.dev.mis.cmu.ac.th/",
      apiPath: process.env.NUXT_PUBLIC_API_PATH || "/api/",
    },
  },
});

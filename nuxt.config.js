import colors from 'vuetify/es5/util/colors'

export default {
  ssr: true,
  target: "static",
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: "%s",
    title: "Better Horse",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },

      // Preencher:

      { hid: "og:locale", name: "og:locale", content: "pt_BR" },

      { hid: "og:url", name: "og:url", content: "http://..." },
      { hid: "og:title", name: "og:title", content: "Home" },
      { hid: "og:site_name", name: "og:site_name", content: "..." },

      { hid: "og:description", name: "og:description", content: "..." },

      { hid: "og:image", name: "og:image", content: "/og_image.png" },
      { hid: "og:image:type", name: "og:image:type", content: "image/png" },

      { hid: "og:type", name: "og:type", content: "website" },
      { name: "google", content: "notranslate" },
      {
        hid: "keywords",
        name: "keywords",
        content:
          "moda country, moda, fashion, botas, lojaonline, tendencia, cowboy, chapéus, vaqueiro, vaqueira, selaria",
      },
    ],
    link: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;500;600&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Oleo+Script&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Mulish:wght@700&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css",
      },
      { rel: "icon", type: "image/svg", href: "/logo.svg" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fjalla+One&display=swap",
      },

      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Mochiy+Pop+P+One&display=swap",
      },

      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Roboto&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Montserrat&display=swap",
      },

      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Questrial&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Acme&family=Balsamiq+Sans:ital,wght@1,700&family=Fira+Sans+Condensed:wght@500&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bree+Serif&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Mochiy+Pop+P+One&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Lobster&family=Open+Sans:wght@400;500&family=Pacifico&family=Roboto&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Montserrat&display=swap",
      },
    ],
  },
  loading: "~/components/loading.vue",

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    "@/assets/css/main.css",
    "@/assets/css/main.scss",
    "vuetify/dist/vuetify.css",
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    "~/plugins/vue-image-magnifier",
    "@/plugins/vue-the-mask",
    "~/plugins/viacep",
    "@/plugins/facebookPixel",
    "@/plugins/vue-zoom-on-hover",
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // ['@nuxtjs/google-analytics', {
    //   id: ''
    // }],
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [],

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ["~/assets/css/main.scss"],
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    splitChunks: {
      layouts: true,
    },
  },

  router: {
    scrollBehavior(to, from, savedPosition) {
      return { x: 0, y: 0 };
    },
  },
};

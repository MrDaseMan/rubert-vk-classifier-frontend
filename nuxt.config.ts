// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },

    nitro: {
        routeRules: {
            "/vkapi/**": {
                proxy: "https://api.vk.com/**",
            },
        }
    },

    runtimeConfig: {
        //! For tests and production
        // server: {
        //     host: "0.0.0.0",
        //     port: "3000",
        // },
        public: {
          apiUrl: "https://yourwayapi.ru", // There is must be API URL
        },
    },

    app: {
        head: {
            title: "Your Way",
            meta: [],
            script: [
                {
                    src: "https://vk.com/js/api/openapi.js?169",
                    defer: true,
                }
            ],
            link: [],
            style: [],
            noscript: [
                // <noscript>JavaScript is required</noscript>
                { children: "JavaScript is required" },
            ],
        },
        rootId: "yw-app",
        pageTransition: { name: "page-slide", mode: "out-in" },
        layoutTransition: { name: "page-slide", mode: "out-in" }
    },

    components: [
        {
            path: "~/components",
            pathPrefix: false,
        },
    ],

    css: [
        // SCSS main file
        "~/assets/scss/main.scss",
    ],
});
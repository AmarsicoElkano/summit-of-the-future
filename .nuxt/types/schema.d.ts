import { NuxtModule, RuntimeConfig } from '@nuxt/schema'
declare module '@nuxt/schema' {
  interface NuxtConfig {
    ["prismic"]?: typeof import("@nuxtjs/prismic").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>,    ["lenis"]?: typeof import("nuxt-lenis").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>,    ["telemetry"]?: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>,  modules?: (undefined | null | false | NuxtModule | string | [NuxtModule | string, Record<string, any>] | ["@nuxtjs/prismic", Exclude<NuxtConfig["prismic"], boolean>] | ["nuxt-lenis", Exclude<NuxtConfig["lenis"], boolean>] | ["@nuxt/telemetry", Exclude<NuxtConfig["telemetry"], boolean>])[],
  }
}
declare module 'nuxt/schema' {
  interface NuxtConfig {
    ["prismic"]?: typeof import("@nuxtjs/prismic").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>,    ["lenis"]?: typeof import("nuxt-lenis").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>,    ["telemetry"]?: typeof import("@nuxt/telemetry").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>,  modules?: (undefined | null | false | NuxtModule | string | [NuxtModule | string, Record<string, any>] | ["@nuxtjs/prismic", Exclude<NuxtConfig["prismic"], boolean>] | ["nuxt-lenis", Exclude<NuxtConfig["lenis"], boolean>] | ["@nuxt/telemetry", Exclude<NuxtConfig["telemetry"], boolean>])[],
  }
  interface RuntimeConfig {
   app: {
      buildId: string,

      baseURL: string,

      buildAssetsDir: string,

      cdnURL: string,
   },

   nitro: {
      envPrefix: string,
   },
  }
  interface PublicRuntimeConfig {
   prismic: {
      endpoint: string,

      environment: string,

      clientConfig: {
         routes: Array<{

         }>,
      },

      client: string,

      linkResolver: string,

      richTextSerializer: string,

      injectComponents: boolean,

      components: any,

      preview: string,

      toolbar: boolean,

      devtools: boolean,
   },
  }
}
declare module 'vue' {
        interface ComponentCustomProperties {
          $config: RuntimeConfig
        }
      }
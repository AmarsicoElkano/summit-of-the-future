import type { ComputedRef, MaybeRef } from 'vue'
export type LayoutKey = "default"
declare module "../../node_modules/.pnpm/nuxt@3.13.0_@parcel+watcher@2.4.1_@types+node@22.5.1_ioredis@5.4.1_magicast@0.3.5_rollup@4.21_j5ez4x4kapjm5jzgam56cs37d4/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}
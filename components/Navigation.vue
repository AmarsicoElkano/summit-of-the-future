<script setup>
const { client } = usePrismic();

const { data: navigation } = await useAsyncData("navigation", () =>
  client.getSingle("navigation")
);

</script>

<script>
import gsap from "gsap";
import Logo from "./Logo.vue";

export default {
  data() {
    return {
      isActive: false,
      root: null,
    };
  },
  mounted() {
    this.root = document.documentElement;
  },
  methods: {
    toggle() {
      if (this.$refs.toggleNav.classList.contains("active")) {
        this.close();
      } else {
        this.open();
      }

      this.isActive = !this.isActive;
    },
    open() {
      gsap.to(this.$refs.nav, 1.25, {
        clipPath: "inset(0% 0% 0% 0%)",
        ease: "expo.out",
      });

      gsap.fromTo(
        this.$refs.navItems,
        { yPercent: 150 },
        {
          yPercent: 0,
          duration: 1,
          delay: 0.25,
          stagger: 0.05,
          ease: "expo.out",
        }
      );

      gsap.to(this.root, 0.25, {
        "--logo-color": "var(--primary-color)",
      });

      gsap.to(this.root, 1, {
        "--burger-color": "var(--primary-color)",
      });
    },
    close() {
      gsap.to(this.$refs.nav, 1.25, {
        clipPath: "inset(0% 0% 100% 0%)",
        ease: "expo.out",
        delay: 0.25,
      });

      gsap.fromTo(
        this.$refs.navItems,
        { yPercent: 0 },
        {
          yPercent: 150,
          duration: 1,
          stagger: -0.05,
          ease: "expo.out",
        }
      );

      gsap.to(this.root, 0.25, {
        "--logo-color": "black",
        delay: 0.5,
      });


      gsap.to(this.root, 1, {
        "--burger-color": "var(--primary-color)",
      });
    },
    slugToString(s) {
      return s?.replaceAll("-", " ");
    },
  },
};
</script>
<template>
  <div ref="nav"
    class="bg-white max-h-[100vh] w-screen h-screen overflow-y-hidden fixed top-0 inset-0 bg-primary bg-radial-gradient flex items-center justify-center nav z-20 ">
    <img class="absolute top-0  z-0" width="100%" height="auto" src="/public/img/symbol.svg" />
    <nav class="w-full pl-70 pr-40">
      <Logo class="absolute left-[2%] top-[2%] px-[16px] md:px-[60px]" />

      <ul class="flex flex-col items-start absolute top-[20%] sm:top-[20%] md:top-[30%] lg:top-[20%]">
        <li v-for="(item, index) in navigation.data.links" :key="index"
          class="text-primary font-display uppercase text-lg md:text-md overflow-hidden relative py-20 md:py-10 last:border-b-[1px] last:border-border-[rgba(224, 224, 225, 0.1)] last:border-opacity-20 last:pb-30"
          @click="toggle">
          <div ref="navItems">
            <PrismicLink
              class="flex items-center  border-[rgba(224, 224, 225, 0.1)]  border-t-[1px] cursor-pointer min-w-[360px] sm:w-[450px] md:w-[650px] lg:w-[720px]"
              :field="item.link">
              <span class="font-light mt-40 ">0{{ index + 1 }}</span> <span
                class="text-highlight sm:text-canvas_mb md:text-titleSection_mb pl-20 pt-30">{{ slugToString(item.text) }}</span>
            </PrismicLink>
          </div>
        </li>
      </ul>
    </nav>
    <div
      class="flex flex-col px-0 md:px-80 sm:px-10 z-20 absolute top-[55%] sm:top-[31%] sm:right-[7%] md:top-[50%] lg:top-[56%] lg:right-[1%] gap-40 md:gap-10 lg:gap-10">
      <PrismicLink :field="navigation.data.action_days_link" class="max-w-[360px]">
        <div class="w-[360px] h-[140px] py-8 pl-20 pr-6 bg-box-bg flex flex-row cursor-pointer justify-between">
          <p
            class="text-primary uppercase w-[150px] pt-40 pl-40 md:pt-20 md:pl-10 font-bold sm:w-[110px] md:w-[140px] sm:leading-20 md:leading-10 z-30 ">
            {{ navigation.data.action_days_title }}
          </p>
          <img class="w-[53px] h-[53px] self-end mr-10 mb-5" src="/public/img/arrow-right-menu.svg">
        </div>
      </PrismicLink>
      <PrismicLink :field="navigation.data.sof_link">
        <div class="w-[360px] h-[140px] py-8 pl-20 pr-6 bg-box-bg flex flex-row cursor-pointer justify-between">
          <p
            class="text-primary uppercase w-[150px] pt-40 pl-40 md:pt-20 md:pl-10 font-bold sm:w-[110px] md:w-[140px] sm:leading-20 md:leading-10 z-30 ">

            {{ navigation.data.sof_title }}
          </p>
          <img class="w-[53px] h-[53px] self-end mr-10 mb-5" src="/public/img/arrow-right-menu.svg">
        </div>
      </PrismicLink>
    </div>

  </div>
  <div class="flex flex-row gap-20">

    <button ref="toggleNav"
      class="w-[50px] h-[50px] flex flex-col border border-[var(--primary-color)] rounded-full items-center justify-center z-20 toggle-nav"
      :class="{ active: isActive }" @click="toggle">
      <div
        class="w-[20px] h-[2px] bg-[var(--primary-color)] mx-auto origin-left transition-transform duration-700 ease-expo-out" />
      <div
        class="w-[20px] h-[2px] bg-[var(--primary-color)] my-[4px] mx-auto origin-left transition-transform duration-700 ease-expo-out" />
      <div
        class="w-[20px] h-[2px] bg-[var(--primary-color)] scale-x-50 origin-left transition-transform duration-700 ease-expo-out" />
    </button>
  </div>
</template>

<style scoped>
.nav {
  clip-path: inset(0% 0% 100% 0%);
}

.bg-radial-gradient {
  background: radial-gradient(circle, #EAF4F8 0%, #009EDB 290%);
}

.bg-box-bg {
  background-image: url("/public/img/menu-box.svg");
  background-position: center;
  background-repeat: no-repeat;
}
</style>
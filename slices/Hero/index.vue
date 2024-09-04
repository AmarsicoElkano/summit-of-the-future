<script setup>
import "@prismicio/client";
defineProps(getSliceComponentProps(["slice"]));
</script>

<script>
import gsap from "gsap";
import SplitText from "gsap/SplitText";

export default {
  data() {
    return {
      sections: [],
    };
  },
  mounted() {
    gsap.registerPlugin(SplitText);

    this.scroll();
  },
  methods: {
    setRef(el) {
      if (el) this.sections.push(el);
    },
    scroll() {
      this.sections.forEach((el) => {
        const titles = gsap.utils.toArray("[data-title]", el);
        const heroGraphic = document.querySelector(".heroGraphic");

        /*
           animate section graphics
         */

        gsap.fromTo(heroGraphic, {
          xPercent: 20,
        },
          {
            xPercent: 0,
            duration: 2.5,
            ease: "expo.out",
          })

        /*
         animate section headings
       */

        if (titles) {
          titles.forEach((title) => {
            const duration = parseInt(title.dataset.duration) || 1.25;
            const scrub = false || title.dataset.scrub;

            const split = new SplitText(title, {
              type: "lines, words",
              linesClass: "overflow-hidden",
            });

            gsap.from(split.words, duration, {
              ease: "expo.out",
              yPercent: 150,
              stagger: 0.075,
              scrollTrigger: {
                trigger: el,
                scrub: scrub,
                start: "top 60%",
              },
              onComplete: () => {
                split.revert();
              },
            });
          });
        }
      });
    },
  },
};
</script>

<template>
  <section :ref="setRef"
    class="bg-gradient-to-b from-[var(--secondary-color)] to-[rgba(18, 52, 86, 0.2)] mt-[0px] px-[16px] md:px-[60px] pb-[50px] md:pb-[100px] text-primary">
    <PrismicImage
      class="heroGraphic absolute top-0 right-0 w-full h-[auto] min-w-[500px] md:max-w-[950px] opacity-30 md:opacity-100"
      :field="slice.primary.image" />
    <div class="mb-[90px] pt-[100px] md:pt-[50px] relative z-10">
      <p>{{ slice.primary.subtitle }}</p>
      <div class="pt-120">
        <h1 class="uppercase text-hero_mb md:text-hero pl-40" data-title>A MORE</h1>
        <h3 class="uppercase text-hero_mb md:text-hero pl-0" data-title>{{ slice.primary.title }}</h3>
        <h3 class="uppercase text-hero_mb md:text-hero pl-[80px]" data-title>WORLD</h3>
      </div>
    </div>

    <div class="relative pt-[12%] z-10 h-full">
      <PrismicRichText class=" md:w-1/2 ml-[90px] md:ml-[34%] z-30" :field="slice.primary.paragraph" />
    </div>
  </section>
</template>
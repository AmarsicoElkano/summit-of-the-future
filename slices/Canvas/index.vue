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
        const images = gsap.utils.toArray("[data-image]", el);
        const texts = gsap.utils.toArray("[data-text]", el);
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

        if (images) {
          images.forEach((img, index) => {
            gsap.fromTo(img, 1.25,
              {
                scale: 0,
                opacity: 0
              },
              {
                scale: 1,
                opacity: 1,
                scrollTrigger: {
                  trigger: img,
                  scrub: false,
                  start: "top 80%",
                },
              }
            )
          })
        }

        if (texts) {
          texts.forEach((text, index) => {
            const split = new SplitText(text, {
              type: "lines, words, chars",
              linesClass: "overflow-hidden",
            });
            gsap.fromTo(split.chars,
              {
                ease: "expo.out",
                y: 0,
                opacity: 0,
              },
              {
                y: 0,
                opacity: 1,
                stagger: 0.009,
                scrollTrigger: {
                  trigger: el,
                  start: "top 60%",
                }
              }
            )
          })
        }
      })
    }
  }
}

</script>



<template>
  <section :ref="setRef"
    class="relative bg-primary pt-[180px] xs:pt-[50px] md:pt-[150px] pb-[150px] px-[16px] md:px-[60px]">

    <img src="/img/circle-gradient.svg"
      class="circle-gradient absolute inset-0 m-auto animate-rotate w-full max-w-[730px] xs:px-[7%] sm:px-[15%] md:px-[5%] scale-[0.5] sm:!scale-[1.4] md:!scale-[1.4] lg:px-[3%] !scale-[1.8]"
      data-image />

    <div class="relative z-10">

      <div class="flex flex-col md:hidden relative mb-[100px]">
        <PrismicImage class="max-w-[205px] h-[auto] z-10 rounded-[11px] self-end" :field="slice.primary.image_right"
          data-image />
        <PrismicImage class="max-w-[205px] h-[auto] z-10 rounded-[11px] mt-[-30px]" :field="slice.primary.image_left"
          data-image />
      </div>

      <div class="mb-[40px] md:mb-[140px] relative z-20 max-w-[1000px] lg:max-w-[100%]">
        <h2 data-title class="text-canvas_mb md:text-[8vw] md:max-w-[68vw] uppercase text-white">
          {{ slice.primary.title_one }}
        </h2>
        <h2 data-title
          class="text-canvas_mb md:text-[8vw] pl-[50px] md:pl-[180px] md:max-w-[68vw] uppercase text-white">
          {{ slice.primary.title_second }}
        </h2>
        <h2 data-title class="text-canvas_mb md:text-[8vw] pl-[30px] md:pl-[100px] uppercase text-white">
          {{ slice.primary.title_third }}
        </h2>
      </div>

      <div class="hidden md:block">
        <PrismicImage class="max-w-[420px] h-[25rem] z-10 ml-80 absolute rounded-xl top-[-5%] right-0 object-cover"
          :field="slice.primary.image_right" data-image />
      </div>

      <div class="relative px-[30px] md:px-0 text-white flex items-center w-full">
        <div class="hidden md:block w-1/2">
          <PrismicImage class="rounded-xl w-full max-w-[366px] h-fit m-auto" :field="slice.primary.image_left"
            data-image />
        </div>
        <PrismicRichText class="w-full md:w-1/2 h-fit max-w-[600px]" :field="slice.primary.text" data-text />
      </div>
    </div>
  </section>
</template>
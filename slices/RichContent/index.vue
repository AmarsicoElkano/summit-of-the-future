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
      sections: []
    };
  },
  computed: {
    bgSymbolDirection() {
      const direction = this.slice.primary.bg_symbol_direction;

      if (direction === "Arrows facing up") {
        return {
          value: "up",
          src: "../../img/arrows-up.png",
        };
      } else if (direction === "Arrows facing right") {
        return {
          value: "right",
          src: "../../img/arrows-right.png",
        };
      }

      return "";
    },
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
                  trigger: el,
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
                stagger: 0.0009,
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
};
</script>

<template>
  <section class="w-full relative text-primary px-[16px] md:px-[60px] pt-[50px] md:pt-[100px]" :ref="setRef">
    <!-- textTopImageBottom -->
    <div v-if="slice.variation === 'textTopImageBottom'">
      <div class="md:flex">
        <h2 data-title class="w-full md:w-[70%] uppercase text-headline_mb md:text-headline mb-[40px] md:mb-[0px]">
          {{ slice.primary.title }}
        </h2>
        <PrismicRichText class="w-full md:w-[30%] mb-[40px] md:mb-[0px]" :field="slice.primary.text" data-text />
      </div>

      <div class="relative">
        <img class="w-[58%] sm:w-[50%] mds:w-[inherit] ml-auto mr-auto relative" :src="bgSymbolDirection.src"
          data-image />
        <PrismicImage :field="slice.primary.image"
          class="absolute bottom-0 left-[-3%] sm:left-[25%] smd:left-[25%] mds:left-1/2 transform md:-translate-x-1/2 max-w-[58%] sm:max-w-[50%] mds:w-[500px] md:max-h-[400px]"
          data-image />
      </div>
    </div>
    <!-- default/textLeftImageRight -->
    <div v-else-if="slice.variation === 'default'">
      <div class="flex">
        <div class="w-full md:w-[65%] pb-[0px] md:pb-[100px]">
          <h2 data-title class="uppercase text-headline_mb md:text-headline mb-[40px] md:mb-[142px]">
            {{ slice.primary.title }}
          </h2>

          <PrismicRichText class="w-full md:w-[60%]" :field="slice.primary.text" data-text />
        </div>
      </div>

      <div class="h-[500px] md:h-fit md:absolute bottom-0 right-0 w-full md:w-[50%]">
        <img class="absolute bottom-0" :src="bgSymbolDirection.src" data-image />
        <PrismicImage :field="slice.primary.image" data-image class="absolute bottom-0" />
      </div>
    </div>
    <!-- textRightImageLeft -->
    <div v-else-if="slice.variation === 'textRightImageLeft'">
      <h2 class="w-full md:w-[70%] uppercase text-headline_mb md:text-headline mb-[117px]">
        {{ slice.primary.title }}
      </h2>
      <div class="md:flex">

        <div class="relative w-full md:w-1/2">
          <img class="w-full md:w-[600px]" :class="slice.primary.bg_symbol_position === 'center'
            ? 'left-0'
            : ' ml-auto mr-auto left-0 right-0 '
            " :src="bgSymbolDirection.src" data-image />
          <PrismicImage :field="slice.primary.image" class="absolute top-0 w-[auto] md:w-[auto] z-10" data-image />
        </div>

        <div class="w-full md:w-1/2">
          <PrismicRichText class="" :field="slice.primary.text" data-text />
        </div>

      </div>
      <!-- <div
				class="flex flex-col justify-center md:gap-[60px] pl-80 pr-80 pt-[100px] pb-40 max-w-[550px] md:max-w-[100%] text-center md:text-left"
			>
				<h2 class="uppercase text-lg">
					{{ slice.primary.title }}
				</h2>
				<div class="flex flex-row justify-around">
					<img
						class="absolute bottom-[10px] left-0 w-[200px] md:w-[600px]"
						:class="
							slice.primary.bg_symbol_position === 'center'
								? 'left-0'
								: ' ml-auto mr-auto left-0 right-0 '
						"
						:src="bgSymbolDirection.src"
						data-image
					/>
					<PrismicImage
						:field="slice.primary.image"
						class="w-[250px] ml-[-80px] md:w-[auto] z-10"
						data-image
					/>
					<PrismicRichText
						class="md:max-w-[480px] text-left"
						:field="slice.primary.text"
						data-text
					/>
				</div>
			</div> -->
    </div>
  </section>
</template>
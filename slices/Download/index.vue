<script setup>
  import '@prismicio/client'
  defineProps(
    getSliceComponentProps(['slice'])
  )
</script>

<script>
  import gsap from "gsap";
	import SplitText from "gsap/SplitText";
	import { Swiper, SwiperSlide } from 'swiper/vue';
	import { Navigation } from 'swiper/modules';
	import 'swiper/swiper-bundle.css';

  export default {
		components: {
    	Swiper,
    	SwiperSlide
  	},
    data() {
      return {
        sections: [],
				modules: [Navigation],
      }
    },
		computed: {
      slidesPerView() {
        return this.slice.primary.downloads.length;
      }
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
                  markers: false
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
										start: "top 90%",
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
									trigger: texts,
									start: "top 90%",
                  markers: false
								}
							}
						)})
					}
				})
			},
		},
  }
</script>

<template>
	<section :ref="setRef" class="bg-secondary py-[50px] md:py-[150px] px-[16px] md:px-[100px]">
		<h2 data-title class="text-headline_mb md:text-headline text-primary uppercase mb-[40px] md:mb-[84px]">
			{{ slice.primary.title }}
		</h2>

		<div class="md:flex md:gap-[100px]">
			<PrismicRichText data-text class="text-primary text-base mb-[64px] md:mb-0" :field="slice.primary.paragraph" />

			<!-- <Swiper :slidesPerView="2" :spaceBetween="10" :modules="modules" v-if="slice.primary.downloads.length >= 2">
				<SwiperSlide v-for="(item, index) in slice.primary.downloads" class="text-primary">
					<PrismicLink :field="item.file" class="group">
						<figure data-image class="relative">
							<figcaption class="absolute z-10 w-full h-full px-20 py-30 text-white flex flex-col justify-between">
								<p class="text-md md:text-base">
									{{ item.image_subtitle }}
								</p>
								<h3 class="text-download uppercase text-md md:text-base">
									{{ item.image_title }}
								</h3>
							</figcaption>
							<PrismicImage class="z-0 w-full md:w-auto" :field="item.image" />
						</figure>
						<div class="flex items-center justify-between mt-20">
							<h4 class="text-primary uppercase tracking-[0.08em] text-[18px] leading-none md:text-xsm">
								Download
							</h4>
							<div class="md:w-[35px] md:h-[35px] flex flex-col border border-[var(--primary-color)] rounded-full items-center justify-center relative before:absolute before:w-full before:h-full before:bg-primary before:inset-0 before:rounded-full before:scale-0 before:transition-transform group-hover:before:scale-90 before:duration-300 active:before:scale-100">
								<div class="inline-flex relative overflow-hidden">
									<div class="w-full h-full relative delay-150 group-hover:delay-0 transition-transform duration-200 expo-out group-hover:translate-y-full">
										<svg class="w-[15px] h-[15px] md:w-15 md:h-15" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M15 9.22754L8.37892 15.9028L1.75784 9.22754" stroke="var(--primary-color)" stroke-width="2" stroke-miterlimit="13.33" stroke-linecap="square"/>
											<path d="M8.38281 14.9028L8.38281 1" stroke="var(--primary-color)" stroke-width="2" stroke-linecap="square" stroke-linejoin="round"/>
										</svg>                      
									</div>
									<div class="w-full h-full absolute -top-full delay-0 group-hover:delay-150 transition-transform duration-200 expo-out group-hover:translate-y-full">
										<svg class="md:w-[15px] md:h-[15px] md:w-15 md:h-15" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M15 9.22754L8.37892 15.9028L1.75784 9.22754" stroke="var(--white)" stroke-width="2" stroke-miterlimit="13.33" stroke-linecap="square"/>
											<path d="M8.38281 14.9028L8.38281 1" stroke="var(--white)" stroke-width="2" stroke-linecap="square" stroke-linejoin="round"/>
										</svg>                      
									</div>
								</div>
							</div>
						</div>
					</PrismicLink>
				</SwiperSlide>
			</Swiper> -->

			<div class="flex gap-[10px] md:gap-[70px]">
				<div v-for="(item, index) in slice.primary.downloads" class="w-fit">
					<PrismicLink :field="item.file" class="group">
						<figure data-image class="relative mb-[17px]">
							<figcaption class="absolute z-10 w-full h-full px-20 py-30 text-white flex flex-col justify-between">
								<p class="text-md md:text-base">
									{{ item.image_subtitle }}
								</p>
								<h3 class="text-download uppercase text-md md:text-base">
									{{ item.image_title }}
								</h3>
							</figcaption>
							<PrismicImage class="z-0 w-full md:w-auto" :field="item.image" />
						</figure>
						<div class="flex items-center justify-between mt-20">
							<h4 class="text-primary uppercase tracking-[0.08em] text-[18px] leading-none md:text-xsm">
								Download
							</h4>
							<div class="md:w-[35px] md:h-[35px] flex flex-col border border-[var(--primary-color)] rounded-full items-center justify-center relative before:absolute before:w-full before:h-full before:bg-primary before:inset-0 before:rounded-full before:scale-0 before:transition-transform group-hover:before:scale-90 before:duration-300 active:before:scale-100">
								<div class="inline-flex relative overflow-hidden">
									<div class="w-full h-full relative delay-150 group-hover:delay-0 transition-transform duration-200 expo-out group-hover:translate-y-full">
										<svg class="scale-[0.7] md:scale-[1] w-[15px] h-[15px] md:w-15 md:h-15" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M15 9.22754L8.37892 15.9028L1.75784 9.22754" stroke="var(--primary-color)" stroke-width="2" stroke-miterlimit="13.33" stroke-linecap="square"/>
											<path d="M8.38281 14.9028L8.38281 1" stroke="var(--primary-color)" stroke-width="2" stroke-linecap="square" stroke-linejoin="round"/>
										</svg>                      
									</div>
									<div class="w-full h-full absolute -top-full delay-0 group-hover:delay-150 transition-transform duration-200 expo-out group-hover:translate-y-full">
										<svg class="md:w-[15px] md:h-[15px] md:w-15 md:h-15" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M15 9.22754L8.37892 15.9028L1.75784 9.22754" stroke="var(--white)" stroke-width="2" stroke-miterlimit="13.33" stroke-linecap="square"/>
											<path d="M8.38281 14.9028L8.38281 1" stroke="var(--white)" stroke-width="2" stroke-linecap="square" stroke-linejoin="round"/>
										</svg>                      
									</div>
								</div>
							</div>
						</div>
					</PrismicLink>
				</div>
			</div>
		</div>
		
	</section>
  
	<!-- <section class="w-full bg-secondary relative py-100" :ref="setRef">
    <div class="grid-layout items-center relative">
      <div class="col-start-2 col-span-10 mb-75">
        <h2 data-title class="text-[52px] leading-none md:text-xl text-primary uppercase">
          {{ slice.primary.title }}
        </h2>
      </div>
      <div class="col-start-2 col-span-10 md:col-start-2 md:col-span-3 pb-40 md:pb-0">
        <PrismicRichText data-text class="text-primary text-[20px] leading-none md:text-base" :field="slice.primary.paragraph" />
      </div>
      <div class="col-start-2 col-span-10 md:col-start-6 md:col-span-6">
        <div class="flex flex-col md:flex-row gap-[20px]">
          <div v-for="(item, index) in slice.primary.downloads" :class="{ 'md:ml-80': index != 0, }">
            <PrismicLink :field="item.file" class="group">
              <figure data-image class="relative">
                <figcaption class="absolute z-10 w-full h-full px-20 py-30 text-white flex flex-col justify-between">
                  <p class="text-md md:text-base">
                    {{ item.image_subtitle }}
                  </p>
                  <h3 class="text-download uppercase text-md md:text-base">
                    {{ item.image_title }}
                  </h3>
                </figcaption>
                <PrismicImage class="z-0 w-full md:w-auto" :field="item.image" />
              </figure>
              <div class="flex items-center justify-between mt-20">
                <h4 class="text-primary uppercase tracking-[0.08em] text-[18px] leading-none md:text-xsm">
                  Download
                </h4>
                <div class="w-[35px] h-[35px] flex flex-col border border-[var(--primary-color)] rounded-full items-center justify-center relative before:absolute before:w-full before:h-full before:bg-primary before:inset-0 before:rounded-full before:scale-0 before:transition-transform group-hover:before:scale-90 before:duration-300 active:before:scale-100">
                  <div class="inline-flex relative overflow-hidden">
                    <div class="w-full h-full relative delay-150 group-hover:delay-0 transition-transform duration-200 expo-out group-hover:translate-y-full">
                      <svg class="w-[15px] h-[15px] md:w-15 md:h-15" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 9.22754L8.37892 15.9028L1.75784 9.22754" stroke="var(--primary-color)" stroke-width="2" stroke-miterlimit="13.33" stroke-linecap="square"/>
                        <path d="M8.38281 14.9028L8.38281 1" stroke="var(--primary-color)" stroke-width="2" stroke-linecap="square" stroke-linejoin="round"/>
                      </svg>                      
                    </div>
                    <div class="w-full h-full absolute -top-full delay-0 group-hover:delay-150 transition-transform duration-200 expo-out group-hover:translate-y-full">
                      <svg class="w-[15px] h-[15px] md:w-15 md:h-15" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 9.22754L8.37892 15.9028L1.75784 9.22754" stroke="var(--white)" stroke-width="2" stroke-miterlimit="13.33" stroke-linecap="square"/>
                        <path d="M8.38281 14.9028L8.38281 1" stroke="var(--white)" stroke-width="2" stroke-linecap="square" stroke-linejoin="round"/>
                      </svg>                      
                    </div>
                  </div>
                </div>
              </div>
            </PrismicLink>
          </div>
        </div>
      </div>
    </div>
  </section> -->
</template>

<style>
@import 'swiper/swiper-bundle.css';
</style>
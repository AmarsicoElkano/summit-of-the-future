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
					const texts = gsap.utils.toArray("[data-text0]", el);
					if (titles) {
						titles.forEach((title) => {
							const duration = parseInt(title.dataset.duration) || 1.25;
							const split = new SplitText(title, {
								type: "lines, words, chars",
								linesClass: "overflow-hidden",
							});

							gsap.fromTo(split.chars, duration, 
								{
									y: 150
								},
								{
									y: 0,
									ease: "expo.out",
									stagger: 0.075,
									scrollTrigger: {
										trigger: el,
										scrub: false,
										start: "top 90%",
										end: "bottom 80%",
										markers: false
									},
								}
							)
						})
					}
					if (texts) {
						texts.forEach((text) => {
							const duration = parseInt(text.dataset.duration) || 1.25;
							const split = new SplitText(text, {
								type: "lines, words, chars",
								linesClass: "overflow-hidden",
							});

							gsap.fromTo(split.chars, duration, 
								{
									y: 10,
									opacity: 0
								},
								{
									y: 0,
									opacity: 1,
									ease: "expo.out",
									stagger: 0.005,
									scrollTrigger: {
										trigger: text,
										scrub: false,
										start: "top 90%",
										end: "bottom 80%",
										markers: false
									},
								}
							)
						})
					}
				})
			}
		},
	};
</script>

<template>
	<section class="w-full bg-white relative py-[100px]" :ref="setRef">
		<figure class="absolute w-full h-full inset-0 z-0">
			<img src="/img/curve.svg" class="w-full md:w-5/12 h-auto absolute right-0 md:right-1/2" alt="" />
		</figure>
		<div class="grid-layout items-center relative">
			<div class="col-start-2 col-span-10 md:col-start-3 md:col-span-10 flex flex-col">
				<h2 data-title class="text-headline_mb md:text-headline text-primary uppercase">
					{{ slice.primary.title_line_one }}
				</h2>
				<h2 data-title class="text-headline_mb md:text-headline text-primary uppercase pl-100">
					{{ slice.primary.title_line_two }}
				</h2>
				<h2 data-title class="text-headline_mb md:text-headline text-primary uppercase pl-40">
					{{ slice.primary.title_line_three }}
				</h2>
			</div>
			<div class="col-start-2 col-span-10 md:col-start-7 md:col-span-5 flex flex-col text-primary mt-60">
				<PrismicRichText data-text class="text-base" :field="slice.primary.text" />
			</div>
		</div>
	</section>
</template>

<script setup>
	import "@prismicio/client";
	defineProps(getSliceComponentProps(["slice"]));
</script>

<script>
	import gsap from "gsap";

	export default {
		data() {
			return {
				items: [],
			};
		},
		mounted() {
			this.items = this.$refs.items;

			this.$nextTick(() => {
				this.onResize();
			});
			window.addEventListener("resize", this.onResize);

			this.scroll()
		},
		methods: {
			scroll() {
				gsap.from(this.items, 1,
					{
						ease: "expo.out",
						yPercent: 150,
						opacity: 0,
						stagger: 0.075,
						scrollTrigger: {
							trigger: this.items,
							scrub: false,
							start: "top 60%",
							markers: false
						},
					}
				)
			},
			onResize() {
				this.resizeAllGridItems();
			},
			resizeGridItem(item) {
				const grid = this.$refs.masonry;
				let rowHeight = parseInt(
					window.getComputedStyle(grid).getPropertyValue("grid-auto-rows")
				);
				let rowGap = parseInt(
					window.getComputedStyle(grid).getPropertyValue("grid-row-gap")
				);
				let rowSpan = Math.ceil(
					(item.querySelector(".content").getBoundingClientRect().height +
						rowGap) /
						(rowHeight + rowGap)
				);

				item.style.gridRowEnd = "span " + rowSpan;
			},
			resizeAllGridItems() {
				this.$refs.items.forEach((item, index) => {
					this.resizeGridItem(item);
				});
			},
		},
	};
</script>

<template>
	<section class="w-full bg-secondary relative py-100 overflow-hidden md:overflow-visible">
		<div class="grid-layout items-center relative">
			<div class="col-start-2 col-span-10 md:col-start-2 md:col-span-8">
				<p class="text-primary text-[28px] leading-none md:text-md md:w-[900px]">
					{{ slice.primary.paragraph }}
				</p>
			</div>
		</div>
		<div class="grid-layout mt-100 relative">
			<figure class="absolute inset-0 w-full h-full z-0 translate-y-[20%] md:translate-y-[inherit] scale-[2.7] sm:scale-[1.4] md:scale-100 rotate-[-45deg] md:rotate-0">
				<img src="/img/triangle.svg" class="absolute m-auto inset-0 w-full md:w-2/3" />
			</figure>
			<div class="col-start-2 col-span-10">
				<div class="md:masonry grid gap-[20px] relative" ref="masonry">
					<div
						class="bg-white p-[24px] md:p-0"
						v-for="(item, index) in slice.primary.priorities"
						:key="index"
						ref="items"
					>
						<div class="content text-primary text-download uppercase">
							<div class="md:p-20">
								<span class="block mb-80 text-[16px] md:text-md md:text-base">
									0{{ index + 1 }}
								</span>
								<h3 class="text-[18px] leading-none md:text-md md:text-base">
									{{ item.title }}
								</h3>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

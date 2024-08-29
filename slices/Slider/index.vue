<script setup>
	import "@prismicio/client";
	defineProps(getSliceComponentProps(["slice", "slides"]));
</script>

<script>
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
				items: [],
				modules: [Navigation],
			};
		},
		mounted() {
			this.items = this.$refs.items;
			this.init();



		},
		methods: {
			init() {
				let maxHeight = 0;
				this.items.forEach(item => {
				const height = item.offsetHeight;
					// Update maxHeight if the current <li> height is greater
						if (height > maxHeight) {
							maxHeight = height;
					}
				})

				this.items.forEach(item => {
					item.style.height = maxHeight + 'px'
				})
			},
		},
	};
</script>

<template>

	<section class="py-[50px] md:py-[150px] px-[60x] sm:px-[20px] mds:px-[160px]">
		<Swiper
			:slidesPerView="1"
			:breakpoints="{
				'768': {
					slidesPerView: 1,
					spaceBetween: 10
				},
				'1024': {
					slidesPerView: 3,
					spaceBetween: 24
				},
    	}"
			:spaceBetween="10"
			:navigation="{
				prevEl: '.custom-prev',
				nextEl: '.custom-next'
			}"
			:modules="modules"
			:style="{ paddingLeft: '16px !important', paddingRight: '16px !important' }"
		>
			<SwiperSlide v-for="(item, index) in slice.primary.slides" class="text-primary bg-[var(--secondary-color)]">
				<div ref="items" class="p-[32px] flex flex-col justify-between min-h-[382px]">
					<p class="text-medium_mb md:text-medium uppercase font-bold mb-[40px]">{{item.title}}</p>
					<p class="">{{item.paragraph}}</p>
				</div>
			</SwiperSlide>

			<!-- Custom Navigation Buttons -->
			 <div class="flex gap-[20px] mt-[26px] justify-end">
				 <div class="custom-prev cursor-pointer">
					 <svg width="53" height="53" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
						 <path d="M29 19.6858L21.4286 27.2572L29 34.8286" stroke="#004987" stroke-width="2" stroke-miterlimit="13.33" stroke-linecap="square"/>
						 <circle opacity="0.5" cx="26.5" cy="26.5" r="26" transform="matrix(-1 0 0 1 53 0)" stroke="#004987"/>
					 </svg>					
				 </div>
				 <div class="custom-next cursor-pointer">
					 <svg width="53" height="53" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
						 <path d="M24 19.6858L31.5714 27.2572L24 34.8286" stroke="#004987" stroke-width="2" stroke-miterlimit="13.33" stroke-linecap="square"/>
						 <circle opacity="0.5" cx="26.5" cy="26.5" r="26" stroke="#004987"/>
					 </svg>					
				 </div>
			 </div>
		</Swiper> 
	</section>
</template>

<style>
@import 'swiper/swiper-bundle.css';
</style>
<script>
	import gsap from "gsap";

	export default {
		data() {
			return {
				isLoading: true,
			};
		},
		mounted() {
			document.readyState === "complete"
				? this.load()
				: window.addEventListener("load", this.load);
			gsap.to(this.$refs.loader, 3, {
				rotation: "360",
				ease: "none",
				repeat: -1,
			});
		},
		methods: {
			load() {
				gsap.to(this.$refs.bg, {
					opacity: 0,
					duration: 0.5,
					ease: "expo",
					onComplete: () => {
						this.isLoading = false;
						this.$refs.bg.remove();
					},
				});
			},
		},
	};
</script>

<template>
	<div
		class="bg-primary w-screen h-full fixed inset-0 z-50 flex items-center justify-center"
		:class="{ 'cursor-progress': isLoading }"
		ref="bg"
	>
		<figure ref="loader" class="w-[50px] h-[50px]">
			<img src="/img/circle-gradient.svg" />
		</figure>
	</div>
</template>

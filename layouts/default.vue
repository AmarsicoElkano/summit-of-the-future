<script>
	import { gsap } from "gsap";
	import ScrollTrigger from "gsap/ScrollTrigger";

	export default {
		mounted() {
			gsap.registerPlugin(ScrollTrigger);
			this.scroll();
		},
		unmounted() {
			this.removeEvents();
		},
		methods: {
			scroll() {
				// this.$nextTick(() => {
				const sections = this.$el.querySelectorAll("section");

				sections.forEach((el) => {
					const logoColor = el.dataset.logo || "black";
					const burgerColor = el.dataset.burger || "#004987";

					ScrollTrigger.create({
						trigger: el,
						start: "top 0%",
						end: "bottom 0%",
						markers: false,
						onEnter: () => {
							if (el.classList.contains("bg-primary")) {
								document.documentElement.style.setProperty(
									"--logo-color",
									logoColor
								);
								document.documentElement.style.setProperty(
									"--burger-color",
									burgerColor
								);
							}
						},
						onLeave: () => {
							if (el.classList.contains("bg-primary")) {
								document.documentElement.style.setProperty(
									"--logo-color",
									"black"
								);
								document.documentElement.style.setProperty(
									"--burger-color",
									"#004987"
								);
							}
						},
						onEnterBack: () => {
							if (el.classList.contains("bg-primary")) {
								document.documentElement.style.setProperty(
									"--logo-color",
									logoColor
								);
								document.documentElement.style.setProperty(
									"--burger-color",
									burgerColor
								);
							}
						},
						onLeaveBack: () => {
							if (el.classList.contains("bg-primary")) {
								document.documentElement.style.setProperty(
									"--logo-color",
									"black"
								);
								document.documentElement.style.setProperty(
									"--burger-color",
									"#004987"
								);
							}
						},
					});
				});
				// });
			},

			removeEvents() {},
		},
	};
</script>

<template>
	<div>
		<Header />
		<main>
			<slot />
		</main>
		<Footer />
	</div>
</template>

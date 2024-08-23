<script setup>
	const { client } = usePrismic();

	const { data: navigation } = await useAsyncData("navigation", () =>
		client.getSingle("navigation")
	);
	const { data: chapter } = await useAsyncData("chapter", () =>
		client.getAllByType("chapter")
	);

	const result = await client.getSingle("navigation")
	
	Object.entries(result.data.links).forEach(e=>{
		const rute = e[1].link.url ? e[1].link.url : '/'
	})
	
</script>

<script>
	import gsap from "gsap";

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
					"--logo-color": "#ffffff",
				});

				gsap.to(this.root, 1, {
					"--burger-color": "#ffffff",
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
					"--logo-color": "#231F20",
					delay: 0.5,
				});

				gsap.to(this.root, 1, {
					"--burger-color": "#004987",
				});
			},
			slugToString(s) {
				return s?.replaceAll("-", " ");
			},
		},
	};
</script>
<template>
	<div
		class="w-full h-screen fixed inset-0 z-10 bg-primary flex items-center justify-center nav"
		ref="nav"
	>
		<nav>
			<ul class="flex flex-col items-start">
				<li
					@click="toggle"
					v-for="(item, index) in navigation.data.links"
					:key="index"
					class="flex text-white font-display uppercase text-lg md:text-md overflow-hidden relative py-25 md:py-15"
				>
					<div ref="navItems">
						<NuxtLink
							:to="'/chapter/' + item.link.uid + '/'"
							class="flex items-center"
						>
							{{ slugToString(item.link.uid) }}
						</NuxtLink>
					</div>
				</li>
			</ul>
		</nav>
	</div>
	<button
		class="w-[50px] h-[50px] flex flex-col border border-[var(--burger-color)] rounded-full items-center justify-center z-20 toggle-nav"
		@click="toggle"
		:class="{ active: isActive }"
		ref="toggleNav"
	>
		<div
			class="w-[20px] h-[2px] bg-[var(--burger-color)] mx-auto origin-left transition-transform duration-700 ease-expo-out"
		></div>
		<div
			class="w-[20px] h-[2px] bg-[var(--burger-color)] my-[4px] mx-auto origin-left transition-transform duration-700 ease-expo-out"
		></div>
		<div
			class="w-[20px] h-[2px] bg-[var(--burger-color)] scale-x-50 origin-left transition-transform duration-700 ease-expo-out"
		></div>
	</button>
</template>

<style scoped>
	.nav {
		clip-path: inset(0% 0% 100% 0%);
	}
</style>

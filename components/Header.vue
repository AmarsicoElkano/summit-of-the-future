<script>
	import gsap from "gsap";

	export default {
		mounted() {},
	};
</script>

<template>
	<header class="w-full h-[100px] fixed inset-0 z-40">
		<div class="grid-layout py-25">
			<div class="col-start-2 col-span-10 flex items-center justify-between">
				<Logo />
				<Navigation />
			</div>
		</div>
		<div class="bg-secondary absolute top-0 lef-0 w-full h-full opacity-90"></div>
	</header>
</template>

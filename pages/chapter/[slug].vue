<script setup>
	import { components } from "~/slices";
	const { client } = usePrismic();
	const route = useRoute();

	
	let slug = route.params.slug
	const { data: chapter } = await useAsyncData(slug, () => client.getByUID('chapter', slug))
	console.log(chapter.value)
</script>

<script>
	export default {
		data() {
			return {};
		},
		mounted() {},
		methods: {},
	};
</script>

<template>
	<div>
		<Html>
			<Head>
				<Title>{{ chapter?.data?.meta_title }}</Title>
				<Meta name="description" :content="chapter?.data?.meta_description" />
				<Meta property="og:title" :content="chapter?.data?.meta_title" />
				<Meta
					property="og:description"
					:content="chapter?.data?.meta_description"
				/>
				<Meta
					property="og:image"
					:content="`${chapter?.data?.meta_image.url}&w=1920`"
				/>
				<Meta property="og:type" content="website" />
				<Meta property="twitter:card" content="summary_large_image" />
				<Meta property="twitter:title" :content="chapter?.data?.meta_title" />
				<Meta
					property="twitter:description"
					:content="chapter?.data?.meta_description"
				/>
				<Meta
					property="twitter:image"
					:content="`${chapter?.data?.meta_image.url}&w=1920`"
				/>
			</Head>
		</Html>
		<article class="relative">
			<slice-zone :components="components" :slices="chapter?.data?.slices" />
		</article>
	</div>
</template>

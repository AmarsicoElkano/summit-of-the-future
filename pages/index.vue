<script setup>
	const { client } = usePrismic();

	const { data: navigation } = await useAsyncData("navigation", () =>
		client.getSingle("navigation")
	);
	const { data: doc } = await useAsyncData("doc", () =>
		client.getSingle("home")
	);
</script>

<script>
	import gsap from "gsap";
	import ScrollTrigger from "gsap/ScrollTrigger";
	import SplitText from "gsap/SplitText";
	import DrawSVGPlugin from "gsap/DrawSVGPlugin";

	export default {
		data() {
			return {
				sections: [],
				chaptersItems: [],
				chaptersNavItems: [],
				chaptersNext: 0,
				chaptersCurrent: 0,
				chaptersTotal: 0,
				imgsPosition:[]
			};
		},
		mounted() {
			gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin);

			this.chaptersNavItems = this.$refs.chaptersnavitems;
			this.chaptersItems = this.$refs.chaptersitems;
			this.chaptersTotal = this.chaptersItems.length;

			this.imgsPosition = [
				{
					top: "20%",
					left: "5%",
					scale: 1.5,
				},
				{
					top: "15%",
					left: "25%",
					scale: 1.2,
				},
				{
					top: "45%",
					left: "20%",
					scale: 1.6,
				},
				{
					top: "40%",
					left: "50%",
					scale: 2.0,
				},
				{
					top: "20%",
					left: "60%",
					scale: 1.0,
				},
				{
					top: "10%",
					left: "77%",
					scale: 1.5,
				},
			]

			this.$nextTick(() => {
				//  this.onResize();
			});
			this.init();
			this.scroll();
		},
		unmounted() {
			this.removeEvents();
		},
		methods: {
			init() {
				this.addEvents();
				this.gallery();
				this.explore();
			},
			setRef(el) {
				if (el) this.sections.push(el);
			},
			addEvents() {
				this.chaptersNavItems.forEach((el) => {
					el.addEventListener("click", () => this.slideToChapter(el));
				});
			},
			removeEvents() {},
			slideToChapter(el) {
				const index = this.chaptersNavItems.indexOf(el);
				this.chaptersNext = index;

				this.changeChapter(this.chaptersNext, this.chaptersCurrent);
			},
			changeChapter(next, current) {
				const nextChapter = this.chaptersItems[next];
				const nextChapterBtn = this.chaptersNavItems[next];
				const currentChapter = this.chaptersItems[current];
				const currentChapterBtn = this.chaptersNavItems[current];

				this.chaptersCurrent = this.chaptersNext;

				gsap.killTweensOf([
					currentChapter,
					nextChapter,
					nextChapterBtn,
					currentChapterBtn,
				]);

				this.showChapter(nextChapter, nextChapterBtn);
				this.hideChapter(currentChapter, currentChapterBtn);
			},
			showChapter(chapter, btn) {
				btn.classList.add("bg-primary", "text-white", "pointer-events-none");

				const title = chapter.querySelector("h2");
				const symbol = chapter.querySelector("figure");

				gsap.set(chapter, { zIndex: 2, opacity: 1 });
				const split = new SplitText(title, {
					type: "lines, words",
					linesClass: "overflow-hidden",
				});

				gsap.from(split.words, 0.75, {
					ease: "expo.out",
					yPercent: 150,
					stagger: 0.075,
					onComplete: () => {
						split.revert();
					},
				});

				gsap.from(symbol, 1, {
					opacity: 0,
					xPercent: 10,
					ease: "expo.out",
				});
			},
			hideChapter(chapter, btn) {
				btn.classList.remove("bg-primary", "text-white", "pointer-events-none");

				gsap
					.timeline()
					.set(chapter, { zIndex: 2, opacity: 0 })
					.to(chapter, {
						// opacity: 0,
						// duration: 0,
						// ease: 'expo.out',
						onComplete: () => {
							gsap.set(chapter, { zIndex: 1 });
						},
					});
			},
			galleryTopItemPosition(index) {
				const r = this.imgsPosition[index] ? this.imgsPosition[index].top : "50%"
				return r;
			},
			galleryLeftItemPosition(index) {
				const r = this.imgsPosition[index] ? this.imgsPosition[index].left : "50%"
				return r;
			},
			galleryScaleItem(index) {
				const s = this.imgsPosition[index] ? this.imgsPosition[index].scale : 1.0
				return s
			},
			gallery() {
				gsap.to(this.$refs.circleGradient, 20, {
					rotation: "360",
					ease: "none",
					repeat: -1,
				});

				gsap.to(this.$refs.circleDashed, 80, {
					rotation: "-360",
					ease: "none",
					repeat: -1,
				});

				const images = this.$refs.images;
				const duration = 0.5;
				const stagger = 0.25;
				const repeatDelay = 0.075 * (images.length - 1);

				images.forEach((img, index) => {
					gsap.fromTo(img, duration, {
						transform: "translateZ(-2000px)",
						scale: 0
					}, {
						scale: this.imgsPosition[index].scale,
						transform: "translateZ(0px)",
						ease: "none",
						stagger: 0.25,
						delay: Math.random() * this.imgsPosition.length * 0.05,
						scrollTrigger: {
							trigger: images,
							scrub: false,
							markers: false,
							start: "top 90%",
							end: "bottom 50%",
						},
					})
				})
			},
			explore() {
				const explore = this.$refs.explore;
				gsap.fromTo(explore, {
					opacity: 0,
					y: -50
				}, {
					opacity: 1,
					y: 0,
					delay: 1,
					ease: "power1"
				})
			},
			scroll() {
				this.sections.forEach((el) => {
					const titles = gsap.utils.toArray("[data-title]", el);
					const texts = gsap.utils.toArray("p", el);
					const parallaxs = gsap.utils.toArray("[data-parallax]", el);
					const reveals = gsap.utils.toArray("[data-reveal]", el);
					const images = gsap.utils.toArray("[data-img]", el);
					const chapters = gsap.utils.toArray("[data-chapter]", el);
					const nums = gsap.utils.toArray("[data-num]", el);
					const bgGraphic = document.querySelector(".bgGraphic");

					/*
	           animate hero arrow
	         */

					gsap.set(this.$refs.heroArrow, {
						xPercent: -20,
					});
					gsap.to(this.$refs.heroArrow, 2.5, {
						xPercent: 0,
						ease: "expo.out",
					});

					/*
	           animate section one graphic
	         */

					gsap.set(bgGraphic, {
						xPercent: 10,
					});
					gsap.to(bgGraphic, 2.5, {
						xPercent: 0,
						ease: "expo.out",
						scrollTrigger: {
							trigger: bgGraphic,
							start: "top 30%",
						},
					});

					/*
	           animate section headings
	         */

					if (titles) {
						titles.forEach((title, index) => {
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
									start: "top 30%",
									markers: false,
								},
								onComplete: () => {
									split.revert();
								},
							});
						});
					}

					/*
	           animate section paragraphs
	         */

					if (texts) {
						texts.forEach((text) => {
							const duration = parseInt(text.dataset.duration) || 2;
							gsap.from(text, duration, {
								ease: "power2.out",
								opacity: 0,
								scrollTrigger: {
									trigger: el,
									start: "top 60%",
								},
							});
						});
					}

					/*
	           animate section svgs (parallax)
	         */

					if (parallaxs) {
						parallaxs.forEach((parallax) => {
							const offset = parseInt(parallax.dataset.offset) || 10;
							const direction = parallax.dataset.direction || "y";

							if (direction === "y") {
								gsap.to(parallax, {
									yPercent: offset,
									ease: "none",
									scrollTrigger: {
										trigger: parallax,
										scrub: true,
										start: "top 50%",
									},
								});
							} else {
								gsap.to(parallax, {
									xPercent: offset,
									ease: "none",
									scrollTrigger: {
										trigger: parallax,
										scrub: true,
										start: "top 50%",
									},
								});
							}
						});
					}

					/*
	           animate text line by line
	         */

					if (reveals) {
						reveals.forEach((reveal) => {
							const split = new SplitText(reveal, {
								type: "lines, words",
							});

							gsap.from(split.words, {
								opacity: 0.2,
								stagger: 0.1,
								scrollTrigger: {
									trigger: el,
									scrub: true,
									start: "top 90%",
									end: "bottom 90%",
									markers: false
								},
							});
						});
					}

					/*
	           animate up images
	         */

					if (images) {
						images.forEach((img) => {
							const duration = parseInt(img.dataset.duration) || 1.55;
							gsap.from(img, duration, {
								ease: "expo.out",
								yPercent: 40,
								scrollTrigger: {
									trigger: el,
									start: "top 70%",
									scrub: true,
									markers: false
								},
							});
						});
					}

					/*
						animate chapters
					*/
					if (chapters) {
						gsap.fromTo(chapters, 1, {
							y: 100,
						}, {
							y: 0,
							ease: "expo.out",
							stagger: 0.1,
							scrollTrigger: {
								trigger: el,
								start: "top 70%",
								scrub: false,
								markers: false
							},
						});
					}

					/*
	           animate statistics
	         */

					if (nums) {
						const arrow = el.querySelector("[data-arrow]");
						gsap.set(arrow, {
							xPercent: -20,
						});
						gsap.to(arrow, 2.5, {
							xPercent: 0,
							ease: "expo.out",
							scrollTrigger: {
								trigger: el,
								start: "top 70%",
							},
						});

						nums.forEach((num, index) => {
							const duration = parseInt(num.dataset.duration) || 1;

							const split = new SplitText(num, {
								type: "lines, chars",
								linesClass: "overflow-hidden",
							});

							console.log(split.char)

							gsap.from(split.chars, duration, {
								ease: "expo.out",
								opacity: 0,
								y: 100,
								stagger: 0.1,
								scrollTrigger: {
									trigger: el,
									start: "top 70%",
									end: "bottom 70%",
								},
							});
						});
					}
				});
			},
			slugToString(s) {
				return s?.replaceAll("-", " ");
			},
			scrollToSection() {
				const section = this.$refs.nextSection;
				if (section) {
					var headerOffset = document.getElementsByTagName('header')[0].offsetHeight;
					var elementPosition = section.getBoundingClientRect().top;
					var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
				
					window.scrollTo({
							top: offsetPosition,
							behavior: "smooth"
					});
				}

			}
		},
	};
</script>

<template>
	<div>
		<Html>
			<Head>
				<Title>{{ doc?.data?.meta_title }}</Title>
				<Meta name="description" :content="doc?.data?.meta_description" />
				<Meta property="og:title" :content="doc?.data?.meta_title" />
				<Meta
					property="og:description"
					:content="doc?.data?.meta_description"
				/>
				<Meta
					property="og:image"
					:content="`${doc?.data?.meta_image.url}&w=1920`"
				/>
				<Meta property="og:type" content="website" />
				<Meta property="twitter:card" content="summary_large_image" />
				<Meta property="twitter:title" :content="doc?.data?.meta_title" />
				<Meta
					property="twitter:description"
					:content="doc?.data?.meta_description"
				/>
				<Meta
					property="twitter:image"
					:content="`${doc?.data?.meta_image.url}&w=1920`"
				/>
			</Head>
		</Html>
		<article class="relative">
			<!-- hero -->
			<section :ref="setRef" class="relative pt-[100px] md:pt-[174px] pb-[60px] pl-[16px] md:pl-[60px] min-h-dvh bg-gradient-to-b from-[var(--secondary-color)] to-[var(--third-color)]">
				<div class="text-primary relative z-10">
					<p class="text-base_mb md:text-base mb-[15px]">
						{{ doc.data.header_subtitle }}
					</p>
					<div class="mb-[50px]">
						<h1 class="text-xxl_mb md:text-xxl uppercase ml-[25px]" data-title>
							{{ doc.data.header_title_line_one }}
						</h1>
						<h1 class="text-xxl_mb md:text-xxl uppercase" data-title>
							{{ doc.data.header_title_line_two }}
						</h1>
						<h1 class="text-xxl_mb md:text-xxl uppercase ml-[82px] md:ml-[120px]" data-title>
							{{ doc.data.header_title_line_three }}
						</h1>
					</div>
				</div>

				<figure ref="heroArrow" class="md:absolute top-1/2 right-0 md:transform md:-translate-y-1/2">
					<svg
					class="w-full h-[auto]"
					width="1067"
					height="800"
					viewBox="0 0 1067 800"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M989.311 500.278H699.485C520.907 500.278 376.098 645.169 376.098 824"
							stroke="url(#paint0_radial_755_81)"
							stroke-width="80"
							stroke-miterlimit="10"
						/>
						<path
							d="M40 833C40 563.923 253.624 173 693.078 173C1132.53 173 850.142 173 969.5 173"
							stroke="url(#paint1_linear_755_81)"
							stroke-width="80"
							stroke-miterlimit="10"
						/>
						<g filter="url(#filter0_d_755_81)">
							<path
								d="M206 -160C206 42.6231 366.642 337 697.104 337C1027.57 337 874.245 337 964 337"
								stroke="url(#paint2_radial_755_81)"
								stroke-width="80"
								stroke-miterlimit="10"
								shape-rendering="crispEdges"
							/>
						</g>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M330 -160C330 -82.7297 360.262 9.5005 420.815 82.8714C482.255 157.317 575.577 213 699.745 213H701.042H702.334H703.621H704.902H706.177H707.447H708.712H709.972H711.226H712.474H713.718H714.956H716.189H717.416H718.638H719.855H721.067H722.273H723.474H724.67H725.861H727.047H728.227H729.403H730.573H731.738H732.898H734.053H735.203H736.347H737.487H738.621H739.751H740.876H741.995H743.11H744.22H745.324H746.424H747.519H748.609H749.694H750.774H751.849H752.92H753.985H755.046H756.102H757.153H758.199H759.241H760.278H761.31H762.337H763.36H764.378H765.391H766.4H767.404H768.403H769.398H770.388H771.373H772.354H773.331H774.302H775.27H776.232H777.191H778.144H779.093H780.038H780.978H781.914H782.846H783.773H784.695H785.614H786.527H787.437H788.342H789.243H790.139H791.032H791.919H792.803H793.682H794.558H795.428H796.295H797.158H798.016H798.87H799.72H800.566H801.408H802.245H803.079H803.908H804.733H805.555H806.372H807.185H807.994H808.799H809.6H810.398H811.191H811.98H812.766H813.547H814.324H815.098H815.868H816.634H817.396H818.154H818.908H819.659H820.406H821.149H821.888H822.624H823.355H824.084H824.808H825.529H826.246H826.959H827.669H828.375H829.077H829.776H830.471H831.163H831.851H832.535H833.216H833.894H834.568H835.238H835.905H836.569H837.229H837.886H838.539H839.189H839.835H840.478H841.118H841.754H842.387H843.017H843.643H844.266H844.886H845.502H846.116H846.726H847.333H847.936H848.536H849.134H849.728H850.319H850.906H851.491H852.073H852.651H853.226H853.799H854.368H854.934H855.497H856.057H856.614H857.169H857.72H858.268H858.813H859.356H859.895H860.432H860.965H861.496H862.024H862.549H863.072H863.591H864.108H864.622H865.133H865.641H866.147H866.65H867.15H867.647H868.142H868.634H869.124H869.61H870.095H870.576H871.055H871.531H872.005H872.477H872.945H873.411H873.875H874.336H874.795H875.251H875.705H876.156H876.605H877.052H877.496H877.937H878.377H878.814H879.248H879.68H880.11H880.538H880.963H881.386H881.807H882.226H882.642H883.056H883.468H883.878H884.285H884.691H885.094H885.495H885.894H886.291H886.686H887.078H887.469H887.858H888.244H888.629H889.011H889.392H889.771H890.147H890.522H890.895H891.265H891.634H892.001H892.366H892.73H893.091H893.451H893.809H894.164H894.519H894.871H895.222H895.57H895.918H896.263H896.607H896.949H897.289H897.628H897.965H898.3H898.634H898.966H899.297H899.626H899.953H900.279H900.603H900.926H901.247H901.567H901.885H902.202H902.518H902.832H903.144H903.455H903.765H904.073H904.38H904.686H904.99H905.293H905.595H905.895H906.194H906.492H906.788H907.084H907.378H907.671H907.962H908.253H908.542H908.83H909.117H909.403H909.688H909.971H910.254H910.536H910.816H911.095H911.374H911.651H911.928H912.203H912.477H912.751H913.023H913.295H913.566H913.835H914.104H914.372H914.64H914.906H915.171H915.436H915.7H915.963H916.225H916.487H916.748H917.008H917.267H917.526H917.784H918.041H918.298H918.554H918.809H919.064H919.318H919.571H919.824H920.077H920.329H920.58H920.831H921.081H921.331H921.58H921.829H922.078H922.326H922.573H922.82H923.067H923.314H923.56H923.805H924.051H924.296H924.541H924.785H925.029H925.273H925.517H925.76H926.004H926.247H926.489H926.732H926.975H927.217H927.459H927.701H927.943H928.185H928.427H928.669H928.91H929.152H929.393H929.635H929.877H930.118H930.36H930.602H930.844H931.086H931.327H931.57H931.812H932.054H932.297H932.539H932.782H933.025H933.268H933.512H933.755H933.999H934.243H934.488H934.732H934.977H935.223H935.469H935.715H935.961H936.208H936.455H936.702H936.95H937.199H937.448H937.697H937.947H938.197H938.448H938.699H938.951H939.203H939.456H939.71H939.964H940.219H940.474H940.73H940.986H941.244H941.501H941.76H942.019H942.279H942.54H942.802H943.064H943.327H943.591H943.855H944.121H944.387H944.654H944.922H945.191H945.46H945.731H946.003H946.275H946.548H946.823H947.098H947.374H947.652H947.93H948.209H948.49H948.771H949.053H949.337H949.622H949.907H950.194H950.482H950.772H951.062H951.354H951.646H951.94H952.235H952.532H952.83H953.128H953.429H953.73H954.033H954.337H954.643H954.95H955.258H955.567H955.878H956.191H956.505H956.82H957.136H957.455H957.774H957.891V254.324L1067 173.446L957.891 92.5669V133H957.774H957.455H957.136H956.82H956.505H956.191H955.878H955.567H955.258H954.95H954.643H954.337H954.033H953.73H953.429H953.128H952.83H952.532H952.235H951.94H951.646H951.354H951.062H950.772H950.482H950.194H949.907H949.622H949.337H949.053H948.771H948.49H948.209H947.93H947.652H947.374H947.098H946.823H946.548H946.275H946.003H945.731H945.46H945.191H944.922H944.654H944.387H944.121H943.855H943.591H943.327H943.064H942.802H942.54H942.279H942.019H941.76H941.501H941.244H940.986H940.73H940.474H940.219H939.964H939.71H939.456H939.203H938.951H938.699H938.448H938.197H937.947H937.697H937.448H937.199H936.95H936.702H936.455H936.208H935.961H935.715H935.469H935.223H934.977H934.732H934.488H934.243H933.999H933.755H933.512H933.268H933.025H932.782H932.539H932.297H932.054H931.812H931.57H931.327H931.086H930.844H930.602H930.36H930.118H929.877H929.635H929.393H929.152H928.91H928.669H928.427H928.185H927.943H927.701H927.459H927.217H926.975H926.732H926.489H926.247H926.004H925.76H925.517H925.273H925.029H924.785H924.541H924.296H924.051H923.805H923.56H923.314H923.067H922.82H922.573H922.326H922.078H921.829H921.58H921.331H921.081H920.831H920.58H920.329H920.077H919.824H919.571H919.318H919.064H918.809H918.554H918.298H918.041H917.784H917.526H917.267H917.008H916.748H916.487H916.225H915.963H915.7H915.436H915.171H914.906H914.64H914.372H914.104H913.835H913.566H913.295H913.023H912.751H912.477H912.203H911.928H911.651H911.374H911.095H910.816H910.536H910.254H909.971H909.688H909.403H909.117H908.83H908.542H908.253H907.962H907.671H907.378H907.084H906.788H906.492H906.194H905.895H905.595H905.293H904.99H904.686H904.38H904.073H903.765H903.455H903.144H902.832H902.518H902.202H901.885H901.567H901.247H900.926H900.603H900.279H899.953H899.626H899.297H898.966H898.634H898.3H897.965H897.628H897.289H896.949H896.607H896.263H895.918H895.57H895.222H894.871H894.519H894.164H893.809H893.451H893.091H892.73H892.366H892.001H891.634H891.265H890.895H890.522H890.147H889.771H889.392H889.011H888.629H888.244H887.858H887.469H887.078H886.686H886.291H885.894H885.495H885.094H884.691H884.285H883.878H883.468H883.056H882.642H882.226H881.807H881.386H880.963H880.538H880.11H879.68H879.248H878.814H878.377H877.937H877.496H877.052H876.605H876.156H875.705H875.251H874.795H874.336H873.875H873.411H872.945H872.477H872.005H871.531H871.055H870.576H870.095H869.61H869.124H868.634H868.142H867.647H867.15H866.65H866.147H865.641H865.133H864.622H864.108H863.591H863.072H862.549H862.024H861.496H860.965H860.432H859.895H859.356H858.813H858.268H857.72H857.169H856.614H856.057H855.497H854.934H854.368H853.799H853.226H852.651H852.073H851.491H850.906H850.319H849.728H849.134H848.536H847.936H847.333H846.726H846.116H845.502H844.886H844.266H843.643H843.017H842.387H841.754H841.118H840.478H839.835H839.189H838.539H837.886H837.229H836.569H835.905H835.238H834.568H833.894H833.216H832.535H831.851H831.163H830.471H829.776H829.077H828.375H827.669H826.959H826.246H825.529H824.808H824.084H823.355H822.624H821.888H821.149H820.406H819.659H818.908H818.154H817.396H816.634H815.868H815.098H814.324H813.547H812.766H811.98H811.191H810.398H809.6H808.799H807.994H807.185H806.372H805.555H804.733H803.908H803.079H802.245H801.408H800.566H799.72H798.87H798.016H797.158H796.295H795.428H794.558H793.682H792.803H791.919H791.032H790.139H789.243H788.342H787.437H786.527H785.614H784.695H783.773H782.846H781.914H780.978H780.038H779.093H778.144H777.191H776.232H775.27H774.302H773.331H772.354H771.373H770.388H769.398H768.403H767.404H766.4H765.391H764.378H763.36H762.337H761.31H760.278H759.241H758.199H757.153H756.102H755.046H753.985H752.92H751.849H750.774H749.694H748.609H747.519H746.424H745.324H744.22H743.11H741.995H740.876H739.751H738.621H737.487H736.347H735.203H734.053H732.898H731.738H730.573H729.403H728.227H727.047H725.861H724.67H723.474H722.273H721.067H719.855H718.638H717.416H716.189H714.956H713.718H712.474H711.226H709.972H708.712H707.447H706.177H704.902H703.621H702.334H701.042H699.745C602.028 133 530.478 90.0637 482.516 31.9498C433.668 -27.239 410 -101.509 410 -160H330Z"
							fill="url(#paint3_linear_755_81)"
						/>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M957.891 375.326V415.757L1067 334.879L957.891 254V295.326L691.104 295.326C512.614 295.326 378.947 375.323 290.752 482.413C203.442 588.428 160 721.648 160 832.326H240C240 740.381 276.879 625.1 352.505 533.271C427.246 442.517 539.131 375.326 691.104 375.326L957.891 375.326Z"
							fill="url(#paint4_linear_755_81)"
						/>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M330 167C330 244.27 360.262 336.501 420.815 409.871C482.255 484.317 575.577 540 699.745 540H701.042H702.334H703.621H704.902H706.177H707.447H708.712H709.972H711.226H712.474H713.718H714.956H716.189H717.416H718.638H719.855H721.067H722.273H723.474H724.67H725.861H727.047H728.227H729.403H730.573H731.738H732.898H734.053H735.203H736.347H737.487H738.621H739.751H740.876H741.995H743.11H744.22H745.324H746.424H747.519H748.609H749.694H750.774H751.849H752.92H753.985H755.046H756.102H757.153H758.199H759.241H760.278H761.31H762.337H763.36H764.378H765.391H766.4H767.404H768.403H769.398H770.388H771.373H772.354H773.331H774.302H775.27H776.232H777.191H778.144H779.093H780.038H780.978H781.914H782.846H783.773H784.695H785.614H786.527H787.437H788.342H789.243H790.139H791.032H791.919H792.803H793.682H794.558H795.428H796.295H797.158H798.016H798.87H799.72H800.566H801.408H802.245H803.079H803.908H804.733H805.555H806.372H807.185H807.994H808.799H809.6H810.398H811.191H811.98H812.766H813.547H814.324H815.098H815.868H816.634H817.396H818.154H818.908H819.659H820.406H821.149H821.888H822.624H823.355H824.084H824.808H825.529H826.246H826.959H827.669H828.375H829.077H829.776H830.471H831.163H831.851H832.535H833.216H833.894H834.568H835.238H835.905H836.569H837.229H837.886H838.539H839.189H839.835H840.478H841.118H841.754H842.387H843.017H843.643H844.266H844.886H845.502H846.116H846.726H847.333H847.936H848.536H849.134H849.728H850.319H850.906H851.491H852.073H852.651H853.226H853.799H854.368H854.934H855.497H856.057H856.614H857.169H857.72H858.268H858.813H859.356H859.895H860.432H860.965H861.496H862.024H862.549H863.072H863.591H864.108H864.622H865.133H865.641H866.147H866.65H867.15H867.647H868.142H868.634H869.124H869.61H870.095H870.576H871.055H871.531H872.005H872.477H872.945H873.411H873.875H874.336H874.795H875.251H875.705H876.156H876.605H877.052H877.496H877.937H878.377H878.814H879.248H879.68H880.11H880.538H880.963H881.386H881.807H882.226H882.642H883.056H883.468H883.878H884.285H884.691H885.094H885.495H885.894H886.291H886.686H887.078H887.469H887.858H888.244H888.629H889.011H889.392H889.771H890.147H890.522H890.895H891.265H891.634H892.001H892.366H892.73H893.091H893.451H893.809H894.164H894.519H894.871H895.222H895.57H895.918H896.263H896.607H896.949H897.289H897.628H897.965H898.3H898.634H898.966H899.297H899.626H899.953H900.279H900.603H900.926H901.247H901.567H901.885H902.202H902.518H902.832H903.144H903.455H903.765H904.073H904.38H904.686H904.99H905.293H905.595H905.895H906.194H906.492H906.788H907.084H907.378H907.671H907.962H908.253H908.542H908.83H909.117H909.403H909.688H909.971H910.254H910.536H910.816H911.095H911.374H911.651H911.928H912.203H912.477H912.751H913.023H913.295H913.566H913.835H914.104H914.372H914.64H914.906H915.171H915.436H915.7H915.963H916.225H916.487H916.748H917.008H917.267H917.526H917.784H918.041H918.298H918.554H918.809H919.064H919.318H919.571H919.824H920.077H920.329H920.58H920.831H921.081H921.331H921.58H921.829H922.078H922.326H922.573H922.82H923.067H923.314H923.56H923.805H924.051H924.296H924.541H924.785H925.029H925.273H925.517H925.76H926.004H926.247H926.489H926.732H926.975H927.217H927.459H927.701H927.943H928.185H928.427H928.669H928.91H929.152H929.393H929.635H929.877H930.118H930.36H930.602H930.844H931.086H931.327H931.57H931.812H932.054H932.297H932.539H932.782H933.025H933.268H933.512H933.755H933.999H934.243H934.488H934.732H934.977H935.223H935.469H935.715H935.961H936.208H936.455H936.702H936.95H937.199H937.448H937.697H937.947H938.197H938.448H938.699H938.951H939.203H939.456H939.71H939.964H940.219H940.474H940.73H940.986H941.244H941.501H941.76H942.019H942.279H942.54H942.802H943.064H943.327H943.591H943.855H944.121H944.387H944.654H944.922H945.191H945.46H945.731H946.003H946.275H946.548H946.823H947.098H947.374H947.652H947.93H948.209H948.49H948.771H949.053H949.337H949.622H949.907H950.194H950.482H950.772H951.062H951.354H951.646H951.94H952.235H952.532H952.83H953.128H953.429H953.73H954.033H954.337H954.643H954.95H955.258H955.567H955.878H956.191H956.505H956.82H957.136H957.455H957.774H957.891V581.324L1067 500.446L957.891 419.567V460H957.774H957.455H957.136H956.82H956.505H956.191H955.878H955.567H955.258H954.95H954.643H954.337H954.033H953.73H953.429H953.128H952.83H952.532H952.235H951.94H951.646H951.354H951.062H950.772H950.482H950.194H949.907H949.622H949.337H949.053H948.771H948.49H948.209H947.93H947.652H947.374H947.098H946.823H946.548H946.275H946.003H945.731H945.46H945.191H944.922H944.654H944.387H944.121H943.855H943.591H943.327H943.064H942.802H942.54H942.279H942.019H941.76H941.501H941.244H940.986H940.73H940.474H940.219H939.964H939.71H939.456H939.203H938.951H938.699H938.448H938.197H937.947H937.697H937.448H937.199H936.95H936.702H936.455H936.208H935.961H935.715H935.469H935.223H934.977H934.732H934.488H934.243H933.999H933.755H933.512H933.268H933.025H932.782H932.539H932.297H932.054H931.812H931.57H931.327H931.086H930.844H930.602H930.36H930.118H929.877H929.635H929.393H929.152H928.91H928.669H928.427H928.185H927.943H927.701H927.459H927.217H926.975H926.732H926.489H926.247H926.004H925.76H925.517H925.273H925.029H924.785H924.541H924.296H924.051H923.805H923.56H923.314H923.067H922.82H922.573H922.326H922.078H921.829H921.58H921.331H921.081H920.831H920.58H920.329H920.077H919.824H919.571H919.318H919.064H918.809H918.554H918.298H918.041H917.784H917.526H917.267H917.008H916.748H916.487H916.225H915.963H915.7H915.436H915.171H914.906H914.64H914.372H914.104H913.835H913.566H913.295H913.023H912.751H912.477H912.203H911.928H911.651H911.374H911.095H910.816H910.536H910.254H909.971H909.688H909.403H909.117H908.83H908.542H908.253H907.962H907.671H907.378H907.084H906.788H906.492H906.194H905.895H905.595H905.293H904.99H904.686H904.38H904.073H903.765H903.455H903.144H902.832H902.518H902.202H901.885H901.567H901.247H900.926H900.603H900.279H899.953H899.626H899.297H898.966H898.634H898.3H897.965H897.628H897.289H896.949H896.607H896.263H895.918H895.57H895.222H894.871H894.519H894.164H893.809H893.451H893.091H892.73H892.366H892.001H891.634H891.265H890.895H890.522H890.147H889.771H889.392H889.011H888.629H888.244H887.858H887.469H887.078H886.686H886.291H885.894H885.495H885.094H884.691H884.285H883.878H883.468H883.056H882.642H882.226H881.807H881.386H880.963H880.538H880.11H879.68H879.248H878.814H878.377H877.937H877.496H877.052H876.605H876.156H875.705H875.251H874.795H874.336H873.875H873.411H872.945H872.477H872.005H871.531H871.055H870.576H870.095H869.61H869.124H868.634H868.142H867.647H867.15H866.65H866.147H865.641H865.133H864.622H864.108H863.591H863.072H862.549H862.024H861.496H860.965H860.432H859.895H859.356H858.813H858.268H857.72H857.169H856.614H856.057H855.497H854.934H854.368H853.799H853.226H852.651H852.073H851.491H850.906H850.319H849.728H849.134H848.536H847.936H847.333H846.726H846.116H845.502H844.886H844.266H843.643H843.017H842.387H841.754H841.118H840.478H839.835H839.189H838.539H837.886H837.229H836.569H835.905H835.238H834.568H833.894H833.216H832.535H831.851H831.163H830.471H829.776H829.077H828.375H827.669H826.959H826.246H825.529H824.808H824.084H823.355H822.624H821.888H821.149H820.406H819.659H818.908H818.154H817.396H816.634H815.868H815.098H814.324H813.547H812.766H811.98H811.191H810.398H809.6H808.799H807.994H807.185H806.372H805.555H804.733H803.908H803.079H802.245H801.408H800.566H799.72H798.87H798.016H797.158H796.295H795.428H794.558H793.682H792.803H791.919H791.032H790.139H789.243H788.342H787.437H786.527H785.614H784.695H783.773H782.846H781.914H780.978H780.038H779.093H778.144H777.191H776.232H775.27H774.302H773.331H772.354H771.373H770.388H769.398H768.403H767.404H766.4H765.391H764.378H763.36H762.337H761.31H760.278H759.241H758.199H757.153H756.102H755.046H753.985H752.92H751.849H750.774H749.694H748.609H747.519H746.424H745.324H744.22H743.11H741.995H740.876H739.751H738.621H737.487H736.347H735.203H734.053H732.898H731.738H730.573H729.403H728.227H727.047H725.861H724.67H723.474H722.273H721.067H719.855H718.638H717.416H716.189H714.956H713.718H712.474H711.226H709.972H708.712H707.447H706.177H704.902H703.621H702.334H701.042H699.745C602.028 460 530.478 417.064 482.516 358.95C433.668 299.761 410 225.491 410 167H330Z"
							fill="url(#paint5_linear_755_81)"
						/>
						<defs>
							<filter
								id="filter0_d_755_81"
								x="113"
								y="-200"
								width="886"
								height="625"
								filterUnits="userSpaceOnUse"
								color-interpolation-filters="sRGB"
							>
								<feFlood flood-opacity="0" result="BackgroundImageFix" />
								<feColorMatrix
									in="SourceAlpha"
									type="matrix"
									values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
									result="hardAlpha"
								/>
								<feOffset dx="-9" dy="4" />
								<feGaussianBlur stdDeviation="22" />
								<feComposite in2="hardAlpha" operator="out" />
								<feColorMatrix
									type="matrix"
									values="0 0 0 0 0.25098 0 0 0 0 0.517647 0 0 0 0 0.745098 0 0 0 0.1 0"
								/>
								<feBlend
									mode="normal"
									in2="BackgroundImageFix"
									result="effect1_dropShadow_755_81"
								/>
								<feBlend
									mode="normal"
									in="SourceGraphic"
									in2="effect1_dropShadow_755_81"
									result="shape"
								/>
							</filter>
							<radialGradient
								id="paint0_radial_755_81"
								cx="0"
								cy="0"
								r="1"
								gradientUnits="userSpaceOnUse"
								gradientTransform="translate(901 532) rotate(166.749) scale(566.692 742.19)"
							>
								<stop offset="0.0655321" stop-color="#0B9CD9" />
								<stop
									offset="0.51831"
									stop-color="#FBB04D"
									stop-opacity="0.39"
								/>
								<stop
									offset="0.963494"
									stop-color="#E6F3F8"
									stop-opacity="0.25"
								/>
							</radialGradient>
							<linearGradient
								id="paint1_linear_755_81"
								x1="951.437"
								y1="864.682"
								x2="-12.7697"
								y2="540.009"
								gradientUnits="userSpaceOnUse"
							>
								<stop offset="0.210928" stop-color="#0B9CD9" />
								<stop
									offset="0.592645"
									stop-color="#FBB04D"
									stop-opacity="0.54"
								/>
								<stop
									offset="0.742245"
									stop-color="#E6F3F8"
									stop-opacity="0.25"
								/>
							</linearGradient>
							<radialGradient
								id="paint2_radial_755_81"
								cx="0"
								cy="0"
								r="1"
								gradientUnits="userSpaceOnUse"
								gradientTransform="translate(964 350) rotate(-161.556) scale(825.277 1294.47)"
							>
								<stop offset="0.25179" stop-color="#FBB04D" />
								<stop
									offset="0.471311"
									stop-color="#009EDB"
									stop-opacity="0.87"
								/>
								<stop
									offset="0.779778"
									stop-color="#009EDB"
									stop-opacity="0.05"
								/>
								<stop offset="0.916589" stop-color="#E6F3F8" stop-opacity="0" />
							</radialGradient>
							<linearGradient
								id="paint3_linear_755_81"
								x1="385"
								y1="123"
								x2="982"
								y2="140"
								gradientUnits="userSpaceOnUse"
							>
								<stop stop-color="#009EDB" stop-opacity="0" />
								<stop offset="1" stop-color="#0094D7" />
							</linearGradient>
							<linearGradient
								id="paint4_linear_755_81"
								x1="995"
								y1="336.326"
								x2="270.674"
								y2="368.123"
								gradientUnits="userSpaceOnUse"
							>
								<stop offset="0.0213742" stop-color="#FBB04D" />
								<stop
									offset="0.512169"
									stop-color="#0B9CD9"
									stop-opacity="0.59"
								/>
								<stop offset="0.922169" stop-color="#0B9CD9" stop-opacity="0" />
							</linearGradient>
							<linearGradient
								id="paint5_linear_755_81"
								x1="385"
								y1="450"
								x2="982"
								y2="467"
								gradientUnits="userSpaceOnUse"
							>
								<stop stop-color="#009EDB" stop-opacity="0" />
								<stop offset="1" stop-color="#0094D7" />
							</linearGradient>
						</defs>
					</svg>
				</figure>

				<div ref="explore" @click="scrollToSection" class="flex gap-[20px] font-bold cursor-pointer text-primary">
					<p class="uppercase text-link hidden md:block">explore</p>
					<svg class="mt-[10px] w-[27px] h-[30px] md:w-[59px] md:h-[55px]" width="59" height="55" viewBox="0 0 59 55" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M57.5 38.5732L43.2714 52.8018L29.0429 38.5732" stroke="#004987" stroke-width="2" stroke-miterlimit="13.33" stroke-linecap="square"/>
						<path d="M43.2773 50.6647L43.2773 1.69531L1 1.69531" stroke="#004987" stroke-width="2" stroke-linecap="square" stroke-linejoin="round"/>
					</svg>
				</div>
				<p class="block md:hidden">
					{{ doc.data.header_paragraph }}
				</p>
			</section>

			<!-- gallery -->
			<section :ref="setRef" class="bg-primary min-h-screen relative">
				<div ref="nextSection" lass="animate-[noise_.2s_infinite] noise z-0 opacity-50"></div>

				<figure class="absolute top-0 right-0 w-screen h-screen">
					<img
							src="/img/circle-gradient.svg"
							class="w-[80vw] h-[80vh] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
							ref="circleGradient"
						/>
				</figure>
				<figure
						class="absolute inset-0 flex items-center justify-center w-full h-full opacity-30 z-0"
						ref="circleDashed"
					>
						<img src="/img/circle-dashed.svg" class="w-[90vw] h-[90vh]" />
					</figure>

				<div class="absolute w-screen h-screen md:h-[80%]">
					<div
							class="w-[76px] md:w-[200px] h-[54px] md:h-[143px] rounded-lg absolute bg-center bg-cover bg-no-repeat"
							v-for="(item, index) in doc.data.gallery"
							ref="images"
							:style="{
								backgroundImage: `url(${item.image.url})`,
								top: galleryTopItemPosition(index),
								left: galleryLeftItemPosition(index),
							}"
						></div>
				</div>

				<div class="absolute max-w-[1500px] w-full left-1/2 transform -translate-x-1/2 bottom-0 flex flex-col px-[16px] md:px-[60px]">
					<h2 class="text-xl_mb md:text-xl uppercase text-white" data-title>
						{{ doc.data.gallery_title_one }}
					</h2>
					<h2 class="text-xl_mb md:text-xl uppercase text-white self-end" data-title>
						{{ doc.data.gallery_title_two }}
					</h2>
				</div>
			</section>
			<section :ref="setRef" class="relative bg-primary py-[54px] md:py-[70px] px-[16px] md:px-[60px]">
				<p class="text-white md:w-[56%] text-medium_mb md:text-medium" data-reveal>
					{{ doc.data.gallery_paragraph }}
				</p>
			</section>

			<!-- section one -->
			<section :ref="setRef" class="px-[16px] md:px-[60px] pt-[160px] pb-[67px] relative">

				<figure class="absolute w-fit h-fit z-0 right-0 top-0">
					<img
						src="/img/cross-arrows.svg"
						class="bgGraphic"
					/>
				</figure>

				<figure
						class="mb-[60px] block md:hidden"
						data-img
					>
						<PrismicImage
							class=""
							:field="doc.data.section_one_image"
						/>
					</figure>

				<div class="text-primary mb-[40px] md:mb-[50px]">
					<h2 class="text-headline_mb md:text-headline uppercase" data-title>
						{{ doc.data.section_one_title_line_one }}
					</h2>
					<h2 class="text-headline_mb md:text-headline uppercase ml-40" data-title>
						{{ doc.data.section_one_title_line_two }}
					</h2>
					<h2 class="text-headline_mb md:text-headline uppercase ml-280" data-title>
						{{ doc.data.section_one_title_line_three }}
					</h2>
				</div>

				<div class="flex">
					<figure
						class="md:w-1/2 hidden md:block"
						data-img
					>
						<PrismicImage
							class=""
							:field="doc.data.section_one_image"
						/>
					</figure>
					<div class="md:w-1/2">
						<PrismicRichText
							class="text-base text-primary"
							data-reveal
							:field="doc.data.section_one_text"
						/>
					</div>

				</div>
			</section>

			<!-- section two -->
			<section :ref="setRef" class="min-h-screen pt-[50px] md:pt-[100px] pb-[67px] bg-gradient-to-b from-[var(--third-color)] to-[var(--secondary-color)]">
				<div class="flex items-center	flex-col md:flex-row">
					<div class="w-full md:w-1/2 relative mb-[80px] md:mb-0">
						<figure class="w-[80%] md:w-full h-full z-0">
							<img src="/img/arrows-2.svg" class="" alt="arrows" />
						</figure>
						<figure class="relative left-0 :block" data-img>
							<PrismicImage
								class="absolute left-0 bottom-0 z-10"
								:field="doc.data.section_two_image"
							/>
					</figure>
					</div>
					<div class="w-full md:w-1/2 text-primary pr-[16px] pl-[16px] md:pl-[0px] md:pr-[60px]">
						<h2 class="text-headline_mb md:text-headline uppercase mb-[36px]" data-title>
							{{ doc.data.section_two_title }}
						</h2>
						<PrismicRichText
							class=""
							data-reveal
							:field="doc.data.section_two_text"
						/>
					</div>
				</div>

			</section>

			<!-- chapters (mobile version first) -->
			<section
				class="w-full relative bg-[var(--secondary-color)] block md:hidden"
			>
				<div class="py-100 px-[16px] text-primary">
					<div class="">
						<ul>
							<li
								class="w-ful flex items-center mb-[10px] md:mb-10"
								:class="{ 'bg-white': index != 0 }"
								v-for="(item, index) in doc.data.chapters"
								:key="index"
							>
								<div v-if="index != 0">
									<div class="min-h-fit p-[24px] md:p-30">
										<h2 class="text-[28px] leading-none mb-[8px] md:text-md uppercase">
											{{ item.title }}
										</h2>
										<p class="text-[16px] leading-none mb-[40px] md:mb-[0px] md:text-base mt-20 mb-40">
											{{ item.paragraph }}
										</p>
										<NuxtLink
											:to="'/chapter/' + item.link.uid"
											class="flex items-center"
											ref="navItems"
										>
											<div
												class="flex flex-row items-center justify-center uppercase font-bold text-[18px] md:text-md md:text-base"
											>
												Explore
												<img
													src="../public/img/explore-right.svg"
													class="ml-[19px] md:ml-20 w-[27px] md:w-50"
													alt=""
												/>
											</div>
										</NuxtLink>
									</div>
								</div>
								<div v-else>
									<div class="py-30">
										<h2 class="text-[56px] leading-none md:text-lg uppercase mb-[24px]">
											{{ item.title }}
										</h2>
										<p class="mt-20 mb-40">
											{{ item.paragraph }}
										</p>
										<figure class="scale-[1.0]">
											<PrismicImage :field="item.symbol" />
										</figure>

										<p>Choose a theme</p>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</section>
			<section
				class="w-full h-screen relative bg-[var(--secondary-color)] hidden md:block"
				:ref="setRef"
			>
				<div class="relative h-full w-full">
					<nav class="absolute bottom-0 left-0 bg-white w-full h-90 z-10">
						<ul class="flex flex-row justify-between h-full overflow-hidden">
							<li
								class="w-full h-full text-xsm flex items-center"
								v-for="(item, index) in doc.data.chapters"
								:key="index"
								data-chapter
							>
								<button
									class="w-full h-full text-primary hover:bg-primary hover:text-white p-20"
									:class="{ 'pointer-events-none': index == 0 }"
									ref="chaptersnavitems"
								>
									{{ item.button_text }}
								</button>
							</li>
						</ul>
					</nav>
					<div
						v-for="(item, index) in doc.data.chapters"
						:key="index"
						class="z-0 w-full h-full absolute"
						ref="chaptersitems"
						:class="{ 'opacity-0': index != 0 }"
					>
						<div
							class="w-full h-full flex justify-between text-primary items-center px-[60px]"
						>
							<div class="w-1/2 z-10">
								<p v-if="item.subtitle" class="mb-[40px]">{{ item.paragraph }}</p>
								<h3 v-if="item.subtitle" class="text-readmore uppercase">
									{{ item.subtitle }}
								</h3>
								<h2 class="text-subheadline uppercase">
									{{ item.title }}
								</h2>
								<p v-if="!item.subtitle">{{ item.paragraph }}</p>
								<div v-if="index != 0" class="mt-[40px]">
									<NuxtLink
										:to="'/chapter/' + item.link.uid"
										class="flex items-center"
										ref="navItems"
									>
										<div class="flex gap-20 uppercase font-bold">
											Explore
											<img
												src="../public/img/explore-right.svg"
												class=""
												alt=""
											/>
										</div>
									</NuxtLink>
								</div>
							</div>
							<figure class="w-1/2 h-fit left-0 top-0 z-0" data-img>
								<PrismicImage
									class=""
									:field="item.symbol"
								/>
							</figure>
						</div>
					</div>
				</div>
			</section>

			<!-- statistics -->
			<section :ref="setRef" class="bg-[var(--secondary-color)] text-primary py-[100px]">

				<div v-for="(item, index) in doc.data.statistics" :key="index" class="hidden md:flex items-center gap-[30px]" :style="{ marginTop: index === 1 ? '-100px' : index === 2 ? '-40px' : index === 3 ? '-120px' : '0' }" >
					<figure class="hidden md:block">
						<img
								:src="`./img/stats-arrows-${index + 1}.svg`"
								class=""
							/>
					</figure>
					
					<div class="flex items-end gap-[18px] flex-wrap	">
						<h5 class="text-stats_mb md:text-stats" data-num>{{ item.number }}</h5>
						<span class="text-stats_s_mb md:text-stats_s uppercase text-bold" data-num> {{ item.title }}</span>
					</div>
				</div>

				<div v-for="(item, index) in doc.data.statistics" :key="index" class="flex md:hidden items-center gap-[30px] mb-[10px]">
					<figure>
						<img
							class="w-[100px] h-fit"
							:src="index % 2 === 0 ? './img/stats-arrow-mobile-blue.svg' : './img/stats-arrow-mobile-orange.svg'"
						/>
					</figure>
					
					<div class="flex gap-[0px] flex-wrap flex-col">
						<h5 class="text-stats_mb md:text-stats" data-num>{{ item.number }}</h5>
						<span class="text-stats_s_mb md:text-stats_s uppercase font-bold" data-num> {{ item.title }}</span>
					</div>
				</div>

			</section>

		</article>
	</div>
</template>

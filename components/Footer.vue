<script setup>
  const { client } = usePrismic()
  
  const { data: footer } = await useAsyncData('footer', () =>
    client.getSingle('footer')
  )
</script>

<template>
  <footer class="w-full bg-primary text-white text-sm">
    <div class="py-100 px-[16px] md:px-[60px]">
      <div class="flex items-center justify-between">
        <LogoWhite/>
        <div>
          <ul class="flex flex-row justify-end">
            <li v-for="(item, index) in footer.data.links" :class="{ 'ml-15': index != 0 }">
              <PrismicLink :field="item.link">{{ item.link_text }}</PrismicLink>
            </li>
          </ul>
          <ul class="flex flex-row justify-end mt-20">
            <li>
              <PrismicLink :field="footer.data.linkedin">
                <figure class="w-[25px] h-[25px] flex items-center justify-center">
                  <img src="/img/linkedin.svg">
                </figure>
              </PrismicLink>
            </li>
            <li class="ml-30">
              <PrismicLink :field="footer.data.facebook">
                <figure class="w-[25px] h-[25px] flex items-center justify-center">
                  <img src="/img/facebook.svg">
                </figure>
              </PrismicLink>
            </li>
            <li class="ml-30">
              <PrismicLink :field="footer.data.twitter">
                <figure class="w-[25px] h-[25px] flex items-center justify-center">
                  <img src="/img/x.svg">
                </figure>
              </PrismicLink>
            </li>
            <li class="ml-30">
              <PrismicLink :field="footer.data.instagram">
                <figure class="w-[25px] h-[25px] flex items-center justify-center">
                  <img src="/img/instagram.svg">
                </figure>
              </PrismicLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>
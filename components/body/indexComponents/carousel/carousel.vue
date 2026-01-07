<template>
  <span v-if="layout.index.carousel">
    <simple-carousel />
  </span>
</template>

<script>
import SimpleCarousel from "@/components/body/indexComponents/carousel/components/simpleCarousel";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("Layouts", ["layout"]),
  },
  components: {
    SimpleCarousel,
  },
};
</script>

<style>
</style>
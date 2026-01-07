<template>
  <span>
    <v-carousel
      :cycle="cycle"
      :height="calcHeight"
      hide-delimiter-background
      show-arrows-on-hover
      :interval="layout.index.carousel.interval"
      eager
      class="index-fix"
    >
      <v-carousel-item
        v-for="(item, i) in layout.index.carousel.items"
        :key="i"
        :src="item.src"
      ></v-carousel-item>
    </v-carousel>
  </span>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("Layouts", ["layout"]),
  },
  data: function () {
    return {
      windowWidth: null,
      calcHeight: null,
      cycle: true,
    };
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
      this.calcHeight = this.windowWidth * this.layout.index.carousel.frameRate;
      this.calcHeight = this.calcHeight + "px";
    },
  },
  created() {
    if (process.client) {
      window.addEventListener("resize", this.onResize);
      this.onResize();
    }
  },
  destroyed() {
    if (process.client) {
      window.removeEventListener("resize", this.onResize);
    }
  },
};
</script>

<style scoped>
.index-fix >>> .v-carousel__controls {
  z-index: 0;
}
</style>
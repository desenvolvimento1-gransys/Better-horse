<template>
  <div v-if="this.config.addBackToTop" style="position: fixed">
    <div>
      <v-btn
        fab
        v-show="isVisible"
        @click="goToTop()"
        :style="layout.floatingIcon.backToTop.style"
      >
        <v-icon>mdi-arrow-up</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: function () {
    return {
      scroll: null,
      appHeight: 0,
      isVisible: false,
    };
  },
  computed: {
    ...mapState("Layouts", ["layout"]),
    ...mapState("Layouts", ["config"]),
  },
  methods: {
    goToTop() {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },

    onScroll() {
      let scroll = window.scrollY;
      this.scroll = parseFloat(scroll);
    },
  },
  watch: {
    scroll: function () {
      this.appHeight = document.getElementById("app").offsetHeight;

      if (this.scroll > 150) {
        this.isVisible = true;
      } else {
        this.isVisible = false;
      }
    },
  },
  created() {
    if (process.client) {
      window.addEventListener("scroll", this.onScroll);
      this.onScroll();
    }
  },
  destroyed() {
    if (process.client) {
      window.removeEventListener("scroll", this.onResize);
    }
  },
};
</script>

<style>
</style>
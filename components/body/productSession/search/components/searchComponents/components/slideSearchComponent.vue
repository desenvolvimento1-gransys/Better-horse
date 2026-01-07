<template>
  <span>
    <span v-if="list.length > 0">
      <vueper-slides
        class="no-shadow arrows"
        :visible-slides="visibleSlides"
        slide-multiple
        :slide-ratio="slideRatio"
        :gap="0"
        :dragging-distance="70"
        :arrows-outside="arrowsOutside"
        :bullets="false"
      >
        <template v-slot:arrow-left>
          <span clas="mdi mdi-chevron-left" style="color: red !important">
          </span>
        </template>

        <template v-slot:arrow-right>
          <i class="fas fa-chevron-right" style="color: red !important"></i>
        </template>

        <vueper-slide v-for="item in list" :key="item.id">
          <template v-slot:content v-if="item">
            <product-card-one :data="item" />
          </template>
        </vueper-slide>
      </vueper-slides>
    </span>
    <span v-else>
      <v-progress-circular
        :width="3"
        color="red"
        indeterminate
      ></v-progress-circular>
    </span>
  </span>
</template>

<script>
import ProductCardOne from "@/components/body/productSession/search/components/cards/productCardOne";

import { mapState } from "vuex";
import axios from "axios";
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
let defaultPath = "/ecommerce/search/";

import {
  baseApiUrl,
  catchError,
  storeId,
  itensPerPage,
} from "@/Settings/global";

export default {
  components: {
    ProductCardOne,
    VueperSlides,
    VueperSlide,
  },
  props: {
    title: String,
    small: Boolean,
    params: null,
    searchParams: null,
    currentSearch: null,
  },
  data: function () {
    return {
      visibleSlides: null,
      slideRatio: null,
      arrowsOutside: true,
      windowWidth: null,
      routeSearchSettings: null,
      data: null,
      list: [],
    };
  },
  computed: {
    ...mapState("Layouts", ["layout"]),
  },
  methods: {
    defaultSearch() {
      $nuxt.$nextTick(() => {
        $nuxt.$loading.start();
      });
      let params = this.searchParams;
      let payload = {
        ...params,
        company_id: storeId,
      };
      let data = this.list;
      if (this.selectedSizes) {
        data = [];
        payload.sizes = this.selectedSizes;
      }
      if (this.selectedColors) {
        data = [];
        payload.colors = this.selectedColors;
      }

      axios
        .post(`${baseApiUrl + defaultPath + this.currentSearch}`, payload)
        .then((res) => {
          data.push(...res.data.data);
          if (data < 1) {
            this.showEmptySmile = true;
          }
          this.list = data;
          currentPage = res.data.current_page;
          pages = res.data.last_page;
        })
        .catch(() => {})
        .finally(() => {
          $nuxt.$nextTick(() => {
            $nuxt.$loading.finish();
          });
        });
    },
    onResize() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 1300 && this.windowWidth > 960) {
        this.visibleSlides = 3;
        this.slideRatio = 8 / 12;
        this.arrowsOutside = true;
      } else if (this.windowWidth <= 960 && this.windowWidth > 600) {
        this.visibleSlides = 2;
        this.slideRatio = 12 / 12;
        this.arrowsOutside = true;
      } else if (this.windowWidth <= 600) {
        this.visibleSlides = 2;
        this.slideRatio = 17 / 12;
        this.arrowsOutside = false;
      } else {
        this.visibleSlides = 4;
        this.slideRatio = 5 / 12;
        this.arrowsOutside = true;
      }
    },
  },
  mounted() {
    if ($nuxt.$route.path == "/") {
      this.defaultSearch();
    }
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

<style>
</style>


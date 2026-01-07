<template>
  <span translate="no">
    <carousel v-show="!spinner" />
    <information v-show="!spinner" />
    <categories v-show="!spinner" />
    <search v-show="!spinner" />
  </span>
</template>

<script>
import Carousel from "@/components/body/indexComponents/carousel/carousel";
import Information from "@/components/body/indexComponents/information/information";
import Categories from "@/components/body/indexComponents/categorySession/categories";
import Search from "@/components/body/productSession/search/indexSearch";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("Utils", ["spinner"]),
  },
  components: {
    Carousel,
    Information,
    Categories,
    Search,
  },
};
</script>

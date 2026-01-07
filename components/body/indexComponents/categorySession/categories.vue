<template>
  <span v-if="layout.index.categorySession">
    <simple-categories />
  </span>
</template>

<script>
import SimpleCategories from "@/components/body/indexComponents/categorySession/components/simpleCategories";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("Layouts", ["layout"]),
  },
  components: {
    SimpleCategories,
  },
};
</script>

<style>
</style>
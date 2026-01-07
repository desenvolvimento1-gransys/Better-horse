<template>
  <div :style="layout.index.search.mainStyle">
    <div
      :style="layout.index.search.slideListStyle"
      v-for="(item, index) in layout.index.search.slideSearchList"
      :key="index"
    >
      <h1 :class="item.titleClass" :style="item.titleStyle">
        {{ item.title }}
      </h1>
      <slide-search-component
        :searchParams="item.searchParams"
        currentSearch="default-search"
      />
    </div>
  </div>
</template>

<script>
import SlideSearchComponent from "@/components/body/productSession/search/components/searchComponents/components/slideSearchComponent";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("Layouts", ["layout"]),
  },
  components: {
    SlideSearchComponent,
  },
};
</script>
<style scoped>
</style>
<template>
  <span v-if="!load" translate="no">
    <default-desk-screen class="d-none d-md-block" />
    <default-mobile-screen class="d-md-none d-sm-block" />
    <div
      class="search-container"
      :style="layout.productPage.searchSection.style"
    >
      <p
        lass="mx-5 adjust-title"
        :style="layout.productPage.searchSection.title.style"
        :class="layout.productPage.searchSection.title.class"
      >
        {{ layout.productPage.searchSection.title.name }}
      </p>
      <props-search-components
        :params="{
          items_per_page: layout.productPage.searchSection.config.items,
          no_product_id: this.$route.params.productId,
          ...layout.productPage.searchSection.config.params,
        }"
        :displaySize="layout.productPage.searchSection.config.displaySize"
      ></props-search-components>
    </div>
  </span>
</template>

<script>
import defaultDeskScreen from "@/components/body/productSession/productScreen/components/desktop/defaultDeskScreen";
import defaultMobileScreen from "@/components/body/productSession/productScreen/components/mobile/defaultMobileScreen";
import propsSearchComponents from "@/components/body/productSession/search/components/searchComponents/propsSearchComponent";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    defaultDeskScreen,
    defaultMobileScreen,
    propsSearchComponents,
  },
  computed: {
    ...mapState("Layouts", ["layout"]),
    ...mapState("Product", ["load"]),
  },
  methods: {
    ...mapActions("Product", ["cleanState", "setProduct"]),
  },
  mounted() {
    this.setProduct({
      product_id: this.$route.params.productId,
    });
  },
  beforeDestroy() {
    this.cleanState();
  },
};
</script>

<style scoped>
.search-container {
  margin: 110px 32px 90px 32px;
}
.adjust-title {
  padding: 0 12px 0 12px;
}
@media only screen and (max-width: 600px) {
  .search-container {
    margin: 110px 10px 90px 10px;
  }
  .adjust-title {
    padding: 0 4px 0 4px !important;
  }
}
</style> 
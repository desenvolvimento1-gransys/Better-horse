<template>
  <div class="search-container" translate="no">
    <div
      class="adjust-title"
      v-if="layout.search.home.title && $nuxt.$route.path == '/'"
    >
      <h3
        class="mx-5 mb-5 d-block d-md-none"
        v-show="spinner == false"
        :style="layout.search.home.titleStyle"
        :class="layout.search.home.titleClass"
      >
        {{ layout.search.home.title }}
      </h3>
      <h2
        class="mx-5 mb-5 d-none d-md-block"
        v-show="spinner == false"
        :style="layout.search.home.titleStyle"
        :class="layout.search.home.titleClass"
      >
        {{ layout.search.home.title }}
      </h2>
    </div>
    <div class="adjust-title" v-else-if="this.$route.params.texto">
      <h3
        class="mx-5 mb-5 d-block d-md-none"
        v-show="spinner == false"
        :style="layout.search.category.titleStyle"
      >
        Você procurou por: {{ this.$route.params.texto }}
      </h3>
      <h2
        class="mx-5 mb-5 d-none d-md-block"
        v-show="spinner == false"
        :style="layout.search.category.titleStyle"
      >
        Você procurou por: {{ this.$route.params.texto }}
      </h2>
    </div>
    <simple-search />
  </div>
</template>

<script>
import SimpleSearch from "@/components/body/productSession/search/components/searchComponents/simpleSearchCoponent";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("Layouts", ["layout"]),
    ...mapState("Utils", ["spinner"]),
  },
  components: {
    SimpleSearch,
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
    margin: 55px 0 90px 0;
  }
  .adjust-title {
    padding: 0 4px 0 4px !important;
  }
}
</style>
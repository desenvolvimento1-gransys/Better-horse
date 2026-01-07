<template>
  <div style="height: 100%">
    <v-row no-gutters v-if="list.length > 0">
      <v-col sm="6" md="3" cols="6" xl="2" v-for="item in list" :key="item.id">
        <product-card-one :data="item" />
      </v-col>
    </v-row>
    <v-row
      v-else
      :justify="layout.search.alert.justify"
      :align="layout.search.alert.align"
    >
      <v-col v-if="loadedSearch" cols="12" sm="12" align="center"
        ><v-alert
          :style="layout.search.alert.style"
          :icon="layout.search.alert.icon"
          :color="layout.search.alert.color"
          text
        >
          {{ layout.search.alert.text }}
        </v-alert></v-col
      >
    </v-row>
    <next-page></next-page>
    <span>
      <!-- <empty-search></empty-search> -->
    </span>
  </div>
</template>

<script>
import ProductCardOne from "@/components/body/productSession/search/components/cards/productCardOne";
import nextPage from "@/components/body/productSession/search/components/searchComponents/components/nextPage";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    ProductCardOne,
    nextPage,
  },
  data() {
    return {
      isFilteredSearch: "",
      isFilteredSearchEmpty: "",
    };
  },
  computed: {
    ...mapState("Search", ["list", "sectionName", "loadedSearch"]),
    ...mapState("Layouts", ["layout"]),
  },
  methods: {
    ...mapActions("Search", ["callSearch", "cleanList"]),

    checkIsFilteredSearch() {
      const path = this.$route.path.split("/");
      if (path.includes("busca")) {
        if (path.includes("texto")) {
          return false;
        }
        return true;
      }

      return false;
    },

    checkIsFilteredSearchEmpty() {
      if (Object.keys(this.$route.query).length == 0) {
        return false;
      } else if (this.$route.query.cores.length === 0) {
        return false;
      } else if (this.$route.query.tamanhos.length === 0) {
        return false;
      }

      return true;
    },
  },
  watch: {
    $route() {
      this.isFilteredSearch = this.checkIsFilteredSearch();
      this.isFilteredSearchEmpty = this.checkIsFilteredSearchEmpty();
    },
  },
  mounted() {
    let text = null;
    this.callSearch({ text: this.$route.params.texto });
    window.scrollTo(0, 0);

    this.isFilteredSearch = this.checkIsFilteredSearch();
    this.isFilteredSearchEmpty = this.checkIsFilteredSearchEmpty();
  },
  beforeDestroy() {
    this.cleanList();
  },
};
</script>

<style>
</style>
<template>
  <div>
    <v-row>
      <v-col sm="6" md="3" cols="6" xl="2" v-for="item in list" :key="item.id">
        <product-card-one :data="item" />
      </v-col>
    </v-row>
    <next-page v-if="showNextPage"></next-page>
    <span>
      <!-- <empty-search></empty-search> -->
    </span>
  </div>
</template>

<script>
import ProductCardOne from "@/components/body/productSession/search/components/cards/productCardOne";
import nextPage from "@/components/body/productSession/search/components/searchComponents/components/nextPage";
import {
  baseApiUrl,
  catchError,
  storeId,
  itensPerPage,
} from "@/Settings/global";
import axios from "axios";
let defaultPath = "/ecommerce/search/";

export default {
  data: function () {
    return {
      list: [],
    };
  },
  components: {
    ProductCardOne,
    nextPage,
  },
  props: {
    params: Object,
    filters: { Type: Boolean, Default: false },
    showNextPage: { Type: Boolean, Default: false },
  },
  computed: {},
  methods: {
    defaultSearch(params) {
      $nuxt.$nextTick(() => {
        $nuxt.$loading.start();
      });
      let payload = {
        ...params,
        company_id: storeId,
      };

      axios
        .post(`${baseApiUrl + defaultPath}default-search`, payload)
        .then((res) => {
          this.list = res.data.data;
        })
        .catch((e) => {
          catchError(e);
        })
        .finally(() => {
          $nuxt.$nextTick(() => {
            $nuxt.$loading.finish();
          });
        });
    },
  },
  mounted() {
    this.defaultSearch(this.params);
    window.scrollTo(0, 0);
  },
};
</script>
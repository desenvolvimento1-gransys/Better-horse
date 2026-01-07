<template>
  <div :style="layout.search.accordion.main">
    <v-expansion-panels class="main-panel" v-model="panel" multiple accordion>
      <v-row
        no-gutters
        justify="space-around"
        v-if="
          config.search.showSizeFilter &&
          ordenatedSizesFromFilter[0].size &&
          config.search.showColorFilter &&
          colors[0].color
        "
      >
        <v-col cols="5" sm="5" md="12" lg="10">
          <v-expansion-panel
            v-if="
              config.search.showSizeFilter && ordenatedSizesFromFilter[0].size
            "
            :style="layout.search.accordion.expPanel"
          >
            <v-expansion-panel-header :style="layout.search.accordion.expHeader"
              >Tamanhos
            </v-expansion-panel-header>
            <!-- <span class="scroll-accordion"> -->
            <v-expansion-panel-content
              :style="layout.search.accordion.expContent"
            >
              <span
                v-for="(item, index) in ordenatedSizesFromFilter"
                :key="index"
              >
                <v-checkbox
                  :style="layout.search.accordion.expColorCheckBox"
                  v-model="selectedSizesPage"
                  :value="item.size"
                  :label="item.size"
                />
              </span>
            </v-expansion-panel-content>
            <!-- </span> -->
          </v-expansion-panel>
        </v-col>
        <v-col cols="5" sm="5" md="12" lg="10">
          <v-expansion-panel
            v-if="config.search.showColorFilter && colors[0].color"
            :style="layout.search.accordion.expPanel"
          >
            <v-expansion-panel-header :style="layout.search.accordion.expHeader"
              >Cores</v-expansion-panel-header
            >
            <v-expansion-panel-content
              :style="layout.search.accordion.expContent"
            >
              <span v-for="(item, index) in colors" :key="index">
                <v-checkbox
                  :style="layout.search.accordion.expSizeCheckBox"
                  v-model="selectedColorsPage"
                  :label="item.color"
                  :value="item.color"
                />
              </span>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-col>
      </v-row>

      <v-row v-else no-gutters justify="space-around">
        <v-col cols="12">
          <v-expansion-panel
            v-if="
              config.search.showSizeFilter && ordenatedSizesFromFilter[0].size
            "
            :style="layout.search.accordion.expPanel"
          >
            <v-expansion-panel-header :style="layout.search.accordion.expHeader"
              >Tamanhos
            </v-expansion-panel-header>
            <!-- <span class="scroll-accordion"> -->
            <v-expansion-panel-content
              :style="layout.search.accordion.expContent"
            >
              <span
                v-for="(item, index) in ordenatedSizesFromFilter"
                :key="index"
              >
                <v-checkbox
                  :style="layout.search.accordion.expColorCheckBox"
                  v-model="selectedSizesPage"
                  :value="item.size"
                  :label="item.size"
                />
              </span>
            </v-expansion-panel-content>
            <!-- </span> -->
          </v-expansion-panel>
        </v-col>
        <v-col cols="12">
          <v-expansion-panel
            v-if="config.search.showColorFilter && colors[0].color"
            :style="layout.search.accordion.expPanel"
          >
            <v-expansion-panel-header :style="layout.search.accordion.expHeader"
              >Cores</v-expansion-panel-header
            >
            <v-expansion-panel-content
              :style="layout.search.accordion.expContent"
            >
              <span v-for="(item, index) in colors" :key="index">
                <v-checkbox
                  :style="layout.search.accordion.expSizeCheckBox"
                  v-model="selectedColorsPage"
                  :label="item.color"
                  :value="item.color"
                />
              </span>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-col>
      </v-row>
    </v-expansion-panels>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  data: function () {
    return {
      panel: [0, 1],
      selectedSizesPage: [],
      selectedColorsPage: [],
      searchParams: [],
    };
  },
  watch: {
    selectedSizesPage: function () {
      this.setSelectedSizes(this.selectedSizesPage);
      this.addFilterToRouteQuery();
    },
    selectedColorsPage: function () {
      this.setSelectedColors(this.selectedColorsPage);
      this.addFilterToRouteQuery();
    },
    $route: function () {
      this.setFilterFromRouteQuery();
    },
    searchParams: function () {
      this.defaultSearch();
    },
  },
  computed: {
    ...mapState("Search", [
      "colors",
      "sizes",
      "selectedSizes",
      "selectedColors",
    ]),
    ...mapGetters("Search", ["ordenatedSizesFromFilter"]),
    ...mapState("Layouts", ["layout", "config"]),
  },
  methods: {
    ...mapActions("Search", [
      "setSelectedColors",
      "setSelectedSizes",
      "defaultSearch",
      "cleanSelectedColors",
      "cleanSelectedSizes",
      "cleanSizes",
      "cleanColors",
    ]),

    checkSize() {
      if (window.innerWidth <= 960) {
        this.panel = null;
      } else {
        this.panel = [0, 1];
      }
    },

    addFilterToRouteQuery() {
      $nuxt.$router.push({
        query: {
          tamanhos: [this.selectedSizesPage],
          cores: [this.selectedColorsPage],
        },
      });
    },

    setFilterFromRouteQuery() {
      const sizeQuery = this.$route.query.tamanhos;
      const colorQuery = this.$route.query.cores;

      let validSizeQuery;
      let validColorQuery;

      if (sizeQuery) {
        if (typeof sizeQuery == "string") {
          validSizeQuery = sizeQuery.split(",");
        } else {
          validSizeQuery = sizeQuery.join().split(","); // Waning: without joining and splitting, it creates an infinite loop.
        }

        if (validSizeQuery == "") {
          validSizeQuery = [];
        }
      } else {
        validSizeQuery = [];
      }

      if (colorQuery) {
        if (typeof colorQuery == "string") {
          validColorQuery = colorQuery.split(",");
        } else {
          validColorQuery = colorQuery.join().split(","); // Waning: without joining and splitting, it creates an infinite loop.
        }
        if (validColorQuery == "") {
          validColorQuery = [];
        }
      } else {
        validColorQuery = [];
      }

      this.selectedSizesPage = validSizeQuery;
      this.selectedColorsPage = validColorQuery;

      this.searchParams = [
        { route: this.$route.query },
        { sizes: this.selectedSizesPage },
        { colors: this.selectedColorsPage },
      ];
    },
  },
  mounted() {
    if (process.client) {
      window.addEventListener("resize", this.checkSize);
      this.checkSize();
    }

    this.setFilterFromRouteQuery();
  },
  destroyed() {
    this.cleanSelectedColors();
    this.cleanSelectedSizes();
    this.cleanSizes();
    this.cleanColors();
    this.searchParams = [];
  },
};
</script>

<style scoped>
</style>
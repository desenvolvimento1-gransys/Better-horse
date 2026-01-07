<template>
  <span>
    <span v-if="currentPage < pages">
      <span v-if="!nextPageItemsSpinner">
        <v-row>
          <v-col cols="12" align="center">
            <v-btn
              :style="layout.search.showMoreBtn.main"
              class="next-button"
              @click="nextPageDefaultSearch()"
            >
              {{ layout.search.showMoreBtn.title }}
            </v-btn>
          </v-col>
        </v-row>
      </span>
      <span v-else>
        <v-row justify="center">
          <v-col cols="12" align="center">
            <v-progress-circular
              :size="50"
              color="black"
              indeterminate
            ></v-progress-circular>
          </v-col>
        </v-row>
      </span>
    </span>
  </span>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState("Search", ["currentPage", "pages", "nextPageItemsSpinner"]),
    ...mapState("Layouts", ["layout"]),
  },
  methods: {
    ...mapActions("Search", ["nextPageDefaultSearch"]),
  },
};
</script>

<style scoped>
</style>
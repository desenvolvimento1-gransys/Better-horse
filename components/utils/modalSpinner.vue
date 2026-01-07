<template>
  <span>
    <!-- <h1>é nois</h1> -->
    <span v-if="modalSpinner">
      <v-row>
        <v-col  cols="12" align="center">
          <v-progress-circular
            size="100"
            style="margin: 40px"
            indeterminate
          ></v-progress-circular>
        </v-col>
      </v-row>
    </span>
    <slot v-else></slot>
  </span>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("Utils", ["modalSpinner"]),
  },
};
</script>

<style>
</style>
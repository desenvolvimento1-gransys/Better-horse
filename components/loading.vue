<template>
  <span>
    <div v-if="loading && startApp" class="loading-page">
      <v-row class="row-spinner-class" align="center" justify="center">
        <v-col cols="12">
          <v-progress-circular
            size="80"
            class="spinner-class"
            indeterminate
            color="primary"
          ></v-progress-circular>
        </v-col>
      </v-row>
    </div>
  </span>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  data: () => ({
    loading: true,
  }),
  computed: {
    ...mapState("User", ["startApp"]),
  },
  methods: {
    ...mapActions("Utils", ["setModalSpinner", "setSpinner"]),
    start() {
      this.loading = true;
      this.setSpinner(true);
    },
    startModalSpinner() {
      this.setModalSpinner(true);
    },
    finish() {
      setTimeout(
        () => ((this.loading = false), this.setSpinner(false)),
        470
      );
    },
    finishModalSpinner() {
      setTimeout(() => this.setModalSpinner(false), 470);
    },
  },
};
</script>
<style scoped>
.loading-page {
  z-index: 80;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh !important;
  background: rgba(0, 0, 0, 0.671);
  text-align: center;
  padding-top: 100px;
  color: red;
  font-size: 80px;
  font-family: sans-serif;
}

.row-spinner-class {
  /* background: blue !important; */
  height: 80vh;
}

.spinner-class {
  font-size: 400px !important;
  color: black;
  margin: 25vh 0 0 0;
}
</style>
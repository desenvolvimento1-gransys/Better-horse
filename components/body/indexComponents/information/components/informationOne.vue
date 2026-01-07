<template>
  <span v-if="layout.index.information">
    <div class="information">
      <v-row
        class="d-none d-md-flex"
        justify="center"
        :style="layout.index.information.rowClass"
      >
        <v-col
          v-for="(item, i) in layout.index.information.items"
          :key="i"
          align="center"
          cols="3"
          :style="layout.index.information.colClass"
        >
          <span>
            <i :style="layout.index.information.icons" :class="item.icon"></i>
          </span>
          <strong class="teste" :style="layout.index.information.boldText">{{
            item.bold
          }}</strong>
          <span :style="layout.index.information.text"> {{ item.text }} </span>
        </v-col>
      </v-row>
    </div>
    <v-carousel
      hide-delimiter-background
      hide-delimiters
      class="d-md-none d-sm-block"
      height="35px"
      :show-arrows="false"
      interval="2000"
      cycle
    >
      <v-carousel-item
        v-for="(item, index) in layout.index.information.items"
        :key="index"
      >
        <v-sheet style="background: none !important">
          <v-row>
            <v-col cols="12" aling="center">
              <p class="text-center">
                <span>
                  <i
                    :style="layout.index.information.mobile.iconsStyle"
                    :class="item.icon"
                  ></i>
                </span>
                <strong
                  class="teste"
                  :style="layout.index.information.mobile.boldTextStyle"
                  >{{ item.bold }}</strong
                >
                <span :style="layout.index.information.mobile.textStyle">
                  {{ item.text }}
                </span>
              </p>
            </v-col>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </span>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("Layouts", ["layout"]),
  },
};
</script>

<style>
.teste {
  padding: 0 0 100px 0 !important;
}
.information {
  background-color: #afafaf;
  margin-top: 10px;
}
</style>
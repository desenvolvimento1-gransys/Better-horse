<template>
  <v-row justify="center">
    <v-col :cols="layout.account.cols">
      <v-card>
        <v-row no-gutters>
          <v-col :cols="layout.account.tabs.cols">
            <v-tabs
              :slider-size="layout.account.tabs.slider.size"
              vertical
              v-model="tab"
            >
              <v-tabs-slider
                :style="layout.account.tabs.slider.style"
              ></v-tabs-slider>

              <v-tab disabled></v-tab>

              <v-tab
                :style="changeActiveStyle('/conta/minha-conta')"
                link
                to="minha-conta"
              >
                Conta
              </v-tab>
              <v-tab
                :style="changeActiveStyle('/conta/enderecos')"
                link
                to="enderecos"
              >
                Endereços
              </v-tab>

              <v-tab
                :style="changeActiveStyle('/conta/pedidos')"
                link
                to="pedidos"
              >
                Pedidos
              </v-tab>
            </v-tabs>
            <v-btn text block depressed @click="setExitDialog(true)">
              Sair <v-icon>mdi-logout</v-icon></v-btn
            >
          </v-col>
          <v-col :cols="layout.account.content.cols">
            <v-row no-gutters style="height: 100%">
              <v-col>
                <v-card tile style="height: 100%">
                  <slot></slot>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      tab: null,
      accountStyle: null,
      addressesStyle: null,
      ordersStyle: null,
    };
  },
  computed: {
    ...mapState("Layouts", ["config", "layout"]),
  },
  methods: {
    ...mapActions("Utils", ["setExitDialog"]),
    changeActiveStyle(path) {
      if (this.$nuxt.$route.path == path) {
        return this.layout.account.tabs.activeStyle;
      } else {
        return this.layout.account.tabs.regularStyle;
      }
    },
  },
};
</script>

<style>
.tabs {
  background-color: black;
  color: white !important;
}
</style>
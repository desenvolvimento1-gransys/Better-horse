<template>
  <v-row justify="center">
    <v-col cols="11">
      <v-card>
        <v-row no-gutters>
          <v-col cols="12">
            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-header
                  disable-icon-rotate
                  expand-icon="mdi-dots-vertical"
                >
                  Menu
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-tabs
                    vertical
                    grow
                    :slider-size="layout.account.tabs.mobile.slider.size"
                    v-model="tab"
                  >
                    <v-tabs-slider
                      :color="layout.account.tabs.mobile.slider.color"
                    ></v-tabs-slider>
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
                    <v-btn text depressed @click="setExitDialog(true)">
                      Sair <v-icon>mdi-logout</v-icon></v-btn
                    >
                  </v-tabs>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
          <v-col cols="12">
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
        return this.layout.account.tabs.mobile.activeStyle;
      } else {
        return this.layout.account.tabs.mobile.regularStyle;
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
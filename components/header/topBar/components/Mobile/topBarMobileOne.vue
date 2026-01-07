<template>
  <span>
    <div :style="layout.topBar.mobile.main">
      <v-row style="width: 100%">
        <v-col cols="3" align-self="center" align="center">
          <button
            v-if="primaryDrawer.type !== 'permanent'"
            @click.stop="primaryDrawer.model = !primaryDrawer.model"
          >
            <i
              :style="layout.topBar.mobile.navIcon.style"
              :class="layout.topBar.mobile.navIcon.icon"
            ></i>
          </button>
        </v-col>
        <v-col cols="6" align-self="center" align="center">
          <router-link to="/">
            <img
              :style="layout.topBar.mobile.logoStyle"
              :src="layout.topBar.mobile.logoUrl"
              alt="Logo da topBar"
            />
          </router-link>
        </v-col>
        <v-col cols="3" align-self="center" align="center">
          <button @click="setCartModal(true)">
            <i
              :class="layout.topBar.mobile.cart.icon"
              :style="layout.topBar.mobile.cart.style"
            ></i>
            <span :style="layout.topBar.cartText">
              {{ totalAmountInCart }}</span
            >
          </button>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col align-self="center" align="center" cols="12">
          <v-container>
            <v-text-field
              flat
              solo
              hide-details
              v-model="searchText"
              v-on:keydown.enter="search()"
              :style="layout.topBar.searchInput"
              placeholder="O quê você procura?"
            >
              <template v-slot:append>
                <v-btn
                  icon
                  @click="search()"
                  :style="layout.topBar.searchInputBtn"
                >
                  <i class="mdi mdi-magnify"></i>
                </v-btn>
              </template>
            </v-text-field>
          </v-container>
        </v-col>
      </v-row>
    </div>

    <v-navigation-drawer
      v-model="primaryDrawer.model"
      :clipped="primaryDrawer.clipped"
      :floating="primaryDrawer.floating"
      :mini-variant="primaryDrawer.mini"
      :permanent="primaryDrawer.type === 'permanent'"
      :temporary="primaryDrawer.type === 'temporary'"
      app
      class="drawer"
    >
      <nav-bar-one />
    </v-navigation-drawer>
  </span>
</template>

<script>
import NavBarOne from "@/components/header/navBar/components/mobile/navBarOne";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  components: {
    NavBarOne,
  },
  data: function () {
    return {
      searchText: "",
      fav: true,
      menu: false,
      message: false,
      hints: true,
      drawers: ["Default (no property)", "Permanent", "Temporary"],
      primaryDrawer: {
        model: null,
        type: "temporary",
        clipped: true,
        floating: false,
        mini: false,
      },
    };
  },
  computed: {
    ...mapState("Layouts", ["layout"]),
    ...mapGetters("Cart", ["totalAmountInCart"]),
  },
  methods: {
    ...mapActions("Cart", ["setCartModal"]),
    search() {
      if (this.searchText && this.searchText.length > 0) {
        $nuxt.$router.push(`/busca/texto/${this.searchText}`);
        this.searchText = "";
      }
    },
  },
};
</script>
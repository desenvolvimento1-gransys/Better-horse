<template>
  <div :style="layout.navBar.mobile.main" translate="no">
    <v-container
      :style="layout.navBar.mobile.linkStyle"
      v-if="layout.navBar.mobile.linkList"
    >
      <span v-if="user.id">
        <v-row
          dense
          v-for="(item, index) in layout.navBar.mobile.linkList"
          :key="index"
        >
          <v-col cols="12">
            <v-input hide-details
              ><v-icon :style="item.icon.style">{{ item.icon.class }}</v-icon
              ><router-link :to="item.link" :style="item.style"
                >&nbsp;{{ item.name }}</router-link
              ></v-input
            >
          </v-col>
        </v-row>
      </span>
      <v-row v-else dense>
        <v-col cols="12">
          <v-input hide-details
            ><v-icon :style="layout.navBar.mobile.login.icon.style">{{
              layout.navBar.mobile.login.icon.class
            }}</v-icon
            ><a
              :href="layout.navBar.mobile.login.link"
              :style="layout.navBar.mobile.login.style"
              >&nbsp;{{ layout.navBar.mobile.login.name }}</a
            ></v-input
          >
        </v-col>
      </v-row>
    </v-container>
    <div style="height: 100%" :style="layout.navBar.mobile.navItemsStyle">
      <v-virtual-scroll
        :bench="100"
        height="90%"
        item-height="52"
        :items="navBarList"
      >
        <template v-slot:default="{ item }">
          <v-menu
            min-width="256px"
            max-width="200px"
            nudge-top="10"
            transition="slide-x-transition"
            tile
            offset-y
          >
            <template v-slot:activator="{ on }">
              <v-container>
                <v-row>
                  <v-col cols="9">
                    <v-input
                      hide-details
                      @click="menu = !menu"
                      :to="`/busca${item.route}`"
                    >
                      <router-link
                        :to="`/busca${item.route}`"
                        :style="layout.navBar.mobile.itemStyle"
                        >{{ item.name }}</router-link
                      >
                    </v-input>
                  </v-col>
                  <v-col cols="1">
                    <a v-on="on" v-if="item.children">
                      <v-icon :style="layout.navBar.mobile.chevronStyle"
                        >mdi-chevron-down</v-icon
                      >
                    </a>
                  </v-col>
                </v-row>
              </v-container>
            </template>
            <v-card v-if="item.children" style="position: relative">
              <v-row no-gutters>
                <v-col
                  cols="12"
                  v-for="detail in item.children"
                  :key="detail.name"
                >
                  <v-btn
                    solo
                    depressed
                    block
                    tile
                    small
                    height="40"
                    class="subItem"
                    @click="menu = !menu"
                    :to="`/busca${detail.route}`"
                    :style="layout.navBar.mobile.subItemStyle"
                  >
                    <span>{{ detail.name }}</span>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-menu>
        </template>
      </v-virtual-scroll>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("Settings", ["navBarList"]),
    ...mapState("User", ["user"]),
    ...mapState("Layouts", ["layout"]),
  },
  data: function () {
    return {};
  },
};
</script>

<style scoped>
.v-menu__content {
  left: 0 !important;
}

.subItem >>> .v-btn__content {
  text-transform: none;
  justify-content: left;
}
</style>
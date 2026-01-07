<template>
  <div>
    <span class="nav-list" :style="layout.navBar.main">
      <span v-for="item in navBarList" :key="item.name">
        <v-menu transition="slide-x-transition" open-on-hover offset-y>
          <template v-slot:activator="{ on }">
            <router-link :to="`/busca${item.route}`" class="no-decoration">
              <li :style="layout.navBar.navText" v-on="on">{{ item.name }}</li>
            </router-link>
          </template>
          <v-list
            :style="layout.navBar.sub"
            class="nav-subitens-main-class"
            v-if="item.children"
          >
            <v-list-item v-for="detail in item.children" :key="detail.name">
              <router-link :to="`/busca${detail.route}`" class="no-decoration">
                <v-list-item-title
                  :style="layout.navBar.subText"
                  class="ml-5 mr-5 nav-subitens"
                  >{{ detail.name }}</v-list-item-title
                >
              </router-link>
            </v-list-item>
          </v-list>
        </v-menu>
      </span>
    </span>
  </div>
</template>


<script src='./../navBarjs'/>

<style scoped>
.nav-list {
  display: flex;
  justify-content: center;
}

.nav-list li {
  text-decoration: none !important;
  list-style-type: none;
}
</style>
<template>
  <div style="position: fixed">
    <div>
      <a :href="layout.floatingIcon.link" target="_blank">
        <v-img
          :src="layout.floatingIcon.icon"
          :style="layout.floatingIcon.style"
          class="icon"
          alt="Icone flutuante do whatsapp"
        ></v-img>
      </a>
    </div>
  </div>
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
.icon {
  width: 60px;
  height: 60px;
}

@media only screen and (max-width: 600px) {
  .icon {
    width: 50px;
    height: 50px;
  }
}
</style>
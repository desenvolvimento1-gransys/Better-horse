<template>
  <div :style="layout.initLoader.style">
    <v-row style="width: 100%; height: 100%" justify="center" align="center">
      <v-col align="center">
        <img
          class="swing"
          :width="layout.initLoader.logo.width"
          :height="layout.initLoader.logo.height"
          :style="layout.initLoader.logo.style"
          :src="layout.initLoader.logo.src"
          alt="Logo Carregamento"
        />
        <p />
        <h3
          :style="layout.initLoader.loadingText.style"
          class="d-block d-md-none"
        >
          Carregando<span class="fadeInAndOut" style="animation-delay: 0.2s"
            >.</span
          ><span class="fadeInAndOut" style="animation-delay: 0.4s">.</span
          ><span class="fadeInAndOut" style="animation-delay: 0.5s">.</span>
        </h3>
        <h1
          :style="layout.initLoader.loadingText.style"
          class="d-none d-md-block"
        >
          Carregando<span class="fadeInAndOut" style="animation-delay: 0.2s"
            >.</span
          ><span class="fadeInAndOut" style="animation-delay: 0.4s">.</span
          ><span class="fadeInAndOut" style="animation-delay: 0.5s">.</span>
        </h1>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("Layouts", ["layout", "config"]),
    ...mapState("User", ["startApp"]),
  },
};
</script>

<style>
.swing {
  animation: swing ease-in-out 1s infinite alternate;
  transform-origin: center center;
}

@keyframes swing {
  0% {
    transform: rotate(3deg);
  }
  100% {
    transform: rotate(-3deg);
  }
}

.fadeInAndOut {
  opacity: 1;
  animation: fade 2s infinite alternate;
}

@keyframes fade {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}
</style>
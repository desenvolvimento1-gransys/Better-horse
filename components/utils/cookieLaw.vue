<template>
  <div v-if="show" class="cookie-law-div">
    <p class="mt-2">
      Este site usa cookies para garantir que você obtenha a melhor experiência
      em nosso site. Ao continuar navegando, você concorda com a nossa
      <a href="/politica-privacidade">Política de Privacidade</a>
    </p>
    <v-btn dense @click="accept()">ok</v-btn>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      show: false,
    };
  },
  methods: {
    accept() {
      localStorage.setItem("acceptCookie", true);
      this.show = false;
    },
  },
  mounted() {
    let test = localStorage.getItem("acceptCookie");
    if (!test) {
      this.show = true;
    }
    //     localStorage.removeItem("cart");
    //     localStorage.setItem("cart", JSON.stringify(mapCart));
    //     let json = localStorage.getItem("cart");
  },
};
</script>

<style scoped>
.cookie-law-div {
  z-index: 600;
  height: 120px;
  font-size: 16px;
  color: rgb(0, 0, 0);
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: rgba(207, 207, 207, 0.952);
  text-align: center;
}
@media only screen and (max-width: 960px) {
  .cookie-law-div {
    height: 140px;
    font-size: 12px;
  }
}
</style>
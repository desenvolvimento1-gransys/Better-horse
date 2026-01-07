
<template>
  <div class="payments-footer-session">
    <img
      v-for="card in layout.footer.paymentSession.cards"
      :key="card.id"
      :class="card.class"
      :style="card.style"
      :src="card.src"
      alt="Logo do cartao aceito"
    />
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


<style scoped>
.payments-footer-session img {
  width: 45px !important;
}
</style>;
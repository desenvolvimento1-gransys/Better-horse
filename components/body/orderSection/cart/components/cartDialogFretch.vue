<template>
  <span v-if="this.config.FreightCart">
    <div
      class="card-frete"
      v-if="
        totalProductsValue < this.config.minimumValueFretch &&
        totalProductsValue > 0
      "
    >
      <p class="text">
        Faltam apenas R${{
          (this.config.minimumValueFretch - totalProductsValue).toLocaleString(
            "pt-BR",
            {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            }
          )
        }}
        para você garantir FRETE GRÁTIS!
      </p>
    </div>

    <div
      class="card-frete"
      v-if="totalProductsValue >= this.config.minimumValueFretch"
    >
      <p>Parabéns, você acabou de garantir FRETE GRÁTIS 🤩!</p>
    </div>
  </span>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import CartDialog from "./cartDialog.vue";

export default {
  components: {
    CartDialog,
  },
  computed: {
    ...mapGetters("Cart", [
      "productsWithImgUrl",
      "totalAmountInCart",
      "totalProductsValue",
    ]),
    ...mapState("Layouts", ["config"]),
  },
};
</script>
<style scoped>
.card-frete {
  background: #9e0517;
  width: 100%;
  height: auto;
  color: white;
  text-align: center;
  font-size: 16px;
}

@media screen and (max-width: 800px) {
  .card-frete {
    font-size: 14px;
  }
}
@media screen and (max-width: 700px) {
  .card-frete {
    font-size: 12px;
  }
}
@media screen and (max-width: 600px) {
  .card-frete {
    font-size: 14px;
  }
}

@media screen and (max-width: 500px) {
  .card-frete {
    font-size: 13px;
  }
}
@media screen and (max-width: 380px) {
  .card-frete {
    font-size: 11px;
  }
}
</style>
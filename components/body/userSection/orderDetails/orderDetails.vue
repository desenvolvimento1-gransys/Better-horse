<template>
  <v-container>
    <span v-if="orderDetails.buy">
      <stepper />
      <delivery-details />
      <products-details />
    </span>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import DeliveryDetails from "./components/deliveryDetailsDefault.vue";
import ProductsDetails from "./components/productsDetailsDefault.vue";
import stepper from "./components/stepperDefault.vue";
export default {
  components: {
    stepper,
    DeliveryDetails,
    ProductsDetails,
  },
  computed: {
    ...mapState("Order", ["orderDetails"]),
    orderId: Number,
  },
  methods: {
    ...mapActions("Order", ["setOrderDetails"]),
  },
  beforeMount() {
    this.setOrderDetails({ orderId: this.$route.params.buyId });
  },
};
</script>

<style>
</style>
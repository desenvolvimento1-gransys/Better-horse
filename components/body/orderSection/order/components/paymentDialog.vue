<template>
  <v-row class="dialog-payment-div">
    <v-col cols="12">
      <span v-if="errors" id="errors">
        <v-row justify="center">
          <v-col align="center" cols="12">
            <h3>Ooooooops.....</h3>
            <p>
              <i class="far fa-grin-beam tired-icon-payment"></i>
            </p>
            <p>Algum campo esta faltando, ou incorreto:</p>
            <p class="red--text" v-for="(item, index) in errors" :key="index">
              {{ item }}
            </p>
            <v-btn @click="remakePayment()" class="btn-go">Corrigir</v-btn>
          </v-col>
        </v-row>
      </span>
      <span v-if="statusPaymentResponse == 100" id="payment-refused">
        <v-row justify="center">
          <v-col align="center" cols="12">
            <h3>Ooooooops.....</h3>
            <p>
              <i class="far fa-tired tired-icon-payment"></i>
            </p>
            <p>Algo deu errado, tente novamente mais tarde !!!</p>
            <v-btn @click="remakePayment()" class="btn-go"
              >Tentar Novamente</v-btn
            >
          </v-col>
        </v-row>
      </span>
      <span v-if="statusPaymentResponse == 7" id="payment-refused">
        <v-row justify="center">
          <v-col align="center" cols="12">
            <h3>Ooooooops.....</h3>
            <p>
              <i class="far fa-tired tired-icon-payment"></i>
            </p>
            <p>Seu pagamento foi recusado</p>
            <v-btn @click="remakePayment()" class="btn-go"
              >Tentar Novamente</v-btn
            >
          </v-col>
        </v-row>
      </span>
      <span v-if="paymentSpinner" id="loader">
        <v-row align="center" justify="center">
          <v-col align="center" cols="10">
            <h3>Pagamento sendo Processado</h3>
            <v-progress-circular
              size="60"
              indeterminate
              color="primary"
            ></v-progress-circular>
            <p>Isso pode levar alguns segundos ...</p>
          </v-col>
        </v-row>
      </span>
      <!-- <v-btn @click="remakePayment()" class="btn-go">Tentar Novamente</v-btn> -->
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState("Payment", [
      "paymentSpinner",
      "statusPaymentResponse",
      "errors",
    ]),
  },
  methods: {
    ...mapActions("Payment", [
      "cleanPaymentStatus",
      "remakePayment",
      "cleanErrors",
    ]),
  },
  beforeDestroy: function () {
    this.cleanPaymentStatus();
    this.cleanErrors();
  },
};
</script>

<style scoped>
.dialog-payment-div {
  background-color: white !important;
}

.dialog-payment-div h3 {
  margin-bottom: 100px;
}

.dialog-payment-div p {
  margin-top: 30px;
}

.tired-icon-payment {
  font-size: 100px !important;
}
</style>
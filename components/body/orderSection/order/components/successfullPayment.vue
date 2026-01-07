<template>
  <div style="width: 100%">
    <v-row justify="center">
      <v-col
        justify="center"
        v-if="paymentMethod == 'pix' || pixQrCode !== null"
        cols="12"
        align="center"
      >
        <finish-pix-payment />
      </v-col>
      <v-col
        v-if="paymentMethod !== 'pix' && paymentMethod !== 'boleto'"
        align="center"
        cols="12"
      >
        <div class="successfull-payment-div">
          <span id="successfull-payment" v-if="statusPaymentResponse == 2">
            <v-row justify="center">
              <v-col align="center" cols="12">
                <i class="fas fa-check-circle check-payment-succesfull"></i>
                <!-- <i class="fas fa-check"></i> -->
                <h1>Seu pagamento foi efetuado com sucesso !!!</h1>
                <h2 class="mt-5 mb-5">
                  O número do Pedido é : #{{ this.$route.params.buyId }}
                </h2>
                <p class="mb-5 mt-5">
                  Estamos trabalhando na separação da sua encomenda ...
                </p>
                <i style="font-size: 50px" class="fas fa-box-open mb-5"></i>
                <br />
                <v-btn
                  to="/"
                  :style="layout.payment.backToBuys.style"
                  :class="layout.payment.backToBuys.class"
                  >Voltar à Loja</v-btn
                >
              </v-col>
            </v-row>
          </span>
          <div id="payment-in-analyse" v-if="statusPaymentResponse == 1 && !pixQrCode">
            <v-row justify="center">
              <v-col align="center" cols="12">
                <i class="far fa-clock check-payment-succesfull"></i>
                <!-- <i class="fas fa-check"></i> -->
                <h1>Seu pagamento esta em Análise !!!</h1>
                <h2 class="mt-5 mb-5">
                  O número do Pedido é : #{{ this.$route.params.buyId }}
                </h2>
                <p class="mb-5 mt-5">
                  Assim que for confirmado o pagamento, sua encomenda será
                  postada ...
                </p>
                <!-- <i style="font-size: 50px;" class="fas fa-box-open mb-5"></i> -->
                <br />
                <v-btn
                  to="/"
                  :style="layout.payment.backToBuys.style"
                  :class="layout.payment.backToBuys.class"
                  >Voltar à Loja</v-btn
                >
              </v-col>
            </v-row>
          </div>
          <div id="payment-in-analyse" v-if="statusPaymentResponse == 7">
            <v-row justify="center">
              <v-col align="center" cols="12">
              <br>
                <img src="/static/error.png" />
                <h1>Seu pagamento foi recusado</h1>
                <h2 class="mt-5 mb-5">
                  O número do Pedido é : #{{ this.$route.params.buyId }}
                </h2>
                <p class="mb-5 mt-5">
                  Seu pagamento foi Recusado, para mais informações entre em contato.
                </p>
                <!-- <i style="font-size: 50px;" class="fas fa-box-open mb-5"></i> -->
                <br />
                <v-btn
                  to="/"
                  :style="layout.payment.backToBuys.style"
                  :class="layout.payment.backToBuys.class"
                  >Voltar à Loja</v-btn
                >
              </v-col>
            </v-row>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import finishPixPayment from "@/components/body/orderSection/order/components/finishPixPayment";

export default {
  components: {
    finishPixPayment,
  },
  data: function () {
    return {

    };
  },
  computed: {
    ...mapState("Payment", [
      "statusPaymentResponse",
      "paymentSlipUrl",
      "paymentMethod",
      "pixQrCode",
    ]),
    ...mapState("Layouts", ["layout"]),
    
  },
  methods: {
    ...mapActions("Payment", ["cleanPaymentStatus", "checkStatusPayment"]),
    
  },
  mounted: async function () {
    // Chama a ação para checar o status do pagamento
    await this.checkStatusPayment({ buy_id: this.$route.params.buyId });



    this.checkStatusPayment({ buy_id: this.$route.params.buyId });


    // if (this.$route.path.includes('/pedido/status-pagamento/')) {

    //   const purchaseItems = this.$store.state.GoogleTagEvents.purchaseItems; 
    //   // console.log('Itens no estado:', purchaseItems);

    //   // if (purchaseItems && purchaseItems.length > 0) {
    //     console.log('Chamando a ação purchase...');
    //     this.$store.dispatch('GoogleTagEvents/purchase')
    //       .then(() => {
    //         // Após enviar o evento, limpa os dados do state
    //         this.$store.commit('GoogleTagEvents/SET_PURCHASE_ITEMS', []);
    //         console.log('Dados de compra enviados e state limpo.');
    //       })
    //       .catch(error => {
    //         console.error('Erro ao enviar evento purchase:', error);
    //       });
    //   // }
    // }
  },
  beforeDestroy: function () {
    this.cleanPaymentStatus();
  },
};
</script>


<style scoped>
.check-payment-succesfull {
  margin: 15px 0 30px 0;
  font-size: 110px !important;
  color: green !important;
}

.successfull-payment-div {
  border: solid black 1px;
  margin: 40px;
  padding: 0 20px 50px 20px;
  /* margin-left: 25vh; */
}

@media only screen and (max-width: 600px) {
  /* .check-payment-succesfull{
  
} */
  .successfull-payment-div {
    border: solid black 1px;
    margin: 5px;
    padding: 0 0 50px 0;
    /* width: 100%; */
  }

  .successfull-payment-div h1 {
    font-size: 22px;
  }

  .successfull-payment-div h2 {
    font-size: 18px;
  }
}
</style>
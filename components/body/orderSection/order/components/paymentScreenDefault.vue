<template>
  <div v-if="formData && buyValue">
    <div>
      <v-row class="px-3" justify="center">
        <v-col
          class="form-classes-payment px-2"
          cols="11"
          sm="8"
          md="4"
          align="center"
        >
          <h1>Formas de Pagamento</h1>
          <v-row class="ml-3" justify="center">
            <v-col cols="12" justify="center" align="center">
              <v-radio-group v-model="paymentMethod" row mandatory>
                <v-radio
                  v-if="config.paymentMethods.creditCard"
                  style="font-weight: bold"
                  label="Cartão de Crédito"
                  value="card"
                ></v-radio>
                <v-radio
                  v-if="config.paymentMethods.pix"
                  style="font-weight: bold"
                  label="Pix"
                  value="pix"
                ></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
          <span v-if="paymentMethod == 'pix'">
            <pix-payment />
          </span>
          <span v-if="paymentMethod == 'card'">
            <h2 class="mb-5 ml-5 text-left">
              <span class="mdi mdi-credit-card" />
              Cartão de Crédito
            </h2>
            <payment-card
              class="card-animation-session"
              :back="cvv"
              :data="formData"
            ></payment-card>
            <v-row class="mt-5" justify="center">
              <v-col cols="11" align="center">
                <v-text-field
                  dense
                  v-model="formData.card_number"
                  :color="layout.payment.input.color"
                  label="Numero Cartão"
                  background-color="white"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="11" align="center">
                <v-text-field
                  dense
                  v-model="formData.card_holder"
                  :color="layout.payment.input.color"
                  label="Nome impresso Cartão"
                  background-color="white"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row class="no-padding" justify="center">
              <v-col align="start" sm="4" cols="4" class="no-padding">
                <v-select
                  v-model="formData.expiration_month"
                  :items="months"
                  item-value="value"
                  item-text="value"
                  :color="layout.payment.input.color"
                  label="Mês Validade"
                  dense
                  background-color="white"
                  class="form-paymente-inputs"
                ></v-select>
              </v-col>
              <v-col sm="4" cols="4" class="no-padding">
                <v-select
                  dense
                  v-model="formData.expiration_year"
                  :items="getYearsToDateUntil()"
                  item-value="value"
                  item-text="value"
                  :color="layout.payment.input.color"
                  label="Ano Validade"
                  background-color="white"
                  class="form-paymente-inputs"
                ></v-select>
              </v-col>
              <v-col cols="3" class="no-padding">
                <v-text-field
                  @focus="cvv = true"
                  @focusout="cvv = false"
                  dense
                  v-model="formData.card_security_code"
                  :color="layout.payment.input.color"
                  label="CVV"
                  class="form-paymente-inputs"
                  background-color="white"
                ></v-text-field>
              </v-col>
              <v-row justify="center">
                <v-col cols="11" align="center">
                  <v-select
                    dense
                    v-model="formData.installments"
                    @input="selectedInstallment = formData.installments"
                    :items="installments"
                    item-value="installments"
                    item-text="valueInstallment"
                    :color="layout.payment.input.color"
                    label="Forma Pagamento"
                    background-color="white"
                    class="form-paymente-inputs"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col v-if="sendType !== 'retirada'" cols="11">
                  <v-switch
                    :color="layout.payment.input.color"
                    v-model="formData.delivery_diferent_billing"
                    class="ma-1"
                    label="Endereço de entrega é diferente da cobrança da Fatura"
                  ></v-switch>
                </v-col>
                <span v-else v-show="false">{{
                  (formData.delivery_diferent_billing = true)
                }}</span>
                <v-col cols="11">
                  <v-row v-show="formData.delivery_diferent_billing">
                    <v-col cols="12">
                      <!-- <hr /> -->
                      <p class="text-left">Endereço Cobrança Fatura</p>
                    </v-col>
                    <v-col class="payment-card-col" cols="12" sm="3">
                      <v-text-field
                        dense
                        @keyup="apiCep()"
                        v-model="formData.billing_zipcode"
                        type="text"
                        :color="layout.payment.input.color"
                        label="Cep"
                      ></v-text-field>
                    </v-col>
                    <v-col class="payment-card-col" cols="12" sm="6">
                      <v-text-field
                        dense
                        v-model="formData.billing_street"
                        :color="layout.payment.input.color"
                        label="Rua"
                      ></v-text-field>
                    </v-col>
                    <v-col class="payment-card-col" sm="3" cols="12">
                      <v-text-field
                        dense
                        v-model="formData.billing_number"
                        type="number"
                        :color="layout.payment.input.color"
                        label="Número"
                      ></v-text-field>
                    </v-col>
                    <v-col class="payment-card-col" sm="8" cols="12">
                      <v-text-field
                        dense
                        v-model="formData.billing_neighborhood"
                        :color="layout.payment.input.color"
                        label="Bairro"
                      ></v-text-field>
                    </v-col>
                    <v-col class="payment-card-col" cols="12" sm="3">
                      <v-text-field
                        dense
                        v-model="formData.billing_city"
                        :color="layout.payment.input.color"
                        label="Cidade"
                      ></v-text-field>
                    </v-col>
                    <v-col class="payment-card-col" cols="12" sm="3">
                      <v-text-field
                        dense
                        v-model="formData.billing_state"
                        :color="layout.payment.input.color"
                        label="Estado"
                      ></v-text-field>
                    </v-col>
                    <v-col class="payment-card-col" cols="12" sm="4">
                      <v-text-field
                        dense
                        v-model="formData.billing_complement"
                        :color="layout.payment.input.color"
                        label="Complemento"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-col cols="10">
                <v-text-field
                  v-model="discountCoupon"
                  :color="layout.payment.input.color"
                  label="Cupom de Desconto"
                ></v-text-field>
              </v-col>
              <span v-if="couponError" class="red--text">{{
                couponError
              }}</span>
              <v-col cols="10">
                <v-btn
                  v-if="!discountCoupon"
                  :style="layout.payment.payBtn.style"
                  :class="layout.payment.payBtn.class"
                  @click="payBuy(formData)"
                  >Fazer Pagamento</v-btn
                >
                <v-btn
                  @click="
                    addDiscountToBuy({
                      code: discountCoupon,
                    })
                  "
                  :style="layout.payment.payBtn.style"
                  :class="layout.payment.payBtn.class"
                  v-else
                  >Calcular Desconto</v-btn
                >
              </v-col>
            </v-row>
          </span>
        </v-col>
        <v-col class="form-classes-payment" sm="8" md="5" cols="11">
          <h2 class="mb-5 ml-5 text-left">
            <i class="mdi mdi-calendar-check"></i> Detalhes
          </h2>
          <order-resume :buy_id="this.$route.params.orderId"></order-resume>
        </v-col>
      </v-row>
    </div>
    <v-dialog v-model="paymentDialogState" persistent max-width="600px">
      <payment-dialog v-if="paymentDialogState" />
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import PaymentDialog from "@/components/body/orderSection/order/components/paymentDialog";
import PaymentCard from "@/components/body/orderSection/order/components/creditCard.vue";
import OrderResume from "@/components/body/orderSection/order/components/orderResume.vue";
import PixPayment from "@/components/body/orderSection/order/components/pixComponent";

export default {
  watch: {
    buyValue: function () {
      this.getInstallments();
    },
  },
  components: {
    PaymentDialog,
    PaymentCard,
    OrderResume,
    PixPayment,
  },
  data: function () {
    return {
      paymentMethod: "",
      showInstallmentComponent: true,
      installments: [],
      AddressDifferentDelivery: false,
      cvv: false,
      ipAddress: null,
      formData: {
        billing_street: null,
        billing_city: null,
        billing_state: null,
        billing_zipcode: null,
        billing_number: null,
        billing_neighborhood: null,
      },
    };
  },
  computed: {
    ...mapState("Payment", [
      "brands",
      "months",
      "buyValue",
      "paymentDialogState",
      "sendType",
      "couponError",
      "paymentInformation",
    ]),
    ...mapGetters("Product", ["installmentResult"]),
    ...mapState("Order", ["resumeList"]),
    ...mapState("Layouts", ["layout", "config"]),
    selectedInstallment: {
      get() {
        return this.$store.state.Payment.selectedInstallment;
      },
      set(value) {
        this.$store.commit("Payment/SET_SELECTEDINSTALLMENT", value);
      },
    },
    discountCoupon: {
      get() {
        return this.$store.state.Payment.discountCoupon;
      },
      set(value) {
        this.$store.commit("Payment/SET_DISCOUNTCOUPON", value);
      },
    },
  },
  methods: {
    ...mapActions("Payment", [
      "checkTotalBuyValue",
      "cleanBuyValue",
      "finishPayment",
      "cleanSendType",
      "remakePayment",
      "addDiscountToBuy",
      "cleanDiscountCoupon",
      "setDiscountCoupon",
    ]),
    apiCep() {
      let zipCode = null;
      if (this.formData.billing_zipcode) {
        zipCode = this.formData.billing_zipcode.replace(/\.|\-/g, "");
      }
      if (this.formData.billing_zipcode && zipCode.length >= 8) {
        $nuxt.$nextTick(() => {
          $nuxt.$loading.start();
        });
        let data = {};
        this.$viaCep
          .buscarCep(zipCode)
          .then((obj) => {
            (this.formData.billing_city = obj.localidade),
              (this.formData.billing_state = obj.uf),
              (this.formData.billing_street = obj.logradouro),
              (this.formData.billing_neighborhood = obj.bairro);
          })
          .finally(() => {
            $nuxt.$nextTick(() => {
              $nuxt.$loading.finish();
            });
          });
      }
    },
    getYearsToDateUntil() {
      let years = [];
      let year = new Date().getFullYear();
      for (
        var i = new Date().getFullYear();
        i < new Date().getFullYear() + 30;
        i++
      ) {
        years.push(i);
      }
      return years;
    },
    getInstallments() {
      this.showInstallmentComponent = false;
      let stallments = [];
      let checkDiscount = null;
      let valueToCalculate = this.installmentResult(this.buyValue)[0] + 1;
      for (var i = 1; i < valueToCalculate; i++) {
        checkDiscount = this.aplyRule(i, this.buyValue);
        if (checkDiscount[0] !== 0) {
          stallments.push({
            installments: i,
            valueInstallment:
              i +
              " x R$ " +
              (checkDiscount[3] / i).toLocaleString("pt-BR", {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              }) +
              ` Com ${parseFloat(checkDiscount[2])}% de ${checkDiscount[1]}`,
          });
        } else {
          stallments.push({
            installments: i,
            valueInstallment:
              i +
              " x R$ " +
              (this.buyValue / i).toLocaleString("pt-BR", {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              }),
          });
        }
      }
      this.installments = stallments;
      this.showInstallmentComponent = true;
    },
    aplyRule(installments, value) {
      // return 10;
      let rules = [];
      let rule = [];
      let valueToPay = value;
      if (this.paymentInformation.rules) {
        rules = this.paymentInformation.rules.filter((data) => {
          return data.payment_type === 0;
        });
        rule = rules.filter((data) => {
          return data.installments === installments;
        });
      }
      if (rule[0]) {
        let valuePercentRate =
          (rule[0].rate / 100) * this.paymentInformation.productsValue;
        let operation = null;
        if (rule[0].rule_type === 0) {
          operation = "Desconto";
          valueToPay = value - valuePercentRate;
        } else {
          operation = "Juros";
          valueToPay = value + valuePercentRate;
        }
        return [valuePercentRate, operation, rule[0].rate, valueToPay];
      } else {
        return [0, null, null, valueToPay];
      }
    },
    payBuy(payload) {
      if (this.formData.delivery_diferent_billing == true) {
        this.formData.delivery_diferent_billing = 1;
      } else {
        this.formData.delivery_diferent_billing = 0;
      }
      let data = {
        costumer_ip_address: this.ipAddress,
        buy_id: this.$route.params.orderId,
        card_expiration_date:
          this.formData.expiration_month + "/" + this.formData.expiration_year,
        ...payload,
      };
      this.finishPayment(data);
    },
  },
  mounted() {
    fetch("https://api.ipify.org?format=json")
      .then((x) => x.json())
      .then(({ ip }) => {
        this.ipAddress = ip;
      });
    this.checkTotalBuyValue({ buy_id: this.$route.params.orderId });
  },
  beforeDestroy: function () {
    this.remakePayment();
    this.cleanBuyValue();
    this.cleanSendType();
    this.cleanDiscountCoupon();
  },
};
</script>

<style scoped>
.form-classes-payment {
  border: solid rgba(128, 128, 128, 0.541) 1px;
  border-radius: 8px;
  margin: 20px;
  height: 100%;
}
.form-payment-class {
  margin-top: 30px;
  padding: 10px 10px 0 0;
  border-left: solid 2px black;
}
.form-paymente-inputs {
  padding: 4px;
  /* background-color: white;
  min-height: 45px; */
  border-radius: 5px;
  /* width: 100%; */
}
</style>
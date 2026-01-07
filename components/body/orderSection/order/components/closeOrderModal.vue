<template>
  <v-dialog
    style="overflow-x: hidden"
    width="800"
    v-model="closeOrderModal"
    @click:outside="setCloseOrderModal(false)"
  >
    <register-address :title="registerTitle" v-if="registerNewAddress" />
    <v-card style="padding: 10px; overflow-x: hidden" v-else>
      <v-row no-gutters>
        <v-col cols="10" sm="11" align="left">
          <h3>Confirme os dados:</h3>
        </v-col>
        <v-col cols="1" align="center">
          <v-btn icon @click="setCloseOrderModal(false)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <h1></h1>
      <modal-spinner style="overflow-x: hidden">
        <v-row>
          <v-col cols="12">
            <small>Endereço Entrega</small>
            <v-select
              :color="layout.payment.closeOrderModal.input.color"
              v-show="list.length > 0"
              dense
              single-line
              item-value="id"
              v-model="sendAddressId"
              :items="list"
            >
              <template v-slot:item="{ item }">
                {{
                  `${item.street} - ${item.number}, ${item.neighborhood} - ${item.city}/${item.state}`
                }}
              </template>
              <template v-slot:selection="{ item }">
                {{
                  `${item.street} - ${item.number}, ${item.neighborhood} - ${item.city}/${item.state}`
                }}
              </template>
            </v-select>
            <v-btn
              @click="setRegisterNewAddress(!registerNewAddress)"
              rounded
              v-show="!registerNewAddress"
              :style="layout.payment.closeOrderModal.addressBtn.style"
              >cadastrar endereço</v-btn
            >
            <v-radio-group v-model="deliveryType">
              <span v-for="(item, index) in deliveryList" :key="index">
                <v-radio
                  :color="layout.payment.closeOrderModal.input.color"
                  :value="item.type"
                >
                  <template v-slot:label>
                    <span>{{ item.text }}</span>
                  </template>
                </v-radio>
              </span>
            </v-radio-group>
          </v-col>
          <v-col cols="12">
            <p v-if="list < 1" class="red--text">
              *Para finalizar a compra cadastre um endereço !!!
            </p>
          </v-col>
          <v-col cols="12" align="center">
            <v-btn
              :style="layout.payment.closeOrderModal.buyBtn.style"
              :disabled="!deliveryType"
              @click="createBuy()"
              >Finalizar Compra</v-btn
            >
            <p v-if="!deliveryType" class="red--text">
              *Para Finalizar selecione o tipo de entrega !!
            </p>
          </v-col>
        </v-row>
      </modal-spinner>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import ModalSpinner from "@/components/utils/modalSpinner";
import RegisterAddress from "@/components/body/userSection/account/components/addresses/registerAddressDefault";

export default {
  data: function () {
    return {
      registerTitle: "Cadastrar novo Endereço",
    };
  },
  watch: {
    sendAddressId: function () {
      let selected = this.list.filter((item) => {
        return item.id === this.sendAddressId;
      });
      this.checkDelivery(selected[0].cep);
    },
    list: function () {
      if (this.list.length > 0) {
        let arrayNum = this.list.length - 1;
        this.sendAddressId = this.list[arrayNum].id;
      } else {
        this.setRegisterNewAddress(true);
        this.registerTitle = "Para finalizar a Compra, cadastre um endereço";
      }
    },
  },
  components: {
    ModalSpinner,
    RegisterAddress,
  },
  computed: {
    ...mapGetters("Delivery", ["deliveryList"]),
    ...mapState("Order", ["closeOrderModal"]),
    ...mapState("Addressess", ["list"]),
    ...mapState("Addressess", ["registerNewAddress"]),
    ...mapState("Layouts", ["layout"]),
    sendAddressId: {
      get() {
        return this.$store.state.Order.sendAddressId;
      },
      set(value) {
        this.$store.commit("Order/SET_SENDADDRESSID", value);
      },
    },
    deliveryType: {
      get() {
        return this.$store.state.Delivery.deliveryType;
      },
      set(value) {
        this.$store.commit("Delivery/SET_DELIVERYTYPE", value);
      },
    },
  },
  methods: {
    ...mapActions("Order", ["setCloseOrderModal", "setAddressId"]),
    ...mapActions("Delivery", ["checkDelivery"]),
    ...mapActions("Addressess", ["setRegisterNewAddress"]),
    ...mapActions("Buy", ["createBuy"]),
  },
  mounted() {
    if (this.list.length < 1) {
      this.setRegisterNewAddress(true);
      this.registerTitle = "Para finalizar a Compra, cadastre um endereço";
    }
  },
};
</script>

<style>
</style>
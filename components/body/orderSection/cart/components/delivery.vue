<template>
  <span>
    <cart-dialog />
    <p
      :style="layout.cart.cartScreen.resume.freight.style"
      :class="layout.cart.cartScreen.resume.freight.class"
    >
      Frete:
    </p>
    <span v-if="spinner">
      <v-progress-circular :size="50" indeterminate></v-progress-circular>
    </span>
    <span v-else>
      <span>
        <v-text-field
          type="text"
          v-model="cep"
          @input="checkDelivery(cep)"
          :color="layout.cart.cartScreen.resume.freight.input.color"
          label="CEP"
        ></v-text-field>
        <a
          :style="layout.cart.cartScreen.resume.freight.checkCepLink.style"
          target="_blank"
          :href="config.externalSites.correios"
          >{{ layout.cart.cartScreen.resume.freight.checkCepLink.text }}</a
        >
      </span>
      <span>
        <!-- <p v-if="sendAddress"><strong>Entrega em: </strong> {{ sendAddress }}</p> -->
        <v-radio-group v-model="deliveryType">
          <span v-for="(item, index) in deliveryList" :key="index">
            <v-radio
              :color="layout.cart.cartScreen.resume.freight.input.color"
              :class="layout.cart.cartScreen.resume.freight.radioGroup.class"
              :value="item.type"
            >
              <template v-slot:label v-if="item.type == 'fob'">
                <span
                  :style="
                    layout.cart.cartScreen.resume.freight.radioGroup.style
                  "
                  >{{ item.text }}</span
                >
              </template>

              <template v-slot:label v-else>
                <span
                  :style="
                    layout.cart.cartScreen.resume.freight.radioGroup.style
                  "
                  >{{ item.text }}</span
                >
              </template>
            </v-radio>
          </span>
        </v-radio-group>
        <div v-for="(item, index) in deliveryList" :key="index">
          <div
            v-if="
              fobOptions.addFreightByTheBuyeinDelivery && item.type == 'fob'
            "
            style="position: relative; bottom: 130px; left: 180px"
            class="text-fob"
          >
            <v-col>
              <span
                v-if="fobOptions.AddtextFreightByFOBinDelivery"
                class="txt-freight-buyer"
                style="font-size: 12px"
                >{{ fobOptions.addTextFobinDelivery }}</span
              >
              <br />
              <a
                v-if="fobOptions.buttonFreightByTheBuyer"
                target="_blank"
                :href="whattsLink"
                class="button-link"
                style="color: red; font-weight: bold; font-size: 12px"
              >
                {{ fobOptions.textButtonFreightByTheBuyer }}
              </a>
            </v-col>
          </div>
        </div>
      </span>
    </span>
  </span>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import cartDialog from "@/components/body/orderSection/cart/components/cartDialogFretch";

export default {
  components: {
    cartDialog,
  },
  data: function () {
    return {
      showForm: true,
      cep: null,
      sendAddress: null,
      whattsLink: null,
    };
  },
  watch: {
    sendAddressId: function () {
      let selected = this.list.filter((item) => {
        return item.id === this.sendAddressId;
      });
      this.cep = selected[0].cep;
    },
    list: function () {
      if (this.list.length > 0) {
        let arrayNum = this.list.length - 1;
        this.cep = this.list[arrayNum].cep;
        this.checkDelivery(this.cep);
      }
    },
  },
  methods: {
    ...mapActions("Delivery", ["checkDelivery"]),
    ...mapActions("Addressess", ["setList"]),
  },
  computed: {
    deliveryType: {
      get() {
        return this.$store.state.Delivery.deliveryType;
      },
      set(value) {
        this.$store.commit("Delivery/SET_DELIVERYTYPE", value);
      },
    },
    ...mapGetters("Delivery", ["deliveryList"]),
    ...mapGetters("Cart", ["totalProductsValue"]),
    ...mapState("Layouts", ["config", "layout", "fobOptions"]),
    ...mapState("Delivery", ["consult", "spinner"]),
    ...mapState("Addressess", ["list"]),
    ...mapState("Order", ["sendAddressId"]),
  },
  beforeMount() {
    this.setList();
  },
  mounted() {
    this.whattsLink = `${this.layout.floatingIcon.link}&text=Olá, gostaria de cotar o frete do pedido: ${this.$route.params.buyId}`;
  },
};
</script>

<style>
.card-frete {
  background: #7a0a18;
  width: 100%;
  height: auto;
  color: white;
  text-align: center;
  margin-top: -15px;
  line-height: 45px;
}

@media screen and (max-width: 640px) {
  .text-fob {
    left: 170px !important;
  }
}
@media screen and (max-width: 370px) {
  .button-link {
    font-size: 10px !important;
  }
}

@media screen and (max-width: 344px) {
  .text-fob {
    left: 165px !important;
    bottom: 135px !important;
  }
  .button-link {
    font-size: 8px !important;
  }
}
</style>
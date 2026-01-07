<template>
  <span v-if="resumeList[0]">
    <v-data-table
      disable-sort
      calculate-widths
      hide-default-footer
      light
      class="close-order-table"
      :headers="headers"
      :items="resumeList"
    ></v-data-table>
    <v-card class="card-order-resume">
      <v-container>
        <v-row align="end">
          <v-col class="no-margin" sm="9" cols="8">
            <strong class="text-sizing">Subtotal: </strong>
          </v-col>
          <v-col class="no-margin" sm="3" cols="4">
            R$
            <span v-if="resumeList[0].discount_value">
              {{
                (
                  parseFloat(resumeList[0].products_value) +
                  parseFloat(resumeList[0].discount_value)
                ).toLocaleString("pt-BR", {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })
              }}
            </span>
            <span v-else>
              {{
                parseFloat(resumeList[0].products_value).toLocaleString(
                  "pt-BR",
                  {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  }
                )
              }}
            </span>
          </v-col>
          <v-col
            v-if="
              paymentInformation.rules[selectedInstallment - 1] &&
              paymentInformation.rules[selectedInstallment - 1].rate
            "
            class="no-margin text-sizing"
            cols="8"
            sm="9"
          >
            <strong class=""
              >Desconto <span v-if="selectedInstallment == 1"> À Vista</span
              ><span v-else> em {{ selectedInstallment }}x</span>:</strong
            >
          </v-col>
          <v-col
            v-if="
              paymentInformation.rules[selectedInstallment - 1] &&
              paymentInformation.rules[selectedInstallment - 1].rate
            "
            class="no-margin"
            cols="4"
            sm="3"
          >
            R$ -{{
              parseFloat(
                resumeList[0].products_value *
                  (paymentInformation.rules[selectedInstallment - 1].rate / 100)
              ).toLocaleString("pt-BR", {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              })
            }}
          </v-col>
          <v-col
            v-show="
              resumeList[0].discount_value &&
              parseFloat(resumeList[0].discount_value) > 0
            "
            class="no-margin"
            cols="8"
            sm="9"
          >
            <strong class="text-sizing">Desconto Cupom:</strong>
          </v-col>
          <v-col
            v-show="
              resumeList[0].discount_value &&
              parseFloat(resumeList[0].discount_value) > 0
            "
            class="no-margin"
            cols="4"
            sm="3"
          >
            R$ -{{
              parseFloat(resumeList[0].discount_value).toLocaleString("pt-BR", {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              })
            }}
          </v-col>
          <v-col class="no-margin" cols="8" sm="9">
            <strong v-if="resumeList[0].delivery_price" class="text-sizing"
              >Frete:</strong
            >
          </v-col>
          <v-col
            v-if="
              resumeList[0].delivery_price && resumeList[0].send_type !== 'fob'
            "
            class="no-margin"
            cols="4"
            sm="3"
          >
            R$
            {{
              parseFloat(resumeList[0].delivery_price).toLocaleString("pt-BR", {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              })
            }}
          </v-col>

          <v-col v-else class="no-margin" cols="4" sm="3">
            <a
              :href="whattsLink"
              target="_blank"
              style="color: red; font-weight: bold; text-decoration: none"
              >FOB</a
            >
          </v-col>
          <v-col class="no-margin" cols="12">
            <p />
            <hr />
            <p />
          </v-col>
          <v-col class="no-margin" cols="8" sm="9">
            <strong class="">Total:</strong>
          </v-col>
          <!-- TODO Aplicar desconto no total de acordo com o parcelamento (1x - 2x) -->
          <v-col
            v-if="
              paymentInformation.rules[selectedInstallment - 1] &&
              paymentInformation.rules[selectedInstallment - 1].rate
            "
            class="no-margin"
            cols="4"
            sm="3"
          >
            <strong>
              R$
              {{
                (
                  parseFloat(resumeList[0].products_value) -
                  resumeList[0].products_value *
                    (paymentInformation.rules[selectedInstallment - 1].rate /
                      100) +
                  parseFloat(resumeList[0].delivery_price)
                ).toLocaleString("pt-BR", {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })
              }}
            </strong>
          </v-col>
          <v-col v-else class="no-margin" cols="4" sm="3">
            <strong>
              R$
              {{
                (
                  parseFloat(resumeList[0].products_value) +
                  parseFloat(resumeList[0].delivery_price)
                ).toLocaleString("pt-BR", {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })
              }}
            </strong>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </span>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  props: {
    buy_id: String,
  },
  data: function () {
    return {
      whattsLink: null,
      headers: [
        { text: "Qtd", value: "amount" },
        { text: "Nome", value: "name" },
        { text: "Valor Uni.", value: "total_price" },
      ],
    };
  },
  computed: {
    ...mapState("Order", ["resumeList"]),
    ...mapState("Payment", ["paymentInformation", "selectedInstallment"]),
    ...mapState("Layouts", ["config", "layout", "fobOptions"]),
  },
  methods: {
    ...mapActions("Order", ["cleanOrderResume", "setOrderResume"]),
  },
  mounted() {
    this.setOrderResume({ buy_id: this.buy_id });
    this.whattsLink = `${this.layout.floatingIcon.link}`;
  },
  beforeDestroy: function () {
    this.cleanOrderResume();
  },
};
</script>

<style scoped>
.card-order-resume {
  margin-top: 30px;
  padding: 10px !important;
}

@media only screen and (max-width: 600px) {
  .text-sizing {
    font-size: 14px;
  }
}
</style>
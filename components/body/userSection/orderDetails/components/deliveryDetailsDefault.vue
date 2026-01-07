<template>
  <span>
    <v-row>
      <v-col
        :cols="layout.orderDetails.deliveryDetails.delivery.cols"
        :md="layout.orderDetails.deliveryDetails.delivery.md"
      >
        <v-card
          v-if="orderDetails.delivery"
          :style="layout.orderDetails.deliveryDetails.delivery.style"
        >
          <v-toolbar
            dense
            tile
            elevation="0"
            :style="layout.orderDetails.deliveryDetails.delivery.title.style"
          >
            <h3 class="d-block d-md-none">Entrega</h3>
            <h2 class="d-none d-md-block">Entrega</h2>
          </v-toolbar>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <p>
                  <strong>Cep:</strong>
                  {{ orderDetails.delivery.cep }}
                </p>
                <p>
                  <strong>Endereço:</strong>
                </p>
                <p>
                  {{ orderDetails.delivery.street }} -
                  {{ orderDetails.delivery.number }},
                  {{ orderDetails.delivery.city }}/{{
                    orderDetails.delivery.state
                  }}
                </p>
              </v-col>
              <v-col cols="12" sm="6">
                <p>
                  <strong>Valor:</strong>
                  R$
                  {{
                    orderDetails.buy.delivery_price.toLocaleString("pt-BR", {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2,
                    })
                  }}
                </p>
                <p>
                  <strong>Tipo de envio:</strong>
                  {{ orderDetails.buy.send_type }}
                </p>
                <p v-if="orderDetails.buy.delivery_code">
                  <strong>Codigo Rastreio:</strong>
                  {{ orderDetails.buy.delivery_code }}
                </p>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
        <v-card
          :style="layout.orderDetails.deliveryDetails.delivery.style"
          v-else
        >
          <v-toolbar
            dense
            tile
            elevation="0"
            :style="layout.orderDetails.deliveryDetails.delivery.title.style"
          >
            <h3 class="d-block d-md-none">Entrega</h3>
            <h2 class="d-none d-md-block">Entrega</h2>
          </v-toolbar>
          <v-container>
            <p>Retirada Em Loja Física</p>
          </v-container>
        </v-card>
      </v-col>

      <v-col
        :cols="layout.orderDetails.deliveryDetails.pricing.cols"
        :md="layout.orderDetails.deliveryDetails.pricing.md"
      >
        <v-card :style="layout.orderDetails.deliveryDetails.pricing.style">
          <v-toolbar
            dense
            tile
            elevation="0"
            :style="layout.orderDetails.deliveryDetails.pricing.title.style"
          >
            <h3 class="d-block d-md-none">Detalhes</h3>
            <h2 class="d-none d-md-block">Detalhes</h2>
          </v-toolbar>
          <v-container>
            <v-row>
              <v-col>
                <p>
                  <strong>Qtd Produtos:</strong>
                  {{ totalProducts }}
                </p>
                <p>
                  <strong>Valor Produtos:</strong>
                  R$
                  {{
                    parseFloat(orderDetails.buy.products_value).toLocaleString(
                      "pt-BR",
                      {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2,
                      }
                    )
                  }}
                </p>
                <p>
                  <strong>Total:</strong>
                  R$
                  {{
                    (
                      parseFloat(orderDetails.buy.products_value) +
                      parseFloat(orderDetails.buy.delivery_price)
                    ).toLocaleString("pt-BR", {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2,
                    })
                  }}
                </p>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </span>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("Order", ["orderDetails"]),
    ...mapState("Layouts", ["layout"]),
    totalProducts() {
      let amount = this.orderDetails.products.map(function (products) {
        return products.amount;
      });

      let total = amount.reduce(function (acumulator, currentValue) {
        return acumulator + parseFloat(currentValue);
      }, 0);

      return total;
    },
  },
};
</script>

<style>
</style>
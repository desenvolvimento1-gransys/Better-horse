<template>
  <span>
    <div v-if="orderDetails.buy.status < '5'">
      <v-col cols="4" sm="2" align="left">
        <v-btn icon to="/conta/pedidos"
          ><v-icon>mdi-arrow-left-thick</v-icon> Voltar</v-btn
        >
        <p />
      </v-col>
      <v-row no-gutters>
        <v-col cols="12" sm="10">
          <span
            v-if="
              orderDetails.buy.buy_status &&
              orderDetails.buy.buy_status.length < 2
            "
          >
            <h3 class="red--text">* Pagamento pendente !!</h3>
            <v-btn
              @click="
                $nuxt.$router.push({
                  path: `/pedido/pagamento/${orderDetails.buy.id}`,
                })
              "
              :style="layout.orderDetails.stepper.payBtn.style"
              :class="layout.orderDetails.stepper.payBtn.class"
              >Fazer Pagamento do Pedido</v-btn
            >
          </span>
        </v-col>
      </v-row>
      <span>
        <hr class="mb-5" />
      </span>
      <section class="mb-5" id="#progress-timeline">
        <v-stepper vertical class="d-block d-md-none" v-if="orderDetails.buy">
          <v-stepper-step
            :color="layout.orderDetails.stepper.step.color"
            :complete="true"
            step="2"
          >
            Fechamento Pedido
            <small>{{ convertData(1) }}</small>
          </v-stepper-step>

          <v-stepper-step
            :color="layout.orderDetails.stepper.step.color"
            v-if="orderDetails.buy.status > 0"
            :complete="true"
            step="2"
          >
            Pagamento
            <small>{{ convertData(1) }}</small>
          </v-stepper-step>

          <v-stepper-step
            :color="layout.orderDetails.stepper.step.color"
            v-else
            :complete="e1 > 2"
            step="2"
            >Pagamento</v-stepper-step
          >

          <v-stepper-step
            :color="layout.orderDetails.stepper.step.color"
            v-if="orderDetails.buy.status >= 2"
            :complete="true"
            step="2"
          >
            Preparando Envio
            <small>{{ convertData(2) }}</small>
          </v-stepper-step>

          <v-stepper-step
            :color="layout.orderDetails.stepper.step.color"
            v-else
            :complete="e1 > 2"
            step="3"
            >Preparando Envio</v-stepper-step
          >

          <v-stepper-step
            :color="layout.orderDetails.stepper.step.color"
            v-if="orderDetails.buy.status >= 3"
            :complete="true"
            step="2"
          >
            Enviado
            <small>{{ convertData(3) }}</small>
          </v-stepper-step>

          <v-stepper-step
            :color="layout.orderDetails.stepper.step.color"
            v-else
            :complete="e1 > 2"
            step="4"
            >Enviado</v-stepper-step
          >

          <v-stepper-step
            :color="layout.orderDetails.stepper.step.color"
            v-if="orderDetails.buy.status >= 4"
            :complete="true"
            step="5"
          >
            Entregue
            <small>{{ convertData(4) }}</small>
          </v-stepper-step>

          <v-stepper-step
            :color="layout.orderDetails.stepper.step.color"
            v-else
            :complete="e1 > 2"
            step="5"
            >Entregue</v-stepper-step
          >
        </v-stepper>

        <!--  -->

        <v-stepper class="d-none d-md-block" v-if="orderDetails.buy">
          <v-stepper-header>
            <v-stepper-step
              :color="layout.orderDetails.stepper.step.color"
              :complete="true"
              step="2"
            >
              Fechamento Pedido
              <small>{{ convertData(0) }}</small>
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
              :color="layout.orderDetails.stepper.step.color"
              v-if="orderDetails.buy.status > 0"
              :complete="true"
              step="2"
            >
              Pagamento
              <small>{{ convertData(1) }}</small>
            </v-stepper-step>

            <v-stepper-step
              :color="layout.orderDetails.stepper.step.color"
              v-else
              :complete="e1 > 2"
              step="2"
              >Pagamento</v-stepper-step
            >

            <v-divider></v-divider>

            <v-stepper-step
              :color="layout.orderDetails.stepper.step.color"
              v-if="orderDetails.buy.status >= 2"
              :complete="true"
              step="2"
            >
              Preparando Envio
              <small>{{ convertData(2) }}</small>
            </v-stepper-step>

            <v-stepper-step
              :color="layout.orderDetails.stepper.step.color"
              v-else
              :complete="e1 > 2"
              step="3"
              >Preparando Envio</v-stepper-step
            >
            <v-divider></v-divider>
            <v-stepper-step
              :color="layout.orderDetails.stepper.step.color"
              v-if="orderDetails.buy.status >= 3"
              :complete="true"
              step="2"
            >
              Enviado
              <small>{{ convertData(3) }}</small>
            </v-stepper-step>

            <v-stepper-step
              :color="layout.orderDetails.stepper.step.color"
              v-else
              :complete="e1 > 2"
              step="4"
              >Enviado</v-stepper-step
            >
            <v-divider></v-divider>

            <v-stepper-step
              :color="layout.orderDetails.stepper.step.color"
              v-if="orderDetails.buy.status >= 4"
              :complete="true"
              step="5"
            >
              Entregue
              <small>{{ convertData(4) }}</small>
            </v-stepper-step>

            <v-stepper-step
              :color="layout.orderDetails.stepper.step.color"
              v-else
              :complete="e1 > 2"
              step="5"
              >Entregue</v-stepper-step
            >
          </v-stepper-header>
        </v-stepper>
      </section>
    </div>
    <div v-else>
      <v-col cols="4" sm="2" align="left">
        <v-btn icon to="/conta/pedidos"
          ><v-icon>mdi-arrow-left-thick</v-icon> Voltar</v-btn
        >
        <p />
      </v-col>
      <v-card class="mb-5">
        <v-row no-gutters v-if="orderDetails.buy.status == '5'">
          <v-col cols="12" sm="12">
            <v-container>
              <h2 class="red--text text-center">Compra expirada!</h2>
            </v-container>
          </v-col>
        </v-row>
      </v-card>

      <v-card class="mb-5">
        <v-row no-gutters v-if="orderDetails.buy.status == '6'">
          <v-col cols="12" sm="12">
            <v-container>
              <h2 class="red--text text-center">Compra Cancelada!</h2>
            </v-container>
          </v-col>
        </v-row>
      </v-card>

      <v-card class="mb-5">
        <v-row no-gutters v-if="orderDetails.buy.status == '7'">
          <v-col cols="12" sm="12">
            <v-container>
              <h2 class="red--text text-center">Pagamento Recusado!</h2>
            </v-container>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </span>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: function () {
    return {
      e1: false,
    };
  },
  computed: {
    ...mapState("Order", ["orderDetails"]),
    ...mapState("Layouts", ["layout"]),
  },
  methods: {
    convertData(status) {
      // return this.orderDetails.buy.buy_status;

      let response = this.orderDetails.buy.buy_status.filter(function (data) {
        return data.status == status;
      });
      // let response = this.orderDetails.buy.buy_status.filter((item) => {
      //   return item.status === 0;
      // });

      // return response;
      if (response[0]) {
        let dateTime = response[0].created_at.split(" ");
        let date = dateTime[0].split("-");
        let time = dateTime[1].split(":");

        return `${date[2]}/${date[1]}/${date[0]} às ${dateTime[1]}`;
      }
    },
  },
};
</script>

<style>
</style>
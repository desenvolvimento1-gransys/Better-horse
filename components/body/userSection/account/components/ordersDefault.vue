<template>
  <div>
    <v-toolbar
      dense
      :elevation="layout.account.people.title.elevation"
      :style="layout.account.orders.title.style"
      :class="layout.account.orders.title.class"
    >
      <h3 class="d-block d-md-none">{{ layout.account.orders.title.text }}</h3>
      <h2 class="d-none d-md-block">
        {{ layout.account.orders.title.text }}
      </h2>

      <!-- {{ formData }} -->
      <!-- :items="orderHistoric"
      :items-per-page="10" -->
    </v-toolbar>
    <v-data-table
      :headers="headers"
      class="elevation-1"
      :items="orderHistoric"
      :items-per-page="10"
      :header-props="{
        sortByText: 'Ordenar por:',
      }"
      :footer-props="{
        'items-per-page-text': 'Itens por página:',
        'items-per-page-all-text': 'Todos',
      }"
    >
      <template v-slot:item.status="{ item }">
        <v-chip>{{ changeStatusToName(item.status) }}</v-chip>
      </template>
      <template v-slot:item.details="{ item }">
        <v-btn
          :color="layout.account.orders.detailsBtn.color"
          :style="layout.account.orders.detailsBtn.style"
          :class="layout.account.orders.detailsBtn.class"
          @click="$nuxt.$router.push({ path: `/detalhes-pedido/${item.id}` })"
          >Detalhes</v-btn
        >
      </template>
      <template v-slot:no-data>
        <p></p>
        <h2><p>Você ainda não fez nenhum pedido!</p></h2>
        <v-btn
          to="/"
          :color="layout.account.orders.backToBuys.color"
          :style="layout.account.orders.backToBuys.style"
          :class="layout.account.orders.backToBuys.class"
          >Voltar às compras</v-btn
        >
        <p></p
      ></template>
    </v-data-table>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      headers: [
        {
          text: "Numero Pedido",
          align: "center",
          value: "id",
        },
        { text: "Data", align: "center", value: "created_at" },
        { text: "Status", align: "center", value: "status" },
        { text: "Detalhes", align: "center", value: "details" },
      ],
    };
  },
  computed: {
    ...mapState("Layouts", ["config", "layout"]),
    ...mapState("Order", ["orderHistoric", "statusList"]),
  },
  methods: {
    ...mapActions("Order", ["setOrderHistoric"]),
    changeStatusToName(value) {
      let response = this.statusList.filter((response) => {
        return response.status == value;
      });

      if (response[0]) {
        return response[0].name;
      }
    },
  },
  beforeMount() {
    this.setOrderHistoric();
  },
};
</script>

<style>
</style>
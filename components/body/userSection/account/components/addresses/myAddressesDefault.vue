<template>
  <div>
    <v-toolbar
      dense
      :elevation="layout.account.addresses.title.elevation"
      :style="layout.account.addresses.title.style"
      :class="layout.account.addresses.title.class"
    >
      <h3 class="d-block d-md-none">
        {{ layout.account.addresses.title.text }}
      </h3>
      <h2 class="d-none d-md-block">
        {{ layout.account.addresses.title.text }}
      </h2>
    </v-toolbar>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h3>Meus Endereços</h3>
          <p />
          <v-divider :style="layout.account.addresses.divider.style" />
          <span v-for="(item, index) in list" :key="index">
            <p />
            <strong>Endereço: </strong>
            {{ item.street }} - {{ item.number }}, {{ item.neighborhood }} -
            {{ item.city }}/{{ item.state }}
            <span v-if="item.complement">
              <br />
              <strong>Complemento:</strong> {{ item.complement }}
            </span>
            <br />
            <span><strong>Cep:</strong> {{ item.cep }}</span>
            <p />
            <v-divider :style="layout.account.addresses.divider.style" />
          </span>
        </v-col>
      </v-row>
      <v-btn
        @click="setRegisterNewAddress(!registerNewAddress)"
        rounded
        :style="layout.account.addresses.addBtn.style"
        v-show="!registerNewAddress"
        ><v-icon>{{ layout.account.addresses.addBtn.icon }}</v-icon> &nbsp;{{
          layout.account.addresses.addBtn.text
        }}</v-btn
      >

      <register-address title="Cadastrar Endereço" />
    </v-container>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import RegisterAddress from "@/components/body/userSection/account/components/addresses/registerAddressDefault";
export default {
  components: {
    RegisterAddress,
  },
  computed: {
    ...mapState("Layouts", ["layout"]),
    ...mapState("Addressess", ["registerNewAddress", "list"]),
  },
  methods: {
    ...mapActions("Addressess", [
      "setRegisterNewAddress",
      "cleanErrors",
      "cleanAddressItem",
      "cleanList",
      "setList",
    ]),
  },
  mounted() {
    this.setList();
  },
  beforeDestroy() {
    this.cleanList();
  },
};
</script>

<style>
</style>
<template>
  <v-card class="address-card" v-show="registerNewAddress">
    <modal-spinner>
      <v-container>
        <v-row>
          <v-col cols="10">
            <h3>{{ title }}</h3>
          </v-col>
          <v-col cols="2">
            <v-btn
              @click="setRegisterNewAddress(false)"
              style="float: right"
              icon
              ><v-icon>mdi-close</v-icon></v-btn
            >
          </v-col>
        </v-row>
        <v-row>
          <v-col
            :cols="layout.account.addresses.cep.cols"
            :sm="layout.account.addresses.cep.sm"
          >
            <v-text-field
              dense
              :color="layout.account.addresses.input.color"
              label="Cep"
              type="text"
              :style="layout.account.addresses.cep.style"
              :class="layout.account.addresses.cep.class"
              v-model="formData.cep"
              @input="apiCep()"
            ></v-text-field>
            <strong
              v-if="errors.cep"
              :style="layout.account.addresses.error.style"
              class="red--text"
              >{{ errors.cep }}</strong
            >
          </v-col>
          <v-col
            :cols="layout.account.addresses.street.cols"
            :sm="layout.account.addresses.street.sm"
          >
            <v-text-field
              dense
              :color="layout.account.addresses.input.color"
              label="Rua"
              type="text"
              v-model="formData.street"
              :style="layout.account.addresses.street.style"
              :class="layout.account.addresses.street.class"
            ></v-text-field>
            <strong
              v-if="errors.street"
              :style="layout.account.addresses.error.style"
              class="red--text"
              >{{ errors.street }}</strong
            >
          </v-col>
          <v-col
            :cols="layout.account.addresses.houseNumber.cols"
            :sm="layout.account.addresses.houseNumber.sm"
          >
            <v-text-field
              dense
              :color="layout.account.addresses.input.color"
              label="Nº"
              type="text"
              v-model="formData.number"
              :style="layout.account.addresses.houseNumber.style"
              :class="layout.account.addresses.houseNumber.class"
            ></v-text-field>
            <strong
              v-if="errors.number"
              :style="layout.account.addresses.error.style"
              class="red--text"
              >{{ errors.number }}</strong
            >
          </v-col>
          <v-col
            :cols="layout.account.addresses.neighborhood.cols"
            :sm="layout.account.addresses.neighborhood.sm"
          >
            <v-text-field
              dense
              :color="layout.account.addresses.input.color"
              label="Bairro"
              type="text"
              :style="layout.account.addresses.neighborhood.style"
              :class="layout.account.addresses.neighborhood.class"
              v-model="formData.neighborhood"
            ></v-text-field>
            <strong
              v-if="errors.neighborhood"
              :style="layout.account.addresses.error.style"
              class="red--text"
              >{{ errors.neighborhood }}</strong
            >
          </v-col>
          <v-col
            :cols="layout.account.addresses.city.cols"
            :sm="layout.account.addresses.city.sm"
          >
            <v-text-field
              dense
              :color="layout.account.addresses.input.color"
              label="Cidade"
              type="text"
              :style="layout.account.addresses.city.style"
              :class="layout.account.addresses.city.class"
              v-model="formData.city"
            ></v-text-field>
            <strong
              v-if="errors.city"
              :style="layout.account.addresses.error.style"
              class="red--text"
              >{{ errors.city }}</strong
            >
          </v-col>
          <v-col
            :cols="layout.account.addresses.estate.cols"
            :sm="layout.account.addresses.estate.sm"
          >
            <v-autocomplete
              dense
              :color="layout.account.addresses.input.color"
              label="UF"
              :style="layout.account.addresses.estate.style"
              :class="layout.account.addresses.estate.class"
              :items="BrazilStates"
              item-text="value"
              item-value="value"
              v-model="formData.state"
            ></v-autocomplete>
            <strong errors.state class="red--text">{{ errors.state }}</strong>
          </v-col>
          <v-col
            :cols="layout.account.addresses.complement.cols"
            :sm="layout.account.addresses.complement.sm"
          >
            <v-text-field
              dense
              :color="layout.account.addresses.input.color"
              label="Complemento"
              type="text"
              :style="layout.account.addresses.complement.style"
              :class="layout.account.addresses.complement.class"
              v-model="formData.complement"
            ></v-text-field>
            <strong class="red--text">{{ errors.complement }}</strong>
          </v-col>
          <!-- <v-col
              :cols="layout.account.addresses.observation.cols"
              :sm="layout.account.addresses.observation.sm"
            >
              <v-text-field
                :label="layout.account.addresses.observation.label"
                type="text"
                :style="layout.account.addresses.observation.style"
                :class="layout.account.addresses.observation.class"
              ></v-text-field>
              
            </v-col> -->
        </v-row>
        <v-row justify="center">
          <v-col cols="2" align="center">
            <v-btn
              @click="save(formData)"
              rounded
              :style="layout.account.addresses.saveBtn.style"
              :class="layout.account.addresses.saveBtn.class"
              >{{ layout.account.addresses.saveBtn.text }} &nbsp;
              <v-icon>mdi-check-circle-outline</v-icon></v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </modal-spinner>
  </v-card>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ModalSpinner from "@/components/utils/modalSpinner";

export default {
  props: {
    title: {
      type: String,
      dafault: "Cadastrar Endereço",
    },
  },
  components: {
    ModalSpinner,
  },
  computed: {
    ...mapState("Layouts", ["layout"]),
    ...mapState("Addressess", [
      "formData",
      "registerNewAddress",
      "BrazilStates",
      "errors",
    ]),
  },
  methods: {
    ...mapActions("Addressess", [
      "setRegisterNewAddress",
      "apiCep",
      "save",
      "cleanErrors",
      "cleanAddressItem",
      "cleanList",
      "setList",
    ]),
  },

  beforeDestroy() {
    this.cleanErrors();
    this.cleanAddressItem();
  },
};
</script>

<style>
</style>
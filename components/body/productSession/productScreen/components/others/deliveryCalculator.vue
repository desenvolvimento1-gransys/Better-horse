<template>
  <span>
    <div>
      <loading v-if="deliverySpinner" />
    </div>
    <v-card>
      <v-container>
        <small>Calcular frete</small>
        <v-text-field
          flat
          dense
          hide-details
          clearable
          single-line
          :disabled="!product.grid[0]"
          color="black"
          label="CEP"
          style="
            float: center;
            font-size: 22px;
            font-weight: 200;
          "
          v-mask="'# # # # # - # # #'"
          v-model="cep"
          @click:clear="cep = 1"
          v-on:keydown.enter="cleanAndCalculate(cep)"
        >
          <template v-slot:append>
            <v-btn
              :disabled="!product.grid[0]"
              @click="cleanAndCalculate(cep)"
              small
              tile
              depressed
              color="transparent"
              ><v-icon color="black">mdi-arrow-right</v-icon></v-btn
            >
          </template>
        </v-text-field>
        <div
          class="px-2 py-2"
          style="
            border-top: 2px solid black;
            border-bottom: 2px solid black;
          "
          v-if="isOpen"
        >
          <v-row class="text-sizing" no-gutters justify="start">
            <v-col cols="1" class="mr-2">
              <v-icon color="black">mdi-truck</v-icon>
            </v-col>
            <v-col aria-colcount="10">
              <v-row no-gutters>
                <v-col
                  style="
                    text-transform: uppercase;
                    color: black;
                    font-weight: bolder;
                    border-bottom: 1px solid grey;
                  "
                  cols="12"
                >
                  <v-row no-gutters>
                    <v-col cols="12">
                      <v-row no-gutters>
                        <v-col cols="7"> Tipo: </v-col>
                        <v-col cols="3"> Prazo: </v-col>
                        <v-col cols="2"> Valor: </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12">
                  <v-row no-gutters>
                    <v-col
                      cols="12"
                      v-for="item in deliveryConsult"
                      :key="item.id"
                    >
                      <v-row no-gutters>
                        <v-col
                          cols="7"
                          style="
                            text-transform: uppercase;
                            color: black;
                            font-weight: bolder;
                          "
                        >
                          {{ item.type }}:
                        </v-col>
                        <v-col cols="3">{{ correctPlural(item.term) }}</v-col>
                        <v-col cols="2"
                          >R${{
                            parseFloat(item.price).toLocaleString("pt-BR", {
                              maximumFractionDigits: 2,
                              minimumFractionDigits: 2,
                            })
                          }}
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </v-card>
  </span>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import Loading from "@/components/loading";
export default {
  data: function () {
    return {
      cep: "",
      isOpen: false,
    };
  },
  components: {
    Loading,
  },
  computed: {
    ...mapState("Product", ["product", "deliverySpinner", "deliveryConsult"]),
  },
  watch: {
    cep: function () {
      if (this.cep && this.cep.length <= 0) {
        this.isOpen = false;
      } else if (!this.cep) {
        this.isOpen = false;
      }
    },
  },
  methods: {
    ...mapActions("Product", ["calculateProductDelivery"]),
    cleanAndCalculate(cep) {
      if (cep) {
        var res = cep.replace(/\D/g, "");

        this.calculateProductDelivery(res);

        this.isOpen = true;

        if (!this.deliveryConsult && !this.deliveryConsult.length > 0) {
          this.isOpen = false;
        }
      }
    },

    correctPlural(term) {
      if (term == 1) {
        return `${term} Dia`;
      } else {
        return `${term} Dias`;
      }
    },
  },
};
</script>

<style scoped>
.text-sizing {
  font-size: 13px;
}

.v-text-field {
  padding-top: 0 !important;
  margin-top: 0 !important;
  color: transparent !important;
}
.v-text-field >>> .v-input__slot::before {
  border-color: black !important;
}

.v-text-field >>> input {
  color: black !important;
}

@media only screen and (max-width: 1470px) {
  .text-sizing {
    font-size: 11px;
  }
}

@media only screen and (max-width: 600px) {
  .text-sizing {
    font-size: 10px;
  }
}
</style>
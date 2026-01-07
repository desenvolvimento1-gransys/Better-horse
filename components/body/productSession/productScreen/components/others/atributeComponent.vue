<template>
  <span>
    <span v-for="(item, index) in config.atribute.atributes" :key="index">
      <span v-if="!item.typeable">
        <v-overflow-btn
          v-if="
            item.type == 'overflow-btn' &&
            setAtributeData(atributes, item.atributeName).length > 0
          "
          class="my-2"
          :items="setAtributeData(atributes, item.atributeName)"
          :label="item.labelName"
          item-value="atribute_id"
          item-text="name"
          @input="atributesPuh($event)"
        >
          <template v-slot:item="{ item }">
            <span v-if="parseFloat(item.additional_price) > 0">
              {{
                `${item.name} - R$ ${parseFloat(
                  item.additional_price
                ).toLocaleString("pt-BR", {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })}`
              }}
            </span>
            <span v-else> {{ item.name }} </span>
          </template>
          <template v-slot:selection="{ item }">
            <span v-if="parseFloat(item.additional_price) > 0">
              {{
                `${item.name} - R$ ${parseFloat(
                  item.additional_price
                ).toLocaleString("pt-BR", {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })}`
              }}
            </span>
            <span v-else> {{ item.name }} </span>
          </template>
        </v-overflow-btn>
        <v-autocomplete
          v-if="
            item.type == 'autocomplete' &&
            setAtributeData(atributes, item.atributeName).length > 0
          "
          class="my-2"
          :items="setAtributeData(atributes, item.atributeName)"
          :label="item.labelName"
          item-value="atribute_id"
          @input="atributesPuh($event)"
        >
          <template v-slot:item="{ item }">
            <span v-if="parseFloat(item.additional_price) > 0">
              {{
                `${item.name} - R$ ${parseFloat(
                  item.additional_price
                ).toLocaleString("pt-BR", {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })}`
              }}
            </span>
            <span v-else> {{ item.name }} </span>
          </template>
          <template v-slot:selection="{ item }">
            <span v-if="parseFloat(item.additional_price) > 0">
              {{
                `${item.name} - R$ ${parseFloat(
                  item.additional_price
                ).toLocaleString("pt-BR", {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })}`
              }}
            </span>
            <span v-else> {{ item.name }} </span>
          </template>
        </v-autocomplete>
      </span>
      <span
        v-if="
          item.typeable &&
          setAtributeData(atributes, item.atributeName).length > 0
        "
      >
        <v-text-field
          @input="
            typeableAtributesPuh(
              $event,
              setAtributeData(atributes, item.atributeName)
            )
          "
          :label="item.labelName"
        >
        </v-text-field>
      </span>
    </span>
  </span>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    stateAtributes: {
      get() {
        return this.$store.state.Product.atributes;
      },
      set(value) {
        this.$store.commit("Product/SET_ATRIBUTES", value);
      },
    },
    ...mapState("Layouts", ["layout", "config"]),
  },
  props: {
    atributes: Array,
  },
  methods: {
    setAtributeData(value, atribute) {
      let response = [];
      let serverData = value.filter((value) => value.group_name == atribute);
      if (serverData.length > 0) {
        response = [...serverData, { atribute_id: null, name: "Nenhum" }];
      }

      return response;
    },
    typeableAtributesPuh(value, atributeList) {
      let newArray = [];
      let dataToPush = {
        ...atributeList[0],
        value: value,
      };
      if (this.stateAtributes.length > 0) {
        newArray = this.stateAtributes.filter((data) => {
          return data.group_name !== atributeList[0].group_name;
        });
      }
      this.stateAtributes = newArray;
      if (value) {
        this.stateAtributes.push(dataToPush);
      }
    },
    atributesPuh(value) {
      if (value !== null) {
        let newArray = [];
        let dataToPush = this.atributes.filter((data) => {
          return data.atribute_id == value;
        });
        if (this.stateAtributes.length > 0) {
          newArray = this.stateAtributes.filter((data) => {
            return data.group_name !== dataToPush[0].group_name;
          });
        }
        this.stateAtributes = newArray;

        this.stateAtributes.push(dataToPush[0]);
      } else {
        this.stateAtributes = [];
      }
    },
  },
  mounted() {
    this.stateAtributes = [];
  },
};
</script>

<style>
</style>
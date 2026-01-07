<template>
  <span>
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          text
          :x-small="small"
          style="padding: 0 !important; margin: 0 !important"
          v-bind="attrs"
          v-on="on"
          ><u>{{ btntext }}</u></v-btn
        >
      </template>
      <v-card v-if="dialog == true">
        <v-toolbar color="#ffa4d1">
          <span class="px-2" style="width: 100%">
            <v-row no-gutters style="width: 100%">
              <v-col cols="10" sm="11">
                <v-toolbar-title style="color: black">
                  <span class="title-sizing">Insira seus dados:</span>
                </v-toolbar-title>
              </v-col>
              <v-col cols="2" sm="1">
                <v-btn text small color="black" @click="dialog = false">
                  <h2>X</h2>
                </v-btn>
              </v-col>
            </v-row>
          </span>
        </v-toolbar>
        <v-container>
          <v-list>
            <v-list-item>
              <v-text-field
                label="Nome"
                color="black"
                v-model="warnMeData.name"
                :rules="setRule(' Nome', 0)"
              ></v-text-field>
            </v-list-item>
            <v-list-item>
              <v-text-field
                label="Telefone"
                color="black"
                v-mask="['(##) ####-####', '(##) #####-####']"
                v-model="warnMeData.phone"
                :rules="setRule(' Telefone', 14)"
              ></v-text-field>
            </v-list-item>
            <v-list-item>
              <v-text-field
                label="Email"
                color="black"
                v-model="warnMeData.email"
                :rules="emailRules"
                @keyup="forceLowerMail(warnMeData.email)"
              ></v-text-field>
            </v-list-item>
            <v-list-item>
              <v-text-field
                label="Tamanho Desejado"
                color="black"
                v-model="warnMeData.size"
              ></v-text-field>
            </v-list-item>
          </v-list>
          <v-row>
            <v-col cols="12" align="center">
              <v-btn
                :disabled="
                  !warnMeData ||
                  !warnMeData.name ||
                  !warnMeData.phone ||
                  !warnMeData.email
                "
                color="black"
                @click="
                  (dialog = false),
                    sendWarnMeData(warnMeData),
                    (snackbar = true),
                    clearData()
                "
              >
                <span style="color: #d2ad6d">Avise-me</span>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
    <v-snackbar top v-model="snackbar">
      {{ warnMeToastMessage }}

      <!-- <template v-slot:action="{ attrs }">
        <v-btn color="green" text v-bind="attrs" @click="snackbar = false">
          Ok
        </v-btn>
      </template> -->
    </v-snackbar>
  </span>
</template>

<script>
import { mapState, mapActions } from "vuex";
// import { siteUrl } from "@/Settings/global";
export default {
  data: function () {
    return {
      dialog: false,
      snackbar: false,
      //   site: siteUrl,
      emailRules: [
        (v) => !!v || "Por favor insira um e-mail",
        (v) => /.+@.+..+/.test(v) || "E-mail deve ser valido",
      ],

      warnMeData: {
        name: null,
        phone: null,
        email: null,
        size: null,
        product_id: null,
        link: null,
      },
    };
  },
  props: {
    data: {},
    btntext: "",
    small: false,
  },
  watch: {
    dialog: function () {
      this.clearData();
    },
    warnMeData: function () {
      this.warnMeData.link = `url${$nuxt.$route.path}`;
      this.warnMeData.product_id = parseInt(
        String($nuxt.$route.path).split("/")[2]
      );
    },
  },
  computed: {
    ...mapState("Product", ["warnMeToastMessage"]),
  },
  methods: {
    ...mapActions("Product", ["sendWarnMeData"]),
    forceLowerMail(value) {
      if (value) {
        this.warnMeData.email = value.toLowerCase();
      }
    },
    setRule(name, lengthNeed) {
      if (lengthNeed) {
        return [
          (v) => !!v || "Por favor insira" + name,
          (v) =>
            (v && v.length >= lengthNeed) || `Por favor insira ${name}  válido`,
        ];
      } else {
        return [(v) => !!v || "Por favor insira " + name];
      }
    },

    clearData() {
      this.warnMeData = {
        name: null,
        phone: null,
        email: null,
        size: null,
        product_id: null,
        link: null,
      };
    },
  },
  mounted() {
    this.warnMeData.link = `url${$nuxt.$route.path}`;
    this.warnMeData.product_id = parseInt(
      String($nuxt.$route.path).split("/")[2]
    );
  },
};
</script>

<style scoped>
@media only screen and (max-width: 600px) {
  .title-sizing {
    font-size: 16px !important;
  }
}
</style>
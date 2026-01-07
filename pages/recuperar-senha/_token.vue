<template>
  <span>
    <v-row justify="center">
      <v-col
        align="center"
        style="border: solid grey 1px; margin-top: 50px; border-radius: 5px"
        sm="5"
        xl="5"
        cols="10"
      >
        <h2>Recuperação de Senha</h2>
        <v-text-field
          color="#50333e"
          label="Email"
          v-model="formData.email"
        ></v-text-field>
        <strong class="red--text">{{ resetPasswordErrors.email }}</strong>
        <v-text-field
          color="#50333e"
          type="password"
          v-model="formData.password"
          label="Nova Senha"
        ></v-text-field>
        <strong class="red--text">{{ resetPasswordErrors.password }}</strong>
        <v-text-field
          color="#50333e"
          type="password"
          v-model="formData.password_confirmation"
          label="Confirmação Nova Senha"
        ></v-text-field>
        <strong class="red--text">{{
          resetPasswordErrors.password_confirmation
        }}</strong>
        <v-btn
          tile
          class="btn-go"
          @click="resetPassword({ ...formData, token: token })"
          >Alterar Senha</v-btn
        >
      </v-col>
      <v-col cols="12" align="center"></v-col>
    </v-row>
    <!-- <h1>Recuperar Senha</h1>
    {{this.$route.params.token}}-->
  </span>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data: function () {
    return {
      token: null,
      formData: {
        email: null,
        password: null,
        password_confirmation: null,
      },
    };
  },
  computed: {
    ...mapState("User", ["resetPasswordErrors"]),
  },
  methods: {
    ...mapActions("User", [
      "checkAccountLostToken",
      "cleanResetPasswordErrors",
      "resetPassword",
    ]),
  },
  beforeMount() {
    this.checkAccountLostToken(this.$route.params.token);
    this.token = this.$route.params.token;
  },
  beforeDestroy: function () {
    this.cleanResetPasswordErrors();
  },
};
</script>

<style>
</style>
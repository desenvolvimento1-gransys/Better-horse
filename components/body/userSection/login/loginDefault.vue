<template>
  <v-row :justify="layout.login.outterRowAlign">
    <v-col
      :cols="layout.login.loginCol.cols"
      :sm="layout.login.loginCol.sm"
      :align="layout.login.loginCol.align"
      :style="layout.login.loginCol.style"
    >
      <h2 :class="layout.login.title.class">{{ layout.login.title.text }}</h2>
      <v-text-field
        outlined
        :class="layout.login.email.class"
        :color="layout.login.email.color"
        :label="layout.login.email.label"
        v-model="formData.email"
        @keyup="forceLowerMail(formData.email)"
      ></v-text-field>
      <p
        v-if="loginErrors.email"
        class="error--text"
        :style="layout.login.error.style"
      >
        {{ loginErrors.email }}
      </p>
      <v-text-field
        outlined
        :class="layout.login.password.class"
        :color="layout.login.password.color"
        :label="layout.login.password.label"
        type="password"
        v-model="formData.password"
        v-on:keydown.enter="login(formData)"
      ></v-text-field>
      <p
        v-if="loginErrors.password"
        class="error--text"
        :style="layout.login.error.style"
      >
        {{ loginErrors.password }}
      </p>
      <v-row>
        <v-col
          style="position: relative"
          cols="12"
          align="right"
          class="no-margin"
        >
          <button
            :style="layout.login.forgotPassword.style"
            @click="accountLost(formData.email)"
          >
            {{ layout.login.forgotPassword.text }}
          </button>
          <p v-if="errorsAccountLost">
            <strong class="red--text ml-3">{{ errorsAccountLost }}</strong>
          </p>
        </v-col>
      </v-row>
      <div />
      <v-btn
        :style="layout.login.loginBtn.style"
        tile
        :class="layout.login.loginBtn.class"
        @click="login(formData)"
        >ACESSAR CONTA</v-btn
      >
      <p
        :style="layout.login.registerLink.style"
        :class="layout.login.registerLink.class"
      >
        {{ layout.login.registerLink.quote }}
        <br />
        <a @click="$nuxt.$router.push({ path: `/criar-conta` })">
          {{ layout.login.registerLink.text }}</a
        >
      </p>
      <br />
      <br />
      <!-- <p v-if="errorsAccountLost">
      <strong class="red--text ml-3">{{ errorsAccountLost }}</strong>
    </p> -->
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data: function () {
    return {
      formData: {},
    };
  },
  computed: {
    ...mapState("Layouts", ["layout"]),
    ...mapState("Layouts", ["config"]),
    ...mapState("User", ["loginErrors", "errorsAccountLost"]),
  },
  methods: {
    ...mapActions("User", ["accountLost", "login", "cleanAccountLostErrors"]),
    forceLowerMail(value) {
      this.formData.email = value.toLowerCase();
    },
  },
  beforeDestroy: function () {
    this.cleanAccountLostErrors();
  },
};
</script>

<style>
</style>
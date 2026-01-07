<template>
  <div>
    <v-toolbar
      dense
      :elevation="layout.account.people.title.elevation"
      :style="layout.account.people.title.style"
      :class="layout.account.people.title.class"
    >
      <h3 class="d-block d-md-none">{{ layout.account.people.title.text }}</h3>
      <h2 class="d-none d-md-block">{{ layout.account.people.title.text }}</h2>
    </v-toolbar>
    <v-container>
      <v-row :no-gutters="setGutters">
        <v-col
          :cols="layout.account.people.email.cols"
          :sm="layout.account.people.email.sm"
          :align-self="layout.account.people.email.align"
        >
          <v-text-field
            disabled
            :label="layout.account.people.email.label"
            :color="layout.account.people.email.color"
            type="email"
            :style="layout.account.people.email.style"
            :class="layout.account.people.email.class"
            v-model="user.email"
          />
        </v-col>
        <v-col
          :cols="layout.account.people.companySwitch.cols"
          :sm="layout.account.people.companySwitch.sm"
          :align-self="layout.account.people.companySwitch.align"
        >
          <v-switch
            dense
            v-model="formData.company"
            :label="layout.account.people.companySwitch.label"
            :color="layout.account.people.companySwitch.color"
            id="company-switch"
            :style="layout.account.people.companySwitch.style"
            :class="layout.account.people.companySwitch.class"
          ></v-switch>
        </v-col>

        <v-col
          :cols="layout.account.people.name.cols"
          :sm="layout.account.people.name.sm"
          :align-self="layout.account.people.name.align"
        >
          <v-text-field
            dense
            disabled
            v-if="formData.company"
            v-model="formData.fantasy_name"
            label="Nome Fantasia"
            :color="layout.account.people.name.color"
            type="text"
            :style="layout.account.people.name.style"
            :class="layout.account.people.name.class"
          />
          <strong
            :style="layout.account.people.error.style"
            class="red--text"
          ></strong>
          <v-text-field
            dense
            disabled
            v-if="!formData.company"
            v-model="formData.fantasy_name"
            label="Nome"
            :color="layout.account.people.name.color"
            type="text"
            :style="layout.account.people.name.style"
            :class="layout.account.people.name.class"
          />
          <strong
            :style="layout.account.people.error.style"
            class="red--text"
          ></strong>
        </v-col>
        <v-col
          v-if="formData.company"
          :cols="layout.account.people.companyName.cols"
          :sm="layout.account.people.companyName.sm"
          :align-self="layout.account.people.companyName.align"
        >
          <v-text-field
            dense
            disabled
            :label="layout.account.people.companyName.label"
            :color="layout.account.people.companyName.color"
            v-model="formData.social_name"
            type="text"
            :style="layout.account.people.companyName.style"
            :class="layout.account.people.companyName.class"
          />
          <strong
            :style="layout.account.people.error.style"
            class="red--text"
          ></strong>
        </v-col>
        <v-col
          v-if="!formData.company"
          :cols="layout.account.people.birthday.cols"
          :sm="layout.account.people.birthday.sm"
          :align-self="layout.account.people.birthday.align"
        >
          <v-text-field
            dense
            disabled
            v-model="formData.birthday"
            :label="layout.account.people.birthday.label"
            :color="layout.account.people.birthday.color"
            type="date"
            :style="layout.account.people.birthday.style"
            :class="layout.account.people.birthday.class"
          />
          <strong
            :style="layout.account.people.error.style"
            class="red--text"
          ></strong>
        </v-col>
        <v-col
          :cols="layout.account.people.phone.cols"
          :sm="layout.account.people.phone.sm"
          :align-self="layout.account.people.phone.align"
        >
          <v-text-field
            dense
            disabled
            v-model="formData.phone_number"
            :label="layout.account.people.phone.label"
            :color="layout.account.people.phone.color"
            type="text"
            :style="layout.account.people.phone.style"
            :class="layout.account.people.phone.class"
          />
          <strong
            :style="layout.account.people.error.style"
            class="red--text"
          ></strong>
        </v-col>
        <v-col
          :cols="layout.account.people.cpfCnpj.cols"
          :sm="layout.account.people.cpfCnpj.sm"
          :align-self="layout.account.people.cpfCnpj.align"
        >
          <v-text-field
            dense
            disabled
            v-model="formData.cpf_cnpj"
            :label="layout.account.people.cpfCnpj.label"
            :color="layout.account.people.cpfCnpj.color"
            type="text"
            :style="layout.account.people.cpfCnpj.style"
            :class="layout.account.people.cpfCnpj.class"
          />
          <strong
            :style="layout.account.people.error.style"
            class="red--text"
          ></strong>
        </v-col>
        <v-col
          :cols="layout.account.people.gender.cols"
          :sm="layout.account.people.gender.sm"
          :align-self="layout.account.people.gender.align"
        >
          <v-select
            dense
            disabled
            v-model="formData.gender"
            :label="layout.account.people.gender.label"
            :color="layout.account.people.gender.color"
            :style="layout.account.people.gender.style"
            :class="layout.account.people.gender.class"
            id="gender"
            item-text="name"
            item-value="value"
            :items="config.genderList"
          ></v-select>
          <strong
            :style="layout.account.people.error.style"
            class="red--text"
          ></strong>
        </v-col>
      </v-row>
      <span>
        <h6 class="d-block d-md-none red--text">
          {{ config.supportText }}
          <a
            style="font-size: 12px !important"
            :href="`mailto:${config.supportEmail}`"
            >{{ config.supportEmail }}</a
          >
        </h6>
        <h3 class="d-none d-md-block red--text">
          {{ config.supportText }}
          <a :href="`mailto:${config.supportEmail}`">{{
            config.supportEmail
          }}</a>
        </h3>
      </span>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data: function () {
    return {
      setGutters: null,
    };
  },
  computed: {
    ...mapState("Layouts", ["config", "layout"]),
    ...mapState("User", ["user"]),
    ...mapState("People", ["formData"]),
  },
  methods: {
    ...mapActions("People", ["show"]),
    checkSize() {
      if (window.innerWidth <= 600) {
        return (this.setGutters = true);
      } else {
        return (this.setGutters = false);
      }
    },
  },
  mounted() {
    this.show();
    if (process.client) {
      window.addEventListener("resize", this.checkSize);
      this.checkSize();
    }
  },
};
</script>

<style scoped>
input[type="date"]::-webkit-clear-button {
  display: none;
}
</style>
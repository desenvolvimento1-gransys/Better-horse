<template>
  <v-row :justify="layout.register.justify">
    <v-col
      :cols="layout.register.cols"
      :sm="layout.register.sm"
      :xl="layout.register.xl"
    >
      <v-card class="px-5">
        <v-switch
          v-model="formData.company"
          v-if="layout.register.company.show"
          :color="layout.register.company.color"
          :label="layout.register.company.label"
        ></v-switch>
        <v-text-field
          v-model="formData.fantasy_name"
          v-if="!formData.company && layout.register.name.show"
          :color="layout.register.name.color"
          :label="layout.register.name.label"
        >
        </v-text-field>

        <v-text-field
          v-model="formData.fantasy_name"
          v-if="formData.company && layout.register.fantasyName.show"
          :color="layout.register.fantasyName.color"
          :label="layout.register.fantasyName.label"
        >
        </v-text-field>
        <p
          v-if="formErrors.fantasy_name"
          class="error--text"
          :style="layout.register.error.style"
        >
          {{ formErrors.fantasy_name }}
        </p>

        <v-text-field
          v-model="formData.social_name"
          v-if="formData.company && layout.register.companyName.show"
          :color="layout.register.companyName.color"
          :label="layout.register.companyName.label"
        >
        </v-text-field>
        <p
          v-if="formErrors.social_name && formData.company"
          class="error--text"
          :style="layout.register.error.style"
        >
          {{ formErrors.social_name }}
        </p>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="formData.phone_number"
              v-if="layout.register.phone.show"
              :color="layout.register.phone.color"
              :label="layout.register.phone.label"
              v-mask="['(##) ####-####', '(##) #####-####']"
            >
            </v-text-field>
            <p
              v-if="formErrors.phone_number"
              class="error--text"
              :style="layout.register.error.style"
            >
              {{ formErrors.phone_number }}
            </p>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="formData.cpf_cnpj"
              v-if="!formData.company && layout.register.cpf.show"
              :color="layout.register.cpf.color"
              :label="layout.register.cpf.label"
              v-mask="'###.###.###-XX'"
            >
            </v-text-field>
            <v-text-field
              v-model="formData.cpf_cnpj"
              v-if="formData.company && layout.register.cnpj.show"
              :color="layout.register.cnpj.color"
              :label="layout.register.cnpj.label"
              v-mask="'##.###.###/####-XX'"
            >
            </v-text-field>
            <p
              v-if="formErrors.cpf_cnpj"
              class="error--text"
              :style="layout.register.error.style"
            >
              {{ formErrors.cpf_cnpj }}
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              type="date"
              v-model="formData.birthday"
              v-if="layout.register.birthday.show"
              :color="layout.register.birthday.color"
              :label="layout.register.birthday.label"
              placeholder="dd/mm/aaaa"
            >
            </v-text-field>
            <p
              v-if="formErrors.birthday"
              class="error--text"
              :style="layout.register.error.style"
            >
              {{ formErrors.birthday }}
            </p>
          </v-col>
          <v-col cols="12" md="6">
            <v-select
              style="width: 100%; margin-bottom: 5px"
              v-model="formData.gender"
              v-if="!formData.company && layout.register.gender.show"
              :color="layout.register.gender.color"
              :label="layout.register.gender.label"
              item-text="name"
              item-value="value"
              :items="config.genderList"
            ></v-select>
            <p
              v-if="formErrors.gender"
              class="error--text"
              :style="layout.register.error.style"
            >
              {{ formErrors.gender }}
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="formData.email"
              @keyup="forceLowerMail(formData.email)"
              v-if="layout.register.email.show"
              :color="layout.register.email.color"
              :label="layout.register.email.label"
            >
            </v-text-field>
            <p
              v-if="formErrors.email"
              class="error--text"
              :style="layout.register.error.style"
            >
              {{ formErrors.email }}
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              type="password"
              v-model="formData.password"
              v-if="layout.register.password.show"
              :color="layout.register.password.color"
              :label="layout.register.password.label"
            >
            </v-text-field>
            <p
              v-if="formErrors.password"
              class="error--text"
              :style="layout.register.error.style"
            >
              {{ formErrors.password }}
            </p>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              type="password"
              v-model="formData.password_confirmation"
              v-if="layout.register.passwordConfirmation.show"
              :color="layout.register.passwordConfirmation.color"
              :label="layout.register.passwordConfirmation.label"
            >
            </v-text-field>
            <p
              v-if="formErrors.password_confirmation"
              class="error--text"
              :style="layout.register.error.style"
            >
              {{ formErrors.password_confirmation }}
            </p>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col
            align="center"
            :cols="layout.register.finishBtn.cols"
            :sm="layout.register.finishBtn.sm"
          >
            <v-btn
              :style="layout.register.finishBtn.style"
              rounded
              outlined
              :class="layout.register.finishBtn.class"
              @click="register(formData)"
              >{{ layout.register.finishBtn.text }}
              <v-icon>{{ layout.register.finishBtn.icon }}</v-icon></v-btn
            >
            <p />
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  data: function () {
    return {
      formData: {
        company: false,
      },
    };
  },
  computed: {
    ...mapState("Layouts", ["config", "layout"]),
    ...mapState("User", ["formErrors"]),
  },
  methods: {
    ...mapActions("User", ["register"]),
    forceLowerMail(value) {
      if (value) {
        this.formData.email = value.toLowerCase();
      }
    },
  },
};
</script>

<style>
</style>
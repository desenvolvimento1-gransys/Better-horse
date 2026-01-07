<template>
  <v-dialog
    :width="layout.dialog.exitDialog.width"
    v-model="exitDialog"
    v-if="exitDialog"
  >
    <v-card :style="layout.dialog.exitDialog.style">
      <v-col :align="layout.dialog.exitDialog.align">
        Deseja realmente sair?
        <p />
      </v-col>
      <v-card-actions>
        <v-btn
          @click="setExitDialog(false)"
          :width="layout.dialog.exitDialog.cancelBtn.width"
          :color="layout.dialog.exitDialog.cancelBtn.color"
          :style="layout.dialog.exitDialog.cancelBtn.style"
        >
          Cancelar
        </v-btn>
        <v-spacer />
        <v-btn
          @click="setExitDialog(false), logout()"
          :width="layout.dialog.exitDialog.okBtn.width"
          :color="layout.dialog.exitDialog.okBtn.color"
          :style="layout.dialog.exitDialog.okBtn.style"
        >
          Ok
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("Layouts", ["layout"]),
    ...mapState("Utils", ["exitDialog"]),
  },
  methods: {
    ...mapActions("Utils", ["setExitDialog"]),
    ...mapActions("User", ["logout"]),
  },
};
</script>

<style>
</style>
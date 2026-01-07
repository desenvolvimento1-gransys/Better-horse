<template>
  <information-one />
</template>

<script>
import InformationOne from "@/components/body/indexComponents/information/components/informationOne";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("Layouts", ["layout"]),
  },
  components: {
    InformationOne,
  },
};
</script>

<style>
</style>
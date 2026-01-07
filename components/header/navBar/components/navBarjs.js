import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("Settings", ["navBarList"]),
    ...mapState("Layouts", ["layout"]),
  },
  data: function () {
    return {
      dialog: false,
      menu: false,
    };
  },
};
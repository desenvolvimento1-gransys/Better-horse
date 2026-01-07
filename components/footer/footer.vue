<template>
  <span translate="no">
    <cookie-law></cookie-law>
    <footer-one />
    <div>
      <div class="marca-dagua">
        <v-row justify="center" align="center">
          <v-col align="center" sm="6" cols="11">
            <i class="far fa-copyright"></i>
            {{ layout.footer.copyrightSession.copyright }}
          </v-col>
          <v-col sm="5" cols="12" align="center">
            <a href="http://gransys.com.br/">
              <img
                width="80px"
                src="https://granshopping.s3.amazonaws.com/files/logoGranSys.png"
                alt="Logo"
              />
            </a>
          </v-col>
        </v-row>
      </div>
    </div>
  </span>
</template>

<script>
import FooterOne from "@/components/footer/components/footerOne";
import { mapState } from "vuex";
import CookieLaw from "@/components/utils/cookieLaw";

export default {
  components: {
    FooterOne,
    CookieLaw,
  },
  computed: {
    ...mapState("Layouts", ["layout"]),
  },
};
</script>
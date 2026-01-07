<template>
  <div :style="rotateClass(back)" class="main-card-class">
    <div
      class="credit-card-class-front"
      :style="layout.payment.creditCard.front.style"
    >
      <div class="card-chip-tag">
        <img src="/cardBrands/chip.png" alt="Chip do cartao" />
      </div>
      <div class="card-brand-class">
        <img
          v-if="getCardFlag(data.card_number)"
          :src="`/cardBrands/${getCardFlag(data.card_number)}.png`"
          alt="Logo cartao"
        />
        <img v-else :src="config.paymentCard.urlLogo" alt="Logo cartao" />
      </div>
      <div v-if="data.card_number" class="card-number-tag">
        {{ data.card_number | cardSpace }}
      </div>
      <div v-else class="card-number-tag">0000 0000 0000 0000</div>
      <div
        v-if="data.expiration_month && data.expiration_year"
        class="card-expiration-data-tag"
      >
        {{ data.expiration_month }} / {{ data.expiration_year }}
      </div>
      <div v-else class="card-expiration-data-tag">12 / 2020</div>
      <div v-if="data.card_holder" class="card-holder-tag">
        {{ data.card_holder }}
      </div>
      <div v-else class="card-holder-tag">Nome Impresso Cartão</div>
    </div>
    <div
      class="credit-card-class-back"
      :style="layout.payment.creditCard.back.style"
    >
      <div class="banner-back-side"></div>
      <div class="cvv-name">CVV</div>
      <div class="banner-back-side-infos">
        <p>{{ data.card_security_code }}</p>
      </div>
      <!-- <img
        v-if="getCardFlag(data.card_number)"
        :src="
          require(`~/assets/img/cardBrands/${getCardFlag(
            data.card_number
          )}.png`)
        "
        alt="Logo cartão"
      />
      <img v-else src="\logo-mono2.svg" alt="Logo Xocolata Boutique" /> -->
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("Layouts", ["layout", "config"]),
  },
  filters: {
    cardSpace(value) {
      let dummyTxt = value;

      let joy = dummyTxt.match(/.{1,4}/g);
      return joy.join(" ");
    },
  },
  props: {
    back: Boolean,
    data: Object,
  },
  methods: {
    rotateClass(back) {
      if (back) {
        return "transform: rotateY(180deg);";
      }
    },
    getCardFlag(card) {
      if (card && card.length > 5) {
        let cards = {
          visa: /^4[0-9]{12}(?:[0-9]{3})/,
          master: /^5[1-5][0-9]{14}/,
          amex: /^3[47][0-9]{13}/,
          elo: /^((((636368)|(636369)|(438935)|(504175)|(451416)|(636297))\d{0,10})|((5067)|(5067)|(4576)|(4011))\d{0,12})/,
          diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}/,
          discover: /^6(?:011|5[0-9]{2})[0-9]{12}/,
          hipercard: /^(606282\d{10}(\d{3})?)|(3841\d{15})/,
          jcb: /^(?:2131|1800|35\d{3})\d{11}/,
          aura: /^(5078\d{2})(\d{2})(\d{11})$/,
        };

        for (var flag in cards) {
          if (cards[flag].test(card)) {
            return flag;
          }
        }

        return false;
      }
    },
  },
};
</script>

<style scoped>
.cvv-name {
  position: absolute;
  font-size: 16px;
  height: 37px;
  width: 65%;
  top: 77px;
  left: 123px;
}

.credit-card-class-back img {
  position: absolute;
  width: 70px;
  top: 130px;
  right: 20px;
}

.banner-back-side-infos {
  position: absolute;
  background: grey;
  height: 37px;
  width: 65%;
  top: 100px;
  left: 20px;
  border-radius: 4px;
}

.banner-back-side-infos p {
  color: black;
  margin-left: 185px;
  margin-top: 7px;
}

.banner-back-side {
  position: absolute;
  background: grey;
  height: 37px;
  width: 100%;
  top: 30px;
}

.main-card-class {
  background-color: #f178b6;
  transform-style: preserve-3d;
  border-radius: 30px;
  width: 360px;
  height: 200px;
  transition: all 0.5s ease;
}

.main-card-class:hover {
  transform: rotateY(180deg);
}

.credit-card-class-front {
  z-index: 2;
  position: absolute;
  backface-visibility: hidden;
  width: 100%;
  height: 100%;
}

.credit-card-class-back {
  z-index: 3;
  position: absolute;
  transform: rotateY(180deg);
  backface-visibility: hidden;
  width: 100%;
  height: 100%;
}

.card-chip-tag {
  left: 30px;
  top: 25px;
  position: absolute;
  height: 30px;
  width: 42px;
  border-radius: 6px;
}
.card-chip-tag img {
  left: -6px;
  bottom: -8px;
  position: absolute;
  height: 45px;
  width: 52px;
  border-radius: 6px;
  background: #e8c282;
}

.card-brand-class {
  right: 25px;
  top: 15px;
  position: absolute;
}

.card-brand-class img {
  max-width: 80px;
}

.card-number-tag {
  position: absolute;
  top: 100px;
  left: 30px;
  font-size: 20px;
}

.card-expiration-data-tag {
  position: absolute;
  top: 127px;
  left: 30px;
  font-size: 16px;
  text-transform: uppercase;
}

.card-holder-tag {
  position: absolute;
  top: 160px;
  left: 30px;
  font-size: 18px;
  text-transform: uppercase;
}
@media only screen and (max-width: 1200px) {
  .main-card-class {
    transform-style: preserve-3d;
    width: 300px;
    height: 180px;
    transition: all 0.5s ease;
  }

  .card-number-tag {
    position: absolute;
    top: 105px;
    font-size: 16px;
  }

  .card-expiration-data-tag {
    top: 125px;
  }

  .card-holder-tag {
    top: 145px;
    font-size: 16px;
  }

  .credit-card-class-back img {
    position: absolute;
    width: 60px;
    top: 110px;
    right: 10px;
  }

  .banner-back-side-infos {
    top: 90px;
  }

  .banner-back-side {
    top: 22px;
  }

  .cvv-name {
    top: 70px;
    left: 90px;
  }

  .banner-back-side-infos p {
    margin-left: 135px;
    margin-top: 7px;
  }
}

@media only screen and (max-width: 600px) {
  .main-card-class {
    max-width: 270px;
  }
}
</style>
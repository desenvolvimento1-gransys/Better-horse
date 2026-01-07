<template>
  <div v-if="!load" :style="layout.productPage.mainStyle" translate="no">
    <v-row no-gutters justify="center">
      <v-col :style="layout.productPage.availableImgColStyle" cols="12" md="7">
        <v-row no-gutters justify="center">
          <v-col cols="3" class="mr-5">
            <v-row no-gutters justify="end" class="thumbnail-sizing">
              <v-col cols="12" lg="8" class="thumbnail-scroll">
                <span v-for="(item, index) in availablesImgs" :key="index">
                  <v-card
                    tile
                    :style="layout.productPage.availableImgCardStyle"
                    @click="setSelectedImg(item.name)"
                    class="mb-5"
                  >
                    <v-img
                      contain
                      class="thumbnail"
                      :style="layout.productPage.availableImgStyle"
                      :src="item.url300px"
                      aspect-ratio="0.9"
                      alt="Thumbnail da imagem do produto"
                    ></v-img>
                  </v-card>
                </span>
              </v-col>
            </v-row>
          </v-col>
          <v-col
            :style="layout.productPage.selectedImgColStyle"
            class="no-padding"
            cols="8"
            xl="7"
          >
            <zoom-on-hover
              class="magnifier"
              :img-normal="selectedUrlImg.highQuality"
              :scale="1.5"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col
        class="no-padding"
        :style="layout.productPage.informationColStyle"
        cols="4"
      >
        <p
          :style="layout.productPage.productNameStyle"
          :class="layout.productPage.productNameClass"
        >
          {{ product.name }}
        </p>
        <p
          v-if="config.product.showBrandInProductPage"
          :style="layout.productPage.brand.style"
          :class="layout.productPage.brand.class"
        >
          Marca: {{ product.brand_name }}
        </p>
        <p
          v-if="layout.productPage.ref.show"
          :style="layout.productPage.ref.style"
          :class="layout.productPage.ref.class"
        >
          Ref: {{ product.ref }}
        </p>
        <p
          v-if="product.balance < 1"
          :style="layout.productPage.noStock.style"
          :class="layout.productPage.noStock.class"
        >
          {{ layout.productPage.noStock.name }}
        </p>
        <p>
          <warn-me
            v-if="product.balance < 1"
            btntext="Avise-me quando chegar"
          />
        </p>
        <div
          v-if="
            availablesCodeColors[0] &&
            (config.product.showColorIfOnlyOne ||
              availablesCodeColors.length > 1) &&
            product.balance > 0 &&
            !(
              availablesCodeColors.length == 1 &&
              selectedColorName == 'N/A' &&
              !config.product.showColorIfNA
            )
          "
          :style="layout.productPage.color.mainStyle"
        >
          <p
            :style="layout.productPage.color.titleStyle"
            :class="layout.productPage.color.titleClass"
          >
            Cores Disponiveis :
          </p>
          <span v-for="(item, index) in availablesCodeColors" :key="index">
            <v-btn
              tile
              v-if="item"
              @click="setSelectedColor(item)"
              :style="
                setColorBtnStyle(
                  layout.productPage.color.btnStyle,
                  item,
                  layout.productPage.color.selectedBtnStyle
                )
              "
              :class="layout.productPage.color.btnClass"
            ></v-btn>
            <!-- </span> -->
          </span>
          <p>{{ selectedColorName }}</p>
        </div>
        <div
          v-if="
            ordenateAvailablesSizes[0] &&
            (config.product.showSizeIfOnlyOne ||
              ordenateAvailablesSizes.length > 1) &&
            product.balance > 0 &&
            !(
              ordenateAvailablesSizes.length == 1 &&
              ordenateAvailablesSizes[0] == 'N/A' &&
              !config.product.showSizeIfNA
            )
          "
          :style="layout.productPage.size.mainStyle"
        >
          <p
            :style="layout.productPage.size.titleStyle"
            :class="layout.productPage.size.titleClass"
          >
            Tamanhos Disponiveis :
          </p>

          <span v-for="(item, index) in ordenateAvailablesSizes" :key="index">
            <v-btn
              tile
              v-if="item"
              :style="
                setSizeBtnStyle(
                  layout.productPage.size.btn.defaultStyle,
                  layout.productPage.size.btn.selectedStyle,
                  item,
                  !enabledSizes.includes(item),
                  layout.productPage.size.btn.disabledStyle
                )
              "
              @click="setSelectedSize(item)"
              :disabled="!enabledSizes.includes(item)"
            >
              {{ item }}
            </v-btn>
          </span>
        </div>
        <atribute-component
          v-if="config.atribute && config.atribute.show"
          :atributes="product.product_atribute"
        />

        <div :style="layout.productPage.priceAndBuy.mainStyle">
          <v-row>
            <v-col cols="5">
              <span
                v-if="
                  product.actived_promotions &&
                  product.actived_promotions.length >= 1
                "
                ><strike>
                  R$
                  {{
                    (
                      parseFloat(product.actived_promotions[0].discount_value) +
                      parseFloat(product.price)
                    ).toLocaleString("pt-BR", {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2,
                    })
                  }}
                </strike>
              </span>
              <p :style="layout.productPage.priceAndBuy.priceStyle">
                R$
                {{
                  parseFloat(product.price).toLocaleString("pt-BR", {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  })
                }}
              </p>
              <p
                v-if="layout.productPage.priceAndBuy.installments"
                :style="layout.productPage.priceAndBuy.installmentStyle"
              >
                ou {{ maximumInstallment }}x de R${{ minimumValue }}
              </p>
            </v-col>
            <v-col cols="7" align-self="center">
              <v-btn
                @click="setGridIdAndAddItemInCart()"
                :disabled="product.balance < 1"
                :style="layout.productPage.priceAndBuy.buyBtnStyle"
                >Comprar</v-btn
              >
            </v-col>
            <br />
            <div v-if="product.delivery_rule == 1">
              <v-col v-if="fobOptions.addFreightByTheBuyerInDefaultDeskScreen">
                <span
                  v-if="fobOptions.AddtextFreightByFOB"
                  class="txt-freight-buyer"
                  >{{ fobOptions.textFreightByFOB }}</span
                >
                <br />
                <a
                  v-if="this.fobOptions.buttonFreightByTheBuyer"
                  target="_blank"
                  :href="whattsLink"
                  style="color: red; font-weight: bold"
                >
                  {{ fobOptions.textButtonFreightByTheBuyer }}
                </a>
              </v-col>
            </div>
            <div v-else>
              <v-col cols="12">
                <deliveryCalculator />
              </v-col>
            </div>
          </v-row>
        </div>
        <div :style="layout.productPage.description.mainStyle">
          <p :style="layout.productPage.description.titleStyle">Descrição:</p>
          <p :style="layout.productPage.description.textStyle">
            {{ product.description }}
          </p>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import AtribueComponent from "@/components/body/productSession/productScreen/components/others/atributeComponent";
import deliveryCalculator from "@/components/body/productSession/productScreen/components/others/deliveryCalculator";
import WarnMe from "@/components/body/productSession/productScreen/components/others/warnMe";

export default {
  components: {
    AtribueComponent,
    deliveryCalculator,
    WarnMe,
  },
  data: function () {
    return {
      maximumInstallment: "",
      minimumValue: "",
      whattsLink: null,
    };
  },
  computed: {
    ...mapState("Product", [
      "product",
      "load",
      "selectedColor",
      "selectedSize",
    ]),
    ...mapState("Layouts", ["layout", "fobOptions", "config"]),
    ...mapGetters("Product", [
      "selectedUrlImg",
      "availablesImgs",
      "availablesCodeColors",
      "ordenateAvailablesSizes",
      "enabledSizes",
      "selectedColorName",
      "installmentResult",
    ]),
  },
  methods: {
    ...mapActions("Product", [
      "setSelectedImg",
      "setSelectedColor",
      "setSelectedSize",
      "setGridIdAndAddItemInCart",
    ]),

    setColorBtnStyle(style, bgColor, selectedBtnStyle, selected) {
      if (bgColor == this.selectedColor) {
        return {
          ...selectedBtnStyle,
          background: bgColor,
        };
      } else {
        return {
          ...style,
          background: bgColor,
        };
      }
    },
    setSizeBtnStyle(
      defaultStyle,
      selectedStyle,
      size,
      disabled,
      disabledStyle
    ) {
      if (disabled) {
        return disabledStyle;
      } else {
        if (size == this.selectedSize) {
          return selectedStyle;
        } else {
          return defaultStyle;
        }
      }
    },
  },
  mounted: function () {
    const installmentArray = this.installmentResult();
    this.maximumInstallment = installmentArray[0];
    this.minimumValue = installmentArray[1];
    this.whattsLink = `${this.layout.floatingIcon.link}&text=Olá, gostaria de cotar o frete do pedido: ${this.product.name}`;
  },
};
</script>

<style scoped>
button:focus,
button:active {
  border: 1px solid black;
  background: none;
  outline: none;
  padding: 0;
}

.thumbnail-scroll {
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}

.thumbnail-sizing {
  height: 40vw;
  max-height: 670px;
}
.txt-freight-buyer {
  color: rgb(0, 0, 0);
  font-size: 16px;
}
.thumbnail >>> .v-image__image {
  background-position: center top !important;
}

/* .magnifier >>> .v-image__image {
  background-position: center top !important;
} */

.magnifier {
  height: 100%;
}

.magnifier:hover {
  border: 2px solid black;
  cursor: zoom-in;
}

.magnifier >>> .normal {
  background-position: center top !important;
  height: 100%;
  object-fit: contain !important;
}
</style>
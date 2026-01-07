<template>
  <span v-if="!load" translate="no">
    <v-row :style="layout.productPage.mobile.mainRowStyle">
      <v-col cols="12" align="center">
        <p
          :style="layout.productPage.mobile.productNameStyle"
          :class="layout.productPage.mobile.productNameClass"
        >
          {{ product.name }}
        </p>
      </v-col>
      <v-col
        :style="layout.productPage.mobile.selectedImgColStyle"
        class="no-padding"
        cols="12"
      >
        <v-img
          v-if="selectedUrlImg.highQuality"
          :src="selectedUrlImg.highQuality"
          :lazy-src="selectedUrlImg.lowQuality"
          alt="Imagem do produto"
        ></v-img>
      </v-col>
      <v-col cols="12">
        <div style="overflow-x: hidden">
          <div
            style="
              width: 104%;
              overflow-y: hidden;
              overflow-x: auto;
              white-space: nowrap;
              margin: 0 -3vw;
            "
          >
            <v-img
              contain
              style="display: inline-block; margin-left: 3vw"
              width="100"
              height="100"
              v-for="(item, index) in availablesImgs"
              :key="index"
              @click="setSelectedImg(item.name)"
              class="pointer"
              :src="item.url300px"
              alt="Thumbnail da imagem do produto"
            ></v-img>
          </div>
        </div>
      </v-col>
      <v-col cols="12">
        <p
          v-if="config.product.showBrandInProductPage"
          :style="layout.productPage.mobile.brand.style"
          :class="layout.productPage.mobile.brand.class"
        >
          Marca: {{ product.brand_name }}
        </p>
        <p
          v-if="layout.productPage.mobile.ref.show"
          :style="layout.productPage.mobile.ref.style"
          :class="layout.productPage.mobile.ref.class"
        >
          Ref: {{ product.ref }}
        </p>
        <p
          v-if="product.balance < 1"
          :style="layout.productPage.noStock.mobile.style"
          :class="layout.productPage.noStock.mobile.class"
        >
          {{ layout.productPage.noStock.mobile.name }}
        </p>
      </v-col>
      <v-col cols="12" align="center">
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
          :style="layout.productPage.mobile.color.mainStyle"
        >
          <p
            :style="layout.productPage.mobile.color.titleStyle"
            :class="layout.productPage.mobile.color.titleClass"
          >
            Cores Disponiveis :
          </p>
          <span v-for="(item, index) in availablesCodeColors" :key="index">
            <v-btn
              tile
              @click="setSelectedColor(item)"
              :style="
                setColorBtnStyle(
                  layout.productPage.mobile.color.btnStyle,
                  item,
                  layout.productPage.mobile.color.selectedBtnStyle
                )
              "
              :class="layout.productPage.mobile.color.btnClass"
            ></v-btn>
            <!-- </span> -->
          </span>
          <p>{{ selectedColorName }}</p>
        </div>
      </v-col>
      <v-col cols="12" align="center">
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
          :style="layout.productPage.mobile.size.mainStyle"
        >
          <p
            :style="layout.productPage.mobile.size.titleStyle"
            :class="layout.productPage.mobile.size.titleClass"
          >
            Tamanhos Disponiveis :
          </p>

          <span v-for="(item, index) in ordenateAvailablesSizes" :key="index">
            <v-btn
              tile
              v-if="item"
              :style="
                setSizeBtnStyle(
                  layout.productPage.mobile.size.btn.defaultStyle,
                  layout.productPage.mobile.size.btn.selectedStyle,
                  item,
                  !enabledSizes.includes(item),
                  layout.productPage.mobile.size.btn.disabledStyle
                )
              "
              @click="setSelectedSize(item)"
              :disabled="!enabledSizes.includes(item)"
            >
              {{ item }}
            </v-btn>
          </span>
        </div>
      </v-col>
      <v-col cols="12" align="center">
        <div :style="layout.productPage.mobile.priceAndBuy.mainStyle">
          <v-row>
            <v-col cols="12">
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
              <p :style="layout.productPage.mobile.priceAndBuy.priceStyle">
                R$
                {{
                  parseFloat(product.price).toLocaleString("pt-BR", {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  })
                }}
              </p>
              <p
                v-if="layout.productPage.mobile.priceAndBuy.installments"
                :style="layout.productPage.mobile.priceAndBuy.installmentStyle"
              >
                ou {{ maximumInstallment }}x de R${{ minimumValue }}
              </p>
            </v-col>
            <v-col cols="12">
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
        <div :style="layout.productPage.mobile.description.mainStyle">
          <p :style="layout.productPage.mobile.description.titleStyle">
            Descrição:
          </p>
          <p :style="layout.productPage.mobile.description.textStyle">
            {{ product.description }}
          </p>
        </div>
      </v-col>
    </v-row>
  </span>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import deliveryCalculator from "@/components/body/productSession/productScreen/components/others/deliveryCalculator";

export default {
  components: {
    deliveryCalculator,
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
.txt-freight-buyer-mobile {
  color: rgb(0, 0, 0);
  font-size: 16px;
}
</style>
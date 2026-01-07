<template>
  <v-row justify="center">
    <v-dialog
      :style="layout.cart.cartDialog.dialog.style"
      :class="layout.cart.cartDialog.dialog.class"
      @keydown.esc="setCartModal(false)"
      @click:outside="setCartModal(false)"
      v-model="cartDialog"
      scrollable
      :max-width="layout.cart.cartDialog.dialog.maxWidth"
    >
      <v-card :style="layout.cart.cartDialog.card.style">
        <v-container>
          <v-row :style="layout.cart.cartDialog.headerRow.style">
            <v-col
              :style="layout.cart.cartDialog.titleCol.style"
              cols="10"
              sm="11"
              ><p
                :style="layout.cart.cartDialog.titleCol.textStyle"
                :class="layout.cart.cartDialog.titleCol.textClass"
              >
                {{ layout.cart.cartDialog.titleCol.title }}
              </p></v-col
            >
            <v-col cols="1" align="right"
              ><button @click="setCartModal(false)" icon>
                <i class="mdi mdi-close"></i></button
            ></v-col>
          </v-row>
          <modal-spinner>
            <br />
            <cart-dialog />
            <span v-if="totalAmountInCart > 0">
              <div :style="layout.cart.cartDialog.list.productStyle">
                <v-row
                  v-for="(item, index) in productsWithImgUrl"
                  :key="index"
                  :class="layout.cart.cartDialog.list.rowClass"
                  :style="layout.cart.cartDialog.list.rowStyle"
                >
                  <v-col
                    :style="layout.cart.cartDialog.list.img.colStyle"
                    :cols="layout.cart.cartDialog.list.img.cols"
                    :sm="layout.cart.cartDialog.list.img.sm"
                  >
                    <v-img
                      :style="layout.cart.cartDialog.list.img.imgStyle"
                      :src="item.imgUrl"
                      alt="Imagem do produto na sacola"
                    ></v-img>
                  </v-col>
                  <v-col
                    :cols="layout.cart.cartDialog.list.information.cols"
                    :sm="layout.cart.cartDialog.list.information.sm"
                  >
                    <p
                      :style="layout.cart.cartDialog.list.information.nameStyle"
                      class="nameText"
                    >
                      {{ item.name }}
                    </p>
                    <small>
                      <p
                        v-if="item.color !== 'N/A'"
                        :style="
                          layout.cart.cartDialog.list.information.colorStyle
                        "
                        class="text"
                      >
                        <strong>Cor: </strong>{{ item.color }}
                      </p>
                      <p
                        v-if="item.color !== 'N/A'"
                        :style="
                          layout.cart.cartDialog.list.information.sizeStyle
                        "
                        class="text"
                      >
                        <strong>Tamanho: </strong>
                        <span style="text-transform: uppercase">
                          {{ item.size }}
                        </span>
                      </p>
                      <p
                        :style="
                          layout.cart.cartDialog.list.information.qtdStyle
                        "
                        class="text"
                        v-if="!layout.cart.cartDialog.list.qtd.input"
                      >
                        <strong>Qtd </strong>{{ parseInt(item.amount) }}
                      </p>
                      <atribute-component
                        v-if="item.atributes && item.atributes.length > 0"
                        :data="item.atributes"
                      />

                      <p v-if="item.balance < 1" style="color: red">
                        Produto Indisponível
                      </p>
                    </small>
                  </v-col>
                  <v-col
                    v-if="layout.cart.cartDialog.list.qtd.input"
                    :cols="layout.cart.cartDialog.list.qtd.cols"
                    :sm="layout.cart.cartDialog.list.qtd.sm"
                    align="center"
                  >
                    <p :style="layout.cart.cartDialog.list.qtd.labelStyle">
                      Qtd
                    </p>
                    <v-text-field
                      dense
                      readonly
                      flat
                      solo
                      v-model="item.amount"
                      label="QTD"
                      type="text"
                      :style="layout.cart.cartDialog.list.qtd.inputStyle"
                      class="qtd-input"
                      :disabled="item.balance < 1"
                      ><v-icon
                        small
                        :disabled="item.amount < 2"
                        @click="
                          changeItemAmount({
                            index: index,
                            amount: item.amount - 1,
                          })
                        "
                        slot="prepend"
                        color="black"
                      >
                        mdi-minus-circle
                      </v-icon>
                      <v-icon
                        small
                        @click="
                          changeItemAmount({
                            index: index,
                            amount: item.amount + 1,
                          })
                        "
                        slot="append-outer"
                        color="black"
                        :disabled="item.balance < 1"
                      >
                        mdi-plus-circle
                      </v-icon>
                    </v-text-field>
                  </v-col>
                  <v-col
                    :align="layout.cart.cartDialog.list.price.colAlign"
                    :cols="layout.cart.cartDialog.list.price.cols"
                    :sm="layout.cart.cartDialog.list.price.sm"
                  >
                    <p
                      v-show="item.size !== 'N/A'"
                      :style="layout.cart.cartDialog.list.price.totalStyle"
                      class="priceText"
                    >
                      R$
                      {{
                        (item.amount * item.price).toLocaleString("pt-BR", {
                          maximumFractionDigits: 2,
                          minimumFractionDigits: 2,
                        })
                      }}
                    </p>
                    <p
                      :style="layout.cart.cartDialog.list.price.eachStyle"
                      class="text"
                    >
                      ( R$
                      {{
                        item.price.toLocaleString("pt-BR", {
                          maximumFractionDigits: 2,
                          minimumFractionDigits: 2,
                        })
                      }}
                      cada)
                    </p>
                    <p v-if="item.atributesValue > 0">
                      <span>Atributos</span><br />
                      <strong>
                        R$
                        {{
                          item.atributesValue.toLocaleString("pt-BR", {
                            maximumFractionDigits: 2,
                            minimumFractionDigits: 2,
                          })
                        }}
                      </strong>
                    </p>
                    <button
                      :style="layout.cart.cartDialog.list.removeButton.style"
                      @click="removeItem(index)"
                    >
                      Remover
                    </button>
                  </v-col>
                </v-row>
              </div>
            </span>
            <v-row v-else justify="center">
              <v-col cols="12" align="center">
                <span
                  :style="layout.cart.cartDialog.noItemIcon.style"
                  :class="layout.cart.cartDialog.noItemIcon.class"
                />
              </v-col>
              <v-col cols="12" align="center">
                <span :style="layout.cart.cartDialog.emptyText.style">{{
                  layout.cart.cartDialog.emptyText.text
                }}</span>
              </v-col>
              <v-col cols="12" align="center">
                <v-btn
                  @click="setCartModal(false)"
                  :style="layout.cart.cartDialog.emptyButton.style"
                  >{{ layout.cart.cartDialog.emptyButton.text }}</v-btn
                >
              </v-col>
            </v-row>
            <v-row
              v-if="totalAmountInCart > 0"
              :style="layout.cart.cartDialog.bottomRow.style"
            >
              <v-col
                :cols="layout.cart.cartDialog.bottomRow.subTotal.cols"
                :sm="layout.cart.cartDialog.bottomRow.subTotal.sm"
                :align="layout.cart.cartDialog.bottomRow.subTotal.align"
              >
                <p
                  :class="layout.cart.cartDialog.bottomRow.subTotal.text.class"
                  :style="layout.cart.cartDialog.bottomRow.subTotal.text.style"
                >
                  <strong>Subtotal: </strong>
                  R$
                  {{
                    totalProductsValue.toLocaleString("pt-BR", {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2,
                    })
                  }}
                </p>
              </v-col>
              <v-col
                :cols="layout.cart.cartDialog.bottomRow.backToBuys.cons"
                :align="layout.cart.cartDialog.bottomRow.backToBuys.align"
              >
                <v-btn
                  block
                  :color="layout.cart.cartDialog.bottomRow.backToBuys.color"
                  :class="layout.cart.cartDialog.bottomRow.backToBuys.class"
                  :style="layout.cart.cartDialog.bottomRow.goToCart.style"
                  @click="setCartModal(false)"
                  >Voltar</v-btn
                >
              </v-col>
              <v-col
                :cols="layout.cart.cartDialog.bottomRow.goToCart.cons"
                :align="layout.cart.cartDialog.bottomRow.goToCart.align"
                :style="layout.cart.cartDialog.bottomRow.goToCart.style"
              >
                <v-btn
                  block
                  :color="layout.cart.cartDialog.bottomRow.goToCart.color"
                  :class="layout.cart.cartDialog.bottomRow.goToCart.class"
                  :style="layout.cart.cartDialog.bottomRow.goToCart.style"
                  to="/carrinho"
                  @click="setCartModal(false)"
                  >Ir Para o Carrinho</v-btn
                >
              </v-col>
            </v-row>
          </modal-spinner>
        </v-container>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import ModalSpinner from "@/components/utils/modalSpinner";
import AtributeComponent from "@/components/body/orderSection/cart/others/cartProductAtribute";
import cartDialog from "@/components/body/orderSection/cart/components/cartDialogFretch";
export default {
  components: {
    ModalSpinner,
    AtributeComponent,
    cartDialog,
  },
  computed: {
    ...mapState("Cart", ["cartDialog", "cartData"]),
    ...mapGetters("Cart", [
      "productsWithImgUrl",
      "totalAmountInCart",
      "totalProductsValue",
    ]),
    ...mapState("Layouts", ["layout", "fobOptions"]),
    ...mapState("Layouts", ["config"]),
  },
  methods: {
    // atributeSum(atributes, amount) {
    //   return 10;
    // },
    ...mapActions("Cart", [
      "setCartModal",
      "showCartItems",
      "changeItemAmount",
      "removeItem",
    ]),
  },
};
</script>
<style scoped>
.nameText {
  font-size: 14px !important;
}

.text {
  font-size: 12px;
}

.priceText {
  font-size: 16px;
}

.subtotal {
  font-size: 18px;
}

.qtd-input >>> input {
  text-align: center;
}

.cartBtn {
  font-size: 12px;
}

@media only screen and (max-width: 600px) {
  .nameText {
    font-size: 12px !important;
  }
  .text {
    font-size: 10px !important;
  }

  .priceText {
    font-size: 14px;
  }

  .subtotal {
    font-size: 14px;
  }

  .v-dialog__content >>> .v-dialog {
    margin: 10px !important;
    max-height: 99vh !important;
  }

  .cartBtn {
    font-size: 10px;
  }
}
</style>

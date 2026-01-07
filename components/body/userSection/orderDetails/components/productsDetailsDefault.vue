<template>
  <span>
    <v-card>
      <v-toolbar
        elevation="0"
        dense
        tile
        :style="layout.orderDetails.productDetails.header.style"
        class="d-block d-sm-none"
      >
        <h3 class="d-block d-md-none">Produtos</h3>
        <h2 class="d-none d-md-block">Produtos</h2>
      </v-toolbar>
      <v-toolbar
        elevation="0"
        dense
        tile
        :style="layout.orderDetails.productDetails.header.style"
        class="d-none d-sm-block"
      >
        <v-row>
          <v-col
            :cols="layout.orderDetails.productDetails.header.product.cols"
            :sm="layout.orderDetails.productDetails.header.product.sm"
          >
            <h3 class="d-block d-md-none">Produto</h3>
            <h2 class="d-none d-md-block">Produto</h2>
          </v-col>
          <v-col :cols="layout.orderDetails.productDetails.header.amount.cols">
            <h3 class="d-block d-md-none">Qtd</h3>
            <h2 class="d-none d-md-block">Qtd</h2>
          </v-col>
          <v-col
            :cols="layout.orderDetails.productDetails.header.totalPrice.cols"
          >
            <h3 class="d-block d-md-none">Valor Total</h3>
            <h2 class="d-none d-md-block">Valor Total</h2>
          </v-col>
        </v-row>
      </v-toolbar>
      <span v-for="item in orderDetails.products" :key="item.id">
        <v-row :style="layout.orderDetails.productDetails.item.style">
          <v-col
            :cols="layout.orderDetails.productDetails.item.img.cols"
            :sm="layout.orderDetails.productDetails.item.img.sm"
          >
            <v-img
              v-if="item.product_image[0]"
              max-width="80"
              :src="`${urlImg + item.product_image[0].img_name}300.jpg`"
              alt="Imagem do produto"
            ></v-img>
          </v-col>
          <v-col
            :cols="layout.orderDetails.productDetails.item.product.cols"
            :sm="layout.orderDetails.productDetails.item.product.sm"
          >
            <p>
              <strong>{{ item.name }}</strong>
            </p>
            <p v-if="item.size">
              <strong>Tamanho:</strong>
              <span style="text-transform: uppercase">{{ item.size }}</span>
            </p>
            <p v-if="item.size">
              <strong>Cor:</strong>
              {{ item.color }}
            </p>
          </v-col>
          <v-col
            class="d-block d-sm-none"
            :cols="layout.orderDetails.productDetails.item.amount.cols"
            :sm="layout.orderDetails.productDetails.item.amount.sm"
          >
            <strong>Qtd:</strong>
            {{ parseInt(item.amount) }}
          </v-col>
          <v-col
            class="d-none d-sm-block"
            :cols="layout.orderDetails.productDetails.item.amount.cols"
            :sm="layout.orderDetails.productDetails.item.amount.sm"
          >
            <h3>{{ parseInt(item.amount) }}</h3>
          </v-col>
          <v-col
            :cols="layout.orderDetails.productDetails.item.totalPrice.cols"
            :sm="layout.orderDetails.productDetails.item.totalPrice.sm"
          >
            <h3>
              R$
              {{
                parseFloat(item.total_price).toLocaleString("pt-BR", {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })
              }}
            </h3>
          </v-col>
        </v-row>
      </span>
      <v-toolbar
        elevation="0"
        dense
        tile
        :style="layout.orderDetails.productDetails.footer.style"
      >
        <v-row>
          <v-col
            :cols="layout.orderDetails.productDetails.footer.product.cols"
            :sm="layout.orderDetails.productDetails.footer.product.sm"
          >
            Total:
          </v-col>
          <v-col
            :cols="layout.orderDetails.productDetails.footer.totalPrice.cols"
            :sm="layout.orderDetails.productDetails.footer.totalPrice.sm"
          >
            <strong>
              R$
              {{
                parseFloat(orderDetails.buy.products_value).toLocaleString(
                  "pt-BR",
                  {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  }
                )
              }}
            </strong>
          </v-col>
        </v-row>
      </v-toolbar>
    </v-card>
  </span>
</template>

<script>
import { s3Url } from "@/Settings/global";
import { mapState } from "vuex";
export default {
  data: function () {
    return {
      urlImg: s3Url,
    };
  },
  computed: {
    ...mapState("Order", ["orderDetails"]),
    ...mapState("Layouts", ["layout"]),
  },
};
</script>

<style>
</style>
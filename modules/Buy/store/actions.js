import { baseApiUrl, catchError, storeId } from "@/Settings/global";
import axios from "axios";

let defaultPath = '/buy/'


const createBuy = function () {
  if ($nuxt.$store.state.Layouts.config.apiVersion && $nuxt.$store.state.Layouts.config.apiVersion.createBuy) {
    switch ($nuxt.$store.state.Layouts.config.apiVersion.createBuy) {
      case 'V1':
        return finishBuy_V1();
      case 'V2':
        return finishBuy_V2();
      default:
        return finishBuy_V1();
    }
  } else {
    finishBuy_V1();
  }
}

const finishBuy_V1 = function () {
  if (!$nuxt.$store.state.Delivery.deliveryType) {
    alert('Para continuar preencha o tipo de Entrega !!!')

  } else {


    $nuxt.$nextTick(() => {
      $nuxt.$loading.startModalSpinner()
    })
    let data = {
      company_id: storeId,
      adress_id: $nuxt.$store.state.Order.sendAddressId,
      send_type: $nuxt.$store.state.Delivery.deliveryType,
    }
    axios.post(`${baseApiUrl + defaultPath}save`, data)
      .then(res => {
        if (res.data.status == 201) {
          $nuxt.$store.dispatch("Order/setCloseOrderModal", false);
          $nuxt.$store.dispatch("Cart/cleanCart");
          $nuxt.$router.push({ path: `/pedido/pagamento/${res.data.buy_id}` })
          localStorage.removeItem("cart")
        }
      })
      .catch(e => {
        catchError(e)
      })
      .finally(() => {
        $nuxt.$nextTick(() => {
          $nuxt.$loading.finishModalSpinner()
        })
      });
  }
}

const finishBuy_V2 = function () {
  if (!$nuxt.$store.state.Delivery.deliveryType) {
    alert('Para continuar preencha o tipo de Entrega !!!')

  } else {


    $nuxt.$nextTick(() => {
      $nuxt.$loading.startModalSpinner()
    })
    let source = $nuxt.$store.getters['Delivery/getDeliverySourceInformation']
    let data = {
      company_id: storeId,
      adress_id: $nuxt.$store.state.Order.sendAddressId,
      send_type: $nuxt.$store.state.Delivery.deliveryType,
      delivery_id: source.id,
      delivery_source: source.source,
      delivery_restriction: source.restriction
    }
    axios.post(`${baseApiUrl}/v2/buy/save`, data)
      .then(res => {
        if (res.data.status == 201) {
          $nuxt.$store.dispatch("Order/setCloseOrderModal", false);
          $nuxt.$store.dispatch("Cart/cleanCart");
          $nuxt.$router.push({ path: `/pedido/pagamento/${res.data.buy_id}` })
          localStorage.removeItem("cart")
        }
      })
      .catch(e => {
        catchError(e)
      })
      .finally(() => {
        $nuxt.$nextTick(() => {
          $nuxt.$loading.finishModalSpinner()
        })
      });
  }
}

export default {
  createBuy
}
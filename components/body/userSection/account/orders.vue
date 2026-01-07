<template>
  <div>
    <tabs class="d-none d-md-flex">
      <orders-content />
    </tabs>
    <tabs-mobile class="d-flex d-md-none">
      <orders-content />
    </tabs-mobile>
  </div>
</template>

<script>
import Tabs from "@/components/body/userSection/account/components/tabs/tabsDefault";
import TabsMobile from "@/components/body/userSection/account/components/tabs/tabsMobileDefault";
import OrdersContent from "@/components/body/userSection/account/components/ordersDefault";
export default {
  components: {
    Tabs,
    TabsMobile,
    OrdersContent,
  },
};
</script>

<style>
</style>
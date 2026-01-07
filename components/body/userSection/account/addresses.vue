<template>
  <div>
    <tabs class="d-none d-md-flex">
      <my-addresses />
    </tabs>
    <tabs-mobile class="d-flex d-md-none">
      <my-addresses />
    </tabs-mobile>
  </div>
</template>

<script>
import Tabs from "@/components/body/userSection/account/components/tabs/tabsDefault";
import TabsMobile from "@/components/body/userSection/account/components/tabs/tabsMobileDefault";
import MyAddresses from "@/components/body/userSection/account/components/addresses/myAddressesDefault";
export default {
  components: {
    Tabs,
    TabsMobile,
    MyAddresses,
  },
};
</script>

<style>
</style>
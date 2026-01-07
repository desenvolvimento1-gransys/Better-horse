<template>
  <div>
    <tabs class="d-none d-md-flex">
      <people-content />
    </tabs>
    <tabs-mobile class="d-flex d-md-none">
      <people-content />
    </tabs-mobile>
  </div>
</template>

<script>
import Tabs from "@/components/body/userSection/account/components/tabs/tabsDefault";
import TabsMobile from "@/components/body/userSection/account/components/tabs/tabsMobileDefault";
import PeopleContent from "@/components/body/userSection/account/components/peopleDefault";
export default {
  components: {
    Tabs,
    TabsMobile,
    PeopleContent,
  },
};
</script>

<style>
</style>
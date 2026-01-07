<template>
  <span>
    <span v-for="(item, index) in data" :key="index">
      <span v-if="!item.typeable">
        <p
          style="margin: 0px; padding: 0px"
          v-if="parseFloat(item.additional_price) > 0"
        >
          {{ item.group_name }} : {{ item.name }} - R$
          {{
            parseFloat(item.additional_price).toLocaleString("pt-BR", {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })
          }}
          (cada)
        </p>
        <p style="margin: 0px; padding: 0px" v-else>
          {{ item.group_name }} : {{ item.name }}
        </p>
      </span>
      <span v-else>
        <p
          style="margin: 0px; padding: 0px"
          v-if="parseFloat(item.additional_price) > 0"
        >
          {{ item.name }} : {{ item.value }} - R$
          {{
            parseFloat(item.additional_price).toLocaleString("pt-BR", {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })
          }}
        </p>
        <p style="margin: 0px; padding: 0px" v-else>
          {{ item.name }} : {{ item.value }}
        </p>
      </span>
    </span>
    <!-- <h2>Atributo</h2> -->
    <!-- {{ data }} -->
  </span>
</template>

<script>
export default {
  props: {
    data: Array,
  },
};
</script>

<style>
</style>
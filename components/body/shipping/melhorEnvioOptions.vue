<template>
  <div>
    <div v-if="spinner" class="py-2 text-center">
      <v-progress-circular
        :size="24"
        :width="2"
        color="black"
        indeterminate
      ></v-progress-circular>
      <span class="ml-2 me-hint">Calculando frete...</span>
    </div>

    <div v-else-if="error" class="py-2 me-error">
      {{ error.message }}
      <div v-if="error.requestId" class="me-hint">
        Codigo de suporte: {{ error.requestId }}
      </div>
    </div>

    <div v-else-if="options.length === 0 && consulted" class="py-2 me-hint">
      Nenhuma transportadora atende este CEP no momento.
    </div>

    <!-- Modo leitura: pagina de produto, so informa precos e prazos -->
    <div v-else-if="options.length > 0 && !selectable">
      <div
        v-for="option in options"
        :key="option.service_id"
        class="me-row"
      >
        <span class="me-carrier">{{ option.label }}</span>
        <span class="me-days">{{ option.daysText }}</span>
        <span class="me-price">{{ option.priceText }}</span>
      </div>
    </div>

    <!-- Modo selecao: carrinho, o cliente escolhe o servico -->
    <v-radio-group
      v-else-if="options.length > 0 && selectable"
      :value="value"
      @change="$emit('input', $event)"
      hide-details
      class="mt-0 pt-0"
    >
      <v-radio
        v-for="option in options"
        :key="option.service_id"
        :value="option.service_id"
        :color="radioColor"
      >
        <template v-slot:label>
          <span class="me-row-radio">
            <strong>{{ option.label }}</strong>
            <span class="me-days">{{ option.daysText }}</span>
            <span class="me-price">{{ option.priceText }}</span>
          </span>
        </template>
      </v-radio>
    </v-radio-group>
  </div>
</template>

<script>
export default {
  props: {
    options: { type: Array, default: () => [] },
    spinner: { type: Boolean, default: false },
    error: { type: Object, default: null },
    // true quando o usuario ja pediu uma cotacao: distingue "vazio porque
    // ninguem calculou" de "vazio porque nao ha entrega"
    consulted: { type: Boolean, default: false },
    selectable: { type: Boolean, default: false },
    value: { type: Number, default: null },
    radioColor: { type: String, default: "black" },
  },
};
</script>

<style scoped>
.me-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding: 4px 0;
  font-size: 13px;
  border-bottom: 1px solid #eee;
}

.me-row-radio {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  flex-wrap: wrap;
}

.me-carrier {
  text-transform: uppercase;
  font-weight: bold;
  color: black;
}

.me-days {
  color: #666;
  white-space: nowrap;
}

.me-price {
  font-weight: bold;
  white-space: nowrap;
}

.me-hint {
  font-size: 12px;
  color: #666;
}

.me-error {
  font-size: 12px;
  color: #c62828;
}

@media only screen and (max-width: 600px) {
  .me-row,
  .me-row-radio {
    font-size: 11px;
  }
}
</style>

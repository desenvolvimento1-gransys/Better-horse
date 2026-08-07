import { melhorEnvio } from '@/Settings/melhorEnvio';

// Somente servicos que o provider marcou como compraveis, do mais barato ao
// mais caro, com o prazo ja acrescido dos dias de separacao da loja.
const buildOptions = function (services) {
    return (services || [])
        .filter(function (item) {
            return item.available_for_purchase;
        })
        .map(function (item) {
            let price = parseFloat(item.custom_price != null ? item.custom_price : item.price);
            let days = parseInt(
                item.custom_delivery_time != null ? item.custom_delivery_time : item.delivery_time,
                10
            ) || 0;

            let totalDays = days + melhorEnvio.handlingDays;

            return {
                service_id: item.service_id,
                carrier: item.carrier,
                service: item.service,
                label: `${item.carrier} ${item.service}`.trim(),
                price: price,
                priceText: price.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: item.currency || 'BRL',
                }),
                days: totalDays,
                daysText: totalDays === 1 ? '1 dia util' : `${totalDays} dias uteis`,
            };
        })
        .sort(function (a, b) {
            return a.price - b.price;
        });
};

const productOptions = function (state) {
    return buildOptions(state.product.services);
};

const cartOptions = function (state) {
    return buildOptions(state.cart.services);
};

const cheapestCartOption = function (state, getters) {
    return getters.cartOptions[0] || null;
};

const selectedCartOption = function (state, getters) {
    if (!state.cart.selectedServiceId) return null;
    return (
        getters.cartOptions.filter(function (item) {
            return item.service_id === state.cart.selectedServiceId;
        })[0] || null
    );
};

// Valor a somar no total do pedido. Zero enquanto nada foi escolhido.
const cartFreightPrice = function (state, getters) {
    let selected = getters.selectedCartOption;
    return selected ? selected.price : 0;
};

// A cotacao tem validade; depois disso e preciso recotar antes de fechar.
const isCartQuoteExpired = function (state) {
    if (!state.cart.quote || !state.cart.quote.expires_at) return false;
    return new Date(state.cart.quote.expires_at).getTime() < Date.now();
};

export default {
    productOptions,
    cartOptions,
    cheapestCartOption,
    selectedCartOption,
    cartFreightPrice,
    isCartQuoteExpired,
};

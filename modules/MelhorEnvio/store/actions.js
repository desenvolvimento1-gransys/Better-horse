import api from '@/modules/MelhorEnvio/api';
import { melhorEnvio, dimensionsForProduct } from '@/Settings/melhorEnvio';

// Cotacao da pagina de produto: sempre 1 unidade do item aberto.
const quoteProduct = function ({ commit, rootState }, rawCep) {
    let cep = sanitizeCep(rawCep);
    if (cep.length !== 8) return Promise.resolve(null);

    let product = rootState.Product.product;
    if (!product || !product.grid || !product.grid[0]) return Promise.resolve(null);

    commit('SET_CEP', { scope: 'product', value: cep });

    let dimensions = dimensionsForProduct(product);
    let items = [
        {
            id: String(product.id),
            quantity: 1,
            insurance_value: parseFloat(product.price) || 0,
            weight: dimensions.weight,
            width: dimensions.width,
            height: dimensions.height,
            length: dimensions.length,
        },
    ];

    return requestQuote({ commit }, 'product', cep, items);
};

// Cotacao do carrinho: um `product` por linha, com a quantidade real.
const quoteCart = function ({ commit, rootState }, rawCep) {
    let cep = sanitizeCep(rawCep);
    if (cep.length !== 8) return Promise.resolve(null);

    let cartData = rootState.Cart.cartData || [];
    if (cartData.length === 0) {
        commit('RESET', 'cart');
        return Promise.resolve(null);
    }

    commit('SET_CEP', { scope: 'cart', value: cep });

    let items = cartData.map(function (line) {
        let dimensions = dimensionsForProduct(line);
        return {
            id: String(line.grid_id || line.product_id || line.id),
            quantity: parseInt(line.amount, 10) || 1,
            insurance_value: parseFloat(line.price) || 0,
            weight: dimensions.weight,
            width: dimensions.width,
            height: dimensions.height,
            length: dimensions.length,
        };
    });

    return requestQuote({ commit }, 'cart', cep, items);
};

// Grava no Hub qual servico o cliente escolheu. E pre-condicao para criar o
// shipment depois, entao falha aqui nao pode travar a selecao na tela.
const selectCartService = function ({ commit, state }, serviceId) {
    commit('SET_SELECTED_SERVICE', serviceId);

    if (!state.cart.quote || !state.cart.quote.quote_id) return Promise.resolve(null);

    return api
        .selectService(state.cart.quote.quote_id, serviceId)
        .catch(function (e) {
            // selecao local ja aconteceu; so registramos a falha de persistencia
            let described = api.describeError(e);
            console.warn('[MelhorEnvio] select-service falhou:', described.code, described.requestId);
            return null;
        });
};

const resetProductQuote = function ({ commit }) {
    commit('RESET', 'product');
};

const resetCartQuote = function ({ commit }) {
    commit('RESET', 'cart');
};

// --- PRIVADAS -----------------------------------------------------------

const requestQuote = function ({ commit }, scope, cep, items) {
    commit('SET_SPINNER', { scope, value: true });
    commit('SET_ERROR', { scope, value: null });

    let payload = {
        connection_id: melhorEnvio.connectionId,
        from: { postal_code: melhorEnvio.originPostalCode },
        to: { postal_code: cep },
        products: items,
    };

    return api
        .createQuote(payload)
        .then(function (quote) {
            commit('SET_QUOTE', { scope, value: quote });
            return quote;
        })
        .catch(function (e) {
            let described = api.describeError(e);
            commit('SET_QUOTE', { scope, value: null });
            commit('SET_ERROR', { scope, value: described });
            return null;
        })
        .finally(function () {
            commit('SET_SPINNER', { scope, value: false });
        });
};

const sanitizeCep = function (value) {
    if (!value) return '';
    return value.toString().replace(/\D/g, '');
};

export default {
    quoteProduct,
    quoteCart,
    selectCartService,
    resetProductQuote,
    resetCartQuote,
};

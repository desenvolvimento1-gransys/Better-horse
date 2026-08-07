// Client HTTP do Shipping Hub. Isola o transporte do resto da aplicacao:
// trocar `mock` por `proxy` nao deve exigir mudanca em nenhum componente.
import axios from 'axios';
import { melhorEnvio } from '@/Settings/melhorEnvio';

const buildClient = function () {
    let headers = { 'Content-Type': 'application/json' };

    if (melhorEnvio.mode === 'direct' && melhorEnvio.apiKey) {
        // A API nao aceita `x-api-key`; o unico header suportado e Authorization.
        headers['Authorization'] = `Bearer ${melhorEnvio.apiKey}`;
    }

    return axios.create({
        baseURL: melhorEnvio.baseUrl,
        timeout: 20000,
        headers,
    });
};

// POST /v1/quotes -> 201 Quote { quote_id, connection_id, expires_at, services[] }
const createQuote = function (payload) {
    if (melhorEnvio.mode === 'mock') {
        return mockQuote(payload);
    }
    return buildClient()
        .post('/v1/quotes', payload)
        .then((res) => res.data);
};

// POST /v1/quotes/{quote_id}/select-service -> 200 Quote
const selectService = function (quoteId, serviceId) {
    if (melhorEnvio.mode === 'mock') {
        return Promise.resolve({ quote_id: quoteId, selected_service_id: serviceId });
    }
    return buildClient()
        .post(`/v1/quotes/${quoteId}/select-service`, { service_id: serviceId })
        .then((res) => res.data);
};

// Traduz o envelope de erro da API ({ error: { code, message, request_id } })
// para uma mensagem exibivel. Mantem o request_id para suporte.
const describeError = function (e) {
    let fallback = 'Nao foi possivel calcular o frete agora. Tente novamente.';

    if (!e || !e.response) {
        return { message: fallback, code: 'NETWORK', requestId: null };
    }

    let status = e.response.status;
    let body = e.response.data || {};
    let apiError = body.error || {};

    if (status === 401) {
        return {
            message: 'Frete indisponivel no momento.',
            code: apiError.code || 'UNAUTHENTICATED',
            requestId: apiError.request_id || null,
        };
    }
    if (status === 403) {
        return {
            message: 'Frete indisponivel no momento.',
            code: apiError.code || 'FORBIDDEN',
            requestId: apiError.request_id || null,
        };
    }
    if (status === 400 || status === 404 || status === 409) {
        return {
            message: apiError.message || 'Nao encontramos entrega para este CEP.',
            code: apiError.code || `HTTP_${status}`,
            requestId: apiError.request_id || null,
        };
    }

    return {
        message: fallback,
        code: apiError.code || `HTTP_${status}`,
        requestId: apiError.request_id || null,
    };
};

// --- MOCK ---------------------------------------------------------------
// Devolve exatamente o shape de `Quote` do OpenAPI para que a troca de modo
// nao mude nada a jusante. Deterministico: mesmo CEP + mesmo peso = mesmo preco.

const mockQuote = function (payload) {
    let destination = (payload.to && payload.to.postal_code) || '';
    let origin = (payload.from && payload.from.postal_code) || '';

    let totalWeight = (payload.products || []).reduce(function (sum, item) {
        return sum + parseFloat(item.weight || 0) * parseInt(item.quantity || 1, 10);
    }, 0);

    let totalValue = (payload.products || []).reduce(function (sum, item) {
        return sum + parseFloat(item.insurance_value || 0) * parseInt(item.quantity || 1, 10);
    }, 0);

    // "distancia" grosseira pela diferenca de prefixo de CEP, so para variar o preco
    let spread = Math.abs(parseInt(destination.slice(0, 3) || '0', 10) - parseInt(origin.slice(0, 3) || '0', 10));
    let distanceFactor = 1 + Math.min(spread, 600) / 300;

    let base = 18 + totalWeight * 7.5;

    let services = [
        {
            provider: 'melhor-envio',
            service_id: 1,
            carrier: 'Correios',
            service: 'PAC',
            price: round(base * distanceFactor),
            delivery_time: Math.round(4 + spread / 120),
            currency: 'BRL',
            available_for_purchase: true,
            packages: [],
        },
        {
            provider: 'melhor-envio',
            service_id: 2,
            carrier: 'Correios',
            service: 'SEDEX',
            price: round(base * distanceFactor * 1.75),
            delivery_time: Math.round(2 + spread / 260),
            currency: 'BRL',
            available_for_purchase: true,
            packages: [],
        },
        {
            provider: 'melhor-envio',
            service_id: 3,
            carrier: 'Jadlog',
            service: '.Package',
            price: round(base * distanceFactor * 0.88),
            delivery_time: Math.round(5 + spread / 100),
            currency: 'BRL',
            // acima de 15kg a transportadora nao aceita: exercita o filtro da UI
            available_for_purchase: totalWeight <= 15,
            packages: [],
        },
    ];

    let quote = {
        quote_id: `mock_${destination}_${Math.round(totalWeight * 1000)}_${Math.round(totalValue)}`,
        connection_id: payload.connection_id,
        selected_service_id: null,
        expires_at: new Date(Date.now() + melhorEnvio.quoteTtlMs).toISOString(),
        services: services,
    };

    // CEPs que nao existem devolvem lista vazia, como o provider faria
    if (destination.length !== 8) {
        return Promise.reject({
            response: {
                status: 400,
                data: { error: { code: 'INVALID_POSTAL_CODE', message: 'CEP invalido.' } },
            },
        });
    }

    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(quote);
        }, 350);
    });
};

const round = function (value) {
    return Math.round(value * 100) / 100;
};

export default {
    createQuote,
    selectService,
    describeError,
};

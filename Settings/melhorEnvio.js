// Configuracao da integracao de frete via Shipping Hub (Gransys + Melhor Envio).
//
// IMPORTANTE - leia antes de apontar para producao:
// A API do Shipping Hub e backend-only e NAO envia cabecalhos CORS (o preflight
// OPTIONS responde 405). Alem disso este projeto roda com `target: "static"`,
// ou seja, nao existe servidor Nuxt onde esconder a API key.
//
// Portanto, em producao o `baseUrl` abaixo deve apontar para um proxy do
// backend Gransys que repassa a chamada ao Shipping Hub server-side. Somente o
// proxy conhece a `sk_live_*`. Enquanto esse proxy nao existir, mantenha
// `mode: 'mock'`.

export const melhorEnvio = {
    // 'mock'  -> nao faz rede, devolve cotacao simulada (desenvolvimento)
    // 'proxy' -> chama `baseUrl` sem Authorization; o proxy autentica (producao)
    // 'direct'-> chama o Shipping Hub direto com `apiKey` (so sandbox, exige CORS liberado)
    mode: 'mock',

    baseUrl: 'https://api-melhor-envio.up.railway.app',

    // Usado apenas quando mode === 'direct'. Nunca coloque uma sk_live_* aqui:
    // este arquivo vai inteiro para o bundle do navegador.
    apiKey: null,

    // Obrigatorio em todas as rotas de catalogo/cotacao do Shipping Hub.
    connectionId: null,

    // CEP de origem das postagens (deposito / loja fisica).
    originPostalCode: '13610000',

    // Tempo extra somado ao prazo do transportador (dias uteis de separacao).
    handlingDays: 1,

    // Cotacao expira; depois disso o front refaz a chamada.
    quoteTtlMs: 15 * 60 * 1000,

    // O catalogo Gransys nao retorna peso nem dimensoes. Ate que retorne,
    // usamos um padrao por categoria. `weight` em kg, medidas em cm.
    // Os minimos dos Correios sao 16x11x2cm e 0.3kg - nao use valores menores.
    dimensionsByCategory: {
        'calca': { weight: 0.7, width: 30, height: 6, length: 40 },
        'camisa': { weight: 0.4, width: 30, height: 5, length: 40 },
        'camiseta': { weight: 0.3, width: 30, height: 4, length: 40 },
        'bota': { weight: 1.6, width: 30, height: 18, length: 40 },
        'chapeu': { weight: 0.6, width: 38, height: 20, length: 38 },
        'cinto': { weight: 0.3, width: 20, height: 6, length: 30 },
        'bone': { weight: 0.25, width: 25, height: 12, length: 25 },
        'acessorio': { weight: 0.3, width: 20, height: 6, length: 25 },
    },

    defaultDimensions: { weight: 0.5, width: 30, height: 8, length: 40 },
};

// Normaliza "Calça" -> "calca" para casar com as chaves acima.
export const normalizeCategory = function (value) {
    if (!value) return '';
    return value
        .toString()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim();
};

// Resolve peso/dimensoes de um produto do catalogo Gransys.
export const dimensionsForProduct = function (product) {
    if (!product) return { ...melhorEnvio.defaultDimensions };

    // Se um dia o webservice passar a devolver os campos, eles ganham prioridade.
    if (product.weight && product.width && product.height && product.length) {
        return {
            weight: parseFloat(product.weight),
            width: parseFloat(product.width),
            height: parseFloat(product.height),
            length: parseFloat(product.length),
        };
    }

    let key = normalizeCategory(product.category_name);
    let match = melhorEnvio.dimensionsByCategory[key];

    if (!match) {
        // tenta casar por prefixo: "calca jeans" cai em "calca"
        let keys = Object.keys(melhorEnvio.dimensionsByCategory);
        let found = keys.filter((k) => key.indexOf(k) === 0)[0];
        if (found) match = melhorEnvio.dimensionsByCategory[found];
    }

    return { ...(match || melhorEnvio.defaultDimensions) };
};

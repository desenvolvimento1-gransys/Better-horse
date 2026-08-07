export default () => ({
    // Cotacao da pagina de produto (1 item, quantidade 1)
    product: {
        cep: null,
        quote: null,
        services: [],
        spinner: false,
        error: null,
    },
    // Cotacao do carrinho (todos os itens)
    cart: {
        cep: null,
        quote: null,
        services: [],
        spinner: false,
        error: null,
        selectedServiceId: null,
    },
})

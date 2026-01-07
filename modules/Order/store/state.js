export default () => ({
    closeOrderModal: false,
    sendAddressId: null,
    resumeList: [],
    orderHistoric: [
        {
            id: null,
            created_at: null,
            status: null
        }
    ],
    orderDetails: {
        buy: null
    },
    statusList: [
        {
            status: "0", name: "Pagamento Pendente"
        },
        { status: "1", name: "Pagamento em Análise" },
        { status: "2", name: "Separando para Entrega" },
        { status: "3", name: "Em Trânsito" },
        { status: "4", name: "Entregue" },
        { status: "5", name: "Expirado" },
        { status: "6", name: "Cancelado" },
        { status: "7", name: "Pagamento Recusado" },

    ]
})
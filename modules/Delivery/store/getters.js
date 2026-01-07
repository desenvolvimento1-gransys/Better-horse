const deliveryList = function (state) {
    let response = []
    for (var i = 0; i < state.consult.length; i++) {
        if (state.consult[i].type == 'retirada') {
            response.push({
                type: state.consult[i].type,
                text: `${state.consult[i].type.toUpperCase()} -  ${$nuxt.$store.state.Layouts.config.delivery.withdrawlText}`
            })
        } else {
            response.push({
                type: state.consult[i].type,
                text: `${state.consult[i].type.toUpperCase()} -  R$ ${state.consult[i].price.toLocaleString("pt-BR", {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                })} Prazo ${state.consult[i].term} ${checkIfOnDayOrMore(state.consult[i].term)}`
            })
        }
    }
    return response
}

const getDeliverySourceInformation = function (state) {
    let response = state.consult.filter(data => {
        return (data.type === state.deliveryType);
    })
    return { id: response[0].id, source: response[0].source, restriction: response[0].restriction }
}

const deliveryPrice = function (state) {
    if (state.deliveryType) {
        let response = state.consult.filter(function (elem) {
            return elem.type == state.deliveryType
        });
        return response[0].price
    } else {
        return 0
    }
}

//Private 

const checkIfOnDayOrMore = function (value) {
    if (value > 1) {
        return 'Dias'
    } else {
        return 'Dia'
    }
}

export default {
    deliveryList,
    deliveryPrice,
    getDeliverySourceInformation
}
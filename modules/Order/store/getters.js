const orderPrices = function (state) {
    return {
        other: state.resumeList[0],
        total: applyDiscountRate((parseFloat(state.resumeList[0].products_value))).total + parseFloat(state.resumeList[0].delivery_price),
        productsValue: (parseFloat(state.resumeList[0].products_value) + parseFloat(checkIfHaveDiscountAndSum(state.resumeList[0].discount_value))),
        paymentDiscountValue: applyDiscountRate((parseFloat(state.resumeList[0].products_value))).discountValue,
        paymentDiscountType: applyDiscountRate((parseFloat(state.resumeList[0].products_value))).type,
    }


}

//privates

const checkIfHaveDiscountAndSum = function (value) {
    if (value !== null) {
        return value
    } else {
        return 0
    }
}

const applyDiscountRate = function (value) {
    // let self = this;
    // let type = checkRulePaymentType($nuxt.$store.state.Payment.paymentMethod)
    let rules = $nuxt.$store.state.Payment.paymentInformation.rules.filter((data) => {
        return data.payment_type === checkRulePaymentType($nuxt.$store.state.Payment.paymentMethod);
    });

    let response = rules.filter(function (data) {
        return data.installments == $nuxt.$store.state.Payment.selectedInstallment;
    });
    if (
        $nuxt.$store.state.Payment.paymentInformation.rules.length > 0 &&
        $nuxt.$store.state.Payment.selectedInstallment &&
        response.length > 0
    ) {
        if (response[0].rule_type == 0) {
            return {
                total: value - (value * (response[0].rate / 100)),
                type: 'discount',
                discountValue: (value * (response[0].rate / 100))
            };
        } else {
            return {
                total: value + (value * (response[0].rate / 100)),
                type: 'fees',
                discountValue: (value * (response[0].rate / 100))
            };
        }

        // return response[0];
    } else {
        return { total: value, discountValue: 0, type: null, };
    }
}

const checkRulePaymentType = function (value) {
    console.log(value)
    switch (value) {
        case 'card':
            return 0
            break;
        case 'pix':
            return 4
            break;
        case 'boleto':
            return 3
            break;
    }
}

export default {
    orderPrices
}
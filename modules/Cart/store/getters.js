import { s3Url } from "@/Settings/global";

const onlyGridIdAndAmount = function () {
    return 10
}

const productsWithImgUrl = function (state) {
    let response = []
    if (state.cartData.length > 0) {
        for (var i = 0; i < state.cartData.length; i++) {
            let addValue = null;
            if (state.cartData[i].atribute) {

                addValue = {
                    ...state.cartData[i],
                    imgUrl: getCorrectImg(state.cartData[i]),

                    atributesValue: getAtributeProductValue(state.cartData[i].atributes, state.cartData[i].amount)
                }
                response.push(addValue)
            } else {
                addValue = {
                    ...state.cartData[i],
                    imgUrl: getCorrectImg(state.cartData[i]),

                    atributesValue: null
                }
                response.push(addValue)
            }
        }
    }
    return response
}

const totalAmountInCart = function (state) {
    let cartNumbers = state.cartData.map(a => parseFloat(a.amount))
    let teste = cartNumbers.reduce(function (prevVal, elem) {
        return parseFloat(prevVal) + parseFloat(elem);
    }, 0);
    return teste
}

const totalProductsValue = function (state) {
    let response = 0;

    for (let i = 0; i < state.cartData.length; ++i) {
        if (state.cartData[i].atributes) {
            response =
                response + (getAtributeProductValue(state.cartData[i].atributes, state.cartData[i].amount)) + parseFloat(state.cartData[i].price) * state.cartData[i].amount;
        } else {
            response =
                response + parseFloat(state.cartData[i].price) * state.cartData[i].amount;

        }
    }

    return response
}

//private
const getCorrectImg = function (value) {
    if (value.product_image[0]) {
        let img = value.product_image.filter((img) => {
            return img.color === value.color;
        });
        if (img[0]) {
            return s3Url + img[0].img_name + "300.jpg";
        } else {
            return s3Url + value.product_image[0].img_name + "300.jpg";
        }
    }
}

const getAtributeProductValue = function (data, amount) {
    if (data) {
        let sum = 0;
        data.map(function (elem) {
            if (elem.additional_price !== null) {
                return sum = sum + parseFloat(elem.additional_price)
            }
        });

        return amount * sum;
    } else {
        return 0
    }
}

export default {
    productsWithImgUrl,
    totalAmountInCart,
    totalProductsValue,
    onlyGridIdAndAmount
}
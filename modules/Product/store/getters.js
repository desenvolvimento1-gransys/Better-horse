import { s3Url } from "@/Settings/global";
import $store from '~/store'


const selectedUrlImg = function (state) {
    let hqimg;
    if (state.selectedImg) {
        hqimg = `${s3Url + state.selectedImg}1000.jpg`;
    } else {
        hqimg = $nuxt.$store.state.Layouts.layout.productPage.placeholder;
    }
    return {
        highQuality: hqimg,
        lowQuality: `${s3Url + state.selectedImg}300.jpg`
    }
}



const availablesImgs = function (state) {
    if (state.product.product_image) {

        let response = state.product.product_image.map(function (item) {
            return {

                'url300px': `${s3Url + item.img_name}300.jpg`,
                'url1000px': `${s3Url + item.img_name}1000.jpg`,
                'name': item.img_name
            }
        })
        return response
    }
}

const availablesCodeColors = function (state) {
    if (state.product.grid.length > 0) {
        let colors = state.product.grid.map((a) => a.code_color);
        return colors.filter(function (a, b) {
            return colors.indexOf(a) === b;
        });
    } else {
        return [];
    }
}

const ordenateAvailablesSizes = function (state) {
    if (state.product.grid.length > 0) {
        let totalSizes = Object.keys($nuxt.$store.state.Layouts.config.ordenationSizes).map(
            (i) => $nuxt.$store.state.Layouts.config.ordenationSizes[i]
        );

        let toRemove = state.product.grid;
        let sizes = toRemove.map((a) => a.size);
        let returnedSizes = sizes.filter(function (a, b) {
            return sizes.indexOf(a) === b;
        });

        returnedSizes = addEnabledSizes(returnedSizes)

        let ordenatedSizes = [];
        for (let i = 0; i < totalSizes.length; i++) {
            if (returnedSizes.includes(totalSizes[i].name)) {
                ordenatedSizes.push(totalSizes[i].name);
            }
        }

        if (ordenatedSizes.length == returnedSizes.length) {
            return ordenatedSizes;
        } else {
            return returnedSizes;
        }
    } else {
        return [];
    }
}

const enabledSizes = function (state) {
    let toChange = state.product.grid;
    return toChange
        .filter((i) => i.code_color == state.selectedColor)
        .map((a) => a.size);
}

const selectedColorName = function (state) {
    let selectedColor = state.product.grid.filter(function (a) {
        return a.code_color === state.selectedColor;
    });

    return (selectedColor.map((a) => a.color))[0];
}

//Private
const addEnabledSizes = function (value) {
    if (value[0] !== 'U' && value[0] !== 'N/A' && $nuxt.$store.state.Layouts.config.addExtraSizesInProductPage) {
        let letterNumber = /^[a-zA-Z]+$/;
        if (value[0].match(letterNumber)) {
            return addPMGinSizes(value)
        } else {
            return addNumbersInSizes(value)
        }
    } else {
        return value
    }
}

const addNumbersInSizes = function (value) {
    let data = value;
    if (!(Math.max(...value) < 30)) {
        if (!value.includes("36")) {
            data.push("36");
        }
        if (!value.includes("38")) {
            data.push("38");
        }
        if (!value.includes("40")) {
            data.push("40");
        }
        if (!value.includes("42")) {
            data.push("42");
        }
    }

    return data;
}

const addPMGinSizes = function (value) {
    let data = value;
    if (!value.includes("p")) {
        data.push("p");
    }
    if (!value.includes("m")) {
        data.push("m");
    }
    if (!value.includes("g")) {
        data.push("g");
    }

    return data;
}

const installmentResult = function(state) {
    let defaultValue = state.product.price

    return (value = defaultValue) => {
        let installments = 0;
        if (
            $nuxt.$store.state.Layouts.config.installmentRule &&
            $nuxt.$store.state.Layouts.config.installmentRule.minimumInstallmentValue
        ) {
            installments =
                value / $nuxt.$store.state.Layouts.config.installmentRule.minimumInstallmentValue;
    
            if (
                parseInt(installments) >
                $nuxt.$store.state.Layouts.config.installmentRule.maximumInstallmentTimes
            ) {
                installments = $nuxt.$store.state.Layouts.config.installmentRule.maximumInstallmentTimes
            }
            if (
                parseInt(installments) <
                $nuxt.$store.state.Layouts.config.installmentRule.minimumInstallmentTimes
            ) {
                installments = $nuxt.$store.state.Layouts.config.installmentRule.minimumInstallmentTimes;
            }
            // return parseInt(installments);
        } else {
            installments = $nuxt.$store.state.Layouts.config.installmentRule.minimumInstallmentTimes;
        }
    
        return [parseInt(installments), ((value / parseInt(installments)).toLocaleString("pt-BR", {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
        }))]
    }
}




export default {
    selectedUrlImg,
    availablesImgs,
    availablesCodeColors,
    ordenateAvailablesSizes,
    enabledSizes,
    selectedColorName,
    installmentResult
}
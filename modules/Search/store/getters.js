const ordenatedSizesFromFilter = function (state) {
    let response = []
    let onlySizeInSizeValues = state.sizes.map(function (item) {
        return item.size; //retorna o item original elevado ao quadrado
    });
    for (let i = 0; i < $nuxt.$store.state.Layouts.config.ordenationSizes.length; i++) {
        if (onlySizeInSizeValues.includes($nuxt.$store.state.Layouts.config.ordenationSizes[i].name)) {
            response.push({ size: $nuxt.$store.state.Layouts.config.ordenationSizes[i].name });
        }
    }
    let notFilteredValues = null
    let mapResponse = response.map(function (item) {
        return item.size; //retorna o item original elevado ao quadrado
    });
    for (let i = 0; i < onlySizeInSizeValues.length; i++) {
        if (!mapResponse.includes(onlySizeInSizeValues[i])) {
            response.push({ size: onlySizeInSizeValues[i] })
        }
    }

    return response
}

export default {
    ordenatedSizesFromFilter
}
const SET_BANNERS = function (state, payload) {
    if (payload && payload.length > 0) {
        state.layout.index.carousel.items = payload;
    }
}

export default {
    SET_BANNERS
}
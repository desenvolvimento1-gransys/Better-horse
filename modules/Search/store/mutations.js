const SET_LIST = (state, obj) => {
    state.list = obj
}

const SET_PAGES = (state, obj) => {
    state.pages = obj
}

const SET_CURRENTPAGE = (state, obj) => {
    state.currentPage = obj
}

const SET_NEXTPAGESPINNER = (state, obj) => {
    state.nextPageItemsSpinner = obj
}

const SET_SMILE = (state, obj) => {
    state.showEmptySmile = obj
}

const SET_COLORS = (state, obj) => {
    state.colors = obj
}

const SET_SIZES = (state, obj) => {
    state.sizes = obj
}

const SET_SELECTEDSIZES = (state, obj) => {
    state.selectedSizes = obj
}

const SET_SELECTEDCOLORS = (state, obj) => {
    state.selectedColors = obj
}

const SET_SECTIONNAME = (state, obj) => {
    state.sectionName = obj
}

const SET_LOADEDSEARCH = (state, obj) => {
    state.loadedSearch = obj
}





export default {
    SET_SMILE,
    SET_LIST,
    SET_PAGES,
    SET_CURRENTPAGE,
    SET_NEXTPAGESPINNER,
    SET_COLORS,
    SET_SIZES,
    SET_SELECTEDSIZES,
    SET_SELECTEDCOLORS,
    SET_SECTIONNAME,
    SET_LOADEDSEARCH
}
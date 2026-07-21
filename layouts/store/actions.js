import { baseApiUrl, storeId } from "@/Settings/global";
import axios from "axios";

const fetchLayout = function ({ commit }) {
    axios.post(`${baseApiUrl}/ecommerce/layout/index`, { id: storeId })
        .then(res => {
            if (res.data && res.data.banner && res.data.banner.length > 0) {
                const bannerData = res.data.banner[0];
                if (bannerData && bannerData.data && bannerData.data.items && bannerData.data.items.length > 0) {
                    commit('SET_BANNERS', bannerData.data.items);
                }
            }
        })
        .catch(err => {
            console.error("Erro ao buscar layout da API:", err);
        });
}

export default {
    fetchLayout
}
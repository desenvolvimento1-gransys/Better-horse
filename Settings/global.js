// // Prod
export const baseApiUrl = 'https://webservice.granshopping.com.br/api';
export const storeId = 49;
export const s3Url = 'https://granshopping.s3.amazonaws.com/products/' + storeId + '/';

// Dev
// export const baseApiUrl = 'https://shoptest.gransys.com.br/api';
// export const storeId = 2;
// export const s3Url = 'https://grancommtest.s3.amazonaws.com/products/' + storeId + '/';

// Local
// export const baseApiUrl = 'http://127.0.0.1:8000/api';

export const itensPerPage = 48;

export const catchError = function (e) {
    alert('Algo deu errado !!!')
    $nuxt.$router.push({ path: `/` })
};
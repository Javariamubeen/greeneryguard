import { getData, deleteData, postData, putData } from './../../apis/request';

export async function GetCategories() {
    const products = await getData('categories');
    return products;
}



export async function GetSeller() {
    const products = await getData('users/sellers');
    return products;
}


export async function GetProducts(sellerId) {
    let url = 'products';
    if (sellerId) {
        url += `?seller_id=${sellerId}`
    }
    const products = await getData(url);
    return products;
}

export async function GetProductById(productId) {
    const products = await getData(`products/${productId}`);
    return products;
}

export async function GetProductsByCategories(categories) {
    const products = await postData('products/filter', {categories:categories});
    return products;
}


import { getData, postData } from './../../apis/request';

export async function GetProducts() {
    const products = await getData('products');
    return products;
}

export async function GetProductById(productId) {
    const products = await getData(`products/${productId}`);
    return products;
}

export async function GetProductsByCategories(categories) {
    const products = await postData('products/filter', {categories});
    return products;
}

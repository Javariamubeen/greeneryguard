import { getData, deleteData, postData, putData } from './../../apis/request';

export async function GetProducts(sellerId) {
    let url = 'products';
    if (sellerId) {
        url += `?seller_id=${sellerId}`
    }
    const products = await getData(url);
    return products;
}


//User apis
export async function GetUsers() {
    const users = await getData('users');
    return users;
}

export async function deleteUsers(productId) {
    const users = await deleteData(`users/${productId}`);
    return users;
}

export async function addUser(body) {
    const { data } = await postData('users', body);
    return data;
}

export async function updateUser(body) {
    const { data } = await putData(`users`, body);
    return data;
}

export async function GetUserRole() {
    const products = await getData(`users/getuserrole`);
    return products;
}

export async function GetUserById(productId) {
    const products = await getData(`users/${productId}`);
    return products;
}

export async function GetProductById(productId) {
    const products = await getData(`products/${productId}`);
    return products;
}

export async function deleteProduct(productId) {
    const products = await deleteData(`products/${productId}`);
    return products;
}

export async function addProduct(body) {
    const { data } = await postData('products', body);
    return data;
}

export async function UpdateProduct(body) {
    const products = await putData('products/update', body);
    return products;
}
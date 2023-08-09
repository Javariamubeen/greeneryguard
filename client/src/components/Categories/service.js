import { getData, deleteData, postData, putData } from './../../apis/request';

export async function GetCategories() {
    return await getData('categories');
}

export async function deleteCategory(productId) {
    return await deleteData(`categories/${productId}`);
}

export async function addCategory(body) {
    const { data } = await postData('categories', body);
    return data;
}

export async function updateCategory(body,id) {
    const { data } = await putData(`categories/${id}`, body);
    return data;
}

export async function GetCategoryById(productId) {
    return await getData(`categories/${productId}`);
}

export async function GetProductById(productId) {
    return await getData(`products/${productId}`);
}


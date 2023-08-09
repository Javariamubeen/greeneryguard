import { getData, deleteData, postData, putData } from './../../apis/request';

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

export async function GetUserById(productId) {
    const products = await getData(`users/${productId}`);
    return products;
}

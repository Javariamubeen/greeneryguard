
import { getData, postData, putData } from "../../apis/request";

export async function Login(body) {
    const data = await postData('authenticate', body);
    return data;
}

export async function Register(body) {
    const data = await postData('users', body);
    return data;
}

export async function updateUserAPI(body,Id) {
    const data = await putData(`users/${Id}`, body);
    return data;
}

export async function forgetPassword(body) {
    const data = await postData('users/forgotPassword', body, false);
    return data;
}

export async function reset(body) {
    const data = await getData('users/reset', body, false);
    return data;
}

export async function resetPassword(body) {
    const data = await postData('users/resetPassword', body, false);
    return data;
}
export async function getMenue(_Id) {
    const data = await getData(`users/menue/${_Id}`);
    return data;
}

export async function updateUserMenue(body) {
    const data = await postData('users/updateUserMenue', body);
    return data;
}

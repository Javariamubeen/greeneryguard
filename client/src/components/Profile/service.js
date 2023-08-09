import {getData, putData} from "../../apis/request";

export async function changePassword(body) {
    debugger;
    const data = await putData(`users/updatePassword/${body.userId}`, body);
    return body;
}

export async function updateUserAPI(body,Id) {
    const data = await putData(`users/${Id}`, body);
    return data;
}

export async function getCustomer(id) {
    try {
        let url = `users/${id}`;
        const data = await getData(url);
        return data;
    }
    catch (err) {
        return err;
    }
}

import { getData, deleteData, postData, putData } from '../../apis/request';

export async function getOrderList(buyerId) {
    try {
        let url = `Order/list`;
        if (buyerId) {
            url += `/${buyerId}`;
        }
        const data = await getData(url);
        return data;
    }
    catch (err) {
        return err;
    }
}

export async function UpdateOrder(body) {
    try {
        const data = await putData(`Order/updateOrder`, body);
        return data;
    }
    catch (err) {
        return err;
    }
}

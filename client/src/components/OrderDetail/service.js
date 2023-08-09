import { getData, deleteData, postData, putData } from '../../apis/request';


export async function getOrderDetailList(id, sellerId) {
    try {
        let url = `orderdetail/list/${id}`;
        if (sellerId) {
            url += `/${sellerId}`;
        }
        const data = await getData(url);
        return data;
    }
    catch (err) {
        return err;
    }
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

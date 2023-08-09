import { getData, deleteData, postData, putData } from './../../apis/request';

export async function createCustomer(body) {
    try {
        const id=localStorage.getItem('ID');
        const data = await postData(`stripe/customer/${id}`, body);
        return data;
    }
    catch (err) {
        return err;
    }
}

export async function saveShipping(body) {
    try {
        const id=localStorage.getItem('ID');
        const data = await postData(`stripe/saveShipping/${id}`, body);
        return data;
    }
    catch (err) {
        return err;
    }
}

export async function postOrder(body) {
    try {
        const id=localStorage.getItem('ID');
        const data = await postData(`stripe/charge/${id}`, body);
        return data;
    }
    catch (err) {
        return err;
    }
}

export async function createOrder(body) {
    try {
        debugger;
        const id=localStorage.getItem('ID');
        const data = await postData(`stripe/createOrder/${id}`, body);
        return data;
    }
    catch (err) {
        return err;
    }
}

export async function getShippingInfo() {
    try {
        const id=localStorage.getItem('ID');
        const data = await getData(`stripe/shippingbyid/${id}`);

        return data;
    }
    catch (err) {
        return err;
    }
}

export async function getOrderList() {
    try {
        const data = await getData(`Order/list`);

        return data;
    }
    catch (err) {
        return err;
    }
}

export async function GetNotifications() {
    try {
        const data = await getData(`notifications/list`);

        return data;
    }
    catch (err) {
        return err;
    }
}
// export async function GetTemplateById(productId) {
//     try {
//         const data = await getData(`emailtemplate/${productId}`);
//         return data;
//     }
//     catch (err) {
//     }
// }

// export async function deleteTemplate(productId) {
//     const data = await deleteData(`emailtemplate/${productId}`);
//     return data;
// }

// export async function addTemplate(body) {
//     const { data } = await postData('emailtemplate', body);
//     return data;
// }
// export async function updateTemplate(body) {
//     const { data } = await putData('emailtemplate', body);
//     return data;
//}

import { getData, deleteData, postData, putData } from './../../apis/request';

//User apis
export async function GetEnquiry(sellerId) {
    let url = 'enquires';
    if (sellerId) {
        url += `?seller_id=${sellerId}`
    }
    const enquiries = await getData(url);
    return enquiries;
}

export async function deleteEnquiry(enquiryId) {
    const enquiries = await deleteData(`enquires/${enquiryId}`);
    return enquiries;
}

export async function addEnquiry(body) {
    const { data } = await postData('enquires', body);
    return data;
}

export async function updateEnquiry(body) {
    const { data } = await putData(`enquires`, body);
    return data;
}

export async function GetEnquiryById(enquiryId) {
    const enquiries = await getData(`enquires/${enquiryId}`);
    return enquiries;
}

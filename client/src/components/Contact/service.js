import { postData } from './../../apis/request';

export async function sendEmail(body) {
    const { data } = await postData('sentemails/contactUs', body);
    return data;
}
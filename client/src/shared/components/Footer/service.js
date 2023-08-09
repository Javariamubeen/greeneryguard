import { postData } from "../../../apis/request";

export async function Subscribe(body) {
    const data = await postData('subscriber', body);
    return data;
}

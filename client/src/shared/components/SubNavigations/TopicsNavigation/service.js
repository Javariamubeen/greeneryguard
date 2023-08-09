import { getData, putData, postData } from "../../../../apis/request";

export async function GetBlogs() {
    let blogs = await getData("blogs/blogTitles");
    return blogs;
}
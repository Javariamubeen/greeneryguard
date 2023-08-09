//import { BACKEND_URL } from "../../site.config";
import { ImageUrl } from "../../apis/request";
import Image from './product-not-found.png';
export function fetchSingleFileSrc(item) {
    let imgSrc = '';
    var http = new XMLHttpRequest();
    if (item && item.imageLargeUrl && item.imageLargeUrl.length > 0) {
        console.log("get image");
        imgSrc = ImageUrl + item.imageLargeUrl
        http.open('HEAD', imgSrc, false);
        http.send();
        if (http.status === 200) {
            console.log("image ok");
            imgSrc = ImageUrl + item.imageLargeUrl
        } else {
            console.log("image not ok");
            imgSrc = Image;
        }
    }
    else {
        console.log("no image");
        imgSrc = Image;
    }
    return imgSrc;
}
export function fetchImagesSrcExceptFirstIndex(item) {
    let tempArr = [];
    if (item && item.productImages && item.productImages.length > 0) {
        tempArr = item.productImages.slice(1).map(src => ImageUrl + src)
    }
    return tempArr;
}

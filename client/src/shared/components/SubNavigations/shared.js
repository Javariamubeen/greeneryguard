export const isActive = (path,key)=>{
    if (path === key){
        return true;
    }else
    if (path.includes(key)){
        return true;
    }else{
        return false;
    }
}
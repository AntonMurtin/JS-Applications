import { get, post } from "./api.js"

const endpoints={
    add:'/data/bought',
    getTotal:productId=>`/data/bought?where=productId%3D%22${productId}%22&distinct=_ownerId&count`,
    getUser:(productId,userId)=>`/data/bought?where=productId%3D%22${productId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}
export async function add(productId){
    return  post(endpoints.add,{productId});
}
export async function getTotal(productId){
    return  get(endpoints.getTotal(productId));
}
export async function getUser(productId,userId){
    return  get(endpoints.getUser(productId,userId));
}
import { get, post } from "./api.js"

const endpoints={
    add:'/data/likes',
    getTotal:albumId=>`/data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`,
    getUser:(albumId,userId)=>`/data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}
export async function add(albumId){
    return  post(endpoints.add,{albumId});
}
export async function getTotal(albumId){
    return  get(endpoints.getTotal(albumId));
}
export async function getUser(albumId,userId){
    return  get(endpoints.getUser(albumId,userId));
}
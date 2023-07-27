import { get, post } from "./api.js"

const endpoints={
    add:'/data/applications',
    getOffers:offerId=>`/data/applications?where=offerId%3D%22${offerId}%22&distinct=_ownerId&count`,
    getUserOffers:(offerId,userId)=>`/data/applications?where=offerId%3D%22${offerId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}
export async function addOffers(offerId){
    return  post(endpoints.add,{offerId});
}
export async function getTotalOffers(offerId){
    return  get(endpoints.getOffers(offerId));
}
export async function getUserOffers(offerId,userId){
    return  get(endpoints.getUserOffers(offerId,userId));
}
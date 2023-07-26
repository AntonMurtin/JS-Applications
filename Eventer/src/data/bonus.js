import { get, post } from "./api.js"

const endpoints={
    add:'/data/going',
    getPeople:eventId=>`/data/going?where=eventId%3D%22${eventId}%22&distinct=_ownerId&count`,
    getUser:(eventId,userId)=>`/data/going?where=eventId%3D%22${eventId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}
export async function addPeople(eventId){
    return  post(endpoints.add,{eventId});
}
export async function getTotalPeople(eventId){
    return  get(endpoints.getPeople(eventId));
}
export async function getUser(eventId,userId){
    return  get(endpoints.getUser(eventId,userId));
}
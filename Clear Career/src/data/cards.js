import { del, get, post, put } from "./api.js"


const endpoints={
    getAll:'/data/offers?sortBy=_createdOn%20desc',
    add:'/data/offers',
    cards:'/data/offers/',
}

export function getAllCards(){
    return get(endpoints.getAll)
}
export function addCard(data){
    return post(endpoints.add,data)
}
export function getCardById(id){
    return get(endpoints.cards+id)
}
export function delCard(id){
    return del(endpoints.cards+id)
}
export function editCard(id,data){
    return put(endpoints.cards+id,data)
}
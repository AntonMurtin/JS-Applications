import { del, get, post, put } from "./api.js"


const endpoints={
    getAll:'/data/shoes?sortBy=_createdOn%20desc',
    add:'/data/shoes',
    byId:'/data/shoes/',
    searchEl:query =>`/data/shoes?where=brand%20LIKE%20%22${query}%22`

}

export function getAllElements(){
    return get(endpoints.getAll);
}
export function addElement(data){
    return post(endpoints.add,data);
}
export function getElBiId(id){
    return get(endpoints.byId+id);
}
export function deleteElement(id){
    return del(endpoints.byId+id);
}
export function editElement(id,data){
    return put(endpoints.byId+id,data)
}
export function searchEl(query){
    return get(endpoints.searchEl(query))
}
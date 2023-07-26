const userName='userData';

export  function getUserData(){
    const data=JSON.parse(localStorage.getItem(userName));
    return data;
}

export function setUserData(data){
    return localStorage.setItem(userName,JSON.stringify(data));
}

export function clearUserData(){
    localStorage.removeItem(userName);
}

export function createSubmitHandler(collback){
    return function(ev){
        ev.preventDefault();
     const form= ev.currentTarget;
        const formData=new FormData(form);
        const data=Object.fromEntries(formData.entries());
        collback(data,form)
    }
}
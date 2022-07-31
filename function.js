// alert function
let setAlert =(msg, type="danger")=>{
    return ` <p class="alert alert-${type} d-flex justify-content-between">${msg} <button data-bs-dismiss="alert" class="btn-close"></button></p>`

}
// set data ls storage

let createls = ( key , value) =>{
    // init value
    let data =[];
    // value exeit or not exit
    if(localStorage.getItem(key)){
        data = JSON.parse(localStorage.getItem(key));
    }
    // push data ls storage
    data.push(value)
    // set data ls storage
    localStorage.setItem(key , JSON.stringify(data));

}
//update ls data
const updateLsdata = ( key , array) => {
    localStorage.setItem(key, JSON.stringify(array))
}
// read ls data
const readlsData = (key) =>{
    if(localStorage.getItem(key)){
        return JSON.parse(localStorage.getItem(key))
    }
    else{
        return false;
    }

}

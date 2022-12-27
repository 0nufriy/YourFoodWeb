import { json } from "react-router-dom";

const BASE_URL = "https://localhost:7052";


const requestStatusCode = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true"
    })
    
    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);
    return fetch(options.url,options)
    .then(response => {
        return response.status;    
    })
    
}

const requestJSON = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true"
    })
    
    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);
    return fetch(options.url,options)
    .then(response => 
        response.json().then( json =>{
            if(!response.ok){
                return Promise.reject(json);
            }
            return json
            }
        )
    )
    
    
}
//fridge
export function AllFrideStat() {
    return requestJSON({
        url: BASE_URL + "/Fridge/fridge-stat",
        method: 'GET'
    });
}
export function FridgeStatByAdress(adress) {
    return requestJSON({
        url: BASE_URL + "/Fridge/fridge-stat-by-adress?adress=" + adress,
        method: 'GET',
        body: JSON.stringify(Request)
    });
}
export function AddNewFridge(Request) {
    return requestStatusCode({
        url: BASE_URL + "/Fridge/add-fridge",
        method: 'POST',
        body: JSON.stringify(Request)
    });
}

//user
export function userList() {
    return requestJSON({
        url: BASE_URL + "/User/user-stat",
        method: 'GET'
    });
}
export function register(Request) {
    return requestStatusCode({
        url: BASE_URL + "/User/register",
        method: 'POST',
        body: JSON.stringify(Request)
    });
}
//order
export function  createNewOrdersForToday  () {
    return requestStatusCode({
        url: BASE_URL + "/Order/create-order-for-today",
        method: 'POST'
    });
}

export function setOrderState(orderRequest) {
    return requestStatusCode({
        url: BASE_URL + "/Order/update-status",
        method: 'PATCH',
        body: JSON.stringify(orderRequest)
    });
}

export function orderslist(orderRequest) {
    return requestJSON({
        url: BASE_URL + "/Order/list-for-date?From=" + orderRequest.From+"&To=" + orderRequest.To,
        method: 'GET'
    });
}

//login
export function login(loginRequest) {
    return requestStatusCode({
        url: BASE_URL + "/User/auth",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}
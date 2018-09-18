import axios from "axios";

export function setTokenHeader(token){
    if(token){
        axios.defaults.headers.common["Authorization"] = `BEARER ${token}`;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
}

export function apiCall(method, path, data){
    return new Promise((resolve, reject) => {
        return axios[method.toLowerCase()](path, data)
            // successful response subobject data
            .then(res => {
                return resolve(res.data);
            })
            .catch(err => {
                // data comes back in an object {}
                return reject(err.response.data.error);
            });
    });
}
import axios from "axios";

export function apiCall(method, path, data){
    return new Promise((resolve, reject) => {
        return axios[method](path, data)
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
import constants from "../constants.json";
import axios from "axios";

export default function APIGetStoreByID(id) {
   var config = {
        method: 'get',
        url: constants.baseAddress + `items/${id}`,
    };
    return axios(config)
        .then(response => response)
        .catch(function (error) {
            if (error.response) {
                return error.response;
            }
        })
}
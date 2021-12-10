import constants from "../constants.json";
import axios from "axios";

export default function APIGetCommentsByID(id) {
   var config = {
        method: 'get',
        url: constants.baseAddress + `rates/${id}`,
    };
    return axios(config)
        .then(response => response)
        .catch(function (error) {
            if (error.response) {
                return error.response;
            }
        })
}
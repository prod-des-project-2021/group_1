import axios from "axios";
import constants from "../constants.json";

export default function APIPostAComment(storeId, rate, comment) {
    var config = {
        method: 'post',
        headers: {
            'x-access-token': localStorage.getItem('token')
        },
        url: constants.baseAddress + 'rates',
        data: {
            storeId,
            rate,
            comment
        }
    };
    console.log(config)

    return axios(config)
        .then((response) => response)
        .catch(function (error) {
            if (error.response) {
                return error.response;
            }
        })
};


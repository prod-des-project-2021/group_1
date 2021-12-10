import constants from "../constants.json";
import axios from "axios";

export default function APIGetAllStores() {
    return axios.get(constants.baseAddress + 'items')
        .then(response => response)
        .catch((error) => console.log(error))
}
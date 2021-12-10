import axios from "axios";
import constants from "../constants.json";

export default function APILogin(username, passwordHash) {
  console.log(username, passwordHash);
  return axios.post(constants.baseAddress + `auth/login`, { username, passwordHash })
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

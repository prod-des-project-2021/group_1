import axios from "axios";
import constants from "../constants.json";

const PostRegister = (username, name, passwordHash, role) => {
  console.log(username,name,passwordHash,role);
  console.log(constants.baseAddress);
  return axios
    .post(constants.baseAddress + `auth/register`, {
      username,
      name,
      passwordHash,
      role
    })
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

export default PostRegister;

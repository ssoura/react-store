import axios from "axios";

const register = async ({ name, email, password }) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const { data } = await axios.post(
    "/api/users",
    { name, email, password },
    config
  );

  localStorage.setItem("userInfo", JSON.stringify(data));
};

const login = async ({ email, password }) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const { data } = await axios.post(
    "/api/users/login",
    { email, password },
    config
  );
  localStorage.setItem("userInfo", JSON.stringify(data));
  return data;
};

const getUserDetails = async ({ user: id, userInfo }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  const { data } = await axios.get(`/api/users/${id}`, config);
  return data;
};

const logout = () => localStorage.removeItem("userInfo");

const userService = {
  register,
  login,
  logout,
  getUserDetails,
};
export default userService;

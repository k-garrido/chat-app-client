const axios = require('axios');
const baseUrl = 'https://chat-app-kgarrido.herokuapp.com/users';

export const createUser = async (newUser) => {
  try {
    const res = await axios({
      method: 'post',
      url: baseUrl,
      data: newUser,
    });
    return res;
  } catch (error) {
    console.log(error)
  }
};
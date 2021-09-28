const axios = require('axios');
const baseUrl = 'https://chat-app-kgarrido.herokuapp.com/users';

export const postUser = async (newUser) => {
  try {
      const res = await axios({ 
          method: 'post',
          url: baseUrl,
          data: JSON.stringify(newUser), 
          });
      if (res.status !== 200) {
          return new Error('Error');
       } 
          return res;
      } catch (error) {
          return error
      }
  };

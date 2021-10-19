const axios = require('axios');
const baseUrl = 'https://chat-app-kgarrido.herokuapp.com/messages';

export const getMessagesByID =  async (roomID) => {
  try {
    const resp = await axios({
      method: 'get',
      url: `${baseUrl}/${roomID}`,
      }); 
    
    return resp;
  } catch (error) {
    console.log(error)
  }
};

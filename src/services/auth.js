const axios = require('axios');
const baseUrl = 'https://chat-app-kgarrido.herokuapp.com/auth'

export const postRequest =  (formData) => {
    const resp =  axios.post(baseUrl, formData); 
    return resp;
}

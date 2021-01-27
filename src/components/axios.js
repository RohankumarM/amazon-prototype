import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://us-central1-prototype-eb61f.cloudfunctions.net/api'
})

export default instance;
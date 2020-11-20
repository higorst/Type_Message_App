import axios from 'axios'
import Constants from '../constants/Constants';

const api = axios.create({
    baseURL: Constants.baseURL
})

export default api
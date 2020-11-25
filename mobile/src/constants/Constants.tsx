import { numbers } from './numbers'

const Constants = {
    ...numbers,
    // baseURL: 'http://192.168.0.120:3000', // local
    baseURL: 'http://3.92.26.142:3000', // aws instance
}

export default Constants
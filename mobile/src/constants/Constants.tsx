import { numbers } from './numbers'

const Constants = {
    ...numbers,
    // baseURL: 'http://192.168.0.120:3000', // local
    baseURL: 'http://34.239.129.184:3000', // aws instance
}

export default Constants
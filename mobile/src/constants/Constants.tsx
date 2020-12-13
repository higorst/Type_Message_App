import { numbers } from './numbers'

const Constants = {
    ...numbers,
    // baseURL: 'http://192.168.0.120:3000', // local
    baseURL: 'http://type-app-balancer-630600631.us-east-1.elb.amazonaws.com:3000', // aws instance
}

export default Constants
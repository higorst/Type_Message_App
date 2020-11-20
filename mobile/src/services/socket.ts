import socketio from 'socket.io-client'
import Constants from '../constants/Constants';

const socket = socketio.connect(Constants.baseURL, {
    query: { user_id: '1' },
})

export default socket
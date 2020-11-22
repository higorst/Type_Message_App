import {
    new_message,
    users_online
} from './Types';

// new message
export const newMessageRedux = (message: any) => ({
    type: new_message,
    payload: { message },
});

// users online
export const usersOnline = (users: any) => ({
    type: users_online,
    payload: { users },
});
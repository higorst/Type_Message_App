import {
    new_message,
} from './Types';

// nova mensagem
export const newMessageRedux = (message: any) => ({
    type: new_message,
    payload: { message },
});
import { request, Router } from 'express'

const routes = Router()

routes.get('/messages', (request, response) => {
    response.json({
        messages: [
            {
                id: '1',
                message: 'hi, how r u?'
            },
            {
                id: '2',
                message: 'I\'m fine and you?'
            }
        ]
    })
})

export default routes
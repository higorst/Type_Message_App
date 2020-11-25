import { request, Router } from 'express'
import ContactController from './controllers/ContactController'
import MessageController from './controllers/MessageController'

const routes = Router()

// Contact Controller
routes.get('/users', ContactController.index)
routes.get('/users/online', ContactController.online)
routes.post('/users/login', ContactController.show)
routes.post('/users/create', ContactController.create)
routes.post('/users/verify', ContactController.verify)

// Message Controller
routes.post('/messages/send', MessageController.send)

// Connection
routes.get('/status', (request, response) => {
    response.json({ message: "server up!" })
})

export default routes
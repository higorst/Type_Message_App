import { request, Router } from 'express'
import ContactController from './controllers/ContactController'

const routes = Router()

// ContactController
routes.post('/users/login', ContactController.show)
routes.post('/users/create', ContactController.create)
routes.get('/users', ContactController.index)
routes.post('/users/verify', ContactController.verify)

export default routes
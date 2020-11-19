import { request, Router } from 'express'
import ContactController from './controllers/ContactController'

const routes = Router()

const list_user_names = ['Mary', 'Gun', 'John']

// ContactController
routes.post('/users/create', ContactController.create)
routes.get('/users', ContactController.index)
routes.post('/users/verify', ContactController.verify)

export default routes
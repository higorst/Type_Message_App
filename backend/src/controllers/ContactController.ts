import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Contact from '../models/Contact'
import contactView from '../views/contact_view'
import * as Yup from 'yup'

export default {

    async show(request: Request, response: Response){
        const { user, password } = request.body
        const contactRepository = getRepository(Contact)

        const contact = await contactRepository
            .createQueryBuilder("user")
            .where("user.user = :user", {user})
            .andWhere("user.password = :password", {password})
            .select(["user.id", "user.user", "user.password", "user.image"])
            .execute()
        if (contact[0].user_id.length > 0){
            return response.json({
                id: contact[0].user_id,
                user: contact[0].user_user,
                password: contact[0].user_password,
                image: contact[0].user_image
            })
        } else {
            return response.json({
                id: '',
                user: '',
                password: '',
                image: ''
            })
        }
    },

    async index(request: Request, response: Response){
        const contactRepository = getRepository(Contact)

        const contact = await contactRepository.find()

        return response.json(contactView.renderMany(contact))
    },

    async verify(request: Request, response: Response){
        const { user } = request.body

        const contactRepository = getRepository(Contact)

        const contact = await contactRepository
            .createQueryBuilder("user")
            .where("user.user = :user", {user})
            .select(["user.user"])
            .execute()
        
        const date = new Date()
        return response.json({
            res: contact.length > 0,
            id: date + user
        })
    },

    async create(request: Request, response: Response) {
        const {
            id,
            user,
            password,
            image,
        } = request.body

        const contactRepository = getRepository(Contact)

        const data = {
            id,
            user,
            password,
            image,
        }

        const schema  = Yup.object().shape({
            id: Yup.string().required(),
            user: Yup.string().required(),
            password: Yup.string().required(),
            image: Yup.string().required(),
        })

        await schema.validate(data, {
            abortEarly: false
        })
    
        const contact = contactRepository.create(data)
    
        await contactRepository.save(contact)
        return response.status(201).json(contact)
    }
}
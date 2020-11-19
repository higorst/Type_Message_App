import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Contact from '../models/Contact'
import contactView from '../views/contact_view'
import * as Yup from 'yup'

export default {

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
        // return response.json(contactView.renderMany(contact))
    },

    async create(request: Request, response: Response) {
        const {
            id,
            user,
            password,
            image,
        } = request.body

        console.log(user)
    
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
        console.log("user created!")
        return response.status(201).json(contact)
    }
}
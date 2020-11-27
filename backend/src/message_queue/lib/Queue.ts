import Queue from 'bull'
import redisConfig from '../config/redis'

import * as jobs from '../jobs'

const queues = Object.values(jobs).map(job => ({
    bull: new Queue(job.key,
        {
            redis: {
                host: "127.0.0.1",
                port: 6379,
            },
        }
    ),
    name: job.key,
    handle: job.handle,
    options: job.options,
}))

export default {
    queues,
    add(name: any, data: any) {
        const queue = this.queues.find(queue => queue.name === name)

        return queue?.bull.add(data, queue.options)
    },
    process() {
        return this.queues.forEach(queue => {
            queue.bull.process(queue.handle)
            queue.bull.on('completed', job => {
                console.log(`[QUEUE]: Job ${queue.name} has been completed`)
                console.log()
            })
            queue.bull.on('failed', (job: any, err: any) => {
                console.log()
                console.log(`[QUEUE]: Job ${queue.name} has been failed\n         Inserting a new job`)
                if (queue.name === 'JobSendMessage') {
                    const {
                        id_contact,
                        user_contact,
                        image_contact,
                        // info - who is receiving
                        id,
                        message,
                        contact,
                        time,
                    } = job.data
                    this.add('JobStoreMessage', {
                        // info - who is sending
                        id_contact: id_contact,
                        user_contact: user_contact,
                        image_contact: image_contact,
                        // info - who is receiving
                        id: id,
                        message: message,
                        contact: contact,
                        time: time
                    })
                }
            })
        })
    }
}

// import JobSendMessage from '../jobs/JobSendMessage'

// const messageQueue = new Queue(JobSendMessage.key, redisConfig)


// export default messageQueue
import {  BullMQAdapter } from '@bull-board/api/bullMQAdapter'
import { createBullBoard }  from '@bull-board/api'
import { Queue, Worker, QueueScheduler, Job } from 'bullmq';
import { ExpressAdapter } from '@bull-board/express';
import IORedis from 'ioredis';
import 'dotenv/config'


class QueueManager {
    redisOption:object
    queueName:string
    adapter: ExpressAdapter
    connection: IORedis
    constructor(queueName:string){
        this.queueName = queueName
        this.redisOption =  {
            host:process.env.REDIS_ENDPOINT,
            port:process.env.REDIS_PORT,
            password:process.env.REDIS_PASSWORD,
            tls:false,
            maxRetriesPerRequest:null
          }
          this.adapter = new ExpressAdapter();
        this.connection = new IORedis(this.redisOption)

    }

    expressAdapter(){
        const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
            queues: [new BullMQAdapter(this.getQueue())],
            serverAdapter: this.adapter,
          });
    }

    getQueue(){
        const myQueue = new Queue(this.queueName, { 
            connection:this.connection
          }); 
        return myQueue          
    }

    //worker to be processed into the queue
    async processQueue(){
        const queueScheduler = new QueueScheduler(this.queueName, {
            connection: this.connection,
          });
        await queueScheduler.waitUntilReady();
        const worker = new Worker(this.queueName, async (job:Job) => {
          await new Promise(resolve => setTimeout(resolve, 4000))
            return { jobId: `This is the return value of job (${job.id})` };
          }, {connection:this.connection, runRetryDelay:2000});
        worker.on("completed", (job:Job)=>{
            console.log("completado",job.id)
        })
    }
}
//instantiate any queue with its name
const bananoQueue = new QueueManager("bananoQueue")

export {QueueManager, bananoQueue};
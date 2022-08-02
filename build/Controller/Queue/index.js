"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queueExample = exports.QueueManager = void 0;
const bullMQAdapter_1 = require("@bull-board/api/bullMQAdapter");
const api_1 = require("@bull-board/api");
const bullmq_1 = require("bullmq");
const express_1 = require("@bull-board/express");
const ioredis_1 = __importDefault(require("ioredis"));
require("dotenv/config");
class QueueManager {
    constructor(queueName) {
        this.queueName = queueName;
        this.redisOption = {
            host: process.env.REDIS_ENDPOINT,
            port: process.env.REDIS_PORT,
            password: process.env.REDIS_PASSWORD || "",
            tls: false,
            maxRetriesPerRequest: null,
        };
        this.adapter = new express_1.ExpressAdapter();
        this.connection = new ioredis_1.default(this.redisOption);
    }
    expressAdapter() {
        const { addQueue, removeQueue, setQueues, replaceQueues } = (0, api_1.createBullBoard)({
            queues: [new bullMQAdapter_1.BullMQAdapter(this.getQueue())],
            serverAdapter: this.adapter,
        });
    }
    getQueue() {
        const myQueue = new bullmq_1.Queue(this.queueName, {
            connection: this.connection,
        });
        return myQueue;
    }
    //worker to be processed into the queue
    async processQueue() {
        const queueScheduler = new bullmq_1.QueueScheduler(this.queueName, {
            connection: this.connection,
        });
        await queueScheduler.waitUntilReady();
        const worker = new bullmq_1.Worker(this.queueName, async (job) => {
            await new Promise((resolve) => setTimeout(resolve, 4000));
            return { jobId: `This is the return value of job (${job.id})` };
        }, { connection: this.connection, runRetryDelay: 2000 });
        worker.on("completed", (job) => {
            console.log("completado", job.id);
        });
    }
}
exports.QueueManager = QueueManager;
//instantiate any queue with its name
const queueExample = new QueueManager("queueExample");
exports.queueExample = queueExample;

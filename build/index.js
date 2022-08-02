"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Queue_1 = require("./Controller/Queue");
const app = (0, express_1.default)();
Queue_1.queueExample.expressAdapter();
Queue_1.queueExample.adapter.setBasePath('/admin');
app.use('/admin', Queue_1.queueExample.adapter.getRouter());
app.get("/add", async (req, res) => {
    //add to list queue
    Queue_1.queueExample.getQueue().add('random value', { "randomic json": `${Math.random() * 100}` }, {
        attempts: 5,
        backoff: {
            type: 'custom',
        },
    });
    res.json({ status: true });
});
app.listen("8000", async () => {
    await Queue_1.queueExample.processQueue();
    console.log("Connect into 8000");
});

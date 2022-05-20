
import express from 'express';
import {queueExample} from './Controller/Queue';



const app = express();

queueExample.expressAdapter()
queueExample.adapter.setBasePath('/admin');
app.use('/admin', queueExample.adapter.getRouter());

app.get("/add", async (req,res)=>{
  queueExample.getQueue().add('random value',{"randomic json":`${Math.random() * 100}`},{
    attempts: 5,
    backoff: {
      type: 'custom',
    },
  })
  res.json({status:true})
})

app.listen("8000", async ()=>{
  await queueExample.processQueue();

  console.log("Connect into 8000")
})

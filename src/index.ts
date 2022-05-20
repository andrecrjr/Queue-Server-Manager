
import express from 'express';
import {bananoQueue} from './Controller/Queue';



const app = express();

bananoQueue.expressAdapter()
bananoQueue.adapter.setBasePath('/admin');
app.use('/admin', bananoQueue.adapter.getRouter());


app.get("/add", async (req,res)=>{
   bananoQueue.getQueue().add('banano-address',{"banAddress":`ban_${Math.random() * 100}`},{
    attempts: 3,
    backoff: {
      type: 'custom',
    },
  })
  res.json({status:true})
})

app.listen("8000", async ()=>{
  await bananoQueue.processQueue();

  console.log("Connect into 8000")
})

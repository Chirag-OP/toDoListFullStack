import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from "mongoose";
import {toDo} from "./modules/schema.js";

const app = express()
const __filename = fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);
const port = process.env.PORT || 3000;

// mongoose.connect("your_mongo_uri_here");  -- for local mongoose database personal use as data is still not unique for users 
mongoose.connect(process.env.MONGO_URI, {        // cloud deployment
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

app.use(express.static('public')); 
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile('todolist.html', {root: path.join(__dirname,"public")})
})

app.get('/todo', async(req, res) => {
  let a=await toDo.find();
  res.json({tasks:a});
})

app.post('/todo', async(req, res) => {
  let a= await new toDo(req.body)
  await a.save();
  res.json({message:"task saved",task:a})
})

app.patch('/todo/:id', async(req,res)=>{
  const updatedTask= await toDo.findByIdAndUpdate(
    req.params.id,
    {
      value:req.body.value,
      isChecked:req.body.isChecked
    }
  )
  res.json({message:"task updated", task:updatedTask});
})

app.delete('/todo/:id', async(req,res)=>{
  const updatedTask= await toDo.findByIdAndDelete(req.params.id)
  res.json({message:"task deleted"});
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

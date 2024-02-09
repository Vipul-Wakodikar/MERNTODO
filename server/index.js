const express = require("express");
const app = express()
const mongoose = require("mongoose")
const Todo = require('./models/Todo')
const cors = require('cors')
app.use(express.json()); 
require("dotenv").config();

async function connect () {
    try {
        await mongoose.connect(process.env.API_URL);
        console.log("MongoDb connected")
    } catch (error) {
        console.error(error)
    }
}

connect()


app.use(cors({
    origin: '*',
    optionsSuccessStatus: 200,
}))

app.get('/todo', async (req, res) => { 
    const allTasks = await Todo.find();
    res.json(allTasks)
  });
 
 app.post('/todo/new', async (req,res) => {
     const newTask = await Todo.create(req.body);
     res.status(201).json({newTask})
 })

 app.post('/login', async (req,res) => {
    // const newTask = await Todo.create(req.body);
    res.status(201).json({message: "connected"})
})
 
 app.delete('/todo/delete/:id', async(req,res)=>{
     const result = await Todo.findByIdAndDelete(req.params.id)
     res.json(result)
 })

 app.put('/todo/update/:id', async(req, res) => {
    const result = await Todo.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.json(result)
 })

app.listen(process.env.PORT, () => {
    console.log('Node connected', process.env.PORT)
})

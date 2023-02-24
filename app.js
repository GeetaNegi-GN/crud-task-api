const { response } = require('express');
const express = require('express');
const app = express();
const mongoose = require('./database/mongoose');
const TaskList = require('./database/models/taskList');
const Task= require('./database/models/task');

/* 
CORS- cross origin request security
Backend - http://localhost:3000
frontend - http://localhost:4200
*/
// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Accept');

    // Pass to next layer of middleware
    next();
});
//example of middleware
app.use(express.json());//or 3rd party body parser

//Routes on REST API Endpoints or RESTFul webservices Endpoint
/*
TaskList - Create,Update,ReadTaskListBYId,ReadAllTaskList
Task - Create,Update,ReadTaskListBYId,ReadAllTaskList
*/
//Routes or ApI endpoints for tasklist model
//Get All Task lists
//http://localhost:3000/tasklists =>({Tasklists},{Tasklists})
app.get('/tasklists',(req,res)=>{
TaskList.find({})
    .then((lists)=> {res.status(200).send(lists);
    })
    .catch((error)=>{console.log(error)})
});
//endpoint to get one tasklist by tasklistid
app.get(
    '/tasklists/:tasklistId',(req,res) => {
        let tasklistId = req.params.tasklistId;
        TaskList.find({ _id: tasklistId})
        .then((taskList)=>{
            res.status(200).sendStatus(taskList);
        })
        .catch((error)=> {console.log(error)});
    }
);
//route or endpoint for creating a tasklist
app.post('/tasklists',(req,res)=>{
    //console.log("i am running");
    console.log(req.body);
   
    let taskListObj = { 'title': req.body.title};
    TaskList(taskListObj).save()
        .then((taskList) =>{ res.status(201).send(taskList);
       })
        .catch((error) => { console.log(error)});
});
//put is full update of object
app.put('/tasklists/:tasklistId',(req,res)=>{
        TaskList.findOneAndUpdate({ _id:req.params.tasklistId},{ $set : req.body})
        .then((taskList)=>{
            res.status(200).send(taskList);
        })
        .catch((error)=> {console.log(error)});
    });

//patch is partial update of one field of an object
    app.patch('/tasklists/:tasklistId',(req,res)=>{
        TaskList.findOneAndUpdate({ _id:req.params.tasklistId},{ $set : req.body})
        .then((taskList)=>{
            res.status(200).send(taskList);
        })
        .catch((error)=> {console.log(error)});
    });
//delete a tasklist by id
app.delete('/tasklists/:tasklistId',(req,res)=>{
    TaskList.findByIdAndDelete(req.params.tasklistId)
    .then((taskList)=>{
        res.status(201).send(taskList);
    })
    .catch((error)=> {console.log(error)});
});
/*
app.listen(3000,function(){
    console.log("Server started on port 3000")
});
*/
app.listen(3000,()=>{
    console.log("Server started on port 3000!")
});

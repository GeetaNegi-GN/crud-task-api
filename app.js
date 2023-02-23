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
    .then((lists)=> {res.send(lists)})
    .catch((error)=>{console.log(error)})
});


/*
app.listen(3000,function(){
    console.log("Server started on port 3000")
});
*/
app.listen(3000,()=>{
    console.log("Server started on port 3000!")
});

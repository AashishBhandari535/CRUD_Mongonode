import express, { response } from 'express';
const app=express();
import cors from 'cors';
//const port=8000;
import { DbService } from './dbService.js';

//Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended:false
}))

//Database Object Initialization
const db=DbService.getDbServiceInstance();

//Routes
//homePage
app.get('/',(req,res)=>{
    res.send("hello");
})
//retrieve all records from database
app.get('/getAll',(req,res)=>{
    const result=db.getAllData();
    result
        .then(data=>res.json({data:data}))//Here {data(key):data(value)}
        .catch(err=>console.log(err.message));
})
//insert all record into database
app.post('/insertRecord',(req,res)=>{
    console.log(req.body);
    const {name,address,email}=req.body;
    const data={name,address,email};
    const result=db.saveDocument(data);
    result
        .then(data=>res.json([data]))
        .catch(err=>console.log(err))
})
//update
app.patch('/update',(req,res)=>{
    const {name,address,email,id}=req.body;
    //console.log(name,address,email,id);
    const result = db.upDateRecords({name,address,email,id})
    return result
            .then(data=>res.json(data))
            .catch(err=>console.log(err));

})
//delete
app.delete('/delete/:id',(req,res)=>{
    const {id}=req.params;
    const result=db.deleteRecord(id);
    result
        .then(data=>res.json(data))
        .catch(err=>console.log(err))
})
//search
app.get('/search/:name',(req,res)=>{
    const {name}=req.params;
    const result = db.findRecords(name);
    result
        .then(data=>res.json({data}))
        .catch(err=>console.log(err))
})
app.listen(8000,(err)=>{
    if(err) console.log('Error connecting to database');
    console.log('Server listening at port 8000');
})



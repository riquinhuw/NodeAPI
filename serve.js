const express = require('express');

const api = express();

api.use(express.json());

api.use((req,res,next)=>{
    console.time('Request');
    console.log(`Method: ${req.method}, URL:${req.url} `);
    next();
    console.timeEnd('Request');

});

function userExist(req,res,next) {
    const {id} = req.params;
    if (id <users.length) {
        next();
    }else{
        return res.status(400).send("User does not exist");
    }
}

api.get('/teste',function(req,res){

    return res.json({message:"Hello World"});

})

var users = ["Alefe","Carlos"];

api.get('/users',(req,res)=>{
    return res.json(users);
});

api.get('/users/:id',userExist,(req,res)=>{
    const {id} = req.params;
    return res.json(users[id])

});

api.post('/users',(req,res)=>{
    const {user} = req.body;
    users.push(user);
    return res.status(201).send("User created!");
});

api.put('/users/:id',userExist,(req,res)=>{
    const {id} = req.params;
    const {name} = req.body;
    users[id] = name;
    return res.send(200).send("User Updated!");
});

api.delete('/users/:id',userExist,(req,res)=>{
    const {id} = req.params;
    users.splice(id,1);
    return res.status(200).send("User Removed");
});

api.listen(3000,()=> {
    console.log("Running in port 3000");
});
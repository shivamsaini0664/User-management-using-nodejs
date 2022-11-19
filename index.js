const filesystem = require("fs");
const express = require("express");
const application = express();


application.use(express.json());
application.use(express.urlencoded({ extended: true}));

application.get('/users', (req,res) => {
    filesystem.readFile("./user.json","utf-8",(error,data)=> {
        if(error){
            throw error;
        }
        console.log(JSON.parse(data));
        res.send(JSON.parse(data));
    });
});


application.get('/users/:id', (req,res) => {
    filesystem.readFile("./user.json","utf-8",(error,data)=> {
        if(error){
            throw error;
        }
        const require_id=req.params.id;
        let specific_user_data= [];
        let parse_data = JSON.parse(data);
        for( let user  of parse_data){
            if(user.id == require_id) {
                specific_user_data.push(user);
                
            }
        }
        console.log(JSON.parse(specific_user_data));
        res.send(JSON.parse(specific_user_data));
    });
});

application.delete('/users/:id', (req,res) => {
    filesystem.readFile("./user.json","utf-8",(error,data)=> {
        if(error){
            throw error;
        }
        const require_id = req.params["id"];
        let deleted_data = [];
        let parse_data = JSON.parse(data);
        for(let user of parse_data){
            if(user.id == require_id){
                
            }
            else{
                deleted_data.push(user);
            }
        }
        let stringifydata = JSON.stringify(deleted_data);
        filesystem.writeFile("./user.json",stringifydata,"utf-8",(error)=> {
            if(error){
                throw error;
            }
            else{
                console.log(JSON.parse(stringifydata));
                res.send(JSON.parse(stringifydata));
            }
        });
    });
});

application.put('/users/:id', (req,res) => {
    filesystem.readFile("./user.json","utf-8",(error,data)=> {
        if(error){
            throw error;
        }
        const require_id = req.params["id"];
        
        let parse_data = JSON.parse(data);
        for(let user of parse_data){
            if(user.id == require_id){
                user.name=req.body.name;
                user.address=req.body.address;
                user.pincode=req.body.pincode;
                user.state=req.body.state;
                user.hobby=req.body.hobby;
            }
        }

        let stringifydata = JSON.stringify(parse_data);
        filesystem.writeFile("./user.json",stringifydata,"utf-8",(error)=> {
            if(error){
                throw error;
            }
            else{
                console.log(JSON.parse(stringifydata));
                res.send(JSON.parse(stringifydata));
            }
        });
    });
});

application.post('/user', (req,res) => {
filesystem.readFile("./user.json","utf-8",(error,data)=> {
    if(error){
        throw error;
    }
    let parse_data=JSON.parse(data);
    let new_user_request=req.body;
    let random_id = Date.now().toString();
    new_user_request.id=random_id;
    parse_data=[new_user_request,...parse_data]
    let stringifydata = JSON.stringify(parse_data);
    filesystem.writeFile("./user.json",stringifydata,"utf-8",(error)=> {
        if(error){
            throw error;
        }
        else{
            console.log(JSON.parse(stringifydata));
            res.send(JSON.parse(stringifydata));
        }
    });
});
});

application.listen(3096, () => console.log(`streaming on PORT ${3096}!`));



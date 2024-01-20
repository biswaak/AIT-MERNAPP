import * as express from "express";
import * as mongodb from "mongodb";
import * as cors from "cors";
import * as bodyParser from "body-parser";

import obj from "../config/config";
import getConnection from "../db/db_connection";

//create the REST object
let app:any = express();
//where "app" object, used to develop the REST Services, GET, POST, PUT, DELETE..

//enables the CORS policy
app.use(cors());

//set the json as MIME type
app.use(bodyParser.json());

//parse the json
app.use(bodyParser.urlencoded({extended:false}));


//create a reference variable to connect the data base
//let mernClient:any = mongodb.MongoClient;

//create the get request
app.get("/api/products",(req:any, res:any)=>{
    /*obj.mernClient.connect("mongodb+srv://biswa2219:biswapratap44@ashokitnode.v0teiig.mongodb.net/mern?retryWrites=true&w=majority",(err:any, connect:any)=>{
        if(err) throw err;
        else{
            let db = connect.db("mern"); //err pare au gotea arugment connect with database ,jeuta ki url
            db.collection("products").find().toArray((err:any,array:any)=>{ //fetch he data or 6 items by find method and store that data by using array
                if(err) throw err;
                else{
                    res.send(array);
                }
            });
        }
    })*/
    getConnection() 
    .then((conn:any)=>{
        let db:any = conn.db("mern");
        db.collection("products") .find({}) .toArray((err:any, array:any)=>{
            if(err) throw err;
            else{
                res.send(array);
            }
        });
    });
});

//my task was - access the data by based on obj(_id), so i have to mention id here..
//let ObjectId:any = new mongodb.ObjectId();

//get the product based on id
app.get("/api/products/:id",(req:any, res:any)=>{
    /*try{
        obj.mernClient.connect("mongodb+srv://biswa2219:biswapratap44@ashokitnode.v0teiig.mongodb.net/mern?retryWrites=true&w=majority",(err:any, connect:any)=>{
            let db:any = connect.db("mern");
            db.collection("products").find({"_id":new obj.ObjectId(req.params.id)}).toArray((err:any,array:any)=>{
                if(array.length > 0)
                {
                    res.send(array[0]);
                }
                else{
                    res.send({message:"product not available"});
                }
            });
        });
    }
    catch(error){
        res.send({Message:"invalid product id"});
    }*/
    getConnection()
        .then((conn:any)=>{
            let db:any = conn.db("mern");
            try{
                db.collection("products").find({"_id":new obj.ObjectId(req.params.id)}).toArray((err:any, array:any)=>{
                    if(err) throw err;
                    else{
                        if(array.length > 0)
                        {
                            res.send(array[0])
                        }
                        else{
                            res.send({message:"product not valid"})
                        }
                    }
                });
            }
            catch(error)
            {
                res.send({"message": "invalid id"});
            }
        });
});

//assign the PORT no
let port:any = process.env.PORT || 8080;
app.listen(port,()=>{
    console.log("server started sucessfully!!!");
});










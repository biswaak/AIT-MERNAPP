//This File use to maintain "client" and "ObjectId"

import * as mongodb from "mongodb";
let mernClient:any = mongodb.MongoClient; //creating the reference variable for Cient for connect to MOngoDb.
let ObjectId = mongodb.ObjectId;


let obj:any = {
    "mernClient" : mernClient,
    "ObjectId" : ObjectId
};

export default obj; 

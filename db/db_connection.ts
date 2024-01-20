//This file return connectionobject / contain data base URL
//reason to create this file is to - not to make hard-coading in our file. and as we are goona upload this on git and for another reason as for security purpose to maintain your "URL"/"Password" secure and hidden.
import obj from "../config/config"; //first import connection object
//set the URL
const db_password:any = `biswapratap44`;
const db_name:any = `mern`;
const db_url:any = `mongodb+srv://biswa2219:${db_password}@ashokitnode.v0teiig.mongodb.net/${db_name}?retryWrites=true&w=majority`;

export default function getConnection()
{
    try{
        return obj.mernClient.connect(db_url);
    }catch(error){
        console.log("connection failed");
    }
};
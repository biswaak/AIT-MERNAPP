let express = require ("express");
let bodyparser = require("body-parser");
let cors = require("cors");
let multer = require("multer");

const app = express();
app.use(cors());

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/index.html");
});


app.listen(8080,()=>{
    console.log("server started sucessfully at port number 8080");
});

//Logic - Set DiskStorage Location for recive the POST file.
//multer.diskStorage :-Returns a StorageEngine implementation configured to store files on the local file system.
//cb:-callback
/**const storage =  multer.diskStorage({
    destination:(req, file, cb) => {},    //MUlter format type
    __filename:(req, file, cb) => {}
});*/

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, "uploads")
    },
    filename:(req, file, cb)=> {
        cb(null, file.fieldname + "-" + Date.now());
    }
});

// i want to gave the stoarge to multer module and it's work as a 
const upload = multer({storage:storage});

//upload single file
app.post("/uploadfile", upload.single("myfile"), (req,res,next)=>{ //myfile is the key as mention as named in index.html
    const file = req.file; //attaching a file

    if(!file) { //if U not attaching a file then error ll be ...
        const error = new Error ("Please upload a file");
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(file)
});

//Upload Multiple file

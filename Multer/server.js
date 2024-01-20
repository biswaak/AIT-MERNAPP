//upload the file and images to LocalStorage and in second server we upload the file and image to MOngodb.
let express = require("express");
let cors = require("cors");
let bodyparser = require("body-parser");
let multer = require("multer");

//create a rest object
let app = express();

//enable the cors policy
app.use(cors());

//set the json as MIME type
app.use(bodyparser.json());

//parse the JSON
app.use(bodyparser.urlencoded({extended:false}));


//Define the Storage
let Storage = multer.diskStorage({
    destination:(req, filename, cb) => {
        cb(null , "uploads");
    },
    filename: (req, file, cb) => {
        console.log(file.filename);
        console.log(file.fieldname);
        console.log(file.originalname);
        console.log(file.size);
        console.log(file.stream);
        console.log(file.path);
        //cb(null, file.fieldname + "" + new Date() + ".png");
        cb(null, file.originalname);
    }
});

//handover the storage to multer module
//upload is here middile-ware.
let upload =  multer({storage:Storage});

//Create the POST req for Single-File
app.post("/singleFile",upload.single("myFile"), (req, res, next)=>{
    const file = req.file;
    if(!file){
        let error = new Error("Please upload file");
        error.httpStatusCode = 400;
        return next(error);
    }else{
        res.send(file);
    }
});

//create the POST req for Multiple File
app.post("/multipleFile", upload.array("myFile",12), (req,res, next)=>{
    const files = req.files;
    if(!files){
        /**let error = new Error("please upload file");
        error.httpStatusCode = 400;
        return next(error);*/
        return res.status(400).send("please upload file");
    }else{
        res.send(files);
    }
});

//Single Photo but can Any type of (jpg,jpeg,png,fig etc..)
app.post("/uploadphotos",upload.single("pictures"), (req,res)=>{
    let path = req.file.path;
    console.log(path);
});


/**Upload muliple PHOTO and Any type of (jpg,jpeg,png,fig etc..)*/
app.post("/photos",upload.array("myphotos",10), (req,res, next)=>{
    let paths = req.files.map(file => file.path);
    console.log(paths);
});

//Photos only .PNG type
app.post("/uploadphoto", upload.single("picture"),(req,res)=>{
    let path = req.file.path;
    console.log(path);
});

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/index.html");
});



app.listen(8080,()=>{
    console.log("server started");
})
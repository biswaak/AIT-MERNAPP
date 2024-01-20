//in this module we upload the file and images to Mongodb.
//import the modules
let express = require("express");
let bodyparser = require("body-parser");
let cors = require("cors");
let mongodb = require("mongodb");
let multer = require("multer");
let fs = require("fs");  //to read image location

let ashokIT = mongodb.MongoClient;

let app = express(); //create rest object
app.use(cors()); //enable the cors policy

app.use(bodyparser.json()); //set the JSon as MIME type.
app.use(bodyparser.urlencoded({extended:false})); //read the json


//create the storage object or setting the storage
const Storage =  multer.diskStorage({
    destination:(req,file, cb)=>{
        cb(null, "uploads")
    },
    filename:(req,file, cb)=>{
        cb(null, file.originalname );
    }
});

//handover storage object to mullter module
const upload = multer({storage:Storage});  //upload : is a middle ware.

app.post("/uploadImage", upload.single("myPhoto"),(req,res,next)=>{
    const file = req.file;

    if(!file){
        return res.status(400).send("Please upload file");
    }else{
        const image = fs.readFileSync(req.file.path); //use fs module to read file
        const image_encode = image.toString("base64"); //encoded the total image to file
        const record = {
            "image" : image_encode,
            "mimetype" : req.file.mimetype
        };

        ashokIT.connect("mongodb+srv://biswanath44:nayak80@cluster0.v7mo1bs.mongodb.net/multer?retryWrites=true&w=majority", (err,conn) => {
            if(err) throw err;
            else{
                let db = conn.db("multer");
                db.collection("images") .insertOne(record, (err, result) => {
                    if(err) throw err;
                    else{
                        res.send({insert: "sucess"});
                        //res.redirect("/") // redirect to home page.
                    }
                });
            }
        });

    }
});




//open the html file bi-default
app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/index.html");
});

app.listen(8080,()=>{
    console.log("server started");
})


/**app.post("/uploadImage", upload.single("myPhoto"), (req, res, next) => {
    const file = req.file;

    if (!file) {
        return res.status(400).send("Please upload file");
    } else {
        const image = fs.readFileSync(req.file.path);
        const image_encode = image.toString("base64");
        const record = {
            "image": image_encode,
            "mimetype": req.file.mimetype
        };

        ashokIT.connect("mongodb+srv://biswanath44:nayak80@cluster0.v7mo1bs.mongodb.net/multer?retryWrites=true&w=majority", (err, conn) => {
            if (err) {
                console.error("MongoDB connection error:", err);
                return res.status(500).send("Internal server error");
            }
            console.log("Connected to MongoDB");

            let db = conn.db("multer");
            db.collection("images").insertOne(record, (err, result) => {
                if (err) {
                    console.error("MongoDB insertion error:", err);
                    res.status(500).send("Internal Server Error");
                } else {
                    console.log("Record inserted successfully:", result.ops[0]);
                    res.send({ insert: "success" });
                }

                // Close the connection after the operation is complete
                conn.close();

                // Redirect to home page outside the insertOne callback
                console.log("Redirecting to /");
                res.redirect("/");
            });
        });
    }
}); */
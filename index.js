var Express = require("express");
var Mongoclient = require("mongodb").MongoClient;
var cors = require("cors");
const multer = require("multer");

var app = Express();
app.use(cors());

var CONNECT_STRING = "mongodb+srv://imperiousakagulf:2Chhva9vh83aAXDn@cluster0.weqkunt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


var DATABASENAME = "Dsc";
var database;

app.listen(5038,()=> {
    Mongoclient.connect(CONNECT_STRING,(error,client)=>{
        database=client.db(DATABASENAME);
        console.log("connected");
    })

})
app.get('/api/Dsc/GetNotes',(request,response)=>{
    database.collection("toDO").find({}).toArray((error,result)=>{
        response.send(result);
    })
})

app.post('/api/Dsc/AddNotes',multer().none(),(request,response)=>{
    database.collection("toDO").count({},function(error, numOfDocs){
        database.collection("toDO").insertOne({
            id:(numOfDocs+1).toString(),
            description:request.body.newNotes
        });
        response.json("Added Succesfully");
    })
})

app.delete('api/Dsc/DeleteNotes',(request,response)=>{
    database.collection("toDO").deleteOne({
        id:request.query.id
    });
    response.json("Deleted");
})
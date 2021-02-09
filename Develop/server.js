// Dependencies
let express = require("express");
let path = require("path");
let fs = require('fs');
const { json } = require("express");

// initiate Express and set the Port 
var app = express();
var PORT = process.env.PORT || 8080;

// connect express to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//Routing 
//GETs 
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });

app.get("/index", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });

app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./db/db.json"));
  });

//POSTs
app.post("/api/notes", function(req, res) {
    let newNote = req.body;
    console.log(newNote);
    newNote.id = newNote.title.replace(/\s+/g, "").toLowerCase()
    fs.readFile("./db/db.json", 'utf-8',(err,data)=>{
      let oldNote = JSON.parse(data)
      //console.log(oldNote)
      oldNote.notes.push(newNote)
      fs.writeFile("./db/db.json", JSON.stringify(oldNote), ()=>{})
      res.json(newNote);
    })

  });

//DELETEs
app.delete("/api/notes/:id", function(req,res){
    // let chosen = req.params.id;

    // console.log(chosen);

    res.send("hello")
})



  //Start server listening
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  
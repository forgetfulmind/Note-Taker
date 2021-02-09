// Dependencies
let express = require("express");
let path = require("path");
let fs = require("fs")

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
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    let newNote = req.body;
  
    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newNote.iD = newCharacter.iD.replace(/\s+/g, "").toLowerCase();
  
    console.log(newNote);
  
    fs.appendFile("./db/db.json", newNote, ()=>{})
  
    res.json(newNote);
  });



  //Start server listening
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  
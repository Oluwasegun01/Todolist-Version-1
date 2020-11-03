const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
// const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("Public"));

app.set("view engine", "ejs");

const items = [];
const workItems = [];

let newItem = "";

app.get("/", function(req, res){
     const day = date.getDate();
    res.render("list", {listTitle: day, listOfItems: items});
});

app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work List", listOfItems: workItems});
});


app.post("/", function(req, res){
    //console.log(req.body);
    newItem = req.body.newActivity;
    //let item = req.body.newActivity;
    if (req.body.list === "Work") {
        workItems.push(newItem);
        res.redirect("/work");
    } else {
        items.push(newItem);
        res.redirect("/");
    }
    
    
});

app.get("/about", function(req, res){
    res.render("about");
})

app.listen(3000, function(){
    console.log("Server started at Port 3000");
});
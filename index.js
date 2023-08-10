const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

mongoose.connect("mongodb://localhost:27017/suraj", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var db = mongoose.connection;
db.on("error", () => console.log("error in connection to database"));
db.once("open", () => console.log("connection sucessfull"));

app.post("/signup_success", (req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  var phno = req.body.phno;
  var password = req.body.password;

  var data = {
    name: name,
    email: email,
    password: password,
    phno: phno,
  };
  db.collection("users").insertOne(data, (err, collection) => {
    if (err) {
      throw err;
    }
    console.log("Record Inserted Sucessfully");
  });
  return res.redirect("signup_success.html");
});

app
  .get("/", (req, res) => {
    res.set({ "allow-acces-allow-origin": "*" });

    return res.redirect("index.html");
  })
  .listen(8080);

console.log("listening on Port 8080");

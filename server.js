const express = require("express");
const bodyParser = require("body-parser");
const app = express();
//const _=require("lodash");


let mongoose = require("mongoose");



mongoose.connect(
    'mongodb://localhost:27017/example',
    { useNewUrlParser: true }
).then(
    () => { console.log("success") },
    (err) => { /* handle errors */ }

);

//username
const user = require("./routes/user");



app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use("/user", user);


const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`server running on port ${port}`));
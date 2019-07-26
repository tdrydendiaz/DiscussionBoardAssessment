const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const User = require("../models/schema")    
//const validateme = require("../Validator/validator.js")

module.exports = router;

router.get("/all", (req, res) => {
    const errors = {};
    User.find({}, '-email')
        .then(User => {
            if (!User) {
                errors.noItems = "There are no items";
                res.status(404).json(errors);
            }
            res.json(User);
        })
        .catch(err => res.status(404).json({ noItems: "There are no items" }));
});

router.post("/create", (req, res) =>{
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    user.save()
    .then(()=> {
        res.json(user);
         console.log('complete')
    })
    .catch(err => res.status(404).json({ noUsers: "User couldn't be added" }));
})
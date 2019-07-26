const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const User = require("../models/schema")    
//const validateme = require("../Validator/validator.js")

module.exports = router;

router.get("/all", (req, res) => {
    const errors = {};
    User.find({}, '-password')
        .then(User => {
            if (!User) {
                errors.noItems = "There are no items";
                res.status(404).json(errors);
            }
            res.json(User);
        })
        .catch(err => res.status(404).json({ noItems: "There are no items" }));
});
//', -email'
//{}, '-email'
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

router.put("/update", (req, res) => {
    User.replaceOne({ 'username': req.body.username },
        { 'username': req.body.username, "email": req.body.email })
        .then(({ ok, n }) => {
            res.json(n)
        })
        .catch(err => res.status(404).json(err));
})

// router.delete("/delete", (req, res) => {
//  errors = {};
//   const email = req.body.email;
//   const hashedValue = req.body.hashedValue;

//   //User.find() using _id
//   //get the email from the found user
// // use this email as hashedvalue

//   bcrypt.compare(email, hashedValue).then(isMatch => {
//     if (isMatch) {
//     User.deleteOne({'username': req.body.username })
//         .then(({ ok, n }) => {
//             res.json(n)
//         })
//         .catch(err => res.status(404).json(err))
//  } else {
//     errors.value = "Incorrect";
//     return res.status(400).json(errors);
//     }
// })
// })

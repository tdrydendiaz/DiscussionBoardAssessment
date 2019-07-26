const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const Item = require("../models/itemSchema")
const User = require("./user.js")
let myArray = [];
const validateme = require("../validator/itemValidator.js")

router.get("/all", (req, res) => {
    const errors = {};
    Item.find({}, '-email')
        .then(Item => {
            if (!Item) {
                errors.noItems = "There are no items";
                res.status(404).json(errors);
            }
            res.json(Item);
        })
        .catch(err => res.status(404).json({ noItems: "There are no items" }));
});


//original post
router.post("/create", (req, res) => {
    const { errors, isValid } = validateme(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    };
    const user = new Item({
        name: req.body.username,
        context: req.body.context,
        email: req.body.email
    });

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.email, salt, (err, hash) => {
            if (err) throw err;
            user.email = hash;
            user.save().then(user => res.json(user))
                .catch(err => console.log(err));
        });


    });
});

//NEW POST
router.post("/createItem", (req, res) => {
    const { errors, isValid } = validateme(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    };
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
            });
    const item = new Item({
        name: req.body.username,
        context: req.body.context,
    });

    User.find({ $or: [{ email: req.body.email }, { username: req.body.username }, {password:req.body.password}] }).then(currentUser => {
        if (currentUser.length != 0) {
                    user.save().then(user => res.json(user))
                        .catch(err => console.log(err))

        } else {
            res.json({ No: "Not a registered User" })
        }
    });
    




    router.put("/updatename", (req, res) => {
        Item.replaceOne({ 'name': req.body.username },
            { 'name': req.body.username, "context": req.body.context })
            .then(({ ok, n }) => {
                res.json(n)
            })
            .catch(err => res.status(404).json(err));
    })



    router.delete("/delete", (req, res) => {
        errors = {};
        const email = req.body.email;
        const hashedValue = req.body.hashedValue;

        //User.find() using _id
        //get the email from the found user
        // use this email as hashedvalue

        bcrypt.compare(email, hashedValue).then(isMatch => {
            if (isMatch) {
                User.deleteOne({ 'name': req.body.username })
                    .then(({ ok, n }) => {
                        res.json(n)
                    })
                    .catch(err => res.status(404).json(err))
            } else {
                errors.value = "Incorrect";
                return res.status(400).json(errors);
            }
        })
            .catch(err => res.status(404).json(err));
    })
})



//original arrays
router.post("/array", (req, res) => {
    let newItem = {
        "username": req.body.username,
        "content": req.body.content
    }
    myArray.push(newItem);
    res.send(myArray);
});

router.get("/getNames", (req, res) => {
    res.send(myArray);
});

router.put("/update", (req, res) => {
    let newItem = {
        "username": req.body.username,
        "content": req.body.content
    }
    let index = req.body.index;
    _.set(myArray, index, newItem);
    res.send(myArray)
});

router.delete("/delete", (req, res) => {
    let index = req.body.index;
    _.pullAt(myArray, index);
    res.send(myArray)
});

module.exports = router; 
const mongoose = require("mongoose");

var Schema=mongoose.Schema;

var itemSchema = new Schema({
    name: {
        type:String,
        required: true,
        minlength:3
    },
    context: {
    type: String,
    required:false,
    minlength:4
    },
    email: {
    type: String,
    required:true,
    minlength:3    
    }
});

let Item = mongoose.model('Item', itemSchema);

module.exports=Item;
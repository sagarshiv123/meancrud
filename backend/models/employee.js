const mongoose = require("mongoose");

const Employee = mongoose.model('Employee',{
    name:{type:String},
    email:{type:String},
    mobile:{type:Number},
    subject:{type:String},
    desc:{type:String},


});

module.exports = Employee;
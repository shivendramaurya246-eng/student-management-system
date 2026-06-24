const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({

  name:{
    type:String,
    required:true
  },

  rollNo:{
    type:String,
    required:true,
    unique:true
  },

  email:{
    type:String,
    required:true
  },

  course:{
    type:String,
    required:true
  },

  maths:{
    type:Number,
    required:true
  },

  science:{
    type:Number,
    required:true
  },

  english:{
    type:Number,
    required:true
  },

  percentage:{
    type:Number
  },

  result:{
    type:String
  }

},
{
  timestamps:true
});

module.exports =
mongoose.model("Student",studentSchema);
// models/Doctor.js
const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  docImg: {
    type: String, // URL of the doctor’s image
    required: true,
  },
  
  yearsOfexp: Number,

  specialization:{
    type: String,
    required: true,
},
});

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;

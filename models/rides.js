const mongoose = require('mongoose');

const RideSchema = mongoose.Schema({
  user:{
    type: String,
    required: true
  },
  totalSeats:{
    type: Number,
    required: true
  },
  availableSeats:{
    type: Number,
    required: true
  },
  time:{
    type: Date,
    required: true
  },
  src:{
    type: String,
    required: true
  },
  dest:{
    type: String,
    required: true
  },
  paid:{
    type: Boolean,
    required: true
  },
  amount:{
    type: Number,
    required: false
  }
});

const Ride = module.exports = mongoose.model('Ride', RideSchema);

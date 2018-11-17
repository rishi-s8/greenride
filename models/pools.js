const mongoose = require('mongoose');

const PoolSchema = mongoose.Schema({
  ride:{
    type: String,
    required: true
  },
  user:{
    type: String,
    required: true
  },
  bookedSeats:{
    type: Number,
    require: true
  }
});

const Pool = module.exports = mongoose.model('Pool', PoolSchema);

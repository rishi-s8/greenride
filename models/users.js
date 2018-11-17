const mongoose = require('mongoose');
require('mongoose-type-email');
const UserSchema = mongoose.Schema({
  email:{
    type: mongoose.SchemaTypes.Email,
    required: true;
  },
  encrypted_password:{

  }
});

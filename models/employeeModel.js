const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  given_name: {
    type: String,
    trim: true
  },
  family_name: {
    type: String,
    trim: true
  },
  username: {
    type: String,
    trim: true
  },
  password: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    unique: true
  },
  userCreated: {
    type: Date,
    default: Date.now
  }
});

const Employee = mongoose.model("Employee", EmployeeSchema);

module.exports = Employee;

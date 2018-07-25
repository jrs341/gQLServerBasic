const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
  given_name: {
    type: String,
    trim: true
  },
  family_name: {
    type: String,
    trim: true
  },
  phone_number: {
    type: String,
    trim: true
  },
  phone_number_alt: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    unique: true
  },
  address_line_1: {
    type: String,
    trim: true
  },
  locality: {
    type: String,
    trim: true
  },
  administrative_district_level_1: {
    type: String,
    trim: true
  },
  postal_code: {
    type: String,
    trim: true
  },
  country: {
    type: String,
    trim: true,
    default: 'US'
  },
  drivers_license_num: {
    type: String,
    trim: true
  },
  drivers_license_state: {
    type: String,
    trim: true
  },
  additional_occupant_1: {
    type: String,
    trim: true
  },
  additional_occupant_2: {
    type: String,
    trim: true
  },
  additional_occupant_3: {
    type: String,
    trim: true
  },
  additional_occupant_4: {
    type: String,
    trim: true
  },
  additional_occupant_1_age: {
    type: String,
    trim: true
  },
  additional_occupant_2_age: {
    type: String,
    trim: true
  },
  additional_occupant_3_age: {
    type: String,
    trim: true
  },
  additional_occupant_4_age: {
    type: String,
    trim: true
  },
  pets_number_of: {
    type: String,
    trim: true
  },
  pets_type: {
    type: String,
    trim: true
  },
  pets_breed: {
    type: String,
    trim: true
  },
  unit_type: {
    type: String,
    trim: true
  },
  unit_license: {
    type: String,
    trim: true
  },
  unit_state: {
    type: String,
    trim: true
  },
  unit_year: {
    type: String,
    trim: true
  },
  unit_length: {
    type: String,
    trim: true
  },
  vehicle_1_type: {
    type: String,
    trim: true
  },
  vehicle_2_type: {
    type: String,
    trim: true
  },
  vehicle_1_license: {
    type: String,
    trim: true
  },
  vehicle_2_license: {
    type: String,
    trim: true
  },
  vehicle_1_state: {
    type: String,
    trim: true
  },
  vehicle_2_state: {
    type: String,
    trim: true
  },
  vehicle_1_year: {
    type: String,
    trim: true
  },
  vehicle_2_year: {
    type: String,
    trim: true
  },
  reading: [{
    reading: {
    type: Number,
    trim: true
    },
    created_at: {
      type: Date,
      default: Date.now
    }
  }],
  created_at: {
    type: Date,
    default: Date.now
  }, 
  meter: {
    type: String,
    trim: true,
    default: ''
  },
  rate: {
    type: String,
    trim: true
  },
  checkin: {
    type: String,
    trim: true
  },
  checkout: {
    type: String,
    trim: true
  }
});

const Customer = mongoose.model("Customer", CustomerSchema);

module.exports = Customer;

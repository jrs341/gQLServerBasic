var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var MeterReadingsSchema = new Schema({
  meter: {
    type: String,
    trim: true
  },
  readings: [{
    reading: {
    type: Number,
    trim: true
    },
    created_at: {
      type: Date,
      default: Date.now
    }
  }],
  customer: {
    type: String,
    trim: true,
    default: ''
  },
  amp: {
    type: String,
    trim: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

MeterReadingsSchema.methods.lastUpdatedDate = function() {
  // Make lastUpdatedDate the current date
  this.lastUpdated = Date.now();
  // Return this new date
  return this.lastUpdated;
};

var MeterReadings = mongoose.model("MeterReadings", MeterReadingsSchema);

module.exports = MeterReadings;

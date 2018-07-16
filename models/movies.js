const mongoose = require('mongoose')

const Schema = mongoose.Schema

const MovieSchema = new Schema({
	imdbId:{
		type: String,
		trim: true
	},
	title:{
		type: String,
		trim: true
	},
	genre:{
		type: String,
		trim: true
	},
	actors:{
		type: String,
		trim: true
	},
	year:{
		type: String,
		trim: true
	},
	ratings:[]
})

const Movies = mongoose.model('Movies', MovieSchema)

module.exports = Movies
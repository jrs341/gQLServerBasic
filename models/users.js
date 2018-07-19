const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
	userId:{
		type: String,
		trim: true
	}
})

const Users = mongoose.model('Users', UserSchema)

module.exports = Users
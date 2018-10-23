var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var userSchema = new Schema({
    firstname: { type: String, require: true },
    lastname: {type: String, require:true},
    active: {type:String, require:true},
    role: {type:String, require:true},
    dateRegistered: {type:String, require:true},
    email: {type:String, require:true},
    password: {type:String, require:true}
});

module.exports = Mongoose.model('User', userSchema);



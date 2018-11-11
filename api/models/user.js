const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	_id: mongoose.Schema.Types.ObjectId,
    username:String,
    googleInfo:String,
    googleId:String,
    facebookInfo:String,
    facebookId:String,
    email: { 
        type: String, 
        require: true, 
        unique: true, 
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String, 
        require: true
    }
});
const User = mongoose.model('User',userSchema);
module.exports = User;  // the first argument is the name of the table and the second is the schma


//name: String
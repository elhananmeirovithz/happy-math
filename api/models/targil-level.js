const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const targilLevelSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    level: {
        type: Number, 
        require: true
    },
    type:{
        type: String, 
        require: true
    },
    numberLength1:{
        type: Number
    },
    numberLength2:{
        type: Number
    }
});

const TargilLevel = mongoose.model('TargilLevel',targilLevelSchema);
module.exports = TargilLevel;  // the first argument is the name of the table and the second is the schma
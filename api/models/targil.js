const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const targilSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date_creation: { 
        type: Date, 
        default: Date.now 
    },  
    targil: String,
    targil_duration_msec: Number,
    targil_number_of_errors: {
        type: Number,
        default: 0
    },
    targil_flag_finish: Boolean,
    ip: String
});
    
const Targil = mongoose.model('Targil',targilSchema);
module.exports = Targil;  // the first argument is the name of the table and the second is the schma
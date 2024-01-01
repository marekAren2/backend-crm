const mongoose = require('mongoose'); 

// const Schema = new mongoose.Schema();
//const Schema = new mongoose.Schema;

// const ClientSchema = Schema({
const Client = new mongoose.Schema({
    name: {type: String, unique: true, require: true},
    address: {
        street: String,
        city: {type: String, uppercase: true, minLength: [3, 'Zbyt krótka nazwa {VALUE}']}
    },
    nip: {type: Number, unique: true, require: true,
        max: [6799999999, 'zla wartosc'],
        required: [true, 'Pole wymagane']
    },
    updated: { type: Date, default: Date.now() 
    },
    // _someId: Schema.Types.ObjectId,
    // age: { type: Number, min: 18, max: 65},
    yearOf: { type: Number, min: 1, max: 99},
},
{timestamps: true}
);

// module.exports = mongoose.model('Client', ClientSchema);
module.exports = mongoose.model('Client', Client);





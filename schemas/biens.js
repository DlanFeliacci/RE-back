const mongoose = require('mongoose');

const bienSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    tel: String,
    country: String,
    wilaya: String,
    ville: String,
    address: String,
    transaction: String,
    type: String,
    surface: Number,
    chambre: Number,
    pictures: Array,
    prix: String,
    date: Date
});

module.exports = mongoose.model('Biens', bienSchema, 'biens');
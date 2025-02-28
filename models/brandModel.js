const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'brand required'],
        unique: [true, 'brand must be unique'],
        minlength: [3, 'Too short brand'],
        maxlength: [32, 'Too long brand'],
    },
    slug: {
        type: String,
        lowercase: true,
    },
}, { timestamps: true }); // Corrected option


module.exports = mongoose.model("brand", brandSchema); // Capitalized model name


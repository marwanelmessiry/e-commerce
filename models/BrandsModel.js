const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category required'],
        unique: [true, 'Category must be unique'],
        minlength: [3, 'Too short category'],
        maxlength: [32, 'Too long category'],
    },
    slug: {
        type: String,
        lowercase: true,
    },
}, { timestamps: true }); // Corrected option


module.exports = mongoose.model("brand", brandSchema); // Capitalized model name


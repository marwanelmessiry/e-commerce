const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
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

const catModel = mongoose.model("Category", catSchema); // Capitalized model name

module.exports = catModel;

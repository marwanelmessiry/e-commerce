const mongoose = require('mongoose');

const subCatSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'Name must be unique'],
        minlength: [2, 'Name must be at least 2 characters'],
        maxlength: [32, 'Name must be at most 32 characters']
    },
    slug: {
        type: String,
        lowercase: true,
        unique: true,
        index: true
    },
    Cat: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: [true, 'Parent Category is required']
    }
});
module.exports = mongoose.model('SubCategory', subCatSchema);
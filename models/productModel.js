const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: [3, 'Too short product title'],
        maxLength: [100, 'Too long product title']
    },
    slug: {
        type: String,
        required: true,
        lowercase: true
    },
    description: {
        type: String,
        required: true,
        minLength: [20, 'Too short product description'],
        maxLength: [1000, 'Too long product description']
    },
    quantity: {
        type: Number,
        required: [true, 'Product quantity is required'],
    },
    sold: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        trim: true,
        required: [true, 'Product price is required'],
        max: [200000, 'Too long product price']
    },
    priceDiscount: {
        type: Number,

    },
    color: {
        type: [String],
    },
    imagesCov: {
        type: [String],
        required: [true, 'Product image is required'],
    },
    images: {
        type: [String],
    },

    Category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Category is required']
    },
    SubCategories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
    }],
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'brand',
    },
    ratingsAverage: {
        type: Number,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0'],
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
}, { timestamps: true });
module.exports = mongoose.model('Product', productSchema);
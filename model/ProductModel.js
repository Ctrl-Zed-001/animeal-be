const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    title: String,
    content: String,
    rating: Number,
    user: {
        type: mongoose.ObjectId,
        ref: 'User'
    }
})

const productSchema = new mongoose.Schema({
    name: String,
    mrp: Number,
    selling_price: Number,
    in_Stock: Boolean,
    short_description: String,
    long_description: String,
    rating: Number,
    isActive: Boolean,
    brand: { type: mongoose.ObjectId, ref: 'Brand' },
    category: { type: mongoose.ObjectId, ref: 'Category' },
    sub_category: { type: mongoose.ObjectId, ref: 'Subcategory' },
    reviews: [reviewSchema],
    stock: Number,
    display_image: String,
    images: [String]
},
    {
        timestamps: true
    })

const productModel = mongoose.model('Product', productSchema)
module.exports = productModel
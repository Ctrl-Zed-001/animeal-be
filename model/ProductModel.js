const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: String
},
    {
        timestamps: true
    })

const productModel = mongoose.model('Product', productSchema)
module.exports = productModel
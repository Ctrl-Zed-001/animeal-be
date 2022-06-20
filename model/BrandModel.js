const mongoose = require('mongoose')

const brandSchema = new mongoose.Schema({
    name: String,
    slug: String,
    icon: String,
    banner_desktop: String,
    banner_mobile: String,
    active: Boolean
}, {
    timestamps: true
})

const Brands = mongoose.model('brand', brandSchema)
module.exports = Brands
const mongoose = require('mongoose')

const brandSchema = new mongoose.Schema({
    name: String,
    slug: String,
    icon_desktop: String,
    icon_mobile: String,
    banner_desktop: String,
    banner_mobile: String,
    active: Boolean
}, {
    timestamps: true
})

const Brands = mongoose.model('brand', brandSchema)
module.exports = Brands
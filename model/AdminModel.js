const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: String,
    isActive: Boolean
}, {
    timestamps: true
})

const Admins = mongoose.model('admin', adminSchema)

module.exports = Admins


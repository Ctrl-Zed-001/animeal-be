const express = require('express')
const router = express.Router()
const Product = require('../model/ProductModel')

router.get('/getall', (req, res) => {
    Product.find()
        .then(data => res.status(200).json({
            msg: "success",
            data: data
        }))
        .catch(err => res.status(400).json({
            msg: "error"
        }))
})

router.get('/addnew', (req, res) => {
    console.log("adding new product to db")
    res.send("new product")
})


module.exports = router
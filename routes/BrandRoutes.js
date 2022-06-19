const express = require('express')
const router = express.Router()
const brandModel = require('../model/BrandModel')

router.get('/getall', (req, res) => {
    console.log("get all brands")
})

router.post('/add', async (req, res) => {
    let brand = new brandModel({
        name: 'whiskas'
    })

    let result = await brand.save()
    res.send(result)
})

module.exports = router
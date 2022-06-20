const express = require('express')
const router = express.Router()
const Brands = require('../model/BrandModel')

router.get('/getall', (req, res) => {
    Brands.find()
        .then(result => {
            res.send(result)
        })
        .catch(err => res.send(err))
})

router.post('/add', async (req, res) => {
    let brand = new Brands({
        name: 'whiskas'
    })

    let result = await brand.save()
    res.send(result)
})

module.exports = router
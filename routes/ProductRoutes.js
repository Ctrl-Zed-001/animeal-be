const express = require('express')
const router = express.Router()

router.get('/getall', (req, res) => {
    axios.get('https://62a5d6dcb9b74f766a402398.mockapi.io/api/products')
        .then(response => res.send(response.data))
        .catch(err => console.log(err))
})

router.get('/addnew', (req, res) => {
    console.log("adding new product to db")
    res.send("new product")
})


module.exports = router
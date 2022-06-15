const express = require('express')

const app = express()

const mongoose = require('mongoose')


// ROUTES
const ProductRoutes = require('./routes/ProductRoutes')
app.use("/api/products", ProductRoutes)



const port = process.env.PORT || 3000


mongoose.connect("mongodb://localhost/animeal")
    .then(res => {
        console.log("connected sucessfully");
        app.listen(port, () => console.log(`server listening on port 3000`))
    })
    .catch(err => {
        console.log("connection failed", err);

    })

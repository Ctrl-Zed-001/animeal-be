const express = require('express')

const dotenv = require('dotenv');
dotenv.config();

const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())

const mongoose = require('mongoose')


// ROUTES
const ProductRoutes = require('./routes/ProductRoutes')
app.use("/api/products", ProductRoutes)

const BrandRoutes = require('./routes/BrandRoutes')
app.use('/api/brands', BrandRoutes)

const AuthRoutes = require('./routes/AuthRoutes')
app.use('/api/auth', AuthRoutes)



const port = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URI)
    .then(res => {
        console.log("connected sucessfully");
        app.listen(port, () => console.log(`server listening on port 5000`))
    })
    .catch(err => {
        console.log("connection failed", err);

    })

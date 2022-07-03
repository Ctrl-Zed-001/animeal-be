const express = require('express')
const router = express.Router()
const Admins = require('../model/AdminModel')
const bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken');

router.post('/adminlogin', async (req, res, next) => {
    let admin = await Admins.findOne({
        username: req.body.username
    })
    if (!admin) {
        res.status(400).json({
            msg: "user not found"
        })
    } else {
        let passwordCheck = bcrypt.compareSync(req.body.password, admin.password)
        if (!passwordCheck) {
            res.status(400).json({
                msg: "incorrect password"
            })
        } else {

            let userData = {
                useranme: admin.username,
                role: admin.role,
                createdAt: admin.createdAt,
                updatedAt: admin.updatedAt
            }

            // CREATE A JWT
            jwt.sign(
                userData,
                process.env.SECRET,
                { expiresIn: "1h" },
                (err, token) => {
                    if (err) {
                        res.status(400).json({
                            msg: "something went wrong. check logs"
                        })
                    } else {
                        res.status(200).json({
                            msg: "success",
                            data: userData,
                            token: `Bearer ${token}`
                        })
                    }
                }
            )
        }
    }
})

router.post('/newadmin', async (req, res, next) => {

    let hashPassword = bcrypt.hashSync(req.body.password, 10)

    let admin = new Admins({
        username: req.body.username,
        password: hashPassword,
        role: req.body.role
    })

    admin.save()
        .then(data => {
            res.status(200).json({
                msg: "success"
            })
        })
        .catch(err => {
            res.status(400).json({
                msg: "error creating user"
            })
        })
})

module.exports = router
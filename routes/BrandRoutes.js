const express = require('express')
const router = express.Router()
const Brands = require('../model/BrandModel')
const { validationResult } = require('express-validator');
const { newBrandValidation } = require('../validationSchema/Validation')

const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, (Date.now() + '-' + file.originalname))
    }
})

const upload = multer({ storage: storage })

const cpUpload = upload.fields([{ name: 'icon_desktop' }, { name: 'banner_desktop' }, { name: 'icon_mobile' }, { name: 'banner_mobile' }])

router.get('/getall', async (req, res) => {
    let page = req.query.page || 0
    let dataPerPage = 10

    let totalBrands = await Brands.count()
    Brands
        .find()
        .skip(page * dataPerPage)
        .limit(dataPerPage)
        .then(result => {
            res.status(200).json({
                msg: "success",
                data: result,
                total: totalBrands
            })
        })
        .catch(err => res.status(400).send(err))
})

router.post('/addnew', newBrandValidation, async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let brand = new Brands({
        name: req.body.name,
        slug: req.body.slug,
        isActive: req.body.isActive,
        icon_desktop: "",
        icon_mobile: "",
        banner_desktop: "",
        banner_mobile: "",
    })

    brand.save()
        .then(data => res.status(200).json({ msg: "success", data: data }))
        .catch(err => res.status(500).json({ msg: "something wrong with the server" }))

})

router.post('/saveimages', cpUpload, (req, res, next) => {
    Brands.findByIdAndUpdate(
        req.body.id,
        {
            icon_desktop: req.files.icon_desktop ? req.files.icon_desktop[0].originalname : "",
            banner_desktop: req.files.banner_desktop ? req.files.banner_desktop[0].originalname : "",
            icon_mobile: req.files.icon_mobile ? req.files.icon_mobile[0].originalname : "",
            banner_mobile: req.files.banner_mobile ? req.files.banner_mobile[0].originalname : "",
        },
        (err, data) => {
            if (err) {
                res.status(400).json({ msg: "something wrong with server" })
            } else {
                res.status(200).json({ msg: "success", data: data })
            }
        }
    )
})


module.exports = router
const express = require('express')
const router = express.Router()
const Brands = require('../model/BrandModel')
const { validationResult } = require('express-validator');
const { newBrandValidation } = require('../middlewares/Validation')
const jwtValidation = require('../middlewares/AuthValidation')

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


// GET ALL BRANDS
router.get('/getall', async (req, res) => {
    let page = req.query.page || 0
    let dataPerPage = 1

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

// GET SINGLE BRAND
router.post('/getone', async (req, res, next) => {
    const brand = await Brands.findById(req.body.id)
    res.status(200).json({
        msg: "success",
        data: brand
    })
})


// ADD NEW BRAND OR EDIT EXISTING BRAND
router.post('/savebrand', jwtValidation, newBrandValidation, async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let oldBrand = await Brands.findById(req.body.id)
    let brand;

    if (oldBrand) {
        Brands.findByIdAndUpdate(req.body.id, {
            name: req.body.name,
            slug: req.body.slug,
            isActive: req.body.isActive
        })
            .then(data => res.status(200).json({ msg: "success", data: data }))
            .catch(err => res.status(400).json({ msg: "something wrong with the server" }))
    } else {
        brand = new Brands({
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
            .catch(err => res.status(400).json({ msg: "something wrong with the server" }))
    }


})

// UPLOAD PICTURES WHEN CREATING NEW BRAND
router.post('/saveimages', cpUpload, async (req, res, next) => {
    try {
        let oldBrand = await Brands.findById(req.body.id)
        oldBrand.icon_desktop = req.files.icon_desktop ? req.files.icon_desktop[0].originalname : oldBrand.icon_desktop;
        oldBrand.banner_desktop = req.files.banner_desktop ? req.files.banner_desktop[0].originalname : oldBrand.banner_desktop;
        oldBrand.icon_mobile = req.files.icon_mobile ? req.files.icon_mobile[0].originalname : oldBrand.icon_mobile;
        oldBrand.banner_mobile = req.files.banner_mobile ? req.files.banner_mobile[0].originalname : oldBrand.banner_mobile;

        let newBrand = await oldBrand.save()

        res.status(200).json({
            msg: "success",
            data: newBrand
        })
    } catch (e) {
        res.status(400).json({
            msg: "something went wrong"
        })
    }


})

// CHANGE ACTIVE STATUS
router.post("/changestatus", jwtValidation, async (req, res) => {
    let brand = await Brands.findByIdAndUpdate(req.body.id, {
        isActive: req.body.isActive
    })
    res.status(200).json({
        msg: "success",
        data: brand
    })
})


module.exports = router
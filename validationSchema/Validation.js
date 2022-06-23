const { body } = require('express-validator');

const newBrandValidation = [
    body('name').exists().isLength({ min: 3 }).withMessage("should be longer than 3 letters"),
    body('slug').exists().isLength({ min: 3 }).withMessage("should be longer than 3 letters"),
    body('isActive').exists().isBoolean()
]

module.exports = { newBrandValidation }
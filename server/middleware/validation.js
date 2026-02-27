const { body, validationResult } = require('express-validator');

// Validation rules for user creation/update
exports.userValidationRules = () => {
    return [
        body('name')
            .trim()
            .notEmpty().withMessage('Name is required')
            .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters')
            .matches(/^[a-zA-Z\s]+$/).withMessage('Name can only contain letters and spaces'),
        
        body('email')
            .trim()
            .notEmpty().withMessage('Email is required')
            .isEmail().withMessage('Please provide a valid email address')
            .normalizeEmail(),
        
        body('gender')
            .notEmpty().withMessage('Gender is required')
            .isIn(['Male', 'Female', 'Other']).withMessage('Gender must be Male, Female, or Other'),
        
        body('status')
            .notEmpty().withMessage('Status is required')
            .isIn(['Active', 'Inactive']).withMessage('Status must be Active or Inactive')
    ];
};

// Middleware to handle validation errors
exports.validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            success: false,
            errors: errors.array().map(err => ({
                field: err.path,
                message: err.msg
            }))
        });
    }
    next();
};

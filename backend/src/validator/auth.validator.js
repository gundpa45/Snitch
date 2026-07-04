import {body, validationResult} from "express-validator"




function validateRequest(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}


export const validateRegister = [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    body("contact").notEmpty().matches(/^[\d]{10}$/).withMessage("Please enter a valid contact number"),
    body("fullname").notEmpty().withMessage("Please enter your full name").isLength({ min: 2, max: 100 }),
    body("isSeller").isBoolean().withMessage("isSeller must be a boolean value"),
    validateRequest
];
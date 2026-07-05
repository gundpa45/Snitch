import { body, validationResult } from "express-validator";

function validateRequest(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}

export const validateRegister = [
    body("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Please enter a valid email"),

    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),

    body("contact")
        .trim()
        .notEmpty().withMessage("Contact number is required")
        .matches(/^\d{10}$/).withMessage("Please enter a valid 10-digit contact number"),

    body("fullname")
        .trim()
        .notEmpty().withMessage("Please enter your full name")
        .isLength({ min: 2, max: 100 }).withMessage("Full name must be between 2 and 100 characters"),

    body("isSeller")
        .optional()
        .isBoolean().withMessage("isSeller must be a boolean value")
        .toBoolean(),

    validateRequest
];
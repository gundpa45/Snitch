import { Router } from "express";
import authController from "../controllers/auth.controller.js"
import { validateRegister } from "../validator/auth.validator.js";


const router = Router();

router.post("/register", validateRegister,authController.registerController)

export default router;





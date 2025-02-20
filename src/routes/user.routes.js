import {Router} from "express"
import { registerUser } from "../controllers/user.controller.js";

const router = Router();
router.route("/register").post(registerUser) 
//ye route "/register" path pe jate hi hame registerUser controller pe le jata hai.
//  ab us controller me jo bhi likha hoga vo ho jaega.

export default router
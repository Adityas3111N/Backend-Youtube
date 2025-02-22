import {Router} from "express"
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();
router.route("/register").post(
    upload.fields([
        {
            name: "avatar",   
            maxCount: 1
        },
        {
            name: "coverImage", // in postman i just used smallcase 'c' instead of this and it threw error "unexpected field." i.e- they don't know what i am uploading.
            maxCount: 1
        }
    ]),
    registerUser) 

    router.route("/login").post(loginUser)

    //secure routes
    router.route("/logout").post(verifyJWT, logoutUser)
//ye route "/register" path pe jate hi hame registerUser controller pe le jata hai.
//  ab us controller me jo bhi likha hoga vo ho jaega.

export default router
import { asyncHandler } from "../utils/asyncHandler.js"; // we have created a utility
//that take a function as a parameter and wrapped in try catch so no tension of handling error etc.

//const registerUser = asyncHandler(fn)
const registerUser = asyncHandler(
   async (req, res) => {
    res.status(200).json({
        messsage: "ok"
    })
    }
) //ab ye method to hamne bana diya ab ye method run kab hoga. to koi url agar hit
//  hoga to run hoga. to iske liye hm routes banate hai. 

export {registerUser} //exported registerUser object.
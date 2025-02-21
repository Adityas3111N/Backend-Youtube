import { asyncHandler } from "../utils/asyncHandler.js"; // we have created a utility
//that take a function as a parameter and wrapped in try catch so no tension of handling error etc.
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js" //tis can have direct contact with db. as it  is created by mongoose.
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/ApiResponse.js"



//const registerUser = asyncHandler(fn)
const registerUser = asyncHandler(
    //step 1 - get user details from frontend.
   async (req, res) => {
    const {userName, email, fullName, password} = req.body
    
    //step 2 - validate user has given all the details and his email and username is unique.
    if([userName, fullName, email, password].some((field) => field?.trim() === "")){
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{userName}, {email}]
    })
    if(existedUser){
        throw new ApiError(409, "User with same email or username already exist")
    }
    
    //step 3 - take path of locally stored avatar and coverImage
    // console.log("Received files:", req.files);
    // console.log("Avatar file:", req.files?.avatar);
    // console.log("CoverImage file:", req.files?.coverImage); 
    //just checking is everything fine.

    const avatarLocalPath = req?.files?.avatar[0]?.path;
    // const coverImageLocalPath = req?.files?.coverImage[0]?.path;
    //this was throwing error in case when there was no cover image given by user. becz if you don't have an array coverImage coming, how can you access coverImage[0].
    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){ //checks if req.files exist then if coverImage in req.files is an array? then if its length is greater than 0. if all yes then take the path and put on cloudinary.
        coverImageLocalPath = req.files.coverImage[0].path;
    }

    if(!avatarLocalPath){
        throw new ApiError(400, "avatar is required");
    }
    //step 4 - upload on cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = coverImageLocalPath ? await uploadOnCloudinary(coverImageLocalPath): null;//wait until uploaded.

    if(!avatar){
        throw new ApiError(400, "avatar can't be uploaded on cloudinary");
    }

    //step 5 - create user object and create it's entry in db.
    const newUser = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url,
        email,
        password,
        userName: userName.toLowerCase()
    })

    //step 6 - check if user is creeated and if created then remove password and refreshTocken fileds.
    const createdUser = await User.findById(newUser._id).select("-password -refreshTocken")
    if(!createdUser){
        throw new ApiError(500, "Couldn't upload the images. try again later.")
    }

    //step 7 - send response that user is successfully registered.
    return res.status(201).json(
        new ApiResponse (200, createdUser, "User is registered successfully.")//apiResponse is a utility here.
    )
    }) //ab ye method to hamne bana diya ab ye method run kab hoga. to koi url agar hit
//  hoga to run hoga. to iske liye hm routes banate hai. 

export {registerUser} //exported registerUser object.
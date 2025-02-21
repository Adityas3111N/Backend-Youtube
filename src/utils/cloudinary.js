import { v2 as cloudinary } from 'cloudinary';
import exp from 'constants';
import fs from "fs"; //this is by default provided by node js. file system helps tto manage files. we are using to unlink from server once uploaded on cloudinary.

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_CLOUD_KEY, 
    api_secret: process.env.CLOUDINARY_CLOUD_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath){
            console.error("cloudinary.js :: no local file path given", error);
            return null;
        }

        const response = await cloudinary.uploader.upload(localFilePath, {resource_type: "auto"});
        //to check if files are geting uploaded. and if yes then how to get the url.
        // console.log("file is uploaded on cloudinary", response.url); 
        fs.unlinkSync(localFilePath) //it will delete file from local storage after being uploaded on cloudinary. and even if some error occur it will delete in that case also.
        return response;

    } catch (error) {
        // fs.unlinkSync(localFilePath) //remove locally stored file as upload failed.
        // Good Practice: Avoid synchronous operations (unlinkSync) in a non-blocking 
        // environment like Node.js. Use fs.promises.unlink() instead, as it’s
        //  asynchronous and won’t block the event loop.
        await fs.promises.unlink(localFilePath);
        return null
    }
}


export {uploadOnCloudinary};
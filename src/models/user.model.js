import mongoose, {Schema} from "mongoose";  //imported destructured Schema to avoid mongoose.Schema.
import bcrypt from "bcrypt"  
import jwt from "jsonwebtoken" //had a bug that initially i installed these dependencies out of my project folder. i.e - backend folder.
//solved it by deleting package files there and reistalling again in the required root of project folder.

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
            trim: true,
        },
        fullname: {
            type: String, 
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String, //cloudinary url
            required: true
        },
        coverimage: {
            type: String //cloudinary url
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],//dependent of video.model.js
        //contains array of objects. each object contain videoId.
       // agr jyada complex hoti chijein to yaha ek aur mini schema bana ke us se values use karni padti.
       password: {
        type: String,
        required: [true, 'password is required']
       }, //we will encrypt and store password in db and later we don't know how to
       //  authenticate user bcz we can't compare with encrypted password.
       refreshTockens: {
        type: String
       }
    },
    
    {
        timestamps: true
    }
)                                             


//Bcrypt

//ye hook encrypt kr dega password ko.
userSchema.pre("save", async function(next){

    if(!this.isModified("password")) return next();//this will check if password is not modified it will return next  -> middleware is done.
    this.password = await bcrypt.hash(this.password, 10); //hash(encrypt) password 10 times for higher security encryption.
    next(); //next to tell that this middleware is done.
})

//ye method user ke password ko check krne ke liye use karenge ki vo sahi hai ya nahi.

//kyuki encrypted string password se directly to compare karwa nahi sakte.
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}//this will return true or false
// on the basis of wheather password matched or not.
//password aur abhi user ke dwara enter kiye hue password ko compare karta hai.

// Json web Tocken(JWT)
userSchema.methods.generateAccessTocken = function(){
    return jwt.sign(  //jwt.sign ke ander payloads aur secret aur expiry dalte hai to vo tocken generate kr deta hai.
        {
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname    
        },
         process.env.ACCESS_TOCKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOCKEN_EXPIRY
        }
    )
}

userSchema.methods.generateAccessTocken = function(){
    return jwt.sign(  //jwt.sign ke ander payloads aur secret aur expiry dalte hai to vo tocken generate kr deta hai.
        {//refresh tockens generate krne ke liye payload me keval id ki jarurat hoti hai.
        _id: this._id,
        },
         process.env.REFRESH_TOCKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOCKEN_EXPIRY
        }
    )
}
 
                                

export const User = mongoose.model("User", userSchema) 
//made a model in mongoDB as directed by userSchema in name of User and exported it.
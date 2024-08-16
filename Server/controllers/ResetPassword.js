const User = require("../models/user");
const mailsender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
// ...........resetpasswordToken...........

exports.resetPasswordToken = async(req,res) => {
    try {
        // get email from req body
        const email = req.body.email;

        // check user for this email, email verification
        const user = await User.findOne({email: email})

        if(!user) {
            return res.status(400).json({
                success:true,
                message:"Your email is not registered with us",
            })
        }


        // generate token
        const token = crypto.randomUUID();
        // update user by adding token and expiration time
        const updateDetails = await User.findOneAndUpdate({email:email},
            {
                token:token,
                resetPasswordExpires: Date.now() + 5*60*1000,
            },
            {new:true},
        )

        // create URL
        const url = `https://mentorvate.vercel.app/update-password/${token}`;
        

        // send mail containing the url
        await mailsender(email,"Password Reset Link", `Password Reset Link: ${url}`);

        // return response
        return res.status(200).json({
            success:true,
            message:"Email sent Successfully , please check email and change Password",
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"Unable to send the email for reset Password",
        })
    }
}

// ........RESET PASSWORD.........

exports.resetPassword = async(req,res) => {
    try {
        // fetch data
        const {password , confirmPassword , token} = req.body;

        // validation
        if(password != confirmPassword) {
            return res.status(401).json({
                success:false,
                message:"reset passwords not Matched",
            })
        }

        // get userdetails form db using token
        const userDetails = await User.findOne({token:token});
        // if no entry --> invalid token
        if(!userDetails) {
            return res.json({
                success:false,
                message:"invalid Token",
            });
        }
         // token time check
         if(userDetails.resetPasswordExpires < Date.now()) {
            return res.json({
                success:false,
                message:"Token Expired, please regenerate the token",
            });
         }

         // hash password
        const hashedPassword = await bcrypt.hash(password , 10);

        // password update in db
       const updatedUserDetails= await User.findOneAndUpdate({token:token},
            {password:hashedPassword},
            {new:true},
        )

        // return response
        return res.status(200).json({
            success:true,
            message:"Password reset Successfully",
            updatedUserDetails,
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"somenthing went wrong while reset the password",
        })
    }
}
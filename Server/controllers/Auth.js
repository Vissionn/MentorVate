const user = require("../models/user")
const OTP = require("../models/OTP");
const Profile = require("../models/Profile");
const optGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const mailsender = require("../utils/mailSender");
require("dotenv").config();
const jwt = require("jsonwebtoken")
const {passwordUpdated} = require("../mail/templates/passwordUpdate")


// ............send otp.............
exports.sendOTP = async(req,res) => {
    try {
        // fetch email from req body
        const {email} = req.body;

        // check if user already exist
        const checkUserPresent = await user.findOne({email});

        // if user already eixst , then return a response
        if(checkUserPresent) {
            return res.status(401).json({
                success:false,
                message:"User already registered",
            })
        }

        // generate otp
        var otp = optGenerator.generate(6 , {
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });
        console.log(`otp generated ${otp}`);

        //check unique otp or not
        // y bhut bekar logic h..iss tarah s nhi hota h production level pr...package use krte h for providing unique OTP everytime.(34-43)
        let notunique = await OTP.findOne({otp});

        while(notunique) {
            otp = optGenerator.generate(6 , {
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            });
            notunique = await OTP.findOne({otp});
        }

        const otpPayload = {email, otp};

        // create an entry for otp
        const otpBody = await OTP.create(otpPayload);
        console.log(`entry in DB ${otpBody}`);

        // return response successfuly
        res.status(200).json({
            success:true,
            message:"OTP Sent Successfully",
            otp,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

// ............SIGNUP.............

exports.signUp = async(req,res) => {
    try {
        //data fetch
        const{firstName,lastName,email,contactNumber,Password,confirmPassword, accountType,otp} = req.body;

        // existing user
        const UserExist = await user.findOne({email})

        // console.log("userexist", UserExist);
        // console.log("account type" , accountType,firstName,lastName,email,Password,confirmPassword,otp);

        // validation

        //check user already exist or not
        if(UserExist) {
            return res.status(400).json({
                success:false,
                message:"user already registered",
            })
        }

        if(!firstName || !lastName || !email || !Password || !confirmPassword || !otp) {
            return  res.status(400).json({
                success:false,
                message:"All Fields are Required",
            })
        }
        // 2 psswrd match
        if(Password !== confirmPassword) {
            return res.status(400).json({
                success:false,
                message:"create psswrd and confirm password does not matched, please try again",
            })
        }

        // find most recent otp stored for the user
        const recentotp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log("this is recentotp",recentotp);

        // validate otp
        if(recentotp.length === 0) {
            return res.status(400).json({
                success:false,
                message:"OTP not Found"
            })
        }

        else if(otp !== recentotp[0].otp){
            return res.status(400).json({
                success:false,
                message:"Invalid OTP , Not Correct"
            })
        }

        // hash password
        const hashedPassword = await bcrypt.hash(Password , 10);
        console.log(hashedPassword);


        // entry create in DB

        let approved = ""
        approved === "Instructor" ? (approved = false) : (approved = true)

        const profile = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null,
        })
        const User = await user.create({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            contactNumber,
            accountType : accountType,
            approved:approved,
            additionalDetails:profile._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`,
        })

        // return res
        return res.status(200).json({
            success:true,
            message:"user is registered Successfully",
            User,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:`unable to register ${error.message}`,
        })
    }
}


// ..........LOGIN..........

exports.logIn = async(req,res) => {

    try {
        // fetch the data
    const {email , Password} = req.body;
    // console.log(email , Password);

    // validation
    if(!email || !Password) {
        return res.status(400).json({
            success:false,
            message: "All fields are required",
        }
        )
    }

    // user exist or not
    const User = await user.findOne({email}).populate("additionalDetails");

    if(!User) {
        return res.status(401).json({
            success:false,
            message: "User Not registered,please signup first",
        })
    }

    // password matching and generate JWT Token

    if(await bcrypt.compare(Password, User.password)) {
        const payload = {
            email : User.email,
            id: User._id,
            accountype: User.accountType,
        }
        const token = jwt.sign(payload , process.env.JWT_SECRET , {
            expiresIn:"2h",
        });
        User.token = token;
        User.password = undefined;

        // create cookie and send response
        const options = {
            expires: new Date(Date.now() + 3*24*60*60*1000),
            httpOnly:true,
        }
        res.cookie("token" , token , options).status(200).json({
            success:true,
            token,
            User,
            message:"Logged In successfully",
        })
    }
    else {
        // alert("Password Incorrect");
        return res.status(401).json({
            success:false,
            message:"Password is Incorrect"
        })
    }
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"Login Failure, Please try again"
        })
    }
    

}

// .........CHANGE PASSOWRD.........

exports.changePassword = async(req,res) => {
    try {
        //fetch the data
        const{oldPassword, newPassword} = req.body;

        const userdetails = await user.findById(req.User.id)

        // validation
        // old password match
        const isPasswordMatch = await bcrypt.compare(oldPassword, userdetails.password );
        if(!isPasswordMatch) {
            return res.status(400).json({
                success:false,
                message:"Password Incorrecct"
            })
        }

        // if(newPassword != confirmNewPassword) {
        //     return res.status(400).json({
        //         success:false,
        //         message:"new created Password not matched, please type carefully",
        //     })
        // }

        // hash newpassword
        const hashedPassword = await bcrypt.hash(newPassword , 10);
        // update the password in db
         const updatedUserDetails = await user.findByIdAndUpdate(req.User.id, {password:hashedPassword}, {new:true})
        // const updatedUserDetails= await user.findOneAndUpdate({token:token},
        //     {password:hashedPassword},
        //     {new:true},
        // )

        // send notification mail 
        try {
           const emailResponse = await mailsender(updatedUserDetails.email , "Password Updated Successffully")
           console.log("email sent Successfully :" , emailResponse);
        } catch (error) {
             // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
      console.error("Error occurred while sending email:", error)
      return res.status(500).json({
        success: false,
        message: "Error occurred while sending email",
        error: error.message,
      })
        }
        // return response
        return res
        .status(200)
        .json({ success: true, message: "Password updated successfully", data:updatedUserDetails })
    } catch (error) {
         // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
           console.error("Error occurred while updating password:", error)
            return res.status(500).json({
             success: false,
             message: "Error occurred while updating password",
             error: error.message,
    })  
    }
}

// exports.changePassword = async (req, res) => {
//     try {
//       // Get user data from req.user
//       const userDetails = await user.findById(req.User.id)
  
//       // Get old password, new password, and confirm new password from req.body
//       const { oldPassword, newPassword } = req.body
  
//       // Validate old password
//       const isPasswordMatch = await bcrypt.compare(
//         oldPassword,
//         userDetails.password
//       )
//       if (!isPasswordMatch) {
//         // If old password does not match, return a 401 (Unauthorized) error
//         return res
//           .status(401)
//           .json({ success: false, message: "The password is incorrect" })
//       }
  
//       // Update password
//       const encryptedPassword = await bcrypt.hash(newPassword, 10)
//       const updatedUserDetails = await user.findByIdAndUpdate(
//         req.User.id,
//         { password: encryptedPassword },
//         { new: true }
//       )
  
//       // Send notification email
//       try {
//         const emailResponse = await mailsender(
//           updatedUserDetails.email,
//           "Password for your account has been updated",
//           passwordUpdated(
//             updatedUserDetails.email,
//             `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
//           )
//         )
//         console.log("Email sent successfully:", emailResponse.response)
//       } catch (error) {
//         // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
//         console.error("Error occurred while sending email:", error)
//         return res.status(500).json({
//           success: false,
//           message: "Error occurred while sending email",
//           error: error.message,
//         })
//       }
  
//       // Return success response
//       return res
//         .status(200)
//         .json({ success: true, message: "Password updated successfully" })
//     } catch (error) {
//       // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
//       console.error("Error occurred while updating password:", error)
//       return res.status(500).json({
//         success: false,
//         message: "Error occurred while updating password",
//         error: error.message,
//       })
//     }
//   }
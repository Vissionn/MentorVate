const jwt = require("jsonwebtoken");
require("dotenv").config();
const user = require("../models/user")

exports.auth = async(req , res , next) => {
    try {
        // console.log("cookie" , req.cookies.token);
        // extract jwt token
        const token = req.cookies.token || req.body.token || req.header("Authorization")?.replace("Bearer ","");
       console.log("token", token);
        // const token = req.user?.token
        // console.log("token", token);

        if(!token) {
            return res.status(401).json({
                success:false,
                message:"Token Missing",
            })
        }

        // verify the token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);

            req.User = decode;
        } catch (error) {
            return res.status(401).json({
                success:false,
                message: "token is invalid",
                error: error.message
            })
        }
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:`Something went wrong, While verifying the token$`,
            error:console.log(error.message),
        })
    }
    next();
}

exports.isStudent = (req,res,next) => {
    try {
        if(req.User.accountype !== "Student") {
            return res.status(401).json({
                success:false,
                message:"This is a Protected route for student",
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"User Role is Not matching",
        })
    }
}


exports.isAdmin = (req,res,next) => {
    try {
        if(req.User.accountype !== "Admin") {
            return res.status(401).json({
                success:false,
                message:"This is a Protected route for Admin",
            })
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"User Role is Not matching",
        })
    }
}

exports.isInstructor = async (req, res, next) => {
	try {
        console.log(req.User.accountype);
		if (req.User.accountype !== "Instructor") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Instructor",
			});
		}
		next();
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, message: `User Role Can't be Verified` });
	}
};
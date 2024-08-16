const express = require("express");
const app = express();


// api route
const userRoutes = require("./routes/User")
const profileRoutes = require("./routes/Profile")
const paymentRoutes = require("./routes/Payment")
const courseRoutes = require("./routes/Course");
const contactUsRoute = require("./routes/Contact")

const db = require("../Server/config/database");

const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileupload = require("express-fileupload");
const cloudinary = require("../Server/config/cloudinary");

const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: true }));

// port find
require("dotenv").config();
const PORT = process.env.PORT || 5000;

// middleware add
app.use(express.json());
app.use(cookieParser());
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

app.use(cors({
    origin:["https://mentorvate.vercel.app", "http://localhost:3000"],
    // In development, setting Access-Control-Allow-Origin to * allows any domain to access your API, which is useful for testing across multiple local environments without dealing with CORS issues.
    // origin:"*",
    credentials:true,
}))


// db connection
db();

// cloudinary connection
cloudinary.cloudinaryConnect();

// routes mount
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/reach", contactUsRoute);

// default route
app.get("/" , (req,res) => {
    return res.json({
        success:true,
        message:"Your server is up and running..."
    })
})

// server activate
app.listen(PORT , () => {
    console.log(`App is running at ${PORT}`)
})



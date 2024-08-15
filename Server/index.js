const express = require("express");
const app = express();


// api route
const userRoutes = require("./routes/User")
const profileRoutes = require("./routes/Profile")
const paymentRoutes = require("./routes/Payment")
const courseRoutes = require("./routes/Course");

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
    origin:"http://localhost:3000",
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



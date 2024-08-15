const mongoose = require("mongoose");
const mailsender = require("../utils/mailSender");

const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 5 * 60,
  },
});

// a function -> to send mail
async function sendVerficationMail(email, otp) {
  try {
    const mailResponse = await mailsender(
      email,
      "Verification Email From MentorVate",
      otp
    );
    console.log("Email Sent Successfully: ", mailResponse);
  } catch (error) {
    console.log("error occured while send the email ", error);
  }
}

OTPSchema.pre("save", async function (next) {
  await sendVerficationMail(this.email, this.otp);
  next();
});

module.exports = mongoose.model("OTP", OTPSchema);

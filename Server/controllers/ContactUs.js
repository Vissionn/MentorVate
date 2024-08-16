const { contactUsEmail } = require("../mail/templates/contactFormRes")
const mailSender = require("../utils/mailSender")

exports.contactUsController = async (req, res) => {
  const { Email, firstName, lastName, message, phonenumber, countrycode } = req.body
  console.log(req.body)
  try {
    const emailRes = await mailSender(
      process.env.MAIL_USER,
      "Your Data send successfully",
      contactUsEmail(Email, firstName, lastName, message, phonenumber, countrycode)
    )
    console.log("Email Res ", emailRes)
    return res.json({
      success: true,
      message: "Email send successfully",
    })
  } catch (error) {
    console.log("Error", error)
    console.log("Error message :", error.message)
    return res.json({
      success: false,
      message: "Something went wrong...",
    })
  }
}

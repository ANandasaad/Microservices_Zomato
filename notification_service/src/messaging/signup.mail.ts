import config from "../config";
import { transporter } from "../config/nodemailer";
import { SignupTemplate } from "../templates/signup.template";
interface SignupData {
  email: string;
  otp: string;
}
export const SignUpWithEmail = async (data: any) => {
  try {
    console.log(data, "signUpWithEmail");
    const mailInfo = await transporter.sendMail({
      from: config.email_username,
      to: data.data.email,
      subject: "Signup verification email",
      text: `Your OTP is: ${data.data.otp}`,
      html: SignupTemplate(data),
    });
    console.log(mailInfo);
  } catch (error) {
    throw error;
  }
};

import createResend from "../lib/resend";
import VerificationEmail from "../../emails/VerficationEmail";
import { ApiResponse } from "../types/ApiResponse";
export async function sendVerificationEmail(
  email: string,
  username: string,
  VerfiyCode: string,
): Promise<ApiResponse> {
  try {
    const resend = createResend();
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Your Verification Code",
      react: VerificationEmail({ username, otp: VerfiyCode }),
    });

    return {
      success: true,
      message: "Verification email sent successfully.",
    };
  } catch (error) {
    console.error("Error sending verification email:", error);
    return {
      success: false,
      message: "Failed to send verification email.",
    };
  }
}

import resend from "../lib/resend.ts";
import VerificationEmail from "../../emails/VerficationEmail.tsx";
import { ApiResponse } from "../types/ApiResponse.ts";
export async function sendVerificationEmail(
  email: string,
  username: string,
  VerfiyCode: string,
): Promise<ApiResponse> {
  try {
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

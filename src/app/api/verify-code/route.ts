import dbConnect from "@/src/lib/dbConnect";
import UserModel from "@/src/models/User.model";
export async function POST(request: Request) {
  await dbConnect();
  try {
    const { code, username } = await request.json();
    const decodedUsername = decodeURIComponent(username);
    const user = await UserModel.findOne({ username: decodedUsername});
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 },
      );
    }
    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();
    if (isCodeValid&& !isCodeNotExpired) {
        return Response.json(
          {
            success: false,
            message: "Account verfied successfully",
          },
          { status: 200 },
        );
    }else if (!isCodeNotExpired) {
        return Response.json(
          {
            success: false,
            message: "Verification code has expired",
          },
          { status: 400 },
        );
    }
    else {
        return Response.json(
          {
            success: false,
            message: "Incorrect verification code",
          },
          { status: 400 },
        ); 
    }
  } catch (error) {
    console.error("Error verifying code:", error);
    return Response.json(
      {
        success: false,
        message: "Error verifying user",
      },
      { status: 500 },
    );
  }
}

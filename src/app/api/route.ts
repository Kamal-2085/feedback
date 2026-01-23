import dbConnect from "../../../src/lib/dbConnect.ts";
import bcrypt from "bcryptjs";
import UserModel from "../../../src/models/User.model.ts";
import { sendVerificationEmail } from "../../../src/helpers/sendVerificationEmail.ts";
export async function POST(request: Request) {
  await dbConnect();
  try {
    const { email, username, password } = await request.json();
    const existingUserVerifiedByUsername = await UserModel.findOne({
      username: username,
      isVerified: true,
    });
    if (existingUserVerifiedByUsername) {
      return Response.json(
        { success: false, message: "Username already taken." },{
          status: 400,
        }
      );
    }
    const existingUserVerifiedByEmail = await UserModel.findOne({
      email: email,
      isVerified: true,
    });
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    if (existingUserVerifiedByEmail) {
      if (existingUserVerifiedByEmail.isVerified) {
        return Response.json(
        { success: false, message: "Email already registered." },{
          status: 400,
        }
      );
      }
      else{
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUserVerifiedByEmail.password = hashedPassword;
        existingUserVerifiedByEmail.verifyCode = verifyCode;
        existingUserVerifiedByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000); // 1 hour from now
        await existingUserVerifiedByEmail.save();
      }
    }
    else{
      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1); // 1 hour from now
      const newUser= new UserModel({
          username,
          email,
          password: hashedPassword,
          verifyCode,
          verifyCodeExpiry: expiryDate,
          isVerified: false,
          isAcceptingMessage: true,
          messages: [],
    });
      await newUser.save();
    }
    const emailRespone=await sendVerificationEmail(email,username,verifyCode);
    if(!emailRespone.success){
      return Response.json(
        { success: false, message: emailRespone.message },{
          status: 500,
        }
      );
    };
    return Response.json(
      { success: true, message: "User registered successfully. Please check your email for the verification code." },{
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error in registration route:", error);
    return Response.json(
      { success: false, message: "Error registering user." },{
        status: 500,
      }
    );
  }
  const { email, username, password } = await request.json();}
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/src/lib/dbConnect";
import UserModel from "@/src/models/User.model";
import { User } from "next-auth";
export async function POST(request: Request) {
    await dbConnect();
    const session = await getServerSession(authOptions);
    const user:User=session?.user as User;
    if(!session || !session.user){
        return Response.json(
            {
              success: false,
              message: "Unauthorized",
            },
            { status: 401 },
          );
    }
    const userId = user._id;
    const { acceptMessages }=await request.json();
    try {
        const updatedUser=await UserModel.findByIdAndUpdate(userId, { isAcceptingMessages: acceptMessages },{new:true});
        if(!updatedUser){
            return Response.json(
                {
                  success: false,
                  message: "User not found",
                },
                { status: 401 },
              );
        }
        return Response.json(
            {
              success: true,
              message: "Message preferences updated successfully",
              updatedUser
            },
            { status: 200 },
          );
    }
    catch (error) {
        console.error("Error updating message preferences:", error);
        return Response.json(
          {
            success: false,
            message: "Error updating message preferences",
          },
          { status: 500 },
        );
      }
};
export async function GET(request: Request) {
    await dbConnect();
    const session = await getServerSession(authOptions);
    const user:User=session?.user as User;
    if(!session || !session.user){
        return Response.json(
            {
              success: false,
              message: "Unauthorized",
            },
            { status: 401 },
          );
    }
    const userId = user._id;
    try{
        const foundUser = await UserModel.findById(userId);
    if(!foundUser){
        return Response.json(
            {
              success: false,
              message: "User not found",
            },
            { status: 404 },
          );
    }
    return Response.json(
        {
          success: true,
          isAcceptingMessages: foundUser.isAcceptingMessage,
        },
        { status: 200 },
      );
    }
    catch (error) {
        console.error("Error fetching user:", error);
        return Response.json(
          {
            success: false,
            message: "Error fetching user",
          },
          { status: 500 },
        );
      }
};
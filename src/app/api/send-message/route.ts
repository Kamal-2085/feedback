import UserModel from "@/src/models/User.model";
import dbConnect from "@/src/lib/dbConnect";
import { Message } from "@/src/models/User.model";
import { success } from "zod";
export async function POST(request: Request) {
    await dbConnect();
    const { username,content } = await request.json();
    try{
        const user = await UserModel.findOne({ username });
        if(!user){
            return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
        };
        if(!user.isAcceptingMessage){
            return new Response(JSON.stringify({ success:false,message: "User is not accepting messages" }), { status: 403 });
        };
        const newMessage = {
            content,
            createdAt: new Date(),
    }
    user.messages.push(newMessage as Message);
    await user.save();
    return new Response(JSON.stringify({ success:true,message: "Message sent successfully" }), { status: 200 });
    }
    catch(error){
        console.error("Error sending message:", error);
        return new Response(JSON.stringify({ success:false,message: "Internal Server Error" }), { status: 500 });
    }
};
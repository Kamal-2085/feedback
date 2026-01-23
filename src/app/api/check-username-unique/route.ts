import dbConnect from "../../../lib/dbConnect.ts";
import UserModel from "../../../models/User.model.ts";
import {success, z} from "zod";
import { usernameValidation } from "../../../schemas/signUpSchema.ts";
const UsernamQuerySchema = z.object({
    username: usernameValidation
});
export async function GET(request: Request) {
    await dbConnect();
    try {
        const { searchParams } = new URL(request.url);
        const queryParams = {
            username: searchParams.get("username")
        }
        const result = UsernamQuerySchema.safeParse(queryParams);
        if (!result.success) {
            const usernameErrors = result.error.format().username?._errors || [];
            return Response.json({ 
                success: false,
                message: usernameErrors?.length>0? usernameErrors.join(","): "Invalid query parameters",
            }, { status: 400 });
        }
        const { username } = result.data;
        const existingVerifiedUser = await UserModel.findOne({ username: username, isVerified: true });
        if (existingVerifiedUser) {
            return Response.json({ 
                success: false,
                message: "Username is already taken by a verified user"
            }, { status: 400 });
        }
        return Response.json({ 
            success: true,
            message: "Username is available"
        }, { status: 200 });
    } catch (error) {
        console.error("Error checking username uniqueness:", error);return Response.json({ 
            success: false,
            message:"Error checking username uniqueness"
        }, { status: 500 });
    }
}
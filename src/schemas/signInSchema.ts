import z from "zod";

export const signInSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters long"),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string(),
});

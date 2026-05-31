import * as z from "zod";

const validateRegisterSchema = z.object({
  fullname: z.string().min(3, "fullname minimal 3 karakter"),
  username: z.string().min(1, "minimal 1 karakter"),
  age: z.number().min(14, "minimal umur 14 tahun"),
  email: z.email("format email salah"),
  password: z.string().min(6, "minimal 6 karakter"),
  confirmPassword: z.string(),
}).refine((data)=>data.password === data.confirmPassword,{
    message: "Passwords tidak sama",
});

export default validateRegisterSchema;

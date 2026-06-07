import * as z from "zod";

const validateLoginSchema = z.object({
  email: z.email(),
  password: z.string(),
});
export default validateLoginSchema;

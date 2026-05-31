import * as z from "zod";


const errorMessageZod = (err: z.ZodError) => {
  const ms = err.issues.map((issues) => `${issues.message}`);
  return ms;
};


export default errorMessageZod;
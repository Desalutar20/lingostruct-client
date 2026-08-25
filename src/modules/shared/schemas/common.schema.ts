import { EMAIL_MAX_LENGTH } from "@/modules/auth/const/auth-schemas.const";
import z from "zod";

export const nonEmptyStringSchema = (error?: string) => z.string().trim().nonempty(error);
export const emailSchema = z
  .email()
  .trim()
  .nonempty("Email can't be empty")
  .max(EMAIL_MAX_LENGTH, `Email must be at most ${EMAIL_MAX_LENGTH} characters`);
export const isoStringSchema = z.iso.datetime().trim().nonempty();

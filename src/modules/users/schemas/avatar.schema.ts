import z from "zod";

export const avatarSchema = z
  .file()
  .mime(["image/gif", "image/jpeg", "image/png", "image/webp"])
  .max(5 * 1024 * 1024);

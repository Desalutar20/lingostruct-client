import z from "zod";

export const getPresignedUrlSchema = z
  .object({
    contentType: z.mime([
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
      "video/mp4",
      "video/webm",
      "application/pdf",
      "application/zip",
      "audio/mpeg",
      "audio/ogg",
      "audio/wav",
      "audio/webm",
      "text/html",
      "text/plain",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
    ]),
  })
  .strict();

export type GetPresignedUrlInput = z.input<typeof getPresignedUrlSchema>;

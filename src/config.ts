import { z } from "zod";

const configSchema = z.object({
  apiUrl: z.url().trim().nonempty(),
  apiPrefix: z.string().trim().nonempty(),
});

export const config = configSchema.parse({
  apiUrl: import.meta.env.VITE_API_BASE_URL,
  apiPrefix: import.meta.env.VITE_API_PREFIX,
});

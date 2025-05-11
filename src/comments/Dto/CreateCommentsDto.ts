import { z } from "zod";

export const createCommentDto = z.object({
  content: z.string().nonempty(),
  productId: z.number(),
});

import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { createCommentDto } from "../Dto/CreateCommentsDto.js";
import CommentsService from "../Service/CommentsService.js";

const CommentController = new Hono();

CommentController.post("/", zValidator("json", createCommentDto), async (c) => {
  const payload = c.req.valid("json");
  return c.json(await CommentsService.createComments(payload));
});

CommentController.get("/:productId", async (c) => {
  const productId = c.req.param("productId");

  return c.json(await CommentsService.getComments(+productId));
});

export default CommentController;

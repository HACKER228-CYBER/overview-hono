import { Hono } from "hono";
import ProductService from "../Service/ProductService.js";
import { vValidator } from "@hono/valibot-validator";
import { ProductSchema } from "../Schema/ProductSchema.js";

export const ProductController = new Hono();

ProductController.post("/", vValidator("json", ProductSchema), async (c) => {
  const payload = c.req.valid("json");
  return c.json(await ProductService.createProducts(payload));
});

ProductController.get("/:id", async (c) => {
  const id = c.req.param("id");
  return c.json(await ProductService.getProducts(+id));
});

ProductController.get("/:id", async (c) => {});

ProductController.put("/:id", async (c) => {});

ProductController.delete("/:id", async (c) => {});

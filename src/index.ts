import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { databaseConnection } from "./db/connection.js";
import { UserController } from "./user/Controller/UserController.js";
import { cors } from "hono/cors";
import { ProductController } from "./products/Controller/ProductController.js";
import CommentController from "./comments/Controller/CommentsController.js";

// You can specify any property from the node-postgres connection options

const app = new Hono();

export const db = databaseConnection();

app.use("*", cors());

app.route("/users", UserController);
app.route("/products", ProductController);
app.route("/comments", CommentController);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

serve(
  {
    fetch: app.fetch,
    port: 4000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);

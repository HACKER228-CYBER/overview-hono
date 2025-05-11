import { Hono } from "hono";
import UserService from "../Service/UserService.js";
import { vValidator } from "@hono/valibot-validator";
import {
  ManyUserSchema,
  UserSchema,
  type IUser,
} from "../Utils/User.validator.js";
import { UserUpdateSchema } from "../Utils/User.update.validator.js";
import CommonService from "../../common/Service/CommonService.js";

export const UserController = new Hono();

UserController.get("/generator/:value/:marge", async (c) => {
  const value = c.req.param("value");
  const marge = c.req.param("marge");

  return c.json(await UserService.generateUsers(+value, +marge));
});

UserController.post(
  "/insert-many",
  vValidator("json", ManyUserSchema),
  async (c) => {
    const payload = c.req.valid("json");
    console.log(payload);

    return c.json(await UserService.createManyUsers(payload.users));
  }
);

UserController.post("/", vValidator("json", UserSchema), async (c) => {
  const payload = c.req.valid("json");

  return c.json(await UserService.createUser(payload));
});

UserController.get("/", async (c) => {
  console.log("Get users");

  const paginationQueries = CommonService.paginationQueries(c.req);
  return c.json(await UserService.getUsers({ paginationQueries }));
});

UserController.put("/:id", vValidator("json", UserUpdateSchema), async (c) => {
  const payload = c.req.valid("json");
  const id = c.req.param("id");

  return c.json(await UserService.updateUser(id, payload));
});

UserController.delete("/:id", async (c) => {
  const id = c.req.param("id");

  return c.json(await UserService.deleteUser(id));
});

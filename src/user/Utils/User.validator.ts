import * as v from "valibot";

export const UserSchema = v.object({
  name: v.string(),
  age: v.number(),
  email: v.pipe(
    v.string("Your email must be a string."),
    v.nonEmpty("Your email must not be empty."),
    v.email("The email address is badly formatted.")
  ),
});

export const ManyUserSchema = v.object({
  users: v.array(UserSchema),
});

export interface IUser {
  name: string;
  age: number;
  email: string;
}

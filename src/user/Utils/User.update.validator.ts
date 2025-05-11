import { object, string, number, email } from "valibot";

export const UserUpdateSchema = object({
  name: string() || undefined,
  age: number() || undefined,
});

export interface IDtoUserUpdate {
  name: string;
  age: number;
}

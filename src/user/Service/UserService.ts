import { HTTPException } from "hono/http-exception";
import { usersTable } from "../../db/schema.js";
import { db } from "../../index.js";
import { type IUser } from "../Utils/User.validator.js";
import type { IDtoUserUpdate } from "../Utils/User.update.validator.js";
import { count, eq } from "drizzle-orm";
import type { IPaginationQueries } from "../../common/Service/CommonService.js";
import type { IRequestResponse } from "../../common/Interfaces/CommonInterfaces.js";

class UserService {
  constructor() {}

  public async createManyUsers(payload: IUser[]) {
    const errorMessages: any[] = [];

    await Promise.all(
      payload.map(async (user) => {
        const { alreadyUsed, message } = await this.userExists(user.email);
        if (alreadyUsed) {
          errorMessages.push(message);
        }
      })
    );

    if (errorMessages.length) {
      throw new HTTPException(500, {
        message: errorMessages.toString(),
      });
    }

    // All emails availables
    await Promise.all(
      payload.map(async (user) => {
        await this.createUser(user);
      })
    );

    return { message: "All uses added successfully !" };
  }

  public async userExists(
    email: string
  ): Promise<{ message: string; alreadyUsed: boolean }> {
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));
    if (user.length) {
      return {
        message: `Email ${email} already used`,
        alreadyUsed: true,
      };
    }

    return {
      message: "Email available",
      alreadyUsed: false,
    };
  }

  public async createUser(payload: IUser) {
    console.log("payload => ", payload);

    const { alreadyUsed, message } = await this.userExists(payload.email);
    if (alreadyUsed) {
      throw new HTTPException(400, {
        message,
      });
    }

    const newUser: typeof usersTable.$inferInsert = {
      age: payload.age,
      email: payload.email,
      name: payload.name,
    };
    const createdUser = await db.insert(usersTable).values(newUser);
    return createdUser;
  }

  public async getUsers({
    paginationQueries,
  }: {
    paginationQueries: IPaginationQueries;
  }): Promise<IRequestResponse<IUser[]>> {
    // console.log("paginationQueries : ", paginationQueries);

    const data = await db
      .select()
      .from(usersTable)
      .orderBy(usersTable.id)
      .limit(paginationQueries.limit)
      .offset(paginationQueries.page * paginationQueries.limit - 1);

    const [totalCount] = await db.select({ count: count() }).from(usersTable);

    return {
      pagination: {
        page: paginationQueries.page,
        limit: paginationQueries.limit,
        total: totalCount.count,
      },
      data,
    };
  }

  public async updateUser(id: string, payload: IDtoUserUpdate) {
    try {
      const user = await db
        .update(usersTable)
        .set({
          age: payload.age,
          name: payload.name,
        })
        .where(eq(usersTable.id, id))
        .returning();

      if (!user) {
        throw new HTTPException(404, { message: "User not found" });
      }

      return user;
    } catch (error) {
      console.log("error => ", error);

      throw new HTTPException(400, {
        message: error ? (error as any).message : "Something wrong",
      });
    }
  }

  public async deleteUser(id: string) {
    // try {
    const user = await db
      .delete(usersTable)
      .where(eq(usersTable.id, id))
      .returning();

    if (!user.length) {
      throw new HTTPException(404, { message: "User not found" });
    }

    return "User deleted successfully";
  }

  public async generateUsers(value: number, marge: number) {
    const users: IUser[] = [];
    const init = value;
    for (let i = init; i < init + marge; i++) {
      users.push({
        name: `User ${i}`,
        age: i,
        email: `user${i}@email.com`,
      });
    }

    return users;
  }
}

export default new UserService();

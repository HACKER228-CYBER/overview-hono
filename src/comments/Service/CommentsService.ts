import { eq } from "drizzle-orm";
import { CommentsTable, ProductsTable } from "../../db/schema.js";
import { db } from "../../index.js";
import { createCommentDto } from "../Dto/CreateCommentsDto.js";
import { HTTPException } from "hono/http-exception";

interface IPagination {
  total: number;
  page: number;
  next: boolean;
}

interface ICommentRespponse {
  pagination: IPagination;
  data: (typeof CommentsTable.$inferInsert)[];
}
class CommentsSerice {
  constructor() {}

  public async createComments(payload: typeof CommentsTable.$inferInsert) {
    await this.productExist(payload.productId);

    const comment: typeof CommentsTable.$inferInsert = {
      content: payload.content,
      productId: payload.productId,
    };

    const created = await db.insert(CommentsTable).values(comment).returning();
    return {
      comment: created,
      message: "Comment created successfully.",
    };
  }

  public async getComments(productId: number): Promise<ICommentRespponse> {
    const response = await db
      .select()
      .from(CommentsTable)
      .where(eq(CommentsTable.productId, productId));

    return {
      pagination: {
        next: true,
        page: 0,
        total: response.length,
      },
      data: response,
    };
  }

  private async productExist(id: number): Promise<{ status: boolean }> {
    const product = await db
      .select()
      .from(ProductsTable)
      .where(eq(ProductsTable.id, id));

    if (!product.length) {
      throw new HTTPException(404, {
        message: "Product not found",
      });
    }

    return {
      status: true,
    };
  }
}

export default new CommentsSerice();

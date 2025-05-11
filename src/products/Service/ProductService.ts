import { HTTPException } from "hono/http-exception";
import { db } from "../../index.js";
import { ProductsTable, usersTable } from "../../db/schema.js";
import { eq } from "drizzle-orm";
import CommentsService from "../../comments/Service/CommentsService.js";
import { type IProduct } from "../Schema/ProductSchema.js";

class ProductService {
  contructor() {}
  public async createProducts(productPayload: IProduct) {
    try {
      const newProduct: typeof ProductsTable.$inferInsert = {
        description: productPayload.description,
        name: productPayload.name,
        ownerId: productPayload.ownerId,
      };

      const createdProduct = await db.insert(ProductsTable).values(newProduct);
      return createdProduct;
    } catch (error: any) {
      throw new HTTPException(500, {
        message: `Somthing wrong1 ${error.message}`,
      });
    }
  }

  public async getProducts(userId: number) {
    // const response = await db
    //   .select()
    //   .from(ProductsTable)
    //   .leftJoin(usersTable, eq(usersTable.id, ProductsTable.ownerId))
    //   .where(eq(ProductsTable.ownerId, id))
    //   .orderBy(ProductsTable.id);

    const products = await db
      .select()
      .from(ProductsTable)
      .where(eq(ProductsTable.ownerId, userId))
      .orderBy(ProductsTable.id);

    const response = await Promise.all(
      products.map(async (product) => {
        const comments = await CommentsService.getComments(product.id);

        return {
          product,
          comments,
        };
      })
    );

    return {
      pagination: {
        total: products.length,
      },
      data: response,
    };
  }
}

export default new ProductService();

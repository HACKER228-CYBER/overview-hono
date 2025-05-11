import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

export const databaseConnection = () => {
  console.log("DB Initialized");

  const db = drizzle({
    connection: {
      connectionString: process.env.DATABASE_URL!,
      ssl: false,
    },
  });

  return db;
};

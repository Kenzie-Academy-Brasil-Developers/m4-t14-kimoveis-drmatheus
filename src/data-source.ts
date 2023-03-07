import "dotenv/config";
import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import path from "path";

const dataSourceConfig = (): DataSourceOptions => {
  const migrations: string = path.join(__dirname, "./migrations/**.{ts,js}");
  const entities: string = path.join(__dirname, "./entities/**.{ts,js}");
  const databaseURL: string | undefined = process.env.DATABASE_URL;
  const nodeEnv: string | undefined = process.env.NODE_ENV;

  if (!databaseURL) {
    throw new Error("Env var DATABASE_URL is undefined!");
  }

  if (nodeEnv === "test") {
    return {
      type: "sqlite",
      database: ":memory:",
      synchronize: true,
      entities: [entities],
    };
  }

  return {
    type: "postgres",
    url: databaseURL,
    synchronize: false,
    logging: true,
    entities: [entities],
    migrations: [migrations],
  };
};

export const AppDataSource: DataSource = new DataSource(dataSourceConfig());

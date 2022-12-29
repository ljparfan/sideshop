import { logger } from "@sideshop/common";
import { DataSource } from "typeorm";
import { Brand } from "../entities/brand.js";
import { Category } from "../entities/category.js";
import { Product } from "../entities/product.js";
import inventoryConfig from "../models/inventory-config.js";

export default function startDatabase() {
  const AppDataSource = new DataSource({
    type: inventoryConfig.dbType as any,
    host: inventoryConfig.dbHost,
    port: inventoryConfig.dbPort,
    username: inventoryConfig.dbUsername,
    password: inventoryConfig.dbPassword,
    database: inventoryConfig.dbName,
    entities: [Product, Category, Brand],
    synchronize: inventoryConfig.synchronizeDb,
    logging: inventoryConfig.enableDbLogging,
  });

  AppDataSource.initialize()
    .then(() => {
      logger.info("connected to db");
    })
    .catch((error) => logger.error(JSON.stringify(error)));
}

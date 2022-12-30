import { logger } from "@sideshop/common";
import { DataSource } from "typeorm";
import { CartItem } from "../entities/cart-item.js";
import inventoryConfig from "../models/cart-config.js";

export default function startDatabase() {
  const AppDataSource = new DataSource({
    type: inventoryConfig.dbType as any,
    host: inventoryConfig.dbHost,
    port: inventoryConfig.dbPort,
    username: inventoryConfig.dbUsername,
    password: inventoryConfig.dbPassword,
    database: inventoryConfig.dbName,
    entities: [CartItem],
    synchronize: inventoryConfig.synchronizeDb,
    logging: inventoryConfig.enableDbLogging,
  });

  AppDataSource.initialize()
    .then(() => {
      logger.info("connected to db");
    })
    .catch((error) => logger.error(JSON.stringify(error)));
}

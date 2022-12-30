import { logger } from "@sideshop/common";
import { DataSource } from "typeorm";
import { OrderItem } from "../entities/order-item.js";
import orderConfig from "../models/order-config.js";

export default function startDatabase() {
  const AppDataSource = new DataSource({
    type: orderConfig.dbType as any,
    host: orderConfig.dbHost,
    port: orderConfig.dbPort,
    username: orderConfig.dbUsername,
    password: orderConfig.dbPassword,
    database: orderConfig.dbName,
    entities: [OrderItem],
    synchronize: orderConfig.synchronizeDb,
    logging: orderConfig.enableDbLogging,
  });

  AppDataSource.initialize()
    .then(() => {
      logger.info("connected to db");
    })
    .catch((error) => logger.error(JSON.stringify(error)));
}

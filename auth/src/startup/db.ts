import { logger } from "@sideshop/common";
import { DataSource } from "typeorm";
import User from "../entities/user.js";
import authConfig from "../models/auth-config.js";

export default function startDatabase() {
  logger.info("starting db");

  const AppDataSource = new DataSource({
    type: authConfig.dbType as any,
    host: authConfig.dbHost,
    port: authConfig.dbPort,
    username: authConfig.dbUsername,
    password: authConfig.dbPassword,
    database: authConfig.dbName,
    entities: [User],
    synchronize: authConfig.synchronizeDb,
    logging: authConfig.enableDbLogging,
  });

  AppDataSource.initialize()
    .then(() => {
      logger.info("connected to db");
    })
    .catch((error) => logger.error(JSON.stringify(error)));
}

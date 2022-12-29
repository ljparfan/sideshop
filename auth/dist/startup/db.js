import { DataSource } from "typeorm";
import config from "../config/index.js";
import User from "../models/user.js";
export default function startDatabase() {
    console.log("starting db");
    const AppDataSource = new DataSource({
        type: config.dbType,
        host: config.dbHost,
        port: config.dbPort,
        username: config.dbUsername,
        password: config.dbPassword,
        database: config.dbName,
        entities: [User],
        synchronize: config.synchronizeDb,
        logging: config.enableDbLogging,
    });
    AppDataSource.initialize()
        .then(() => {
        console.log("connected to db");
    })
        .catch((error) => console.log(error));
}
//# sourceMappingURL=db.js.map
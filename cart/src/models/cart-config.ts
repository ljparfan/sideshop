interface CartConfig {
  dbType: string;
  dbHost: string;
  dbPort: number;
  dbUsername: string;
  dbPassword: string;
  dbName: string;
  synchronizeDb: boolean;
  enableDbLogging: boolean;
}

const inventoryConfig: CartConfig = {
  dbHost: process.env.DB_HOST!,
  dbType: process.env.DB_TYPE!,
  dbName: process.env.DB_NAME!,
  dbPassword: process.env.DB_PASSWORD!,
  dbPort: +process.env.DB_PORT!,
  dbUsername: process.env.DB_USERNAME!,
  enableDbLogging: process.env.DB_LOGGING === "true",
  synchronizeDb: process.env.DB_SYNCHRONIZE === "true",
};

export default inventoryConfig;

const config = {
    dbType: process.env.DB_TYPE,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    dbPassword: process.env.DB_PASSWORD,
    dbPort: +process.env.DB_PORT,
    dbUsername: process.env.DB_USERNAME,
    enableDbLogging: process.env.DB_LOGGING === "true",
    jwtSecret: process.env.JWT_SECRET,
    serverPort: +process.env.SERVER_PORT,
    synchronizeDb: process.env.DB_SYNCHRONIZE === "true",
};
export default config;
//# sourceMappingURL=index.js.map
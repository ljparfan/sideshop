const inventoryConfig = {
    dbHost: process.env.DB_HOST,
    dbType: process.env.DB_TYPE,
    dbName: process.env.DB_NAME,
    dbPassword: process.env.DB_PASSWORD,
    dbPort: +process.env.DB_PORT,
    dbUsername: process.env.DB_USERNAME,
    enableDbLogging: process.env.DB_LOGGING === "true",
    synchronizeDb: process.env.DB_SYNCHRONIZE === "true",
    awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID.trim(),
    awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY.trim(),
    awsS3BucketName: process.env.AWS_S3_BUCKET_NAME.trim(),
    awsRegion: process.env.AWS_REGION.trim(),
};
export default inventoryConfig;
//# sourceMappingURL=inventory-config.js.map
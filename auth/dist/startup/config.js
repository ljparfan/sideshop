export default function validateConfig() {
    console.log("validating config");
    const requiredEnvironmentVariables = [
        "DB_TYPE",
        "DB_HOST",
        "DB_PORT",
        "DB_USERNAME",
        "DB_PASSWORD",
        "DB_NAME",
        "DB_SYNCHRONIZE",
        "DB_LOGGING",
        "JWT_SECRET",
        "SERVER_PORT",
    ];
    const emptyEnvironmentVariables = requiredEnvironmentVariables.filter((env) => !process.env[env]);
    if (emptyEnvironmentVariables.length > 0) {
        throw new Error(`${emptyEnvironmentVariables.join(", ")} are missing.`);
    }
}
//# sourceMappingURL=config.js.map
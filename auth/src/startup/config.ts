import { logger } from "@sideshop/common";

export default function validateConfig() {
  logger.info("validating config");

  const requiredEnvironmentVariables = [
    "DB_TYPE",
    "DB_HOST",
    "DB_PORT",
    "DB_USERNAME",
    "DB_PASSWORD",
    "DB_NAME",
    "DB_SYNCHRONIZE",
    "DB_LOGGING",
    "ACCESS_TOKEN_SECRET",
    "REFRESH_TOKEN_SECRET",
    "SERVER_PORT",
    "TWILIO_ACCOUNT_SID",
    "TWILIO_AUTH_TOKEN",
    "TWILIO_PHONE_NUMBER",
  ];

  const emptyEnvironmentVariables = requiredEnvironmentVariables.filter(
    (env) => !process.env[env]
  );
  if (emptyEnvironmentVariables.length > 0) {
    throw new Error(
      `${emptyEnvironmentVariables.join(", ")} ${
        emptyEnvironmentVariables.length === 1 ? "is" : "are"
      } missing.`
    );
  }
}

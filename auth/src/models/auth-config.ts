interface AuthConfig {
  accessTokenSecret: string;
  refreshTokenSecret: string;
  twilioSid: string;
  twilioAuthToken: string;
  twilioPhoneNumber: string;
  dbType: string;
  dbHost: string;
  dbPort: number;
  dbUsername: string;
  dbPassword: string;
  dbName: string;
  synchronizeDb: boolean;
  enableDbLogging: boolean;
}

const authConfig: AuthConfig = {
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET!.trim(),
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET!.trim(),
  twilioSid: process.env.TWILIO_ACCOUNT_SID!.trim(),
  twilioAuthToken: process.env.TWILIO_AUTH_TOKEN!.trim(),
  twilioPhoneNumber: process.env.TWILIO_PHONE_NUMBER!.trim(),
  dbHost: process.env.DB_HOST!.trim(),
  dbType: process.env.DB_TYPE!.trim(),
  dbName: process.env.DB_NAME!.trim(),
  dbPassword: process.env.DB_PASSWORD!.trim(),
  dbPort: +process.env.DB_PORT!.trim(),
  dbUsername: process.env.DB_USERNAME!.trim(),
  enableDbLogging: process.env.DB_LOGGING === "true",
  synchronizeDb: process.env.DB_SYNCHRONIZE === "true",
};

export default authConfig;

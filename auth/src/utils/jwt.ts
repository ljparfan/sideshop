import {
  DecodedAccessToken,
  DecodedRefreshToken,
  logger,
} from "@sideshop/common";
import jwt from "jsonwebtoken";
import authConfig from "../models/auth-config.js";

export function generateAccessToken(user: DecodedAccessToken) {
  logger.info(
    `Signing accessToken with secret: ${authConfig.accessTokenSecret}`
  );
  return jwt.sign(
    {
      id: user.id,
    },
    authConfig.accessTokenSecret,
    {
      expiresIn: "15m",
    }
  );
}

export function generateRefreshToken(user: DecodedRefreshToken) {
  logger.info(
    `Signing refreshToken with secret: ${authConfig.refreshTokenSecret}`
  );
  return jwt.sign(
    {
      id: user.id,
      tokenVersion: user.tokenVersion,
    },
    authConfig.refreshTokenSecret,
    {
      expiresIn: "7d",
    }
  );
}

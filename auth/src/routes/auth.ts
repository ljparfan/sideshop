import {
  isAuthenticated,
  BadRequestError,
  DecodedRefreshToken,
  InternalServerError,
  logger,
  NotFoundError,
  sendOtpViaSms,
  validateOtp,
  validateRequest,
} from "@sideshop/common";
import express, { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { LoginUserDto, loginUserSchema } from "../dtos/login-user-dto.js";
import {
  OtpValidationDto,
  otpValidationSchema,
} from "../dtos/otp-validation-dto.js";
import {
  RefreshTokenDto,
  refreshTokenSchema,
} from "../dtos/refresh-token-dto.js";
import User from "../entities/user.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";

const authRouter = express.Router();

authRouter.post(
  "/login",
  validateRequest<LoginUserDto>(loginUserSchema),
  async (req: Request, res: Response) => {
    try {
      const { mobileNumber } = req.body as LoginUserDto;
      const user = await User.findOneBy({ mobileNumber });
      if (!user) {
        throw new NotFoundError();
      }
      logger.info(`Found user: ${JSON.stringify(user)}`);
      const smsResponse = await sendOtpViaSms(mobileNumber, user.totpSecret);
      logger.info(smsResponse);

      res.send({
        message: `Successfully sent OTP to ${mobileNumber}`,
      });
    } catch (error) {
      logger.error(JSON.stringify(error));
      throw error;
    }
  }
);

authRouter.post(
  "/otp-validation",
  validateRequest<OtpValidationDto>(otpValidationSchema),
  async (req: Request, res: Response) => {
    try {
      const { mobileNumber, otp } = req.body as OtpValidationDto;
      const user = await User.findOneBy({ mobileNumber });
      if (!user) {
        throw new NotFoundError();
      }
      logger.info(`Found user: ${JSON.stringify(user)}`);
      const isOtpValid = validateOtp(otp, user.totpSecret);
      logger.info(`OTP is: ${isOtpValid ? "valid" : "invalid"}`);

      if (!isOtpValid) {
        throw new BadRequestError("OTP is expired / invalid.");
      }

      user.activated = true;
      await user.save();

      res.send({
        accessToken: generateAccessToken({
          id: user.id,
          isAdmin: user.isAdmin,
        }),
        refreshToken: generateRefreshToken({
          id: user.id,
          tokenVersion: user.tokenVersion,
        }),
      });
    } catch (error) {
      logger.error(JSON.stringify(error));
      throw error;
    }
  }
);

authRouter.post(
  "/refresh-token",
  validateRequest<RefreshTokenDto>(refreshTokenSchema),
  async (req: Request, res: Response) => {
    const { refreshToken } = req.body as RefreshTokenDto;

    let payload: DecodedRefreshToken | undefined;
    try {
      payload = verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET!
      ) as DecodedRefreshToken;
    } catch (err) {
      logger.error(err);
      throw new BadRequestError("Error in parsing token. Could be expired.");
    }

    // token is valid and
    // we can send back an access token
    const user = await User.findOneBy({ id: payload.id });

    if (!user) {
      throw new BadRequestError(
        "Invalid id stored in token. User might have been deleted."
      );
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      throw new BadRequestError(
        "Refresh token passed has been revoked. User might have logged out."
      );
    }

    return res.send({
      accessToken: generateAccessToken(user),
      refreshToken: generateRefreshToken(user),
    });
  }
);

authRouter.post("/logout", isAuthenticated, async (req, res) => {
  const user = await User.findOneBy({ id: req.user!.id });
  if (!user) {
    throw new InternalServerError("An unexpected error occurred");
  }

  user.tokenVersion += 1;
  await user.save();

  res.send({
    id: user.id,
    message: "Logout successful",
  });
});

export default authRouter;

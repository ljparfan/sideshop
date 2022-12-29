import express, { Request, Response } from "express";
import {
  validateRequest,
  BadRequestError,
  sendOtpViaSms,
  logger,
  InternalServerError,
  authentication,
  NotAuthorizedError,
  generateOtpSecret,
} from "@sideshop/common";
import {
  RegisterUserDto,
  registerUserSchema,
} from "../dtos/register-user-dto.js";
import User from "../entities/user.js";

const userRouter = express.Router();

userRouter.post(
  "/",
  validateRequest<RegisterUserDto>(registerUserSchema),
  async (req, _, next) => {
    const { mobileNumber } = req.body as RegisterUserDto;

    const count = await User.countBy({ mobileNumber });

    if (count > 0) {
      throw new BadRequestError(
        `User with mobile number: ${mobileNumber} already exists.`
      );
    }

    return next();
  },
  async (req: Request, res: Response) => {
    const userDto = req.body as RegisterUserDto;
    try {
      const secret = generateOtpSecret();
      const smsResponse = await sendOtpViaSms(userDto.mobileNumber, secret);
      logger.info(`SMS Response: ${JSON.stringify(smsResponse)}`);

      const user = new User();

      user.isAdmin = false;
      user.mobileNumber = userDto.mobileNumber;
      user.name = userDto.name;
      user.activated = false;
      user.totpSecret = secret;

      await user.save();
      res.send({
        ...userDto,
        id: user.id,
      });
    } catch (error) {
      logger.error(JSON.stringify(error));
      throw new InternalServerError("An unexpected error occurred.");
    }
  }
);

userRouter.get("/me", authentication, async (req, res) => {
  const user = await User.findOneBy({ id: req.user!.id });

  if (!user) {
    logger.error("User with id on token not found.");
    throw new NotAuthorizedError();
  }

  res.send({
    id: user.id,
    name: user.name,
    isAdmin: user.isAdmin,
    activated: user.activated,
  });
});

export default userRouter;

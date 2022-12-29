import NotFoundError from "../errors/not-found.js";
import errorHandler from "../middlewares/error-handler.js";
import authRouter from "../routes/auth.js";
import userRouter from "../routes/users.js";
export default function registerRoutes(app) {
    app.use("/api/users", userRouter);
    app.use("/api/auth", authRouter);
    app.all("*", async (req, res) => {
        throw new NotFoundError();
    });
    app.use(errorHandler);
}
//# sourceMappingURL=routes.js.map
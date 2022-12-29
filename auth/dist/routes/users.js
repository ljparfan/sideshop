import express from "express";
const userRouter = express.Router();
userRouter.post("/", async (req, res) => {
    res.status(201).send("register route");
});
userRouter.get("/me", (req, res) => {
    res.send("current user route");
});
export default userRouter;
//# sourceMappingURL=users.js.map
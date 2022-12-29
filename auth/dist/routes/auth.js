import express from "express";
const authRouter = express.Router();
authRouter.post("/", async (req, res) => {
    res.send("Login Route");
});
authRouter.post("/logout", (req, res) => {
    res.send("logout success");
});
export default authRouter;
//# sourceMappingURL=auth.js.map
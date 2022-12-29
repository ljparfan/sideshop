import express from "express";
import validateConfig from "./startup/config.js";
import startDatabase from "./startup/db.js";
import registerRoutes from "./startup/routes.js";
const app = express();
validateConfig();
startDatabase();
registerRoutes(app);
const port = process.env.PORT ?? 3000;
app.listen(port, () => {
    console.log(`auth service is starting on port ${port}`);
});
//# sourceMappingURL=index.js.map
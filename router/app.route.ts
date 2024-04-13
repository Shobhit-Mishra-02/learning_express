import { Router } from "express";
import { greeting } from "../controllers/greeting";
import logMiddleware from "../middlewares/app.log";

// create routes here...

const router = Router();

router.use(logMiddleware);
router.get("/", greeting);

export default router;

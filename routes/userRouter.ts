import express from "express";
export const router=express.Router();
import { json } from "body-parser";
import { signup, login } from "../controllers/auth_controller";
router.use(json());



router.get("/signup",signup);
router.get("/login",login);

module.exports=router;
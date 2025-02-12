import express from "express";

import { UserController } from "../user/user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./user.constant";

const router = express.Router();

router.get("", auth(USER_ROLE.user), UserController.getAllUsers);
router.post(
  "",
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
);

router.get("/:id", auth(USER_ROLE.user), UserController.getSingleUser);

export const UserRoutes = router;

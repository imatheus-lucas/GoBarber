import { Router } from "express";
import ensureAuthenticaded from "@modules/users/infra/http/middlewares/ensureAuthenticated";
import uploadConfig from "@config/Upload";

import multer from "multer";
import UsersController from "../../controllers/UsersController";
import UserAvatarController from "../../controllers/UserAvatarController";

const usersRouter = Router();

const upload = multer(uploadConfig);

usersRouter.post("/", UsersController.create);

usersRouter.patch(
  "/avatar",
  upload.single("file"),
  ensureAuthenticaded,
  UserAvatarController.update
);
export default usersRouter;

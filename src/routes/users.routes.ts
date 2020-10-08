import { Router } from "express";
import CreateUserService from "../services/CreateUserService";
import ensureAuthenticaded from "../middlewares/ensureAuthenticated";
import uploadConfig from "../config/Upload";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";

import multer from "multer";

const usersRouter = Router();

const upload = multer(uploadConfig);

usersRouter.post("/", async (request, response) => {
  const { name, email, password } = request.body;
  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    email,
    password,
  });

  delete user.password;
  return response.json(user);
});

usersRouter.patch(
  "/avatar",
  upload.single("file"),
  ensureAuthenticaded,
  async (request, response) => {
    const updateUserAvatarService = new UpdateUserAvatarService();
    const user = await updateUserAvatarService.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    return response.json(user);
  }
);
export default usersRouter;

import { Router } from "express";
import CreateUserService from "../services/CreateUserService";
import ensureAuthenticaded from "../middlewares/ensureAuthenticated";
import uploadConfig from "../config/Upload";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";

import multer from "multer";

const usersRouter = Router();

const upload = multer(uploadConfig);

usersRouter.post("/", async (request, response) => {
  try {
    const { name, email, password } = request.body;
    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;
    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

usersRouter.patch(
  "/avatar",
  upload.single("file"),
  ensureAuthenticaded,
  async (request, response) => {
    try {
      const updateUserAvatarService = new UpdateUserAvatarService();
      updateUserAvatarService.execute({
        user_id: request.user.id,
        avatarFilename: request.file.filename,
      });

      return response.json({ ok: true });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
);
export default usersRouter;

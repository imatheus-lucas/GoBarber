import { Router } from "express";
import CreateUserService from "../services/CreateUserService";
import ensureAuthenticaded from "../middlewares/ensureAuthenticated";
import uploadConfig from "../config/Upload";
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
    return response.json("ok");
  }
);
export default usersRouter;

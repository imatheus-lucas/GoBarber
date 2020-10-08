import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";

import Routes from "./routes";
import "./database";
import uploadConfig from "./config/Upload";
import AppError from "./errors/AppError";

const app = express();
app.use(express.json());

app.use("/files", express.static(uploadConfig.directory));
app.use(Routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: "error",
        message: err.message,
      });
    }
    console.log(err);
    return response.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
);
app.listen(3333, () => {
  console.log("server started on por 3333");
});

import "reflect-metadata";
import express from "express";
import Routes from "./routes";
import "./database";
import uploadConfig from "./config/Upload";
const app = express();
app.use(express.json());

// app.use("/files", express.static(uploadConfig.));
app.use(Routes);
app.listen(3333, () => {
  console.log("server started on por 3333");
});

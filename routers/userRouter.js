import express from "express";
import { user, userDetail,changePassword } from "../controllers/userController";
import { editVideo } from "../controllers/videoController";
import routes from "../routes";

const userRouter = express.Router();
userRouter.get("/", user);
userRouter.get(routes.editProfile, editVideo);
userRouter.get(routes.changePassword, changePassword);
userRouter.get(routes.userDetail, userDetail);

export default userRouter;
import express from "express";
import { user, userDetail,changePassword , editProfile} from "../controllers/userController";
import routes from "../routes";

const userRouter = express.Router();
userRouter.get(routes.home, user);
userRouter.get(routes.editProfile, editProfile);
userRouter.get(routes.changePassword, changePassword);
userRouter.get(routes.userDetail, userDetail);

export default userRouter;
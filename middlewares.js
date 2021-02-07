import routes from "./routes";
import multer from "multer";

// /uploads/vidoes/이런식으로 쓰지 않는 것이 중요하다 저렇게 쓰면 root경로에 폴더를 생성해버림
const multerVideo = multer({dest: "uploads/videos/"});

//html에서 변수를 사용할 수 있게 해줌
export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = "Wetube";
    res.locals.routes = routes;
    res.locals.user = {
        isAuthenticated: true,
        id: 1
    };
    next();
};

export const uploadVideo = multerVideo.single("videoFile");
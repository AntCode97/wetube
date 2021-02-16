import multer from "multer";
import routes from "./routes";


// /uploads/vidoes/이런식으로 쓰지 않는 것이 중요하다 저렇게 쓰면 root경로에 폴더를 생성해버림
const multerVideo = multer({ dest: "uploads/videos/" });
const multerAvatar = multer({ dest: "uploads/avatars/" })
//html에서 변수를 사용할 수 있게 해줌
export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = "Wetube";
    res.locals.routes = routes;
    //passport가 알아서 user request를 받아서 돌려준다
    res.locals.loggedUser = req.user || null;

    console.log(req.user)
    next();
};

export const onlyPublic = (req, res, next) => {
    if (req.user) {
        res.redirect(routes.home);
    } else {
        next();
    }
};

export const onlyPrivate = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect(routes.home);
    }
};


export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvatar = multerAvatar.single("avatar");
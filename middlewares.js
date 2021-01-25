import routes from "./routes";

//html에서 변수를 사용할 수 있게 해줌
export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = "Wetube";
    res.locals.routes = routes;

    next();
};
import express from "express";
//const express = require("express");
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser"
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import globalRouter from "./routers/globalRouter"
import videoRouter from "./routers/videoRouter"
import userRouter from "./routers/userRouter"
import routes from "./routes";
import { localsMiddleware } from "./middlewares";

import "./passport"

const app = express();

const CokieStore = MongoStore(session);

//node.js의 보안성을 높혀주는 미들웨어, contentSecuiryPolicy를 적어줘야 영상이 재생 잘됨
app.use(helmet({ contentSecurityPolicy: false, }));
app.set("view engine", "pug");
//directory에서 file을 보내주는 middleware
app.use("/uploads", express.static("uploads"))
app.use("/static", express.static("static"));

//쿠기 정보들을 이해하기 위해 사용
app.use(cookieParser());
//웹에서 데이터를 넘겨받을 때, 
//urlencoded와 json 형식의 객체를 서버가 이해할 수 있도록 하기위해 사용, 이거 없으면 req.body했을 때, 객체를 받아 올 수 없음..
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
//logging하는 걸 도와주는 미들웨어 콘솔에 여러가지 로그를 띄워줌
app.use(morgan("dev"));

app.use(session({
    secret: process.env.COOKIE_SECRET,
    session: true,
    saveUninitialized: false,
    store: new CokieStore({ mongooseConnection: mongoose.connection })
})
);

//passport가 쿠키를 들여다봐서, 그 쿠키 정보에 해당하는 사용자를 찾아준다.
//그리고 찾은 사용자를 request의 object =  req.user 로 만들어준다.
app.use(passport.initialize());
app.use(passport.session());

//변수를 html에서 사용하게 해줌
app.use(localsMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);





export default app;
import express from "express";
//const express = require("express");
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser"

const app = express();

const PORT = 4000;

const handleListening = () => console.log(`Listening on: http://localhost:${PORT}`);

const handleHome = (req, res) => res.send("Hello from home");

const handleProfile = (req, res) => res.send("You are on my profile");

//쿠기 정보들을 이해하기 위해 사용
app.use(cookieParser());
//웹에서 데이터를 넘겨받을 때, 
//urlencoded와 json 형식의 객체를 서버가 이해할 수 있도록 하기위해 사용
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
//logging하는 걸 도와주는 미들웨어 콘솔에 여러가지 로그를 띄워줌
app.use(morgan("dev"));
//node.js의 보안성을 높혀주는 미들웨어
app.use(helmet());

app.get("/", handleHome);

app.get("/profile", handleProfile);

app.listen(PORT, handleListening);
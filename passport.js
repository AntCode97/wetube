import passport from "passport";
import GithubStrategy from "passport-github";
import KakaoStrategy from "passport-kakao"
import User from "./models/User";
import { githubLoginCallback, kakaoLoginCallback } from "./controllers/userController"
import routes from "./routes";

passport.use(User.createStrategy());

//깃허브로 로그인하기하면 아래 주소로 보냄
passport.use(
    new GithubStrategy({
        clientID: process.env.GH_ID,
        clientSecret: process.env.GH_SECRET,
        callbackURL: `http://localhost:4000${routes.githubcallback}`
    },
        githubLoginCallback)
)

passport.use(
    new KakaoStrategy({
        clientID: process.env.KA_ID,
        clientSecret: process.env.KA_SECRET,
        callbackURL: `http://localhost:4000${routes.kakaoCallback}`,
        profileFields: ["id", "displayName", "photos", "email"]
    },
        kakaoLoginCallback)
)


passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});
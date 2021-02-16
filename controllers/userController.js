import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => res.render("join", { PageTitle: "Join" });
export const postJoin = async (req, res, next) => {
    const {
        body: { name, email, password, password2 }
    } = req;
    if (password != password2) {
        console.log(password, password2)
        res.status(400);
        res.render("join", { pageTitle: "Join" });
    } else {
        try {
            const user = await User({
                name,
                email
            });
            await User.register(user, password);
            next();
        } catch (error) {
            console.log(error);
            res.redirect(routes.home);
        }


    }

}
export const getLogin = (req, res) => res.render("login", { PageTitle: "Log In" });
export const postLogin = passport.authenticate("local", {
    failureRedirect: routes.login,
    successRedirect: routes.home
});

//강의 6.6부터 봐야함
export const githubLogin = passport.authenticate("github");

export const githubLoginCallback = async (_, __, profile, cb) => {
    console.log(profile)
    const { _json: { id, avatar_url: avatarUrl, login: name, email } } = profile;
    try {
        const user = await User.findOne({ email });
        if (user) {

            user.githubId = id;
            user.avatarUrl = avatarUrl;
            user.name = name;
            user.save()
            //쿠기에 유저를 저장시켜줌
            return cb(null, user);
        }
        const newUser = await User.create({
            email,
            name,
            githubId: id,
            avatarUrl
        });
        return cb(null, newUser);
    } catch (error) {
        return cb(error)
    }
}

export const postGithubLogIn = (req, res) => {
    res.redirect(routes.home);
};

export const kakaoLogin = passport.authenticate("kakao");

export const kakaoLoginCallback = async (
    _,
    __,
    profile,
    cb
) => {
    const { _json: { id, properties, kakao_account } } = profile;
    console.log(profile)
    try {
        const email = kakao_account.email;
        const user = await User.findOne({ email });

        if (user) {
            user.kakaoId = id;
            user.avatarUrl = properties.profile_image
            user.name = properties.nickname;
            user.save()

            //쿠기에 유저를 저장시켜줌
            return cb(null, user);
        }
        const newUser = await User.create({
            email,
            name: properties.nickname,
            kakaoId: id,
            avatarUrl: properties.profile_image
        });
        return cb(null, newUser);
    } catch (error) {
        return cb(error)
    }
}


export const postKakaoLogin = (req, res) => {
    res.redirect(routes.home);
};

export const logout = (req, res) => {
    //req.flash("info", "Logged out, see you later");
    req.logout();
    res.redirect(routes.home);
};

export const getMe = async (req, res) => {
    try {

        console.log(req.user)
        res.render("userDetail", { pageTitle: "User Detail", user: req.user });
    } catch (error) {
        res.redirect(routes.home);
    }
};


export const userDetail = async (req, res) => {
    const {
        params: { id }
    } = req;
    try {
        const user = await User.findById(id).populate("videos");
        res.render("userDetail", { pageTitle: "User Detail", user });
    } catch (error) {
        req.flash("error", "User not found");
        res.redirect(routes.home);
    }
};


export const getEditProfile = (req, res) => res.render("editProfile", { PageTitle: "edit Profile" });

export const postEditProfile = async (req, res) => {
    const {
        body: { name, email },
        file
    } = req;
    console.log(name);
    try {
        //avatarUrl은 아래처럼 적어주지 않으면 파일을 업로드하지 않는 경우 NULL로 들어가서 기존의 파일이 없어진다.
        //그래서 저렇게 적어야한다.
        await User.findByIdAndUpdate(req.user.id, {
            name,
            email,
            avatarUrl: file ? file.path : req.user.avatarUrl
        });
        req.user.name = name;
        req.user.email = email
        req.user.avatarUrl = file ? file.path : req.user.avatarUrl;
        res.redirect(routes.me);
    } catch (error) {
        console.log(error)
        res.redirect(routes.editProfile);
    }

}
export const getChangePassword = (req, res) => res.render("changePassword", { PageTitle: "Change Password" });
export const postChangePassword = async (req, res) => {
    const {
        body: { oldPassword, newPassword, newPassword1 }
    } = req;
    try {
        if (newPassword !== newPassword1) {
            res.status(400);
            res.redirect(`/users/${routes.changePassword}`);
            return;
        }
        await req.user.changePassword(oldPassword, newPassword);
        res.redirect(routes.me);
    } catch (error) {
        res.status(400);
        res.redirect(`/users/${routes.changePassword}`);
    }
};
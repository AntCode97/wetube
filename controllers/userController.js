import routes from "../routes"


export const getJoin = (req, res) => res.render("join", {PageTitle: "Join"});
export const postJoin = (req, res) => {
    const {
        body: {name, email, password, password2}
    } = req;
    if(password != password2) {
        console.log(password, password2)
        res.status(400);
        res.render("join", {pageTitle:"Join"});
    } else {
        // To Do: Regitster User
        // To Do: Log user in
        res.redirect(routes.home);
    }
    
}
export const getLogin = (req, res) => res.render("login", {PageTitle: "Log In"});
export const postLogin = (req, res) => {
    res.redirect(routes.home);
}

export const logout = (req, res) => {
    // To Do : Process Log Out
    res.redirect(routes.home);

};
export const userDetail =(req,res) => res.render("usersDetail", {PageTitle: "userDetail"});
export const editProfile =(req,res) => res.render("editProfile", {PageTitle: "edit Profile"});
export const changePassword =(req,res) => res.render("chanegePassword", {PageTitle: "Change Password"});
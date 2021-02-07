

export const home = (req, res) => {
   res.render("home", {pageTitle: "Home", videos} );
};
export const join = (req,res) => res.render("join", {pageTitle:"Join"});
export const login = (req,res) => res.render("login");
export const logout = (req,res) => res.render("logout")

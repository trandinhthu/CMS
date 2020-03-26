const Models = require("../Models/Models");
const mongoose = require("../../common/database")();
const jwt = require("jsonwebtoken");

function Home_Page(req, res) {
  res.render("HomePage/index");
}
function GetLogin(req, res, next) {
  res.render("HomePage/login", { data: {} });
}
async function PostLogin(req, res) {
  let email = req.body.email;
  let password = req.body.password;
  Models.UserModel.findOne({ User_mail: email }).exec((err, docs) => {
    if (docs === null) {
      let error = "Wrong Email or Password";
      res.render("HomePage/login", { data: { error: error } });
      return;
    }
    if (docs.User_pass !== password) {
      let error = "Wrong Email or Password";
      res.render("HomePage/login", { data: { error: error } });
      return;
    } else {
      const user = {
        user_id: docs._id,
        user_mail: docs.User_mail,
        user_role: docs.User_role
      };
      let token = jwt.sign({ user: user }, "Team2DevelopmentCms", {
        algorithm: "HS256",
        expiresIn: "3h"
      });
      res.cookie("user", token, { maxAge: 10800000, signed: true }); //set domain and httpOnly to cookie only send to a domain and https
      Models.RoleModel.findById({ _id: docs.User_role }).exec((err, role) => {
        if (role.roleName === "Staff") {
          return res.redirect("/staff");
        }
        if (role.roleName === "Student") {
          return res.redirect("/student");
        }
        if (role.roleName === "Tutor") {
          return res.redirect("/");
        }
      });
    }
  });
}
function LogOut(req, res) {
  res.clearCookie("user");
  return res.redirect("/login");
}
module.exports = {
  Home_Page: Home_Page,
  GetLogin: GetLogin,
  PostLogin: PostLogin,
  LogOut: LogOut
};

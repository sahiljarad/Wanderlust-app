// // 

// import express from "express";
// import User from "../models/user.js";
// import wrapAsync from "../utils/wrapAsync.js";
// import passport from "passport";
// const router = express.Router();

// /* =====================
//    SIGNUP FORM
// ===================== */
// router.get("/signup", (req, res) => {
//   res.render("users/signup.ejs");
// });

// /* =====================
//    SIGNUP LOGIC
// ===================== */
// router.post("/signup", wrapAsync(async (req, res, next) => {
//   try {
//     const { username, email, password } = req.body;

//     const newUser = new User({ username, email });
//     const registeredUser = await User.register(newUser, password);

//     // auto login after signup
//     req.login(registeredUser, err => {
//       if (err) return next(err);

//       req.flash("success", "Welcome to Wanderlust!");
//       res.redirect("/listing");
//     });
//   } catch (err) {
//     req.flash("error", err.message);
//     res.redirect("/signup");
//   }
// }));


//  //LOGIN FORM
// //===================== 
// router.get("/login", (req, res) => {
//   res.render("users/login.ejs");
// });

// /* =====================
//    LOGIN LOGIC
// ===================== */
// router.post(
//   "/login",
//   passport.authenticate("local", {
//     failureRedirect: "/login",
//     failureFlash: true,
//     successRedirect: "/listing",
//     // successFlash: "Welcome back to Wanderlust!"
//   })
// );

// router.get("/logout",(req,res,next)=>{
//   req.logout((err)=>{
//     if(err){
//      return next(err);
//     }
//     req.flash("success")
//     res.redirect("/listing");
//   })
// })

// export default router;
import express from "express";
const router = express.Router();

import passport from "passport";
import wrapAsync from "../utils/wrapAsync.js";

import {
  renderSignupForm,
  signup,
  renderLoginForm,
  login,
  logout,
} from "../controllers/user.js";

/* =====================
   SIGNUP
===================== */

// form
router.get("/signup", renderSignupForm);

// logic
router.post("/signup", wrapAsync(signup));

/* =====================
   LOGIN
===================== */

// form
router.get("/login", renderLoginForm);

// logic
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  login // controller function
);

/* =====================
   LOGOUT
===================== */
router.get("/logout", logout);

export default router;

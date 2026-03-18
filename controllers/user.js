import User from "../models/user.js";

// SIGNUP FORM
export const renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

// SIGNUP LOGIC
export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const newUser = new User({ username, email });
    const registeredUser = await User.register(newUser, password);

    // Auto login
    req.login(registeredUser, (err) => {
      if (err) return next(err);

      req.flash("success", "Welcome to Wanderlust!");
      res.redirect("/listing");
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/signup");
  }
};

// LOGIN FORM
export const renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

// LOGIN LOGIC (after passport)
export const login = (req, res) => {
  req.flash("success", "Welcome back!");
  res.redirect("/listing");
};

// LOGOUT
export const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    req.flash("success", "Logged out successfully!");
    res.redirect("/listing");
  });
};

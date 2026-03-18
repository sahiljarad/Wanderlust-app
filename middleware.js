export const isLoggedIn = (req, res, next) => {
  // console.log(req.user);
  if (!req.isAuthenticated()) {
    req.flash("error", "You must be logged in to create a listing");
    return res.redirect("/login");
  }
  next();
};
import { reviewSchema } from "./schema.js";
import ExpressError from "./utils/ExpressError.js";

// VALIDATE REVIEW
export const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const msg = error.details.map(el => el.message).join(", ");
    throw new ExpressError(400, msg);
  }

  next();
};

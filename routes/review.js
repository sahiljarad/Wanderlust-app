// import express from "express";
// const router = express.Router({ mergeParams: true });

// import Listing from "../models/listing.js";
// import Review from "../models/reviews.js";

// import wrapAsync from "../utils/wrapAsync.js";
// import ExpressError from "../utils/ExpressError.js";
// import { reviewSchema } from "../schema.js";

// /* =====================
//    VALIDATE REVIEW
// ===================== */
// const validateReview = (req, res, next) => {
//   const { error } = reviewSchema.validate(req.body, { abortEarly: false });

//   if (error) {
//     const msg = error.details.map(el => el.message).join(", ");
//     throw new ExpressError(400, msg);
//   }
//   next();
// };

// /* =====================
//    CREATE REVIEW
// ===================== */
// router.post(
//   "/",
//   validateReview,
//   wrapAsync(async (req, res) => {
//     const listing = await Listing.findById(req.params.id);

//     if (!listing) {
//       throw new ExpressError(404, "Listing not found");
//     }

//     const newReview = new Review(req.body.review);

//     listing.reviews.push(newReview);

//     await newReview.save();
//     await listing.save();

//     res.redirect(`/listing/${listing._id}`);
//   })
// );

// /* =====================
//    DELETE REVIEW
// ===================== */
// router.delete(
//   "/:reviewId",
//   wrapAsync(async (req, res) => {
//     const { id, reviewId } = req.params;

//     await Listing.findByIdAndUpdate(id, {
//       $pull: { reviews: reviewId },
//     });

//     await Review.findByIdAndDelete(reviewId);

//     res.redirect(`/listing/${id}`);
//   })
// );

// export default router;
import express from "express";
const router = express.Router({ mergeParams: true });

import wrapAsync from "../utils/wrapAsync.js";
import { validateReview } from "../middleware.js";

import { createReview, deleteReview } from "../controllers/review.js";

// CREATE REVIEW
router.post("/", validateReview, wrapAsync(createReview));

// DELETE REVIEW
router.delete("/:reviewId", wrapAsync(deleteReview));

export default router;

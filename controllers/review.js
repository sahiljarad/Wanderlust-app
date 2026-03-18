import Listing from "../models/listing.js";
import Review from "../models/reviews.js"; // keep same as your file name
import ExpressError from "../utils/ExpressError.js";

// CREATE REVIEW
export const createReview = async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    throw new ExpressError(404, "Listing not found");
  }

  const newReview = new Review(req.body.review);

  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();

  res.redirect(`/listing/${listing._id}`);
};

// DELETE REVIEW
export const deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;

  await Listing.findByIdAndUpdate(id, {
    $pull: { reviews: reviewId },
  });

  await Review.findByIdAndDelete(reviewId);

  res.redirect(`/listing/${id}`);
};

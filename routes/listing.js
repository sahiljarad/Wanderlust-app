import express from "express";
const router = express.Router();

import wrapAsync from "../utils/wrapAsync.js";
import ExpressError from "../utils/ExpressError.js";
import { listingSchema } from "../schema.js";
// import Listing from "../models/listing.js";
import { isLoggedIn } from "../middleware.js";
import {
  index,
  renderNewForm,
  createListing,
  showListing,
  renderEditForm,
  updateListing,
  deleteListing,
} from "../controllers/listing.js";


// import multer from "multer";
// import { storage } from "../cloudConfig.js";
// const upload = multer({ storage });


// VALIDATION MIDDLEWARE
const validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const msg = error.details.map(el => el.message).join(", ");
    throw new ExpressError(400, msg);
  }
  next();
};


// // Route
// router.get("/", index);

// // NEW
// router.get("/new",isLoggedIn,(req, res) => {
//   // if(!req.isAuthenticated()){
//   //   req.flash("error","you must be logged in to create listing");
//   //  return res.redirect("/login");
//   // }
//   res.render("listings/new.ejs");
// });

// // CREATE
// router.post(
//   "/",isLoggedIn,
//   validateListing,
//   wrapAsync(async (req, res) => {
//     const newListing = new Listing(req.body.listing);
//     await newListing.save();
//     res.redirect("/listing");
//   })
// );

// // SHOW
// router.get("/:id", async (req, res) => {
//   const listing = await Listing.findById(req.params.id).populate("reviews").populate("owner")
//   res.render("listings/show.ejs", { listing });
// });

// // EDIT
// router.get("/:id/edit", async (req, res) => {
//   const listing = await Listing.findById(req.params.id);
//   res.render("listings/edit.ejs", { listing });
// });

// // UPDATE
// router.put("/:id", async (req, res) => {
//   await Listing.findByIdAndUpdate(req.params.id, req.body.listing);
//   res.redirect(`/listing/${req.params.id}`);
// });

// // DELETE
// router.delete("/:id",isLoggedIn, async (req, res) => {
//   await Listing.findByIdAndDelete(req.params.id);
//   res.redirect("/listing");
// });


router.route("/")
.get(wrapAsync(index))
 .post(isLoggedIn, validateListing, wrapAsync(createListing));
// .post(upload.single("image"),
   (req, res) => {
    // console.log(req.file); // uploaded file
     console.log(req.body); // other data

    // res.send(req.file);
};


// INDEX
// router.get("/", wrapAsync(index));

// NEW
router.get("/new", isLoggedIn, renderNewForm);

// CREATE
// router.post("/", isLoggedIn, validateListing, wrapAsync(createListing));

// SHOW
router.get("/:id", wrapAsync(showListing));

// EDIT
router.get("/:id/edit", isLoggedIn, wrapAsync(renderEditForm));

// UPDATE
router.put("/:id", isLoggedIn, validateListing, wrapAsync(updateListing));

// DELETE
router.delete("/:id", isLoggedIn, wrapAsync(deleteListing));

export default router;

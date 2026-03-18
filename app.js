// import express from "express";
// const app = express();
// import mongoose from "mongoose";

// //require 
// // const Listing = require("./models/listing.js")
// import Listing from "./models/listing.js";


// //ejs setup index route
// const path = require("path");

// // use ejs-locals for all ejs templates:
// import ejsMate from "ejs-mate";

// app.engine("ejs", ejsMate);

// //database connect 

// main().then(()=>{
//     console.log("connected to db");
// })
// .catch((err)=>{
//     console.log(err);
// })

// async function main() {
//     await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust')
    
// }
// app.get("/",(req,res)=>{
//     res.send("Hi, I am root");
// })
// app.set("view engine",'ejs');
// app.set("views",path.join(__dirname, "views"))

// //show route parse all data
// app.use(express.urlencoded({extended:true}));
// // put  4
// const methodOverride= require("method-override")
// app.use(methodOverride("_method"));


// //ejs mate:it is help to create differnrt template and layout 

// //check test 2
// // app.get("/testListing", async (req, res) => {
// //     try {
// //         let sampleListing = new Listing({
// //             title: "my New villa",
// //             description: "by the beach",
// //             price: 1200,
// //             location: "goa",
// //             country: "India",
// //         });

// //         await sampleListing.save();
// //         console.log("sample was saved");
// //         res.send("successful testing");
// //     } catch (err) {
// //         console.log(err);
// //         res.status(500).send("Error saving listing");
// //     }
// // });


// // INDEX route – show all listings
// app.get("/listing", async (req, res) => {
//   const alllistings = await Listing.find({});
//   res.render("listings/index", { alllistings });
// });


// // NEW route – form to create listing
// app.get("/listing/new", (req, res) => {
//   res.render("listings/new");
// });


// // CREATE route – save new listing
// app.post("/listing", async (req, res) => {
//   const newListing = new Listing(req.body.listing);
//   await newListing.save();
//   res.redirect("/listing");
// });


// // SHOW route – show one listing
// app.get("/listing/:id", async (req, res) => {
//   let { id } = req.params;
//   const listing = await Listing.findById(id);
//   res.render("listings/show", { listing });
// });


// // EDIT route – form to edit listing
// app.get("/listing/:id/edit", async (req, res) => {
//   let { id } = req.params;
//   const listing = await Listing.findById(id);
//   res.render("listings/edit", { listing });
// });


// // UPDATE route – update listing
// app.put("/listing/:id", async (req, res) => {
//   let { id } = req.params;
//   await Listing.findByIdAndUpdate(id, req.body.listing);
//   res.redirect(`/listing/${id}`);
// });

// //delete route

// app.delete("/listing/:id", async (req, res) => {
//   let { id } = req.params;
//   let deletedListing = await Listing.findByIdAndDelete(id);
//   console.log(deletedListing);
//   res.redirect("/listing");
// });


// app.listen(3000,()=>{
//     console.log("server is listening to port 3000")
// })


// import express from "express";
// import mongoose from "mongoose";
// import path from "path";
// import methodOverride from "method-override";
// import ejsMate from "ejs-mate";
// import Listing from "./models/listing.js";
// import Review from "./models/reviews.js";
// import { fileURLToPath } from "url";

// const app = express();

// import wrapAsync from "./utils/wrapAsync.js";
// import ExpressError from "./utils/ExpressError.js";
// import { listingSchema } from "./schema.js";
// import { reviewSchema } from "./schema.js";
// app.use(express.json());  

// import listingRoutes from "./routes/listing.js";
// import reviewRoutes from "./routes/review.js";

// app.use("/listing", listingRoutes);
// app.use("/listing/:id/reviews", reviewRoutes);


// // fix __dirname for ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // EJS setup
// app.engine("ejs", ejsMate);
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

// // middleware
// app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride("_method"));
// //public
// app.use(express.static(path.join(__dirname,"/public")))
// // database connection
// async function main() {
//   await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
//   console.log("connected to db");
// }
// main().catch(err => console.log(err));

// // root route
// app.get("/", (req, res) => {
//   res.send("Hi, I am root");
// });

// // INDEX
// app.get("/listing", async (req, res) => {
//   const alllistings = await Listing.find({});
//   res.render("listings/index", { alllistings });
// });

// // NEW
// app.get("/listing/new", (req, res) => {
//   res.render("listings/new");
// });

//validation for middleware schema 
// const validateListing = (req,res,next)=>{
//   let {error}= listingSchema.validate(req.body);
//   if(error){
//     throw new ExpressError(400,error)
//   }else{
//     next()
//   }

//}

// const validateListing = (req, res, next) => {
//   // Validate req.body (or req.body.listing if you keep nested)
//   const { error } = listingSchema.validate(req.body, { abortEarly: false });

//   if (error) {
//     // Build a readable string of all errors
//     const msg = error.details.map(el => el.message).join(", ");
//     throw new ExpressError(400, msg);
//   } else {
//     next();
//   }
// };

// //reviewschema
// const validateReview = (req, res, next) => {
//   // Validate req.body (or req.body.listing if you keep nested)
//   const { error } = reviewSchema.validate(req.body, { abortEarly: false });

//   if (error) {
//     // Build a readable string of all errors
//     const msg = error.details.map(el => el.message).join(", ");
//     throw new ExpressError(400, msg);
//   } else {
//     next();
//   }
// };

// CREATE
// app.post(
//   "/listing",validateListing,
//   wrapAsync(async (req, res,next) => {
  // let result = listingSchema.validate(req.body);
  // console.log(result);
//   const newListing = new Listing(req.body.listing);
//   await newListing.save();
//   res.redirect("/listing");

  
// }));

// SHOW
// app.get("/listing/:id", async (req, res) => {
//   const listing = await Listing.findById(req.params.id).populate("reviews");
//   res.render("listings/show", { listing });
// });

// EDIT
// app.get("/listing/:id/edit", async (req, res) => {
//   const listing = await Listing.findById(req.params.id);
//   res.render("listings/edit", { listing });
// });

// UPDATE
// app.put("/listing/:id", async (req, res) => {
//   await Listing.findByIdAndUpdate(req.params.id, req.body.listing);
//   res.redirect(`/listing/${req.params.id}`);
// });

// DELETE
// app.delete("/listing/:id", async (req, res) => {
//   await Listing.findByIdAndDelete(req.params.id);
//   res.redirect("/listing");
// });
//review

// review route post(FIXED)
// app.post("/listing/:id/reviews",validateReview, wrapAsync(async (req, res) => {
  // console.log("🔥 REVIEW ROUTE HIT");

//   const listing = await Listing.findById(req.params.id);
//   if (!listing) {
//     return res.status(404).send("Listing not found");
//   }

//   const newReview = new Review(req.body.review);

//   listing.reviews.push(newReview);

//   await newReview.save();
//   await listing.save();

//   res.redirect(`/listing/${listing._id}`);
// }));

//delete review route
// app.delete(
//   "/listing/:id/reviews/:reviewId",
//   wrapAsync(async (req, res) => {
//     const { id, reviewId } = req.params;

//     await Listing.findByIdAndUpdate(id, {
//       $pull: { reviews: reviewId },
//     });

//     await Review.findByIdAndDelete(reviewId);

//     res.redirect(`/listing/${id}`);
//   })
// );


// Error handling 
// app.use((err,req,res,next)=>{
//   res.send("something went wrong");
// })

// routes ABOVE

// app.use((req, res, next) => {
//   next(new ExpressError(404, "Page Not Found"));
// });

// app.use((err, req, res, next) => {
//   const { status = 500, message = "Something went wrong" } = err;
//   res.status(status).render("error.ejs", {message});
//   // res.status(status).send(message) alert error.ejs use ;
// });



// server
// app.listen(3000, () => {
//   console.log("server is listening on port 3000");
// });

// import dotenv from "dotenv";

// if (process.env.NODE_ENV !== "production") {
//   dotenv.config();
// }

// console.log(process.env.SECRET)


import express from "express";
import mongoose from "mongoose";
import path from "path";
import methodOverride from "method-override";
import ejsMate from "ejs-mate";
import { fileURLToPath } from "url";

import ExpressError from "./utils/ExpressError.js";
import session from "express-session";
import passport from "passport";
import LocalStrategy from "passport-local";
import User from "./models/user.js";
import flash from "connect-flash";

// routes
import listingRoutes from "./routes/listing.js";
import reviewRoutes from "./routes/review.js";
import userRoutes from "./routes/user.js";

const app = express();

/* =====================
   FIX __dirname (ESM)
===================== */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* =====================
   DATABASE
===================== */
mongoose
  .connect("mongodb://127.0.0.1:27017/wanderlust")
  .then(() => console.log("✅ connected to DB"))
  .catch(err => console.log(err));

/* =====================
   VIEW ENGINE
===================== */
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/* =====================
   MIDDLEWARE
===================== */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

/* =====================
   SESSION
===================== */
app.use(
  session({
    secret: "mysupersecretstring",
    resave: false,
    saveUninitialized: false,
  })
);

/* =====================
   FLASH
===================== */
app.use(flash());

/* =====================
   PASSPORT
===================== */
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/* =====================
   LOCALS (FLASH + USER)
===================== */
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user; // ✅ THIS IS THE KEY
  next();
});


/* =====================
   ROUTES
===================== */
app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

app.use("/listing", listingRoutes);
app.use("/listing/:id/reviews", reviewRoutes);
app.use("/", userRoutes);

/* =====================
   404
===================== */
app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

/* =====================
   ERROR HANDLER
===================== */
app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong" } = err;
  res.status(status).render("error.ejs", { message });
});

/* =====================
   SERVER
===================== */
app.listen(3000, () => {
  console.log("🚀 Server running on port 3000");
});


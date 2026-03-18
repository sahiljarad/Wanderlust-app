import Listing from "../models/listing.js";

// INDEX
export const index = async (req, res) => {
  const alllistings = await Listing.find({});
  res.render("listings/index.ejs", { alllistings });
};

// NEW
export const renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

// CREATE
export const createListing = async (req, res) => {
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listing");
};

// SHOW
export const showListing = async (req, res) => {
  const listing = await Listing.findById(req.params.id)
    .populate("reviews")
    .populate("owner");

  res.render("listings/show.ejs", { listing });
};

// EDIT
export const renderEditForm = async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  res.render("listings/edit.ejs", { listing });
};

// UPDATE
export const updateListing = async (req, res) => {
  await Listing.findByIdAndUpdate(req.params.id, req.body.listing);
  res.redirect(`/listing/${req.params.id}`);
};

// DELETE
export const deleteListing = async (req, res) => {
  await Listing.findByIdAndDelete(req.params.id);
  res.redirect("/listing");
};

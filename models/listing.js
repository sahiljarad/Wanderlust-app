// const mongoose = require("mongoose");
import mongoose, { Schema, Types } from "mongoose";

import Review from "./reviews.js"; // needed for mongoose populate
import { type } from "os";


const listingSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true,
    },
    description: String,
     image: {
        filename: String,
        url: String,
    },
    price: Number,
    location: String,
    country: String,
   reviews:[
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner:{
    type: Schema.Types.ObjectId,
    ref:"User",
  },


});

// model creation
const Listing = mongoose.model("Listing", listingSchema);

// module.exports = Listing;
export default Listing;

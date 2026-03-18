import mongoose from "mongoose";
import initData from "./data.js";      // ES module import
import Listing from "../models/listing.js";

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("✅ connected to db");

  await initDB();          // run seed AFTER connection
  await mongoose.connection.close(); // close connection
  console.log("🔒 connection closed");
}

const initDB = async () => {
  await Listing.deleteMany({});

  const listings = initData.data.map(obj => ({
    ...obj,
    owner: "698031986922c6ba7da9748b", // must exist in users collection
  }));

  await Listing.insertMany(listings);
  console.log("✅ data was initialized");
};

main().catch(err => console.log(err));

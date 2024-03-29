import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
  {
    brand: { type: String, required: true, unique: true },
    description: { type: String, required: true},
  },
  {
    timestamps: true,
  }
);

const Brand = mongoose.model("Brand", brandSchema);
export default Brand;
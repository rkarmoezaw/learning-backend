import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    size: {
      type: String,
      enum: ["S", "M", "L", "XL", "XXL"],
      default: "M",
    },
    colors: {
      type: [String],
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    shipping: [
      {
        name: { type: String, required: true },
        cost: { type: Number, default: 0 },
        desc: { type: String, required: true },
      },
    ],
    images: [
      {
        link: { type: String, required: true },
        desc: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

productSchema.index({ tags: 1, user: 1 });

const Product = mongoose.model("Product", productSchema);
export default Product;

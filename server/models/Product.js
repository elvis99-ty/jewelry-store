import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
    },

    subCategory: {
      type: String,
      default: "",
    },

    type: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      required: true,
    },

    images: {
      type: [String],
      default: [],
    },

    price: {
      type: Number,
      required: true,
      default: 0,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    stock: {
      type: Number,
      default: 100,
    },

    available: {
      type: Boolean,
      default: true,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);
import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: "store-settings",
    },

    deliveryFee: {
      type: Number,
      default: 5000,
    },

    whatsappNumber: {
      type: String,
      default: "234XXXXXXXXXX",
    },

    pickupAddressLine: {
      type: String,
      default: "70 International Airport Road",
    },

    pickupCityState: {
      type: String,
      default: "Lagos State, Nigeria",
    },

    storeName: {
      type: String,
      default: "Royal Rings",
    },

    supportEmail: {
      type: String,
      default: "concierge@royalrings.com",
    },

    currency: {
      type: String,
      default: "NGN (₦)",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Settings", settingsSchema);
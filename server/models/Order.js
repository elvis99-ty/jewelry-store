import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customer: {
      firstName: {
        type: String,
        required: true,
        trim: true,
      },

      lastName: {
        type: String,
        required: true,
        trim: true,
      },

      email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
      },

      phone: {
        type: String,
        required: true,
        trim: true,
      },

      address: {
        type: String,
        required: true,
        trim: true,
      },

      city: {
        type: String,
        required: true,
        trim: true,
      },

      state: {
        type: String,
        required: true,
        trim: true,
      },
    },

    deliveryMethod: {
      type: String,
      enum: ["delivery", "pickup"],
      default: "delivery",
    },

    orderNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    items: [
      {
        productId: {
          type: String,
          required: true,
        },

        name: {
          type: String,
          required: true,
          trim: true,
        },

        category: {
          type: String,
          trim: true,
        },

        type: {
          type: String,
          trim: true,
        },

        image: {
          type: String,
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
          min: 1,
        },

        price: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    paymentReference: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    orderStatus: {
      type: String,
      enum: [
        "Pending",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

// Speeds up customer order lookups
orderSchema.index({
  "customer.email": 1,
});

export default mongoose.model("Order", orderSchema);
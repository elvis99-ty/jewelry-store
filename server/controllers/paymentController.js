import axios from "axios";
import dotenv from "dotenv";
import Order from "../models/Order.js";

dotenv.config();

export const initializePayment = async (req, res) => {
  try {
    const { orderId, email, amount } = req.body;

    const response = await axios.post(
      `${process.env.PAYSTACK_BASE_URL}/transaction/initialize`,
      {
        email,
        amount: amount * 100,
        callback_url: `${process.env.CLIENT_URL}/payment-success`,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    await Order.findByIdAndUpdate(
      orderId,
      {
        paymentReference: response.data.data.reference,
      },
      {
        new: true,
      }
    );

    return res.json(response.data);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { reference } = req.params;

    const response = await axios.get(
      `${process.env.PAYSTACK_BASE_URL}/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    if (response.data.data.status === "success") {
      await Order.findOneAndUpdate(
        {
          paymentReference: reference,
        },
        {
          paymentStatus: "paid",
          orderStatus: "Processing",
        },
        {
          new: true,
        }
      );
    }

    return res.json(response.data);
  } catch (error) {

    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};
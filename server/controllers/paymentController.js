import axios from "axios";
import crypto from "crypto";
import dotenv from "dotenv";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

dotenv.config();

export const initializePayment = async (req, res) => {
  try {
    const { orderId, email } = req.body;

    if (!orderId || !email) {
      return res.status(400).json({
        success: false,
        message: "Order ID and email are required.",
      });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    const response = await axios.post(
      `${process.env.PAYSTACK_BASE_URL}/transaction/initialize`,
      {
        email,
        amount: order.totalAmount * 100,
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
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};

// Shared logic: confirm a payment reference as paid, decrement stock,
// idempotently. Used by both the browser-redirect verify flow and the
// server-to-server webhook, so there is exactly one place this happens.
const confirmPaidOrder = async (reference) => {
  const order = await Order.findOne({ paymentReference: reference });

  if (!order) {
    console.error(`No order found for payment reference: ${reference}`);
    return null;
  }

  if (order.paymentStatus === "paid") {
    // Already processed — nothing more to do
    return order;
  }

  for (const item of order.items) {
    const updatedProduct = await Product.findOneAndUpdate(
      {
        _id: item.productId,
        stock: { $gte: item.quantity },
      },
      {
        $inc: { stock: -item.quantity },
      },
      { new: true }
    );

    if (!updatedProduct) {
      console.error(
        `Stock decrement failed for product ${item.productId} — insufficient stock at payment time.`
      );
    }
  }

  order.paymentStatus = "paid";
  order.orderStatus = "Processing";
  await order.save();

  return order;
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
      await confirmPaidOrder(reference);
    }

    return res.json(response.data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};

export const handleWebhook = async (req, res) => {
  try {
    const signature = req.headers["x-paystack-signature"];

    if (!signature || !req.rawBody) {
      return res.status(400).send("Missing signature.");
    }

    const expectedHash = crypto
      .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY)
      .update(req.rawBody)
      .digest("hex");

    if (expectedHash !== signature) {
      console.error("Webhook signature mismatch — request rejected.");
      return res.status(401).send("Invalid signature.");
    }

    const event = req.body;

    if (event.event === "charge.success") {
      await confirmPaidOrder(event.data.reference);
    }

    return res.status(200).send("OK");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Webhook processing error.");
  }
};
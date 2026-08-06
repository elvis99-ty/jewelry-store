import Order from "../models/Order.js";
import Counter from "../models/Counter.js";

export const createOrder = async (req, res) => {
  try {
    let counter = await Counter.findById("orders");

    if (!counter) {
      counter = await Counter.create({
        _id: "orders",
        sequence: 100000,
      });
    }

    counter.sequence += 1;
    await counter.save();

    const orderNumber = `RR${counter.sequence}`;

    const order = await Order.create({
      ...req.body,
      orderNumber,
    });

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const email = req.user.email;

    const orders = await Order.find({
      "customer.email": email,
    })
      .select(
        "_id orderNumber totalAmount paymentStatus orderStatus createdAt"
      )
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};

export const getOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;
    const email = req.user.email;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    if (order.customer.email !== email) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to view this order.",
      });
    }

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};
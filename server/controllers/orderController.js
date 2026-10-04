import Order from "../models/Order.js";
import Counter from "../models/Counter.js";
import Product from "../models/Product.js";

export const createOrder = async (req, res) => {
  try {
    const { items, customer, deliveryMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No items in order.",
      });
    }

    const verifiedItems = [];
    let totalAmount = 0;

    for (const clientItem of items) {
      const product = await Product.findById(clientItem.productId);

      if (!product) {
        return res.status(400).json({
          success: false,
          message: `Product not found: ${clientItem.productId}`,
        });
      }

      if (!product.available || product.stock < clientItem.quantity) {
        return res.status(400).json({
          success: false,
          message: `${product.name} is out of stock.`,
        });
      }

      verifiedItems.push({
        productId: product._id.toString(),
        name: product.name,
        category: product.category,
        type: product.type,
        image: product.image,
        quantity: clientItem.quantity,
        price: product.price,
      });

      totalAmount += product.price * clientItem.quantity;
    }

    const counter = await Counter.findByIdAndUpdate(
      "orders",
      { $inc : {sequence : 1} },
      { new : true, upsert : true, setDefaultsOnInsert : true}
    );

    const orderNumber = `RRS${counter.sequence}`;

    const order = await Order.create({
      customer,
      deliveryMethod,
      orderNumber,
      items: verifiedItems,
      totalAmount,
    });

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error(error);
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
    const orders = await Order.find().sort({ createdAt: -1 });

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

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderStatus } = req.body;

    const validStatuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

    if (!validStatuses.includes(orderStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status.",
      });
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order status updated.",
      order,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};
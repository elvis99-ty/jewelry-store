import Settings from "../models/Settings.js";

export const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findById("store-settings");

    if (!settings) {
      settings = await Settings.create({ _id: "store-settings" });
    }

    return res.status(200).json({
      success: true,
      settings,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};

export const updateSettings = async (req, res) => {
  try {
    const {
      deliveryFee,
      whatsappNumber,
      pickupAddressLine,
      pickupCityState,
      storeName,
      supportEmail,
      currency,
    } = req.body;

    const settings = await Settings.findByIdAndUpdate(
      "store-settings",
      {
        deliveryFee,
        whatsappNumber,
        pickupAddressLine,
        pickupCityState,
        storeName,
        supportEmail,
        currency,
      },
      { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      message: "Settings updated successfully",
      settings,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};
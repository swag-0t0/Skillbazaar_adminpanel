import Admin from "../models/adminInfo.model.js";
import bcrypt from "bcrypt";

export const createModerator = async (req, res) => {
  try {
    const { fullname, email, password, phone, address, image } = req.body;
    
    // Validate required fields
    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "Required fields are missing!" });
    }
    
    // Check if moderator already exists
    const existingModerator = await Admin.findOne({ email });
    if (existingModerator) {
      return res.status(400).json({ message: "Email already in use!" });
    }

    // Hash password and create moderator
    const hashedPassword = await bcrypt.hash(password, 10);
    const moderator = new Admin({
      fullname,
      email,
      password: hashedPassword,
      role: "moderator",
      phone: phone || "",
      address: address || "",
      image: image || "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg"
    });

    await moderator.save();
    
    // Return created moderator without password
    const createdModerator = moderator.toObject();
    delete createdModerator.password;

    res.status(201).json({ 
      message: "Moderator created successfully!",
      moderator: createdModerator
    });
  } catch (err) {
    console.error('Create moderator error:', err);
    res.status(500).json({ 
      message: "Something went wrong!",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

export const getModerators = async (req, res) => {
  try {
    const moderators = await Admin.find({ role: "moderator" })
      .select("-password")
      .lean();

    // Add default image if not present
    const moderatorsWithDefaults = moderators.map(moderator => ({
      ...moderator,
      image: moderator.image || "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg"
    }));

    res.status(200).json(moderatorsWithDefaults);
  } catch (err) {
    console.error('Get moderators error:', err);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export const getModerator = async (req, res) => {
  try {
    const { id } = req.params;
    const moderator = await Admin.findOne({ _id: id, role: "moderator" })
      .select("-password")
      .lean();

    if (!moderator) {
      return res.status(404).json({ message: "Moderator not found!" });
    }

    // Add default image if not present
    const moderatorWithDefaults = {
      ...moderator,
      image: moderator.image || "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg"
    };

    res.status(200).json(moderatorWithDefaults);
  } catch (err) {
    console.error('Get moderator error:', err);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export const deleteModerator = async (req, res) => {
  try {
    const { id } = req.params;
    await Admin.findByIdAndDelete(id);
    res.status(200).json({ message: "Moderator deleted successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export const updateModerator = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      fullname, 
      email, 
      phone, 
      address, 
      currentPassword, 
      newPassword,
      image 
    } = req.body;

    const moderator = await Admin.findOne({ _id: id, role: "moderator" });
    if (!moderator) {
      return res.status(404).json({ message: "Moderator not found!" });
    }

    // Prepare update object
    const updateData = {
      fullname: fullname || moderator.fullname,
      email: email || moderator.email,
      phone: phone || moderator.phone,
      address: address || moderator.address,
      image: image || moderator.image
    };

    // If email is being changed, check if it's already in use
    if (email && email !== moderator.email) {
      const emailExists = await Admin.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ message: "Email already in use!" });
      }
    }

    // Handle password update if provided
    if (currentPassword && newPassword) {
      const isCorrect = await bcrypt.compare(currentPassword, moderator.password);
      if (!isCorrect) {
        return res.status(400).json({ message: "Current password is incorrect!" });
      }
      updateData.password = await bcrypt.hash(newPassword, 10);
    }

    const updatedModerator = await Admin.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).select("-password");

    res.status(200).json({
      message: "Moderator updated successfully!",
      moderator: updatedModerator
    });

  } catch (err) {
    console.error('Update moderator error:', err);
    res.status(500).json({ message: "Something went wrong!" });
  }
};
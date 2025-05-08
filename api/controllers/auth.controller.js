import Admin from "../models/adminInfo.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ 
        message: "Email and password are required!" 
      });
    }

    // Find admin
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ 
        message: "Admin not found!" 
      });
    }

    // Compare password
    const isCorrect = await bcrypt.compare(password, admin.password);
    if (!isCorrect) {
      return res.status(400).json({ 
        message: "Invalid credentials!" 
      });
    }

    // Generate token
    const token = jwt.sign(
      { 
        id: admin._id, 
        role: admin.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    // Send response
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 2 * 60 * 60 * 1000 // 2 hour
      })
      .status(200)
      .json({ 
        message: "Login successful!",
        user: {
          id: admin._id,
          email: admin.email,
          role: admin.role,
          fullname: admin.fullname
        }
      });

  } catch (err) {
    console.error('Login error:', err); // Debug log
    res.status(500).json({ 
      message: "Something went wrong!",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};


//Creatae Admin using this from postman
// POST http://localhost:8000/api/admins
//route is in auth.route.js
//if your need is fulfilled then detelte this route from auth.route.js
//and delete this function from this file
export const createAdmin = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    
    // Validate required fields
    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists!" });
    }

    // Hash password and create admin
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({
      fullname,
      email,
      password: hashedPassword,
      role: "admin"
    });

    await admin.save();
    res.status(201).json({ message: "Admin created successfully!" });
  } catch (err) {
    console.error('Create admin error:', err);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

export const verifyToken = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    
    if (!token) {
      return res.status(401).json({ isValid: false });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id)
      .select("-password") // Exclude password but include all other fields
      .lean(); // Convert to plain JavaScript object
    
    if (!admin) {
      return res.status(401).json({ isValid: false });
    }

    res.status(200).json({ 
      isValid: true, 
      user: {
        id: admin._id,
        email: admin.email,
        role: admin.role,
        fullname: admin.fullname,
        image: admin.image,
        phone: admin.phone,
        address: admin.address
      }
    });
  } catch (err) {
    console.error('Verify token error:', err);
    res.status(401).json({ isValid: false });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("accessToken", {
      sameSite: "strict",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production"
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error logging out" });
  }
};

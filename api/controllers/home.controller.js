import User from "../models/user.model.js";
import Order from "../models/order.model.js";

export const getStats = async (req, res) => {
  try {
    //total users
    const totalUsers = await User.countDocuments() || 0;

    //total freelancers
    const totalFreelancers = await User.countDocuments({ isSeller: true }) || 0;

    //  total sales 
    const salesData = await Order.aggregate([
      {
        $match: { isCompleted: true }
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$price" }
        }
      }
    ]);

    // last month's sale
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    lastMonth.setDate(1); // Start of last month
    lastMonth.setHours(0, 0, 0, 0);

    const lastMonthSales = await Order.aggregate([
      {
        $match: {
          isCompleted: true,
          createdAt: { 
            $gte: lastMonth,
            $lt: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
          }
        }
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$price" }
        }
      }
    ]);

    //sales rate with 
    const currentSales = salesData[0]?.totalSales || 0;
    const previousSales = lastMonthSales[0]?.totalSales || 0;
    const salesRate = previousSales ? 
      ((currentSales - previousSales) / previousSales) * 100 : 
      currentSales > 0 ? 100 : 0;

    res.status(200).json({
      totalUsers,
      totalFreelancers,
      totalSales: currentSales,
      salesRate: parseFloat(salesRate.toFixed(2))
    });
  } catch (err) {
    console.error("Stats error:", err);
    res.status(500).json({ message: "Error fetching statistics" });
  }
};


export const getRecentOrders = async (req, res) => {
  try {
    //orders sorted by creation date
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .lean();

    //buyer details
    const ordersWithBuyers = await Promise.all(
      orders.map(async (order) => {
        try {
          const buyer = await User.findById(order.buyerId).lean();
          return {
            ...order,
            buyer: {
              fullname: buyer?.username || "Unknown",
              image: buyer?.img || "https://example.com/default.jpg",
            },
          };
        } catch (err) {
          console.error(`Error fetching buyer for order:`, err);
          return {
            ...order,
            buyer: {
              fullname: "Unknown",
              image: "https://example.com/default.jpg",
            },
          };
        }
      })
    );

    res.status(200).json(ordersWithBuyers);
  } catch (err) {
    console.error("Recent orders error:", err);
    res.status(500).json({ message: "Error fetching recent orders" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("username img isSeller createdAt")
      .sort({ createdAt: -1 }) // descending order
      .lean();

    res.status(200).json(users);
  } catch (err) {
    console.error("Get all users error:", err);
    res.status(500).json({ message: "Error fetching users" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ message: "Error deleting user" });
  }
};

export const getTransactionData = async (req, res) => {
  try {
    const transactions = await Order.aggregate([
      {
        $match: { isCompleted: true }, 
      },
      {
        $group: {
          _id: { $dateToString: { format: "%m-%Y", date: "$createdAt" } }, // Group by month and year
          totalAmount: { $sum: "$price" }, // Sum the price field
        },
      },
      { $sort: { _id: -1 } }, // Sort by month and year
    ]);

    const formattedData = transactions.map((transaction) => ({
      name: transaction._id, // Month and year ("03-2025")
      amount: transaction.totalAmount, // Total transaction amount for the month
    }));

    res.status(200).json(formattedData);
  } catch (err) {
    console.error("Error fetching transaction data:", err);
    res.status(500).json({ message: "Error fetching transaction data" });
  }
};
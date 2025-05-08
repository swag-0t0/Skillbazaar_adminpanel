import Category from "../models/category.model.js";

// Add a new category
export const addCategory = async (req, res) => {
  try {
    const { name, title, image } = req.body;

    if (!name || !title || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newCategory = new Category({ name, title, image });
    await newCategory.save();

    res.status(201).json(newCategory);
  } catch (err) {
    console.error("Error adding category:", err);
    res.status(500).json({ message: "Error adding category" });
  }
};

// Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json(categories);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ message: "Error fetching categories" });
  }
};

// Delete a category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (err) {
    console.error("Error deleting category:", err);
    res.status(500).json({ message: "Error deleting category" });
  }
};
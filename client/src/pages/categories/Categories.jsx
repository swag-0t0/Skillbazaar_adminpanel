import React, { useState } from "react";
import "./Categories.scss";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteOutline, PhotoCamera } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import api from "../../utils/axiosConfig";
const Categories = () => {
  const queryClient = useQueryClient();
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");

  // Fetch categories
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await api.get("/manage/categories");
      return response.data;
    },
  });

  // Add category mutation
  const addCategoryMutation = useMutation({
    mutationFn: async (newCategory) => {
      await api.post("/manage/categories", newCategory);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]); // Refetch categories
      setImage(null);
      setName("");
      setTitle("");
      document.getElementById("imageInput").value = "";
    },
    onError: (err) => {
      console.error("Error adding category:", err);
    },
  });

  // Delete category mutation
  const deleteCategoryMutation = useMutation({
    mutationFn: async (id) => {
      await api.delete(`/manage/categories/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]); // Refetch categories
    },
    onError: (err) => {
      console.error("Error deleting category:", err);
    },
  });

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!image || !name || !title) return;

    // Convert image to Base64
    const convertToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    };

    try {
      const base64Image = await convertToBase64(image);

      const newCategory = {
        name,
        title,
        image: base64Image, // Base64 string in the image
      };

      addCategoryMutation.mutate(newCategory);
    } catch (err) {
      console.error("Error converting image to Base64:", err);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      deleteCategoryMutation.mutate(id);
    }
  };

  return (
    <div className="categoriesPage">
      <div className="categoriesContainer">
        <div className="addCategoryCard">
          <h2>Add Category</h2>
          <form onSubmit={handleAddCategory}>
            <div className="imageUpload">
              <label htmlFor="imageInput">
                <label htmlFor="">Add image here!</label> 
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                >
                  <PhotoCamera />
                  <input
                    type="file"
                    id="imageInput"
                    accept="image/*"
                    hidden
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </IconButton>
              </label>
            </div>
            <input
              type="text"
              placeholder="Name (e.g. Web Development)"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button type="submit" disabled={addCategoryMutation.isLoading}>
              {addCategoryMutation.isLoading ? "Adding..." : "Add"}
            </button>
          </form>
        </div>

        <div className="categoryList">
          <h2>Categories</h2>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {categories.map((cat) => (
                <li key={cat._id}>
                  <img src={cat.image} alt={cat.name} />
                  <div className="details">
                    <h4>{cat.name}</h4>
                    <p>{cat.title}</p>
                  </div>
                  <DeleteOutline
                    className="deleteIcon"
                    onClick={() => handleDelete(cat._id)}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;

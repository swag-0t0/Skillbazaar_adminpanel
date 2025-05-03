import React, { useState } from "react";
import "./Categories.scss";
import { categoriesData } from "../../data";
import { DeleteOutline } from "@mui/icons-material";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!image || !name || !title) return;

    const newCategory = {
      id: Date.now(),
      image: URL.createObjectURL(image),
      name,
      title,
    };

    setCategories([...categories, newCategory]);
    setImage(null);
    setName("");
    setTitle("");
    document.getElementById("imageInput").value = "";
  };

  return (
    <div className="categoriesPage">
      <div className="categoriesContainer">
        <div className="addCategoryCard">
          <h2>Add Category</h2>
          <form onSubmit={handleAddCategory}>
            <div className="imageUpload">
              <label htmlFor="imageInput">Upload Image</label>
              <input
                type="file"
                id="imageInput"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
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
            <button type="submit">Add</button>
          </form>
        </div>

        <div className="categoryList">
          <h2>Categories</h2>
          <ul>
            {categoriesData.map((cat) => (
              <li key={cat.id}>
                <img src={cat.image} alt={cat.name} />
                <div className="details">
                  <h4>{cat.name}</h4>
                  <p>{cat.title}</p>
                </div>
                <DeleteOutline className="deleteIcon" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Categories;

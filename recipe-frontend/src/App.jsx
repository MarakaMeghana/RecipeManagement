// src/App.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import config from "./config";
import "./App.css";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Fetch recipes on load
  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(config.API_BASE_URL);
      setRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      alert("Failed to fetch recipes!");
    }
  };

  // Add or Update Recipe
  const saveRecipe = async () => {
    if (!title || !ingredients || !instructions) {
      alert("Please fill all fields!");
      return;
    }

    const recipeData = { title, ingredients, instructions };

    try {
      if (editingId !== null) {
      await axios.put(`${config.API_BASE_URL}/${editingId}`, recipeData);

        setEditingId(null);
      } else {
        await axios.post(config.API_BASE_URL, recipeData);
      }

      setTitle("");
      setIngredients("");
      setInstructions("");
      fetchRecipes(); // refresh list
      alert("Recipe saved successfully!");
    } catch (error) {
      console.error("Error saving recipe:", error.response?.data || error.message);
      alert("Failed to save recipe!");
    }
  };

  // Edit Recipe
  const editRecipeHandler = (recipe) => {
    setTitle(recipe.title);
    setIngredients(recipe.ingredients);
    setInstructions(recipe.instructions);
    setEditingId(recipe.id);
  };

  // Delete Recipe
  const deleteRecipeHandler = async (id) => {
    try {
  await axios.delete(`${config.API_BASE_URL}/${id}`);

      fetchRecipes();
      alert("Recipe deleted successfully!");
    } catch (error) {
      console.error("Error deleting recipe:", error);
      alert("Failed to delete recipe!");
    }
  };

  // Clear All Recipes
  const clearAll = async () => {
    try {
      await Promise.all(
       recipes.map((r) => axios.delete(`${config.API_BASE_URL}/${r.id}`))

      );
      setRecipes([]);
      alert("All recipes cleared!");
    } catch (error) {
      console.error("Error clearing recipes:", error);
      alert("Failed to clear recipes!");
    }
  };

  return (
    <>
      <div className="navbar">
        <h2>🍲 Recipe Book</h2>
        <button className="clear-btn" onClick={clearAll}>
          Clear All
        </button>
      </div>

      <div className="container">
        <div className="form-card">
          <h2>{editingId ? "Edit Recipe" : "Add a New Recipe"}</h2>
          <input
            type="text"
            placeholder="Recipe Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
          <textarea
            placeholder="Instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
          <button className="btn" onClick={saveRecipe}>
            {editingId ? "Update Recipe" : "Add Recipe"}
          </button>
        </div>

        <div>
          <h2>All Recipes</h2>
          {recipes.length === 0 ? (
            <p className="no-recipes">No recipes added yet...</p>
          ) : (
            <div className="recipe-list">
              {recipes.map((r) => (
                <div className="recipe-card" key={r.id}>
                  <h3>{r.title}</h3>
                  <p>
                    <strong>Ingredients:</strong> {r.ingredients}
                  </p>
                  <p>
                    <strong>Instructions:</strong> {r.instructions}
                  </p>
                  <div className="actions">
                    <button
                      className="edit-btn"
                      onClick={() => editRecipeHandler(r)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => deleteRecipeHandler(r.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
// src/services/recipeService.js
import axios from "axios";
import config from "../config";

export const getRecipes = async () => {
  try {
    const response = await axios.get(`${config.API_BASE_URL}/recipes`);
    return response.data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};

export const addRecipe = async (recipe) => {
  try {
    const response = await axios.post(`${config.API_BASE_URL}/recipes`, recipe);
    return response.data;
  } catch (error) {
    console.error("Error adding recipe:", error);
    throw error;
  }
};

export const updateRecipe = async (id, recipe) => {
  try {
    const response = await axios.put(`${config.API_BASE_URL}/recipes/${id}`, recipe);
    return response.data;
  } catch (error) {
    console.error("Error updating recipe:", error);
    throw error;
  }
};

export const deleteRecipe = async (id) => {
  try {
    await axios.delete(`${config.API_BASE_URL}/recipes/${id}`);
  } catch (error) {
    console.error("Error deleting recipe:", error);
    throw error;
  }
};

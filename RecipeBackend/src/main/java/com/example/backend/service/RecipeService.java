package com.example.backend.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.backend.model.Recipe;
import com.example.backend.repository.RecipeRepository;

@Service
public class RecipeService {

    @Autowired
    private RecipeRepository repository;

    public List<Recipe> getAllRecipes() {
        return repository.findAll();
    }

    public Recipe getRecipeById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Recipe addRecipe(Recipe recipe) {
        return repository.save(recipe);
    }

    public Recipe updateRecipe(Long id, Recipe recipeDetails) {
        Recipe recipe = repository.findById(id).orElse(null);
        if (recipe != null) {
            recipe.setTitle(recipeDetails.getTitle());
            recipe.setIngredients(recipeDetails.getIngredients());
            recipe.setInstructions(recipeDetails.getInstructions());
            return repository.save(recipe);
        }
        return null;
    }

    public boolean deleteRecipe(Long id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }
}

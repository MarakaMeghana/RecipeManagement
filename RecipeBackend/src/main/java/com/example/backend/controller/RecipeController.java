package com.example.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.backend.model.Recipe;
import com.example.backend.service.RecipeService;

@RestController
@RequestMapping("/api/recipes")
@CrossOrigin(origins = "*") // allow frontend to call backend
public class RecipeController {

    @Autowired
    private RecipeService service;

    // GET all recipes
    @GetMapping
    public List<Recipe> getAllRecipes() {
        return service.getAllRecipes();
    }

    // GET recipe by ID
    @GetMapping("/{id}")
    public Recipe getRecipe(@PathVariable Long id) {
        return service.getRecipeById(id);
    }

    // POST a new recipe
    @PostMapping
    public Recipe addRecipe(@RequestBody Recipe recipe) {
        return service.addRecipe(recipe);
    }

    // PUT update recipe
    @PutMapping("/{id}")
    public Recipe updateRecipe(@PathVariable Long id, @RequestBody Recipe recipe) {
        return service.updateRecipe(id, recipe);
    }

    // DELETE recipe
    @DeleteMapping("/{id}")
    public String deleteRecipe(@PathVariable Long id) {
        boolean deleted = service.deleteRecipe(id);
        return deleted ? "Recipe deleted" : "Recipe not found";
    }
}

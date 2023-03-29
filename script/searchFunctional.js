export const searchFunctional = (search, recipes, tagsArray) => {
  
  const ingredientsTags = tagsArray.map((tag) => {
    if (tag.type === "ingredient") {
      return tag.tag;
    } else {
      return;
    }
  }).filter((tag) => tag !== undefined);

  const applianceTags = tagsArray.map((tag) => {
    if (tag.type === "appliance") {
      return tag.tag;
    } else {
      return;
    }
  }).filter((tag) => tag !== undefined);

  const ustensilsTags = tagsArray.map((tag) => {
    if (tag.type === "ustensil") {
      return tag.tag;
    } else {
      return;
    }
  }).filter((tag) => tag !== undefined);

  const filteredRecipes = recipes.filter((recipe) => {
    return recipe.name.toLowerCase().includes(search.toLowerCase());
  });
  const filteredRecipesByIngredients = recipes.filter((recipe) => {
    return recipe.ingredients
      .map((ingredient) => ingredient.ingredient.toLowerCase())
      .join(" ")
      .includes(search.toLowerCase());
  });
  const filteredRecipesByDescription = recipes.filter((recipe) => {
    return recipe.description.toLowerCase().includes(search.toLowerCase());
  });

  const searchedRecipes = [
    ...filteredRecipes,
    ...filteredRecipesByIngredients,
    ...filteredRecipesByDescription,
  ].reduce((acc, cur) => {
    if (!acc.includes(cur)) {
      acc.push(cur);
    }
    return acc;
  }, []);

  if (!tagsArray.length) {
    return searchedRecipes;
  }

  let filteredRecipesByTags = searchedRecipes;
  // return recipes that contain all ingredients in tags
  if(ingredientsTags.length && applianceTags.length && ustensilsTags.length){
    filteredRecipesByTags = searchedRecipes.filter((recipe) => {
      return ingredientsTags.every((ingredient) => {
        return recipe.ingredients.some((recipeIngredient) => {
          return (
            recipeIngredient.ingredient.toLowerCase() === ingredient.toLowerCase()
          );
        });
      });
    }).filter((recipe) => {
      return applianceTags.every((appliance) => {
        return recipe.appliance.toLowerCase() === appliance.toLowerCase();
      });
    }).filter((recipe) => {
      return ustensilsTags.every((ustensil) => {
        return recipe.ustensils.some((recipeUstensil) => {
          return recipeUstensil.toLowerCase() === ustensil.toLowerCase();
        });
      });
    }
    )
    return filteredRecipesByTags;
  } else if (ingredientsTags.length && applianceTags.length) {
    filteredRecipesByTags = searchedRecipes.filter((recipe) => {
      return ingredientsTags.every((ingredient) => {
        return recipe.ingredients.some((recipeIngredient) => {
          return (
            recipeIngredient.ingredient.toLowerCase() === ingredient.toLowerCase()
          );
        });
      });
    }).filter((recipe) => {
      return applianceTags.every((appliance) => {
        return recipe.appliance.toLowerCase() === appliance.toLowerCase();
      });
    });
    return filteredRecipesByTags;
  } else if (ingredientsTags.length && ustensilsTags.length) {
    filteredRecipesByTags = searchedRecipes.filter((recipe) => {
      return ingredientsTags.every((ingredient) => {
        return recipe.ingredients.some((recipeIngredient) => {
          return (
            recipeIngredient.ingredient.toLowerCase() === ingredient.toLowerCase()
          );
        });
      });
    }).filter((recipe) => {
      return ustensilsTags.every((ustensil) => {
        return recipe.ustensils.some((recipeUstensil) => {
          return recipeUstensil.toLowerCase() === ustensil.toLowerCase();
        });
      });
    });
    return filteredRecipesByTags;
  } else if (applianceTags.length && ustensilsTags.length) {
    filteredRecipesByTags = searchedRecipes.filter((recipe) => {
      return applianceTags.every((appliance) => {
        return recipe.appliance.toLowerCase() === appliance.toLowerCase();
      });
    }).filter((recipe) => {
      return ustensilsTags.every((ustensil) => {
        return recipe.ustensils.some((recipeUstensil) => {
          return recipeUstensil.toLowerCase() === ustensil.toLowerCase();
        });
      });
    });
    return filteredRecipesByTags;
  }
  if (ingredientsTags.length > 0) {
    filteredRecipesByTags = searchedRecipes.filter((recipe) => {
      return ingredientsTags.every((ingredient) => {
        return recipe.ingredients.some((recipeIngredient) => {
          return (
            recipeIngredient.ingredient.toLowerCase() === ingredient.toLowerCase()
          );
        });
      });
    });
    return filteredRecipesByTags;
  }
  if (applianceTags.length > 0) {
    filteredRecipesByTags = searchedRecipes.filter((recipe) => {
      return applianceTags.every((appliance) => {
        return recipe.appliance.toLowerCase() === appliance.toLowerCase();
      });
    });
    return filteredRecipesByTags;
  }
  if (ustensilsTags.length > 0) {
    filteredRecipesByTags = searchedRecipes.filter((recipe) => {
      return ustensilsTags.every((ustensil) => {
        return recipe.ustensils.some((recipeUstensil) => {
          return recipeUstensil.toLowerCase() === ustensil.toLowerCase();
        });
      });
    });
    return filteredRecipesByTags;
  }
  
  return filteredRecipesByTags;
};

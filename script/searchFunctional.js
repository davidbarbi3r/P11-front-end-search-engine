export const searchFunctional = (search, recipes, tagsArray) => {
  const ingredientsTags = tagsArray.map((tag) => {
    if (tag.type === "ingredient") {
      return tag.tag;
    }
  });

  const applianceTags = tagsArray.map((tag) => {
    if (tag.type === "appliance") {
      return tag.tag;
    }
  });

  const ustensilsTags = tagsArray.map((tag) => {
    if (tag.type === "ustensil") {
      return tag.tag;
    }
  });

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

  // return recipes that contain all ingredients in tags
  return searchedRecipes.filter((recipe) => {
    return ingredientsTags.every((ingredient) => {
      return recipe.ingredients.some((recipeIngredient) => {
        return (
          recipeIngredient.ingredient.toLowerCase() === ingredient.toLowerCase()
        );
      });
    });
  });
};

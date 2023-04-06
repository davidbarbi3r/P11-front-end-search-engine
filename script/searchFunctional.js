export const searchFunctional = (search, recipes, tagsArray) => {
  // search implementation with filter and map
  const tags = tagsArray.map((tag) => tag.tag.toLowerCase());

  // filter recipes by search input
  const searchedRecipes = recipes.filter((recipe) => {
    const nameMatch = recipe.name.toLowerCase().includes(search.toLowerCase());
    const ingredientMatch = recipe.ingredients
      .map((ingredient) => ingredient.ingredient.toLowerCase())
      .join(" ")
      .includes(search.toLowerCase());
    const descriptionMatch = recipe.description
      .toLowerCase()
      .includes(search.toLowerCase());
    return nameMatch || ingredientMatch || descriptionMatch;
  });

  if (!tagsArray.length) {
    return searchedRecipes;
  }

  // filter recipes by tags
  const filteredRecipesByTags = searchedRecipes.filter((recipe) => {
    const recipeTags = [
      recipe.appliance.toLowerCase(),
      ...recipe.ingredients.map((ingredient) =>
        ingredient.ingredient.toLowerCase()
      ),
      ...recipe.ustensils.map((ustensil) => ustensil.toLowerCase()),
    ];
    return tags.every((tag) => recipeTags.includes(tag));
  });

  return filteredRecipesByTags;
};

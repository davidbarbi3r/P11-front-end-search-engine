export const nativeSearch = (search, recipes, tagsArray) => {
    // search implementation with for loop
    const tags = tagsArray.map((tag) => tag.tag.toLowerCase());

    // filter recipes by search input
    const filteredRecipes = [];
    for (let i = 0; i < recipes.length; i++){
      if (recipes[i].name.toLowerCase().includes(search.toLowerCase())){
        filteredRecipes.push(recipes[i])
      }
      if (recipes[i].description.toLowerCase().includes(search.toLowerCase())){
        filteredRecipes.push(recipes[i])
      }
      for (let j = 0; j < recipes[i].ingredients.length; j++){
        if (recipes[i].ingredients[j].ingredient.toLowerCase().includes(search.toLowerCase())){
          filteredRecipes.push(recipes[i])
        }
      }
    }

    if (!tagsArray.length) {
      return [...new Set(filteredRecipes)];
    }

    // filter recipes by tags
    const filteredRecipesByTags = filteredRecipes.filter((recipe) => {
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
  }
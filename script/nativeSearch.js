export const nativeSearch = (search, recipes) => {
    // search implementation with for loop
    if (!search){
      return recipes;
    }
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
    return [...new Set(filteredRecipes)]
  }
export function filterIngredients (recipes, search){
  const filteredRecipesByIngredients = recipes.filter((recipe) => {
    return recipe.ingredients.map((ingredient) => ingredient.ingredient).join(" ").includes(search.toLowerCase())
  });
  return filteredRecipesByIngredients
}

export function getIngredients (recipes, search){
  return recipes
    .map(
      (recipe) => recipe.ingredients
      .map((ingredient) => ingredient.ingredient)
    )
    .flat()
    .filter((ingredient) => ingredient
    .includes(search.toLowerCase()))
    .reduce((acc,cur) => {
      if (!acc.includes(cur)){
        acc.push(cur)
      }
      return acc
    }, [])
}


export const searchFunctional = (search, recipes) => {
      if (!search){
        return recipes;
      }
      const filteredRecipes = recipes.filter((recipe) => {
        return recipe.name.toLowerCase().includes(search.toLowerCase());
      });
      const filteredRecipesByIngredients = recipes.filter((recipe) => {
        return recipe.ingredients.map((ingredient) => ingredient.ingredient).join(" ").includes(search.toLowerCase())
      });
      const filteredRecipesByDescription = recipes.filter((recipe) => {
        return recipe.description.includes(search.toLowerCase())
      });
      
      return [...filteredRecipes, ...filteredRecipesByIngredients, ...filteredRecipesByDescription]
        .reduce((acc,cur) => {
        if (!acc.includes(cur)){
            acc.push(cur)
        }
        return acc
      },[])
}
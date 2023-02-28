import { recipes } from "/script/recipes.js";

const search = document.querySelector("#main_search");
/* Listening for a keyup event on the search input. */
search.addEventListener("keyup", () => {
  const searchValue = search.value;

  if (searchValue.length < 3) {
    return;
  }

  const filteredRecipes = recipes.filter((recipe) => {
    return recipe.name.toLowerCase().includes(searchValue.toLowerCase());
  });
  const filteredRecipesByIngredients = recipes.filter((recipe) => {
    return recipe.ingredients.join(" ").includes(searchValue.toLowerCase())
  });
  const filteredRecipesByDescription = recipes.filter((recipe) => {
    return recipe.description.includes(searchValue.toLowerCase())
  })
  const recipesTest = structuredClone(recipes);
  console.log(filteredRecipesByDescription)
  console.log(recipes[0].ingredients.ingredient.join(" "))
  console.log(filteredRecipesByIngredients);
  for (const element of recipesTest) {
    return element.name;
  }
});

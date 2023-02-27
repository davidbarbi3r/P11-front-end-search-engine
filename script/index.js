import { recipes } from "/script/recipes.js";

const search = document.querySelector("#search");
search.addEventListener("search", () => {
  const searchValue = search.value;
  const filteredRecipes = recipes.filter((recipe) => {
    return recipe.name.toLowerCase().includes(searchValue.toLowerCase());
  });
  const recipesTest = structuredClone(recipes);

  for (const element of recipesTest) {
    return element.name;
  }

  console.log(recipesTest);
});

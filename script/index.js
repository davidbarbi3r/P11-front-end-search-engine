import { recipes } from "/script/recipes.js";
import { searchFunctional } from "/script/searchFunctional.js";
import { recipesContainerRender } from "/script/recipesContainerRender.js";
import { 
  filterAppliance, 
  filterIngredients, 
  filterUstensils, 
  getIngredients,
  getAppliance, 
  getUstensils
} from "./tagsFilters/index.js";

const SEARCH_MODE = "functional";

const search = document.querySelector("#main_search");
const ingredientsFilter = document.querySelector("#filter_ingredients");
const applianceFilter = document.querySelector("#filter_appliance");
const ustensilsFilter = document.querySelector("#filter_ustensils")
const recipesContainer = document.querySelector(".recipes_container");
const ingredientsInput = document.querySelector("#ingredients_input");
let filteredRecipes = recipes;
/* Listening for a keyup event on the search input. */
search.addEventListener("keyup", () => {
  const searchValue = search.value;

  if (searchValue.length < 3) {
    return recipes;
  }

  if (SEARCH_MODE === "functional") {
    filteredRecipes = searchFunctional(searchValue, recipes);
  } else {
    // native logic
    const recipesTest = structuredClone(recipes);
    for (const element of recipesTest) {
      return element.name;
    }
  }
  console.log(filteredRecipes);
  // render
  if (filteredRecipes.length) {
    recipesContainer.innerHTML = recipesContainerRender(filteredRecipes);
  } else {
    recipesContainer.innerHTML = `
    « Aucune recette ne correspond à votre critère… 
    vous pouvez chercher « tarte aux pommes », « poisson », etc.`
  }
});

let filteredIngredients = getIngredients(recipes, "")
ingredientsFilter.addEventListener("keyup", () => {
  const searchValue = ingredientsFilter.value;

  const ingredientsLeft = filterIngredients(filteredRecipes, searchValue)
  filteredIngredients = getIngredients(recipes, searchValue)
  console.log(filteredIngredients)
});

const ingredientsContainer = document.createElement("div")
ingredientsInput.appendChild(ingredientsContainer)
ingredientsContainer.className = "ingredients_container"

ingredientsFilter.addEventListener("click", () => {
  console.log("open div")
  ingredientsContainer.classList.add("open")
  // on click outside how to close ?
  ingredientsContainer.innerHTML = filteredIngredients.map((ingredient) => {
    `
      <span>${ingredient}</span>
    `
  })
})

applianceFilter.addEventListener("keyup", () => {
  const searchValue = applianceFilter.value;
  console.log(getAppliance(recipes, searchValue))

});

ustensilsFilter.addEventListener("keyup", () => {
  const searchValue = ustensilsFilter.value;
  console.log(getUstensils(recipes, searchValue))

});



recipesContainer.innerHTML = recipesContainerRender(filteredRecipes);


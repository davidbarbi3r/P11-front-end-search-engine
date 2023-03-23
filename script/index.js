import { recipes } from "/script/recipes.js";
import { searchFunctional } from "/script/searchFunctional.js";
import { recipesContainerRender } from "/script/recipesContainerRender.js";
import { 
  filterAppliance, 
  filterIngredients, 
  filterUstensils, 
  getIngredients,
  getAppliance, 
  getUstensils,
  renderIngredients
} from "./tagsFilters/index.js";

const SEARCH_MODE = "functional";

const search = document.querySelector("#main_search");
const ingredientsFilter = document.querySelector("#filter_ingredients");
const applianceFilter = document.querySelector("#filter_appliance");
const ustensilsFilter = document.querySelector("#filter_ustensils")
const recipesContainer = document.querySelector(".recipes_container");
const ingredientsInput = document.querySelector("#ingredients_input");
const chevronIngredients = document.querySelector("#chevron_ingredients");
const chevronAppliance = document.querySelector("#chevron_appliance");
const chevronUstensils = document.querySelector("#chevron_ustensils");
const ingredientBtn = document.querySelector(".ingredient_btn");
const tags = document.querySelector(".tags_list")
const tagsList = []
let filteredRecipes = recipes;
/* Listening for a keyup event on the search input. */
search.addEventListener("keyup", () => {
  const searchValue = search.value;

  if (searchValue.length < 3) {
    return filteredRecipes;
  }

  if (SEARCH_MODE === "functional") {
    filteredRecipes = searchFunctional(searchValue, recipes);
    renderIngredients(filteredRecipes, searchValue, ingredientsContainer, tagsList, tags)

  } else {
    // native logic
    const recipesTest = structuredClone(recipes);
    for (const element of recipesTest) {
      return element.name;
    }
  }
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
  if(searchValue.length >= 3){
    renderIngredients(filteredRecipes, searchValue, ingredientsContainer, tagsList, tags)
    recipesContainerRender(filteredRecipes);
  }
});

const ingredientsContainer = document.createElement("div")
ingredientsInput.appendChild(ingredientsContainer)
ingredientsContainer.className = "ingredients_container"
renderIngredients(filteredRecipes, "", ingredientsContainer, tagsList, tags)


chevronIngredients.addEventListener("click", () => {
  // open the ingredients list when clicked
  ingredientsContainer.className === "ingredients_container" ? 
  ingredientsContainer.classList.add("open") : 
  ingredientsContainer.classList.remove("open")

  // rotate chevron when open
  chevronIngredients.className === "" ? 
  chevronIngredients.classList.add("rotate") : 
  chevronIngredients.classList.remove("rotate");
})

applianceFilter.addEventListener("keyup", () => {
  const searchValue = applianceFilter.value;
  if(searchValue.length >= 3){
    console.log(getAppliance(recipes, searchValue))
  }
});

ustensilsFilter.addEventListener("keyup", () => {
  const searchValue = ustensilsFilter.value;
  if(searchValue.length >= 3){
    console.log(getUstensils(recipes, searchValue))
  }
});



recipesContainer.innerHTML = recipesContainerRender(filteredRecipes);


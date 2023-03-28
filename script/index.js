import { recipes } from "/script/recipes.js";
import { searchFunctional } from "/script/searchFunctional.js";
import { recipesContainerRender } from "/script/recipesContainerRender.js";
import { 
  getIngredients,
  getAppliance, 
  getUstensils,
  renderIngredients
} from "./tagsFilters/index.js";
import { renderApplicance } from "./tagsFilters/applianceFilter.js";

const SEARCH_MODE = "functional";

const search = document.querySelector("#main_search");
const ingredientsFilter = document.querySelector("#filter_ingredients");
const applianceFilter = document.querySelector("#filter_appliance");
const ustensilsFilter = document.querySelector("#filter_ustensils")
const recipesContainer = document.querySelector(".recipes_container");
const ingredientsInput = document.querySelector("#ingredients_input");
const applianceInput = document.querySelector("#appliance_input");
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
    filteredRecipes = searchFunctional("", recipes, tagsList);
    renderIngredients(filteredRecipes, "", ingredientsContainer, tagsList, tags)
    renderApplicance(filteredRecipes, "", applianceContainer, tagsList, tags)
  }

  if (SEARCH_MODE === "functional") {
    filteredRecipes = searchFunctional(searchValue, recipes, tagsList);
    renderIngredients(filteredRecipes, "", ingredientsContainer, tagsList, tags)
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

ingredientsFilter.addEventListener("keyup", () => {
  const searchValue = ingredientsFilter.value;
  renderIngredients(filteredRecipes, searchValue, ingredientsContainer, tagsList, tags)
  recipesContainerRender(filteredRecipes);
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

const applianceContainer = document.createElement("div")
applianceInput.appendChild(applianceContainer)
applianceContainer.className = "appliance_container"
renderApplicance(filteredRecipes, "", applianceContainer, tagsList, tags)

chevronAppliance.addEventListener("click", () => {
  // open the appliance list when clicked
  applianceContainer.className === "appliance_container" ?
  applianceContainer.classList.add("open") :
  applianceContainer.classList.remove("open")

  // rotate chevron when open
  chevronAppliance.className === "" ?
  chevronAppliance.classList.add("rotate") :
  chevronAppliance.classList.remove("rotate");
})

applianceFilter.addEventListener("keyup", () => {
  const searchValue = applianceFilter.value;
  if(searchValue.length < 3){
    renderApplicance(filteredRecipes, "", applianceContainer, tagsList, tags)
    recipesContainerRender(filteredRecipes);
  } else {
    renderApplicance(filteredRecipes, searchValue, applianceContainer, tagsList, tags)
    recipesContainerRender(filteredRecipes);
  }

});

ustensilsFilter.addEventListener("keyup", () => {
  const searchValue = ustensilsFilter.value;
  if(searchValue.length >= 3){
    console.log(getUstensils(recipes, searchValue))
  }
});



recipesContainer.innerHTML = recipesContainerRender(filteredRecipes);


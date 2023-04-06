import { recipes } from "/script/recipes.js";
import { searchFunctional } from "/script/searchFunctional.js";
import { recipesContainerRender } from "/script/recipesContainerRender.js";
import { 
  renderAppliance,
  renderUstensils,
  renderIngredients
} from "./tagsFilters/index.js";
import { nativeSearch } from "./nativeSearch.js";
import { toggleAppliance } from "./tagsFilters/applianceFilter.js";
import { toggleIngredients } from "./tagsFilters/ingredientsFilter.js";
import { toggleUstensils } from "./tagsFilters/ustensilsFilter.js";

const SEARCH_MODE = "functional";

const search = document.querySelector("#main_search");
const ingredientsFilter = document.querySelector("#filter_ingredients");
const applianceFilter = document.querySelector("#filter_appliance");
const ustensilsFilter = document.querySelector("#filter_ustensils")
const recipesContainer = document.querySelector(".recipes_container");
const ingredientsInput = document.querySelector("#ingredients_input");
const applianceInput = document.querySelector("#appliance_input");
const ustensilsInput = document.querySelector("#ustensils_input");
const chevronIngredients = document.querySelector("#chevron_ingredients");
const chevronAppliance = document.querySelector("#chevron_appliance");
const chevronUstensils = document.querySelector("#chevron_ustensils");
const tags = document.querySelector(".tags_list")
const tagsList = []
let filteredRecipes = recipes;
/* Listening for a keyup event on the search input. */

search.addEventListener("keyup", () => {
  const searchValue = search.value;

  if (SEARCH_MODE === "functional") {
    // functional logic
    if (searchValue.length < 3) {
      filteredRecipes = searchFunctional("", recipes, tagsList);
      renderIngredients(filteredRecipes, "", ingredientsContainer, tagsList, tags)
      renderAppliance(filteredRecipes, "", applianceContainer, tagsList, tags)
      renderUstensils(filteredRecipes, "", ustensilsContainer, tagsList, tags)
      toggleAppliance(filteredRecipes, tagsList);
      toggleIngredients(filteredRecipes, tagsList);
      toggleUstensils(filteredRecipes, tagsList);
    } else {
      filteredRecipes = searchFunctional(searchValue, recipes, tagsList);
      renderIngredients(filteredRecipes, "", ingredientsContainer, tagsList, tags)
      renderAppliance(filteredRecipes, "", applianceContainer, tagsList, tags)
      renderUstensils(filteredRecipes, "", ustensilsContainer, tagsList, tags)
      toggleAppliance(filteredRecipes, tagsList);
      toggleIngredients(filteredRecipes, tagsList);
      toggleUstensils(filteredRecipes, tagsList);
    }
  } else {
    // native logic
    if (searchValue.length < 3) {
      filteredRecipes = nativeSearch("", recipes, tagsList);
      renderIngredients(filteredRecipes, "", ingredientsContainer, tagsList, tags)
      renderAppliance(filteredRecipes, "", applianceContainer, tagsList, tags)
      renderUstensils(filteredRecipes, "", ustensilsContainer, tagsList, tags)
    } else {
      filteredRecipes = nativeSearch(searchValue, recipes, tagsList);
      renderIngredients(filteredRecipes, "", ingredientsContainer, tagsList, tags)
      renderAppliance(filteredRecipes, "", applianceContainer, tagsList, tags)
      renderUstensils(filteredRecipes, "", ustensilsContainer, tagsList, tags)
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
  if(searchValue.length < 3){
    renderIngredients(filteredRecipes, "", ingredientsContainer, tagsList, tags)
  } else {  
    renderIngredients(filteredRecipes, searchValue, ingredientsContainer, tagsList, tags)
  }
});

const ingredientsContainer = document.createElement("div")
ingredientsInput.appendChild(ingredientsContainer)
ingredientsContainer.className = "ingredients_container"
ingredientsContainer.id = "ingredients_container"
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
renderAppliance(filteredRecipes, "", applianceContainer, tagsList, tags)

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
    renderAppliance(filteredRecipes, "", applianceContainer, tagsList, tags)
  } else {
    renderAppliance(filteredRecipes, searchValue, applianceContainer, tagsList, tags)
  }
});

const ustensilsContainer = document.createElement("div")
ustensilsInput.appendChild(ustensilsContainer)
ustensilsContainer.className = "ustensils_container"
renderUstensils(filteredRecipes, "", ustensilsContainer, tagsList, tags)

chevronUstensils.addEventListener("click", () => {
  // open the ustensils list when clicked
  ustensilsContainer.className === "ustensils_container" ?
  ustensilsContainer.classList.add("open") :
  ustensilsContainer.classList.remove("open")

  // rotate chevron when open
  chevronUstensils.className === "" ?
  chevronUstensils.classList.add("rotate") :
  chevronUstensils.classList.remove("rotate");
})

ustensilsFilter.addEventListener("keyup", () => {
  const searchValue = ustensilsFilter.value;
  if(searchValue.length < 3){
    renderUstensils(filteredRecipes, "", ustensilsContainer, tagsList, tags)
  } else {
    renderUstensils(filteredRecipes, searchValue, ustensilsContainer, tagsList, tags)
  }
});

recipesContainer.innerHTML = recipesContainerRender(filteredRecipes);


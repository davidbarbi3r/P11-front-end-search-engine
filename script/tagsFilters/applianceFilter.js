import { renderTags } from "./index.js";
import { searchFunctional } from "../searchFunctional.js";
import { recipesContainerRender } from "../recipesContainerRender.js";

export function filterAppliance (recipes, search){
    const filteredRecipesByAppliance = recipes.filter((recipe) => {
        return recipe.appliance.includes(search.toLowerCase())
      });
    return filteredRecipesByAppliance
}

export function getAppliance (recipes, search){
  if (!search){
    return recipes
      .map((recipe) => recipe.appliance)
      .reduce((acc,cur) => {
        if (!acc.includes(cur)){
          acc.push(cur)
        }
        return acc
      }, [])
  }

  const filteredAppliance = recipes.map((recipe) => {
    return recipe.appliance
  }).filter((appliance) => appliance.toLowerCase().includes(search.toLowerCase()))
  .reduce((acc,cur) => {
    if (!acc.includes(cur)){
      acc.push(cur)
    }
    return acc
  }, [])
  return filteredAppliance
}

export function renderAppliance (recipes, search, containerEl, tagsList, tags) {
  const filteredAppliance = getAppliance(recipes, search)
  containerEl.innerHTML = filteredAppliance.map((appliance) => {
    return `
      <button class="applianceBtnTag">
        ${appliance}
      </button>
    `
  }).join("")
  const btnTags = document.querySelectorAll(".applianceBtnTag")
  btnTags.forEach((el, key) => {
    el.addEventListener("click", () => {
      tagsList.push({
        tag: el.innerText,
        type: "appliance"
      })
      renderTags(tagsList, tags, recipes, search)
      const filteredRecipes = searchFunctional(search, recipes, tagsList)
      const recipesContainer = document.querySelector(".recipes_container");
      recipesContainer.innerHTML = recipesContainerRender(filteredRecipes)
    })
  })
  return filteredAppliance
}



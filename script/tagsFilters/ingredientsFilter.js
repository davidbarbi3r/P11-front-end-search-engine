import { renderTags } from "./index.js";
import { searchFunctional } from "../searchFunctional.js";
import { recipesContainerRender } from "../recipesContainerRender.js";

export function getIngredients (recipes, search){
  if (!search){
    return recipes
      .map(
        (recipe) => recipe.ingredients
        .map((ingredient) => ingredient.ingredient)
      )
      .flat()
      .reduce((acc,cur) => {
        if (!acc.includes(cur)){
          acc.push(cur)
        }
        return acc
      }, [])
  }
  return recipes
    .map(
      (recipe) => recipe.ingredients
      .map((ingredient) => ingredient.ingredient)
    )
    .flat()
    .filter((ingredient) => ingredient.toLowerCase()
    .includes(search.toLowerCase()))
    .reduce((acc,cur) => {
      if (!acc.includes(cur)){
        acc.push(cur)
      }
      return acc
    }, [])
}

export function renderIngredients (recipes, search, containerEl, tagsList, tags){
  const filteredIngredients = getIngredients(recipes, search)
  containerEl.innerHTML = filteredIngredients.map((ingredient) => {
    return `
      <button class="btnTag">
        ${ingredient}
      </button>
    `
  }).join("")
  const btnTags = document.querySelectorAll(".btnTag")
  btnTags.forEach((el, key) => {
    el.addEventListener("click", () => {
      tagsList.push({
        tag: el.innerText,
        type: "ingredient"
      })
      renderTags(tagsList, tags, recipes)
      const filteredRecipes = searchFunctional(search, recipes, tagsList)
      const recipesContainer = document.querySelector(".recipes_container");
      recipesContainer.innerHTML = recipesContainerRender(filteredRecipes)
    })
  })
  return filteredIngredients
}


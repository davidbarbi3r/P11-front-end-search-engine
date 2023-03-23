import { renderTags } from "./index.js";

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
      renderTags(tagsList, tags)
    })
  })
  return filteredIngredients
}


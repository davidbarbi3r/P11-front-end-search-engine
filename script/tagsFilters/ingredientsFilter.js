import { renderTags } from "./index.js";
import { searchFunctional } from "../searchFunctional.js";
import { recipesContainerRender } from "../recipesContainerRender.js";
import { toggleUstensils } from "./ustensilsFilter.js";
import { toggleAppliance } from "./applianceFilter.js";

// get ingredients tags from recipes and filter them if search input is not empty
export function getIngredients(recipes, search) {
  if (!search) {
    return recipes
      .map((recipe) =>
        recipe.ingredients.map((ingredient) => ingredient.ingredient)
      )
      .flat()
      .reduce((acc, cur) => {
        if (!acc.includes(cur)) {
          acc.push(cur);
        }
        return acc;
      }, []);
  }
  return recipes
    .map((recipe) =>
      recipe.ingredients.map((ingredient) => ingredient.ingredient)
    )
    .flat()
    .filter((ingredient) =>
      ingredient.toLowerCase().includes(search.toLowerCase())
    )
    .reduce((acc, cur) => {
      if (!acc.includes(cur)) {
        acc.push(cur);
      }
      return acc;
    }, []);
}

// render ingredients tags and add event listener to them
export function renderIngredients(recipes, search, containerEl, tagsList) {
  const filteredIngredients = getIngredients(recipes, search);
  containerEl.innerHTML = filteredIngredients
    .map((ingredient) => {
      return `
      <button class="btnTag">
        ${ingredient}
      </button>
    `;
    })
    .join("");
  const btnTags = document.querySelectorAll(".btnTag");
  btnTags.forEach((el) => {
    el.addEventListener("click", () => {
      tagsList.push({
        tag: el.innerText,
        type: "ingredient",
      });
      renderTags(tagsList, recipes, search);
      const filteredRecipes = searchFunctional(search, recipes, tagsList);
      const recipesContainer = document.querySelector(".recipes_container");
      recipesContainer.innerHTML = recipesContainerRender(filteredRecipes);
      toggleIngredients(filteredRecipes, tagsList);
      toggleUstensils(filteredRecipes, tagsList);
      toggleAppliance(filteredRecipes, tagsList);
    });
  });
  return filteredIngredients;
}

// toggle ingredients tags if they are not in the filtered recipes
export function toggleIngredients(recipes, tagsList) {
  const ingredients = getIngredients(recipes);
  const ingredientsTags = document.querySelectorAll(".btnTag");
  ingredientsTags.forEach((el) => {
    if (
      !ingredients.includes(el.innerText.trim()) ||
      tagsList.some((tag) => tag.tag === el.innerText.trim())
    ) {
      el.style.display = "none";
    } else {
      el.style.display = "block";
    }
  });
  return ingredients;
}

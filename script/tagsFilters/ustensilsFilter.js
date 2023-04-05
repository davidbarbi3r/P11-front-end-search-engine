import { renderTags } from "./index.js";
import { searchFunctional } from "../searchFunctional.js";
import { recipesContainerRender } from "../recipesContainerRender.js";
import { toggleIngredients } from "./ingredientsFilter.js";

export function getUstensils(recipes, search) {
  if (!search) {
    return recipes
      .map((recipe) => recipe.ustensils)
      .flat()
      .reduce((acc, cur) => {
        if (!acc.includes(cur)) {
          acc.push(cur);
        }
        return acc;
      }, []);
  }

  const filteredUstensils = recipes
    .map((recipe) => {
      return recipe.ustensils;
    })
    .flat()
    .filter((ustensil) => ustensil.toLowerCase().includes(search.toLowerCase()))
    .reduce((acc, cur) => {
      if (!acc.includes(cur)) {
        acc.push(cur);
      }
      return acc;
    }, []);
  return filteredUstensils;
}

export function renderUstensils(recipes, search, containerEl, tagsList) {
  const filteredUstensils = getUstensils(recipes, search);
  containerEl.innerHTML = filteredUstensils
    .map((ustensil) => {
      return `
      <button class="ustensilBtnTag">
        ${ustensil}
      </button>
    `;
    })
    .join("");
  const btnTags = document.querySelectorAll(".ustensilBtnTag");
  btnTags.forEach((el, key) => {
    el.addEventListener("click", () => {
      tagsList.push({
        tag: el.innerText,
        type: "ustensil",
      });
      renderTags(tagsList, recipes, search);
      const filteredRecipes = searchFunctional(search, recipes, tagsList);
      const recipesContainer = document.querySelector(".recipes_container");
      recipesContainer.innerHTML = recipesContainerRender(filteredRecipes);
      toggleUstensils(filteredRecipes, tagsList);
      toggleIngredients(filteredRecipes, tagsList);
    });
  });
  return filteredUstensils;
}

export function toggleUstensils(recipes, tagsList) {
  const ustensils = getUstensils(recipes);
  const ustensilsTags = document.querySelectorAll(".ustensilBtnTag");
  ustensilsTags.forEach((el) => {
    if (
      !ustensils.includes(el.innerText.trim()) ||
      tagsList.some((tag) => tag.tag === el.innerText.trim())
    ) {
      el.style.display = "none";
    } else {
      el.style.display = "block";
    }
  });
}

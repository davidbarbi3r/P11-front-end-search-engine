import { renderTags } from "./index.js";
import { recipesContainerRender } from "../recipesContainerRender.js";
import { toggleIngredients } from "./ingredientsFilter.js";
import { toggleUstensils } from "./ustensilsFilter.js";
import { nativeSearch } from "../nativeSearch.js";

// get appliance tags from recipes and filter them if search input is not empty
export function getAppliance(recipes, search) {
  if (!search) {
    return recipes
      .map((recipe) => recipe.appliance)
      .reduce((acc, cur) => {
        if (!acc.includes(cur)) {
          acc.push(cur);
        }
        return acc;
      }, []);
  }

  const filteredAppliance = recipes
    .map((recipe) => {
      return recipe.appliance;
    })
    .filter((appliance) =>
      appliance.toLowerCase().includes(search.toLowerCase())
    )
    .reduce((acc, cur) => {
      if (!acc.includes(cur)) {
        acc.push(cur);
      }
      return acc;
    }, []);
  return filteredAppliance;
}

// render appliance tags and add event listener to them
export function renderAppliance(recipes, search, containerEl, tagsList) {
  const filteredAppliance = getAppliance(recipes, search);
  containerEl.innerHTML = filteredAppliance
    .map((appliance) => {
      return `
      <button class="applianceBtnTag">
        ${appliance}
      </button>
    `;
    })
    .join("");
  const btnTags = document.querySelectorAll(".applianceBtnTag");
  btnTags.forEach((el, key) => {
    el.addEventListener("click", () => {
      tagsList.push({
        tag: el.innerText,
        type: "appliance",
      });
      renderTags(tagsList, recipes, search);
      const filteredRecipes = nativeSearch(search, recipes, tagsList);
      const recipesContainer = document.querySelector(".recipes_container");
      recipesContainer.innerHTML = recipesContainerRender(filteredRecipes);
      toggleAppliance(filteredRecipes, tagsList);
      toggleIngredients(filteredRecipes, tagsList);
      toggleUstensils(filteredRecipes, tagsList);
    });
  });

  return filteredAppliance;
}

// show or hide appliance tags depending on the recipes
export function toggleAppliance(recipes, tagsList) {
  const appliance = getAppliance(recipes);
  const applianceTags = document.querySelectorAll(".applianceBtnTag");
  applianceTags.forEach((el) => {
    if (
      !appliance.includes(
        el.innerText.trim()) ||
          tagsList.some((tag) => tag.tag === el.innerText.trim())
    ) {
      el.style.display = "none";
    } else {
      el.style.display = "block";
    }
  });
}

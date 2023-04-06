import { recipesContainerRender } from "../recipesContainerRender.js";
import { searchFunctional } from "../searchFunctional.js";
import { toggleAppliance } from "./applianceFilter.js";
import { toggleIngredients } from "./ingredientsFilter.js";
import { toggleUstensils } from "./ustensilsFilter.js";

export function renderTags(tagsList, recipes, search) {
  // render tags from tagsList
  const tags = document.querySelector(".tags_list")
  tags.innerHTML = tagsList
    .map((tag) => {
      return `
            <button class="tag_btn ${tag.type === "ustensil" ? "ustensil" :
            tag.type === "appliance" ? "appliance" : "ingredient"}">
                ${tag.tag}\u00A0\u00A0
                <img class="close_btn" src="../../assets/cross.svg" alt="close"/>
            </button>
        `;
    })
    .join("");

  // add event listener to cross to remove tag from tagsList
  const closeBtn = document.querySelectorAll(".close_btn");
  closeBtn.forEach((el, key) => {
    el.addEventListener("click", () => {
      tagsList.splice(key, 1);
      renderTags(tagsList, recipes, search);
      const filteredRecipes = searchFunctional(search, recipes, tagsList)
      toggleUstensils(filteredRecipes, tagsList)
      toggleIngredients(filteredRecipes, tagsList)
      toggleAppliance(filteredRecipes, tagsList)
      const recipesContainer = document.querySelector(".recipes_container");
      recipesContainer.innerHTML = recipesContainerRender(filteredRecipes);
    });
  });  
}


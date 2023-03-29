import { recipesContainerRender } from "../recipesContainerRender.js";
import { searchFunctional } from "../searchFunctional.js";
import { renderIngredients } from "./index.js";

export function renderTags(tagsList, tags, recipes, search) {
  // render tags from tagsList
  tags.innerHTML = tagsList
    .map((tag) => {
      return `
            <button class="tag_btn">
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
      renderTags(tagsList, tags, recipes, search);
      const filteredRecipes = searchFunctional(search, recipes, tagsList)
      const recipesContainer = document.querySelector(".recipes_container");
      recipesContainer.innerHTML = recipesContainerRender(filteredRecipes);
    });
  });
}

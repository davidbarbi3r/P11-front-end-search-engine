export function recipesContainerRender(filteredRecipes){
    return `
    ${filteredRecipes.map((recipe) => {
        return `
        <article class="recipe_card">
          <div class="img_container"></div>
          <div class="recipe_info">
            <div class="recipe_title">
              <h2>${recipe.name}</h2>
              <p class="recipe_time">
                <img src="/assets/time.svg" alt="clock logo"/>
                ${recipe.time} min
              </p>   
            </div>
            <div class="recipe_desc_ingredients">
              <div class="half">${recipe.ingredients
                .map((i) => {
                  return `
                <p class="recipe_ingredient">
                  <span class="strong">${i.ingredient}</span>
                  ${i.quantity && i.unit ? ": " + i.quantity + " " + i.unit : ""}
                </p>   
              `;
                })
                .join("")}
              </div>
              <div class="half clamp">${recipe.description}</div>
            </div>
          </div>
        </article>`;
      }).join("")}
    `;
}
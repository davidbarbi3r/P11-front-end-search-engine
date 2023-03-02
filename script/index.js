import { recipes } from "/script/recipes.js";
import { searchFunctional } from "/script/searchFunctional.js";

const SEARCH_MODE = "functional"

const search = document.querySelector("#main_search");
/* Listening for a keyup event on the search input. */
search.addEventListener("keyup", () => {
  const searchValue = search.value;
  let filteredRecipes

  if (searchValue.length < 3) {
    return;
  }

  if (SEARCH_MODE === "functional"){
    filteredRecipes = searchFunctional(searchValue, recipes)
  } else {
    // native logic
    const recipesTest = structuredClone(recipes);
    for (const element of recipesTest) {
      return element.name;
    }
  }
  console.log(filteredRecipes)
  // render
  const recipesContainer = document.querySelector(".recipes_container")
  recipesContainer.innerHTML = `
    ${filteredRecipes.map((recipe) => {
      return `
      <article>
        <div class="img_container"></div>
        <div>
          <div>
            <h2>${recipe.name}</h2>
            <p>
              <img src="/assets/time.svg" alt="clock logo"/>
              ${recipe.time} min
            </p>   
          </div>
          <div>
            <div>${recipe.ingredients.map((i) => {
              return `
              <p>
              ${i.ingredient}
              ${i.quantity ? (": " + i.quantity + " "+ i.unit):""}
              </p>   
            `})}
            </div>
            <div>${recipe.description}</div>
          </div>
        </div>
      </article>`
    })}
  `
});
const array = [{test: "test"}, {test:"test"}]
// log an array of test propertie values
console.log(array.map((element) => element.test))
console.log()



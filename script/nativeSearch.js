export const nativeSearch = (search, recipes, tagsArray) => {
    // search implementation with for loop
    const ingredientsTags = tagsArray.map((tag) => {
      if (tag.type === "ingredient") {
        return tag.tag;
      } else {
        return;
      }
    }).filter((tag) => tag !== undefined);
  
    const applianceTags = tagsArray.map((tag) => {
      if (tag.type === "appliance") {
        return tag.tag;
      } else {
        return;
      }
    }).filter((tag) => tag !== undefined);
  
    const ustensilsTags = tagsArray.map((tag) => {
      if (tag.type === "ustensil") {
        return tag.tag;
      } else {
        return;
      }
    }).filter((tag) => tag !== undefined);

    const filteredRecipes = [];
    for (let i = 0; i < recipes.length; i++){
      if (recipes[i].name.toLowerCase().includes(search.toLowerCase())){
        filteredRecipes.push(recipes[i])
      }
      if (recipes[i].description.toLowerCase().includes(search.toLowerCase())){
        filteredRecipes.push(recipes[i])
      }
      for (let j = 0; j < recipes[i].ingredients.length; j++){
        if (recipes[i].ingredients[j].ingredient.toLowerCase().includes(search.toLowerCase())){
          filteredRecipes.push(recipes[i])
        }
      }
    }

    if (!tagsArray.length) {
      return [...new Set(filteredRecipes)];
    }

    let filteredRecipesByTags = [...new Set(filteredRecipes)];
    // return recipes that contain all ingredients in tags
    if(ingredientsTags.length && applianceTags.length && ustensilsTags.length){
      filteredRecipesByTags.filter((recipe) => {
        return ingredientsTags.every((ingredient) => {
          return recipe.ingredients.some((recipeIngredient) => {
            return (
              recipeIngredient.ingredient.toLowerCase() === ingredient.toLowerCase()
            );
          });
        });
      }).filter((recipe) => {
        return applianceTags.every((appliance) => {
          return recipe.appliance.toLowerCase() === appliance.toLowerCase();
        });
      }).filter((recipe) => {
        return ustensilsTags.every((ustensil) => {
          return recipe.ustensils.some((recipeUstensil) => {
            return recipeUstensil.toLowerCase() === ustensil.toLowerCase();
          });
        });
      }
      )
      return filteredRecipesByTags;
    } else if (ingredientsTags.length && applianceTags.length) {
      filteredRecipesByTags.filter((recipe) => {
        return ingredientsTags.every((ingredient) => {
          return recipe.ingredients.some((recipeIngredient) => {
            return (
              recipeIngredient.ingredient.toLowerCase() === ingredient.toLowerCase()
            );
          });
        });
      }).filter((recipe) => {
        return applianceTags.every((appliance) => {
          return recipe.appliance.toLowerCase() === appliance.toLowerCase();
        });
      });
      return filteredRecipesByTags;
    } else if (ingredientsTags.length && ustensilsTags.length) {
      filteredRecipesByTags.filter((recipe) => {
        return ingredientsTags.every((ingredient) => {
          return recipe.ingredients.some((recipeIngredient) => {
            return (
              recipeIngredient.ingredient.toLowerCase() === ingredient.toLowerCase()
            );
          });
        });
      }).filter((recipe) => {
        return ustensilsTags.every((ustensil) => {
          return recipe.ustensils.some((recipeUstensil) => {
            return recipeUstensil.toLowerCase() === ustensil.toLowerCase();
          });
        });
      });
      return filteredRecipesByTags;
    } else if (applianceTags.length && ustensilsTags.length) {
      filteredRecipesByTags.filter((recipe) => {
        return applianceTags.every((appliance) => {
          return recipe.appliance.toLowerCase() === appliance.toLowerCase();
        });
      }).filter((recipe) => {
        return ustensilsTags.every((ustensil) => {
          return recipe.ustensils.some((recipeUstensil) => {
            return recipeUstensil.toLowerCase() === ustensil.toLowerCase();
          });
        });
      });
      return filteredRecipesByTags;
    }
    if (ingredientsTags.length > 0) {
      filteredRecipesByTags.filter((recipe) => {
        return ingredientsTags.every((ingredient) => {
          return recipe.ingredients.some((recipeIngredient) => {
            return (
              recipeIngredient.ingredient.toLowerCase() === ingredient.toLowerCase()
            );
          });
        });
      });
      return filteredRecipesByTags;
    }
    if (applianceTags.length > 0) {
      filteredRecipesByTags.filter((recipe) => {
        return applianceTags.every((appliance) => {
          return recipe.appliance.toLowerCase() === appliance.toLowerCase();
        });
      });
      return filteredRecipesByTags;
    }
    if (ustensilsTags.length > 0) {
      filteredRecipesByTags.filter((recipe) => {
        return ustensilsTags.every((ustensil) => {
          return recipe.ustensils.some((recipeUstensil) => {
            return recipeUstensil.toLowerCase() === ustensil.toLowerCase();
          });
        });
      });
      return filteredRecipesByTags;
    }
    
    return filteredRecipesByTags;
  }
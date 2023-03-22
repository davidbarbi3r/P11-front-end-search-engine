export function filterUstensils (recipes, search){
    const filteredRecipesByUstensils = recipes.filter((recipe) => {
        return recipe.ustensils.join(" ").includes(search.toLowerCase())
      });
    return filteredRecipesByUstensils
}

export function getUstensils(recipes, search){
  const filteredUstensils = recipes.map((recipe) => {
    return recipe.ustensils
  })
  .flat()
  .filter(ustensil => ustensil.toLowerCase().includes(search.toLowerCase()))
  .reduce((acc,cur) => {
    if (!acc.includes(cur)){
      acc.push(cur)
    }
    return acc
  }, [])
  return filteredUstensils
}
export function filterAppliance (recipes, search){
    const filteredRecipesByAppliance = recipes.filter((recipe) => {
        return recipe.appliance.includes(search.toLowerCase())
      });
    return filteredRecipesByAppliance
}

export function getAppliance (recipes, search){
  const filteredAppliance = recipes.map((recipe) => {
    return recipe.appliance
  }).filter((appliance) => appliance.toLowerCase().includes(search.toLowerCase()))
  .reduce((acc,cur) => {
    if (!acc.includes(cur)){
      acc.push(cur)
    }
    return acc
  }, [])
  return filteredAppliance
}

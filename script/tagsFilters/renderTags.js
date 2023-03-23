export function renderTags (tagsList, tags){
    tags.innerHTML = tagsList.map((tag) => {
        return `
            <button>${tag.tag}</button>
        `
    }).join("")
}
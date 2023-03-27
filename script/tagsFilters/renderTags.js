export function renderTags (tagsList, tags){
    // render tags from tagsList
    tags.innerHTML = tagsList.map((tag) => {
        return `
            <button class="tag_btn">
                ${tag.tag}\u00A0\u00A0
                <img class="close_btn" src="../../assets/cross.svg" alt="close"/>
            </button>
        `
    }).join("");

    // add event listener to cross to remove tag from tagsList
    const closeBtn = document.querySelectorAll(".close_btn");
    closeBtn.forEach((el, key) => {
        el.addEventListener("click", () => {
            tagsList.splice(key, 1);
            renderTags(tagsList, tags);
        })
    })
}
let menu = document.querySelector(".navbar__menu");
let icon = document.querySelector(".navbar__menu-line");
const list = document.querySelector(".navbar__list");

const removeToken = () => {
    icon.classList.replace("navbar__menu-cross", "navbar__menu-line");
    list.classList.remove("opened");
}

menu.addEventListener("touchstart", () => {
    if (icon.className.includes("navbar__menu-line")) {
        icon.classList.replace("navbar__menu-line", "navbar__menu-cross");
        list.classList.add("opened");
    } else {
        removeToken()
    }
})

document.addEventListener("touchstart", e => {
    if (e.composedPath().includes(list) || e.composedPath().includes(menu)) return;
    removeToken()

})

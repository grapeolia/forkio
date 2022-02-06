let burger = document.querySelector(".burger");
let burgerDash = document.querySelectorAll('.burger__dash');
let burgerMenu = document.querySelector('.burger-menu-list');

let burgerMenuVisible = document.querySelector('.burger-menu-list_visible');
let burgerDashActive = document.querySelectorAll('.burger__dash_active');

burger.addEventListener("click", () => {
    burgerDash.forEach(element => {
        element.classList.toggle('burger__dash_active');
    });
    burgerMenu.classList.toggle('burger-menu-list_visible');
});

document.addEventListener("click", (e) => {
    let target = e.target;
    let its_menu = target == burgerMenu || burgerMenu.contains(target);
    let its_burger = target == burger || burger.contains(target);
    let menu_is_active = burgerMenu.classList.contains('burger-menu-list_visible');

    if (!its_menu && !its_burger && menu_is_active) {
        burgerMenu.classList.toggle('burger-menu-list_visible');
        burgerDash.forEach(element => {
            element.classList.toggle('burger__dash_active');
        });
    }
})
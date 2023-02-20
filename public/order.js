window.menuItems = 0;

const clothingItems = document.getElementsByClassName("clothing");

const clothingTotal = document.getElementById("price");

function callFeeAPI({ target }) {
    /* Checking if the target is a clothing item and if it is checked. If it is, it adds the value of
    the item to the menuItems variable. */
    if (target.className === "clothing" && target.checked) {
        window.menuItems += parseInt(target.value);
    } else if (target.className == "clothing" && !target.checked) {
        window.menuItems -= parseInt(target.value);
    }

    clothingTotal.textContent = `$${(window.menuItems/ 100).toFixed(2)}`
}

for (const clothing of clothingItems) {
    clothing.addEventListener("click", callFeeAPI);
}
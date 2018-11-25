function func_buttondown(id) {
    id.style.boxShadow = "none";
    id.style.fontWeight = "bold";
}

function func_buttonup(id) {
    id.style.boxShadow = "4px 4px 8px rgb(190, 190, 190)";
    id.style.fontWeight = "normal";
}

function changeText(id) {
    id.innerHTML = 'PRESS ME';
}
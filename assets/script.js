const filterSwitch = document.getElementById("filter-switch").parentNode;
const filterTable = document.getElementById("filter-table");
const filterList = document.getElementById("filter-list");
console.log(filterSwitch);
console.log(filterTable);

function hideTable() {
    console.log(filterSwitch.classList.contains("is-checked"));
    if (filterSwitch.classList.contains("is-checked")){
        filterTable.setAttribute("style", "display:none");
    } else {
        filterTable.setAttribute("style", "");
    }
}


filterSwitch.addEventListener("click", hideTable);
const filterSwitch = document.getElementById("filter-switch").parentNode;
const filterTable = document.getElementById("filter-table");
const filterList = document.getElementById("filter-list");
const tableButton = document.getElementById("expand-table")
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

function hideList() {
    console.log(filterList.getAttribute("style"));
    let styleAtt = filterList.getAttribute("style");
    if (styleAtt==="display: none;"){
        filterList.setAttribute("style", "display: content;");
    } else{
        filterList.setAttribute("style", "display: none;");
    }
}


filterSwitch.addEventListener("click", hideTable);
tableButton.addEventListener("click", hideList);
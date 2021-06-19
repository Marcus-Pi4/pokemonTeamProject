const filterSwitch = document.getElementById("filter-switch").parentNode;
const filterTable = document.getElementById("filter-table");
const filterList = document.getElementById("filter-list");
const tableButton = document.getElementById("expand-table");

const contentContainer1 = document.getElementById("content1");
const contentContainer2 = document.getElementById("content2");
const contentContainer3 = document.getElementById("content3");

const contentHeader1 = document.getElementById("content-header1");
const contentHeader2 = document.getElementById("content-header2");
const contentHeader3 = document.getElementById("content-header3");

const contentButton1 = document.getElementById("content-button1");
const contentButton2 = document.getElementById("content-button2");
const contentButton3 = document.getElementById("content-button3");

const contentP1 = document.getElementById("content-p1");
const contentP2 = document.getElementById("content-p2");
const contentP3 = document.getElementById("content-p3");
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
    console.log(tableButton.childNodes[1].textContent);
    let styleAtt = filterList.getAttribute("style");
    if (styleAtt==="display: none;"){
        tableButton.childNodes[1].textContent = "expand_less"
        filterList.setAttribute("style", "display: content;");
    } else{
        tableButton.childNodes[1].textContent = "expand_more"
        filterList.setAttribute("style", "display: none;");
    }
}

function hideContent1() {
    let p1Style = contentP1.getAttribute("style");

    if (p1Style==="display: none;"){
        contentButton1.childNodes[1].textContent = "expand_less"
        contentP1.setAttribute("style", "display: content;");
        contentContainer1.setAttribute("style", "border: 1px solid gray; border-radius: 15px;");
    } else{
        contentButton1.childNodes[1].textContent = "expand_more"
        contentP1.setAttribute("style", "display: none;");
        contentContainer1.setAttribute("style", "border-top: 2px dotted gray;");
    }
}

function hideContent2() {
    let p2Style = contentP2.getAttribute("style");

    if (p2Style==="display: none;"){
        contentButton2.childNodes[1].textContent = "expand_less"
        contentP2.setAttribute("style", "display: content;");
        contentContainer2.setAttribute("style", "border: 1px solid gray; border-radius: 15px;");
    } else{
        contentButton2.childNodes[1].textContent = "expand_more"
        contentP2.setAttribute("style", "display: none;");
        contentContainer2.setAttribute("style", "border-top: 2px dotted gray;");
    }
}

function hideContent3() {
    let p3Style = contentP3.getAttribute("style");

    if (p3Style==="display: none;"){
        contentButton3.childNodes[1].textContent = "expand_less"
        contentP3.setAttribute("style", "display: content;");
        contentContainer3.setAttribute("style", "border: 1px solid gray; border-radius: 15px;");
    } else{
        contentButton3.childNodes[1].textContent = "expand_more"
        contentP3.setAttribute("style", "display: none;");
        contentContainer3.setAttribute("style", "border-top: 2px dotted gray;");
    }

}




filterSwitch.addEventListener("click", hideTable);
tableButton.addEventListener("click", hideList);
contentButton1.addEventListener("click", hideContent1);
contentButton2.addEventListener("click", hideContent2);
contentButton3.addEventListener("click", hideContent3);
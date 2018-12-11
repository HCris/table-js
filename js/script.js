let tr = tBody.getElementsByTagName("tr");
let table = [];

function saveDateInLocalStorage() {
    window.localStorage.setItem("tableDataBase", JSON.stringify(table));
}

function getDateInLocalStorage() {
    table = JSON.parse(window.localStorage.getItem("tableDataBase")) || [];
    creationTable();
}

getDateInLocalStorage();

function getValueSearch() {
    let elSearch = document.getElementById("search");
    let valueSearch = elSearch.value;
    elSearch.value = "";
    let resultCells = [];
    let htmlCollection = tBody.getElementsByClassName("active");

    while (htmlCollection.length) {
        htmlCollection[0].classList.remove('active');
    }

    if(!valueSearch) return;
    
    table.forEach((row, indexRow) => {
        console.log(row);
        row.forEach((col, indexCol) => {
            console.log( col);
            let found = col.indexOf(valueSearch) > -1;
            if (found) {
                resultCells.push({
                    indexRow: indexRow,
                    indexCol: indexCol,
                });
            }

        });
    });
    let resultCellsLength = resultCells.length;
    if (resultCellsLength !== 0) {
        resultCells.forEach((ele) => {
            tBody.rows[ele.indexRow].cells[ele.indexCol].classList.add("active");

        });
    } else {
        alert("not found")
    }
    return;
}

function creationTable() {
    let tableRows = table.length;
    let valueInput = document.getElementById("rowNumber").value;
    document.getElementById("rowNumber").value = "";
    let row = tableRows ||valueInput;

    for (let i = 0; i < row; i++) {
        let tr = document.createElement("TR");
        tBody.appendChild(tr);

        if (table.length < i+1) {
            table.push([]);
        }
    }

    if (row) {
        let tableCols = table[0].length || 1;

        for (let col = 0; col < tableCols; ++col) {
            addCol();
        }

        tBody.insertAdjacentHTML("afterend", "<a class=\"btn-floating btn-large waves-effect waves-light red\" id = 'addButton' onclick='addCol()'><i class=\"material-icons\">add</i></a>");
        display();
    }
}


function creationInput(rowIndex) {
    let td = document.createElement("Td");
    let InputElemt = document.createElement("input");
    InputElemt.addEventListener("keyup", function (ev) {
        if (ev.keyCode === 13) {
            let cellIndex = InputElemt.parentElement.cellIndex;
            let rowIndex = InputElemt.parentElement.parentElement.rowIndex - 1;
            let test = InputElemt.value;
            table[rowIndex][cellIndex] = test;
            saveDateInLocalStorage();
        }
    });
    InputElemt.addEventListener("blur", function () {
        let cellIndex = InputElemt.parentElement.cellIndex;
        let rowIndex = InputElemt.parentElement.parentElement.rowIndex - 1;
        let test = InputElemt.value;
        table[rowIndex][cellIndex] = test;
        saveDateInLocalStorage();
    });
    td.appendChild(InputElemt);
    tr[rowIndex].appendChild(td);

    let colCountInRow = tr[rowIndex].children.length;
    let cellIndex = colCountInRow - 1;
    if (table[rowIndex].length < colCountInRow) {
        table[rowIndex].push("") ;
    }

    InputElemt.value = table[rowIndex][cellIndex];
}

function addCol() {
    for (let i = 0; i < tr.length; i++) {
        creationInput(i);
    }
    let th = document.createElement("TH");
    let txt = document.createTextNode("X");
    th.appendChild(txt);
    th.addEventListener("click", function (ev) {
        let targetEv = ev.target;
         let targetEvIndex = targetEv.cellIndex;
        removeCol(targetEvIndex);
    });
    tHead.appendChild(th);
    saveDateInLocalStorage();
}

function display() {
    let trLength = document.getElementsByTagName("tr");
    let searchWrapper = document.querySelector("#searchWrapper");
    let createTableWrapper = document.querySelector("#createTableWrapper");

    if (trLength.length === 1) {
        createTableWrapper.style.display  = "unset";
        searchWrapper.style.display  = "none";

    } else {
        searchWrapper.style.display = "unset";
        createTableWrapper.style.display  = "none";
    }
}

display();

function removeCol(idColToRemove) {
    table.forEach( (row) => {
       row.splice(idColToRemove, 1);
    });

    tHead.deleteCell(idColToRemove);
    for(let i = 0; i < tBody.rows.length; i++){
        tBody.rows[i].deleteCell(idColToRemove);
    }
    display();
    saveDateInLocalStorage();
    // getDateInLocalStorage();
}



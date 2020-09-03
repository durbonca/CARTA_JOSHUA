var statistics = ["Commune Area in km²"];

//Compiled from data found on Wikipedia
//TODO: add the extra digit for the HDI||QL
var communeData = [
    //["Cerrillos", "x"],
    //["Cerro Navia", "x"],
    //["Conchalí", "x"],
    //["El Bosque", "x"],
    //["Estación Central", "x"],
    //["Huechuraba", "x"],
    //["Independencia", "x"],
    //["La Cisterna", "x"],
    //["La Florida", "x"],
    //["La Granja", "x"],
    //["La Pintana", "x"],
    ["La Reina", 6000],
    ["Las Condes", 4000],
    ["Lo Barnechea", 9000],
    //["Lo Espejo", "x"],
    //["Lo Prado", "x"],
    //["Macul", "x"],
    //["Maipú", "x"],
    //["Ñuñoa", "x"],
    //["Padre Hurtado", "x"],
    //["Pedro Aguirre Cerda", "x"],
    //["Peñalolén", "x"],
    //["Pirque", "x"],
    ["Providencia", 4000],
    //["Pudahuel", "x"],
    //["Puente Alto", "x"],
    //["Quilicura", "x"],
    //["Quinta Normal", "x"],
    //["Recoleta", "x"],
    //["Renca", "x"],
    //["San Bernardo", "x"],
    //["San Joaquín", "x"],
    //["San José de Maipo", "x"],
    //["San Miguel", "x"],
    //["San Ramón", "x"],
    ["Santiago", 6000],
    ["Vitacura", 4000]
];

var COMMUNE_COUNT = communeData.length;

var currentStatisticShadow = document.getElementById(
    "current-statistic-shadow"
);
var currentStatisticElement = document.getElementById("current-statistic");
var statChoosers = document
    .getElementById("stat-chooser")
    .getElementsByTagName("li");

var activeStatElement;
var map = document.getElementById("map");
var communeMapElements = map.getElementsByClassName("commune");
var communeList = document.getElementById("commune-list");
var communeListItems = communeList.getElementsByTagName("li");

//Activate the first item in the list
statChoosers[0].setAttribute("data-active", "");
activeStatElement = statChoosers[0];

var shadowSet = false;

//Hide the shadow for the title when scrolled to top
document.body.onscroll = function() {
    var scrollTop = document.body.scrollTop;
    if (scrollTop >= 10 && !shadowSet) {
        currentStatisticShadow.style.visibility = "visible";
        shadowSet = true;
    } else if ((scrollTop < 10) & shadowSet) {
        currentStatisticShadow.style.visibility = "hidden";
        shadowSet = false;
    }
};

/**
 * (Event Listeners)
 * Map commune elements
 */
for (let i = 0; i < COMMUNE_COUNT; i++) {
    var name = communeData[i][0].replace(/\s/g, "-"); //Replace spaces with a hyphen
    //var mapCommuneElement = document.querySelector('#map .commune[data-name="' + name + '"]');

    //First element will be the list
    //Second element will be the map object
    var communeElements = document.querySelectorAll('[data-name="' + name + '"]');
    var listElement = communeElements[0];
    var mapElement = communeElements[1];

    mapElement.onmouseover = function(e) {
        var targetName = e.target.getAttribute("data-name");
        var respectiveListElement = communeList.querySelector(
            '[data-name="' + targetName + '"]'
        );

        //Highlight commune in list
        maskAllExcept(targetName);

        //remove the attribute that maskAllExcept() previously set on active element
        respectiveListElement.removeAttribute("data-masked");
        respectiveListElement.setAttribute("data-active", "true");

        //Bring map element to front
        e.target.parentNode.appendChild(e.target);
        e.target.removeAttribute("data-masked");
    };

    mapElement.onmouseout = function(e) {
        var targetName = e.target.getAttribute("data-name");
        var respectiveListElement = communeList.querySelector(
            '[data-name="' + targetName + '"]'
        );

        //Reset the state of the active sector being departed
        respectiveListElement.removeAttribute("data-active");
        //e.target.removeAttribute("data-active");
        //Remove all masks as the cursor has left the map
        //Done to avoid costly resetting when commune-hopping
        if (e.relatedTarget == map) {
            resetMasks();
        }
    };
}

/**
 * (Event Listeners)
 * Commune List elements
 *
 * Event listener on UL, not LI as the LI elements are moved around, loosing refference.
 */
communeList.onmouseover = function(e) {
    if (e.target.nodeName == "LI") {
        var targetName = e.target.getAttribute("data-name");
        maskAllExcept(targetName);
        e.target.removeAttribute("data-masked");

        var respectiveMapElement = map.querySelector(
            '[data-name="' + targetName + '"]'
        );
        respectiveMapElement.setAttribute("data-active", "");
        respectiveMapElement.removeAttribute("data-masked");
        //Bring to front
        respectiveMapElement.parentNode.appendChild(respectiveMapElement);
    }
};

communeList.onmouseout = function(e) {
    if (e.target.nodeName != "LI") {
        resetMasks();
    } else {
        var targetName = e.target.getAttribute("data-name");
        var respectiveMapElement = map.querySelector(
            '[data-name="' + targetName + '"]'
        );
        respectiveMapElement.removeAttribute("data-active");
        e.target.removeAttribute("data-active");
    }
};

/**
 * Events for the statistic option buttons
 */
for (let i = 0; i < statChoosers.length; i++) {
    statChoosers[i].onclick = function(e) {
        console.log("Changing statistic to " + statistics[i]);
        //Remove the state from the previously active item
        activeStatElement.removeAttribute("data-active");

        //Set the active state for the new item
        activeStatElement = e.target;
        activeStatElement.setAttribute("data-active", "");

        currentStatisticElement.textContent = statistics[i];

        //Update the new list of commune elements
        communeListItems = communeList.getElementsByTagName("li");

        //i+1 as column index starts at 1, not 0
        sortList(i + 1);
        updateMap(i + 1);
    };
}

/***
 * Masks all the list entries and map sectors that aren't already masked.
 * Doesn't mask the target commune.
 *
 * @param {string} name Name of the commune to highlight
 */
function maskAllExcept(name) {
    //var qualifiedMapElements = map.querySelectorAll(':not([data-name="' + name + '"]):not([data-masked])');
    //var qualifiedListElements = communeList.querySelectorAll(':not([data-name="' + name + '"]):not([data-masked])');

    //All but one commune (active one) gets masked
    for (var i = 0; i < COMMUNE_COUNT; i++) {
        communeMapElements[i].setAttribute("data-masked", "");
        //qualifiedListElements[i].setAttribute('data-masked', '');
    }

    for (var i = 0; i < COMMUNE_COUNT; i++) {
        communeListItems[i].setAttribute("data-masked", "");
    }
}
/***
 * Unmasks all the map sectors and list entires.
 */
function resetMasks() {
    for (var i = 0; i < COMMUNE_COUNT; i++) {
        communeMapElements[i].removeAttribute("data-masked");
        communeMapElements[i].removeAttribute("data-active");

        communeListItems[i].removeAttribute("data-masked");
        communeListItems[i].removeAttribute("data-active");
    }
}

/**
 * Formats the value of a column, based on the type of value.
 * Adds a comma for the thousand's separator and the symbols '%' and '$' where needed
 *
 * @param {number} The index of the column to format against
 * @param {number} The input value
 */
function formatValue(columnIndex, inputValue) {
    if (isNaN(inputValue)) {
        //Dealing with null values in data
        inputValue = "-";
    } else {
        if (columnIndex <= 4) {
            //Column 1,2,3,4 use delimiters
            var delimiter = ",";
            inputValue = inputValue
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
        }
        if (columnIndex == 4) {
            //Income
            inputValue = "$" + inputValue;
        } else if (columnIndex == 5) {
            //Poverty
            inputValue = Math.trunc(inputValue * 100) + "%";
        }
    }
    return inputValue;
}

/***
 * Sort the commune data table, per column
 * Updates the commune list.
 *
 * @param {number} colIndex the index of the column to sort the table against.
 */
function sortList(colIndex) {
    console.log("Sorting data table against column " + colIndex);
    communeData.sort(function(a, b) {
        if (a[colIndex] === b[colIndex]) {
            return 0;
        } else if (isNaN(b[colIndex])) {
            return -1;
        } else if (isNaN(a[colIndex])) {
            return 1;
        } else {
            return a[colIndex] > b[colIndex] ? -1 : 1;
        }
    });

    var htmlString = "";

    for (var i = 0; i < COMMUNE_COUNT; i++) {
        var name = communeData[i][0];
        var value = formatValue(colIndex, communeData[i][colIndex]);
        var encodedName = communeData[i][0].replace(/\s/g, "-");

        htmlString +=
            '<li data-name="' +
            encodedName +
            '" data-rank="' +
            (i + 1) +
            '">' +
            name +
            '<div class="value">' +
            value +
            "</div></li>\n";
    }
    communeList.innerHTML = htmlString;
}

function updateMap(newColumnIndex) {
    console.log("Updating map");

    var htmlString = "";

    for (var i = 0; i < COMMUNE_COUNT; i++) {
        var value = communeData[i][newColumnIndex];
        var encodedName = communeData[i][0].replace(/\s/g, "-");
        var mapElement = document.querySelector(
            '#map .commune[data-name="' + encodedName + '"]'
        );

        if (isNaN(value)) {
            //CSS sets the color based on rank.
            mapElement.setAttribute("data-rank", "-");
        } else {
            //CSS sets the color based on rank.
            mapElement.setAttribute("data-rank", i + 1);
        }
    }
}

//Initiate map
sortList(1);
updateMap(1);
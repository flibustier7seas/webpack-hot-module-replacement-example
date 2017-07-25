var createCheckUpdateButton = require("./checkUpdate").default;

// Data to update
var firstChunkData = require("./firstChunkData").default;

var div = document.createElement("DIV");
var button = createCheckUpdateButton();
var label = document.createElement("LABEL");

div.appendChild(button);
div.appendChild(label);

document.body.appendChild(div);

function renderData(data) {
    console.log("firstChunk: renderData");
    label.innerHTML = data;
}

renderData(firstChunkData);

if (module.hot) {
    module.hot.accept("./firstChunkData", function () {
        console.log("accept update module firstChunkData");

        var newFirstChunkData = require("./firstChunkData").default;
        
        renderData(newFirstChunkData);
    });
}

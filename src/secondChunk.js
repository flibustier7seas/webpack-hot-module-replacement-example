var createCheckUpdateButton = require("./checkUpdate").default;

// Data to update
var secondChunkData = "secondChunkData";

var div = document.createElement("DIV");
var button = createCheckUpdateButton();
var label = document.createElement("LABEL");

div.appendChild(button);
div.appendChild(label);

document.body.appendChild(div);

function renderData(data) {
    console.log("secondChunk: renderData");
    label.innerHTML = data;
}

renderData(secondChunkData);

if (module.hot) {
    module.hot.accept(); // accept itself

    module.hot.dispose(function () {
        console.log("secondChunk: dispose");

        document.body.removeChild(div);// delete div
    });
}

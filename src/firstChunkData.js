var data = "firstChunkData";

export default data;

if (module.hot) {
    module.hot.dispose(function () {
        console.log("firstChunkData: dispose");
    });
}
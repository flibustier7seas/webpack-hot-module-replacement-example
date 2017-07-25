function createCheckUpdateButton() {
    var check = function () {
        console.log("check update");
        module.hot.check(true)
            .then(function (updatedModules) {
                console.log("module.hot.status: " + module.hot.status());
                console.dir(updatedModules);
            })
            .catch(function (err) {
                var status = module.hot.status();
                if (["abort", "fail"].indexOf(status) >= 0) {
                    console.warn("[HMR] Cannot apply update. Need to do a full reload!");
                    console.warn("[HMR] " + err.stack || err.message);
                    // window.location.reload();
                } else {
                    console.warn("[HMR] Update failed: " + err.stack || err.message);
                }
            });
    };

    var button = document.createElement("INPUT");
    button.setAttribute("type", "button");
    button.setAttribute("value", "Check update");
    button.onclick = check;

    return button;
}

export default createCheckUpdateButton;
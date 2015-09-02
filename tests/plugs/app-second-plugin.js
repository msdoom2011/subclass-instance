var appSecondPlugin = Subclass.createModule('appSecondPlugin', ['appThirdPlugin'], {
    pluginOf: "app",
    onInstance: function(evt, moduleInstance, arg) {
        if (!moduleInstance.calls) {
            moduleInstance.calls = [];
        }
        moduleInstance.calls.push("appSecondPlugin1");
    }
});
appSecondPlugin.onInstance(function(evt, moduleInstance, arg) {
    moduleInstance.calls.push("appSecondPlugin2");
});

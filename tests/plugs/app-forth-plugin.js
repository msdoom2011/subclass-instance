var appForthPlugin = Subclass.createModule('appForthPlugin', {
    pluginOf: 'appSecondPlugin',
    onInstance: function(evt, moduleInstance, arg) {
        if (!moduleInstance.calls) {
            moduleInstance.calls = [];
        }
        moduleInstance.calls.push("appForthPlugin1");
    }
});
appForthPlugin.onInstance(function(evt, moduleInstance, arg) {
    moduleInstance.calls.push("appForthPlugin2");
});

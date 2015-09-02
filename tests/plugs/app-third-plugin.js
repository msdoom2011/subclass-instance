var appThirdPlugin = Subclass.createModule('appThirdPlugin', {
    plugin: true,
    onInstance: function(evt, moduleInstance, arg) {
        if (!moduleInstance.calls) {
            moduleInstance.calls = [];
        }
        moduleInstance.calls.push("appThirdPlugin1");
    }
});
appThirdPlugin.onInstance(function(evt, moduleInstance, arg) {
    moduleInstance.calls.push("appThirdPlugin2");
});

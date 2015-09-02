var appFirstPlugin = Subclass.createModule('appFirstPlugin', {
    plugin: true,
    onInstance: function(evt, moduleInstance, arg) {
        if (!moduleInstance.calls) {
            moduleInstance.calls = [];
        }
        moduleInstance.calls.push("appFirstPlugin1");
    }
});
appFirstPlugin.onInstance(function(evt, moduleInstance, arg) {
    moduleInstance.calls.push("appFirstPlugin2");
});

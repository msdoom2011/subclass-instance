var app = Subclass.createModule("app", ['appFirstPlugin'], {
    onInstance: function(evt, moduleInstance, arg) {
        if (!moduleInstance.calls) {
            moduleInstance.calls = [];
        }
        moduleInstance.appArg = arg;
        moduleInstance.calls.push(this.getName() + "1");
    }
});

app.onInstance(function(evt, moduleInstance, arg) {
    moduleInstance.calls.push(this.getName() + "2");
});

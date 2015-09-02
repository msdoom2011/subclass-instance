/**
 * @class
 * @constructor
 */
Subclass.Instance.Extension.SettingsManagerExtension = function() {

    function SettingsManagerExtension(classInst)
    {
        SettingsManagerExtension.$parent.apply(this, arguments);
    }

    SettingsManagerExtension.$parent = Subclass.Extension;


    //=========================================================================
    //========================== ADDING NEW METHODS ===========================
    //=========================================================================

    var SettingsManager = Subclass.SettingsManager;


    /**
     * Sets callback function which will be invoked each time after
     * the module instance was created
     *
     * @method setOnInstance
     * @memberOf Subclass.SettingsManager.prototype
     *
     * @throws {Error}
     *      Throws error if:<br />
     *      - trying to change value after the module became ready<br />
     *      - specified not function argument value
     *
     * @param callback
     */
    SettingsManager.prototype.setOnInstance = function(callback)
    {
        this.checkModuleIsReady();

        if (typeof callback != "function") {
            Subclass.Error.create('InvalidArgument')
                .argument('the onInstance event callback', false)
                .received(callback)
                .expected('a function')
                .apply()
            ;
        }
        var eventManager = this.getModule().getEventManager();
        var onInstanceEvent = eventManager.getEvent('onInstance');

        onInstanceEvent.addListener(callback);
    };


    //=========================================================================
    //======================== REGISTERING EXTENSION ==========================
    //=========================================================================

    Subclass.Module.onInitializeBefore(function(evt, module)
    {
        SettingsManager = Subclass.Tools.buildClassConstructor(SettingsManager);

        if (!SettingsManager.hasExtension(SettingsManagerExtension)) {
            SettingsManager.registerExtension(SettingsManagerExtension);
        }
    });

    return SettingsManagerExtension;
}();
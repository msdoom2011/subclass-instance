/**
 * @class
 * @constructor
 */
Subclass.Instance.Extension.ModuleAPIExtension = function() {

    function ModuleAPIExtension(classInst)
    {
        ModuleAPIExtension.$parent.apply(this, arguments);
    }

    ModuleAPIExtension.$parent = Subclass.Extension;


    //=========================================================================
    //========================== ADDING NEW METHODS ===========================
    //=========================================================================

    var ModuleAPI = Subclass.ModuleAPI;

    /**
     * The same as the {@link Subclass.Module#onInstance}
     *
     * @method onInstance
     * @memberOf Subclass.ModuleAPI.prototype
     */
    ModuleAPI.prototype.onInstance = function()
    {
        return this.getModule().onInstance.apply(this.getModule(), arguments);
    };

    /**
     * The same as the {@link Subclass.Module#createInstance}
     *
     * @method createInstance
     * @memberOf Subclass.ModuleAPI.prototype
     */
    ModuleAPI.prototype.createInstance = function()
    {
        return this.getModule().createInstance.apply(this.getModule(), arguments);
    };


    //=========================================================================
    //======================== REGISTERING EXTENSION ==========================
    //=========================================================================

    Subclass.Module.onInitializeBefore(function(evt, module)
    {
        ModuleAPI = Subclass.Tools.buildClassConstructor(ModuleAPI);

        if (!ModuleAPI.hasExtension(ModuleAPIExtension)) {
            ModuleAPI.registerExtension(ModuleAPIExtension);
        }
    });

    return ModuleAPIExtension;
}();
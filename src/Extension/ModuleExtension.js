/**
 * @class
 * @constructor
 *
 * Module settings:
 *
 * onInstance   {function}   opt    Callback function which will be invoked
 *                                  each time immediately after the module
 *                                  instance was created.
 */
Subclass.Instance.Extension.ModuleExtension = function() {

    function ModuleExtension(module)
    {
        ModuleExtension.$parent.apply(this, arguments);
    }

    ModuleExtension.$parent = Subclass.Extension;

    /**
     * @inheritDoc
     */
    ModuleExtension.initialize = function(module)
    {
        this.$parent.initialize.apply(this, arguments);

        var eventManager = module.getEventManager();
        eventManager.registerEvent('onInstance');
    };


    //=========================================================================
    //========================== ADDING NEW METHODS ===========================
    //=========================================================================

    var Module = Subclass.Module;

    /**
     * The same as the {@link Subclass.SettingsManager#setOnInstance}
     *
     * @method onInstance
     * @memberOf Subclass.Module.prototype
     *
     * @param {Function} callback
     *      The callback function
     *
     * @returns {Subclass.Module}
     */
    Module.prototype.onInstance = function(callback)
    {
        this.getSettingsManager().setOnInstance(callback);

        return this;
    };

    /**
     * Invokes registered onInstance callback functions.<br /><br />
     *
     * @method triggerOnInstance
     * @memberOf Subclass.Module.prototype
     *
     * @returns {Subclass.Module}
     */
    Module.prototype.triggerOnInstance = function(moduleInstance)
    {
        if (
            !moduleInstance
            || typeof moduleInstance != 'object'
            || !(moduleInstance instanceof Subclass.ModuleInstance)
        ) {
            Subclass.Error.create('InvalidArgument')
                .argument('the instance of module', false)
                .expected('an instance of class "Subclass.ModuleInstance"')
                .received(moduleInstance)
                .apply()
            ;
        }
        this.getEventManager().getEvent('onInstance').trigger(moduleInstance);

        return this;
    };

    /**
     * Creates module instance and triggers onInstance event
     *
     * @returns {Subclass.ModuleInstance}
     */
    Module.prototype.createInstance = function()
    {
        var moduleInstance = Subclass.Tools.createClassInstance(Subclass.ModuleInstance, this);
        var args = [moduleInstance];

        for (var i = 0; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
        this.triggerOnInstance.apply(this, args);

        return moduleInstance;
    };


    //=========================================================================
    //======================== REGISTERING EXTENSION ==========================
    //=========================================================================

    Subclass.Module.onInitializeBefore(function(evt, module)
    {
        Module = Subclass.Tools.buildClassConstructor(Module);

        if (!Module.hasExtension(ModuleExtension)) {
            Module.registerExtension(ModuleExtension);
        }
    });

    return ModuleExtension;
}();
/**
 * SubclassInstance - v0.1.0 - 2015-10-07
 * https://github.com/msdoom2011/subclassjs
 *
 * Copyright (c) 2015 Dmitriy Osipishin | msdoom2011@gmail.com
 */
(function() {
"use strict";

/**
 * @namespace
 */
Subclass.Instance = {};

/**
 * @namespace
 */
Subclass.Instance.Extension = {};

/**
 * @class
 * @constructor
 * @param {Subclass.Module} module
 *      An instance of module
 */
Subclass.ModuleInstance = function()
{
    function ModuleInstance(module)
    {
        /**
         * Module instance
         *
         * @type {Subclass.Module}
         * @private
         */
        this._module = module;

        /**
         * Module instance events
         *
         * @type {Array}
         * @private
         */
        this._events = [];


        // Initialization operations

        this.registerEvent('onInitialize');
        this.initializeExtensions();
        this.getEvent('onInitialize').trigger();
    }

    ModuleInstance.$parent = Subclass.Extendable;

    ModuleInstance.$mixins = [Subclass.Event.EventableMixin];

    /**
     * Returns module instance
     *
     * @method getModule
     * @memberOf Subclass.ModuleAPI.prototype
     *
     * @returns {Subclass.ModuleAPI}
     */
    ModuleInstance.prototype.getModule = function()
    {
        return this._module.getAPI();
    };

    return ModuleInstance;
}();

// Source file: Extension/ModuleAPIExtension.js

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

// Source file: Extension/ModuleExtension.js

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
        var onInstanceEvent = this.getEventManager().getEvent('onInstance');
        onInstanceEvent.trigger.apply(onInstanceEvent, arguments);

        return this;
    };

    /**
     * Creates module instance and triggers onInstance event
     *
     * @returns {Subclass.ModuleInstance}
     */
    Module.prototype.createInstance = function()
    {
        if (!this.isRoot() || !this.isReady()) {
            Subclass.Error.create(
                'Can\'t create instance of module ' +
                'which is a plugin or not ready.'
            );
        }
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

// Source file: Extension/SettingsManagerExtension.js

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

// Source file: Subclass.js

/**
 * Registers the new SubclassJS plug-in
 */
Subclass.registerPlugin(function() {

    function InstancePlugin()
    {
        InstancePlugin.$parent.call(this);
    }

    InstancePlugin.$parent = Subclass.SubclassPlugin;

    /**
     * @inheritDoc
     */
    InstancePlugin.getName = function()
    {
        return "SubclassInstance";
    };

    return InstancePlugin;
}());
})();
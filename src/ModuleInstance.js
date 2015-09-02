/**
 * @namespace
 */
Subclass.Instance = {};

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
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

describe("Checking SubclassJS initialization", function() {

    it ("", function() {
        expect(Subclass.issetPlugin('SubclassInstance')).toBe(true);
    });
});

describe("Creating module instance", function() {
    it ("", function() {

        var inst = app.createInstance('test');

        expect(inst instanceof Subclass.ModuleInstance).toBe(true);

        expect(inst.appArg).toBe('test');
        expect(inst.calls[0]).toBe('app1');
        expect(inst.calls[1]).toBe('app2');
        expect(inst.calls[2]).toBe('appFirstPlugin1');
        expect(inst.calls[3]).toBe('appFirstPlugin2');
        expect(inst.calls[4]).toBe('appSecondPlugin1');
        expect(inst.calls[5]).toBe('appSecondPlugin2');
        expect(inst.calls[6]).toBe('appThirdPlugin1');
        expect(inst.calls[7]).toBe('appThirdPlugin2');
        expect(inst.calls[8]).toBe('appForthPlugin1');
        expect(inst.calls[9]).toBe('appForthPlugin2');

    });
});
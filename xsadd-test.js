'use strict';

var XSadd = require('./');

var resultUint32 = [
    1823491521, 1658333335, 1467485721, 45623648,
    3336175492, 2561136018, 181953608, 768231638,
    3747468990, 633754442, 1317015417, 2329323117,
    688642499, 1053686614, 1029905208, 3711673957,
    2701869769, 695757698, 3819984643, 1221024953
];

var resultFloat = [
    0.03331006, 0.81703216, 0.52816284, 0.76104426,
    0.09285593, 0.34277064, 0.40109116, 0.79619718,
    0.71619844, 0.21930778, 0.68432468, 0.05859083,
    0.86583626, 0.22139138, 0.95107985, 0.15838248,
    0.02087647, 0.60301602, 0.01047146, 0.34406352
];

describe('xsadd', function () {
    describe('check return values', function () {
        var xsadd = new XSadd(1234);

        it('uint32', function () {
            var result = [];
            for (var i = 0; i < 40; i++) {
                var val = xsadd.getUint32();
                if (i < 20)
                    result.push(val);

            }
            result.should.eql(resultUint32);
        });

        it('float', function () {
            var result = [];
            for (var i = 0; i < 20; i++) {
                result.push(xsadd.getFloat());
            }
            result.should.approximatelyDeep(resultFloat, 1e-6);
        });
    });

    it('should be reinintiable', function () {
        var xsadd = new XSadd(1234);
        var val1 = xsadd.getUint32();
        var val2 = xsadd.getFloat();

        xsadd.init(1234);
        xsadd.getUint32().should.equal(val1);
        xsadd.getFloat().should.equal(val2);

        xsadd.init(42);
        xsadd.getUint32().should.not.equal(val1);
        xsadd.getFloat().should.not.equal(val2);
    });

    it('should export a standalone random()', function () {
        var xsadd = new XSadd(1234);
        var value = xsadd.random();
        value.should.be.a.Number();
        var random = xsadd.random;
        random();
        random();
        random().should.be.a.Number();
    });
});

'use strict';

var XSadd = require('./');

var str = '';
test();
console.log(str);

function printf(val) {
    str += val;
}

function test() {
    var xsadd = new XSadd(1234);
    printf("xsadd_init(&xsa, 1234);\n");
    printf("xsadd_uint32\n");
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 4; j++) {
            printf(xsadd.uint32() + ' ');
        }
        printf ("\n");
    }
    printf("xsadd_float\n");
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 4; j++) {
            printf(xsadd.float());
        }
        printf ("\n");
    }
}
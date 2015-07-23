const LOOP = 8;
const FLOAT_MUL = 1 / 16777216;

function multiply_uint32(n, m) {
    n >>>= 0;
    m >>>= 0;
    var nlo = n & 0xffff;
    var nhi = n - nlo;
    return (nhi * m >>> 0) + (nlo * m) >>> 0;
}

export default class XSadd {
    constructor(seed = Date.now()) {
        this.state = new Uint32Array(4);
        this.init(seed);
    }

    init(seed) {
        this.state[0] = seed;
        this.state[1] = 0;
        this.state[2] = 0;
        this.state[3] = 0;
        for (let i = 1; i < LOOP; i++) {
            this.state[i & 3] ^= i + multiply_uint32(1812433253, this.state[(i - 1) & 3] ^ (this.state[(i - 1) & 3] >>> 30) >>> 0) >>> 0;
        }
        period_certification(this);
        for (let i = 0; i < LOOP; i++) {
            next_state(this);
        }
    }

    /**
     * Returns a 32-bit integer r (0 <= r < 2^32)
     */
    getUint32() {
        next_state(this);
        return this.state[3] + this.state[2] >>> 0;
    }

    /**
     * Returns a floating point number r (0.0 <= r < 1.0)
     */
    getFloat() {
        return (this.getUint32() >>> 8) * FLOAT_MUL;
    }

    get random() {
        if (!this._random) {
            this._random = this.getFloat.bind(this);
        }
        return this._random;
    }
}

function period_certification(xsadd) {
    if (xsadd.state[0] === 0 &&
        xsadd.state[1] === 0 &&
        xsadd.state[2] === 0 &&
        xsadd.state[3] === 0) {
        xsadd.state[0] = 88; // X
        xsadd.state[1] = 83; // S
        xsadd.state[2] = 65; // A
        xsadd.state[3] = 68; // D
    }
}

const sh1 = 15;
const sh2 = 18;
const sh3 = 11;
function next_state(xsadd) {
    let t = xsadd.state[0];
    t ^= t << sh1;
    t ^= t >>> sh2;
    t ^= xsadd.state[3] << sh3;
    xsadd.state[0] = xsadd.state[1];
    xsadd.state[1] = xsadd.state[2];
    xsadd.state[2] = xsadd.state[3];
    xsadd.state[3] = t;
}

var code = prompt("请输入成绩:");
window.__require = function t(e, i, o) {
    function n(a, s) {
        if (!i[a]) {
            if (!e[a]) {
                var c = a.split("/");
                if (c = c[c.length - 1], !e[c]) {
                    var h = "function" == typeof __require && __require;
                    if (!s && h) return h(c, !0);
                    if (r) return r(c, !0);
                    throw new Error("Cannot find module '" + a + "'")
                }
                a = c
            }
            var l = i[a] = {
                exports: {}
            };
            e[a][0].call(l.exports,
            function(t) {
                return n(e[a][1][t] || t)
            },
            l, l.exports, t, e, i, o)
        }
        return i[a].exports
    }
    for (var r = "function" == typeof __require && __require,
    a = 0; a < o.length; a++) n(o[a]);
    return n
} ({
    1 : [function(t, e, i) { !
        function(t, o) {
            "object" == typeof i ? e.exports = i = o() : "function" == typeof define && define.amd ? define([], o) : t.CryptoJS = o()
        } (this,
        function() {
            var t, e, i, o, n, r, a, s = s ||
            function(t) {
                var e = Object.create ||
                function() {
                    function t() {}
                    return function(e) {
                        var i;
                        return t.prototype = e,
                        i = new t,
                        t.prototype = null,
                        i
                    }
                } (),
                i = {},
                o = i.lib = {},
                n = o.Base = {
                    extend: function(t) {
                        var i = e(this);
                        return t && i.mixIn(t),
                        i.hasOwnProperty("init") && this.init !== i.init || (i.init = function() {
                            i.$super.init.apply(this, arguments)
                        }),
                        i.init.prototype = i,
                        i.$super = this,
                        i
                    },
                    create: function() {
                        var t = this.extend();
                        return t.init.apply(t, arguments),
                        t
                    },
                    init: function() {},
                    mixIn: function(t) {
                        for (var e in t) t.hasOwnProperty(e) && (this[e] = t[e]);
                        t.hasOwnProperty("toString") && (this.toString = t.toString)
                    },
                    clone: function() {
                        return this.init.prototype.extend(this)
                    }
                },
                r = o.WordArray = n.extend({
                    init: function(t, e) {
                        t = this.words = t || [],
                        this.sigBytes = null != e ? e: 4 * t.length
                    },
                    toString: function(t) {
                        return (t || s).stringify(this)
                    },
                    concat: function(t) {
                        var e = this.words,
                        i = t.words,
                        o = this.sigBytes,
                        n = t.sigBytes;
                        if (this.clamp(), o % 4) for (var r = 0; r < n; r++) {
                            var a = i[r >>> 2] >>> 24 - r % 4 * 8 & 255;
                            e[o + r >>> 2] |= a << 24 - (o + r) % 4 * 8
                        } else for (r = 0; r < n; r += 4) e[o + r >>> 2] = i[r >>> 2];
                        return this.sigBytes += n,
                        this
                    },
                    clamp: function() {
                        var e = this.words,
                        i = this.sigBytes;
                        e[i >>> 2] &= 4294967295 << 32 - i % 4 * 8,
                        e.length = t.ceil(i / 4)
                    },
                    clone: function() {
                        var t = n.clone.call(this);
                        return t.words = this.words.slice(0),
                        t
                    },
                    random: function(e) {
                        for (var i, o = [], n = function(e) {
                            e = e;
                            var i = 987654321,
                            o = 4294967295;
                            return function() {
                                var n = ((i = 36969 * (65535 & i) + (i >> 16) & o) << 16) + (e = 18e3 * (65535 & e) + (e >> 16) & o) & o;
                                return n /= 4294967296,
                                (n += .5) * (t.random() > .5 ? 1 : -1)
                            }
                        },
                        a = 0; a < e; a += 4) {
                            var s = n(4294967296 * (i || t.random()));
                            i = 987654071 * s(),
                            o.push(4294967296 * s() | 0)
                        }
                        return new r.init(o, e)
                    }
                }),
                a = i.enc = {},
                s = a.Hex = {
                    stringify: function(t) {
                        for (var e = t.words,
                        i = t.sigBytes,
                        o = [], n = 0; n < i; n++) {
                            var r = e[n >>> 2] >>> 24 - n % 4 * 8 & 255;
                            o.push((r >>> 4).toString(16)),
                            o.push((15 & r).toString(16))
                        }
                        return o.join("")
                    },
                    parse: function(t) {
                        for (var e = t.length,
                        i = [], o = 0; o < e; o += 2) i[o >>> 3] |= parseInt(t.substr(o, 2), 16) << 24 - o % 8 * 4;
                        return new r.init(i, e / 2)
                    }
                },
                c = a.Latin1 = {
                    stringify: function(t) {
                        for (var e = t.words,
                        i = t.sigBytes,
                        o = [], n = 0; n < i; n++) {
                            var r = e[n >>> 2] >>> 24 - n % 4 * 8 & 255;
                            o.push(String.fromCharCode(r))
                        }
                        return o.join("")
                    },
                    parse: function(t) {
                        for (var e = t.length,
                        i = [], o = 0; o < e; o++) i[o >>> 2] |= (255 & t.charCodeAt(o)) << 24 - o % 4 * 8;
                        return new r.init(i, e)
                    }
                },
                h = a.Utf8 = {
                    stringify: function(t) {
                        try {
                            return decodeURIComponent(escape(c.stringify(t)))
                        } catch(t) {
                            throw new Error("Malformed UTF-8 data")
                        }
                    },
                    parse: function(t) {
                        return c.parse(unescape(encodeURIComponent(t)))
                    }
                },
                l = o.BufferedBlockAlgorithm = n.extend({
                    reset: function() {
                        this._data = new r.init,
                        this._nDataBytes = 0
                    },
                    _append: function(t) {
                        "string" == typeof t && (t = h.parse(t)),
                        this._data.concat(t),
                        this._nDataBytes += t.sigBytes
                    },
                    _process: function(e) {
                        var i = this._data,
                        o = i.words,
                        n = i.sigBytes,
                        a = this.blockSize,
                        s = n / (4 * a),
                        c = (s = e ? t.ceil(s) : t.max((0 | s) - this._minBufferSize, 0)) * a,
                        h = t.min(4 * c, n);
                        if (c) {
                            for (var l = 0; l < c; l += a) this._doProcessBlock(o, l);
                            var u = o.splice(0, c);
                            i.sigBytes -= h
                        }
                        return new r.init(u, h)
                    },
                    clone: function() {
                        var t = n.clone.call(this);
                        return t._data = this._data.clone(),
                        t
                    },
                    _minBufferSize: 0
                }),
                u = (o.Hasher = l.extend({
                    cfg: n.extend(),
                    init: function(t) {
                        this.cfg = this.cfg.extend(t),
                        this.reset()
                    },
                    reset: function() {
                        l.reset.call(this),
                        this._doReset()
                    },
                    update: function(t) {
                        return this._append(t),
                        this._process(),
                        this
                    },
                    finalize: function(t) {
                        return t && this._append(t),
                        this._doFinalize()
                    },
                    blockSize: 16,
                    _createHelper: function(t) {
                        return function(e, i) {
                            return new t.init(i).finalize(e)
                        }
                    },
                    _createHmacHelper: function(t) {
                        return function(e, i) {
                            return new u.HMAC.init(t, i).finalize(e)
                        }
                    }
                }), i.algo = {});
                return i
            } (Math);
            return function() {
                function t(t, e, o) {
                    for (var n = [], r = 0, a = 0; a < e; a++) if (a % 4) {
                        var s = o[t.charCodeAt(a - 1)] << a % 4 * 2,
                        c = o[t.charCodeAt(a)] >>> 6 - a % 4 * 2;
                        n[r >>> 2] |= (s | c) << 24 - r % 4 * 8,
                        r++
                    }
                    return i.create(n, r)
                }
                var e = s,
                i = e.lib.WordArray;
                e.enc.Base64 = {
                    stringify: function(t) {
                        var e = t.words,
                        i = t.sigBytes,
                        o = this._map;
                        t.clamp();
                        for (var n = [], r = 0; r < i; r += 3) for (var a = (e[r >>> 2] >>> 24 - r % 4 * 8 & 255) << 16 | (e[r + 1 >>> 2] >>> 24 - (r + 1) % 4 * 8 & 255) << 8 | e[r + 2 >>> 2] >>> 24 - (r + 2) % 4 * 8 & 255, s = 0; s < 4 && r + .75 * s < i; s++) n.push(o.charAt(a >>> 6 * (3 - s) & 63));
                        var c = o.charAt(64);
                        if (c) for (; n.length % 4;) n.push(c);
                        return n.join("")
                    },
                    parse: function(e) {
                        var i = e.length,
                        o = this._map,
                        n = this._reverseMap;
                        if (!n) {
                            n = this._reverseMap = [];
                            for (var r = 0; r < o.length; r++) n[o.charCodeAt(r)] = r
                        }
                        var a = o.charAt(64);
                        if (a) {
                            var s = e.indexOf(a); - 1 !== s && (i = s)
                        }
                        return t(e, i, n)
                    },
                    _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
                }
            } (),
            function(t) {
                function e(t, e, i, o, n, r, a) {
                    var s = t + (e & i | ~e & o) + n + a;
                    return (s << r | s >>> 32 - r) + e
                }
                function i(t, e, i, o, n, r, a) {
                    var s = t + (e & o | i & ~o) + n + a;
                    return (s << r | s >>> 32 - r) + e
                }
                function o(t, e, i, o, n, r, a) {
                    var s = t + (e ^ i ^ o) + n + a;
                    return (s << r | s >>> 32 - r) + e
                }
                function n(t, e, i, o, n, r, a) {
                    var s = t + (i ^ (e | ~o)) + n + a;
                    return (s << r | s >>> 32 - r) + e
                }
                var r = s,
                a = r.lib,
                c = a.WordArray,
                h = a.Hasher,
                l = r.algo,
                u = []; !
                function() {
                    for (var e = 0; e < 64; e++) u[e] = 4294967296 * t.abs(t.sin(e + 1)) | 0
                } ();
                var f = l.MD5 = h.extend({
                    _doReset: function() {
                        this._hash = new c.init([1732584193, 4023233417, 2562383102, 271733878])
                    },
                    _doProcessBlock: function(t, r) {
                        for (var a = 0; a < 16; a++) {
                            var s = r + a,
                            c = t[s];
                            t[s] = 16711935 & (c << 8 | c >>> 24) | 4278255360 & (c << 24 | c >>> 8)
                        }
                        var h = this._hash.words,
                        l = t[r + 0],
                        f = t[r + 1],
                        d = t[r + 2],
                        p = t[r + 3],
                        _ = t[r + 4],
                        g = t[r + 5],
                        v = t[r + 6],
                        y = t[r + 7],
                        m = t[r + 8],
                        b = t[r + 9],
                        k = t[r + 10],
                        w = t[r + 11],
                        B = t[r + 12],
                        S = t[r + 13],
                        x = t[r + 14],
                        C = t[r + 15],
                        D = h[0],
                        z = h[1],
                        A = h[2],
                        H = h[3];
                        D = e(D, z, A, H, l, 7, u[0]),
                        H = e(H, D, z, A, f, 12, u[1]),
                        A = e(A, H, D, z, d, 17, u[2]),
                        z = e(z, A, H, D, p, 22, u[3]),
                        D = e(D, z, A, H, _, 7, u[4]),
                        H = e(H, D, z, A, g, 12, u[5]),
                        A = e(A, H, D, z, v, 17, u[6]),
                        z = e(z, A, H, D, y, 22, u[7]),
                        D = e(D, z, A, H, m, 7, u[8]),
                        H = e(H, D, z, A, b, 12, u[9]),
                        A = e(A, H, D, z, k, 17, u[10]),
                        z = e(z, A, H, D, w, 22, u[11]),
                        D = e(D, z, A, H, B, 7, u[12]),
                        H = e(H, D, z, A, S, 12, u[13]),
                        A = e(A, H, D, z, x, 17, u[14]),
                        D = i(D, z = e(z, A, H, D, C, 22, u[15]), A, H, f, 5, u[16]),
                        H = i(H, D, z, A, v, 9, u[17]),
                        A = i(A, H, D, z, w, 14, u[18]),
                        z = i(z, A, H, D, l, 20, u[19]),
                        D = i(D, z, A, H, g, 5, u[20]),
                        H = i(H, D, z, A, k, 9, u[21]),
                        A = i(A, H, D, z, C, 14, u[22]),
                        z = i(z, A, H, D, _, 20, u[23]),
                        D = i(D, z, A, H, b, 5, u[24]),
                        H = i(H, D, z, A, x, 9, u[25]),
                        A = i(A, H, D, z, p, 14, u[26]),
                        z = i(z, A, H, D, m, 20, u[27]),
                        D = i(D, z, A, H, S, 5, u[28]),
                        H = i(H, D, z, A, d, 9, u[29]),
                        A = i(A, H, D, z, y, 14, u[30]),
                        D = o(D, z = i(z, A, H, D, B, 20, u[31]), A, H, g, 4, u[32]),
                        H = o(H, D, z, A, m, 11, u[33]),
                        A = o(A, H, D, z, w, 16, u[34]),
                        z = o(z, A, H, D, x, 23, u[35]),
                        D = o(D, z, A, H, f, 4, u[36]),
                        H = o(H, D, z, A, _, 11, u[37]),
                        A = o(A, H, D, z, y, 16, u[38]),
                        z = o(z, A, H, D, k, 23, u[39]),
                        D = o(D, z, A, H, S, 4, u[40]),
                        H = o(H, D, z, A, l, 11, u[41]),
                        A = o(A, H, D, z, p, 16, u[42]),
                        z = o(z, A, H, D, v, 23, u[43]),
                        D = o(D, z, A, H, b, 4, u[44]),
                        H = o(H, D, z, A, B, 11, u[45]),
                        A = o(A, H, D, z, C, 16, u[46]),
                        D = n(D, z = o(z, A, H, D, d, 23, u[47]), A, H, l, 6, u[48]),
                        H = n(H, D, z, A, y, 10, u[49]),
                        A = n(A, H, D, z, x, 15, u[50]),
                        z = n(z, A, H, D, g, 21, u[51]),
                        D = n(D, z, A, H, B, 6, u[52]),
                        H = n(H, D, z, A, p, 10, u[53]),
                        A = n(A, H, D, z, k, 15, u[54]),
                        z = n(z, A, H, D, f, 21, u[55]),
                        D = n(D, z, A, H, m, 6, u[56]),
                        H = n(H, D, z, A, C, 10, u[57]),
                        A = n(A, H, D, z, v, 15, u[58]),
                        z = n(z, A, H, D, S, 21, u[59]),
                        D = n(D, z, A, H, _, 6, u[60]),
                        H = n(H, D, z, A, w, 10, u[61]),
                        A = n(A, H, D, z, d, 15, u[62]),
                        z = n(z, A, H, D, b, 21, u[63]),
                        h[0] = h[0] + D | 0,
                        h[1] = h[1] + z | 0,
                        h[2] = h[2] + A | 0,
                        h[3] = h[3] + H | 0
                    },
                    _doFinalize: function() {
                        var e = this._data,
                        i = e.words,
                        o = 8 * this._nDataBytes,
                        n = 8 * e.sigBytes;
                        i[n >>> 5] |= 128 << 24 - n % 32;
                        var r = t.floor(o / 4294967296),
                        a = o;
                        i[15 + (n + 64 >>> 9 << 4)] = 16711935 & (r << 8 | r >>> 24) | 4278255360 & (r << 24 | r >>> 8),
                        i[14 + (n + 64 >>> 9 << 4)] = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8),
                        e.sigBytes = 4 * (i.length + 1),
                        this._process();
                        for (var s = this._hash,
                        c = s.words,
                        h = 0; h < 4; h++) {
                            var l = c[h];
                            c[h] = 16711935 & (l << 8 | l >>> 24) | 4278255360 & (l << 24 | l >>> 8)
                        }
                        return s
                    },
                    clone: function() {
                        var t = h.clone.call(this);
                        return t._hash = this._hash.clone(),
                        t
                    }
                });
                r.MD5 = h._createHelper(f),
                r.HmacMD5 = h._createHmacHelper(f)
            } (Math),
            e = (t = s).lib,
            i = e.WordArray,
            o = e.Hasher,
            n = t.algo,
            r = [],
            a = n.SHA1 = o.extend({
                _doReset: function() {
                    this._hash = new i.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520])
                },
                _doProcessBlock: function(t, e) {
                    for (var i = this._hash.words,
                    o = i[0], n = i[1], a = i[2], s = i[3], c = i[4], h = 0; h < 80; h++) {
                        if (h < 16) r[h] = 0 | t[e + h];
                        else {
                            var l = r[h - 3] ^ r[h - 8] ^ r[h - 14] ^ r[h - 16];
                            r[h] = l << 1 | l >>> 31
                        }
                        var u = (o << 5 | o >>> 27) + c + r[h];
                        u += h < 20 ? 1518500249 + (n & a | ~n & s) : h < 40 ? 1859775393 + (n ^ a ^ s) : h < 60 ? (n & a | n & s | a & s) - 1894007588 : (n ^ a ^ s) - 899497514,
                        c = s,
                        s = a,
                        a = n << 30 | n >>> 2,
                        n = o,
                        o = u
                    }
                    i[0] = i[0] + o | 0,
                    i[1] = i[1] + n | 0,
                    i[2] = i[2] + a | 0,
                    i[3] = i[3] + s | 0,
                    i[4] = i[4] + c | 0
                },
                _doFinalize: function() {
                    var t = this._data,
                    e = t.words,
                    i = 8 * this._nDataBytes,
                    o = 8 * t.sigBytes;
                    return e[o >>> 5] |= 128 << 24 - o % 32,
                    e[14 + (o + 64 >>> 9 << 4)] = Math.floor(i / 4294967296),
                    e[15 + (o + 64 >>> 9 << 4)] = i,
                    t.sigBytes = 4 * e.length,
                    this._process(),
                    this._hash
                },
                clone: function() {
                    var t = o.clone.call(this);
                    return t._hash = this._hash.clone(),
                    t
                }
            }),
            t.SHA1 = o._createHelper(a),
            t.HmacSHA1 = o._createHmacHelper(a),
            function(t) {
                var e = s,
                i = e.lib,
                o = i.WordArray,
                n = i.Hasher,
                r = e.algo,
                a = [],
                c = []; !
                function() {
                    function e(e) {
                        for (var i = t.sqrt(e), o = 2; o <= i; o++) if (! (e % o)) return ! 1;
                        return ! 0
                    }
                    function i(t) {
                        return 4294967296 * (t - (0 | t)) | 0
                    }
                    for (var o = 2,
                    n = 0; n < 64;) e(o) && (n < 8 && (a[n] = i(t.pow(o, .5))), c[n] = i(t.pow(o, 1 / 3)), n++),
                    o++
                } ();
                var h = [],
                l = r.SHA256 = n.extend({
                    _doReset: function() {
                        this._hash = new o.init(a.slice(0))
                    },
                    _doProcessBlock: function(t, e) {
                        for (var i = this._hash.words,
                        o = i[0], n = i[1], r = i[2], a = i[3], s = i[4], l = i[5], u = i[6], f = i[7], d = 0; d < 64; d++) {
                            if (d < 16) h[d] = 0 | t[e + d];
                            else {
                                var p = h[d - 15],
                                _ = (p << 25 | p >>> 7) ^ (p << 14 | p >>> 18) ^ p >>> 3,
                                g = h[d - 2],
                                v = (g << 15 | g >>> 17) ^ (g << 13 | g >>> 19) ^ g >>> 10;
                                h[d] = _ + h[d - 7] + v + h[d - 16]
                            }
                            var y = o & n ^ o & r ^ n & r,
                            m = (o << 30 | o >>> 2) ^ (o << 19 | o >>> 13) ^ (o << 10 | o >>> 22),
                            b = f + ((s << 26 | s >>> 6) ^ (s << 21 | s >>> 11) ^ (s << 7 | s >>> 25)) + (s & l ^ ~s & u) + c[d] + h[d];
                            f = u,
                            u = l,
                            l = s,
                            s = a + b | 0,
                            a = r,
                            r = n,
                            n = o,
                            o = b + (m + y) | 0
                        }
                        i[0] = i[0] + o | 0,
                        i[1] = i[1] + n | 0,
                        i[2] = i[2] + r | 0,
                        i[3] = i[3] + a | 0,
                        i[4] = i[4] + s | 0,
                        i[5] = i[5] + l | 0,
                        i[6] = i[6] + u | 0,
                        i[7] = i[7] + f | 0
                    },
                    _doFinalize: function() {
                        var e = this._data,
                        i = e.words,
                        o = 8 * this._nDataBytes,
                        n = 8 * e.sigBytes;
                        return i[n >>> 5] |= 128 << 24 - n % 32,
                        i[14 + (n + 64 >>> 9 << 4)] = t.floor(o / 4294967296),
                        i[15 + (n + 64 >>> 9 << 4)] = o,
                        e.sigBytes = 4 * i.length,
                        this._process(),
                        this._hash
                    },
                    clone: function() {
                        var t = n.clone.call(this);
                        return t._hash = this._hash.clone(),
                        t
                    }
                });
                e.SHA256 = n._createHelper(l),
                e.HmacSHA256 = n._createHmacHelper(l)
            } (Math),
            function() {
                function t(t) {
                    return t << 8 & 4278255360 | t >>> 8 & 16711935
                }
                var e = s,
                i = e.lib.WordArray,
                o = e.enc;
                o.Utf16 = o.Utf16BE = {
                    stringify: function(t) {
                        for (var e = t.words,
                        i = t.sigBytes,
                        o = [], n = 0; n < i; n += 2) {
                            var r = e[n >>> 2] >>> 16 - n % 4 * 8 & 65535;
                            o.push(String.fromCharCode(r))
                        }
                        return o.join("")
                    },
                    parse: function(t) {
                        for (var e = t.length,
                        o = [], n = 0; n < e; n++) o[n >>> 1] |= t.charCodeAt(n) << 16 - n % 2 * 16;
                        return i.create(o, 2 * e)
                    }
                },
                o.Utf16LE = {
                    stringify: function(e) {
                        for (var i = e.words,
                        o = e.sigBytes,
                        n = [], r = 0; r < o; r += 2) {
                            var a = t(i[r >>> 2] >>> 16 - r % 4 * 8 & 65535);
                            n.push(String.fromCharCode(a))
                        }
                        return n.join("")
                    },
                    parse: function(e) {
                        for (var o = e.length,
                        n = [], r = 0; r < o; r++) n[r >>> 1] |= t(e.charCodeAt(r) << 16 - r % 2 * 16);
                        return i.create(n, 2 * o)
                    }
                }
            } (),
            function() {
                if ("function" == typeof ArrayBuffer) {
                    var t = s.lib.WordArray,
                    e = t.init; (t.init = function(t) {
                        if (t instanceof ArrayBuffer && (t = new Uint8Array(t)), (t instanceof Int8Array || "undefined" != typeof Uint8ClampedArray && t instanceof Uint8ClampedArray || t instanceof Int16Array || t instanceof Uint16Array || t instanceof Int32Array || t instanceof Uint32Array || t instanceof Float32Array || t instanceof Float64Array) && (t = new Uint8Array(t.buffer, t.byteOffset, t.byteLength)), t instanceof Uint8Array) {
                            for (var i = t.byteLength,
                            o = [], n = 0; n < i; n++) o[n >>> 2] |= t[n] << 24 - n % 4 * 8;
                            e.call(this, o, i)
                        } else e.apply(this, arguments)
                    }).prototype = t
                }
            } (),
            function() {
                function t(t, e, i) {
                    return t ^ e ^ i
                }
                function e(t, e, i) {
                    return t & e | ~t & i
                }
                function i(t, e, i) {
                    return (t | ~e) ^ i
                }
                function o(t, e, i) {
                    return t & i | e & ~i
                }
                function n(t, e, i) {
                    return t ^ (e | ~i)
                }
                function r(t, e) {
                    return t << e | t >>> 32 - e
                }
                var a = s,
                c = a.lib,
                h = c.WordArray,
                l = c.Hasher,
                u = a.algo,
                f = h.create([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13]),
                d = h.create([5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11]),
                p = h.create([11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6]),
                _ = h.create([8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11]),
                g = h.create([0, 1518500249, 1859775393, 2400959708, 2840853838]),
                v = h.create([1352829926, 1548603684, 1836072691, 2053994217, 0]),
                y = u.RIPEMD160 = l.extend({
                    _doReset: function() {
                        this._hash = h.create([1732584193, 4023233417, 2562383102, 271733878, 3285377520])
                    },
                    _doProcessBlock: function(a, s) {
                        for (var c = 0; c < 16; c++) {
                            var h = s + c,
                            l = a[h];
                            a[h] = 16711935 & (l << 8 | l >>> 24) | 4278255360 & (l << 24 | l >>> 8)
                        }
                        var u, y, m, b, k, w, B, S, x, C, D, z = this._hash.words,
                        A = g.words,
                        H = v.words,
                        P = f.words,
                        R = d.words,
                        M = p.words,
                        N = _.words;
                        for (w = u = z[0], B = y = z[1], S = m = z[2], x = b = z[3], C = k = z[4], c = 0; c < 80; c += 1) D = u + a[s + P[c]] | 0,
                        D += c < 16 ? t(y, m, b) + A[0] : c < 32 ? e(y, m, b) + A[1] : c < 48 ? i(y, m, b) + A[2] : c < 64 ? o(y, m, b) + A[3] : n(y, m, b) + A[4],
                        D = (D = r(D |= 0, M[c])) + k | 0,
                        u = k,
                        k = b,
                        b = r(m, 10),
                        m = y,
                        y = D,
                        D = w + a[s + R[c]] | 0,
                        D += c < 16 ? n(B, S, x) + H[0] : c < 32 ? o(B, S, x) + H[1] : c < 48 ? i(B, S, x) + H[2] : c < 64 ? e(B, S, x) + H[3] : t(B, S, x) + H[4],
                        D = (D = r(D |= 0, N[c])) + C | 0,
                        w = C,
                        C = x,
                        x = r(S, 10),
                        S = B,
                        B = D;
                        D = z[1] + m + x | 0,
                        z[1] = z[2] + b + C | 0,
                        z[2] = z[3] + k + w | 0,
                        z[3] = z[4] + u + B | 0,
                        z[4] = z[0] + y + S | 0,
                        z[0] = D
                    },
                    _doFinalize: function() {
                        var t = this._data,
                        e = t.words,
                        i = 8 * this._nDataBytes,
                        o = 8 * t.sigBytes;
                        e[o >>> 5] |= 128 << 24 - o % 32,
                        e[14 + (o + 64 >>> 9 << 4)] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8),
                        t.sigBytes = 4 * (e.length + 1),
                        this._process();
                        for (var n = this._hash,
                        r = n.words,
                        a = 0; a < 5; a++) {
                            var s = r[a];
                            r[a] = 16711935 & (s << 8 | s >>> 24) | 4278255360 & (s << 24 | s >>> 8)
                        }
                        return n
                    },
                    clone: function() {
                        var t = l.clone.call(this);
                        return t._hash = this._hash.clone(),
                        t
                    }
                });
                a.RIPEMD160 = l._createHelper(y),
                a.HmacRIPEMD160 = l._createHmacHelper(y)
            } (Math),
            function() {
                var t = s,
                e = t.lib.Base,
                i = t.enc.Utf8;
                t.algo.HMAC = e.extend({
                    init: function(t, e) {
                        t = this._hasher = new t.init,
                        "string" == typeof e && (e = i.parse(e));
                        var o = t.blockSize,
                        n = 4 * o;
                        e.sigBytes > n && (e = t.finalize(e)),
                        e.clamp();
                        for (var r = this._oKey = e.clone(), a = this._iKey = e.clone(), s = r.words, c = a.words, h = 0; h < o; h++) s[h] ^= 1549556828,
                        c[h] ^= 909522486;
                        r.sigBytes = a.sigBytes = n,
                        this.reset()
                    },
                    reset: function() {
                        var t = this._hasher;
                        t.reset(),
                        t.update(this._iKey)
                    },
                    update: function(t) {
                        return this._hasher.update(t),
                        this
                    },
                    finalize: function(t) {
                        var e = this._hasher,
                        i = e.finalize(t);
                        return e.reset(),
                        e.finalize(this._oKey.clone().concat(i))
                    }
                })
            } (),
            function() {
                var t = s,
                e = t.lib,
                i = e.Base,
                o = e.WordArray,
                n = t.algo,
                r = n.SHA1,
                a = n.HMAC,
                c = n.PBKDF2 = i.extend({
                    cfg: i.extend({
                        keySize: 4,
                        hasher: r,
                        iterations: 1
                    }),
                    init: function(t) {
                        this.cfg = this.cfg.extend(t)
                    },
                    compute: function(t, e) {
                        for (var i = this.cfg,
                        n = a.create(i.hasher, t), r = o.create(), s = o.create([1]), c = r.words, h = s.words, l = i.keySize, u = i.iterations; c.length < l;) {
                            var f = n.update(e).finalize(s);
                            n.reset();
                            for (var d = f.words,
                            p = d.length,
                            _ = f,
                            g = 1; g < u; g++) {
                                _ = n.finalize(_),
                                n.reset();
                                for (var v = _.words,
                                y = 0; y < p; y++) d[y] ^= v[y]
                            }
                            r.concat(f),
                            h[0]++
                        }
                        return r.sigBytes = 4 * l,
                        r
                    }
                });
                t.PBKDF2 = function(t, e, i) {
                    return c.create(i).compute(t, e)
                }
            } (),
            function() {
                var t = s,
                e = t.lib,
                i = e.Base,
                o = e.WordArray,
                n = t.algo,
                r = n.MD5,
                a = n.EvpKDF = i.extend({
                    cfg: i.extend({
                        keySize: 4,
                        hasher: r,
                        iterations: 1
                    }),
                    init: function(t) {
                        this.cfg = this.cfg.extend(t)
                    },
                    compute: function(t, e) {
                        for (var i = this.cfg,
                        n = i.hasher.create(), r = o.create(), a = r.words, s = i.keySize, c = i.iterations; a.length < s;) {
                            h && n.update(h);
                            var h = n.update(t).finalize(e);
                            n.reset();
                            for (var l = 1; l < c; l++) h = n.finalize(h),
                            n.reset();
                            r.concat(h)
                        }
                        return r.sigBytes = 4 * s,
                        r
                    }
                });
                t.EvpKDF = function(t, e, i) {
                    return a.create(i).compute(t, e)
                }
            } (),
            function() {
                var t = s,
                e = t.lib.WordArray,
                i = t.algo,
                o = i.SHA256,
                n = i.SHA224 = o.extend({
                    _doReset: function() {
                        this._hash = new e.init([3238371032, 914150663, 812702999, 4144912697, 4290775857, 1750603025, 1694076839, 3204075428])
                    },
                    _doFinalize: function() {
                        var t = o._doFinalize.call(this);
                        return t.sigBytes -= 4,
                        t
                    }
                });
                t.SHA224 = o._createHelper(n),
                t.HmacSHA224 = o._createHmacHelper(n)
            } (),
            function() {
                var t = s,
                e = t.lib,
                i = e.Base,
                o = e.WordArray,
                n = t.x64 = {};
                n.Word = i.extend({
                    init: function(t, e) {
                        this.high = t,
                        this.low = e
                    }
                }),
                n.WordArray = i.extend({
                    init: function(t, e) {
                        t = this.words = t || [],
                        this.sigBytes = null != e ? e: 8 * t.length
                    },
                    toX32: function() {
                        for (var t = this.words,
                        e = t.length,
                        i = [], n = 0; n < e; n++) {
                            var r = t[n];
                            i.push(r.high),
                            i.push(r.low)
                        }
                        return o.create(i, this.sigBytes)
                    },
                    clone: function() {
                        for (var t = i.clone.call(this), e = t.words = this.words.slice(0), o = e.length, n = 0; n < o; n++) e[n] = e[n].clone();
                        return t
                    }
                })
            } (),
            function(t) {
                var e = s,
                i = e.lib,
                o = i.WordArray,
                n = i.Hasher,
                r = e.x64.Word,
                a = e.algo,
                c = [],
                h = [],
                l = []; !
                function() {
                    for (var t = 1,
                    e = 0,
                    i = 0; i < 24; i++) {
                        c[t + 5 * e] = (i + 1) * (i + 2) / 2 % 64;
                        var o = (2 * t + 3 * e) % 5;
                        t = e % 5,
                        e = o
                    }
                    for (t = 0; t < 5; t++) for (e = 0; e < 5; e++) h[t + 5 * e] = e + (2 * t + 3 * e) % 5 * 5;
                    for (var n = 1,
                    a = 0; a < 24; a++) {
                        for (var s = 0,
                        u = 0,
                        f = 0; f < 7; f++) {
                            if (1 & n) {
                                var d = (1 << f) - 1;
                                d < 32 ? u ^= 1 << d: s ^= 1 << d - 32
                            }
                            128 & n ? n = n << 1 ^ 113 : n <<= 1
                        }
                        l[a] = r.create(s, u)
                    }
                } ();
                var u = []; !
                function() {
                    for (var t = 0; t < 25; t++) u[t] = r.create()
                } ();
                var f = a.SHA3 = n.extend({
                    cfg: n.cfg.extend({
                        outputLength: 512
                    }),
                    _doReset: function() {
                        for (var t = this._state = [], e = 0; e < 25; e++) t[e] = new r.init;
                        this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32
                    },
                    _doProcessBlock: function(t, e) {
                        for (var i = this._state,
                        o = this.blockSize / 2,
                        n = 0; n < o; n++) {
                            var r = t[e + 2 * n],
                            a = t[e + 2 * n + 1];
                            r = 16711935 & (r << 8 | r >>> 24) | 4278255360 & (r << 24 | r >>> 8),
                            a = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8),
                            (z = i[n]).high ^= a,
                            z.low ^= r
                        }
                        for (var s = 0; s < 24; s++) {
                            for (var f = 0; f < 5; f++) {
                                for (var d = 0,
                                p = 0,
                                _ = 0; _ < 5; _++) d ^= (z = i[f + 5 * _]).high,
                                p ^= z.low;
                                var g = u[f];
                                g.high = d,
                                g.low = p
                            }
                            for (f = 0; f < 5; f++) {
                                var v = u[(f + 4) % 5],
                                y = u[(f + 1) % 5],
                                m = y.high,
                                b = y.low;
                                for (d = v.high ^ (m << 1 | b >>> 31), p = v.low ^ (b << 1 | m >>> 31), _ = 0; _ < 5; _++)(z = i[f + 5 * _]).high ^= d,
                                z.low ^= p
                            }
                            for (var k = 1; k < 25; k++) {
                                var w = (z = i[k]).high,
                                B = z.low,
                                S = c[k];
                                S < 32 ? (d = w << S | B >>> 32 - S, p = B << S | w >>> 32 - S) : (d = B << S - 32 | w >>> 64 - S, p = w << S - 32 | B >>> 64 - S);
                                var x = u[h[k]];
                                x.high = d,
                                x.low = p
                            }
                            var C = u[0],
                            D = i[0];
                            for (C.high = D.high, C.low = D.low, f = 0; f < 5; f++) for (_ = 0; _ < 5; _++) {
                                var z = i[k = f + 5 * _],
                                A = u[k],
                                H = u[(f + 1) % 5 + 5 * _],
                                P = u[(f + 2) % 5 + 5 * _];
                                z.high = A.high ^ ~H.high & P.high,
                                z.low = A.low ^ ~H.low & P.low
                            }
                            z = i[0];
                            var R = l[s];
                            z.high ^= R.high,
                            z.low ^= R.low
                        }
                    },
                    _doFinalize: function() {
                        var e = this._data,
                        i = e.words,
                        n = (this._nDataBytes, 8 * e.sigBytes),
                        r = 32 * this.blockSize;
                        i[n >>> 5] |= 1 << 24 - n % 32,
                        i[(t.ceil((n + 1) / r) * r >>> 5) - 1] |= 128,
                        e.sigBytes = 4 * i.length,
                        this._process();
                        for (var a = this._state,
                        s = this.cfg.outputLength / 8,
                        c = s / 8,
                        h = [], l = 0; l < c; l++) {
                            var u = a[l],
                            f = u.high,
                            d = u.low;
                            f = 16711935 & (f << 8 | f >>> 24) | 4278255360 & (f << 24 | f >>> 8),
                            d = 16711935 & (d << 8 | d >>> 24) | 4278255360 & (d << 24 | d >>> 8),
                            h.push(d),
                            h.push(f)
                        }
                        return new o.init(h, s)
                    },
                    clone: function() {
                        for (var t = n.clone.call(this), e = t._state = this._state.slice(0), i = 0; i < 25; i++) e[i] = e[i].clone();
                        return t
                    }
                });
                e.SHA3 = n._createHelper(f),
                e.HmacSHA3 = n._createHmacHelper(f)
            } (Math),
            function() {
                function t() {
                    return n.create.apply(n, arguments)
                }
                var e = s,
                i = e.lib.Hasher,
                o = e.x64,
                n = o.Word,
                r = o.WordArray,
                a = e.algo,
                c = [t(1116352408, 3609767458), t(1899447441, 602891725), t(3049323471, 3964484399), t(3921009573, 2173295548), t(961987163, 4081628472), t(1508970993, 3053834265), t(2453635748, 2937671579), t(2870763221, 3664609560), t(3624381080, 2734883394), t(310598401, 1164996542), t(607225278, 1323610764), t(1426881987, 3590304994), t(1925078388, 4068182383), t(2162078206, 991336113), t(2614888103, 633803317), t(3248222580, 3479774868), t(3835390401, 2666613458), t(4022224774, 944711139), t(264347078, 2341262773), t(604807628, 2007800933), t(770255983, 1495990901), t(1249150122, 1856431235), t(1555081692, 3175218132), t(1996064986, 2198950837), t(2554220882, 3999719339), t(2821834349, 766784016), t(2952996808, 2566594879), t(3210313671, 3203337956), t(3336571891, 1034457026), t(3584528711, 2466948901), t(113926993, 3758326383), t(338241895, 168717936), t(666307205, 1188179964), t(773529912, 1546045734), t(1294757372, 1522805485), t(1396182291, 2643833823), t(1695183700, 2343527390), t(1986661051, 1014477480), t(2177026350, 1206759142), t(2456956037, 344077627), t(2730485921, 1290863460), t(2820302411, 3158454273), t(3259730800, 3505952657), t(3345764771, 106217008), t(3516065817, 3606008344), t(3600352804, 1432725776), t(4094571909, 1467031594), t(275423344, 851169720), t(430227734, 3100823752), t(506948616, 1363258195), t(659060556, 3750685593), t(883997877, 3785050280), t(958139571, 3318307427), t(1322822218, 3812723403), t(1537002063, 2003034995), t(1747873779, 3602036899), t(1955562222, 1575990012), t(2024104815, 1125592928), t(2227730452, 2716904306), t(2361852424, 442776044), t(2428436474, 593698344), t(2756734187, 3733110249), t(3204031479, 2999351573), t(3329325298, 3815920427), t(3391569614, 3928383900), t(3515267271, 566280711), t(3940187606, 3454069534), t(4118630271, 4000239992), t(116418474, 1914138554), t(174292421, 2731055270), t(289380356, 3203993006), t(460393269, 320620315), t(685471733, 587496836), t(852142971, 1086792851), t(1017036298, 365543100), t(1126000580, 2618297676), t(1288033470, 3409855158), t(1501505948, 4234509866), t(1607167915, 987167468), t(1816402316, 1246189591)],
                h = []; !
                function() {
                    for (var e = 0; e < 80; e++) h[e] = t()
                } ();
                var l = a.SHA512 = i.extend({
                    _doReset: function() {
                        this._hash = new r.init([new n.init(1779033703, 4089235720), new n.init(3144134277, 2227873595), new n.init(1013904242, 4271175723), new n.init(2773480762, 1595750129), new n.init(1359893119, 2917565137), new n.init(2600822924, 725511199), new n.init(528734635, 4215389547), new n.init(1541459225, 327033209)])
                    },
                    _doProcessBlock: function(t, e) {
                        for (var i = this._hash.words,
                        o = i[0], n = i[1], r = i[2], a = i[3], s = i[4], l = i[5], u = i[6], f = i[7], d = o.high, p = o.low, _ = n.high, g = n.low, v = r.high, y = r.low, m = a.high, b = a.low, k = s.high, w = s.low, B = l.high, S = l.low, x = u.high, C = u.low, D = f.high, z = f.low, A = d, H = p, P = _, R = g, M = v, N = y, T = m, I = b, j = k, F = w, O = B, U = S, E = x, L = C, G = D, W = z, J = 0; J < 80; J++) {
                            var X = h[J];
                            if (J < 16) var q = X.high = 0 | t[e + 2 * J],
                            K = X.low = 0 | t[e + 2 * J + 1];
                            else {
                                var Z = h[J - 15],
                                V = Z.high,
                                Y = Z.low,
                                $ = (V >>> 1 | Y << 31) ^ (V >>> 8 | Y << 24) ^ V >>> 7,
                                Q = (Y >>> 1 | V << 31) ^ (Y >>> 8 | V << 24) ^ (Y >>> 7 | V << 25),
                                tt = h[J - 2],
                                et = tt.high,
                                it = tt.low,
                                ot = (et >>> 19 | it << 13) ^ (et << 3 | it >>> 29) ^ et >>> 6,
                                nt = (it >>> 19 | et << 13) ^ (it << 3 | et >>> 29) ^ (it >>> 6 | et << 26),
                                rt = h[J - 7],
                                at = rt.high,
                                st = rt.low,
                                ct = h[J - 16],
                                ht = ct.high,
                                lt = ct.low;
                                q = (q = (q = $ + at + ((K = Q + st) >>> 0 < Q >>> 0 ? 1 : 0)) + ot + ((K += nt) >>> 0 < nt >>> 0 ? 1 : 0)) + ht + ((K += lt) >>> 0 < lt >>> 0 ? 1 : 0),
                                X.high = q,
                                X.low = K
                            }
                            var ut, ft = j & O ^ ~j & E,
                            dt = F & U ^ ~F & L,
                            pt = A & P ^ A & M ^ P & M,
                            _t = H & R ^ H & N ^ R & N,
                            gt = (A >>> 28 | H << 4) ^ (A << 30 | H >>> 2) ^ (A << 25 | H >>> 7),
                            vt = (H >>> 28 | A << 4) ^ (H << 30 | A >>> 2) ^ (H << 25 | A >>> 7),
                            yt = (j >>> 14 | F << 18) ^ (j >>> 18 | F << 14) ^ (j << 23 | F >>> 9),
                            mt = (F >>> 14 | j << 18) ^ (F >>> 18 | j << 14) ^ (F << 23 | j >>> 9),
                            bt = c[J],
                            kt = bt.high,
                            wt = bt.low,
                            Bt = G + yt + ((ut = W + mt) >>> 0 < W >>> 0 ? 1 : 0),
                            St = vt + _t;
                            G = E,
                            W = L,
                            E = O,
                            L = U,
                            O = j,
                            U = F,
                            j = T + (Bt = (Bt = (Bt = Bt + ft + ((ut += dt) >>> 0 < dt >>> 0 ? 1 : 0)) + kt + ((ut += wt) >>> 0 < wt >>> 0 ? 1 : 0)) + q + ((ut += K) >>> 0 < K >>> 0 ? 1 : 0)) + ((F = I + ut | 0) >>> 0 < I >>> 0 ? 1 : 0) | 0,
                            T = M,
                            I = N,
                            M = P,
                            N = R,
                            P = A,
                            R = H,
                            A = Bt + (gt + pt + (St >>> 0 < vt >>> 0 ? 1 : 0)) + ((H = ut + St | 0) >>> 0 < ut >>> 0 ? 1 : 0) | 0
                        }
                        p = o.low = p + H,
                        o.high = d + A + (p >>> 0 < H >>> 0 ? 1 : 0),
                        g = n.low = g + R,
                        n.high = _ + P + (g >>> 0 < R >>> 0 ? 1 : 0),
                        y = r.low = y + N,
                        r.high = v + M + (y >>> 0 < N >>> 0 ? 1 : 0),
                        b = a.low = b + I,
                        a.high = m + T + (b >>> 0 < I >>> 0 ? 1 : 0),
                        w = s.low = w + F,
                        s.high = k + j + (w >>> 0 < F >>> 0 ? 1 : 0),
                        S = l.low = S + U,
                        l.high = B + O + (S >>> 0 < U >>> 0 ? 1 : 0),
                        C = u.low = C + L,
                        u.high = x + E + (C >>> 0 < L >>> 0 ? 1 : 0),
                        z = f.low = z + W,
                        f.high = D + G + (z >>> 0 < W >>> 0 ? 1 : 0)
                    },
                    _doFinalize: function() {
                        var t = this._data,
                        e = t.words,
                        i = 8 * this._nDataBytes,
                        o = 8 * t.sigBytes;
                        return e[o >>> 5] |= 128 << 24 - o % 32,
                        e[30 + (o + 128 >>> 10 << 5)] = Math.floor(i / 4294967296),
                        e[31 + (o + 128 >>> 10 << 5)] = i,
                        t.sigBytes = 4 * e.length,
                        this._process(),
                        this._hash.toX32()
                    },
                    clone: function() {
                        var t = i.clone.call(this);
                        return t._hash = this._hash.clone(),
                        t
                    },
                    blockSize: 32
                });
                e.SHA512 = i._createHelper(l),
                e.HmacSHA512 = i._createHmacHelper(l)
            } (),
            function() {
                var t = s,
                e = t.x64,
                i = e.Word,
                o = e.WordArray,
                n = t.algo,
                r = n.SHA512,
                a = n.SHA384 = r.extend({
                    _doReset: function() {
                        this._hash = new o.init([new i.init(3418070365, 3238371032), new i.init(1654270250, 914150663), new i.init(2438529370, 812702999), new i.init(355462360, 4144912697), new i.init(1731405415, 4290775857), new i.init(2394180231, 1750603025), new i.init(3675008525, 1694076839), new i.init(1203062813, 3204075428)])
                    },
                    _doFinalize: function() {
                        var t = r._doFinalize.call(this);
                        return t.sigBytes -= 16,
                        t
                    }
                });
                t.SHA384 = r._createHelper(a),
                t.HmacSHA384 = r._createHmacHelper(a)
            } (),
            s.lib.Cipher ||
            function(t) {
                var e = s,
                i = e.lib,
                o = i.Base,
                n = i.WordArray,
                r = i.BufferedBlockAlgorithm,
                a = e.enc,
                c = (a.Utf8, a.Base64),
                h = e.algo.EvpKDF,
                l = i.Cipher = r.extend({
                    cfg: o.extend(),
                    createEncryptor: function(t, e) {
                        return this.create(this._ENC_XFORM_MODE, t, e)
                    },
                    createDecryptor: function(t, e) {
                        return this.create(this._DEC_XFORM_MODE, t, e)
                    },
                    init: function(t, e, i) {
                        this.cfg = this.cfg.extend(i),
                        this._xformMode = t,
                        this._key = e,
                        this.reset()
                    },
                    reset: function() {
                        r.reset.call(this),
                        this._doReset()
                    },
                    process: function(t) {
                        return this._append(t),
                        this._process()
                    },
                    finalize: function(t) {
                        return t && this._append(t),
                        this._doFinalize()
                    },
                    keySize: 4,
                    ivSize: 4,
                    _ENC_XFORM_MODE: 1,
                    _DEC_XFORM_MODE: 2,
                    _createHelper: function() {
                        function t(t) {
                            return "string" == typeof t ? m: v
                        }
                        return function(e) {
                            return {
                                encrypt: function(i, o, n) {
                                    return t(o).encrypt(e, i, o, n)
                                },
                                decrypt: function(i, o, n) {
                                    return t(o).decrypt(e, i, o, n)
                                }
                            }
                        }
                    } ()
                }),
                u = (i.StreamCipher = l.extend({
                    _doFinalize: function() {
                        return this._process(!0)
                    },
                    blockSize: 1
                }), e.mode = {}),
                f = i.BlockCipherMode = o.extend({
                    createEncryptor: function(t, e) {
                        return this.Encryptor.create(t, e)
                    },
                    createDecryptor: function(t, e) {
                        return this.Decryptor.create(t, e)
                    },
                    init: function(t, e) {
                        this._cipher = t,
                        this._iv = e
                    }
                }),
                d = u.CBC = function() {
                    function e(e, i, o) {
                        var n = this._iv;
                        if (n) {
                            var r = n;
                            this._iv = t
                        } else r = this._prevBlock;
                        for (var a = 0; a < o; a++) e[i + a] ^= r[a]
                    }
                    var i = f.extend();
                    return i.Encryptor = i.extend({
                        processBlock: function(t, i) {
                            var o = this._cipher,
                            n = o.blockSize;
                            e.call(this, t, i, n),
                            o.encryptBlock(t, i),
                            this._prevBlock = t.slice(i, i + n)
                        }
                    }),
                    i.Decryptor = i.extend({
                        processBlock: function(t, i) {
                            var o = this._cipher,
                            n = o.blockSize,
                            r = t.slice(i, i + n);
                            o.decryptBlock(t, i),
                            e.call(this, t, i, n),
                            this._prevBlock = r
                        }
                    }),
                    i
                } (),
                p = (e.pad = {}).Pkcs7 = {
                    pad: function(t, e) {
                        for (var i = 4 * e,
                        o = i - t.sigBytes % i,
                        r = o << 24 | o << 16 | o << 8 | o,
                        a = [], s = 0; s < o; s += 4) a.push(r);
                        var c = n.create(a, o);
                        t.concat(c)
                    },
                    unpad: function(t) {
                        var e = 255 & t.words[t.sigBytes - 1 >>> 2];
                        t.sigBytes -= e
                    }
                },
                _ = (i.BlockCipher = l.extend({
                    cfg: l.cfg.extend({
                        mode: d,
                        padding: p
                    }),
                    reset: function() {
                        l.reset.call(this);
                        var t = this.cfg,
                        e = t.iv,
                        i = t.mode;
                        if (this._xformMode == this._ENC_XFORM_MODE) var o = i.createEncryptor;
                        else o = i.createDecryptor,
                        this._minBufferSize = 1;
                        this._mode && this._mode.__creator == o ? this._mode.init(this, e && e.words) : (this._mode = o.call(i, this, e && e.words), this._mode.__creator = o)
                    },
                    _doProcessBlock: function(t, e) {
                        this._mode.processBlock(t, e)
                    },
                    _doFinalize: function() {
                        var t = this.cfg.padding;
                        if (this._xformMode == this._ENC_XFORM_MODE) {
                            t.pad(this._data, this.blockSize);
                            var e = this._process(!0)
                        } else e = this._process(!0),
                        t.unpad(e);
                        return e
                    },
                    blockSize: 4
                }), i.CipherParams = o.extend({
                    init: function(t) {
                        this.mixIn(t)
                    },
                    toString: function(t) {
                        return (t || this.formatter).stringify(this)
                    }
                })),
                g = (e.format = {}).OpenSSL = {
                    stringify: function(t) {
                        var e = t.ciphertext,
                        i = t.salt;
                        if (i) var o = n.create([1398893684, 1701076831]).concat(i).concat(e);
                        else o = e;
                        return o.toString(c)
                    },
                    parse: function(t) {
                        var e = c.parse(t),
                        i = e.words;
                        if (1398893684 == i[0] && 1701076831 == i[1]) {
                            var o = n.create(i.slice(2, 4));
                            i.splice(0, 4),
                            e.sigBytes -= 16
                        }
                        return _.create({
                            ciphertext: e,
                            salt: o
                        })
                    }
                },
                v = i.SerializableCipher = o.extend({
                    cfg: o.extend({
                        format: g
                    }),
                    encrypt: function(t, e, i, o) {
                        o = this.cfg.extend(o);
                        var n = t.createEncryptor(i, o),
                        r = n.finalize(e),
                        a = n.cfg;
                        return _.create({
                            ciphertext: r,
                            key: i,
                            iv: a.iv,
                            algorithm: t,
                            mode: a.mode,
                            padding: a.padding,
                            blockSize: t.blockSize,
                            formatter: o.format
                        })
                    },
                    decrypt: function(t, e, i, o) {
                        return o = this.cfg.extend(o),
                        e = this._parse(e, o.format),
                        t.createDecryptor(i, o).finalize(e.ciphertext)
                    },
                    _parse: function(t, e) {
                        return "string" == typeof t ? e.parse(t, this) : t
                    }
                }),
                y = (e.kdf = {}).OpenSSL = {
                    execute: function(t, e, i, o) {
                        o || (o = n.random(8));
                        var r = h.create({
                            keySize: e + i
                        }).compute(t, o),
                        a = n.create(r.words.slice(e), 4 * i);
                        return r.sigBytes = 4 * e,
                        _.create({
                            key: r,
                            iv: a,
                            salt: o
                        })
                    }
                },
                m = i.PasswordBasedCipher = v.extend({
                    cfg: v.cfg.extend({
                        kdf: y
                    }),
                    encrypt: function(t, e, i, o) {
                        var n = (o = this.cfg.extend(o)).kdf.execute(i, t.keySize, t.ivSize);
                        o.iv = n.iv;
                        var r = v.encrypt.call(this, t, e, n.key, o);
                        return r.mixIn(n),
                        r
                    },
                    decrypt: function(t, e, i, o) {
                        o = this.cfg.extend(o),
                        e = this._parse(e, o.format);
                        var n = o.kdf.execute(i, t.keySize, t.ivSize, e.salt);
                        return o.iv = n.iv,
                        v.decrypt.call(this, t, e, n.key, o)
                    }
                })
            } (),
            s.mode.CFB = function() {
                function t(t, e, i, o) {
                    var n = this._iv;
                    if (n) {
                        var r = n.slice(0);
                        this._iv = void 0
                    } else r = this._prevBlock;
                    o.encryptBlock(r, 0);
                    for (var a = 0; a < i; a++) t[e + a] ^= r[a]
                }
                var e = s.lib.BlockCipherMode.extend();
                return e.Encryptor = e.extend({
                    processBlock: function(e, i) {
                        var o = this._cipher,
                        n = o.blockSize;
                        t.call(this, e, i, n, o),
                        this._prevBlock = e.slice(i, i + n)
                    }
                }),
                e.Decryptor = e.extend({
                    processBlock: function(e, i) {
                        var o = this._cipher,
                        n = o.blockSize,
                        r = e.slice(i, i + n);
                        t.call(this, e, i, n, o),
                        this._prevBlock = r
                    }
                }),
                e
            } (),
            s.mode.ECB = function() {
                var t = s.lib.BlockCipherMode.extend();
                return t.Encryptor = t.extend({
                    processBlock: function(t, e) {
                        this._cipher.encryptBlock(t, e)
                    }
                }),
                t.Decryptor = t.extend({
                    processBlock: function(t, e) {
                        this._cipher.decryptBlock(t, e)
                    }
                }),
                t
            } (),
            s.pad.AnsiX923 = {
                pad: function(t, e) {
                    var i = t.sigBytes,
                    o = 4 * e,
                    n = o - i % o,
                    r = i + n - 1;
                    t.clamp(),
                    t.words[r >>> 2] |= n << 24 - r % 4 * 8,
                    t.sigBytes += n
                },
                unpad: function(t) {
                    var e = 255 & t.words[t.sigBytes - 1 >>> 2];
                    t.sigBytes -= e
                }
            },
            s.pad.Iso10126 = {
                pad: function(t, e) {
                    var i = 4 * e,
                    o = i - t.sigBytes % i;
                    t.concat(s.lib.WordArray.random(o - 1)).concat(s.lib.WordArray.create([o << 24], 1))
                },
                unpad: function(t) {
                    var e = 255 & t.words[t.sigBytes - 1 >>> 2];
                    t.sigBytes -= e
                }
            },
            s.pad.Iso97971 = {
                pad: function(t, e) {
                    t.concat(s.lib.WordArray.create([2147483648], 1)),
                    s.pad.ZeroPadding.pad(t, e)
                },
                unpad: function(t) {
                    s.pad.ZeroPadding.unpad(t),
                    t.sigBytes--
                }
            },
            s.mode.OFB = function() {
                var t = s.lib.BlockCipherMode.extend(),
                e = t.Encryptor = t.extend({
                    processBlock: function(t, e) {
                        var i = this._cipher,
                        o = i.blockSize,
                        n = this._iv,
                        r = this._keystream;
                        n && (r = this._keystream = n.slice(0), this._iv = void 0),
                        i.encryptBlock(r, 0);
                        for (var a = 0; a < o; a++) t[e + a] ^= r[a]
                    }
                });
                return t.Decryptor = e,
                t
            } (),
            s.pad.NoPadding = {
                pad: function() {},
                unpad: function() {}
            },
            function() {
                var t = s,
                e = t.lib.CipherParams,
                i = t.enc.Hex;
                t.format.Hex = {
                    stringify: function(t) {
                        return t.ciphertext.toString(i)
                    },
                    parse: function(t) {
                        var o = i.parse(t);
                        return e.create({
                            ciphertext: o
                        })
                    }
                }
            } (),
            function() {
                var t = s,
                e = t.lib.BlockCipher,
                i = t.algo,
                o = [],
                n = [],
                r = [],
                a = [],
                c = [],
                h = [],
                l = [],
                u = [],
                f = [],
                d = []; !
                function() {
                    for (var t = [], e = 0; e < 256; e++) t[e] = e < 128 ? e << 1 : e << 1 ^ 283;
                    var i = 0,
                    s = 0;
                    for (e = 0; e < 256; e++) {
                        var p = s ^ s << 1 ^ s << 2 ^ s << 3 ^ s << 4;
                        p = p >>> 8 ^ 255 & p ^ 99,
                        o[i] = p,
                        n[p] = i;
                        var _ = t[i],
                        g = t[_],
                        v = t[g],
                        y = 257 * t[p] ^ 16843008 * p;
                        r[i] = y << 24 | y >>> 8,
                        a[i] = y << 16 | y >>> 16,
                        c[i] = y << 8 | y >>> 24,
                        h[i] = y,
                        y = 16843009 * v ^ 65537 * g ^ 257 * _ ^ 16843008 * i,
                        l[p] = y << 24 | y >>> 8,
                        u[p] = y << 16 | y >>> 16,
                        f[p] = y << 8 | y >>> 24,
                        d[p] = y,
                        i ? (i = _ ^ t[t[t[v ^ _]]], s ^= t[t[s]]) : i = s = 1
                    }
                } ();
                var p = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54],
                _ = i.AES = e.extend({
                    _doReset: function() {
                        if (!this._nRounds || this._keyPriorReset !== this._key) {
                            for (var t = this._keyPriorReset = this._key,
                            e = t.words,
                            i = t.sigBytes / 4,
                            n = 4 * ((this._nRounds = i + 6) + 1), r = this._keySchedule = [], a = 0; a < n; a++) if (a < i) r[a] = e[a];
                            else {
                                var s = r[a - 1];
                                a % i ? i > 6 && a % i == 4 && (s = o[s >>> 24] << 24 | o[s >>> 16 & 255] << 16 | o[s >>> 8 & 255] << 8 | o[255 & s]) : (s = o[(s = s << 8 | s >>> 24) >>> 24] << 24 | o[s >>> 16 & 255] << 16 | o[s >>> 8 & 255] << 8 | o[255 & s], s ^= p[a / i | 0] << 24),
                                r[a] = r[a - i] ^ s
                            }
                            for (var c = this._invKeySchedule = [], h = 0; h < n; h++) a = n - h,
                            s = h % 4 ? r[a] : r[a - 4],
                            c[h] = h < 4 || a <= 4 ? s: l[o[s >>> 24]] ^ u[o[s >>> 16 & 255]] ^ f[o[s >>> 8 & 255]] ^ d[o[255 & s]]
                        }
                    },
                    encryptBlock: function(t, e) {
                        this._doCryptBlock(t, e, this._keySchedule, r, a, c, h, o)
                    },
                    decryptBlock: function(t, e) {
                        var i = t[e + 1];
                        t[e + 1] = t[e + 3],
                        t[e + 3] = i,
                        this._doCryptBlock(t, e, this._invKeySchedule, l, u, f, d, n),
                        i = t[e + 1],
                        t[e + 1] = t[e + 3],
                        t[e + 3] = i
                    },
                    _doCryptBlock: function(t, e, i, o, n, r, a, s) {
                        for (var c = this._nRounds,
                        h = t[e] ^ i[0], l = t[e + 1] ^ i[1], u = t[e + 2] ^ i[2], f = t[e + 3] ^ i[3], d = 4, p = 1; p < c; p++) {
                            var _ = o[h >>> 24] ^ n[l >>> 16 & 255] ^ r[u >>> 8 & 255] ^ a[255 & f] ^ i[d++],
                            g = o[l >>> 24] ^ n[u >>> 16 & 255] ^ r[f >>> 8 & 255] ^ a[255 & h] ^ i[d++],
                            v = o[u >>> 24] ^ n[f >>> 16 & 255] ^ r[h >>> 8 & 255] ^ a[255 & l] ^ i[d++],
                            y = o[f >>> 24] ^ n[h >>> 16 & 255] ^ r[l >>> 8 & 255] ^ a[255 & u] ^ i[d++];
                            h = _,
                            l = g,
                            u = v,
                            f = y
                        }
                        _ = (s[h >>> 24] << 24 | s[l >>> 16 & 255] << 16 | s[u >>> 8 & 255] << 8 | s[255 & f]) ^ i[d++],
                        g = (s[l >>> 24] << 24 | s[u >>> 16 & 255] << 16 | s[f >>> 8 & 255] << 8 | s[255 & h]) ^ i[d++],
                        v = (s[u >>> 24] << 24 | s[f >>> 16 & 255] << 16 | s[h >>> 8 & 255] << 8 | s[255 & l]) ^ i[d++],
                        y = (s[f >>> 24] << 24 | s[h >>> 16 & 255] << 16 | s[l >>> 8 & 255] << 8 | s[255 & u]) ^ i[d++],
                        t[e] = _,
                        t[e + 1] = g,
                        t[e + 2] = v,
                        t[e + 3] = y
                    },
                    keySize: 8
                });
                t.AES = e._createHelper(_)
            } (),
            function() {
                function t(t, e) {
                    var i = (this._lBlock >>> t ^ this._rBlock) & e;
                    this._rBlock ^= i,
                    this._lBlock ^= i << t
                }
                function e(t, e) {
                    var i = (this._rBlock >>> t ^ this._lBlock) & e;
                    this._lBlock ^= i,
                    this._rBlock ^= i << t
                }
                var i = s,
                o = i.lib,
                n = o.WordArray,
                r = o.BlockCipher,
                a = i.algo,
                c = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4],
                h = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32],
                l = [1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28],
                u = [{
                    0 : 8421888,
                    268435456 : 32768,
                    536870912 : 8421378,
                    805306368 : 2,
                    1073741824 : 512,
                    1342177280 : 8421890,
                    1610612736 : 8389122,
                    1879048192 : 8388608,
                    2147483648 : 514,
                    2415919104 : 8389120,
                    2684354560 : 33280,
                    2952790016 : 8421376,
                    3221225472 : 32770,
                    3489660928 : 8388610,
                    3758096384 : 0,
                    4026531840 : 33282,
                    134217728 : 0,
                    402653184 : 8421890,
                    671088640 : 33282,
                    939524096 : 32768,
                    1207959552 : 8421888,
                    1476395008 : 512,
                    1744830464 : 8421378,
                    2013265920 : 2,
                    2281701376 : 8389120,
                    2550136832 : 33280,
                    2818572288 : 8421376,
                    3087007744 : 8389122,
                    3355443200 : 8388610,
                    3623878656 : 32770,
                    3892314112 : 514,
                    4160749568 : 8388608,
                    1 : 32768,
                    268435457 : 2,
                    536870913 : 8421888,
                    805306369 : 8388608,
                    1073741825 : 8421378,
                    1342177281 : 33280,
                    1610612737 : 512,
                    1879048193 : 8389122,
                    2147483649 : 8421890,
                    2415919105 : 8421376,
                    2684354561 : 8388610,
                    2952790017 : 33282,
                    3221225473 : 514,
                    3489660929 : 8389120,
                    3758096385 : 32770,
                    4026531841 : 0,
                    134217729 : 8421890,
                    402653185 : 8421376,
                    671088641 : 8388608,
                    939524097 : 512,
                    1207959553 : 32768,
                    1476395009 : 8388610,
                    1744830465 : 2,
                    2013265921 : 33282,
                    2281701377 : 32770,
                    2550136833 : 8389122,
                    2818572289 : 514,
                    3087007745 : 8421888,
                    3355443201 : 8389120,
                    3623878657 : 0,
                    3892314113 : 33280,
                    4160749569 : 8421378
                },
                {
                    0 : 1074282512,
                    16777216 : 16384,
                    33554432 : 524288,
                    50331648 : 1074266128,
                    67108864 : 1073741840,
                    83886080 : 1074282496,
                    100663296 : 1073758208,
                    117440512 : 16,
                    134217728 : 540672,
                    150994944 : 1073758224,
                    167772160 : 1073741824,
                    184549376 : 540688,
                    201326592 : 524304,
                    218103808 : 0,
                    234881024 : 16400,
                    251658240 : 1074266112,
                    8388608 : 1073758208,
                    25165824 : 540688,
                    41943040 : 16,
                    58720256 : 1073758224,
                    75497472 : 1074282512,
                    92274688 : 1073741824,
                    109051904 : 524288,
                    125829120 : 1074266128,
                    142606336 : 524304,
                    159383552 : 0,
                    176160768 : 16384,
                    192937984 : 1074266112,
                    209715200 : 1073741840,
                    226492416 : 540672,
                    243269632 : 1074282496,
                    260046848 : 16400,
                    268435456 : 0,
                    285212672 : 1074266128,
                    301989888 : 1073758224,
                    318767104 : 1074282496,
                    335544320 : 1074266112,
                    352321536 : 16,
                    369098752 : 540688,
                    385875968 : 16384,
                    402653184 : 16400,
                    419430400 : 524288,
                    436207616 : 524304,
                    452984832 : 1073741840,
                    469762048 : 540672,
                    486539264 : 1073758208,
                    503316480 : 1073741824,
                    520093696 : 1074282512,
                    276824064 : 540688,
                    293601280 : 524288,
                    310378496 : 1074266112,
                    327155712 : 16384,
                    343932928 : 1073758208,
                    360710144 : 1074282512,
                    377487360 : 16,
                    394264576 : 1073741824,
                    411041792 : 1074282496,
                    427819008 : 1073741840,
                    444596224 : 1073758224,
                    461373440 : 524304,
                    478150656 : 0,
                    494927872 : 16400,
                    511705088 : 1074266128,
                    528482304 : 540672
                },
                {
                    0 : 260,
                    1048576 : 0,
                    2097152 : 67109120,
                    3145728 : 65796,
                    4194304 : 65540,
                    5242880 : 67108868,
                    6291456 : 67174660,
                    7340032 : 67174400,
                    8388608 : 67108864,
                    9437184 : 67174656,
                    10485760 : 65792,
                    11534336 : 67174404,
                    12582912 : 67109124,
                    13631488 : 65536,
                    14680064 : 4,
                    15728640 : 256,
                    524288 : 67174656,
                    1572864 : 67174404,
                    2621440 : 0,
                    3670016 : 67109120,
                    4718592 : 67108868,
                    5767168 : 65536,
                    6815744 : 65540,
                    7864320 : 260,
                    8912896 : 4,
                    9961472 : 256,
                    11010048 : 67174400,
                    12058624 : 65796,
                    13107200 : 65792,
                    14155776 : 67109124,
                    15204352 : 67174660,
                    16252928 : 67108864,
                    16777216 : 67174656,
                    17825792 : 65540,
                    18874368 : 65536,
                    19922944 : 67109120,
                    20971520 : 256,
                    22020096 : 67174660,
                    23068672 : 67108868,
                    24117248 : 0,
                    25165824 : 67109124,
                    26214400 : 67108864,
                    27262976 : 4,
                    28311552 : 65792,
                    29360128 : 67174400,
                    30408704 : 260,
                    31457280 : 65796,
                    32505856 : 67174404,
                    17301504 : 67108864,
                    18350080 : 260,
                    19398656 : 67174656,
                    20447232 : 0,
                    21495808 : 65540,
                    22544384 : 67109120,
                    23592960 : 256,
                    24641536 : 67174404,
                    25690112 : 65536,
                    26738688 : 67174660,
                    27787264 : 65796,
                    28835840 : 67108868,
                    29884416 : 67109124,
                    30932992 : 67174400,
                    31981568 : 4,
                    33030144 : 65792
                },
                {
                    0 : 2151682048,
                    65536 : 2147487808,
                    131072 : 4198464,
                    196608 : 2151677952,
                    262144 : 0,
                    327680 : 4198400,
                    393216 : 2147483712,
                    458752 : 4194368,
                    524288 : 2147483648,
                    589824 : 4194304,
                    655360 : 64,
                    720896 : 2147487744,
                    786432 : 2151678016,
                    851968 : 4160,
                    917504 : 4096,
                    983040 : 2151682112,
                    32768 : 2147487808,
                    98304 : 64,
                    163840 : 2151678016,
                    229376 : 2147487744,
                    294912 : 4198400,
                    360448 : 2151682112,
                    425984 : 0,
                    491520 : 2151677952,
                    557056 : 4096,
                    622592 : 2151682048,
                    688128 : 4194304,
                    753664 : 4160,
                    819200 : 2147483648,
                    884736 : 4194368,
                    950272 : 4198464,
                    1015808 : 2147483712,
                    1048576 : 4194368,
                    1114112 : 4198400,
                    1179648 : 2147483712,
                    1245184 : 0,
                    1310720 : 4160,
                    1376256 : 2151678016,
                    1441792 : 2151682048,
                    1507328 : 2147487808,
                    1572864 : 2151682112,
                    1638400 : 2147483648,
                    1703936 : 2151677952,
                    1769472 : 4198464,
                    1835008 : 2147487744,
                    1900544 : 4194304,
                    1966080 : 64,
                    2031616 : 4096,
                    1081344 : 2151677952,
                    1146880 : 2151682112,
                    1212416 : 0,
                    1277952 : 4198400,
                    1343488 : 4194368,
                    1409024 : 2147483648,
                    1474560 : 2147487808,
                    1540096 : 64,
                    1605632 : 2147483712,
                    1671168 : 4096,
                    1736704 : 2147487744,
                    1802240 : 2151678016,
                    1867776 : 4160,
                    1933312 : 2151682048,
                    1998848 : 4194304,
                    2064384 : 4198464
                },
                {
                    0 : 128,
                    4096 : 17039360,
                    8192 : 262144,
                    12288 : 536870912,
                    16384 : 537133184,
                    20480 : 16777344,
                    24576 : 553648256,
                    28672 : 262272,
                    32768 : 16777216,
                    36864 : 537133056,
                    40960 : 536871040,
                    45056 : 553910400,
                    49152 : 553910272,
                    53248 : 0,
                    57344 : 17039488,
                    61440 : 553648128,
                    2048 : 17039488,
                    6144 : 553648256,
                    10240 : 128,
                    14336 : 17039360,
                    18432 : 262144,
                    22528 : 537133184,
                    26624 : 553910272,
                    30720 : 536870912,
                    34816 : 537133056,
                    38912 : 0,
                    43008 : 553910400,
                    47104 : 16777344,
                    51200 : 536871040,
                    55296 : 553648128,
                    59392 : 16777216,
                    63488 : 262272,
                    65536 : 262144,
                    69632 : 128,
                    73728 : 536870912,
                    77824 : 553648256,
                    81920 : 16777344,
                    86016 : 553910272,
                    90112 : 537133184,
                    94208 : 16777216,
                    98304 : 553910400,
                    102400 : 553648128,
                    106496 : 17039360,
                    110592 : 537133056,
                    114688 : 262272,
                    118784 : 536871040,
                    122880 : 0,
                    126976 : 17039488,
                    67584 : 553648256,
                    71680 : 16777216,
                    75776 : 17039360,
                    79872 : 537133184,
                    83968 : 536870912,
                    88064 : 17039488,
                    92160 : 128,
                    96256 : 553910272,
                    100352 : 262272,
                    104448 : 553910400,
                    108544 : 0,
                    112640 : 553648128,
                    116736 : 16777344,
                    120832 : 262144,
                    124928 : 537133056,
                    129024 : 536871040
                },
                {
                    0 : 268435464,
                    256 : 8192,
                    512 : 270532608,
                    768 : 270540808,
                    1024 : 268443648,
                    1280 : 2097152,
                    1536 : 2097160,
                    1792 : 268435456,
                    2048 : 0,
                    2304 : 268443656,
                    2560 : 2105344,
                    2816 : 8,
                    3072 : 270532616,
                    3328 : 2105352,
                    3584 : 8200,
                    3840 : 270540800,
                    128 : 270532608,
                    384 : 270540808,
                    640 : 8,
                    896 : 2097152,
                    1152 : 2105352,
                    1408 : 268435464,
                    1664 : 268443648,
                    1920 : 8200,
                    2176 : 2097160,
                    2432 : 8192,
                    2688 : 268443656,
                    2944 : 270532616,
                    3200 : 0,
                    3456 : 270540800,
                    3712 : 2105344,
                    3968 : 268435456,
                    4096 : 268443648,
                    4352 : 270532616,
                    4608 : 270540808,
                    4864 : 8200,
                    5120 : 2097152,
                    5376 : 268435456,
                    5632 : 268435464,
                    5888 : 2105344,
                    6144 : 2105352,
                    6400 : 0,
                    6656 : 8,
                    6912 : 270532608,
                    7168 : 8192,
                    7424 : 268443656,
                    7680 : 270540800,
                    7936 : 2097160,
                    4224 : 8,
                    4480 : 2105344,
                    4736 : 2097152,
                    4992 : 268435464,
                    5248 : 268443648,
                    5504 : 8200,
                    5760 : 270540808,
                    6016 : 270532608,
                    6272 : 270540800,
                    6528 : 270532616,
                    6784 : 8192,
                    7040 : 2105352,
                    7296 : 2097160,
                    7552 : 0,
                    7808 : 268435456,
                    8064 : 268443656
                },
                {
                    0 : 1048576,
                    16 : 33555457,
                    32 : 1024,
                    48 : 1049601,
                    64 : 34604033,
                    80 : 0,
                    96 : 1,
                    112 : 34603009,
                    128 : 33555456,
                    144 : 1048577,
                    160 : 33554433,
                    176 : 34604032,
                    192 : 34603008,
                    208 : 1025,
                    224 : 1049600,
                    240 : 33554432,
                    8 : 34603009,
                    24 : 0,
                    40 : 33555457,
                    56 : 34604032,
                    72 : 1048576,
                    88 : 33554433,
                    104 : 33554432,
                    120 : 1025,
                    136 : 1049601,
                    152 : 33555456,
                    168 : 34603008,
                    184 : 1048577,
                    200 : 1024,
                    216 : 34604033,
                    232 : 1,
                    248 : 1049600,
                    256 : 33554432,
                    272 : 1048576,
                    288 : 33555457,
                    304 : 34603009,
                    320 : 1048577,
                    336 : 33555456,
                    352 : 34604032,
                    368 : 1049601,
                    384 : 1025,
                    400 : 34604033,
                    416 : 1049600,
                    432 : 1,
                    448 : 0,
                    464 : 34603008,
                    480 : 33554433,
                    496 : 1024,
                    264 : 1049600,
                    280 : 33555457,
                    296 : 34603009,
                    312 : 1,
                    328 : 33554432,
                    344 : 1048576,
                    360 : 1025,
                    376 : 34604032,
                    392 : 33554433,
                    408 : 34603008,
                    424 : 0,
                    440 : 34604033,
                    456 : 1049601,
                    472 : 1024,
                    488 : 33555456,
                    504 : 1048577
                },
                {
                    0 : 134219808,
                    1 : 131072,
                    2 : 134217728,
                    3 : 32,
                    4 : 131104,
                    5 : 134350880,
                    6 : 134350848,
                    7 : 2048,
                    8 : 134348800,
                    9 : 134219776,
                    10 : 133120,
                    11 : 134348832,
                    12 : 2080,
                    13 : 0,
                    14 : 134217760,
                    15 : 133152,
                    2147483648 : 2048,
                    2147483649 : 134350880,
                    2147483650 : 134219808,
                    2147483651 : 134217728,
                    2147483652 : 134348800,
                    2147483653 : 133120,
                    2147483654 : 133152,
                    2147483655 : 32,
                    2147483656 : 134217760,
                    2147483657 : 2080,
                    2147483658 : 131104,
                    2147483659 : 134350848,
                    2147483660 : 0,
                    2147483661 : 134348832,
                    2147483662 : 134219776,
                    2147483663 : 131072,
                    16 : 133152,
                    17 : 134350848,
                    18 : 32,
                    19 : 2048,
                    20 : 134219776,
                    21 : 134217760,
                    22 : 134348832,
                    23 : 131072,
                    24 : 0,
                    25 : 131104,
                    26 : 134348800,
                    27 : 134219808,
                    28 : 134350880,
                    29 : 133120,
                    30 : 2080,
                    31 : 134217728,
                    2147483664 : 131072,
                    2147483665 : 2048,
                    2147483666 : 134348832,
                    2147483667 : 133152,
                    2147483668 : 32,
                    2147483669 : 134348800,
                    2147483670 : 134217728,
                    2147483671 : 134219808,
                    2147483672 : 134350880,
                    2147483673 : 134217760,
                    2147483674 : 134219776,
                    2147483675 : 0,
                    2147483676 : 133120,
                    2147483677 : 2080,
                    2147483678 : 131104,
                    2147483679 : 134350848
                }],
                f = [4160749569, 528482304, 33030144, 2064384, 129024, 8064, 504, 2147483679],
                d = a.DES = r.extend({
                    _doReset: function() {
                        for (var t = this._key.words,
                        e = [], i = 0; i < 56; i++) {
                            var o = c[i] - 1;
                            e[i] = t[o >>> 5] >>> 31 - o % 32 & 1
                        }
                        for (var n = this._subKeys = [], r = 0; r < 16; r++) {
                            var a = n[r] = [],
                            s = l[r];
                            for (i = 0; i < 24; i++) a[i / 6 | 0] |= e[(h[i] - 1 + s) % 28] << 31 - i % 6,
                            a[4 + (i / 6 | 0)] |= e[28 + (h[i + 24] - 1 + s) % 28] << 31 - i % 6;
                            for (a[0] = a[0] << 1 | a[0] >>> 31, i = 1; i < 7; i++) a[i] = a[i] >>> 4 * (i - 1) + 3;
                            a[7] = a[7] << 5 | a[7] >>> 27
                        }
                        var u = this._invSubKeys = [];
                        for (i = 0; i < 16; i++) u[i] = n[15 - i]
                    },
                    encryptBlock: function(t, e) {
                        this._doCryptBlock(t, e, this._subKeys)
                    },
                    decryptBlock: function(t, e) {
                        this._doCryptBlock(t, e, this._invSubKeys)
                    },
                    _doCryptBlock: function(i, o, n) {
                        this._lBlock = i[o],
                        this._rBlock = i[o + 1],
                        t.call(this, 4, 252645135),
                        t.call(this, 16, 65535),
                        e.call(this, 2, 858993459),
                        e.call(this, 8, 16711935),
                        t.call(this, 1, 1431655765);
                        for (var r = 0; r < 16; r++) {
                            for (var a = n[r], s = this._lBlock, c = this._rBlock, h = 0, l = 0; l < 8; l++) h |= u[l][((c ^ a[l]) & f[l]) >>> 0];
                            this._lBlock = c,
                            this._rBlock = s ^ h
                        }
                        var d = this._lBlock;
                        this._lBlock = this._rBlock,
                        this._rBlock = d,
                        t.call(this, 1, 1431655765),
                        e.call(this, 8, 16711935),
                        e.call(this, 2, 858993459),
                        t.call(this, 16, 65535),
                        t.call(this, 4, 252645135),
                        i[o] = this._lBlock,
                        i[o + 1] = this._rBlock
                    },
                    keySize: 2,
                    ivSize: 2,
                    blockSize: 2
                });
                i.DES = r._createHelper(d);
                var p = a.TripleDES = r.extend({
                    _doReset: function() {
                        var t = this._key.words;
                        this._des1 = d.createEncryptor(n.create(t.slice(0, 2))),
                        this._des2 = d.createEncryptor(n.create(t.slice(2, 4))),
                        this._des3 = d.createEncryptor(n.create(t.slice(4, 6)))
                    },
                    encryptBlock: function(t, e) {
                        this._des1.encryptBlock(t, e),
                        this._des2.decryptBlock(t, e),
                        this._des3.encryptBlock(t, e)
                    },
                    decryptBlock: function(t, e) {
                        this._des3.decryptBlock(t, e),
                        this._des2.encryptBlock(t, e),
                        this._des1.decryptBlock(t, e)
                    },
                    keySize: 6,
                    ivSize: 2,
                    blockSize: 2
                });
                i.TripleDES = r._createHelper(p)
            } (),
            function() {
                function t() {
                    for (var t = this._S,
                    e = this._i,
                    i = this._j,
                    o = 0,
                    n = 0; n < 4; n++) {
                        i = (i + t[e = (e + 1) % 256]) % 256;
                        var r = t[e];
                        t[e] = t[i],
                        t[i] = r,
                        o |= t[(t[e] + t[i]) % 256] << 24 - 8 * n
                    }
                    return this._i = e,
                    this._j = i,
                    o
                }
                var e = s,
                i = e.lib.StreamCipher,
                o = e.algo,
                n = o.RC4 = i.extend({
                    _doReset: function() {
                        for (var t = this._key,
                        e = t.words,
                        i = t.sigBytes,
                        o = this._S = [], n = 0; n < 256; n++) o[n] = n;
                        n = 0;
                        for (var r = 0; n < 256; n++) {
                            var a = n % i,
                            s = e[a >>> 2] >>> 24 - a % 4 * 8 & 255;
                            r = (r + o[n] + s) % 256;
                            var c = o[n];
                            o[n] = o[r],
                            o[r] = c
                        }
                        this._i = this._j = 0
                    },
                    _doProcessBlock: function(e, i) {
                        e[i] ^= t.call(this)
                    },
                    keySize: 8,
                    ivSize: 0
                });
                e.RC4 = i._createHelper(n);
                var r = o.RC4Drop = n.extend({
                    cfg: n.cfg.extend({
                        drop: 192
                    }),
                    _doReset: function() {
                        n._doReset.call(this);
                        for (var e = this.cfg.drop; e > 0; e--) t.call(this)
                    }
                });
                e.RC4Drop = i._createHelper(r)
            } (),
            s.mode.CTRGladman = function() {
                function t(t) {
                    if (255 == (t >> 24 & 255)) {
                        var e = t >> 16 & 255,
                        i = t >> 8 & 255,
                        o = 255 & t;
                        255 === e ? (e = 0, 255 === i ? (i = 0, 255 === o ? o = 0 : ++o) : ++i) : ++e,
                        t = 0,
                        t += e << 16,
                        t += i << 8,
                        t += o
                    } else t += 1 << 24;
                    return t
                }
                function e(e) {
                    return 0 === (e[0] = t(e[0])) && (e[1] = t(e[1])),
                    e
                }
                var i = s.lib.BlockCipherMode.extend(),
                o = i.Encryptor = i.extend({
                    processBlock: function(t, i) {
                        var o = this._cipher,
                        n = o.blockSize,
                        r = this._iv,
                        a = this._counter;
                        r && (a = this._counter = r.slice(0), this._iv = void 0),
                        e(a);
                        var s = a.slice(0);
                        o.encryptBlock(s, 0);
                        for (var c = 0; c < n; c++) t[i + c] ^= s[c]
                    }
                });
                return i.Decryptor = o,
                i
            } (),
            function() {
                function t() {
                    for (var t = this._X,
                    e = this._C,
                    i = 0; i < 8; i++) r[i] = e[i];
                    for (e[0] = e[0] + 1295307597 + this._b | 0, e[1] = e[1] + 3545052371 + (e[0] >>> 0 < r[0] >>> 0 ? 1 : 0) | 0, e[2] = e[2] + 886263092 + (e[1] >>> 0 < r[1] >>> 0 ? 1 : 0) | 0, e[3] = e[3] + 1295307597 + (e[2] >>> 0 < r[2] >>> 0 ? 1 : 0) | 0, e[4] = e[4] + 3545052371 + (e[3] >>> 0 < r[3] >>> 0 ? 1 : 0) | 0, e[5] = e[5] + 886263092 + (e[4] >>> 0 < r[4] >>> 0 ? 1 : 0) | 0, e[6] = e[6] + 1295307597 + (e[5] >>> 0 < r[5] >>> 0 ? 1 : 0) | 0, e[7] = e[7] + 3545052371 + (e[6] >>> 0 < r[6] >>> 0 ? 1 : 0) | 0, this._b = e[7] >>> 0 < r[7] >>> 0 ? 1 : 0, i = 0; i < 8; i++) {
                        var o = t[i] + e[i],
                        n = 65535 & o,
                        s = o >>> 16,
                        c = ((n * n >>> 17) + n * s >>> 15) + s * s,
                        h = ((4294901760 & o) * o | 0) + ((65535 & o) * o | 0);
                        a[i] = c ^ h
                    }
                    t[0] = a[0] + (a[7] << 16 | a[7] >>> 16) + (a[6] << 16 | a[6] >>> 16) | 0,
                    t[1] = a[1] + (a[0] << 8 | a[0] >>> 24) + a[7] | 0,
                    t[2] = a[2] + (a[1] << 16 | a[1] >>> 16) + (a[0] << 16 | a[0] >>> 16) | 0,
                    t[3] = a[3] + (a[2] << 8 | a[2] >>> 24) + a[1] | 0,
                    t[4] = a[4] + (a[3] << 16 | a[3] >>> 16) + (a[2] << 16 | a[2] >>> 16) | 0,
                    t[5] = a[5] + (a[4] << 8 | a[4] >>> 24) + a[3] | 0,
                    t[6] = a[6] + (a[5] << 16 | a[5] >>> 16) + (a[4] << 16 | a[4] >>> 16) | 0,
                    t[7] = a[7] + (a[6] << 8 | a[6] >>> 24) + a[5] | 0
                }
                var e = s,
                i = e.lib.StreamCipher,
                o = e.algo,
                n = [],
                r = [],
                a = [],
                c = o.Rabbit = i.extend({
                    _doReset: function() {
                        for (var e = this._key.words,
                        i = this.cfg.iv,
                        o = 0; o < 4; o++) e[o] = 16711935 & (e[o] << 8 | e[o] >>> 24) | 4278255360 & (e[o] << 24 | e[o] >>> 8);
                        var n = this._X = [e[0], e[3] << 16 | e[2] >>> 16, e[1], e[0] << 16 | e[3] >>> 16, e[2], e[1] << 16 | e[0] >>> 16, e[3], e[2] << 16 | e[1] >>> 16],
                        r = this._C = [e[2] << 16 | e[2] >>> 16, 4294901760 & e[0] | 65535 & e[1], e[3] << 16 | e[3] >>> 16, 4294901760 & e[1] | 65535 & e[2], e[0] << 16 | e[0] >>> 16, 4294901760 & e[2] | 65535 & e[3], e[1] << 16 | e[1] >>> 16, 4294901760 & e[3] | 65535 & e[0]];
                        for (this._b = 0, o = 0; o < 4; o++) t.call(this);
                        for (o = 0; o < 8; o++) r[o] ^= n[o + 4 & 7];
                        if (i) {
                            var a = i.words,
                            s = a[0],
                            c = a[1],
                            h = 16711935 & (s << 8 | s >>> 24) | 4278255360 & (s << 24 | s >>> 8),
                            l = 16711935 & (c << 8 | c >>> 24) | 4278255360 & (c << 24 | c >>> 8),
                            u = h >>> 16 | 4294901760 & l,
                            f = l << 16 | 65535 & h;
                            for (r[0] ^= h, r[1] ^= u, r[2] ^= l, r[3] ^= f, r[4] ^= h, r[5] ^= u, r[6] ^= l, r[7] ^= f, o = 0; o < 4; o++) t.call(this)
                        }
                    },
                    _doProcessBlock: function(e, i) {
                        var o = this._X;
                        t.call(this),
                        n[0] = o[0] ^ o[5] >>> 16 ^ o[3] << 16,
                        n[1] = o[2] ^ o[7] >>> 16 ^ o[5] << 16,
                        n[2] = o[4] ^ o[1] >>> 16 ^ o[7] << 16,
                        n[3] = o[6] ^ o[3] >>> 16 ^ o[1] << 16;
                        for (var r = 0; r < 4; r++) n[r] = 16711935 & (n[r] << 8 | n[r] >>> 24) | 4278255360 & (n[r] << 24 | n[r] >>> 8),
                        e[i + r] ^= n[r]
                    },
                    blockSize: 4,
                    ivSize: 2
                });
                e.Rabbit = i._createHelper(c)
            } (),
            s.mode.CTR = function() {
                var t = s.lib.BlockCipherMode.extend(),
                e = t.Encryptor = t.extend({
                    processBlock: function(t, e) {
                        var i = this._cipher,
                        o = i.blockSize,
                        n = this._iv,
                        r = this._counter;
                        n && (r = this._counter = n.slice(0), this._iv = void 0);
                        var a = r.slice(0);
                        i.encryptBlock(a, 0),
                        r[o - 1] = r[o - 1] + 1 | 0;
                        for (var s = 0; s < o; s++) t[e + s] ^= a[s]
                    }
                });
                return t.Decryptor = e,
                t
            } (),
            function() {
                function t() {
                    for (var t = this._X,
                    e = this._C,
                    i = 0; i < 8; i++) r[i] = e[i];
                    for (e[0] = e[0] + 1295307597 + this._b | 0, e[1] = e[1] + 3545052371 + (e[0] >>> 0 < r[0] >>> 0 ? 1 : 0) | 0, e[2] = e[2] + 886263092 + (e[1] >>> 0 < r[1] >>> 0 ? 1 : 0) | 0, e[3] = e[3] + 1295307597 + (e[2] >>> 0 < r[2] >>> 0 ? 1 : 0) | 0, e[4] = e[4] + 3545052371 + (e[3] >>> 0 < r[3] >>> 0 ? 1 : 0) | 0, e[5] = e[5] + 886263092 + (e[4] >>> 0 < r[4] >>> 0 ? 1 : 0) | 0, e[6] = e[6] + 1295307597 + (e[5] >>> 0 < r[5] >>> 0 ? 1 : 0) | 0, e[7] = e[7] + 3545052371 + (e[6] >>> 0 < r[6] >>> 0 ? 1 : 0) | 0, this._b = e[7] >>> 0 < r[7] >>> 0 ? 1 : 0, i = 0; i < 8; i++) {
                        var o = t[i] + e[i],
                        n = 65535 & o,
                        s = o >>> 16,
                        c = ((n * n >>> 17) + n * s >>> 15) + s * s,
                        h = ((4294901760 & o) * o | 0) + ((65535 & o) * o | 0);
                        a[i] = c ^ h
                    }
                    t[0] = a[0] + (a[7] << 16 | a[7] >>> 16) + (a[6] << 16 | a[6] >>> 16) | 0,
                    t[1] = a[1] + (a[0] << 8 | a[0] >>> 24) + a[7] | 0,
                    t[2] = a[2] + (a[1] << 16 | a[1] >>> 16) + (a[0] << 16 | a[0] >>> 16) | 0,
                    t[3] = a[3] + (a[2] << 8 | a[2] >>> 24) + a[1] | 0,
                    t[4] = a[4] + (a[3] << 16 | a[3] >>> 16) + (a[2] << 16 | a[2] >>> 16) | 0,
                    t[5] = a[5] + (a[4] << 8 | a[4] >>> 24) + a[3] | 0,
                    t[6] = a[6] + (a[5] << 16 | a[5] >>> 16) + (a[4] << 16 | a[4] >>> 16) | 0,
                    t[7] = a[7] + (a[6] << 8 | a[6] >>> 24) + a[5] | 0
                }
                var e = s,
                i = e.lib.StreamCipher,
                o = e.algo,
                n = [],
                r = [],
                a = [],
                c = o.RabbitLegacy = i.extend({
                    _doReset: function() {
                        var e = this._key.words,
                        i = this.cfg.iv,
                        o = this._X = [e[0], e[3] << 16 | e[2] >>> 16, e[1], e[0] << 16 | e[3] >>> 16, e[2], e[1] << 16 | e[0] >>> 16, e[3], e[2] << 16 | e[1] >>> 16],
                        n = this._C = [e[2] << 16 | e[2] >>> 16, 4294901760 & e[0] | 65535 & e[1], e[3] << 16 | e[3] >>> 16, 4294901760 & e[1] | 65535 & e[2], e[0] << 16 | e[0] >>> 16, 4294901760 & e[2] | 65535 & e[3], e[1] << 16 | e[1] >>> 16, 4294901760 & e[3] | 65535 & e[0]];
                        this._b = 0;
                        for (var r = 0; r < 4; r++) t.call(this);
                        for (r = 0; r < 8; r++) n[r] ^= o[r + 4 & 7];
                        if (i) {
                            var a = i.words,
                            s = a[0],
                            c = a[1],
                            h = 16711935 & (s << 8 | s >>> 24) | 4278255360 & (s << 24 | s >>> 8),
                            l = 16711935 & (c << 8 | c >>> 24) | 4278255360 & (c << 24 | c >>> 8),
                            u = h >>> 16 | 4294901760 & l,
                            f = l << 16 | 65535 & h;
                            for (n[0] ^= h, n[1] ^= u, n[2] ^= l, n[3] ^= f, n[4] ^= h, n[5] ^= u, n[6] ^= l, n[7] ^= f, r = 0; r < 4; r++) t.call(this)
                        }
                    },
                    _doProcessBlock: function(e, i) {
                        var o = this._X;
                        t.call(this),
                        n[0] = o[0] ^ o[5] >>> 16 ^ o[3] << 16,
                        n[1] = o[2] ^ o[7] >>> 16 ^ o[5] << 16,
                        n[2] = o[4] ^ o[1] >>> 16 ^ o[7] << 16,
                        n[3] = o[6] ^ o[3] >>> 16 ^ o[1] << 16;
                        for (var r = 0; r < 4; r++) n[r] = 16711935 & (n[r] << 8 | n[r] >>> 24) | 4278255360 & (n[r] << 24 | n[r] >>> 8),
                        e[i + r] ^= n[r]
                    },
                    blockSize: 4,
                    ivSize: 2
                });
                e.RabbitLegacy = i._createHelper(c)
            } (),
            s.pad.ZeroPadding = {
                pad: function(t, e) {
                    var i = 4 * e;
                    t.clamp(),
                    t.sigBytes += i - (t.sigBytes % i || i)
                },
                unpad: function(t) {
                    for (var e = t.words,
                    i = t.sigBytes - 1; ! (e[i >>> 2] >>> 24 - i % 4 * 8 & 255);) i--;
                    t.sigBytes = i + 1
                }
            },
            s
        })
    },
    {}],
    begin: [function(t, e) {
        "use strict";
        cc._RF.push(e, "6ecb7+2KHlBYZuUVtvVXhoh", "begin"),
        cc.Class({
            extends: cc.Component,
            properties: {
                node_notice: {
                    type: cc.Node,
                default:
                    null
                },
                btn_begin: {
                    type: cc.Node,
                default:
                    null
                },
                btn_1: {
                    type: cc.Node,
                default:
                    null
                },
                btn_2: {
                    type: cc.Node,
                default:
                    null
                },
                btn_3: {
                    type: cc.Node,
                default:
                    null
                }
            },
            onLoad: function() {},
            update: function() {}
        }),
        cc._RF.pop()
    },
    {}],
    block: [function(t, e) {
        "use strict";
        cc._RF.push(e, "abd535V9VRCVIsOFtrle6kt", "block"),
        cc.Class({
            extends: cc.Component,
            properties: {},
            onLoad: function() {},
            init: function(t) {
                this.block_type = t,
                this.can_pz = !0,
                this.is_pz = !1,
                t >= 10 && (this.can_pz = !1),
                this.i_over = 0
            },
            onBeginContact: function(t, e, i) {
                10 != i.tag && (this.is_pz = !0);
                var o = i.node.getComponent("block");
                if (o && this.can_pz && this.block_type == o.block_type) {
                    this.can_pz = !1,
                    o.can_pz = !1;
                    var n = this.node.getPosition(),
                    r = i.node.getPosition(),
                    a = n;
                    a.y > r.y && (a = r),
                    this.node.removeFromParent(),
                    i.node.removeFromParent(),
                    main.playSound();
                    var s = this.node.width;
                    main.createTx(this.block_type, n, s),
                    main.createTx(this.block_type, r, s),
                    main.is_over || main.addScore(this.block_type),
                    this.scheduleOnce(function() {
                        main.createBlock(this.block_type + 1, a, !0)
                    }.bind(this), .15)
                }
            },
            onEndContact: function() {},
            onPreSolve: function() {},
            onPostSolve: function() {},
            update: function() {
                main.is_over || (this.node.y + this.node.height * main.f_scale / 2 > main.node_xian.y ? (this.i_over++, this.i_over > 120 && main.gameOver()) : this.i_over = 0)
            }
        }),
        cc._RF.pop()
    },
    {}],
    game: [function(t, e) {
        "use strict";
        cc._RF.push(e, "f0043cW/o1BGJvxtmvPNpyZ", "game");
        var i, o = (i = t("./crypto-js")) && i.__esModule ? i: {
        default:
            i
        };
        window.CryptoJS = o.
    default,
        console.log(window.CryptoJS),
        cc.Class({
            extends: cc.Component,
            properties: {
                main: {
                    type: cc.Node,
                default:
                    null
                },
                layerGame_mybag: {
                    type: cc.Node,
                default:
                    null
                },
                layerRank: {
                    type: cc.Node,
                default:
                    null
                },
                btn_bag: {
                    type: cc.Button,
                default:
                    null
                }
            },
            onLoad: function() {
                window.game = this,
                this.main.active = !0,
                this.layerGame_mybag.active = !1,
                this.initBagData(),
                cc.director.getPhysicsManager().enabled = !0,
                this.daojuUsePost = null;
                var t = this;
                this.ajaxGet(location.origin + "/game/play/start?gameType=0",
                function(e) {
                    if (console.log(e), 0 == JSON.parse(e).code) {
                        var i = JSON.parse(e).data;
                        i.gameType = 0,
                        t.gameInfo = i
                    } else location.href = location.origin + "/guangdong/activity/watermelon/h5/begin.html"
                }.bind(this))
            },
            initBagData: function() {
                var t = this;
                this.ajaxGetData = function() {
                    return new Promise(function() {
                        t.ajaxGet(location.origin + "/game/prop/list?gameType=0",
                        function(e) {
                            if (e) {
                                var i = JSON.parse(e).data;
                                if (console.log(t), i) {
                                    t.bagData = i;
                                    for (var o = [0, 0, 0, 0, 0], n = ["iconbox_5s", "iconbox_10s", "iconbox_5p", "iconbox_10p"], r = {
                                        iconbox_5s: {
                                            propType: 0,
                                            valsNum: 10
                                        },
                                        iconbox_10s: {
                                            propType: 0,
                                            valsNum: 20
                                        },
                                        iconbox_5p: {
                                            propType: 1,
                                            valsNum: 25
                                        },
                                        iconbox_10p: {
                                            propType: 1,
                                            valsNum: 50
                                        }
                                    },
                                    a = 0; a < n.length; a++) r["" + n[a]].total = o[a],
                                    r["" + n[a]].propId = null,
                                    r["" + n[a]].propUserRelationIds = [];
                                    if (console.log(r), t.bagData) {
                                        var s = t.bagData;
                                        s.length > 0 && s.forEach(function(t) {
                                            t.propListGroupByPropId && t.propListGroupByPropId.forEach(function(e) {
                                                if (Object.keys(r).forEach(function(i) {
                                                    r["" + i].propType == t.propType && r["" + i].valsNum == e.vals && (e.tyName = "" + i)
                                                }), e.tyName) {
                                                    var i = e.tyName;
                                                    r["" + i].total = e.total,
                                                    r["" + i].propUserRelationIds = e.propRelationIds,
                                                    r["" + i].propType = t.propType,
                                                    r["" + i].vals = e.vals
                                                }
                                            })
                                        })
                                    }
                                    t.daojuUsePost = r;
                                    for (var c = 0; c < n.length; c++) {
                                        var h = t.daojuUsePost["" + n[c]].total;
                                        o[c] = h,
                                        t.renderDaoju(n[c], h)
                                    }
                                    console.log(t.daojuUsePost)
                                }
                            }
                        })
                    })
                }.bind(this),
                this.ajaxGetData()
            },
            renderDaoju: function(t, e) {
                console.log("renderDaoju \u6bcf\u4e00\u4e2a\u9053\u5177\u7684\u6e32\u67d3\u65b9\u6cd5");
                var i = t,
                o = e,
                n = cc.Material.getBuiltinMaterial("2d-gray-sprite"),
                r = game.layerGame_mybag.getChildByName("node_bagbox").getChildByName(i),
                a = r.getChildByName("num").getComponent(cc.Label),
                s = r.getChildByName("icon").getComponent(cc.Sprite),
                c = r.getChildByName("btn").getChildByName("Background").getComponent(cc.Sprite),
                h = r.getChildByName("red");
                if (o > 0) {
                    a.string = o;
                    var l = String(o).length - 1,
                    u = .8 + .2 * l,
                    f = .8 + .2 * l;
                    h.setScale(u, f)
                } else s.setMaterial(0, n),
                c.setMaterial(0, n),
                h.active = !1
            },
            findNum: function(t) {
                var e = this.layerGame_mybag.getChildByName("node_bagbox").getChildByName(t).getChildByName("num").getComponent(cc.Label).string;
                return e && e > 0 ? parseInt(e) : 0
            },
            useDaojuOnce: function(t) {
                var e = location.origin + "/game/prop/use",
                i = this.daojuUsePost["" + t].propUserRelationIds;
                if (! (i && i.length < 1)) {
                    var o = {
                        gameType: this.gameInfo.gameType,
                        propUserRelationId: i[0],
                        propType: this.daojuUsePost["" + t].propType,
                        playId: this.gameInfo.playId,
                        periodId: this.gameInfo.periodId
                    },
                    n = this;
                    this.ajaxPost(e, JSON.stringify(o),
                    function(e) {
                        var o = JSON.parse(e);
                        if (0 == o.code) {
                            console.log("\u66f4\u65b0\u6210\u529f\u4e86\uff01\uff01\uff01");
                            var r = i.concat();
                            r.shift(),
                            n.daojuUsePost["" + t].propUserRelationIds = r,
                            n.daojuUsePost["" + t].total = r.length,
                            n.daojuUsePost["" + t].vals && (0 == n.daojuUsePost["" + t].propType ? main.count = main.count + n.daojuUsePost["" + t].vals: 1 == n.daojuUsePost["" + t].propType && (main.chindrop = main.chindrop + n.daojuUsePost["" + t].vals)),
                            n.renderDaoju("" + t, n.findNum("" + t) - 1)
                        } else alert(o.message)
                    }).bind(this)
                }
            },
            alertPop: function(t, e) {
                this.scheduleOnce(function() {
                    t && alert(t),
                    e && e()
                },
                3)
            },
            btnCallBack: function(t, e) {
                "btn_rePlay" == e && (this.main.active = !0),
                "btn_begin" == e && (this.main.active = !0),
                "btn_tapGamebag" == e && (main.count > 0 ? (this.layerGame_mybag.zIndex = 10, this.layerGame_mybag.active = !0, main.node_alert.getChildByName("second").getComponent(cc.Label).unscheduleAllCallbacks()) : window.location = "/app"),
                "btn_closeGamebag" == e && (this.layerGame_mybag.active = !1, main.count && main.showTime(main.count), main.freshTabData()),
                "btn_mall" == e && (window.location = "/app"),
                "daoju0" == e && (this.daojuUsePost.iconbox_5s.total < 1 ? alert("\u9a8c\u771f\u52ff\u5fd8\u6211\u7cfb\u5217\u83b7\u53d6\u9053\u5177") : this.useDaojuOnce("iconbox_5s")),
                "daoju1" == e && (this.daojuUsePost.iconbox_10s.total < 1 ? alert("\u9a8c\u771f\u52ff\u5fd8\u6211\u7cfb\u5217\u83b7\u53d6\u9053\u5177") : this.useDaojuOnce("iconbox_10s")),
                "daoju2" == e && (this.daojuUsePost.iconbox_5p.total < 1 ? alert("\u9a8c\u771f\u52ff\u5fd8\u6211\u7cfb\u5217\u83b7\u53d6\u9053\u5177") : this.useDaojuOnce("iconbox_5p")),
                "daoju3" == e && (this.daojuUsePost.iconbox_10p.total < 1 ? alert("\u9a8c\u771f\u52ff\u5fd8\u6211\u7cfb\u5217\u83b7\u53d6\u9053\u5177") : this.useDaojuOnce("iconbox_10p")),
                "daoju4" == e && (this.daojuUsePost.iconbox_20p.total < 1 ? alert("\u9a8c\u771f\u52ff\u5fd8\u6211\u7cfb\u5217\u83b7\u53d6\u9053\u5177") : this.useDaojuOnce("iconbox_20p"))
            },
            update: function() {},
            ajaxGet: function(t, e) {
                var i = cc.loader.getXMLHttpRequest();
                console.log("Status: Send Get Request to " + t),
                i.open("GET", t, !0),
                i.onreadystatechange = function() {
                    4 === i.readyState && i.status >= 200 && i.status <= 207 && e(i.responseText)
                },
                i.send()
            },
            ajaxPost: function(t, e, i) {
                var o = arguments.length;
                2 == o && (i = arguments[1], e = "");
                var n = cc.loader.getXMLHttpRequest();
                n.open("POST", t),
                n.setRequestHeader("Content-Type", "application/json;charset=UTF-8"),
                n.onreadystatechange = function() {
                    4 === n.readyState && n.status >= 200 && n.status <= 207 && i(n.responseText)
                },
                n.send(e)
            }
        }),
        cc._RF.pop()
    },
    {
        "./crypto-js": 1
    }],
    main: [function(t, e) {
        "use strict";
        cc._RF.push(e, "b92c5Wt6ElDzpMOFTnGVXpe", "main"),
        cc.Class({
            extends: cc.Component,
            properties: {
                block_show: {
                    type: cc.Node,
                default:
                    null
                },
                block_arr: {
                    type: [cc.Prefab],
                default:
                    []
                },
                pre_ball: {
                    type: [cc.Prefab],
                default:
                    []
                },
                label_score: {
                    type: cc.Label,
                default:
                    null
                },
                node_xian: {
                    type: cc.Node,
                default:
                    null
                },
                node_point: {
                    type: cc.Node,
                default:
                    null
                },
                node_alert: {
                    type: cc.Node,
                default:
                    null
                },
                audoi_pz: {
                    type: cc.AudioClip,
                default:
                    null
                },
                pre_tx: {
                    type: cc.Prefab,
                default:
                    null
                },
                pre_fireworks: {
                    type: cc.Prefab,
                default:
                    null
                }
            },
            onLoad: function() {
                console.log("main-onLoad"),
                window.main = this,
                this.arr_num = [1, 2, 3, 4, 5, 6],
                this.f_scale = .75,
                this.init(),
                this.setTouch(),
                this.showTime(180)
            },
            createBall: function() {
                cc.instantiate(this.pre_ball).parent = this.node
            },
            init: function() {
                this.block_show.active = !1,
                this.node_xian.active = !1,
                this.f_scale = .75,
                this.block_show.scale = this.f_scale,
                this.chindrop = 0,
                this.f_xian = 300,
                this.is_over = !1,
                this.label_score.string = this.chindrop,
                this.block_random = 1,
                this.showBlock(),
                this.cleanAllBlocks()
            },
            addScore: function(t) {
                this.chindrop = this.chindrop + t,
                this.label_score.string = this.chindrop
            },
            blockcurSc: function() {
                var t = this.yyyymmdd(),
                e = this.getMonthDays(),
                i = game.gameInfo.key ? game.gameInfo.key.length: 0,
                o = "00000000" + parseInt(t * e / i),
                n = String(this.chindrop),
                r = CryptoJS.enc.Utf8.parse(o),
                a = CryptoJS.enc.Utf8.parse(o),
                s = CryptoJS.AES.encrypt(n, r, {
                    iv: a,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.ZeroPadding
                }),
                c = CryptoJS.enc.Base64.stringify(s.ciphertext);
                console.log("\u52a0\u5bc6" + c);
                var h = CryptoJS.enc.Base64.parse(c),
                l = CryptoJS.enc.Base64.stringify(h),
                u = CryptoJS.AES.decrypt(l, r, {
                    iv: a,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.ZeroPadding
                }).toString(CryptoJS.enc.Utf8);
                return console.log("\u89e3\u5bc6" + u),
                c
            },
            getMonthDays: function() {
                var t = new Date,
                e = t.getFullYear(),
                i = t.getMonth() + 1;
                return new Date(e, i, 0).getDate()
            },
            yyyymmdd: function() {
                var t = new Date,
                e = t.getFullYear().toString(),
                i = (t.getMonth() + 1).toString(),
                o = t.getDate().toString();
                return e + (i[1] ? i: "0" + i[0]) + (o[1] ? o: "0" + o[0])
            },
            showTime: function(t, e) {
                e ? this.count += t: this.count = t,
                game.count = this.count,
                console.log("1" + this.count),
                this.callback = function() {
                    if (this.count < 1 && !game.layerGame_mybag.active) return main.gameOver(),
                    void this.node_alert.getChildByName("second").getComponent(cc.Label).unschedule(this.callback); ! game.layerGame_mybag.active && this.count > 0 && this.count--,
                    console.log(this.count),
                    this.node_alert.getChildByName("second").getComponent(cc.Label).string = this.count.toString() + " \u79d2"
                }.bind(this),
                this.count > 0 && this.node_alert.getChildByName("second").getComponent(cc.Label).schedule(this.callback, 1),
                this.node_alert.getChildByName("second").getComponent(cc.Label).string = this.count.toString() + " \u79d2"
            },
            setTouch: function() {
                game.node.on("touchstart",
                function(t) {
                    if (console.log("touchstart"), 0 != this.block_show.active && !this.is_over) {
                        var e = t.getLocation();
                        e = game.node.convertToNodeSpaceAR(e),
                        this.block_show.x = e.x
                    }
                },
                this),
                game.node.on("touchmove",
                function(t) {
                    if (0 != this.block_show.active && !this.is_over) {
                        var e = t.getLocation();
                        e = game.node.convertToNodeSpaceAR(e),
                        this.block_show.x = e.x
                    }
                },
                this),
                game.node.on("touchend",
                function() {
                    if (0 != this.block_show.active && !this.is_over) {
                        this.block_show.active = !1;
                        var t = this.block_show.getPosition();
                        console.log(t),
                        console.log("block_random" + this.block_random),
                        this.createBlock(this.block_random, t, !1),
                        this.count && this.count <= 180 && (this.arr_num = [3, 4, 5, 6]);
                        var e = this.arr_num.length,
                        i = Math.floor(Math.random() * e);
                        this.block_random = this.arr_num[i],
                        this.scheduleOnce(function() {
                            this.showBlock()
                        }.bind(this), 1)
                    }
                },
                this),
                game.node.on("touchcancel",
                function() {
                    if (console.log("touchcancel"), 0 != this.block_show.active && !this.is_over) {
                        this.block_show.active = !1;
                        var t = this.block_show.getPosition();
                        this.createBlock(this.block_random, t, !1),
                        this.block_random = Math.floor(5 * Math.random()) + 1,
                        this.scheduleOnce(function() {
                            this.showBlock()
                        }.bind(this), 1)
                    }
                },
                this)
            },
            playSound: function() {
                cc.audioEngine.play(this.audoi_pz, !1, 1)
            },
            createTx: function(t, e, i) {
                var o;
                cc.log(t + "createTx"),
                9 == t ? ((o = cc.instantiate(this.pre_fireworks)).parent = this.node, o.zIndex = 3) : ((o = cc.instantiate(this.pre_tx)).parent = this.node, o.zIndex = 3, o.scale = 0, cc.log("node_tx" + i), o.width = i, o.height = i, o.setPosition(e)),
                1 == t ? o.color = new cc.Color(189, 34, 35) : 2 == t ? o.color = new cc.Color(13, 150, 74) : 3 == t ? o.color = new cc.Color(208, 0, 3) : 4 == t ? o.color = new cc.Color(208, 1, 27) : 5 == t ? o.color = new cc.Color(226, 168, 64) : 6 == t ? o.color = new cc.Color(252, 76, 84) : 7 == t ? o.color = new cc.Color(186, 21, 20) : 8 == t && (o.color = new cc.Color(168, 29, 35));
                var n, r = cc.scaleTo(.16, 1),
                a = cc.delayTime(6),
                s = cc.callFunc(function() {
                    o.removeFromParent()
                }),
                c = cc.delayTime(10),
                h = cc.callFunc(function() {
                    o.removeFromParent()
                });
                n = 9 == t ? cc.sequence(a, c, h) : cc.sequence(r, s),
                o.runAction(n)
            },
            createBlock: function(t, e, i) {
                var o = cc.instantiate(this.block_arr[t]);
                if (o.parent = this.node, o.scale = this.f_scale, o.setPosition(e), o.getComponent("block").init(t), i) {
                    o.scale = .3;
                    var n = cc.scaleTo(.12, this.f_scale);
                    o.runAction(n)
                }
            },
            showBlock: function() {
                this.block_show.active = !0,
                this.block_show.setPosition(cc.v2(0, 500));
                for (var t = this.block_show.children,
                e = 0; e < t.length; e++) console.log(t[e].name),
                t[e].name == this.block_random ? t[e].active = !0 : t[e].active = !1;
                console.log(this.f_scale),
                this.block_show.scale = 0;
                var i = cc.scaleTo(.15, this.f_scale);
                this.block_show.runAction(i)
            },
            showXian: function() {
                for (var t = !1,
                e = this.node.children,
                i = 0; i < e.length; i++) {
                    var o = e[i].getComponent("block");
                    if (o && o.is_pz && e[i].y + e[i].height / 2 * this.f_scale > this.f_xian) {
                        t = !0;
                        break
                    }
                }
                this.node_xian.active = !!t
            },
            freshTabData: function() {
                this.node_alert.getChildByName("second").getComponent(cc.Label).string = this.count.toString() + " \u79d2",
                this.label_score.string = this.chindrop
            },
            gameOver: function() {
                var t = this;
                console.log("gameOver"),
                this.node_xian.active = !1,
                this.block_show.active = !1;
                var e = 0;
                this.is_over = !0;
                for (var i = this.node.children,
                o = function(o) {
                    o <= 10 ? i[o].getComponent("block") && (e < (r = .1 + .025 * o) && (e = r), a = cc.delayTime(r), s = cc.callFunc(function() {
                        var t = i[o].getComponent("block").block_type,
                        e = i[o].getPosition(),
                        n = i[o].width;
                        this.createTx(t, e, n),
                        i[o].active = !1
                    },
                    t), c = cc.sequence(a, s), i[o].runAction(c)) : i[o].active = !1
                },
                n = 0; n < i.length; n++) {
                    var r, a, s, c;
                    o(n)
                }
                if (console.log(game.gameInfo), game.gameInfo && this.is_over) {
                    var h = this,
					h.chindrop=code,
                    l = h.blockcurSc(h.chindrop),
                    u = {
                        gameType: game.gameInfo.gameType,
                        playId: game.gameInfo.playId,
                        periodId: game.gameInfo.periodId,
                        grade: l,
                        key: game.gameInfo.key
                    };
                    game.ajaxPost(location.origin + "/game/play/end", JSON.stringify(u),
                    function(t) {
                        if (t) {
                            var i = JSON.parse(t);
                            console.log(i);
                            var o = location.origin + "/guangdong/activity/watermelon/h5/result.html?grade=" + h.chindrop + "&periodId=" + game.gameInfo.periodId;
                            i.prizeUrl ? location.href = o + "&u=" + encodeURIComponent(i.prizeUrl) : game.scheduleOnce(function() {
                                location.href = o
                            },
                            e + .1)
                        }
                    })
                }
            },
            cleanAllBlocks: function() {
                for (var t = this.node.children,
                e = t.length - 1; e >= 0; e--) t[e].getComponent("block") && t[e].removeFromParent()
            },
            btnCallBack: function(t, e) {
                "btn_rePlay" == e && this.init(),
                "btn_begin" == e && this.init(),
                "btn_tapGamebag" == e && (console.log("\u6253\u5f00\u6e38\u620f\u9875\u9762\u7684\u80cc\u5305"), game.layerGame_mybag.zIndex = 10, game.layerGame_mybag.active = !0),
                "btn_closeGamebag" == e && (game.layerGame_mybag.active = !1),
                "btn_mall" == e && (window.location = "/app"),
                "btn_again" == e && this.init()
            },
            update: function() {
                this.showXian()
            },
            get: function(t, e) {
                var i = cc.loader.getXMLHttpRequest();
                console.log("Status: Send Get Request to " + t),
                i.open("GET", t, !0),
                i.onreadystatechange = function() {
                    4 === i.readyState && i.status >= 200 && i.status <= 207 && e(!0, i.responseText)
                },
                i.send()
            },
            post: function(t, e, i) {
                var o = arguments.length;
                2 == o && (i = arguments[1], e = "");
                var n = cc.loader.getXMLHttpRequest();
                n.open("POST", t),
                n.setRequestHeader("Content-Type", "application/json;charset=UTF-8"),
                n.onreadystatechange = function() {
                    4 === n.readyState && n.status >= 200 && n.status <= 207 && i(!0, n.responseText)
                },
                n.send(e)
            }
        }),
        cc._RF.pop()
    },
    {}],
    time: [function(t, e) {
        "use strict";
        cc._RF.push(e, "a7ca5O6v1tK/I1SPwU6FC5x", "time"),
        cc.Class({
            extends: cc.Component,
            properties: {},
            onLoad: function() {
                game.StoreData = {
                    _totalCountdownNum: 7200,
                    _isUse: !1,
                    _timestampOfDeparture: 0
                }
            },
            init: function() {
                var t = new Date;
                console.log("#### store data", t),
                tempData ? (this._isUse = tempData.is_use, this._timestampOfDeparture = tempData.timestamp_of_departure, t.getDate() != tempData.last_date ? this._refreshNum = 1 : this._refreshNum = tempData.refresh_num) : game.StoreData._timestampOfDeparture = t.getTime()
            },
            SetData: function() { (new Date).getDate(),
                game.StoreData._refreshNum,
                game.StoreData._timestampOfDeparture,
                game.StoreData._isUse,
                game.StoreData._buyNum
            },
            GetCountdownInfo: function() {
                return {
                    isUse: game.StoreData._isUse,
                    timestamp: game.StoreData._timestampOfDeparture,
                    totalCountdownTime: game.StoreData._totalCountdownNum
                }
            },
            SetCountdownInfo: function(t, e) {
                this._isUse = t,
                e && (game.StoreData._timestampOfDeparture = e),
                this.SetData()
            },
            onBeginContact: function() {},
            onEndContact: function() {},
            onPreSolve: function() {},
            onPostSolve: function() {},
            update: function() {}
        }),
        cc._RF.pop()
    },
    {}]
},
{},
["begin", "block", "game", "main", "time"]);
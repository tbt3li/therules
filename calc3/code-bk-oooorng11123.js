(function() {
    const g = document.createElement("link").relList;
    if (g && g.supports && g.supports("modulepreload")) return;
    for (const E of document.querySelectorAll('link[rel="modulepreload"]')) r(E);
    new MutationObserver(E => {
        for (const M of E)
            if (M.type === "childList")
                for (const D of M.addedNodes) D.tagName === "LINK" && D.rel === "modulepreload" && r(D)
    }).observe(document, {
        childList: !0,
        subtree: !0
    });

    function j(E) {
        const M = {};
        return E.integrity && (M.integrity = E.integrity), E.referrerPolicy && (M.referrerPolicy = E.referrerPolicy), E.crossOrigin === "use-credentials" ? M.credentials = "include" : E.crossOrigin === "anonymous" ? M.credentials = "omit" : M.credentials = "same-origin", M
    }

    function r(E) {
        if (E.ep) return;
        E.ep = !0;
        const M = j(E);
        fetch(E.href, M)
    }
})();
var yc = {
        exports: {}
    },
    _n = {};
var Vd;

function ph() {
    if (Vd) return _n;
    Vd = 1;
    var o = Symbol.for("react.transitional.element"),
        g = Symbol.for("react.fragment");

    function j(r, E, M) {
        var D = null;
        if (M !== void 0 && (D = "" + M), E.key !== void 0 && (D = "" + E.key), "key" in E) {
            M = {};
            for (var O in E) O !== "key" && (M[O] = E[O])
        } else M = E;
        return E = M.ref, {
            $$typeof: o,
            type: r,
            key: D,
            ref: E !== void 0 ? E : null,
            props: M
        }
    }
    return _n.Fragment = g, _n.jsx = j, _n.jsxs = j, _n
}
var jd;

function vh() {
    return jd || (jd = 1, yc.exports = ph()), yc.exports
}
var i = vh(),
    pc = {
        exports: {}
    },
    de = {};
var Dd;

function Sh() {
    if (Dd) return de;
    Dd = 1;
    var o = Symbol.for("react.transitional.element"),
        g = Symbol.for("react.portal"),
        j = Symbol.for("react.fragment"),
        r = Symbol.for("react.strict_mode"),
        E = Symbol.for("react.profiler"),
        M = Symbol.for("react.consumer"),
        D = Symbol.for("react.context"),
        O = Symbol.for("react.forward_ref"),
        b = Symbol.for("react.suspense"),
        y = Symbol.for("react.memo"),
        R = Symbol.for("react.lazy"),
        _ = Symbol.for("react.activity"),
        W = Symbol.iterator;

    function le(d) {
        return d === null || typeof d != "object" ? null : (d = W && d[W] || d["@@iterator"], typeof d == "function" ? d : null)
    }
    var se = {
            isMounted: function() {
                return !1
            },
            enqueueForceUpdate: function() {},
            enqueueReplaceState: function() {},
            enqueueSetState: function() {}
        },
        K = Object.assign,
        $ = {};

    function w(d, N, Q) {
        this.props = d, this.context = N, this.refs = $, this.updater = Q || se
    }
    w.prototype.isReactComponent = {}, w.prototype.setState = function(d, N) {
        if (typeof d != "object" && typeof d != "function" && d != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, d, N, "setState")
    }, w.prototype.forceUpdate = function(d) {
        this.updater.enqueueForceUpdate(this, d, "forceUpdate")
    };

    function ee() {}
    ee.prototype = w.prototype;

    function U(d, N, Q) {
        this.props = d, this.context = N, this.refs = $, this.updater = Q || se
    }
    var X = U.prototype = new ee;
    X.constructor = U, K(X, w.prototype), X.isPureReactComponent = !0;
    var ie = Array.isArray;

    function L() {}
    var G = {
            H: null,
            A: null,
            T: null,
            S: null
        },
        T = Object.prototype.hasOwnProperty;

    function Ee(d, N, Q) {
        var Z = Q.ref;
        return {
            $$typeof: o,
            type: d,
            key: N,
            ref: Z !== void 0 ? Z : null,
            props: Q
        }
    }

    function Y(d, N) {
        return Ee(d.type, N, d.props)
    }

    function F(d) {
        return typeof d == "object" && d !== null && d.$$typeof === o
    }

    function te(d) {
        var N = {
            "=": "=0",
            ":": "=2"
        };
        return "$" + d.replace(/[=:]/g, function(Q) {
            return N[Q]
        })
    }
    var ce = /\/+/g;

    function re(d, N) {
        return typeof d == "object" && d !== null && d.key != null ? te("" + d.key) : N.toString(36)
    }

    function je(d) {
        switch (d.status) {
            case "fulfilled":
                return d.value;
            case "rejected":
                throw d.reason;
            default:
                switch (typeof d.status == "string" ? d.then(L, L) : (d.status = "pending", d.then(function(N) {
                        d.status === "pending" && (d.status = "fulfilled", d.value = N)
                    }, function(N) {
                        d.status === "pending" && (d.status = "rejected", d.reason = N)
                    })), d.status) {
                    case "fulfilled":
                        return d.value;
                    case "rejected":
                        throw d.reason
                }
        }
        throw d
    }

    function p(d, N, Q, Z, fe) {
        var ye = typeof d;
        (ye === "undefined" || ye === "boolean") && (d = null);
        var Be = !1;
        if (d === null) Be = !0;
        else switch (ye) {
            case "bigint":
            case "string":
            case "number":
                Be = !0;
                break;
            case "object":
                switch (d.$$typeof) {
                    case o:
                    case g:
                        Be = !0;
                        break;
                    case R:
                        return Be = d._init, p(Be(d._payload), N, Q, Z, fe)
                }
        }
        if (Be) return fe = fe(d), Be = Z === "" ? "." + re(d, 0) : Z, ie(fe) ? (Q = "", Be != null && (Q = Be.replace(ce, "$&/") + "/"), p(fe, N, Q, "", function(Ul) {
            return Ul
        })) : fe != null && (F(fe) && (fe = Y(fe, Q + (fe.key == null || d && d.key === fe.key ? "" : ("" + fe.key).replace(ce, "$&/") + "/") + Be)), N.push(fe)), 1;
        Be = 0;
        var Pe = Z === "" ? "." : Z + ":";
        if (ie(d))
            for (var qe = 0; qe < d.length; qe++) Z = d[qe], ye = Pe + re(Z, qe), Be += p(Z, N, Q, ye, fe);
        else if (qe = le(d), typeof qe == "function")
            for (d = qe.call(d), qe = 0; !(Z = d.next()).done;) Z = Z.value, ye = Pe + re(Z, qe++), Be += p(Z, N, Q, ye, fe);
        else if (ye === "object") {
            if (typeof d.then == "function") return p(je(d), N, Q, Z, fe);
            throw N = String(d), Error("Objects are not valid as a React child (found: " + (N === "[object Object]" ? "object with keys {" + Object.keys(d).join(", ") + "}" : N) + "). If you meant to render a collection of children, use an array instead.")
        }
        return Be
    }

    function H(d, N, Q) {
        if (d == null) return d;
        var Z = [],
            fe = 0;
        return p(d, Z, "", "", function(ye) {
            return N.call(Q, ye, fe++)
        }), Z
    }

    function J(d) {
        if (d._status === -1) {
            var N = d._result;
            N = N(), N.then(function(Q) {
                (d._status === 0 || d._status === -1) && (d._status = 1, d._result = Q)
            }, function(Q) {
                (d._status === 0 || d._status === -1) && (d._status = 2, d._result = Q)
            }), d._status === -1 && (d._status = 0, d._result = N)
        }
        if (d._status === 1) return d._result.default;
        throw d._result
    }
    var he = typeof reportError == "function" ? reportError : function(d) {
            if (typeof window == "object" && typeof window.ErrorEvent == "function") {
                var N = new window.ErrorEvent("error", {
                    bubbles: !0,
                    cancelable: !0,
                    message: typeof d == "object" && d !== null && typeof d.message == "string" ? String(d.message) : String(d),
                    error: d
                });
                if (!window.dispatchEvent(N)) return
            } else if (typeof process == "object" && typeof process.emit == "function") {
                process.emit("uncaughtException", d);
                return
            }
            console.error(d)
        },
        q = {
            map: H,
            forEach: function(d, N, Q) {
                H(d, function() {
                    N.apply(this, arguments)
                }, Q)
            },
            count: function(d) {
                var N = 0;
                return H(d, function() {
                    N++
                }), N
            },
            toArray: function(d) {
                return H(d, function(N) {
                    return N
                }) || []
            },
            only: function(d) {
                if (!F(d)) throw Error("React.Children.only expected to receive a single React element child.");
                return d
            }
        };
    return de.Activity = _, de.Children = q, de.Component = w, de.Fragment = j, de.Profiler = E, de.PureComponent = U, de.StrictMode = r, de.Suspense = b, de.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = G, de.__COMPILER_RUNTIME = {
        __proto__: null,
        c: function(d) {
            return G.H.useMemoCache(d)
        }
    }, de.cache = function(d) {
        return function() {
            return d.apply(null, arguments)
        }
    }, de.cacheSignal = function() {
        return null
    }, de.cloneElement = function(d, N, Q) {
        if (d == null) throw Error("The argument must be a React element, but you passed " + d + ".");
        var Z = K({}, d.props),
            fe = d.key;
        if (N != null)
            for (ye in N.key !== void 0 && (fe = "" + N.key), N) !T.call(N, ye) || ye === "key" || ye === "__self" || ye === "__source" || ye === "ref" && N.ref === void 0 || (Z[ye] = N[ye]);
        var ye = arguments.length - 2;
        if (ye === 1) Z.children = Q;
        else if (1 < ye) {
            for (var Be = Array(ye), Pe = 0; Pe < ye; Pe++) Be[Pe] = arguments[Pe + 2];
            Z.children = Be
        }
        return Ee(d.type, fe, Z)
    }, de.createContext = function(d) {
        return d = {
            $$typeof: D,
            _currentValue: d,
            _currentValue2: d,
            _threadCount: 0,
            Provider: null,
            Consumer: null
        }, d.Provider = d, d.Consumer = {
            $$typeof: M,
            _context: d
        }, d
    }, de.createElement = function(d, N, Q) {
        var Z, fe = {},
            ye = null;
        if (N != null)
            for (Z in N.key !== void 0 && (ye = "" + N.key), N) T.call(N, Z) && Z !== "key" && Z !== "__self" && Z !== "__source" && (fe[Z] = N[Z]);
        var Be = arguments.length - 2;
        if (Be === 1) fe.children = Q;
        else if (1 < Be) {
            for (var Pe = Array(Be), qe = 0; qe < Be; qe++) Pe[qe] = arguments[qe + 2];
            fe.children = Pe
        }
        if (d && d.defaultProps)
            for (Z in Be = d.defaultProps, Be) fe[Z] === void 0 && (fe[Z] = Be[Z]);
        return Ee(d, ye, fe)
    }, de.createRef = function() {
        return {
            current: null
        }
    }, de.forwardRef = function(d) {
        return {
            $$typeof: O,
            render: d
        }
    }, de.isValidElement = F, de.lazy = function(d) {
        return {
            $$typeof: R,
            _payload: {
                _status: -1,
                _result: d
            },
            _init: J
        }
    }, de.memo = function(d, N) {
        return {
            $$typeof: y,
            type: d,
            compare: N === void 0 ? null : N
        }
    }, de.startTransition = function(d) {
        var N = G.T,
            Q = {};
        G.T = Q;
        try {
            var Z = d(),
                fe = G.S;
            fe !== null && fe(Q, Z), typeof Z == "object" && Z !== null && typeof Z.then == "function" && Z.then(L, he)
        } catch (ye) {
            he(ye)
        } finally {
            N !== null && Q.types !== null && (N.types = Q.types), G.T = N
        }
    }, de.unstable_useCacheRefresh = function() {
        return G.H.useCacheRefresh()
    }, de.use = function(d) {
        return G.H.use(d)
    }, de.useActionState = function(d, N, Q) {
        return G.H.useActionState(d, N, Q)
    }, de.useCallback = function(d, N) {
        return G.H.useCallback(d, N)
    }, de.useContext = function(d) {
        return G.H.useContext(d)
    }, de.useDebugValue = function() {}, de.useDeferredValue = function(d, N) {
        return G.H.useDeferredValue(d, N)
    }, de.useEffect = function(d, N) {
        return G.H.useEffect(d, N)
    }, de.useEffectEvent = function(d) {
        return G.H.useEffectEvent(d)
    }, de.useId = function() {
        return G.H.useId()
    }, de.useImperativeHandle = function(d, N, Q) {
        return G.H.useImperativeHandle(d, N, Q)
    }, de.useInsertionEffect = function(d, N) {
        return G.H.useInsertionEffect(d, N)
    }, de.useLayoutEffect = function(d, N) {
        return G.H.useLayoutEffect(d, N)
    }, de.useMemo = function(d, N) {
        return G.H.useMemo(d, N)
    }, de.useOptimistic = function(d, N) {
        return G.H.useOptimistic(d, N)
    }, de.useReducer = function(d, N, Q) {
        return G.H.useReducer(d, N, Q)
    }, de.useRef = function(d) {
        return G.H.useRef(d)
    }, de.useState = function(d) {
        return G.H.useState(d)
    }, de.useSyncExternalStore = function(d, N, Q) {
        return G.H.useSyncExternalStore(d, N, Q)
    }, de.useTransition = function() {
        return G.H.useTransition()
    }, de.version = "19.2.3", de
}
var Od;

function Ac() {
    return Od || (Od = 1, pc.exports = Sh()), pc.exports
}
var ue = Ac(),
    vc = {
        exports: {}
    },
    Rn = {},
    Sc = {
        exports: {}
    },
    bc = {};
var zd;

function bh() {
    return zd || (zd = 1, (function(o) {
        function g(p, H) {
            var J = p.length;
            p.push(H);
            e: for (; 0 < J;) {
                var he = J - 1 >>> 1,
                    q = p[he];
                if (0 < E(q, H)) p[he] = H, p[J] = q, J = he;
                else break e
            }
        }

        function j(p) {
            return p.length === 0 ? null : p[0]
        }

        function r(p) {
            if (p.length === 0) return null;
            var H = p[0],
                J = p.pop();
            if (J !== H) {
                p[0] = J;
                e: for (var he = 0, q = p.length, d = q >>> 1; he < d;) {
                    var N = 2 * (he + 1) - 1,
                        Q = p[N],
                        Z = N + 1,
                        fe = p[Z];
                    if (0 > E(Q, J)) Z < q && 0 > E(fe, Q) ? (p[he] = fe, p[Z] = J, he = Z) : (p[he] = Q, p[N] = J, he = N);
                    else if (Z < q && 0 > E(fe, J)) p[he] = fe, p[Z] = J, he = Z;
                    else break e
                }
            }
            return H
        }

        function E(p, H) {
            var J = p.sortIndex - H.sortIndex;
            return J !== 0 ? J : p.id - H.id
        }
        if (o.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
            var M = performance;
            o.unstable_now = function() {
                return M.now()
            }
        } else {
            var D = Date,
                O = D.now();
            o.unstable_now = function() {
                return D.now() - O
            }
        }
        var b = [],
            y = [],
            R = 1,
            _ = null,
            W = 3,
            le = !1,
            se = !1,
            K = !1,
            $ = !1,
            w = typeof setTimeout == "function" ? setTimeout : null,
            ee = typeof clearTimeout == "function" ? clearTimeout : null,
            U = typeof setImmediate < "u" ? setImmediate : null;

        function X(p) {
            for (var H = j(y); H !== null;) {
                if (H.callback === null) r(y);
                else if (H.startTime <= p) r(y), H.sortIndex = H.expirationTime, g(b, H);
                else break;
                H = j(y)
            }
        }

        function ie(p) {
            if (K = !1, X(p), !se)
                if (j(b) !== null) se = !0, L || (L = !0, te());
                else {
                    var H = j(y);
                    H !== null && je(ie, H.startTime - p)
                }
        }
        var L = !1,
            G = -1,
            T = 5,
            Ee = -1;

        function Y() {
            return $ ? !0 : !(o.unstable_now() - Ee < T)
        }

        function F() {
            if ($ = !1, L) {
                var p = o.unstable_now();
                Ee = p;
                var H = !0;
                try {
                    e: {
                        se = !1,
                        K && (K = !1, ee(G), G = -1),
                        le = !0;
                        var J = W;
                        try {
                            t: {
                                for (X(p), _ = j(b); _ !== null && !(_.expirationTime > p && Y());) {
                                    var he = _.callback;
                                    if (typeof he == "function") {
                                        _.callback = null, W = _.priorityLevel;
                                        var q = he(_.expirationTime <= p);
                                        if (p = o.unstable_now(), typeof q == "function") {
                                            _.callback = q, X(p), H = !0;
                                            break t
                                        }
                                        _ === j(b) && r(b), X(p)
                                    } else r(b);
                                    _ = j(b)
                                }
                                if (_ !== null) H = !0;
                                else {
                                    var d = j(y);
                                    d !== null && je(ie, d.startTime - p), H = !1
                                }
                            }
                            break e
                        }
                        finally {
                            _ = null, W = J, le = !1
                        }
                        H = void 0
                    }
                }
                finally {
                    H ? te() : L = !1
                }
            }
        }
        var te;
        if (typeof U == "function") te = function() {
            U(F)
        };
        else if (typeof MessageChannel < "u") {
            var ce = new MessageChannel,
                re = ce.port2;
            ce.port1.onmessage = F, te = function() {
                re.postMessage(null)
            }
        } else te = function() {
            w(F, 0)
        };

        function je(p, H) {
            G = w(function() {
                p(o.unstable_now())
            }, H)
        }
        o.unstable_IdlePriority = 5, o.unstable_ImmediatePriority = 1, o.unstable_LowPriority = 4, o.unstable_NormalPriority = 3, o.unstable_Profiling = null, o.unstable_UserBlockingPriority = 2, o.unstable_cancelCallback = function(p) {
            p.callback = null
        }, o.unstable_forceFrameRate = function(p) {
            0 > p || 125 < p ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : T = 0 < p ? Math.floor(1e3 / p) : 5
        }, o.unstable_getCurrentPriorityLevel = function() {
            return W
        }, o.unstable_next = function(p) {
            switch (W) {
                case 1:
                case 2:
                case 3:
                    var H = 3;
                    break;
                default:
                    H = W
            }
            var J = W;
            W = H;
            try {
                return p()
            } finally {
                W = J
            }
        }, o.unstable_requestPaint = function() {
            $ = !0
        }, o.unstable_runWithPriority = function(p, H) {
            switch (p) {
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                    break;
                default:
                    p = 3
            }
            var J = W;
            W = p;
            try {
                return H()
            } finally {
                W = J
            }
        }, o.unstable_scheduleCallback = function(p, H, J) {
            var he = o.unstable_now();
            switch (typeof J == "object" && J !== null ? (J = J.delay, J = typeof J == "number" && 0 < J ? he + J : he) : J = he, p) {
                case 1:
                    var q = -1;
                    break;
                case 2:
                    q = 250;
                    break;
                case 5:
                    q = 1073741823;
                    break;
                case 4:
                    q = 1e4;
                    break;
                default:
                    q = 5e3
            }
            return q = J + q, p = {
                id: R++,
                callback: H,
                priorityLevel: p,
                startTime: J,
                expirationTime: q,
                sortIndex: -1
            }, J > he ? (p.sortIndex = J, g(y, p), j(b) === null && p === j(y) && (K ? (ee(G), G = -1) : K = !0, je(ie, J - he))) : (p.sortIndex = q, g(b, p), se || le || (se = !0, L || (L = !0, te()))), p
        }, o.unstable_shouldYield = Y, o.unstable_wrapCallback = function(p) {
            var H = W;
            return function() {
                var J = W;
                W = H;
                try {
                    return p.apply(this, arguments)
                } finally {
                    W = J
                }
            }
        }
    })(bc)), bc
}
var Hd;

function xh() {
    return Hd || (Hd = 1, Sc.exports = bh()), Sc.exports
}
var xc = {
        exports: {}
    },
    st = {};
var _d;

function Eh() {
    if (_d) return st;
    _d = 1;
    var o = Ac();

    function g(b) {
        var y = "https://react.dev/errors/" + b;
        if (1 < arguments.length) {
            y += "?args[]=" + encodeURIComponent(arguments[1]);
            for (var R = 2; R < arguments.length; R++) y += "&args[]=" + encodeURIComponent(arguments[R])
        }
        return "Minified React error #" + b + "; visit " + y + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    }

    function j() {}
    var r = {
            d: {
                f: j,
                r: function() {
                    throw Error(g(522))
                },
                D: j,
                C: j,
                L: j,
                m: j,
                X: j,
                S: j,
                M: j
            },
            p: 0,
            findDOMNode: null
        },
        E = Symbol.for("react.portal");

    function M(b, y, R) {
        var _ = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
        return {
            $$typeof: E,
            key: _ == null ? null : "" + _,
            children: b,
            containerInfo: y,
            implementation: R
        }
    }
    var D = o.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;

    function O(b, y) {
        if (b === "font") return "";
        if (typeof y == "string") return y === "use-credentials" ? y : ""
    }
    return st.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r, st.createPortal = function(b, y) {
        var R = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
        if (!y || y.nodeType !== 1 && y.nodeType !== 9 && y.nodeType !== 11) throw Error(g(299));
        return M(b, y, null, R)
    }, st.flushSync = function(b) {
        var y = D.T,
            R = r.p;
        try {
            if (D.T = null, r.p = 2, b) return b()
        } finally {
            D.T = y, r.p = R, r.d.f()
        }
    }, st.preconnect = function(b, y) {
        typeof b == "string" && (y ? (y = y.crossOrigin, y = typeof y == "string" ? y === "use-credentials" ? y : "" : void 0) : y = null, r.d.C(b, y))
    }, st.prefetchDNS = function(b) {
        typeof b == "string" && r.d.D(b)
    }, st.preinit = function(b, y) {
        if (typeof b == "string" && y && typeof y.as == "string") {
            var R = y.as,
                _ = O(R, y.crossOrigin),
                W = typeof y.integrity == "string" ? y.integrity : void 0,
                le = typeof y.fetchPriority == "string" ? y.fetchPriority : void 0;
            R === "style" ? r.d.S(b, typeof y.precedence == "string" ? y.precedence : void 0, {
                crossOrigin: _,
                integrity: W,
                fetchPriority: le
            }) : R === "script" && r.d.X(b, {
                crossOrigin: _,
                integrity: W,
                fetchPriority: le,
                nonce: typeof y.nonce == "string" ? y.nonce : void 0
            })
        }
    }, st.preinitModule = function(b, y) {
        if (typeof b == "string")
            if (typeof y == "object" && y !== null) {
                if (y.as == null || y.as === "script") {
                    var R = O(y.as, y.crossOrigin);
                    r.d.M(b, {
                        crossOrigin: R,
                        integrity: typeof y.integrity == "string" ? y.integrity : void 0,
                        nonce: typeof y.nonce == "string" ? y.nonce : void 0
                    })
                }
            } else y == null && r.d.M(b)
    }, st.preload = function(b, y) {
        if (typeof b == "string" && typeof y == "object" && y !== null && typeof y.as == "string") {
            var R = y.as,
                _ = O(R, y.crossOrigin);
            r.d.L(b, R, {
                crossOrigin: _,
                integrity: typeof y.integrity == "string" ? y.integrity : void 0,
                nonce: typeof y.nonce == "string" ? y.nonce : void 0,
                type: typeof y.type == "string" ? y.type : void 0,
                fetchPriority: typeof y.fetchPriority == "string" ? y.fetchPriority : void 0,
                referrerPolicy: typeof y.referrerPolicy == "string" ? y.referrerPolicy : void 0,
                imageSrcSet: typeof y.imageSrcSet == "string" ? y.imageSrcSet : void 0,
                imageSizes: typeof y.imageSizes == "string" ? y.imageSizes : void 0,
                media: typeof y.media == "string" ? y.media : void 0
            })
        }
    }, st.preloadModule = function(b, y) {
        if (typeof b == "string")
            if (y) {
                var R = O(y.as, y.crossOrigin);
                r.d.m(b, {
                    as: typeof y.as == "string" && y.as !== "script" ? y.as : void 0,
                    crossOrigin: R,
                    integrity: typeof y.integrity == "string" ? y.integrity : void 0
                })
            } else r.d.m(b)
    }, st.requestFormReset = function(b) {
        r.d.r(b)
    }, st.unstable_batchedUpdates = function(b, y) {
        return b(y)
    }, st.useFormState = function(b, y, R) {
        return D.H.useFormState(b, y, R)
    }, st.useFormStatus = function() {
        return D.H.useHostTransitionStatus()
    }, st.version = "19.2.3", st
}
var Rd;

function Mh() {
    if (Rd) return xc.exports;
    Rd = 1;

    function o() {
        if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(o)
        } catch (g) {
            console.error(g)
        }
    }
    return o(), xc.exports = Eh(), xc.exports
}
var Ud;

function Bh() {
    if (Ud) return Rn;
    Ud = 1;
    var o = xh(),
        g = Ac(),
        j = Mh();

    function r(e) {
        var t = "https://react.dev/errors/" + e;
        if (1 < arguments.length) {
            t += "?args[]=" + encodeURIComponent(arguments[1]);
            for (var l = 2; l < arguments.length; l++) t += "&args[]=" + encodeURIComponent(arguments[l])
        }
        return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    }

    function E(e) {
        return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11)
    }

    function M(e) {
        var t = e,
            l = e;
        if (e.alternate)
            for (; t.return;) t = t.return;
        else {
            e = t;
            do t = e, (t.flags & 4098) !== 0 && (l = t.return), e = t.return; while (e)
        }
        return t.tag === 3 ? l : null
    }

    function D(e) {
        if (e.tag === 13) {
            var t = e.memoizedState;
            if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated
        }
        return null
    }

    function O(e) {
        if (e.tag === 31) {
            var t = e.memoizedState;
            if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated
        }
        return null
    }

    function b(e) {
        if (M(e) !== e) throw Error(r(188))
    }

    function y(e) {
        var t = e.alternate;
        if (!t) {
            if (t = M(e), t === null) throw Error(r(188));
            return t !== e ? null : e
        }
        for (var l = e, a = t;;) {
            var n = l.return;
            if (n === null) break;
            var u = n.alternate;
            if (u === null) {
                if (a = n.return, a !== null) {
                    l = a;
                    continue
                }
                break
            }
            if (n.child === u.child) {
                for (u = n.child; u;) {
                    if (u === l) return b(n), e;
                    if (u === a) return b(n), t;
                    u = u.sibling
                }
                throw Error(r(188))
            }
            if (l.return !== a.return) l = n, a = u;
            else {
                for (var s = !1, c = n.child; c;) {
                    if (c === l) {
                        s = !0, l = n, a = u;
                        break
                    }
                    if (c === a) {
                        s = !0, a = n, l = u;
                        break
                    }
                    c = c.sibling
                }
                if (!s) {
                    for (c = u.child; c;) {
                        if (c === l) {
                            s = !0, l = u, a = n;
                            break
                        }
                        if (c === a) {
                            s = !0, a = u, l = n;
                            break
                        }
                        c = c.sibling
                    }
                    if (!s) throw Error(r(189))
                }
            }
            if (l.alternate !== a) throw Error(r(190))
        }
        if (l.tag !== 3) throw Error(r(188));
        return l.stateNode.current === l ? e : t
    }

    function R(e) {
        var t = e.tag;
        if (t === 5 || t === 26 || t === 27 || t === 6) return e;
        for (e = e.child; e !== null;) {
            if (t = R(e), t !== null) return t;
            e = e.sibling
        }
        return null
    }
    var _ = Object.assign,
        W = Symbol.for("react.element"),
        le = Symbol.for("react.transitional.element"),
        se = Symbol.for("react.portal"),
        K = Symbol.for("react.fragment"),
        $ = Symbol.for("react.strict_mode"),
        w = Symbol.for("react.profiler"),
        ee = Symbol.for("react.consumer"),
        U = Symbol.for("react.context"),
        X = Symbol.for("react.forward_ref"),
        ie = Symbol.for("react.suspense"),
        L = Symbol.for("react.suspense_list"),
        G = Symbol.for("react.memo"),
        T = Symbol.for("react.lazy"),
        Ee = Symbol.for("react.activity"),
        Y = Symbol.for("react.memo_cache_sentinel"),
        F = Symbol.iterator;

    function te(e) {
        return e === null || typeof e != "object" ? null : (e = F && e[F] || e["@@iterator"], typeof e == "function" ? e : null)
    }
    var ce = Symbol.for("react.client.reference");

    function re(e) {
        if (e == null) return null;
        if (typeof e == "function") return e.$$typeof === ce ? null : e.displayName || e.name || null;
        if (typeof e == "string") return e;
        switch (e) {
            case K:
                return "Fragment";
            case w:
                return "Profiler";
            case $:
                return "StrictMode";
            case ie:
                return "Suspense";
            case L:
                return "SuspenseList";
            case Ee:
                return "Activity"
        }
        if (typeof e == "object") switch (e.$$typeof) {
            case se:
                return "Portal";
            case U:
                return e.displayName || "Context";
            case ee:
                return (e._context.displayName || "Context") + ".Consumer";
            case X:
                var t = e.render;
                return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
            case G:
                return t = e.displayName || null, t !== null ? t : re(e.type) || "Memo";
            case T:
                t = e._payload, e = e._init;
                try {
                    return re(e(t))
                } catch {}
        }
        return null
    }
    var je = Array.isArray,
        p = g.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
        H = j.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
        J = {
            pending: !1,
            data: null,
            method: null,
            action: null
        },
        he = [],
        q = -1;

    function d(e) {
        return {
            current: e
        }
    }

    function N(e) {
        0 > q || (e.current = he[q], he[q] = null, q--)
    }

    function Q(e, t) {
        q++, he[q] = e.current, e.current = t
    }
    var Z = d(null),
        fe = d(null),
        ye = d(null),
        Be = d(null);

    function Pe(e, t) {
        switch (Q(ye, t), Q(fe, e), Q(Z, null), t.nodeType) {
            case 9:
            case 11:
                e = (e = t.documentElement) && (e = e.namespaceURI) ? $f(e) : 0;
                break;
            default:
                if (e = t.tagName, t = t.namespaceURI) t = $f(t), e = Pf(t, e);
                else switch (e) {
                    case "svg":
                        e = 1;
                        break;
                    case "math":
                        e = 2;
                        break;
                    default:
                        e = 0
                }
        }
        N(Z), Q(Z, e)
    }

    function qe() {
        N(Z), N(fe), N(ye)
    }

    function Ul(e) {
        e.memoizedState !== null && Q(Be, e);
        var t = Z.current,
            l = Pf(t, e.type);
        t !== l && (Q(fe, e), Q(Z, l))
    }

    function la(e) {
        fe.current === e && (N(Z), N(fe)), Be.current === e && (N(Be), Dn._currentValue = J)
    }
    var wa, ne;

    function oe(e) {
        if (wa === void 0) try {
            throw Error()
        } catch (l) {
            var t = l.stack.trim().match(/\n( *(at )?)/);
            wa = t && t[1] || "", ne = -1 < l.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < l.stack.indexOf("@") ? "@unknown:0:0" : ""
        }
        return `
` + wa + e + ne
    }
    var Ce = !1;

    function Me(e, t) {
        if (!e || Ce) return "";
        Ce = !0;
        var l = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        try {
            var a = {
                DetermineComponentFrameRoot: function() {
                    try {
                        if (t) {
                            var V = function() {
                                throw Error()
                            };
                            if (Object.defineProperty(V.prototype, "props", {
                                    set: function() {
                                        throw Error()
                                    }
                                }), typeof Reflect == "object" && Reflect.construct) {
                                try {
                                    Reflect.construct(V, [])
                                } catch (B) {
                                    var x = B
                                }
                                Reflect.construct(e, [], V)
                            } else {
                                try {
                                    V.call()
                                } catch (B) {
                                    x = B
                                }
                                e.call(V.prototype)
                            }
                        } else {
                            try {
                                throw Error()
                            } catch (B) {
                                x = B
                            }(V = e()) && typeof V.catch == "function" && V.catch(function() {})
                        }
                    } catch (B) {
                        if (B && x && typeof B.stack == "string") return [B.stack, x.stack]
                    }
                    return [null, null]
                }
            };
            a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
            var n = Object.getOwnPropertyDescriptor(a.DetermineComponentFrameRoot, "name");
            n && n.configurable && Object.defineProperty(a.DetermineComponentFrameRoot, "name", {
                value: "DetermineComponentFrameRoot"
            });
            var u = a.DetermineComponentFrameRoot(),
                s = u[0],
                c = u[1];
            if (s && c) {
                var f = s.split(`
`),
                    S = c.split(`
`);
                for (n = a = 0; a < f.length && !f[a].includes("DetermineComponentFrameRoot");) a++;
                for (; n < S.length && !S[n].includes("DetermineComponentFrameRoot");) n++;
                if (a === f.length || n === S.length)
                    for (a = f.length - 1, n = S.length - 1; 1 <= a && 0 <= n && f[a] !== S[n];) n--;
                for (; 1 <= a && 0 <= n; a--, n--)
                    if (f[a] !== S[n]) {
                        if (a !== 1 || n !== 1)
                            do
                                if (a--, n--, 0 > n || f[a] !== S[n]) {
                                    var A = `
` + f[a].replace(" at new ", " at ");
                                    return e.displayName && A.includes("<anonymous>") && (A = A.replace("<anonymous>", e.displayName)), A
                                } while (1 <= a && 0 <= n);
                        break
                    }
            }
        } finally {
            Ce = !1, Error.prepareStackTrace = l
        }
        return (l = e ? e.displayName || e.name : "") ? oe(l) : ""
    }

    function ot(e, t) {
        switch (e.tag) {
            case 26:
            case 27:
            case 5:
                return oe(e.type);
            case 16:
                return oe("Lazy");
            case 13:
                return e.child !== t && t !== null ? oe("Suspense Fallback") : oe("Suspense");
            case 19:
                return oe("SuspenseList");
            case 0:
            case 15:
                return Me(e.type, !1);
            case 11:
                return Me(e.type.render, !1);
            case 1:
                return Me(e.type, !0);
            case 31:
                return oe("Activity");
            default:
                return ""
        }
    }

    function it(e) {
        try {
            var t = "",
                l = null;
            do t += ot(e, l), l = e, e = e.return; while (e);
            return t
        } catch (a) {
            return `
Error generating stack: ` + a.message + `
` + a.stack
        }
    }
    var At = Object.prototype.hasOwnProperty,
        Tt = o.unstable_scheduleCallback,
        Gt = o.unstable_cancelCallback,
        ze = o.unstable_shouldYield,
        Ct = o.unstable_requestPaint,
        ut = o.unstable_now,
        Fd = o.unstable_getCurrentPriorityLevel,
        Cc = o.unstable_ImmediatePriority,
        Vc = o.unstable_UserBlockingPriority,
        Ln = o.unstable_NormalPriority,
        $d = o.unstable_LowPriority,
        jc = o.unstable_IdlePriority,
        Pd = o.log,
        em = o.unstable_setDisableYieldValue,
        Ya = null,
        pt = null;

    function dl(e) {
        if (typeof Pd == "function" && em(e), pt && typeof pt.setStrictMode == "function") try {
            pt.setStrictMode(Ya, e)
        } catch {}
    }
    var vt = Math.clz32 ? Math.clz32 : am,
        tm = Math.log,
        lm = Math.LN2;

    function am(e) {
        return e >>>= 0, e === 0 ? 32 : 31 - (tm(e) / lm | 0) | 0
    }
    var Gn = 256,
        qn = 262144,
        wn = 4194304;

    function Ll(e) {
        var t = e & 42;
        if (t !== 0) return t;
        switch (e & -e) {
            case 1:
                return 1;
            case 2:
                return 2;
            case 4:
                return 4;
            case 8:
                return 8;
            case 16:
                return 16;
            case 32:
                return 32;
            case 64:
                return 64;
            case 128:
                return 128;
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
                return e & 261888;
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
                return e & 3932160;
            case 4194304:
            case 8388608:
            case 16777216:
            case 33554432:
                return e & 62914560;
            case 67108864:
                return 67108864;
            case 134217728:
                return 134217728;
            case 268435456:
                return 268435456;
            case 536870912:
                return 536870912;
            case 1073741824:
                return 0;
            default:
                return e
        }
    }

    function Yn(e, t, l) {
        var a = e.pendingLanes;
        if (a === 0) return 0;
        var n = 0,
            u = e.suspendedLanes,
            s = e.pingedLanes;
        e = e.warmLanes;
        var c = a & 134217727;
        return c !== 0 ? (a = c & ~u, a !== 0 ? n = Ll(a) : (s &= c, s !== 0 ? n = Ll(s) : l || (l = c & ~e, l !== 0 && (n = Ll(l))))) : (c = a & ~u, c !== 0 ? n = Ll(c) : s !== 0 ? n = Ll(s) : l || (l = a & ~e, l !== 0 && (n = Ll(l)))), n === 0 ? 0 : t !== 0 && t !== n && (t & u) === 0 && (u = n & -n, l = t & -t, u >= l || u === 32 && (l & 4194048) !== 0) ? t : n
    }

    function Qa(e, t) {
        return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0
    }

    function nm(e, t) {
        switch (e) {
            case 1:
            case 2:
            case 4:
            case 8:
            case 64:
                return t + 250;
            case 16:
            case 32:
            case 128:
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
                return t + 5e3;
            case 4194304:
            case 8388608:
            case 16777216:
            case 33554432:
                return -1;
            case 67108864:
            case 134217728:
            case 268435456:
            case 536870912:
            case 1073741824:
                return -1;
            default:
                return -1
        }
    }

    function Dc() {
        var e = wn;
        return wn <<= 1, (wn & 62914560) === 0 && (wn = 4194304), e
    }

    function ns(e) {
        for (var t = [], l = 0; 31 > l; l++) t.push(e);
        return t
    }

    function Xa(e, t) {
        e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0)
    }

    function um(e, t, l, a, n, u) {
        var s = e.pendingLanes;
        e.pendingLanes = l, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= l, e.entangledLanes &= l, e.errorRecoveryDisabledLanes &= l, e.shellSuspendCounter = 0;
        var c = e.entanglements,
            f = e.expirationTimes,
            S = e.hiddenUpdates;
        for (l = s & ~l; 0 < l;) {
            var A = 31 - vt(l),
                V = 1 << A;
            c[A] = 0, f[A] = -1;
            var x = S[A];
            if (x !== null)
                for (S[A] = null, A = 0; A < x.length; A++) {
                    var B = x[A];
                    B !== null && (B.lane &= -536870913)
                }
            l &= ~V
        }
        a !== 0 && Oc(e, a, 0), u !== 0 && n === 0 && e.tag !== 0 && (e.suspendedLanes |= u & ~(s & ~t))
    }

    function Oc(e, t, l) {
        e.pendingLanes |= t, e.suspendedLanes &= ~t;
        var a = 31 - vt(t);
        e.entangledLanes |= t, e.entanglements[a] = e.entanglements[a] | 1073741824 | l & 261930
    }

    function zc(e, t) {
        var l = e.entangledLanes |= t;
        for (e = e.entanglements; l;) {
            var a = 31 - vt(l),
                n = 1 << a;
            n & t | e[a] & t && (e[a] |= t), l &= ~n
        }
    }

    function Hc(e, t) {
        var l = t & -t;
        return l = (l & 42) !== 0 ? 1 : us(l), (l & (e.suspendedLanes | t)) !== 0 ? 0 : l
    }

    function us(e) {
        switch (e) {
            case 2:
                e = 1;
                break;
            case 8:
                e = 4;
                break;
            case 32:
                e = 16;
                break;
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
            case 4194304:
            case 8388608:
            case 16777216:
            case 33554432:
                e = 128;
                break;
            case 268435456:
                e = 134217728;
                break;
            default:
                e = 0
        }
        return e
    }

    function ss(e) {
        return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2
    }

    function _c() {
        var e = H.p;
        return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : Ed(e.type))
    }

    function Rc(e, t) {
        var l = H.p;
        try {
            return H.p = e, t()
        } finally {
            H.p = l
        }
    }
    var ml = Math.random().toString(36).slice(2),
        et = "__reactFiber$" + ml,
        rt = "__reactProps$" + ml,
        aa = "__reactContainer$" + ml,
        is = "__reactEvents$" + ml,
        sm = "__reactListeners$" + ml,
        im = "__reactHandles$" + ml,
        Uc = "__reactResources$" + ml,
        ka = "__reactMarker$" + ml;

    function cs(e) {
        delete e[et], delete e[rt], delete e[is], delete e[sm], delete e[im]
    }

    function na(e) {
        var t = e[et];
        if (t) return t;
        for (var l = e.parentNode; l;) {
            if (t = l[aa] || l[et]) {
                if (l = t.alternate, t.child !== null || l !== null && l.child !== null)
                    for (e = sd(e); e !== null;) {
                        if (l = e[et]) return l;
                        e = sd(e)
                    }
                return t
            }
            e = l, l = e.parentNode
        }
        return null
    }

    function ua(e) {
        if (e = e[et] || e[aa]) {
            var t = e.tag;
            if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e
        }
        return null
    }

    function Za(e) {
        var t = e.tag;
        if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
        throw Error(r(33))
    }

    function sa(e) {
        var t = e[Uc];
        return t || (t = e[Uc] = {
            hoistableStyles: new Map,
            hoistableScripts: new Map
        }), t
    }

    function Fe(e) {
        e[ka] = !0
    }
    var Lc = new Set,
        Gc = {};

    function Gl(e, t) {
        ia(e, t), ia(e + "Capture", t)
    }

    function ia(e, t) {
        for (Gc[e] = t, e = 0; e < t.length; e++) Lc.add(t[e])
    }
    var cm = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),
        qc = {},
        wc = {};

    function om(e) {
        return At.call(wc, e) ? !0 : At.call(qc, e) ? !1 : cm.test(e) ? wc[e] = !0 : (qc[e] = !0, !1)
    }

    function Qn(e, t, l) {
        if (om(t))
            if (l === null) e.removeAttribute(t);
            else {
                switch (typeof l) {
                    case "undefined":
                    case "function":
                    case "symbol":
                        e.removeAttribute(t);
                        return;
                    case "boolean":
                        var a = t.toLowerCase().slice(0, 5);
                        if (a !== "data-" && a !== "aria-") {
                            e.removeAttribute(t);
                            return
                        }
                }
                e.setAttribute(t, "" + l)
            }
    }

    function Xn(e, t, l) {
        if (l === null) e.removeAttribute(t);
        else {
            switch (typeof l) {
                case "undefined":
                case "function":
                case "symbol":
                case "boolean":
                    e.removeAttribute(t);
                    return
            }
            e.setAttribute(t, "" + l)
        }
    }

    function Kt(e, t, l, a) {
        if (a === null) e.removeAttribute(l);
        else {
            switch (typeof a) {
                case "undefined":
                case "function":
                case "symbol":
                case "boolean":
                    e.removeAttribute(l);
                    return
            }
            e.setAttributeNS(t, l, "" + a)
        }
    }

    function Vt(e) {
        switch (typeof e) {
            case "bigint":
            case "boolean":
            case "number":
            case "string":
            case "undefined":
                return e;
            case "object":
                return e;
            default:
                return ""
        }
    }

    function Yc(e) {
        var t = e.type;
        return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio")
    }

    function rm(e, t, l) {
        var a = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
        if (!e.hasOwnProperty(t) && typeof a < "u" && typeof a.get == "function" && typeof a.set == "function") {
            var n = a.get,
                u = a.set;
            return Object.defineProperty(e, t, {
                configurable: !0,
                get: function() {
                    return n.call(this)
                },
                set: function(s) {
                    l = "" + s, u.call(this, s)
                }
            }), Object.defineProperty(e, t, {
                enumerable: a.enumerable
            }), {
                getValue: function() {
                    return l
                },
                setValue: function(s) {
                    l = "" + s
                },
                stopTracking: function() {
                    e._valueTracker = null, delete e[t]
                }
            }
        }
    }

    function os(e) {
        if (!e._valueTracker) {
            var t = Yc(e) ? "checked" : "value";
            e._valueTracker = rm(e, t, "" + e[t])
        }
    }

    function Qc(e) {
        if (!e) return !1;
        var t = e._valueTracker;
        if (!t) return !0;
        var l = t.getValue(),
            a = "";
        return e && (a = Yc(e) ? e.checked ? "true" : "false" : e.value), e = a, e !== l ? (t.setValue(e), !0) : !1
    }

    function kn(e) {
        if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
        try {
            return e.activeElement || e.body
        } catch {
            return e.body
        }
    }
    var fm = /[\n"\\]/g;

    function jt(e) {
        return e.replace(fm, function(t) {
            return "\\" + t.charCodeAt(0).toString(16) + " "
        })
    }

    function rs(e, t, l, a, n, u, s, c) {
        e.name = "", s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.type = s : e.removeAttribute("type"), t != null ? s === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Vt(t)) : e.value !== "" + Vt(t) && (e.value = "" + Vt(t)) : s !== "submit" && s !== "reset" || e.removeAttribute("value"), t != null ? fs(e, s, Vt(t)) : l != null ? fs(e, s, Vt(l)) : a != null && e.removeAttribute("value"), n == null && u != null && (e.defaultChecked = !!u), n != null && (e.checked = n && typeof n != "function" && typeof n != "symbol"), c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? e.name = "" + Vt(c) : e.removeAttribute("name")
    }

    function Xc(e, t, l, a, n, u, s, c) {
        if (u != null && typeof u != "function" && typeof u != "symbol" && typeof u != "boolean" && (e.type = u), t != null || l != null) {
            if (!(u !== "submit" && u !== "reset" || t != null)) {
                os(e);
                return
            }
            l = l != null ? "" + Vt(l) : "", t = t != null ? "" + Vt(t) : l, c || t === e.value || (e.value = t), e.defaultValue = t
        }
        a = a ?? n, a = typeof a != "function" && typeof a != "symbol" && !!a, e.checked = c ? e.checked : !!a, e.defaultChecked = !!a, s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" && (e.name = s), os(e)
    }

    function fs(e, t, l) {
        t === "number" && kn(e.ownerDocument) === e || e.defaultValue === "" + l || (e.defaultValue = "" + l)
    }

    function ca(e, t, l, a) {
        if (e = e.options, t) {
            t = {};
            for (var n = 0; n < l.length; n++) t["$" + l[n]] = !0;
            for (l = 0; l < e.length; l++) n = t.hasOwnProperty("$" + e[l].value), e[l].selected !== n && (e[l].selected = n), n && a && (e[l].defaultSelected = !0)
        } else {
            for (l = "" + Vt(l), t = null, n = 0; n < e.length; n++) {
                if (e[n].value === l) {
                    e[n].selected = !0, a && (e[n].defaultSelected = !0);
                    return
                }
                t !== null || e[n].disabled || (t = e[n])
            }
            t !== null && (t.selected = !0)
        }
    }

    function kc(e, t, l) {
        if (t != null && (t = "" + Vt(t), t !== e.value && (e.value = t), l == null)) {
            e.defaultValue !== t && (e.defaultValue = t);
            return
        }
        e.defaultValue = l != null ? "" + Vt(l) : ""
    }

    function Zc(e, t, l, a) {
        if (t == null) {
            if (a != null) {
                if (l != null) throw Error(r(92));
                if (je(a)) {
                    if (1 < a.length) throw Error(r(93));
                    a = a[0]
                }
                l = a
            }
            l == null && (l = ""), t = l
        }
        l = Vt(t), e.defaultValue = l, a = e.textContent, a === l && a !== "" && a !== null && (e.value = a), os(e)
    }

    function oa(e, t) {
        if (t) {
            var l = e.firstChild;
            if (l && l === e.lastChild && l.nodeType === 3) {
                l.nodeValue = t;
                return
            }
        }
        e.textContent = t
    }
    var dm = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));

    function Kc(e, t, l) {
        var a = t.indexOf("--") === 0;
        l == null || typeof l == "boolean" || l === "" ? a ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : a ? e.setProperty(t, l) : typeof l != "number" || l === 0 || dm.has(t) ? t === "float" ? e.cssFloat = l : e[t] = ("" + l).trim() : e[t] = l + "px"
    }

    function Jc(e, t, l) {
        if (t != null && typeof t != "object") throw Error(r(62));
        if (e = e.style, l != null) {
            for (var a in l) !l.hasOwnProperty(a) || t != null && t.hasOwnProperty(a) || (a.indexOf("--") === 0 ? e.setProperty(a, "") : a === "float" ? e.cssFloat = "" : e[a] = "");
            for (var n in t) a = t[n], t.hasOwnProperty(n) && l[n] !== a && Kc(e, n, a)
        } else
            for (var u in t) t.hasOwnProperty(u) && Kc(e, u, t[u])
    }

    function ds(e) {
        if (e.indexOf("-") === -1) return !1;
        switch (e) {
            case "annotation-xml":
            case "color-profile":
            case "font-face":
            case "font-face-src":
            case "font-face-uri":
            case "font-face-format":
            case "font-face-name":
            case "missing-glyph":
                return !1;
            default:
                return !0
        }
    }
    var mm = new Map([
            ["acceptCharset", "accept-charset"],
            ["htmlFor", "for"],
            ["httpEquiv", "http-equiv"],
            ["crossOrigin", "crossorigin"],
            ["accentHeight", "accent-height"],
            ["alignmentBaseline", "alignment-baseline"],
            ["arabicForm", "arabic-form"],
            ["baselineShift", "baseline-shift"],
            ["capHeight", "cap-height"],
            ["clipPath", "clip-path"],
            ["clipRule", "clip-rule"],
            ["colorInterpolation", "color-interpolation"],
            ["colorInterpolationFilters", "color-interpolation-filters"],
            ["colorProfile", "color-profile"],
            ["colorRendering", "color-rendering"],
            ["dominantBaseline", "dominant-baseline"],
            ["enableBackground", "enable-background"],
            ["fillOpacity", "fill-opacity"],
            ["fillRule", "fill-rule"],
            ["floodColor", "flood-color"],
            ["floodOpacity", "flood-opacity"],
            ["fontFamily", "font-family"],
            ["fontSize", "font-size"],
            ["fontSizeAdjust", "font-size-adjust"],
            ["fontStretch", "font-stretch"],
            ["fontStyle", "font-style"],
            ["fontVariant", "font-variant"],
            ["fontWeight", "font-weight"],
            ["glyphName", "glyph-name"],
            ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
            ["glyphOrientationVertical", "glyph-orientation-vertical"],
            ["horizAdvX", "horiz-adv-x"],
            ["horizOriginX", "horiz-origin-x"],
            ["imageRendering", "image-rendering"],
            ["letterSpacing", "letter-spacing"],
            ["lightingColor", "lighting-color"],
            ["markerEnd", "marker-end"],
            ["markerMid", "marker-mid"],
            ["markerStart", "marker-start"],
            ["overlinePosition", "overline-position"],
            ["overlineThickness", "overline-thickness"],
            ["paintOrder", "paint-order"],
            ["panose-1", "panose-1"],
            ["pointerEvents", "pointer-events"],
            ["renderingIntent", "rendering-intent"],
            ["shapeRendering", "shape-rendering"],
            ["stopColor", "stop-color"],
            ["stopOpacity", "stop-opacity"],
            ["strikethroughPosition", "strikethrough-position"],
            ["strikethroughThickness", "strikethrough-thickness"],
            ["strokeDasharray", "stroke-dasharray"],
            ["strokeDashoffset", "stroke-dashoffset"],
            ["strokeLinecap", "stroke-linecap"],
            ["strokeLinejoin", "stroke-linejoin"],
            ["strokeMiterlimit", "stroke-miterlimit"],
            ["strokeOpacity", "stroke-opacity"],
            ["strokeWidth", "stroke-width"],
            ["textAnchor", "text-anchor"],
            ["textDecoration", "text-decoration"],
            ["textRendering", "text-rendering"],
            ["transformOrigin", "transform-origin"],
            ["underlinePosition", "underline-position"],
            ["underlineThickness", "underline-thickness"],
            ["unicodeBidi", "unicode-bidi"],
            ["unicodeRange", "unicode-range"],
            ["unitsPerEm", "units-per-em"],
            ["vAlphabetic", "v-alphabetic"],
            ["vHanging", "v-hanging"],
            ["vIdeographic", "v-ideographic"],
            ["vMathematical", "v-mathematical"],
            ["vectorEffect", "vector-effect"],
            ["vertAdvY", "vert-adv-y"],
            ["vertOriginX", "vert-origin-x"],
            ["vertOriginY", "vert-origin-y"],
            ["wordSpacing", "word-spacing"],
            ["writingMode", "writing-mode"],
            ["xmlnsXlink", "xmlns:xlink"],
            ["xHeight", "x-height"]
        ]),
        hm = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;

    function Zn(e) {
        return hm.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e
    }

    function Jt() {}
    var ms = null;

    function hs(e) {
        return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e
    }
    var ra = null,
        fa = null;

    function Ic(e) {
        var t = ua(e);
        if (t && (e = t.stateNode)) {
            var l = e[rt] || null;
            e: switch (e = t.stateNode, t.type) {
                case "input":
                    if (rs(e, l.value, l.defaultValue, l.defaultValue, l.checked, l.defaultChecked, l.type, l.name), t = l.name, l.type === "radio" && t != null) {
                        for (l = e; l.parentNode;) l = l.parentNode;
                        for (l = l.querySelectorAll('input[name="' + jt("" + t) + '"][type="radio"]'), t = 0; t < l.length; t++) {
                            var a = l[t];
                            if (a !== e && a.form === e.form) {
                                var n = a[rt] || null;
                                if (!n) throw Error(r(90));
                                rs(a, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name)
                            }
                        }
                        for (t = 0; t < l.length; t++) a = l[t], a.form === e.form && Qc(a)
                    }
                    break e;
                case "textarea":
                    kc(e, l.value, l.defaultValue);
                    break e;
                case "select":
                    t = l.value, t != null && ca(e, !!l.multiple, t, !1)
            }
        }
    }
    var gs = !1;

    function Wc(e, t, l) {
        if (gs) return e(t, l);
        gs = !0;
        try {
            var a = e(t);
            return a
        } finally {
            if (gs = !1, (ra !== null || fa !== null) && (zu(), ra && (t = ra, e = fa, fa = ra = null, Ic(t), e)))
                for (t = 0; t < e.length; t++) Ic(e[t])
        }
    }

    function Ka(e, t) {
        var l = e.stateNode;
        if (l === null) return null;
        var a = l[rt] || null;
        if (a === null) return null;
        l = a[t];
        e: switch (t) {
            case "onClick":
            case "onClickCapture":
            case "onDoubleClick":
            case "onDoubleClickCapture":
            case "onMouseDown":
            case "onMouseDownCapture":
            case "onMouseMove":
            case "onMouseMoveCapture":
            case "onMouseUp":
            case "onMouseUpCapture":
            case "onMouseEnter":
                (a = !a.disabled) || (e = e.type, a = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !a;
                break e;
            default:
                e = !1
        }
        if (e) return null;
        if (l && typeof l != "function") throw Error(r(231, t, typeof l));
        return l
    }
    var It = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"),
        ys = !1;
    if (It) try {
        var Ja = {};
        Object.defineProperty(Ja, "passive", {
            get: function() {
                ys = !0
            }
        }), window.addEventListener("test", Ja, Ja), window.removeEventListener("test", Ja, Ja)
    } catch {
        ys = !1
    }
    var hl = null,
        ps = null,
        Kn = null;

    function Fc() {
        if (Kn) return Kn;
        var e, t = ps,
            l = t.length,
            a, n = "value" in hl ? hl.value : hl.textContent,
            u = n.length;
        for (e = 0; e < l && t[e] === n[e]; e++);
        var s = l - e;
        for (a = 1; a <= s && t[l - a] === n[u - a]; a++);
        return Kn = n.slice(e, 1 < a ? 1 - a : void 0)
    }

    function Jn(e) {
        var t = e.keyCode;
        return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0
    }

    function In() {
        return !0
    }

    function $c() {
        return !1
    }

    function ft(e) {
        function t(l, a, n, u, s) {
            this._reactName = l, this._targetInst = n, this.type = a, this.nativeEvent = u, this.target = s, this.currentTarget = null;
            for (var c in e) e.hasOwnProperty(c) && (l = e[c], this[c] = l ? l(u) : u[c]);
            return this.isDefaultPrevented = (u.defaultPrevented != null ? u.defaultPrevented : u.returnValue === !1) ? In : $c, this.isPropagationStopped = $c, this
        }
        return _(t.prototype, {
            preventDefault: function() {
                this.defaultPrevented = !0;
                var l = this.nativeEvent;
                l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = In)
            },
            stopPropagation: function() {
                var l = this.nativeEvent;
                l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = In)
            },
            persist: function() {},
            isPersistent: In
        }), t
    }
    var ql = {
            eventPhase: 0,
            bubbles: 0,
            cancelable: 0,
            timeStamp: function(e) {
                return e.timeStamp || Date.now()
            },
            defaultPrevented: 0,
            isTrusted: 0
        },
        Wn = ft(ql),
        Ia = _({}, ql, {
            view: 0,
            detail: 0
        }),
        gm = ft(Ia),
        vs, Ss, Wa, Fn = _({}, Ia, {
            screenX: 0,
            screenY: 0,
            clientX: 0,
            clientY: 0,
            pageX: 0,
            pageY: 0,
            ctrlKey: 0,
            shiftKey: 0,
            altKey: 0,
            metaKey: 0,
            getModifierState: xs,
            button: 0,
            buttons: 0,
            relatedTarget: function(e) {
                return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget
            },
            movementX: function(e) {
                return "movementX" in e ? e.movementX : (e !== Wa && (Wa && e.type === "mousemove" ? (vs = e.screenX - Wa.screenX, Ss = e.screenY - Wa.screenY) : Ss = vs = 0, Wa = e), vs)
            },
            movementY: function(e) {
                return "movementY" in e ? e.movementY : Ss
            }
        }),
        Pc = ft(Fn),
        ym = _({}, Fn, {
            dataTransfer: 0
        }),
        pm = ft(ym),
        vm = _({}, Ia, {
            relatedTarget: 0
        }),
        bs = ft(vm),
        Sm = _({}, ql, {
            animationName: 0,
            elapsedTime: 0,
            pseudoElement: 0
        }),
        bm = ft(Sm),
        xm = _({}, ql, {
            clipboardData: function(e) {
                return "clipboardData" in e ? e.clipboardData : window.clipboardData
            }
        }),
        Em = ft(xm),
        Mm = _({}, ql, {
            data: 0
        }),
        eo = ft(Mm),
        Bm = {
            Esc: "Escape",
            Spacebar: " ",
            Left: "ArrowLeft",
            Up: "ArrowUp",
            Right: "ArrowRight",
            Down: "ArrowDown",
            Del: "Delete",
            Win: "OS",
            Menu: "ContextMenu",
            Apps: "ContextMenu",
            Scroll: "ScrollLock",
            MozPrintableKey: "Unidentified"
        },
        Nm = {
            8: "Backspace",
            9: "Tab",
            12: "Clear",
            13: "Enter",
            16: "Shift",
            17: "Control",
            18: "Alt",
            19: "Pause",
            20: "CapsLock",
            27: "Escape",
            32: " ",
            33: "PageUp",
            34: "PageDown",
            35: "End",
            36: "Home",
            37: "ArrowLeft",
            38: "ArrowUp",
            39: "ArrowRight",
            40: "ArrowDown",
            45: "Insert",
            46: "Delete",
            112: "F1",
            113: "F2",
            114: "F3",
            115: "F4",
            116: "F5",
            117: "F6",
            118: "F7",
            119: "F8",
            120: "F9",
            121: "F10",
            122: "F11",
            123: "F12",
            144: "NumLock",
            145: "ScrollLock",
            224: "Meta"
        },
        Am = {
            Alt: "altKey",
            Control: "ctrlKey",
            Meta: "metaKey",
            Shift: "shiftKey"
        };

    function Tm(e) {
        var t = this.nativeEvent;
        return t.getModifierState ? t.getModifierState(e) : (e = Am[e]) ? !!t[e] : !1
    }

    function xs() {
        return Tm
    }
    var Cm = _({}, Ia, {
            key: function(e) {
                if (e.key) {
                    var t = Bm[e.key] || e.key;
                    if (t !== "Unidentified") return t
                }
                return e.type === "keypress" ? (e = Jn(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Nm[e.keyCode] || "Unidentified" : ""
            },
            code: 0,
            location: 0,
            ctrlKey: 0,
            shiftKey: 0,
            altKey: 0,
            metaKey: 0,
            repeat: 0,
            locale: 0,
            getModifierState: xs,
            charCode: function(e) {
                return e.type === "keypress" ? Jn(e) : 0
            },
            keyCode: function(e) {
                return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0
            },
            which: function(e) {
                return e.type === "keypress" ? Jn(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0
            }
        }),
        Vm = ft(Cm),
        jm = _({}, Fn, {
            pointerId: 0,
            width: 0,
            height: 0,
            pressure: 0,
            tangentialPressure: 0,
            tiltX: 0,
            tiltY: 0,
            twist: 0,
            pointerType: 0,
            isPrimary: 0
        }),
        to = ft(jm),
        Dm = _({}, Ia, {
            touches: 0,
            targetTouches: 0,
            changedTouches: 0,
            altKey: 0,
            metaKey: 0,
            ctrlKey: 0,
            shiftKey: 0,
            getModifierState: xs
        }),
        Om = ft(Dm),
        zm = _({}, ql, {
            propertyName: 0,
            elapsedTime: 0,
            pseudoElement: 0
        }),
        Hm = ft(zm),
        _m = _({}, Fn, {
            deltaX: function(e) {
                return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0
            },
            deltaY: function(e) {
                return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0
            },
            deltaZ: 0,
            deltaMode: 0
        }),
        Rm = ft(_m),
        Um = _({}, ql, {
            newState: 0,
            oldState: 0
        }),
        Lm = ft(Um),
        Gm = [9, 13, 27, 32],
        Es = It && "CompositionEvent" in window,
        Fa = null;
    It && "documentMode" in document && (Fa = document.documentMode);
    var qm = It && "TextEvent" in window && !Fa,
        lo = It && (!Es || Fa && 8 < Fa && 11 >= Fa),
        ao = " ",
        no = !1;

    function uo(e, t) {
        switch (e) {
            case "keyup":
                return Gm.indexOf(t.keyCode) !== -1;
            case "keydown":
                return t.keyCode !== 229;
            case "keypress":
            case "mousedown":
            case "focusout":
                return !0;
            default:
                return !1
        }
    }

    function so(e) {
        return e = e.detail, typeof e == "object" && "data" in e ? e.data : null
    }
    var da = !1;

    function wm(e, t) {
        switch (e) {
            case "compositionend":
                return so(t);
            case "keypress":
                return t.which !== 32 ? null : (no = !0, ao);
            case "textInput":
                return e = t.data, e === ao && no ? null : e;
            default:
                return null
        }
    }

    function Ym(e, t) {
        if (da) return e === "compositionend" || !Es && uo(e, t) ? (e = Fc(), Kn = ps = hl = null, da = !1, e) : null;
        switch (e) {
            case "paste":
                return null;
            case "keypress":
                if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
                    if (t.char && 1 < t.char.length) return t.char;
                    if (t.which) return String.fromCharCode(t.which)
                }
                return null;
            case "compositionend":
                return lo && t.locale !== "ko" ? null : t.data;
            default:
                return null
        }
    }
    var Qm = {
        color: !0,
        date: !0,
        datetime: !0,
        "datetime-local": !0,
        email: !0,
        month: !0,
        number: !0,
        password: !0,
        range: !0,
        search: !0,
        tel: !0,
        text: !0,
        time: !0,
        url: !0,
        week: !0
    };

    function io(e) {
        var t = e && e.nodeName && e.nodeName.toLowerCase();
        return t === "input" ? !!Qm[e.type] : t === "textarea"
    }

    function co(e, t, l, a) {
        ra ? fa ? fa.push(a) : fa = [a] : ra = a, t = qu(t, "onChange"), 0 < t.length && (l = new Wn("onChange", "change", null, l, a), e.push({
            event: l,
            listeners: t
        }))
    }
    var $a = null,
        Pa = null;

    function Xm(e) {
        Zf(e, 0)
    }

    function $n(e) {
        var t = Za(e);
        if (Qc(t)) return e
    }

    function oo(e, t) {
        if (e === "change") return t
    }
    var ro = !1;
    if (It) {
        var Ms;
        if (It) {
            var Bs = "oninput" in document;
            if (!Bs) {
                var fo = document.createElement("div");
                fo.setAttribute("oninput", "return;"), Bs = typeof fo.oninput == "function"
            }
            Ms = Bs
        } else Ms = !1;
        ro = Ms && (!document.documentMode || 9 < document.documentMode)
    }

    function mo() {
        $a && ($a.detachEvent("onpropertychange", ho), Pa = $a = null)
    }

    function ho(e) {
        if (e.propertyName === "value" && $n(Pa)) {
            var t = [];
            co(t, Pa, e, hs(e)), Wc(Xm, t)
        }
    }

    function km(e, t, l) {
        e === "focusin" ? (mo(), $a = t, Pa = l, $a.attachEvent("onpropertychange", ho)) : e === "focusout" && mo()
    }

    function Zm(e) {
        if (e === "selectionchange" || e === "keyup" || e === "keydown") return $n(Pa)
    }

    function Km(e, t) {
        if (e === "click") return $n(t)
    }

    function Jm(e, t) {
        if (e === "input" || e === "change") return $n(t)
    }

    function Im(e, t) {
        return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t
    }
    var St = typeof Object.is == "function" ? Object.is : Im;

    function en(e, t) {
        if (St(e, t)) return !0;
        if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
        var l = Object.keys(e),
            a = Object.keys(t);
        if (l.length !== a.length) return !1;
        for (a = 0; a < l.length; a++) {
            var n = l[a];
            if (!At.call(t, n) || !St(e[n], t[n])) return !1
        }
        return !0
    }

    function go(e) {
        for (; e && e.firstChild;) e = e.firstChild;
        return e
    }

    function yo(e, t) {
        var l = go(e);
        e = 0;
        for (var a; l;) {
            if (l.nodeType === 3) {
                if (a = e + l.textContent.length, e <= t && a >= t) return {
                    node: l,
                    offset: t - e
                };
                e = a
            }
            e: {
                for (; l;) {
                    if (l.nextSibling) {
                        l = l.nextSibling;
                        break e
                    }
                    l = l.parentNode
                }
                l = void 0
            }
            l = go(l)
        }
    }

    function po(e, t) {
        return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? po(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1
    }

    function vo(e) {
        e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
        for (var t = kn(e.document); t instanceof e.HTMLIFrameElement;) {
            try {
                var l = typeof t.contentWindow.location.href == "string"
            } catch {
                l = !1
            }
            if (l) e = t.contentWindow;
            else break;
            t = kn(e.document)
        }
        return t
    }

    function Ns(e) {
        var t = e && e.nodeName && e.nodeName.toLowerCase();
        return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true")
    }
    var Wm = It && "documentMode" in document && 11 >= document.documentMode,
        ma = null,
        As = null,
        tn = null,
        Ts = !1;

    function So(e, t, l) {
        var a = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
        Ts || ma == null || ma !== kn(a) || (a = ma, "selectionStart" in a && Ns(a) ? a = {
            start: a.selectionStart,
            end: a.selectionEnd
        } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
            anchorNode: a.anchorNode,
            anchorOffset: a.anchorOffset,
            focusNode: a.focusNode,
            focusOffset: a.focusOffset
        }), tn && en(tn, a) || (tn = a, a = qu(As, "onSelect"), 0 < a.length && (t = new Wn("onSelect", "select", null, t, l), e.push({
            event: t,
            listeners: a
        }), t.target = ma)))
    }

    function wl(e, t) {
        var l = {};
        return l[e.toLowerCase()] = t.toLowerCase(), l["Webkit" + e] = "webkit" + t, l["Moz" + e] = "moz" + t, l
    }
    var ha = {
            animationend: wl("Animation", "AnimationEnd"),
            animationiteration: wl("Animation", "AnimationIteration"),
            animationstart: wl("Animation", "AnimationStart"),
            transitionrun: wl("Transition", "TransitionRun"),
            transitionstart: wl("Transition", "TransitionStart"),
            transitioncancel: wl("Transition", "TransitionCancel"),
            transitionend: wl("Transition", "TransitionEnd")
        },
        Cs = {},
        bo = {};
    It && (bo = document.createElement("div").style, "AnimationEvent" in window || (delete ha.animationend.animation, delete ha.animationiteration.animation, delete ha.animationstart.animation), "TransitionEvent" in window || delete ha.transitionend.transition);

    function Yl(e) {
        if (Cs[e]) return Cs[e];
        if (!ha[e]) return e;
        var t = ha[e],
            l;
        for (l in t)
            if (t.hasOwnProperty(l) && l in bo) return Cs[e] = t[l];
        return e
    }
    var xo = Yl("animationend"),
        Eo = Yl("animationiteration"),
        Mo = Yl("animationstart"),
        Fm = Yl("transitionrun"),
        $m = Yl("transitionstart"),
        Pm = Yl("transitioncancel"),
        Bo = Yl("transitionend"),
        No = new Map,
        Vs = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
    Vs.push("scrollEnd");

    function qt(e, t) {
        No.set(e, t), Gl(t, [e])
    }
    var Pn = typeof reportError == "function" ? reportError : function(e) {
            if (typeof window == "object" && typeof window.ErrorEvent == "function") {
                var t = new window.ErrorEvent("error", {
                    bubbles: !0,
                    cancelable: !0,
                    message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e),
                    error: e
                });
                if (!window.dispatchEvent(t)) return
            } else if (typeof process == "object" && typeof process.emit == "function") {
                process.emit("uncaughtException", e);
                return
            }
            console.error(e)
        },
        Dt = [],
        ga = 0,
        js = 0;

    function eu() {
        for (var e = ga, t = js = ga = 0; t < e;) {
            var l = Dt[t];
            Dt[t++] = null;
            var a = Dt[t];
            Dt[t++] = null;
            var n = Dt[t];
            Dt[t++] = null;
            var u = Dt[t];
            if (Dt[t++] = null, a !== null && n !== null) {
                var s = a.pending;
                s === null ? n.next = n : (n.next = s.next, s.next = n), a.pending = n
            }
            u !== 0 && Ao(l, n, u)
        }
    }

    function tu(e, t, l, a) {
        Dt[ga++] = e, Dt[ga++] = t, Dt[ga++] = l, Dt[ga++] = a, js |= a, e.lanes |= a, e = e.alternate, e !== null && (e.lanes |= a)
    }

    function Ds(e, t, l, a) {
        return tu(e, t, l, a), lu(e)
    }

    function Ql(e, t) {
        return tu(e, null, null, t), lu(e)
    }

    function Ao(e, t, l) {
        e.lanes |= l;
        var a = e.alternate;
        a !== null && (a.lanes |= l);
        for (var n = !1, u = e.return; u !== null;) u.childLanes |= l, a = u.alternate, a !== null && (a.childLanes |= l), u.tag === 22 && (e = u.stateNode, e === null || e._visibility & 1 || (n = !0)), e = u, u = u.return;
        return e.tag === 3 ? (u = e.stateNode, n && t !== null && (n = 31 - vt(l), e = u.hiddenUpdates, a = e[n], a === null ? e[n] = [t] : a.push(t), t.lane = l | 536870912), u) : null
    }

    function lu(e) {
        if (50 < Bn) throw Bn = 0, qi = null, Error(r(185));
        for (var t = e.return; t !== null;) e = t, t = e.return;
        return e.tag === 3 ? e.stateNode : null
    }
    var ya = {};

    function e0(e, t, l, a) {
        this.tag = e, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null
    }

    function bt(e, t, l, a) {
        return new e0(e, t, l, a)
    }

    function Os(e) {
        return e = e.prototype, !(!e || !e.isReactComponent)
    }

    function Wt(e, t) {
        var l = e.alternate;
        return l === null ? (l = bt(e.tag, t, e.key, e.mode), l.elementType = e.elementType, l.type = e.type, l.stateNode = e.stateNode, l.alternate = e, e.alternate = l) : (l.pendingProps = t, l.type = e.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = e.flags & 65011712, l.childLanes = e.childLanes, l.lanes = e.lanes, l.child = e.child, l.memoizedProps = e.memoizedProps, l.memoizedState = e.memoizedState, l.updateQueue = e.updateQueue, t = e.dependencies, l.dependencies = t === null ? null : {
            lanes: t.lanes,
            firstContext: t.firstContext
        }, l.sibling = e.sibling, l.index = e.index, l.ref = e.ref, l.refCleanup = e.refCleanup, l
    }

    function To(e, t) {
        e.flags &= 65011714;
        var l = e.alternate;
        return l === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = l.childLanes, e.lanes = l.lanes, e.child = l.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = l.memoizedProps, e.memoizedState = l.memoizedState, e.updateQueue = l.updateQueue, e.type = l.type, t = l.dependencies, e.dependencies = t === null ? null : {
            lanes: t.lanes,
            firstContext: t.firstContext
        }), e
    }

    function au(e, t, l, a, n, u) {
        var s = 0;
        if (a = e, typeof e == "function") Os(e) && (s = 1);
        else if (typeof e == "string") s = uh(e, l, Z.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
        else e: switch (e) {
            case Ee:
                return e = bt(31, l, t, n), e.elementType = Ee, e.lanes = u, e;
            case K:
                return Xl(l.children, n, u, t);
            case $:
                s = 8, n |= 24;
                break;
            case w:
                return e = bt(12, l, t, n | 2), e.elementType = w, e.lanes = u, e;
            case ie:
                return e = bt(13, l, t, n), e.elementType = ie, e.lanes = u, e;
            case L:
                return e = bt(19, l, t, n), e.elementType = L, e.lanes = u, e;
            default:
                if (typeof e == "object" && e !== null) switch (e.$$typeof) {
                    case U:
                        s = 10;
                        break e;
                    case ee:
                        s = 9;
                        break e;
                    case X:
                        s = 11;
                        break e;
                    case G:
                        s = 14;
                        break e;
                    case T:
                        s = 16, a = null;
                        break e
                }
                s = 29, l = Error(r(130, e === null ? "null" : typeof e, "")), a = null
        }
        return t = bt(s, l, t, n), t.elementType = e, t.type = a, t.lanes = u, t
    }

    function Xl(e, t, l, a) {
        return e = bt(7, e, a, t), e.lanes = l, e
    }

    function zs(e, t, l) {
        return e = bt(6, e, null, t), e.lanes = l, e
    }

    function Co(e) {
        var t = bt(18, null, null, 0);
        return t.stateNode = e, t
    }

    function Hs(e, t, l) {
        return t = bt(4, e.children !== null ? e.children : [], e.key, t), t.lanes = l, t.stateNode = {
            containerInfo: e.containerInfo,
            pendingChildren: null,
            implementation: e.implementation
        }, t
    }
    var Vo = new WeakMap;

    function Ot(e, t) {
        if (typeof e == "object" && e !== null) {
            var l = Vo.get(e);
            return l !== void 0 ? l : (t = {
                value: e,
                source: t,
                stack: it(t)
            }, Vo.set(e, t), t)
        }
        return {
            value: e,
            source: t,
            stack: it(t)
        }
    }
    var pa = [],
        va = 0,
        nu = null,
        ln = 0,
        zt = [],
        Ht = 0,
        gl = null,
        Qt = 1,
        Xt = "";

    function Ft(e, t) {
        pa[va++] = ln, pa[va++] = nu, nu = e, ln = t
    }

    function jo(e, t, l) {
        zt[Ht++] = Qt, zt[Ht++] = Xt, zt[Ht++] = gl, gl = e;
        var a = Qt;
        e = Xt;
        var n = 32 - vt(a) - 1;
        a &= ~(1 << n), l += 1;
        var u = 32 - vt(t) + n;
        if (30 < u) {
            var s = n - n % 5;
            u = (a & (1 << s) - 1).toString(32), a >>= s, n -= s, Qt = 1 << 32 - vt(t) + n | l << n | a, Xt = u + e
        } else Qt = 1 << u | l << n | a, Xt = e
    }

    function _s(e) {
        e.return !== null && (Ft(e, 1), jo(e, 1, 0))
    }

    function Rs(e) {
        for (; e === nu;) nu = pa[--va], pa[va] = null, ln = pa[--va], pa[va] = null;
        for (; e === gl;) gl = zt[--Ht], zt[Ht] = null, Xt = zt[--Ht], zt[Ht] = null, Qt = zt[--Ht], zt[Ht] = null
    }

    function Do(e, t) {
        zt[Ht++] = Qt, zt[Ht++] = Xt, zt[Ht++] = gl, Qt = t.id, Xt = t.overflow, gl = e
    }
    var tt = null,
        Le = null,
        xe = !1,
        yl = null,
        _t = !1,
        Us = Error(r(519));

    function pl(e) {
        var t = Error(r(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", ""));
        throw an(Ot(t, e)), Us
    }

    function Oo(e) {
        var t = e.stateNode,
            l = e.type,
            a = e.memoizedProps;
        switch (t[et] = e, t[rt] = a, l) {
            case "dialog":
                ve("cancel", t), ve("close", t);
                break;
            case "iframe":
            case "object":
            case "embed":
                ve("load", t);
                break;
            case "video":
            case "audio":
                for (l = 0; l < An.length; l++) ve(An[l], t);
                break;
            case "source":
                ve("error", t);
                break;
            case "img":
            case "image":
            case "link":
                ve("error", t), ve("load", t);
                break;
            case "details":
                ve("toggle", t);
                break;
            case "input":
                ve("invalid", t), Xc(t, a.value, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name, !0);
                break;
            case "select":
                ve("invalid", t);
                break;
            case "textarea":
                ve("invalid", t), Zc(t, a.value, a.defaultValue, a.children)
        }
        l = a.children, typeof l != "string" && typeof l != "number" && typeof l != "bigint" || t.textContent === "" + l || a.suppressHydrationWarning === !0 || Wf(t.textContent, l) ? (a.popover != null && (ve("beforetoggle", t), ve("toggle", t)), a.onScroll != null && ve("scroll", t), a.onScrollEnd != null && ve("scrollend", t), a.onClick != null && (t.onclick = Jt), t = !0) : t = !1, t || pl(e, !0)
    }

    function zo(e) {
        for (tt = e.return; tt;) switch (tt.tag) {
            case 5:
            case 31:
            case 13:
                _t = !1;
                return;
            case 27:
            case 3:
                _t = !0;
                return;
            default:
                tt = tt.return
        }
    }

    function Sa(e) {
        if (e !== tt) return !1;
        if (!xe) return zo(e), xe = !0, !1;
        var t = e.tag,
            l;
        if ((l = t !== 3 && t !== 27) && ((l = t === 5) && (l = e.type, l = !(l !== "form" && l !== "button") || tc(e.type, e.memoizedProps)), l = !l), l && Le && pl(e), zo(e), t === 13) {
            if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(r(317));
            Le = ud(e)
        } else if (t === 31) {
            if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(r(317));
            Le = ud(e)
        } else t === 27 ? (t = Le, Dl(e.type) ? (e = sc, sc = null, Le = e) : Le = t) : Le = tt ? Ut(e.stateNode.nextSibling) : null;
        return !0
    }

    function kl() {
        Le = tt = null, xe = !1
    }

    function Ls() {
        var e = yl;
        return e !== null && (gt === null ? gt = e : gt.push.apply(gt, e), yl = null), e
    }

    function an(e) {
        yl === null ? yl = [e] : yl.push(e)
    }
    var Gs = d(null),
        Zl = null,
        $t = null;

    function vl(e, t, l) {
        Q(Gs, t._currentValue), t._currentValue = l
    }

    function Pt(e) {
        e._currentValue = Gs.current, N(Gs)
    }

    function qs(e, t, l) {
        for (; e !== null;) {
            var a = e.alternate;
            if ((e.childLanes & t) !== t ? (e.childLanes |= t, a !== null && (a.childLanes |= t)) : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t), e === l) break;
            e = e.return
        }
    }

    function ws(e, t, l, a) {
        var n = e.child;
        for (n !== null && (n.return = e); n !== null;) {
            var u = n.dependencies;
            if (u !== null) {
                var s = n.child;
                u = u.firstContext;
                e: for (; u !== null;) {
                    var c = u;
                    u = n;
                    for (var f = 0; f < t.length; f++)
                        if (c.context === t[f]) {
                            u.lanes |= l, c = u.alternate, c !== null && (c.lanes |= l), qs(u.return, l, e), a || (s = null);
                            break e
                        } u = c.next
                }
            } else if (n.tag === 18) {
                if (s = n.return, s === null) throw Error(r(341));
                s.lanes |= l, u = s.alternate, u !== null && (u.lanes |= l), qs(s, l, e), s = null
            } else s = n.child;
            if (s !== null) s.return = n;
            else
                for (s = n; s !== null;) {
                    if (s === e) {
                        s = null;
                        break
                    }
                    if (n = s.sibling, n !== null) {
                        n.return = s.return, s = n;
                        break
                    }
                    s = s.return
                }
            n = s
        }
    }

    function ba(e, t, l, a) {
        e = null;
        for (var n = t, u = !1; n !== null;) {
            if (!u) {
                if ((n.flags & 524288) !== 0) u = !0;
                else if ((n.flags & 262144) !== 0) break
            }
            if (n.tag === 10) {
                var s = n.alternate;
                if (s === null) throw Error(r(387));
                if (s = s.memoizedProps, s !== null) {
                    var c = n.type;
                    St(n.pendingProps.value, s.value) || (e !== null ? e.push(c) : e = [c])
                }
            } else if (n === Be.current) {
                if (s = n.alternate, s === null) throw Error(r(387));
                s.memoizedState.memoizedState !== n.memoizedState.memoizedState && (e !== null ? e.push(Dn) : e = [Dn])
            }
            n = n.return
        }
        e !== null && ws(t, e, l, a), t.flags |= 262144
    }

    function uu(e) {
        for (e = e.firstContext; e !== null;) {
            if (!St(e.context._currentValue, e.memoizedValue)) return !0;
            e = e.next
        }
        return !1
    }

    function Kl(e) {
        Zl = e, $t = null, e = e.dependencies, e !== null && (e.firstContext = null)
    }

    function lt(e) {
        return Ho(Zl, e)
    }

    function su(e, t) {
        return Zl === null && Kl(e), Ho(e, t)
    }

    function Ho(e, t) {
        var l = t._currentValue;
        if (t = {
                context: t,
                memoizedValue: l,
                next: null
            }, $t === null) {
            if (e === null) throw Error(r(308));
            $t = t, e.dependencies = {
                lanes: 0,
                firstContext: t
            }, e.flags |= 524288
        } else $t = $t.next = t;
        return l
    }
    var t0 = typeof AbortController < "u" ? AbortController : function() {
            var e = [],
                t = this.signal = {
                    aborted: !1,
                    addEventListener: function(l, a) {
                        e.push(a)
                    }
                };
            this.abort = function() {
                t.aborted = !0, e.forEach(function(l) {
                    return l()
                })
            }
        },
        l0 = o.unstable_scheduleCallback,
        a0 = o.unstable_NormalPriority,
        Ze = {
            $$typeof: U,
            Consumer: null,
            Provider: null,
            _currentValue: null,
            _currentValue2: null,
            _threadCount: 0
        };

    function Ys() {
        return {
            controller: new t0,
            data: new Map,
            refCount: 0
        }
    }

    function nn(e) {
        e.refCount--, e.refCount === 0 && l0(a0, function() {
            e.controller.abort()
        })
    }
    var un = null,
        Qs = 0,
        xa = 0,
        Ea = null;

    function n0(e, t) {
        if (un === null) {
            var l = un = [];
            Qs = 0, xa = Zi(), Ea = {
                status: "pending",
                value: void 0,
                then: function(a) {
                    l.push(a)
                }
            }
        }
        return Qs++, t.then(_o, _o), t
    }

    function _o() {
        if (--Qs === 0 && un !== null) {
            Ea !== null && (Ea.status = "fulfilled");
            var e = un;
            un = null, xa = 0, Ea = null;
            for (var t = 0; t < e.length; t++)(0, e[t])()
        }
    }

    function u0(e, t) {
        var l = [],
            a = {
                status: "pending",
                value: null,
                reason: null,
                then: function(n) {
                    l.push(n)
                }
            };
        return e.then(function() {
            a.status = "fulfilled", a.value = t;
            for (var n = 0; n < l.length; n++)(0, l[n])(t)
        }, function(n) {
            for (a.status = "rejected", a.reason = n, n = 0; n < l.length; n++)(0, l[n])(void 0)
        }), a
    }
    var Ro = p.S;
    p.S = function(e, t) {
        bf = ut(), typeof t == "object" && t !== null && typeof t.then == "function" && n0(e, t), Ro !== null && Ro(e, t)
    };
    var Jl = d(null);

    function Xs() {
        var e = Jl.current;
        return e !== null ? e : Ue.pooledCache
    }

    function iu(e, t) {
        t === null ? Q(Jl, Jl.current) : Q(Jl, t.pool)
    }

    function Uo() {
        var e = Xs();
        return e === null ? null : {
            parent: Ze._currentValue,
            pool: e
        }
    }
    var Ma = Error(r(460)),
        ks = Error(r(474)),
        cu = Error(r(542)),
        ou = {
            then: function() {}
        };

    function Lo(e) {
        return e = e.status, e === "fulfilled" || e === "rejected"
    }

    function Go(e, t, l) {
        switch (l = e[l], l === void 0 ? e.push(t) : l !== t && (t.then(Jt, Jt), t = l), t.status) {
            case "fulfilled":
                return t.value;
            case "rejected":
                throw e = t.reason, wo(e), e;
            default:
                if (typeof t.status == "string") t.then(Jt, Jt);
                else {
                    if (e = Ue, e !== null && 100 < e.shellSuspendCounter) throw Error(r(482));
                    e = t, e.status = "pending", e.then(function(a) {
                        if (t.status === "pending") {
                            var n = t;
                            n.status = "fulfilled", n.value = a
                        }
                    }, function(a) {
                        if (t.status === "pending") {
                            var n = t;
                            n.status = "rejected", n.reason = a
                        }
                    })
                }
                switch (t.status) {
                    case "fulfilled":
                        return t.value;
                    case "rejected":
                        throw e = t.reason, wo(e), e
                }
                throw Wl = t, Ma
        }
    }

    function Il(e) {
        try {
            var t = e._init;
            return t(e._payload)
        } catch (l) {
            throw l !== null && typeof l == "object" && typeof l.then == "function" ? (Wl = l, Ma) : l
        }
    }
    var Wl = null;

    function qo() {
        if (Wl === null) throw Error(r(459));
        var e = Wl;
        return Wl = null, e
    }

    function wo(e) {
        if (e === Ma || e === cu) throw Error(r(483))
    }
    var Ba = null,
        sn = 0;

    function ru(e) {
        var t = sn;
        return sn += 1, Ba === null && (Ba = []), Go(Ba, e, t)
    }

    function cn(e, t) {
        t = t.props.ref, e.ref = t !== void 0 ? t : null
    }

    function fu(e, t) {
        throw t.$$typeof === W ? Error(r(525)) : (e = Object.prototype.toString.call(t), Error(r(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)))
    }

    function Yo(e) {
        function t(h, m) {
            if (e) {
                var v = h.deletions;
                v === null ? (h.deletions = [m], h.flags |= 16) : v.push(m)
            }
        }

        function l(h, m) {
            if (!e) return null;
            for (; m !== null;) t(h, m), m = m.sibling;
            return null
        }

        function a(h) {
            for (var m = new Map; h !== null;) h.key !== null ? m.set(h.key, h) : m.set(h.index, h), h = h.sibling;
            return m
        }

        function n(h, m) {
            return h = Wt(h, m), h.index = 0, h.sibling = null, h
        }

        function u(h, m, v) {
            return h.index = v, e ? (v = h.alternate, v !== null ? (v = v.index, v < m ? (h.flags |= 67108866, m) : v) : (h.flags |= 67108866, m)) : (h.flags |= 1048576, m)
        }

        function s(h) {
            return e && h.alternate === null && (h.flags |= 67108866), h
        }

        function c(h, m, v, C) {
            return m === null || m.tag !== 6 ? (m = zs(v, h.mode, C), m.return = h, m) : (m = n(m, v), m.return = h, m)
        }

        function f(h, m, v, C) {
            var P = v.type;
            return P === K ? A(h, m, v.props.children, C, v.key) : m !== null && (m.elementType === P || typeof P == "object" && P !== null && P.$$typeof === T && Il(P) === m.type) ? (m = n(m, v.props), cn(m, v), m.return = h, m) : (m = au(v.type, v.key, v.props, null, h.mode, C), cn(m, v), m.return = h, m)
        }

        function S(h, m, v, C) {
            return m === null || m.tag !== 4 || m.stateNode.containerInfo !== v.containerInfo || m.stateNode.implementation !== v.implementation ? (m = Hs(v, h.mode, C), m.return = h, m) : (m = n(m, v.children || []), m.return = h, m)
        }

        function A(h, m, v, C, P) {
            return m === null || m.tag !== 7 ? (m = Xl(v, h.mode, C, P), m.return = h, m) : (m = n(m, v), m.return = h, m)
        }

        function V(h, m, v) {
            if (typeof m == "string" && m !== "" || typeof m == "number" || typeof m == "bigint") return m = zs("" + m, h.mode, v), m.return = h, m;
            if (typeof m == "object" && m !== null) {
                switch (m.$$typeof) {
                    case le:
                        return v = au(m.type, m.key, m.props, null, h.mode, v), cn(v, m), v.return = h, v;
                    case se:
                        return m = Hs(m, h.mode, v), m.return = h, m;
                    case T:
                        return m = Il(m), V(h, m, v)
                }
                if (je(m) || te(m)) return m = Xl(m, h.mode, v, null), m.return = h, m;
                if (typeof m.then == "function") return V(h, ru(m), v);
                if (m.$$typeof === U) return V(h, su(h, m), v);
                fu(h, m)
            }
            return null
        }

        function x(h, m, v, C) {
            var P = m !== null ? m.key : null;
            if (typeof v == "string" && v !== "" || typeof v == "number" || typeof v == "bigint") return P !== null ? null : c(h, m, "" + v, C);
            if (typeof v == "object" && v !== null) {
                switch (v.$$typeof) {
                    case le:
                        return v.key === P ? f(h, m, v, C) : null;
                    case se:
                        return v.key === P ? S(h, m, v, C) : null;
                    case T:
                        return v = Il(v), x(h, m, v, C)
                }
                if (je(v) || te(v)) return P !== null ? null : A(h, m, v, C, null);
                if (typeof v.then == "function") return x(h, m, ru(v), C);
                if (v.$$typeof === U) return x(h, m, su(h, v), C);
                fu(h, v)
            }
            return null
        }

        function B(h, m, v, C, P) {
            if (typeof C == "string" && C !== "" || typeof C == "number" || typeof C == "bigint") return h = h.get(v) || null, c(m, h, "" + C, P);
            if (typeof C == "object" && C !== null) {
                switch (C.$$typeof) {
                    case le:
                        return h = h.get(C.key === null ? v : C.key) || null, f(m, h, C, P);
                    case se:
                        return h = h.get(C.key === null ? v : C.key) || null, S(m, h, C, P);
                    case T:
                        return C = Il(C), B(h, m, v, C, P)
                }
                if (je(C) || te(C)) return h = h.get(v) || null, A(m, h, C, P, null);
                if (typeof C.then == "function") return B(h, m, v, ru(C), P);
                if (C.$$typeof === U) return B(h, m, v, su(m, C), P);
                fu(m, C)
            }
            return null
        }

        function k(h, m, v, C) {
            for (var P = null, Ne = null, I = m, ge = m = 0, be = null; I !== null && ge < v.length; ge++) {
                I.index > ge ? (be = I, I = null) : be = I.sibling;
                var Ae = x(h, I, v[ge], C);
                if (Ae === null) {
                    I === null && (I = be);
                    break
                }
                e && I && Ae.alternate === null && t(h, I), m = u(Ae, m, ge), Ne === null ? P = Ae : Ne.sibling = Ae, Ne = Ae, I = be
            }
            if (ge === v.length) return l(h, I), xe && Ft(h, ge), P;
            if (I === null) {
                for (; ge < v.length; ge++) I = V(h, v[ge], C), I !== null && (m = u(I, m, ge), Ne === null ? P = I : Ne.sibling = I, Ne = I);
                return xe && Ft(h, ge), P
            }
            for (I = a(I); ge < v.length; ge++) be = B(I, h, ge, v[ge], C), be !== null && (e && be.alternate !== null && I.delete(be.key === null ? ge : be.key), m = u(be, m, ge), Ne === null ? P = be : Ne.sibling = be, Ne = be);
            return e && I.forEach(function(Rl) {
                return t(h, Rl)
            }), xe && Ft(h, ge), P
        }

        function ae(h, m, v, C) {
            if (v == null) throw Error(r(151));
            for (var P = null, Ne = null, I = m, ge = m = 0, be = null, Ae = v.next(); I !== null && !Ae.done; ge++, Ae = v.next()) {
                I.index > ge ? (be = I, I = null) : be = I.sibling;
                var Rl = x(h, I, Ae.value, C);
                if (Rl === null) {
                    I === null && (I = be);
                    break
                }
                e && I && Rl.alternate === null && t(h, I), m = u(Rl, m, ge), Ne === null ? P = Rl : Ne.sibling = Rl, Ne = Rl, I = be
            }
            if (Ae.done) return l(h, I), xe && Ft(h, ge), P;
            if (I === null) {
                for (; !Ae.done; ge++, Ae = v.next()) Ae = V(h, Ae.value, C), Ae !== null && (m = u(Ae, m, ge), Ne === null ? P = Ae : Ne.sibling = Ae, Ne = Ae);
                return xe && Ft(h, ge), P
            }
            for (I = a(I); !Ae.done; ge++, Ae = v.next()) Ae = B(I, h, ge, Ae.value, C), Ae !== null && (e && Ae.alternate !== null && I.delete(Ae.key === null ? ge : Ae.key), m = u(Ae, m, ge), Ne === null ? P = Ae : Ne.sibling = Ae, Ne = Ae);
            return e && I.forEach(function(yh) {
                return t(h, yh)
            }), xe && Ft(h, ge), P
        }

        function Re(h, m, v, C) {
            if (typeof v == "object" && v !== null && v.type === K && v.key === null && (v = v.props.children), typeof v == "object" && v !== null) {
                switch (v.$$typeof) {
                    case le:
                        e: {
                            for (var P = v.key; m !== null;) {
                                if (m.key === P) {
                                    if (P = v.type, P === K) {
                                        if (m.tag === 7) {
                                            l(h, m.sibling), C = n(m, v.props.children), C.return = h, h = C;
                                            break e
                                        }
                                    } else if (m.elementType === P || typeof P == "object" && P !== null && P.$$typeof === T && Il(P) === m.type) {
                                        l(h, m.sibling), C = n(m, v.props), cn(C, v), C.return = h, h = C;
                                        break e
                                    }
                                    l(h, m);
                                    break
                                } else t(h, m);
                                m = m.sibling
                            }
                            v.type === K ? (C = Xl(v.props.children, h.mode, C, v.key), C.return = h, h = C) : (C = au(v.type, v.key, v.props, null, h.mode, C), cn(C, v), C.return = h, h = C)
                        }
                        return s(h);
                    case se:
                        e: {
                            for (P = v.key; m !== null;) {
                                if (m.key === P)
                                    if (m.tag === 4 && m.stateNode.containerInfo === v.containerInfo && m.stateNode.implementation === v.implementation) {
                                        l(h, m.sibling), C = n(m, v.children || []), C.return = h, h = C;
                                        break e
                                    } else {
                                        l(h, m);
                                        break
                                    }
                                else t(h, m);
                                m = m.sibling
                            }
                            C = Hs(v, h.mode, C),
                            C.return = h,
                            h = C
                        }
                        return s(h);
                    case T:
                        return v = Il(v), Re(h, m, v, C)
                }
                if (je(v)) return k(h, m, v, C);
                if (te(v)) {
                    if (P = te(v), typeof P != "function") throw Error(r(150));
                    return v = P.call(v), ae(h, m, v, C)
                }
                if (typeof v.then == "function") return Re(h, m, ru(v), C);
                if (v.$$typeof === U) return Re(h, m, su(h, v), C);
                fu(h, v)
            }
            return typeof v == "string" && v !== "" || typeof v == "number" || typeof v == "bigint" ? (v = "" + v, m !== null && m.tag === 6 ? (l(h, m.sibling), C = n(m, v), C.return = h, h = C) : (l(h, m), C = zs(v, h.mode, C), C.return = h, h = C), s(h)) : l(h, m)
        }
        return function(h, m, v, C) {
            try {
                sn = 0;
                var P = Re(h, m, v, C);
                return Ba = null, P
            } catch (I) {
                if (I === Ma || I === cu) throw I;
                var Ne = bt(29, I, null, h.mode);
                return Ne.lanes = C, Ne.return = h, Ne
            } finally {}
        }
    }
    var Fl = Yo(!0),
        Qo = Yo(!1),
        Sl = !1;

    function Zs(e) {
        e.updateQueue = {
            baseState: e.memoizedState,
            firstBaseUpdate: null,
            lastBaseUpdate: null,
            shared: {
                pending: null,
                lanes: 0,
                hiddenCallbacks: null
            },
            callbacks: null
        }
    }

    function Ks(e, t) {
        e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
            baseState: e.baseState,
            firstBaseUpdate: e.firstBaseUpdate,
            lastBaseUpdate: e.lastBaseUpdate,
            shared: e.shared,
            callbacks: null
        })
    }

    function bl(e) {
        return {
            lane: e,
            tag: 0,
            payload: null,
            callback: null,
            next: null
        }
    }

    function xl(e, t, l) {
        var a = e.updateQueue;
        if (a === null) return null;
        if (a = a.shared, (Ve & 2) !== 0) {
            var n = a.pending;
            return n === null ? t.next = t : (t.next = n.next, n.next = t), a.pending = t, t = lu(e), Ao(e, null, l), t
        }
        return tu(e, a, t, l), lu(e)
    }

    function on(e, t, l) {
        if (t = t.updateQueue, t !== null && (t = t.shared, (l & 4194048) !== 0)) {
            var a = t.lanes;
            a &= e.pendingLanes, l |= a, t.lanes = l, zc(e, l)
        }
    }

    function Js(e, t) {
        var l = e.updateQueue,
            a = e.alternate;
        if (a !== null && (a = a.updateQueue, l === a)) {
            var n = null,
                u = null;
            if (l = l.firstBaseUpdate, l !== null) {
                do {
                    var s = {
                        lane: l.lane,
                        tag: l.tag,
                        payload: l.payload,
                        callback: null,
                        next: null
                    };
                    u === null ? n = u = s : u = u.next = s, l = l.next
                } while (l !== null);
                u === null ? n = u = t : u = u.next = t
            } else n = u = t;
            l = {
                baseState: a.baseState,
                firstBaseUpdate: n,
                lastBaseUpdate: u,
                shared: a.shared,
                callbacks: a.callbacks
            }, e.updateQueue = l;
            return
        }
        e = l.lastBaseUpdate, e === null ? l.firstBaseUpdate = t : e.next = t, l.lastBaseUpdate = t
    }
    var Is = !1;

    function rn() {
        if (Is) {
            var e = Ea;
            if (e !== null) throw e
        }
    }

    function fn(e, t, l, a) {
        Is = !1;
        var n = e.updateQueue;
        Sl = !1;
        var u = n.firstBaseUpdate,
            s = n.lastBaseUpdate,
            c = n.shared.pending;
        if (c !== null) {
            n.shared.pending = null;
            var f = c,
                S = f.next;
            f.next = null, s === null ? u = S : s.next = S, s = f;
            var A = e.alternate;
            A !== null && (A = A.updateQueue, c = A.lastBaseUpdate, c !== s && (c === null ? A.firstBaseUpdate = S : c.next = S, A.lastBaseUpdate = f))
        }
        if (u !== null) {
            var V = n.baseState;
            s = 0, A = S = f = null, c = u;
            do {
                var x = c.lane & -536870913,
                    B = x !== c.lane;
                if (B ? (Se & x) === x : (a & x) === x) {
                    x !== 0 && x === xa && (Is = !0), A !== null && (A = A.next = {
                        lane: 0,
                        tag: c.tag,
                        payload: c.payload,
                        callback: null,
                        next: null
                    });
                    e: {
                        var k = e,
                            ae = c;x = t;
                        var Re = l;
                        switch (ae.tag) {
                            case 1:
                                if (k = ae.payload, typeof k == "function") {
                                    V = k.call(Re, V, x);
                                    break e
                                }
                                V = k;
                                break e;
                            case 3:
                                k.flags = k.flags & -65537 | 128;
                            case 0:
                                if (k = ae.payload, x = typeof k == "function" ? k.call(Re, V, x) : k, x == null) break e;
                                V = _({}, V, x);
                                break e;
                            case 2:
                                Sl = !0
                        }
                    }
                    x = c.callback, x !== null && (e.flags |= 64, B && (e.flags |= 8192), B = n.callbacks, B === null ? n.callbacks = [x] : B.push(x))
                } else B = {
                    lane: x,
                    tag: c.tag,
                    payload: c.payload,
                    callback: c.callback,
                    next: null
                }, A === null ? (S = A = B, f = V) : A = A.next = B, s |= x;
                if (c = c.next, c === null) {
                    if (c = n.shared.pending, c === null) break;
                    B = c, c = B.next, B.next = null, n.lastBaseUpdate = B, n.shared.pending = null
                }
            } while (!0);
            A === null && (f = V), n.baseState = f, n.firstBaseUpdate = S, n.lastBaseUpdate = A, u === null && (n.shared.lanes = 0), Al |= s, e.lanes = s, e.memoizedState = V
        }
    }

    function Xo(e, t) {
        if (typeof e != "function") throw Error(r(191, e));
        e.call(t)
    }

    function ko(e, t) {
        var l = e.callbacks;
        if (l !== null)
            for (e.callbacks = null, e = 0; e < l.length; e++) Xo(l[e], t)
    }
    var Na = d(null),
        du = d(0);

    function Zo(e, t) {
        e = cl, Q(du, e), Q(Na, t), cl = e | t.baseLanes
    }

    function Ws() {
        Q(du, cl), Q(Na, Na.current)
    }

    function Fs() {
        cl = du.current, N(Na), N(du)
    }
    var xt = d(null),
        Rt = null;

    function El(e) {
        var t = e.alternate;
        Q(Xe, Xe.current & 1), Q(xt, e), Rt === null && (t === null || Na.current !== null || t.memoizedState !== null) && (Rt = e)
    }

    function $s(e) {
        Q(Xe, Xe.current), Q(xt, e), Rt === null && (Rt = e)
    }

    function Ko(e) {
        e.tag === 22 ? (Q(Xe, Xe.current), Q(xt, e), Rt === null && (Rt = e)) : Ml()
    }

    function Ml() {
        Q(Xe, Xe.current), Q(xt, xt.current)
    }

    function Et(e) {
        N(xt), Rt === e && (Rt = null), N(Xe)
    }
    var Xe = d(0);

    function mu(e) {
        for (var t = e; t !== null;) {
            if (t.tag === 13) {
                var l = t.memoizedState;
                if (l !== null && (l = l.dehydrated, l === null || nc(l) || uc(l))) return t
            } else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
                if ((t.flags & 128) !== 0) return t
            } else if (t.child !== null) {
                t.child.return = t, t = t.child;
                continue
            }
            if (t === e) break;
            for (; t.sibling === null;) {
                if (t.return === null || t.return === e) return null;
                t = t.return
            }
            t.sibling.return = t.return, t = t.sibling
        }
        return null
    }
    var el = 0,
        me = null,
        He = null,
        Ke = null,
        hu = !1,
        Aa = !1,
        $l = !1,
        gu = 0,
        dn = 0,
        Ta = null,
        s0 = 0;

    function Ye() {
        throw Error(r(321))
    }

    function Ps(e, t) {
        if (t === null) return !1;
        for (var l = 0; l < t.length && l < e.length; l++)
            if (!St(e[l], t[l])) return !1;
        return !0
    }

    function ei(e, t, l, a, n, u) {
        return el = u, me = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, p.H = e === null || e.memoizedState === null ? jr : gi, $l = !1, u = l(a, n), $l = !1, Aa && (u = Io(t, l, a, n)), Jo(e), u
    }

    function Jo(e) {
        p.H = gn;
        var t = He !== null && He.next !== null;
        if (el = 0, Ke = He = me = null, hu = !1, dn = 0, Ta = null, t) throw Error(r(300));
        e === null || Je || (e = e.dependencies, e !== null && uu(e) && (Je = !0))
    }

    function Io(e, t, l, a) {
        me = e;
        var n = 0;
        do {
            if (Aa && (Ta = null), dn = 0, Aa = !1, 25 <= n) throw Error(r(301));
            if (n += 1, Ke = He = null, e.updateQueue != null) {
                var u = e.updateQueue;
                u.lastEffect = null, u.events = null, u.stores = null, u.memoCache != null && (u.memoCache.index = 0)
            }
            p.H = Dr, u = t(l, a)
        } while (Aa);
        return u
    }

    function i0() {
        var e = p.H,
            t = e.useState()[0];
        return t = typeof t.then == "function" ? mn(t) : t, e = e.useState()[0], (He !== null ? He.memoizedState : null) !== e && (me.flags |= 1024), t
    }

    function ti() {
        var e = gu !== 0;
        return gu = 0, e
    }

    function li(e, t, l) {
        t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l
    }

    function ai(e) {
        if (hu) {
            for (e = e.memoizedState; e !== null;) {
                var t = e.queue;
                t !== null && (t.pending = null), e = e.next
            }
            hu = !1
        }
        el = 0, Ke = He = me = null, Aa = !1, dn = gu = 0, Ta = null
    }

    function ct() {
        var e = {
            memoizedState: null,
            baseState: null,
            baseQueue: null,
            queue: null,
            next: null
        };
        return Ke === null ? me.memoizedState = Ke = e : Ke = Ke.next = e, Ke
    }

    function ke() {
        if (He === null) {
            var e = me.alternate;
            e = e !== null ? e.memoizedState : null
        } else e = He.next;
        var t = Ke === null ? me.memoizedState : Ke.next;
        if (t !== null) Ke = t, He = e;
        else {
            if (e === null) throw me.alternate === null ? Error(r(467)) : Error(r(310));
            He = e, e = {
                memoizedState: He.memoizedState,
                baseState: He.baseState,
                baseQueue: He.baseQueue,
                queue: He.queue,
                next: null
            }, Ke === null ? me.memoizedState = Ke = e : Ke = Ke.next = e
        }
        return Ke
    }

    function yu() {
        return {
            lastEffect: null,
            events: null,
            stores: null,
            memoCache: null
        }
    }

    function mn(e) {
        var t = dn;
        return dn += 1, Ta === null && (Ta = []), e = Go(Ta, e, t), t = me, (Ke === null ? t.memoizedState : Ke.next) === null && (t = t.alternate, p.H = t === null || t.memoizedState === null ? jr : gi), e
    }

    function pu(e) {
        if (e !== null && typeof e == "object") {
            if (typeof e.then == "function") return mn(e);
            if (e.$$typeof === U) return lt(e)
        }
        throw Error(r(438, String(e)))
    }

    function ni(e) {
        var t = null,
            l = me.updateQueue;
        if (l !== null && (t = l.memoCache), t == null) {
            var a = me.alternate;
            a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (t = {
                data: a.data.map(function(n) {
                    return n.slice()
                }),
                index: 0
            })))
        }
        if (t == null && (t = {
                data: [],
                index: 0
            }), l === null && (l = yu(), me.updateQueue = l), l.memoCache = t, l = t.data[t.index], l === void 0)
            for (l = t.data[t.index] = Array(e), a = 0; a < e; a++) l[a] = Y;
        return t.index++, l
    }

    function tl(e, t) {
        return typeof t == "function" ? t(e) : t
    }

    function vu(e) {
        var t = ke();
        return ui(t, He, e)
    }

    function ui(e, t, l) {
        var a = e.queue;
        if (a === null) throw Error(r(311));
        a.lastRenderedReducer = l;
        var n = e.baseQueue,
            u = a.pending;
        if (u !== null) {
            if (n !== null) {
                var s = n.next;
                n.next = u.next, u.next = s
            }
            t.baseQueue = n = u, a.pending = null
        }
        if (u = e.baseState, n === null) e.memoizedState = u;
        else {
            t = n.next;
            var c = s = null,
                f = null,
                S = t,
                A = !1;
            do {
                var V = S.lane & -536870913;
                if (V !== S.lane ? (Se & V) === V : (el & V) === V) {
                    var x = S.revertLane;
                    if (x === 0) f !== null && (f = f.next = {
                        lane: 0,
                        revertLane: 0,
                        gesture: null,
                        action: S.action,
                        hasEagerState: S.hasEagerState,
                        eagerState: S.eagerState,
                        next: null
                    }), V === xa && (A = !0);
                    else if ((el & x) === x) {
                        S = S.next, x === xa && (A = !0);
                        continue
                    } else V = {
                        lane: 0,
                        revertLane: S.revertLane,
                        gesture: null,
                        action: S.action,
                        hasEagerState: S.hasEagerState,
                        eagerState: S.eagerState,
                        next: null
                    }, f === null ? (c = f = V, s = u) : f = f.next = V, me.lanes |= x, Al |= x;
                    V = S.action, $l && l(u, V), u = S.hasEagerState ? S.eagerState : l(u, V)
                } else x = {
                    lane: V,
                    revertLane: S.revertLane,
                    gesture: S.gesture,
                    action: S.action,
                    hasEagerState: S.hasEagerState,
                    eagerState: S.eagerState,
                    next: null
                }, f === null ? (c = f = x, s = u) : f = f.next = x, me.lanes |= V, Al |= V;
                S = S.next
            } while (S !== null && S !== t);
            if (f === null ? s = u : f.next = c, !St(u, e.memoizedState) && (Je = !0, A && (l = Ea, l !== null))) throw l;
            e.memoizedState = u, e.baseState = s, e.baseQueue = f, a.lastRenderedState = u
        }
        return n === null && (a.lanes = 0), [e.memoizedState, a.dispatch]
    }

    function si(e) {
        var t = ke(),
            l = t.queue;
        if (l === null) throw Error(r(311));
        l.lastRenderedReducer = e;
        var a = l.dispatch,
            n = l.pending,
            u = t.memoizedState;
        if (n !== null) {
            l.pending = null;
            var s = n = n.next;
            do u = e(u, s.action), s = s.next; while (s !== n);
            St(u, t.memoizedState) || (Je = !0), t.memoizedState = u, t.baseQueue === null && (t.baseState = u), l.lastRenderedState = u
        }
        return [u, a]
    }

    function Wo(e, t, l) {
        var a = me,
            n = ke(),
            u = xe;
        if (u) {
            if (l === void 0) throw Error(r(407));
            l = l()
        } else l = t();
        var s = !St((He || n).memoizedState, l);
        if (s && (n.memoizedState = l, Je = !0), n = n.queue, oi(Po.bind(null, a, n, e), [e]), n.getSnapshot !== t || s || Ke !== null && Ke.memoizedState.tag & 1) {
            if (a.flags |= 2048, Ca(9, {
                    destroy: void 0
                }, $o.bind(null, a, n, l, t), null), Ue === null) throw Error(r(349));
            u || (el & 127) !== 0 || Fo(a, t, l)
        }
        return l
    }

    function Fo(e, t, l) {
        e.flags |= 16384, e = {
            getSnapshot: t,
            value: l
        }, t = me.updateQueue, t === null ? (t = yu(), me.updateQueue = t, t.stores = [e]) : (l = t.stores, l === null ? t.stores = [e] : l.push(e))
    }

    function $o(e, t, l, a) {
        t.value = l, t.getSnapshot = a, er(t) && tr(e)
    }

    function Po(e, t, l) {
        return l(function() {
            er(t) && tr(e)
        })
    }

    function er(e) {
        var t = e.getSnapshot;
        e = e.value;
        try {
            var l = t();
            return !St(e, l)
        } catch {
            return !0
        }
    }

    function tr(e) {
        var t = Ql(e, 2);
        t !== null && yt(t, e, 2)
    }

    function ii(e) {
        var t = ct();
        if (typeof e == "function") {
            var l = e;
            if (e = l(), $l) {
                dl(!0);
                try {
                    l()
                } finally {
                    dl(!1)
                }
            }
        }
        return t.memoizedState = t.baseState = e, t.queue = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: tl,
            lastRenderedState: e
        }, t
    }

    function lr(e, t, l, a) {
        return e.baseState = l, ui(e, He, typeof a == "function" ? a : tl)
    }

    function c0(e, t, l, a, n) {
        if (xu(e)) throw Error(r(485));
        if (e = t.action, e !== null) {
            var u = {
                payload: n,
                action: e,
                next: null,
                isTransition: !0,
                status: "pending",
                value: null,
                reason: null,
                listeners: [],
                then: function(s) {
                    u.listeners.push(s)
                }
            };
            p.T !== null ? l(!0) : u.isTransition = !1, a(u), l = t.pending, l === null ? (u.next = t.pending = u, ar(t, u)) : (u.next = l.next, t.pending = l.next = u)
        }
    }

    function ar(e, t) {
        var l = t.action,
            a = t.payload,
            n = e.state;
        if (t.isTransition) {
            var u = p.T,
                s = {};
            p.T = s;
            try {
                var c = l(n, a),
                    f = p.S;
                f !== null && f(s, c), nr(e, t, c)
            } catch (S) {
                ci(e, t, S)
            } finally {
                u !== null && s.types !== null && (u.types = s.types), p.T = u
            }
        } else try {
            u = l(n, a), nr(e, t, u)
        } catch (S) {
            ci(e, t, S)
        }
    }

    function nr(e, t, l) {
        l !== null && typeof l == "object" && typeof l.then == "function" ? l.then(function(a) {
            ur(e, t, a)
        }, function(a) {
            return ci(e, t, a)
        }) : ur(e, t, l)
    }

    function ur(e, t, l) {
        t.status = "fulfilled", t.value = l, sr(t), e.state = l, t = e.pending, t !== null && (l = t.next, l === t ? e.pending = null : (l = l.next, t.next = l, ar(e, l)))
    }

    function ci(e, t, l) {
        var a = e.pending;
        if (e.pending = null, a !== null) {
            a = a.next;
            do t.status = "rejected", t.reason = l, sr(t), t = t.next; while (t !== a)
        }
        e.action = null
    }

    function sr(e) {
        e = e.listeners;
        for (var t = 0; t < e.length; t++)(0, e[t])()
    }

    function ir(e, t) {
        return t
    }

    function cr(e, t) {
        if (xe) {
            var l = Ue.formState;
            if (l !== null) {
                e: {
                    var a = me;
                    if (xe) {
                        if (Le) {
                            t: {
                                for (var n = Le, u = _t; n.nodeType !== 8;) {
                                    if (!u) {
                                        n = null;
                                        break t
                                    }
                                    if (n = Ut(n.nextSibling), n === null) {
                                        n = null;
                                        break t
                                    }
                                }
                                u = n.data,
                                n = u === "F!" || u === "F" ? n : null
                            }
                            if (n) {
                                Le = Ut(n.nextSibling), a = n.data === "F!";
                                break e
                            }
                        }
                        pl(a)
                    }
                    a = !1
                }
                a && (t = l[0])
            }
        }
        return l = ct(), l.memoizedState = l.baseState = t, a = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: ir,
            lastRenderedState: t
        }, l.queue = a, l = Tr.bind(null, me, a), a.dispatch = l, a = ii(!1), u = hi.bind(null, me, !1, a.queue), a = ct(), n = {
            state: t,
            dispatch: null,
            action: e,
            pending: null
        }, a.queue = n, l = c0.bind(null, me, n, u, l), n.dispatch = l, a.memoizedState = e, [t, l, !1]
    }

    function or(e) {
        var t = ke();
        return rr(t, He, e)
    }

    function rr(e, t, l) {
        if (t = ui(e, t, ir)[0], e = vu(tl)[0], typeof t == "object" && t !== null && typeof t.then == "function") try {
            var a = mn(t)
        } catch (s) {
            throw s === Ma ? cu : s
        } else a = t;
        t = ke();
        var n = t.queue,
            u = n.dispatch;
        return l !== t.memoizedState && (me.flags |= 2048, Ca(9, {
            destroy: void 0
        }, o0.bind(null, n, l), null)), [a, u, e]
    }

    function o0(e, t) {
        e.action = t
    }

    function fr(e) {
        var t = ke(),
            l = He;
        if (l !== null) return rr(t, l, e);
        ke(), t = t.memoizedState, l = ke();
        var a = l.queue.dispatch;
        return l.memoizedState = e, [t, a, !1]
    }

    function Ca(e, t, l, a) {
        return e = {
            tag: e,
            create: l,
            deps: a,
            inst: t,
            next: null
        }, t = me.updateQueue, t === null && (t = yu(), me.updateQueue = t), l = t.lastEffect, l === null ? t.lastEffect = e.next = e : (a = l.next, l.next = e, e.next = a, t.lastEffect = e), e
    }

    function dr() {
        return ke().memoizedState
    }

    function Su(e, t, l, a) {
        var n = ct();
        me.flags |= e, n.memoizedState = Ca(1 | t, {
            destroy: void 0
        }, l, a === void 0 ? null : a)
    }

    function bu(e, t, l, a) {
        var n = ke();
        a = a === void 0 ? null : a;
        var u = n.memoizedState.inst;
        He !== null && a !== null && Ps(a, He.memoizedState.deps) ? n.memoizedState = Ca(t, u, l, a) : (me.flags |= e, n.memoizedState = Ca(1 | t, u, l, a))
    }

    function mr(e, t) {
        Su(8390656, 8, e, t)
    }

    function oi(e, t) {
        bu(2048, 8, e, t)
    }

    function r0(e) {
        me.flags |= 4;
        var t = me.updateQueue;
        if (t === null) t = yu(), me.updateQueue = t, t.events = [e];
        else {
            var l = t.events;
            l === null ? t.events = [e] : l.push(e)
        }
    }

    function hr(e) {
        var t = ke().memoizedState;
        return r0({
                ref: t,
                nextImpl: e
            }),
            function() {
                if ((Ve & 2) !== 0) throw Error(r(440));
                return t.impl.apply(void 0, arguments)
            }
    }

    function gr(e, t) {
        return bu(4, 2, e, t)
    }

    function yr(e, t) {
        return bu(4, 4, e, t)
    }

    function pr(e, t) {
        if (typeof t == "function") {
            e = e();
            var l = t(e);
            return function() {
                typeof l == "function" ? l() : t(null)
            }
        }
        if (t != null) return e = e(), t.current = e,
            function() {
                t.current = null
            }
    }

    function vr(e, t, l) {
        l = l != null ? l.concat([e]) : null, bu(4, 4, pr.bind(null, t, e), l)
    }

    function ri() {}

    function Sr(e, t) {
        var l = ke();
        t = t === void 0 ? null : t;
        var a = l.memoizedState;
        return t !== null && Ps(t, a[1]) ? a[0] : (l.memoizedState = [e, t], e)
    }

    function br(e, t) {
        var l = ke();
        t = t === void 0 ? null : t;
        var a = l.memoizedState;
        if (t !== null && Ps(t, a[1])) return a[0];
        if (a = e(), $l) {
            dl(!0);
            try {
                e()
            } finally {
                dl(!1)
            }
        }
        return l.memoizedState = [a, t], a
    }

    function fi(e, t, l) {
        return l === void 0 || (el & 1073741824) !== 0 && (Se & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = l, e = Ef(), me.lanes |= e, Al |= e, l)
    }

    function xr(e, t, l, a) {
        return St(l, t) ? l : Na.current !== null ? (e = fi(e, l, a), St(e, t) || (Je = !0), e) : (el & 42) === 0 || (el & 1073741824) !== 0 && (Se & 261930) === 0 ? (Je = !0, e.memoizedState = l) : (e = Ef(), me.lanes |= e, Al |= e, t)
    }

    function Er(e, t, l, a, n) {
        var u = H.p;
        H.p = u !== 0 && 8 > u ? u : 8;
        var s = p.T,
            c = {};
        p.T = c, hi(e, !1, t, l);
        try {
            var f = n(),
                S = p.S;
            if (S !== null && S(c, f), f !== null && typeof f == "object" && typeof f.then == "function") {
                var A = u0(f, a);
                hn(e, t, A, Nt(e))
            } else hn(e, t, a, Nt(e))
        } catch (V) {
            hn(e, t, {
                then: function() {},
                status: "rejected",
                reason: V
            }, Nt())
        } finally {
            H.p = u, s !== null && c.types !== null && (s.types = c.types), p.T = s
        }
    }

    function f0() {}

    function di(e, t, l, a) {
        if (e.tag !== 5) throw Error(r(476));
        var n = Mr(e).queue;
        Er(e, n, t, J, l === null ? f0 : function() {
            return Br(e), l(a)
        })
    }

    function Mr(e) {
        var t = e.memoizedState;
        if (t !== null) return t;
        t = {
            memoizedState: J,
            baseState: J,
            baseQueue: null,
            queue: {
                pending: null,
                lanes: 0,
                dispatch: null,
                lastRenderedReducer: tl,
                lastRenderedState: J
            },
            next: null
        };
        var l = {};
        return t.next = {
            memoizedState: l,
            baseState: l,
            baseQueue: null,
            queue: {
                pending: null,
                lanes: 0,
                dispatch: null,
                lastRenderedReducer: tl,
                lastRenderedState: l
            },
            next: null
        }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t
    }

    function Br(e) {
        var t = Mr(e);
        t.next === null && (t = e.alternate.memoizedState), hn(e, t.next.queue, {}, Nt())
    }

    function mi() {
        return lt(Dn)
    }

    function Nr() {
        return ke().memoizedState
    }

    function Ar() {
        return ke().memoizedState
    }

    function d0(e) {
        for (var t = e.return; t !== null;) {
            switch (t.tag) {
                case 24:
                case 3:
                    var l = Nt();
                    e = bl(l);
                    var a = xl(t, e, l);
                    a !== null && (yt(a, t, l), on(a, t, l)), t = {
                        cache: Ys()
                    }, e.payload = t;
                    return
            }
            t = t.return
        }
    }

    function m0(e, t, l) {
        var a = Nt();
        l = {
            lane: a,
            revertLane: 0,
            gesture: null,
            action: l,
            hasEagerState: !1,
            eagerState: null,
            next: null
        }, xu(e) ? Cr(t, l) : (l = Ds(e, t, l, a), l !== null && (yt(l, e, a), Vr(l, t, a)))
    }

    function Tr(e, t, l) {
        var a = Nt();
        hn(e, t, l, a)
    }

    function hn(e, t, l, a) {
        var n = {
            lane: a,
            revertLane: 0,
            gesture: null,
            action: l,
            hasEagerState: !1,
            eagerState: null,
            next: null
        };
        if (xu(e)) Cr(t, n);
        else {
            var u = e.alternate;
            if (e.lanes === 0 && (u === null || u.lanes === 0) && (u = t.lastRenderedReducer, u !== null)) try {
                var s = t.lastRenderedState,
                    c = u(s, l);
                if (n.hasEagerState = !0, n.eagerState = c, St(c, s)) return tu(e, t, n, 0), Ue === null && eu(), !1
            } catch {} finally {}
            if (l = Ds(e, t, n, a), l !== null) return yt(l, e, a), Vr(l, t, a), !0
        }
        return !1
    }

    function hi(e, t, l, a) {
        if (a = {
                lane: 2,
                revertLane: Zi(),
                gesture: null,
                action: a,
                hasEagerState: !1,
                eagerState: null,
                next: null
            }, xu(e)) {
            if (t) throw Error(r(479))
        } else t = Ds(e, l, a, 2), t !== null && yt(t, e, 2)
    }

    function xu(e) {
        var t = e.alternate;
        return e === me || t !== null && t === me
    }

    function Cr(e, t) {
        Aa = hu = !0;
        var l = e.pending;
        l === null ? t.next = t : (t.next = l.next, l.next = t), e.pending = t
    }

    function Vr(e, t, l) {
        if ((l & 4194048) !== 0) {
            var a = t.lanes;
            a &= e.pendingLanes, l |= a, t.lanes = l, zc(e, l)
        }
    }
    var gn = {
        readContext: lt,
        use: pu,
        useCallback: Ye,
        useContext: Ye,
        useEffect: Ye,
        useImperativeHandle: Ye,
        useLayoutEffect: Ye,
        useInsertionEffect: Ye,
        useMemo: Ye,
        useReducer: Ye,
        useRef: Ye,
        useState: Ye,
        useDebugValue: Ye,
        useDeferredValue: Ye,
        useTransition: Ye,
        useSyncExternalStore: Ye,
        useId: Ye,
        useHostTransitionStatus: Ye,
        useFormState: Ye,
        useActionState: Ye,
        useOptimistic: Ye,
        useMemoCache: Ye,
        useCacheRefresh: Ye
    };
    gn.useEffectEvent = Ye;
    var jr = {
            readContext: lt,
            use: pu,
            useCallback: function(e, t) {
                return ct().memoizedState = [e, t === void 0 ? null : t], e
            },
            useContext: lt,
            useEffect: mr,
            useImperativeHandle: function(e, t, l) {
                l = l != null ? l.concat([e]) : null, Su(4194308, 4, pr.bind(null, t, e), l)
            },
            useLayoutEffect: function(e, t) {
                return Su(4194308, 4, e, t)
            },
            useInsertionEffect: function(e, t) {
                Su(4, 2, e, t)
            },
            useMemo: function(e, t) {
                var l = ct();
                t = t === void 0 ? null : t;
                var a = e();
                if ($l) {
                    dl(!0);
                    try {
                        e()
                    } finally {
                        dl(!1)
                    }
                }
                return l.memoizedState = [a, t], a
            },
            useReducer: function(e, t, l) {
                var a = ct();
                if (l !== void 0) {
                    var n = l(t);
                    if ($l) {
                        dl(!0);
                        try {
                            l(t)
                        } finally {
                            dl(!1)
                        }
                    }
                } else n = t;
                return a.memoizedState = a.baseState = n, e = {
                    pending: null,
                    lanes: 0,
                    dispatch: null,
                    lastRenderedReducer: e,
                    lastRenderedState: n
                }, a.queue = e, e = e.dispatch = m0.bind(null, me, e), [a.memoizedState, e]
            },
            useRef: function(e) {
                var t = ct();
                return e = {
                    current: e
                }, t.memoizedState = e
            },
            useState: function(e) {
                e = ii(e);
                var t = e.queue,
                    l = Tr.bind(null, me, t);
                return t.dispatch = l, [e.memoizedState, l]
            },
            useDebugValue: ri,
            useDeferredValue: function(e, t) {
                var l = ct();
                return fi(l, e, t)
            },
            useTransition: function() {
                var e = ii(!1);
                return e = Er.bind(null, me, e.queue, !0, !1), ct().memoizedState = e, [!1, e]
            },
            useSyncExternalStore: function(e, t, l) {
                var a = me,
                    n = ct();
                if (xe) {
                    if (l === void 0) throw Error(r(407));
                    l = l()
                } else {
                    if (l = t(), Ue === null) throw Error(r(349));
                    (Se & 127) !== 0 || Fo(a, t, l)
                }
                n.memoizedState = l;
                var u = {
                    value: l,
                    getSnapshot: t
                };
                return n.queue = u, mr(Po.bind(null, a, u, e), [e]), a.flags |= 2048, Ca(9, {
                    destroy: void 0
                }, $o.bind(null, a, u, l, t), null), l
            },
            useId: function() {
                var e = ct(),
                    t = Ue.identifierPrefix;
                if (xe) {
                    var l = Xt,
                        a = Qt;
                    l = (a & ~(1 << 32 - vt(a) - 1)).toString(32) + l, t = "_" + t + "R_" + l, l = gu++, 0 < l && (t += "H" + l.toString(32)), t += "_"
                } else l = s0++, t = "_" + t + "r_" + l.toString(32) + "_";
                return e.memoizedState = t
            },
            useHostTransitionStatus: mi,
            useFormState: cr,
            useActionState: cr,
            useOptimistic: function(e) {
                var t = ct();
                t.memoizedState = t.baseState = e;
                var l = {
                    pending: null,
                    lanes: 0,
                    dispatch: null,
                    lastRenderedReducer: null,
                    lastRenderedState: null
                };
                return t.queue = l, t = hi.bind(null, me, !0, l), l.dispatch = t, [e, t]
            },
            useMemoCache: ni,
            useCacheRefresh: function() {
                return ct().memoizedState = d0.bind(null, me)
            },
            useEffectEvent: function(e) {
                var t = ct(),
                    l = {
                        impl: e
                    };
                return t.memoizedState = l,
                    function() {
                        if ((Ve & 2) !== 0) throw Error(r(440));
                        return l.impl.apply(void 0, arguments)
                    }
            }
        },
        gi = {
            readContext: lt,
            use: pu,
            useCallback: Sr,
            useContext: lt,
            useEffect: oi,
            useImperativeHandle: vr,
            useInsertionEffect: gr,
            useLayoutEffect: yr,
            useMemo: br,
            useReducer: vu,
            useRef: dr,
            useState: function() {
                return vu(tl)
            },
            useDebugValue: ri,
            useDeferredValue: function(e, t) {
                var l = ke();
                return xr(l, He.memoizedState, e, t)
            },
            useTransition: function() {
                var e = vu(tl)[0],
                    t = ke().memoizedState;
                return [typeof e == "boolean" ? e : mn(e), t]
            },
            useSyncExternalStore: Wo,
            useId: Nr,
            useHostTransitionStatus: mi,
            useFormState: or,
            useActionState: or,
            useOptimistic: function(e, t) {
                var l = ke();
                return lr(l, He, e, t)
            },
            useMemoCache: ni,
            useCacheRefresh: Ar
        };
    gi.useEffectEvent = hr;
    var Dr = {
        readContext: lt,
        use: pu,
        useCallback: Sr,
        useContext: lt,
        useEffect: oi,
        useImperativeHandle: vr,
        useInsertionEffect: gr,
        useLayoutEffect: yr,
        useMemo: br,
        useReducer: si,
        useRef: dr,
        useState: function() {
            return si(tl)
        },
        useDebugValue: ri,
        useDeferredValue: function(e, t) {
            var l = ke();
            return He === null ? fi(l, e, t) : xr(l, He.memoizedState, e, t)
        },
        useTransition: function() {
            var e = si(tl)[0],
                t = ke().memoizedState;
            return [typeof e == "boolean" ? e : mn(e), t]
        },
        useSyncExternalStore: Wo,
        useId: Nr,
        useHostTransitionStatus: mi,
        useFormState: fr,
        useActionState: fr,
        useOptimistic: function(e, t) {
            var l = ke();
            return He !== null ? lr(l, He, e, t) : (l.baseState = e, [e, l.queue.dispatch])
        },
        useMemoCache: ni,
        useCacheRefresh: Ar
    };
    Dr.useEffectEvent = hr;

    function yi(e, t, l, a) {
        t = e.memoizedState, l = l(a, t), l = l == null ? t : _({}, t, l), e.memoizedState = l, e.lanes === 0 && (e.updateQueue.baseState = l)
    }
    var pi = {
        enqueueSetState: function(e, t, l) {
            e = e._reactInternals;
            var a = Nt(),
                n = bl(a);
            n.payload = t, l != null && (n.callback = l), t = xl(e, n, a), t !== null && (yt(t, e, a), on(t, e, a))
        },
        enqueueReplaceState: function(e, t, l) {
            e = e._reactInternals;
            var a = Nt(),
                n = bl(a);
            n.tag = 1, n.payload = t, l != null && (n.callback = l), t = xl(e, n, a), t !== null && (yt(t, e, a), on(t, e, a))
        },
        enqueueForceUpdate: function(e, t) {
            e = e._reactInternals;
            var l = Nt(),
                a = bl(l);
            a.tag = 2, t != null && (a.callback = t), t = xl(e, a, l), t !== null && (yt(t, e, l), on(t, e, l))
        }
    };

    function Or(e, t, l, a, n, u, s) {
        return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(a, u, s) : t.prototype && t.prototype.isPureReactComponent ? !en(l, a) || !en(n, u) : !0
    }

    function zr(e, t, l, a) {
        e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(l, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(l, a), t.state !== e && pi.enqueueReplaceState(t, t.state, null)
    }

    function Pl(e, t) {
        var l = t;
        if ("ref" in t) {
            l = {};
            for (var a in t) a !== "ref" && (l[a] = t[a])
        }
        if (e = e.defaultProps) {
            l === t && (l = _({}, l));
            for (var n in e) l[n] === void 0 && (l[n] = e[n])
        }
        return l
    }

    function Hr(e) {
        Pn(e)
    }

    function _r(e) {
        console.error(e)
    }

    function Rr(e) {
        Pn(e)
    }

    function Eu(e, t) {
        try {
            var l = e.onUncaughtError;
            l(t.value, {
                componentStack: t.stack
            })
        } catch (a) {
            setTimeout(function() {
                throw a
            })
        }
    }

    function Ur(e, t, l) {
        try {
            var a = e.onCaughtError;
            a(l.value, {
                componentStack: l.stack,
                errorBoundary: t.tag === 1 ? t.stateNode : null
            })
        } catch (n) {
            setTimeout(function() {
                throw n
            })
        }
    }

    function vi(e, t, l) {
        return l = bl(l), l.tag = 3, l.payload = {
            element: null
        }, l.callback = function() {
            Eu(e, t)
        }, l
    }

    function Lr(e) {
        return e = bl(e), e.tag = 3, e
    }

    function Gr(e, t, l, a) {
        var n = l.type.getDerivedStateFromError;
        if (typeof n == "function") {
            var u = a.value;
            e.payload = function() {
                return n(u)
            }, e.callback = function() {
                Ur(t, l, a)
            }
        }
        var s = l.stateNode;
        s !== null && typeof s.componentDidCatch == "function" && (e.callback = function() {
            Ur(t, l, a), typeof n != "function" && (Tl === null ? Tl = new Set([this]) : Tl.add(this));
            var c = a.stack;
            this.componentDidCatch(a.value, {
                componentStack: c !== null ? c : ""
            })
        })
    }

    function h0(e, t, l, a, n) {
        if (l.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
            if (t = l.alternate, t !== null && ba(t, l, n, !0), l = xt.current, l !== null) {
                switch (l.tag) {
                    case 31:
                    case 13:
                        return Rt === null ? Hu() : l.alternate === null && Qe === 0 && (Qe = 3), l.flags &= -257, l.flags |= 65536, l.lanes = n, a === ou ? l.flags |= 16384 : (t = l.updateQueue, t === null ? l.updateQueue = new Set([a]) : t.add(a), Qi(e, a, n)), !1;
                    case 22:
                        return l.flags |= 65536, a === ou ? l.flags |= 16384 : (t = l.updateQueue, t === null ? (t = {
                            transitions: null,
                            markerInstances: null,
                            retryQueue: new Set([a])
                        }, l.updateQueue = t) : (l = t.retryQueue, l === null ? t.retryQueue = new Set([a]) : l.add(a)), Qi(e, a, n)), !1
                }
                throw Error(r(435, l.tag))
            }
            return Qi(e, a, n), Hu(), !1
        }
        if (xe) return t = xt.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = n, a !== Us && (e = Error(r(422), {
            cause: a
        }), an(Ot(e, l)))) : (a !== Us && (t = Error(r(423), {
            cause: a
        }), an(Ot(t, l))), e = e.current.alternate, e.flags |= 65536, n &= -n, e.lanes |= n, a = Ot(a, l), n = vi(e.stateNode, a, n), Js(e, n), Qe !== 4 && (Qe = 2)), !1;
        var u = Error(r(520), {
            cause: a
        });
        if (u = Ot(u, l), Mn === null ? Mn = [u] : Mn.push(u), Qe !== 4 && (Qe = 2), t === null) return !0;
        a = Ot(a, l), l = t;
        do {
            switch (l.tag) {
                case 3:
                    return l.flags |= 65536, e = n & -n, l.lanes |= e, e = vi(l.stateNode, a, e), Js(l, e), !1;
                case 1:
                    if (t = l.type, u = l.stateNode, (l.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || u !== null && typeof u.componentDidCatch == "function" && (Tl === null || !Tl.has(u)))) return l.flags |= 65536, n &= -n, l.lanes |= n, n = Lr(n), Gr(n, e, l, a), Js(l, n), !1
            }
            l = l.return
        } while (l !== null);
        return !1
    }
    var Si = Error(r(461)),
        Je = !1;

    function at(e, t, l, a) {
        t.child = e === null ? Qo(t, null, l, a) : Fl(t, e.child, l, a)
    }

    function qr(e, t, l, a, n) {
        l = l.render;
        var u = t.ref;
        if ("ref" in a) {
            var s = {};
            for (var c in a) c !== "ref" && (s[c] = a[c])
        } else s = a;
        return Kl(t), a = ei(e, t, l, s, u, n), c = ti(), e !== null && !Je ? (li(e, t, n), ll(e, t, n)) : (xe && c && _s(t), t.flags |= 1, at(e, t, a, n), t.child)
    }

    function wr(e, t, l, a, n) {
        if (e === null) {
            var u = l.type;
            return typeof u == "function" && !Os(u) && u.defaultProps === void 0 && l.compare === null ? (t.tag = 15, t.type = u, Yr(e, t, u, a, n)) : (e = au(l.type, null, a, t, t.mode, n), e.ref = t.ref, e.return = t, t.child = e)
        }
        if (u = e.child, !Ti(e, n)) {
            var s = u.memoizedProps;
            if (l = l.compare, l = l !== null ? l : en, l(s, a) && e.ref === t.ref) return ll(e, t, n)
        }
        return t.flags |= 1, e = Wt(u, a), e.ref = t.ref, e.return = t, t.child = e
    }

    function Yr(e, t, l, a, n) {
        if (e !== null) {
            var u = e.memoizedProps;
            if (en(u, a) && e.ref === t.ref)
                if (Je = !1, t.pendingProps = a = u, Ti(e, n))(e.flags & 131072) !== 0 && (Je = !0);
                else return t.lanes = e.lanes, ll(e, t, n)
        }
        return bi(e, t, l, a, n)
    }

    function Qr(e, t, l, a) {
        var n = a.children,
            u = e !== null ? e.memoizedState : null;
        if (e === null && t.stateNode === null && (t.stateNode = {
                _visibility: 1,
                _pendingMarkers: null,
                _retryCache: null,
                _transitions: null
            }), a.mode === "hidden") {
            if ((t.flags & 128) !== 0) {
                if (u = u !== null ? u.baseLanes | l : l, e !== null) {
                    for (a = t.child = e.child, n = 0; a !== null;) n = n | a.lanes | a.childLanes, a = a.sibling;
                    a = n & ~u
                } else a = 0, t.child = null;
                return Xr(e, t, u, l, a)
            }
            if ((l & 536870912) !== 0) t.memoizedState = {
                baseLanes: 0,
                cachePool: null
            }, e !== null && iu(t, u !== null ? u.cachePool : null), u !== null ? Zo(t, u) : Ws(), Ko(t);
            else return a = t.lanes = 536870912, Xr(e, t, u !== null ? u.baseLanes | l : l, l, a)
        } else u !== null ? (iu(t, u.cachePool), Zo(t, u), Ml(), t.memoizedState = null) : (e !== null && iu(t, null), Ws(), Ml());
        return at(e, t, n, l), t.child
    }

    function yn(e, t) {
        return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
            _visibility: 1,
            _pendingMarkers: null,
            _retryCache: null,
            _transitions: null
        }), t.sibling
    }

    function Xr(e, t, l, a, n) {
        var u = Xs();
        return u = u === null ? null : {
            parent: Ze._currentValue,
            pool: u
        }, t.memoizedState = {
            baseLanes: l,
            cachePool: u
        }, e !== null && iu(t, null), Ws(), Ko(t), e !== null && ba(e, t, a, !0), t.childLanes = n, null
    }

    function Mu(e, t) {
        return t = Nu({
            mode: t.mode,
            children: t.children
        }, e.mode), t.ref = e.ref, e.child = t, t.return = e, t
    }

    function kr(e, t, l) {
        return Fl(t, e.child, null, l), e = Mu(t, t.pendingProps), e.flags |= 2, Et(t), t.memoizedState = null, e
    }

    function g0(e, t, l) {
        var a = t.pendingProps,
            n = (t.flags & 128) !== 0;
        if (t.flags &= -129, e === null) {
            if (xe) {
                if (a.mode === "hidden") return e = Mu(t, a), t.lanes = 536870912, yn(null, e);
                if ($s(t), (e = Le) ? (e = nd(e, _t), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
                        dehydrated: e,
                        treeContext: gl !== null ? {
                            id: Qt,
                            overflow: Xt
                        } : null,
                        retryLane: 536870912,
                        hydrationErrors: null
                    }, l = Co(e), l.return = t, t.child = l, tt = t, Le = null)) : e = null, e === null) throw pl(t);
                return t.lanes = 536870912, null
            }
            return Mu(t, a)
        }
        var u = e.memoizedState;
        if (u !== null) {
            var s = u.dehydrated;
            if ($s(t), n)
                if (t.flags & 256) t.flags &= -257, t = kr(e, t, l);
                else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
            else throw Error(r(558));
            else if (Je || ba(e, t, l, !1), n = (l & e.childLanes) !== 0, Je || n) {
                if (a = Ue, a !== null && (s = Hc(a, l), s !== 0 && s !== u.retryLane)) throw u.retryLane = s, Ql(e, s), yt(a, e, s), Si;
                Hu(), t = kr(e, t, l)
            } else e = u.treeContext, Le = Ut(s.nextSibling), tt = t, xe = !0, yl = null, _t = !1, e !== null && Do(t, e), t = Mu(t, a), t.flags |= 4096;
            return t
        }
        return e = Wt(e.child, {
            mode: a.mode,
            children: a.children
        }), e.ref = t.ref, t.child = e, e.return = t, e
    }

    function Bu(e, t) {
        var l = t.ref;
        if (l === null) e !== null && e.ref !== null && (t.flags |= 4194816);
        else {
            if (typeof l != "function" && typeof l != "object") throw Error(r(284));
            (e === null || e.ref !== l) && (t.flags |= 4194816)
        }
    }

    function bi(e, t, l, a, n) {
        return Kl(t), l = ei(e, t, l, a, void 0, n), a = ti(), e !== null && !Je ? (li(e, t, n), ll(e, t, n)) : (xe && a && _s(t), t.flags |= 1, at(e, t, l, n), t.child)
    }

    function Zr(e, t, l, a, n, u) {
        return Kl(t), t.updateQueue = null, l = Io(t, a, l, n), Jo(e), a = ti(), e !== null && !Je ? (li(e, t, u), ll(e, t, u)) : (xe && a && _s(t), t.flags |= 1, at(e, t, l, u), t.child)
    }

    function Kr(e, t, l, a, n) {
        if (Kl(t), t.stateNode === null) {
            var u = ya,
                s = l.contextType;
            typeof s == "object" && s !== null && (u = lt(s)), u = new l(a, u), t.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, u.updater = pi, t.stateNode = u, u._reactInternals = t, u = t.stateNode, u.props = a, u.state = t.memoizedState, u.refs = {}, Zs(t), s = l.contextType, u.context = typeof s == "object" && s !== null ? lt(s) : ya, u.state = t.memoizedState, s = l.getDerivedStateFromProps, typeof s == "function" && (yi(t, l, s, a), u.state = t.memoizedState), typeof l.getDerivedStateFromProps == "function" || typeof u.getSnapshotBeforeUpdate == "function" || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (s = u.state, typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount(), s !== u.state && pi.enqueueReplaceState(u, u.state, null), fn(t, a, u, n), rn(), u.state = t.memoizedState), typeof u.componentDidMount == "function" && (t.flags |= 4194308), a = !0
        } else if (e === null) {
            u = t.stateNode;
            var c = t.memoizedProps,
                f = Pl(l, c);
            u.props = f;
            var S = u.context,
                A = l.contextType;
            s = ya, typeof A == "object" && A !== null && (s = lt(A));
            var V = l.getDerivedStateFromProps;
            A = typeof V == "function" || typeof u.getSnapshotBeforeUpdate == "function", c = t.pendingProps !== c, A || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (c || S !== s) && zr(t, u, a, s), Sl = !1;
            var x = t.memoizedState;
            u.state = x, fn(t, a, u, n), rn(), S = t.memoizedState, c || x !== S || Sl ? (typeof V == "function" && (yi(t, l, V, a), S = t.memoizedState), (f = Sl || Or(t, l, f, a, x, S, s)) ? (A || typeof u.UNSAFE_componentWillMount != "function" && typeof u.componentWillMount != "function" || (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = a, t.memoizedState = S), u.props = a, u.state = S, u.context = s, a = f) : (typeof u.componentDidMount == "function" && (t.flags |= 4194308), a = !1)
        } else {
            u = t.stateNode, Ks(e, t), s = t.memoizedProps, A = Pl(l, s), u.props = A, V = t.pendingProps, x = u.context, S = l.contextType, f = ya, typeof S == "object" && S !== null && (f = lt(S)), c = l.getDerivedStateFromProps, (S = typeof c == "function" || typeof u.getSnapshotBeforeUpdate == "function") || typeof u.UNSAFE_componentWillReceiveProps != "function" && typeof u.componentWillReceiveProps != "function" || (s !== V || x !== f) && zr(t, u, a, f), Sl = !1, x = t.memoizedState, u.state = x, fn(t, a, u, n), rn();
            var B = t.memoizedState;
            s !== V || x !== B || Sl || e !== null && e.dependencies !== null && uu(e.dependencies) ? (typeof c == "function" && (yi(t, l, c, a), B = t.memoizedState), (A = Sl || Or(t, l, A, a, x, B, f) || e !== null && e.dependencies !== null && uu(e.dependencies)) ? (S || typeof u.UNSAFE_componentWillUpdate != "function" && typeof u.componentWillUpdate != "function" || (typeof u.componentWillUpdate == "function" && u.componentWillUpdate(a, B, f), typeof u.UNSAFE_componentWillUpdate == "function" && u.UNSAFE_componentWillUpdate(a, B, f)), typeof u.componentDidUpdate == "function" && (t.flags |= 4), typeof u.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof u.componentDidUpdate != "function" || s === e.memoizedProps && x === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && x === e.memoizedState || (t.flags |= 1024), t.memoizedProps = a, t.memoizedState = B), u.props = a, u.state = B, u.context = f, a = A) : (typeof u.componentDidUpdate != "function" || s === e.memoizedProps && x === e.memoizedState || (t.flags |= 4), typeof u.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && x === e.memoizedState || (t.flags |= 1024), a = !1)
        }
        return u = a, Bu(e, t), a = (t.flags & 128) !== 0, u || a ? (u = t.stateNode, l = a && typeof l.getDerivedStateFromError != "function" ? null : u.render(), t.flags |= 1, e !== null && a ? (t.child = Fl(t, e.child, null, n), t.child = Fl(t, null, l, n)) : at(e, t, l, n), t.memoizedState = u.state, e = t.child) : e = ll(e, t, n), e
    }

    function Jr(e, t, l, a) {
        return kl(), t.flags |= 256, at(e, t, l, a), t.child
    }
    var xi = {
        dehydrated: null,
        treeContext: null,
        retryLane: 0,
        hydrationErrors: null
    };

    function Ei(e) {
        return {
            baseLanes: e,
            cachePool: Uo()
        }
    }

    function Mi(e, t, l) {
        return e = e !== null ? e.childLanes & ~l : 0, t && (e |= Bt), e
    }

    function Ir(e, t, l) {
        var a = t.pendingProps,
            n = !1,
            u = (t.flags & 128) !== 0,
            s;
        if ((s = u) || (s = e !== null && e.memoizedState === null ? !1 : (Xe.current & 2) !== 0), s && (n = !0, t.flags &= -129), s = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
            if (xe) {
                if (n ? El(t) : Ml(), (e = Le) ? (e = nd(e, _t), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
                        dehydrated: e,
                        treeContext: gl !== null ? {
                            id: Qt,
                            overflow: Xt
                        } : null,
                        retryLane: 536870912,
                        hydrationErrors: null
                    }, l = Co(e), l.return = t, t.child = l, tt = t, Le = null)) : e = null, e === null) throw pl(t);
                return uc(e) ? t.lanes = 32 : t.lanes = 536870912, null
            }
            var c = a.children;
            return a = a.fallback, n ? (Ml(), n = t.mode, c = Nu({
                mode: "hidden",
                children: c
            }, n), a = Xl(a, n, l, null), c.return = t, a.return = t, c.sibling = a, t.child = c, a = t.child, a.memoizedState = Ei(l), a.childLanes = Mi(e, s, l), t.memoizedState = xi, yn(null, a)) : (El(t), Bi(t, c))
        }
        var f = e.memoizedState;
        if (f !== null && (c = f.dehydrated, c !== null)) {
            if (u) t.flags & 256 ? (El(t), t.flags &= -257, t = Ni(e, t, l)) : t.memoizedState !== null ? (Ml(), t.child = e.child, t.flags |= 128, t = null) : (Ml(), c = a.fallback, n = t.mode, a = Nu({
                mode: "visible",
                children: a.children
            }, n), c = Xl(c, n, l, null), c.flags |= 2, a.return = t, c.return = t, a.sibling = c, t.child = a, Fl(t, e.child, null, l), a = t.child, a.memoizedState = Ei(l), a.childLanes = Mi(e, s, l), t.memoizedState = xi, t = yn(null, a));
            else if (El(t), uc(c)) {
                if (s = c.nextSibling && c.nextSibling.dataset, s) var S = s.dgst;
                s = S, a = Error(r(419)), a.stack = "", a.digest = s, an({
                    value: a,
                    source: null,
                    stack: null
                }), t = Ni(e, t, l)
            } else if (Je || ba(e, t, l, !1), s = (l & e.childLanes) !== 0, Je || s) {
                if (s = Ue, s !== null && (a = Hc(s, l), a !== 0 && a !== f.retryLane)) throw f.retryLane = a, Ql(e, a), yt(s, e, a), Si;
                nc(c) || Hu(), t = Ni(e, t, l)
            } else nc(c) ? (t.flags |= 192, t.child = e.child, t = null) : (e = f.treeContext, Le = Ut(c.nextSibling), tt = t, xe = !0, yl = null, _t = !1, e !== null && Do(t, e), t = Bi(t, a.children), t.flags |= 4096);
            return t
        }
        return n ? (Ml(), c = a.fallback, n = t.mode, f = e.child, S = f.sibling, a = Wt(f, {
            mode: "hidden",
            children: a.children
        }), a.subtreeFlags = f.subtreeFlags & 65011712, S !== null ? c = Wt(S, c) : (c = Xl(c, n, l, null), c.flags |= 2), c.return = t, a.return = t, a.sibling = c, t.child = a, yn(null, a), a = t.child, c = e.child.memoizedState, c === null ? c = Ei(l) : (n = c.cachePool, n !== null ? (f = Ze._currentValue, n = n.parent !== f ? {
            parent: f,
            pool: f
        } : n) : n = Uo(), c = {
            baseLanes: c.baseLanes | l,
            cachePool: n
        }), a.memoizedState = c, a.childLanes = Mi(e, s, l), t.memoizedState = xi, yn(e.child, a)) : (El(t), l = e.child, e = l.sibling, l = Wt(l, {
            mode: "visible",
            children: a.children
        }), l.return = t, l.sibling = null, e !== null && (s = t.deletions, s === null ? (t.deletions = [e], t.flags |= 16) : s.push(e)), t.child = l, t.memoizedState = null, l)
    }

    function Bi(e, t) {
        return t = Nu({
            mode: "visible",
            children: t
        }, e.mode), t.return = e, e.child = t
    }

    function Nu(e, t) {
        return e = bt(22, e, null, t), e.lanes = 0, e
    }

    function Ni(e, t, l) {
        return Fl(t, e.child, null, l), e = Bi(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e
    }

    function Wr(e, t, l) {
        e.lanes |= t;
        var a = e.alternate;
        a !== null && (a.lanes |= t), qs(e.return, t, l)
    }

    function Ai(e, t, l, a, n, u) {
        var s = e.memoizedState;
        s === null ? e.memoizedState = {
            isBackwards: t,
            rendering: null,
            renderingStartTime: 0,
            last: a,
            tail: l,
            tailMode: n,
            treeForkCount: u
        } : (s.isBackwards = t, s.rendering = null, s.renderingStartTime = 0, s.last = a, s.tail = l, s.tailMode = n, s.treeForkCount = u)
    }

    function Fr(e, t, l) {
        var a = t.pendingProps,
            n = a.revealOrder,
            u = a.tail;
        a = a.children;
        var s = Xe.current,
            c = (s & 2) !== 0;
        if (c ? (s = s & 1 | 2, t.flags |= 128) : s &= 1, Q(Xe, s), at(e, t, a, l), a = xe ? ln : 0, !c && e !== null && (e.flags & 128) !== 0) e: for (e = t.child; e !== null;) {
            if (e.tag === 13) e.memoizedState !== null && Wr(e, l, t);
            else if (e.tag === 19) Wr(e, l, t);
            else if (e.child !== null) {
                e.child.return = e, e = e.child;
                continue
            }
            if (e === t) break e;
            for (; e.sibling === null;) {
                if (e.return === null || e.return === t) break e;
                e = e.return
            }
            e.sibling.return = e.return, e = e.sibling
        }
        switch (n) {
            case "forwards":
                for (l = t.child, n = null; l !== null;) e = l.alternate, e !== null && mu(e) === null && (n = l), l = l.sibling;
                l = n, l === null ? (n = t.child, t.child = null) : (n = l.sibling, l.sibling = null), Ai(t, !1, n, l, u, a);
                break;
            case "backwards":
            case "unstable_legacy-backwards":
                for (l = null, n = t.child, t.child = null; n !== null;) {
                    if (e = n.alternate, e !== null && mu(e) === null) {
                        t.child = n;
                        break
                    }
                    e = n.sibling, n.sibling = l, l = n, n = e
                }
                Ai(t, !0, l, null, u, a);
                break;
            case "together":
                Ai(t, !1, null, null, void 0, a);
                break;
            default:
                t.memoizedState = null
        }
        return t.child
    }

    function ll(e, t, l) {
        if (e !== null && (t.dependencies = e.dependencies), Al |= t.lanes, (l & t.childLanes) === 0)
            if (e !== null) {
                if (ba(e, t, l, !1), (l & t.childLanes) === 0) return null
            } else return null;
        if (e !== null && t.child !== e.child) throw Error(r(153));
        if (t.child !== null) {
            for (e = t.child, l = Wt(e, e.pendingProps), t.child = l, l.return = t; e.sibling !== null;) e = e.sibling, l = l.sibling = Wt(e, e.pendingProps), l.return = t;
            l.sibling = null
        }
        return t.child
    }

    function Ti(e, t) {
        return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && uu(e)))
    }

    function y0(e, t, l) {
        switch (t.tag) {
            case 3:
                Pe(t, t.stateNode.containerInfo), vl(t, Ze, e.memoizedState.cache), kl();
                break;
            case 27:
            case 5:
                Ul(t);
                break;
            case 4:
                Pe(t, t.stateNode.containerInfo);
                break;
            case 10:
                vl(t, t.type, t.memoizedProps.value);
                break;
            case 31:
                if (t.memoizedState !== null) return t.flags |= 128, $s(t), null;
                break;
            case 13:
                var a = t.memoizedState;
                if (a !== null) return a.dehydrated !== null ? (El(t), t.flags |= 128, null) : (l & t.child.childLanes) !== 0 ? Ir(e, t, l) : (El(t), e = ll(e, t, l), e !== null ? e.sibling : null);
                El(t);
                break;
            case 19:
                var n = (e.flags & 128) !== 0;
                if (a = (l & t.childLanes) !== 0, a || (ba(e, t, l, !1), a = (l & t.childLanes) !== 0), n) {
                    if (a) return Fr(e, t, l);
                    t.flags |= 128
                }
                if (n = t.memoizedState, n !== null && (n.rendering = null, n.tail = null, n.lastEffect = null), Q(Xe, Xe.current), a) break;
                return null;
            case 22:
                return t.lanes = 0, Qr(e, t, l, t.pendingProps);
            case 24:
                vl(t, Ze, e.memoizedState.cache)
        }
        return ll(e, t, l)
    }

    function $r(e, t, l) {
        if (e !== null)
            if (e.memoizedProps !== t.pendingProps) Je = !0;
            else {
                if (!Ti(e, l) && (t.flags & 128) === 0) return Je = !1, y0(e, t, l);
                Je = (e.flags & 131072) !== 0
            }
        else Je = !1, xe && (t.flags & 1048576) !== 0 && jo(t, ln, t.index);
        switch (t.lanes = 0, t.tag) {
            case 16:
                e: {
                    var a = t.pendingProps;
                    if (e = Il(t.elementType), t.type = e, typeof e == "function") Os(e) ? (a = Pl(e, a), t.tag = 1, t = Kr(null, t, e, a, l)) : (t.tag = 0, t = bi(null, t, e, a, l));
                    else {
                        if (e != null) {
                            var n = e.$$typeof;
                            if (n === X) {
                                t.tag = 11, t = qr(null, t, e, a, l);
                                break e
                            } else if (n === G) {
                                t.tag = 14, t = wr(null, t, e, a, l);
                                break e
                            }
                        }
                        throw t = re(e) || e, Error(r(306, t, ""))
                    }
                }
                return t;
            case 0:
                return bi(e, t, t.type, t.pendingProps, l);
            case 1:
                return a = t.type, n = Pl(a, t.pendingProps), Kr(e, t, a, n, l);
            case 3:
                e: {
                    if (Pe(t, t.stateNode.containerInfo), e === null) throw Error(r(387));a = t.pendingProps;
                    var u = t.memoizedState;n = u.element,
                    Ks(e, t),
                    fn(t, a, null, l);
                    var s = t.memoizedState;
                    if (a = s.cache, vl(t, Ze, a), a !== u.cache && ws(t, [Ze], l, !0), rn(), a = s.element, u.isDehydrated)
                        if (u = {
                                element: a,
                                isDehydrated: !1,
                                cache: s.cache
                            }, t.updateQueue.baseState = u, t.memoizedState = u, t.flags & 256) {
                            t = Jr(e, t, a, l);
                            break e
                        } else if (a !== n) {
                        n = Ot(Error(r(424)), t), an(n), t = Jr(e, t, a, l);
                        break e
                    } else {
                        switch (e = t.stateNode.containerInfo, e.nodeType) {
                            case 9:
                                e = e.body;
                                break;
                            default:
                                e = e.nodeName === "HTML" ? e.ownerDocument.body : e
                        }
                        for (Le = Ut(e.firstChild), tt = t, xe = !0, yl = null, _t = !0, l = Qo(t, null, a, l), t.child = l; l;) l.flags = l.flags & -3 | 4096, l = l.sibling
                    } else {
                        if (kl(), a === n) {
                            t = ll(e, t, l);
                            break e
                        }
                        at(e, t, a, l)
                    }
                    t = t.child
                }
                return t;
            case 26:
                return Bu(e, t), e === null ? (l = rd(t.type, null, t.pendingProps, null)) ? t.memoizedState = l : xe || (l = t.type, e = t.pendingProps, a = wu(ye.current).createElement(l), a[et] = t, a[rt] = e, nt(a, l, e), Fe(a), t.stateNode = a) : t.memoizedState = rd(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
            case 27:
                return Ul(t), e === null && xe && (a = t.stateNode = id(t.type, t.pendingProps, ye.current), tt = t, _t = !0, n = Le, Dl(t.type) ? (sc = n, Le = Ut(a.firstChild)) : Le = n), at(e, t, t.pendingProps.children, l), Bu(e, t), e === null && (t.flags |= 4194304), t.child;
            case 5:
                return e === null && xe && ((n = a = Le) && (a = Z0(a, t.type, t.pendingProps, _t), a !== null ? (t.stateNode = a, tt = t, Le = Ut(a.firstChild), _t = !1, n = !0) : n = !1), n || pl(t)), Ul(t), n = t.type, u = t.pendingProps, s = e !== null ? e.memoizedProps : null, a = u.children, tc(n, u) ? a = null : s !== null && tc(n, s) && (t.flags |= 32), t.memoizedState !== null && (n = ei(e, t, i0, null, null, l), Dn._currentValue = n), Bu(e, t), at(e, t, a, l), t.child;
            case 6:
                return e === null && xe && ((e = l = Le) && (l = K0(l, t.pendingProps, _t), l !== null ? (t.stateNode = l, tt = t, Le = null, e = !0) : e = !1), e || pl(t)), null;
            case 13:
                return Ir(e, t, l);
            case 4:
                return Pe(t, t.stateNode.containerInfo), a = t.pendingProps, e === null ? t.child = Fl(t, null, a, l) : at(e, t, a, l), t.child;
            case 11:
                return qr(e, t, t.type, t.pendingProps, l);
            case 7:
                return at(e, t, t.pendingProps, l), t.child;
            case 8:
                return at(e, t, t.pendingProps.children, l), t.child;
            case 12:
                return at(e, t, t.pendingProps.children, l), t.child;
            case 10:
                return a = t.pendingProps, vl(t, t.type, a.value), at(e, t, a.children, l), t.child;
            case 9:
                return n = t.type._context, a = t.pendingProps.children, Kl(t), n = lt(n), a = a(n), t.flags |= 1, at(e, t, a, l), t.child;
            case 14:
                return wr(e, t, t.type, t.pendingProps, l);
            case 15:
                return Yr(e, t, t.type, t.pendingProps, l);
            case 19:
                return Fr(e, t, l);
            case 31:
                return g0(e, t, l);
            case 22:
                return Qr(e, t, l, t.pendingProps);
            case 24:
                return Kl(t), a = lt(Ze), e === null ? (n = Xs(), n === null && (n = Ue, u = Ys(), n.pooledCache = u, u.refCount++, u !== null && (n.pooledCacheLanes |= l), n = u), t.memoizedState = {
                    parent: a,
                    cache: n
                }, Zs(t), vl(t, Ze, n)) : ((e.lanes & l) !== 0 && (Ks(e, t), fn(t, null, null, l), rn()), n = e.memoizedState, u = t.memoizedState, n.parent !== a ? (n = {
                    parent: a,
                    cache: a
                }, t.memoizedState = n, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = n), vl(t, Ze, a)) : (a = u.cache, vl(t, Ze, a), a !== n.cache && ws(t, [Ze], l, !0))), at(e, t, t.pendingProps.children, l), t.child;
            case 29:
                throw t.pendingProps
        }
        throw Error(r(156, t.tag))
    }

    function al(e) {
        e.flags |= 4
    }

    function Ci(e, t, l, a, n) {
        if ((t = (e.mode & 32) !== 0) && (t = !1), t) {
            if (e.flags |= 16777216, (n & 335544128) === n)
                if (e.stateNode.complete) e.flags |= 8192;
                else if (Af()) e.flags |= 8192;
            else throw Wl = ou, ks
        } else e.flags &= -16777217
    }

    function Pr(e, t) {
        if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0) e.flags &= -16777217;
        else if (e.flags |= 16777216, !gd(t))
            if (Af()) e.flags |= 8192;
            else throw Wl = ou, ks
    }

    function Au(e, t) {
        t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? Dc() : 536870912, e.lanes |= t, Oa |= t)
    }

    function pn(e, t) {
        if (!xe) switch (e.tailMode) {
            case "hidden":
                t = e.tail;
                for (var l = null; t !== null;) t.alternate !== null && (l = t), t = t.sibling;
                l === null ? e.tail = null : l.sibling = null;
                break;
            case "collapsed":
                l = e.tail;
                for (var a = null; l !== null;) l.alternate !== null && (a = l), l = l.sibling;
                a === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : a.sibling = null
        }
    }

    function Ge(e) {
        var t = e.alternate !== null && e.alternate.child === e.child,
            l = 0,
            a = 0;
        if (t)
            for (var n = e.child; n !== null;) l |= n.lanes | n.childLanes, a |= n.subtreeFlags & 65011712, a |= n.flags & 65011712, n.return = e, n = n.sibling;
        else
            for (n = e.child; n !== null;) l |= n.lanes | n.childLanes, a |= n.subtreeFlags, a |= n.flags, n.return = e, n = n.sibling;
        return e.subtreeFlags |= a, e.childLanes = l, t
    }

    function p0(e, t, l) {
        var a = t.pendingProps;
        switch (Rs(t), t.tag) {
            case 16:
            case 15:
            case 0:
            case 11:
            case 7:
            case 8:
            case 12:
            case 9:
            case 14:
                return Ge(t), null;
            case 1:
                return Ge(t), null;
            case 3:
                return l = t.stateNode, a = null, e !== null && (a = e.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), Pt(Ze), qe(), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (e === null || e.child === null) && (Sa(t) ? al(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, Ls())), Ge(t), null;
            case 26:
                var n = t.type,
                    u = t.memoizedState;
                return e === null ? (al(t), u !== null ? (Ge(t), Pr(t, u)) : (Ge(t), Ci(t, n, null, a, l))) : u ? u !== e.memoizedState ? (al(t), Ge(t), Pr(t, u)) : (Ge(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== a && al(t), Ge(t), Ci(t, n, e, a, l)), null;
            case 27:
                if (la(t), l = ye.current, n = t.type, e !== null && t.stateNode != null) e.memoizedProps !== a && al(t);
                else {
                    if (!a) {
                        if (t.stateNode === null) throw Error(r(166));
                        return Ge(t), null
                    }
                    e = Z.current, Sa(t) ? Oo(t) : (e = id(n, a, l), t.stateNode = e, al(t))
                }
                return Ge(t), null;
            case 5:
                if (la(t), n = t.type, e !== null && t.stateNode != null) e.memoizedProps !== a && al(t);
                else {
                    if (!a) {
                        if (t.stateNode === null) throw Error(r(166));
                        return Ge(t), null
                    }
                    if (u = Z.current, Sa(t)) Oo(t);
                    else {
                        var s = wu(ye.current);
                        switch (u) {
                            case 1:
                                u = s.createElementNS("http://www.w3.org/2000/svg", n);
                                break;
                            case 2:
                                u = s.createElementNS("http://www.w3.org/1998/Math/MathML", n);
                                break;
                            default:
                                switch (n) {
                                    case "svg":
                                        u = s.createElementNS("http://www.w3.org/2000/svg", n);
                                        break;
                                    case "math":
                                        u = s.createElementNS("http://www.w3.org/1998/Math/MathML", n);
                                        break;
                                    case "script":
                                        u = s.createElement("div"), u.innerHTML = "<script><\/script>", u = u.removeChild(u.firstChild);
                                        break;
                                    case "select":
                                        u = typeof a.is == "string" ? s.createElement("select", {
                                            is: a.is
                                        }) : s.createElement("select"), a.multiple ? u.multiple = !0 : a.size && (u.size = a.size);
                                        break;
                                    default:
                                        u = typeof a.is == "string" ? s.createElement(n, {
                                            is: a.is
                                        }) : s.createElement(n)
                                }
                        }
                        u[et] = t, u[rt] = a;
                        e: for (s = t.child; s !== null;) {
                            if (s.tag === 5 || s.tag === 6) u.appendChild(s.stateNode);
                            else if (s.tag !== 4 && s.tag !== 27 && s.child !== null) {
                                s.child.return = s, s = s.child;
                                continue
                            }
                            if (s === t) break e;
                            for (; s.sibling === null;) {
                                if (s.return === null || s.return === t) break e;
                                s = s.return
                            }
                            s.sibling.return = s.return, s = s.sibling
                        }
                        t.stateNode = u;
                        e: switch (nt(u, n, a), n) {
                            case "button":
                            case "input":
                            case "select":
                            case "textarea":
                                a = !!a.autoFocus;
                                break e;
                            case "img":
                                a = !0;
                                break e;
                            default:
                                a = !1
                        }
                        a && al(t)
                    }
                }
                return Ge(t), Ci(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, l), null;
            case 6:
                if (e && t.stateNode != null) e.memoizedProps !== a && al(t);
                else {
                    if (typeof a != "string" && t.stateNode === null) throw Error(r(166));
                    if (e = ye.current, Sa(t)) {
                        if (e = t.stateNode, l = t.memoizedProps, a = null, n = tt, n !== null) switch (n.tag) {
                            case 27:
                            case 5:
                                a = n.memoizedProps
                        }
                        e[et] = t, e = !!(e.nodeValue === l || a !== null && a.suppressHydrationWarning === !0 || Wf(e.nodeValue, l)), e || pl(t, !0)
                    } else e = wu(e).createTextNode(a), e[et] = t, t.stateNode = e
                }
                return Ge(t), null;
            case 31:
                if (l = t.memoizedState, e === null || e.memoizedState !== null) {
                    if (a = Sa(t), l !== null) {
                        if (e === null) {
                            if (!a) throw Error(r(318));
                            if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(r(557));
                            e[et] = t
                        } else kl(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
                        Ge(t), e = !1
                    } else l = Ls(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = l), e = !0;
                    if (!e) return t.flags & 256 ? (Et(t), t) : (Et(t), null);
                    if ((t.flags & 128) !== 0) throw Error(r(558))
                }
                return Ge(t), null;
            case 13:
                if (a = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
                    if (n = Sa(t), a !== null && a.dehydrated !== null) {
                        if (e === null) {
                            if (!n) throw Error(r(318));
                            if (n = t.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(r(317));
                            n[et] = t
                        } else kl(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
                        Ge(t), n = !1
                    } else n = Ls(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), n = !0;
                    if (!n) return t.flags & 256 ? (Et(t), t) : (Et(t), null)
                }
                return Et(t), (t.flags & 128) !== 0 ? (t.lanes = l, t) : (l = a !== null, e = e !== null && e.memoizedState !== null, l && (a = t.child, n = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (n = a.alternate.memoizedState.cachePool.pool), u = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (u = a.memoizedState.cachePool.pool), u !== n && (a.flags |= 2048)), l !== e && l && (t.child.flags |= 8192), Au(t, t.updateQueue), Ge(t), null);
            case 4:
                return qe(), e === null && Wi(t.stateNode.containerInfo), Ge(t), null;
            case 10:
                return Pt(t.type), Ge(t), null;
            case 19:
                if (N(Xe), a = t.memoizedState, a === null) return Ge(t), null;
                if (n = (t.flags & 128) !== 0, u = a.rendering, u === null)
                    if (n) pn(a, !1);
                    else {
                        if (Qe !== 0 || e !== null && (e.flags & 128) !== 0)
                            for (e = t.child; e !== null;) {
                                if (u = mu(e), u !== null) {
                                    for (t.flags |= 128, pn(a, !1), e = u.updateQueue, t.updateQueue = e, Au(t, e), t.subtreeFlags = 0, e = l, l = t.child; l !== null;) To(l, e), l = l.sibling;
                                    return Q(Xe, Xe.current & 1 | 2), xe && Ft(t, a.treeForkCount), t.child
                                }
                                e = e.sibling
                            }
                        a.tail !== null && ut() > Du && (t.flags |= 128, n = !0, pn(a, !1), t.lanes = 4194304)
                    }
                else {
                    if (!n)
                        if (e = mu(u), e !== null) {
                            if (t.flags |= 128, n = !0, e = e.updateQueue, t.updateQueue = e, Au(t, e), pn(a, !0), a.tail === null && a.tailMode === "hidden" && !u.alternate && !xe) return Ge(t), null
                        } else 2 * ut() - a.renderingStartTime > Du && l !== 536870912 && (t.flags |= 128, n = !0, pn(a, !1), t.lanes = 4194304);
                    a.isBackwards ? (u.sibling = t.child, t.child = u) : (e = a.last, e !== null ? e.sibling = u : t.child = u, a.last = u)
                }
                return a.tail !== null ? (e = a.tail, a.rendering = e, a.tail = e.sibling, a.renderingStartTime = ut(), e.sibling = null, l = Xe.current, Q(Xe, n ? l & 1 | 2 : l & 1), xe && Ft(t, a.treeForkCount), e) : (Ge(t), null);
            case 22:
            case 23:
                return Et(t), Fs(), a = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== a && (t.flags |= 8192) : a && (t.flags |= 8192), a ? (l & 536870912) !== 0 && (t.flags & 128) === 0 && (Ge(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Ge(t), l = t.updateQueue, l !== null && Au(t, l.retryQueue), l = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), a = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), a !== l && (t.flags |= 2048), e !== null && N(Jl), null;
            case 24:
                return l = null, e !== null && (l = e.memoizedState.cache), t.memoizedState.cache !== l && (t.flags |= 2048), Pt(Ze), Ge(t), null;
            case 25:
                return null;
            case 30:
                return null
        }
        throw Error(r(156, t.tag))
    }

    function v0(e, t) {
        switch (Rs(t), t.tag) {
            case 1:
                return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
            case 3:
                return Pt(Ze), qe(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
            case 26:
            case 27:
            case 5:
                return la(t), null;
            case 31:
                if (t.memoizedState !== null) {
                    if (Et(t), t.alternate === null) throw Error(r(340));
                    kl()
                }
                return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
            case 13:
                if (Et(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
                    if (t.alternate === null) throw Error(r(340));
                    kl()
                }
                return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
            case 19:
                return N(Xe), null;
            case 4:
                return qe(), null;
            case 10:
                return Pt(t.type), null;
            case 22:
            case 23:
                return Et(t), Fs(), e !== null && N(Jl), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
            case 24:
                return Pt(Ze), null;
            case 25:
                return null;
            default:
                return null
        }
    }

    function ef(e, t) {
        switch (Rs(t), t.tag) {
            case 3:
                Pt(Ze), qe();
                break;
            case 26:
            case 27:
            case 5:
                la(t);
                break;
            case 4:
                qe();
                break;
            case 31:
                t.memoizedState !== null && Et(t);
                break;
            case 13:
                Et(t);
                break;
            case 19:
                N(Xe);
                break;
            case 10:
                Pt(t.type);
                break;
            case 22:
            case 23:
                Et(t), Fs(), e !== null && N(Jl);
                break;
            case 24:
                Pt(Ze)
        }
    }

    function vn(e, t) {
        try {
            var l = t.updateQueue,
                a = l !== null ? l.lastEffect : null;
            if (a !== null) {
                var n = a.next;
                l = n;
                do {
                    if ((l.tag & e) === e) {
                        a = void 0;
                        var u = l.create,
                            s = l.inst;
                        a = u(), s.destroy = a
                    }
                    l = l.next
                } while (l !== n)
            }
        } catch (c) {
            Oe(t, t.return, c)
        }
    }

    function Bl(e, t, l) {
        try {
            var a = t.updateQueue,
                n = a !== null ? a.lastEffect : null;
            if (n !== null) {
                var u = n.next;
                a = u;
                do {
                    if ((a.tag & e) === e) {
                        var s = a.inst,
                            c = s.destroy;
                        if (c !== void 0) {
                            s.destroy = void 0, n = t;
                            var f = l,
                                S = c;
                            try {
                                S()
                            } catch (A) {
                                Oe(n, f, A)
                            }
                        }
                    }
                    a = a.next
                } while (a !== u)
            }
        } catch (A) {
            Oe(t, t.return, A)
        }
    }

    function tf(e) {
        var t = e.updateQueue;
        if (t !== null) {
            var l = e.stateNode;
            try {
                ko(t, l)
            } catch (a) {
                Oe(e, e.return, a)
            }
        }
    }

    function lf(e, t, l) {
        l.props = Pl(e.type, e.memoizedProps), l.state = e.memoizedState;
        try {
            l.componentWillUnmount()
        } catch (a) {
            Oe(e, t, a)
        }
    }

    function Sn(e, t) {
        try {
            var l = e.ref;
            if (l !== null) {
                switch (e.tag) {
                    case 26:
                    case 27:
                    case 5:
                        var a = e.stateNode;
                        break;
                    case 30:
                        a = e.stateNode;
                        break;
                    default:
                        a = e.stateNode
                }
                typeof l == "function" ? e.refCleanup = l(a) : l.current = a
            }
        } catch (n) {
            Oe(e, t, n)
        }
    }

    function kt(e, t) {
        var l = e.ref,
            a = e.refCleanup;
        if (l !== null)
            if (typeof a == "function") try {
                a()
            } catch (n) {
                Oe(e, t, n)
            } finally {
                e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null)
            } else if (typeof l == "function") try {
                l(null)
            } catch (n) {
                Oe(e, t, n)
            } else l.current = null
    }

    function af(e) {
        var t = e.type,
            l = e.memoizedProps,
            a = e.stateNode;
        try {
            e: switch (t) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                    l.autoFocus && a.focus();
                    break e;
                case "img":
                    l.src ? a.src = l.src : l.srcSet && (a.srcset = l.srcSet)
            }
        }
        catch (n) {
            Oe(e, e.return, n)
        }
    }

    function Vi(e, t, l) {
        try {
            var a = e.stateNode;
            q0(a, e.type, l, t), a[rt] = t
        } catch (n) {
            Oe(e, e.return, n)
        }
    }

    function nf(e) {
        return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Dl(e.type) || e.tag === 4
    }

    function ji(e) {
        e: for (;;) {
            for (; e.sibling === null;) {
                if (e.return === null || nf(e.return)) return null;
                e = e.return
            }
            for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
                if (e.tag === 27 && Dl(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
                e.child.return = e, e = e.child
            }
            if (!(e.flags & 2)) return e.stateNode
        }
    }

    function Di(e, t, l) {
        var a = e.tag;
        if (a === 5 || a === 6) e = e.stateNode, t ? (l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l).insertBefore(e, t) : (t = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, t.appendChild(e), l = l._reactRootContainer, l != null || t.onclick !== null || (t.onclick = Jt));
        else if (a !== 4 && (a === 27 && Dl(e.type) && (l = e.stateNode, t = null), e = e.child, e !== null))
            for (Di(e, t, l), e = e.sibling; e !== null;) Di(e, t, l), e = e.sibling
    }

    function Tu(e, t, l) {
        var a = e.tag;
        if (a === 5 || a === 6) e = e.stateNode, t ? l.insertBefore(e, t) : l.appendChild(e);
        else if (a !== 4 && (a === 27 && Dl(e.type) && (l = e.stateNode), e = e.child, e !== null))
            for (Tu(e, t, l), e = e.sibling; e !== null;) Tu(e, t, l), e = e.sibling
    }

    function uf(e) {
        var t = e.stateNode,
            l = e.memoizedProps;
        try {
            for (var a = e.type, n = t.attributes; n.length;) t.removeAttributeNode(n[0]);
            nt(t, a, l), t[et] = e, t[rt] = l
        } catch (u) {
            Oe(e, e.return, u)
        }
    }
    var nl = !1,
        Ie = !1,
        Oi = !1,
        sf = typeof WeakSet == "function" ? WeakSet : Set,
        $e = null;

    function S0(e, t) {
        if (e = e.containerInfo, Pi = Ju, e = vo(e), Ns(e)) {
            if ("selectionStart" in e) var l = {
                start: e.selectionStart,
                end: e.selectionEnd
            };
            else e: {
                l = (l = e.ownerDocument) && l.defaultView || window;
                var a = l.getSelection && l.getSelection();
                if (a && a.rangeCount !== 0) {
                    l = a.anchorNode;
                    var n = a.anchorOffset,
                        u = a.focusNode;
                    a = a.focusOffset;
                    try {
                        l.nodeType, u.nodeType
                    } catch {
                        l = null;
                        break e
                    }
                    var s = 0,
                        c = -1,
                        f = -1,
                        S = 0,
                        A = 0,
                        V = e,
                        x = null;
                    t: for (;;) {
                        for (var B; V !== l || n !== 0 && V.nodeType !== 3 || (c = s + n), V !== u || a !== 0 && V.nodeType !== 3 || (f = s + a), V.nodeType === 3 && (s += V.nodeValue.length), (B = V.firstChild) !== null;) x = V, V = B;
                        for (;;) {
                            if (V === e) break t;
                            if (x === l && ++S === n && (c = s), x === u && ++A === a && (f = s), (B = V.nextSibling) !== null) break;
                            V = x, x = V.parentNode
                        }
                        V = B
                    }
                    l = c === -1 || f === -1 ? null : {
                        start: c,
                        end: f
                    }
                } else l = null
            }
            l = l || {
                start: 0,
                end: 0
            }
        } else l = null;
        for (ec = {
                focusedElem: e,
                selectionRange: l
            }, Ju = !1, $e = t; $e !== null;)
            if (t = $e, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, $e = e;
            else
                for (; $e !== null;) {
                    switch (t = $e, u = t.alternate, e = t.flags, t.tag) {
                        case 0:
                            if ((e & 4) !== 0 && (e = t.updateQueue, e = e !== null ? e.events : null, e !== null))
                                for (l = 0; l < e.length; l++) n = e[l], n.ref.impl = n.nextImpl;
                            break;
                        case 11:
                        case 15:
                            break;
                        case 1:
                            if ((e & 1024) !== 0 && u !== null) {
                                e = void 0, l = t, n = u.memoizedProps, u = u.memoizedState, a = l.stateNode;
                                try {
                                    var k = Pl(l.type, n);
                                    e = a.getSnapshotBeforeUpdate(k, u), a.__reactInternalSnapshotBeforeUpdate = e
                                } catch (ae) {
                                    Oe(l, l.return, ae)
                                }
                            }
                            break;
                        case 3:
                            if ((e & 1024) !== 0) {
                                if (e = t.stateNode.containerInfo, l = e.nodeType, l === 9) ac(e);
                                else if (l === 1) switch (e.nodeName) {
                                    case "HEAD":
                                    case "HTML":
                                    case "BODY":
                                        ac(e);
                                        break;
                                    default:
                                        e.textContent = ""
                                }
                            }
                            break;
                        case 5:
                        case 26:
                        case 27:
                        case 6:
                        case 4:
                        case 17:
                            break;
                        default:
                            if ((e & 1024) !== 0) throw Error(r(163))
                    }
                    if (e = t.sibling, e !== null) {
                        e.return = t.return, $e = e;
                        break
                    }
                    $e = t.return
                }
    }

    function cf(e, t, l) {
        var a = l.flags;
        switch (l.tag) {
            case 0:
            case 11:
            case 15:
                sl(e, l), a & 4 && vn(5, l);
                break;
            case 1:
                if (sl(e, l), a & 4)
                    if (e = l.stateNode, t === null) try {
                        e.componentDidMount()
                    } catch (s) {
                        Oe(l, l.return, s)
                    } else {
                        var n = Pl(l.type, t.memoizedProps);
                        t = t.memoizedState;
                        try {
                            e.componentDidUpdate(n, t, e.__reactInternalSnapshotBeforeUpdate)
                        } catch (s) {
                            Oe(l, l.return, s)
                        }
                    }
                a & 64 && tf(l), a & 512 && Sn(l, l.return);
                break;
            case 3:
                if (sl(e, l), a & 64 && (e = l.updateQueue, e !== null)) {
                    if (t = null, l.child !== null) switch (l.child.tag) {
                        case 27:
                        case 5:
                            t = l.child.stateNode;
                            break;
                        case 1:
                            t = l.child.stateNode
                    }
                    try {
                        ko(e, t)
                    } catch (s) {
                        Oe(l, l.return, s)
                    }
                }
                break;
            case 27:
                t === null && a & 4 && uf(l);
            case 26:
            case 5:
                sl(e, l), t === null && a & 4 && af(l), a & 512 && Sn(l, l.return);
                break;
            case 12:
                sl(e, l);
                break;
            case 31:
                sl(e, l), a & 4 && ff(e, l);
                break;
            case 13:
                sl(e, l), a & 4 && df(e, l), a & 64 && (e = l.memoizedState, e !== null && (e = e.dehydrated, e !== null && (l = C0.bind(null, l), J0(e, l))));
                break;
            case 22:
                if (a = l.memoizedState !== null || nl, !a) {
                    t = t !== null && t.memoizedState !== null || Ie, n = nl;
                    var u = Ie;
                    nl = a, (Ie = t) && !u ? il(e, l, (l.subtreeFlags & 8772) !== 0) : sl(e, l), nl = n, Ie = u
                }
                break;
            case 30:
                break;
            default:
                sl(e, l)
        }
    }

    function of(e) {
        var t = e.alternate;
        t !== null && (e.alternate = null, of(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && cs(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null
    }
    var we = null,
        dt = !1;

    function ul(e, t, l) {
        for (l = l.child; l !== null;) rf(e, t, l), l = l.sibling
    }

    function rf(e, t, l) {
        if (pt && typeof pt.onCommitFiberUnmount == "function") try {
            pt.onCommitFiberUnmount(Ya, l)
        } catch {}
        switch (l.tag) {
            case 26:
                Ie || kt(l, t), ul(e, t, l), l.memoizedState ? l.memoizedState.count-- : l.stateNode && (l = l.stateNode, l.parentNode.removeChild(l));
                break;
            case 27:
                Ie || kt(l, t);
                var a = we,
                    n = dt;
                Dl(l.type) && (we = l.stateNode, dt = !1), ul(e, t, l), Cn(l.stateNode), we = a, dt = n;
                break;
            case 5:
                Ie || kt(l, t);
            case 6:
                if (a = we, n = dt, we = null, ul(e, t, l), we = a, dt = n, we !== null)
                    if (dt) try {
                        (we.nodeType === 9 ? we.body : we.nodeName === "HTML" ? we.ownerDocument.body : we).removeChild(l.stateNode)
                    } catch (u) {
                        Oe(l, t, u)
                    } else try {
                        we.removeChild(l.stateNode)
                    } catch (u) {
                        Oe(l, t, u)
                    }
                break;
            case 18:
                we !== null && (dt ? (e = we, ld(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, l.stateNode), qa(e)) : ld(we, l.stateNode));
                break;
            case 4:
                a = we, n = dt, we = l.stateNode.containerInfo, dt = !0, ul(e, t, l), we = a, dt = n;
                break;
            case 0:
            case 11:
            case 14:
            case 15:
                Bl(2, l, t), Ie || Bl(4, l, t), ul(e, t, l);
                break;
            case 1:
                Ie || (kt(l, t), a = l.stateNode, typeof a.componentWillUnmount == "function" && lf(l, t, a)), ul(e, t, l);
                break;
            case 21:
                ul(e, t, l);
                break;
            case 22:
                Ie = (a = Ie) || l.memoizedState !== null, ul(e, t, l), Ie = a;
                break;
            default:
                ul(e, t, l)
        }
    }

    function ff(e, t) {
        if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
            e = e.dehydrated;
            try {
                qa(e)
            } catch (l) {
                Oe(t, t.return, l)
            }
        }
    }

    function df(e, t) {
        if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
            qa(e)
        } catch (l) {
            Oe(t, t.return, l)
        }
    }

    function b0(e) {
        switch (e.tag) {
            case 31:
            case 13:
            case 19:
                var t = e.stateNode;
                return t === null && (t = e.stateNode = new sf), t;
            case 22:
                return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new sf), t;
            default:
                throw Error(r(435, e.tag))
        }
    }

    function Cu(e, t) {
        var l = b0(e);
        t.forEach(function(a) {
            if (!l.has(a)) {
                l.add(a);
                var n = V0.bind(null, e, a);
                a.then(n, n)
            }
        })
    }

    function mt(e, t) {
        var l = t.deletions;
        if (l !== null)
            for (var a = 0; a < l.length; a++) {
                var n = l[a],
                    u = e,
                    s = t,
                    c = s;
                e: for (; c !== null;) {
                    switch (c.tag) {
                        case 27:
                            if (Dl(c.type)) {
                                we = c.stateNode, dt = !1;
                                break e
                            }
                            break;
                        case 5:
                            we = c.stateNode, dt = !1;
                            break e;
                        case 3:
                        case 4:
                            we = c.stateNode.containerInfo, dt = !0;
                            break e
                    }
                    c = c.return
                }
                if (we === null) throw Error(r(160));
                rf(u, s, n), we = null, dt = !1, u = n.alternate, u !== null && (u.return = null), n.return = null
            }
        if (t.subtreeFlags & 13886)
            for (t = t.child; t !== null;) mf(t, e), t = t.sibling
    }
    var wt = null;

    function mf(e, t) {
        var l = e.alternate,
            a = e.flags;
        switch (e.tag) {
            case 0:
            case 11:
            case 14:
            case 15:
                mt(t, e), ht(e), a & 4 && (Bl(3, e, e.return), vn(3, e), Bl(5, e, e.return));
                break;
            case 1:
                mt(t, e), ht(e), a & 512 && (Ie || l === null || kt(l, l.return)), a & 64 && nl && (e = e.updateQueue, e !== null && (a = e.callbacks, a !== null && (l = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = l === null ? a : l.concat(a))));
                break;
            case 26:
                var n = wt;
                if (mt(t, e), ht(e), a & 512 && (Ie || l === null || kt(l, l.return)), a & 4) {
                    var u = l !== null ? l.memoizedState : null;
                    if (a = e.memoizedState, l === null)
                        if (a === null)
                            if (e.stateNode === null) {
                                e: {
                                    a = e.type,
                                    l = e.memoizedProps,
                                    n = n.ownerDocument || n;t: switch (a) {
                                        case "title":
                                            u = n.getElementsByTagName("title")[0], (!u || u[ka] || u[et] || u.namespaceURI === "http://www.w3.org/2000/svg" || u.hasAttribute("itemprop")) && (u = n.createElement(a), n.head.insertBefore(u, n.querySelector("head > title"))), nt(u, a, l), u[et] = e, Fe(u), a = u;
                                            break e;
                                        case "link":
                                            var s = md("link", "href", n).get(a + (l.href || ""));
                                            if (s) {
                                                for (var c = 0; c < s.length; c++)
                                                    if (u = s[c], u.getAttribute("href") === (l.href == null || l.href === "" ? null : l.href) && u.getAttribute("rel") === (l.rel == null ? null : l.rel) && u.getAttribute("title") === (l.title == null ? null : l.title) && u.getAttribute("crossorigin") === (l.crossOrigin == null ? null : l.crossOrigin)) {
                                                        s.splice(c, 1);
                                                        break t
                                                    }
                                            }
                                            u = n.createElement(a), nt(u, a, l), n.head.appendChild(u);
                                            break;
                                        case "meta":
                                            if (s = md("meta", "content", n).get(a + (l.content || ""))) {
                                                for (c = 0; c < s.length; c++)
                                                    if (u = s[c], u.getAttribute("content") === (l.content == null ? null : "" + l.content) && u.getAttribute("name") === (l.name == null ? null : l.name) && u.getAttribute("property") === (l.property == null ? null : l.property) && u.getAttribute("http-equiv") === (l.httpEquiv == null ? null : l.httpEquiv) && u.getAttribute("charset") === (l.charSet == null ? null : l.charSet)) {
                                                        s.splice(c, 1);
                                                        break t
                                                    }
                                            }
                                            u = n.createElement(a), nt(u, a, l), n.head.appendChild(u);
                                            break;
                                        default:
                                            throw Error(r(468, a))
                                    }
                                    u[et] = e,
                                    Fe(u),
                                    a = u
                                }
                                e.stateNode = a
                            }
                    else hd(n, e.type, e.stateNode);
                    else e.stateNode = dd(n, a, e.memoizedProps);
                    else u !== a ? (u === null ? l.stateNode !== null && (l = l.stateNode, l.parentNode.removeChild(l)) : u.count--, a === null ? hd(n, e.type, e.stateNode) : dd(n, a, e.memoizedProps)) : a === null && e.stateNode !== null && Vi(e, e.memoizedProps, l.memoizedProps)
                }
                break;
            case 27:
                mt(t, e), ht(e), a & 512 && (Ie || l === null || kt(l, l.return)), l !== null && a & 4 && Vi(e, e.memoizedProps, l.memoizedProps);
                break;
            case 5:
                if (mt(t, e), ht(e), a & 512 && (Ie || l === null || kt(l, l.return)), e.flags & 32) {
                    n = e.stateNode;
                    try {
                        oa(n, "")
                    } catch (k) {
                        Oe(e, e.return, k)
                    }
                }
                a & 4 && e.stateNode != null && (n = e.memoizedProps, Vi(e, n, l !== null ? l.memoizedProps : n)), a & 1024 && (Oi = !0);
                break;
            case 6:
                if (mt(t, e), ht(e), a & 4) {
                    if (e.stateNode === null) throw Error(r(162));
                    a = e.memoizedProps, l = e.stateNode;
                    try {
                        l.nodeValue = a
                    } catch (k) {
                        Oe(e, e.return, k)
                    }
                }
                break;
            case 3:
                if (Xu = null, n = wt, wt = Yu(t.containerInfo), mt(t, e), wt = n, ht(e), a & 4 && l !== null && l.memoizedState.isDehydrated) try {
                    qa(t.containerInfo)
                } catch (k) {
                    Oe(e, e.return, k)
                }
                Oi && (Oi = !1, hf(e));
                break;
            case 4:
                a = wt, wt = Yu(e.stateNode.containerInfo), mt(t, e), ht(e), wt = a;
                break;
            case 12:
                mt(t, e), ht(e);
                break;
            case 31:
                mt(t, e), ht(e), a & 4 && (a = e.updateQueue, a !== null && (e.updateQueue = null, Cu(e, a)));
                break;
            case 13:
                mt(t, e), ht(e), e.child.flags & 8192 && e.memoizedState !== null != (l !== null && l.memoizedState !== null) && (ju = ut()), a & 4 && (a = e.updateQueue, a !== null && (e.updateQueue = null, Cu(e, a)));
                break;
            case 22:
                n = e.memoizedState !== null;
                var f = l !== null && l.memoizedState !== null,
                    S = nl,
                    A = Ie;
                if (nl = S || n, Ie = A || f, mt(t, e), Ie = A, nl = S, ht(e), a & 8192) e: for (t = e.stateNode, t._visibility = n ? t._visibility & -2 : t._visibility | 1, n && (l === null || f || nl || Ie || ea(e)), l = null, t = e;;) {
                    if (t.tag === 5 || t.tag === 26) {
                        if (l === null) {
                            f = l = t;
                            try {
                                if (u = f.stateNode, n) s = u.style, typeof s.setProperty == "function" ? s.setProperty("display", "none", "important") : s.display = "none";
                                else {
                                    c = f.stateNode;
                                    var V = f.memoizedProps.style,
                                        x = V != null && V.hasOwnProperty("display") ? V.display : null;
                                    c.style.display = x == null || typeof x == "boolean" ? "" : ("" + x).trim()
                                }
                            } catch (k) {
                                Oe(f, f.return, k)
                            }
                        }
                    } else if (t.tag === 6) {
                        if (l === null) {
                            f = t;
                            try {
                                f.stateNode.nodeValue = n ? "" : f.memoizedProps
                            } catch (k) {
                                Oe(f, f.return, k)
                            }
                        }
                    } else if (t.tag === 18) {
                        if (l === null) {
                            f = t;
                            try {
                                var B = f.stateNode;
                                n ? ad(B, !0) : ad(f.stateNode, !1)
                            } catch (k) {
                                Oe(f, f.return, k)
                            }
                        }
                    } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
                        t.child.return = t, t = t.child;
                        continue
                    }
                    if (t === e) break e;
                    for (; t.sibling === null;) {
                        if (t.return === null || t.return === e) break e;
                        l === t && (l = null), t = t.return
                    }
                    l === t && (l = null), t.sibling.return = t.return, t = t.sibling
                }
                a & 4 && (a = e.updateQueue, a !== null && (l = a.retryQueue, l !== null && (a.retryQueue = null, Cu(e, l))));
                break;
            case 19:
                mt(t, e), ht(e), a & 4 && (a = e.updateQueue, a !== null && (e.updateQueue = null, Cu(e, a)));
                break;
            case 30:
                break;
            case 21:
                break;
            default:
                mt(t, e), ht(e)
        }
    }

    function ht(e) {
        var t = e.flags;
        if (t & 2) {
            try {
                for (var l, a = e.return; a !== null;) {
                    if (nf(a)) {
                        l = a;
                        break
                    }
                    a = a.return
                }
                if (l == null) throw Error(r(160));
                switch (l.tag) {
                    case 27:
                        var n = l.stateNode,
                            u = ji(e);
                        Tu(e, u, n);
                        break;
                    case 5:
                        var s = l.stateNode;
                        l.flags & 32 && (oa(s, ""), l.flags &= -33);
                        var c = ji(e);
                        Tu(e, c, s);
                        break;
                    case 3:
                    case 4:
                        var f = l.stateNode.containerInfo,
                            S = ji(e);
                        Di(e, S, f);
                        break;
                    default:
                        throw Error(r(161))
                }
            } catch (A) {
                Oe(e, e.return, A)
            }
            e.flags &= -3
        }
        t & 4096 && (e.flags &= -4097)
    }

    function hf(e) {
        if (e.subtreeFlags & 1024)
            for (e = e.child; e !== null;) {
                var t = e;
                hf(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling
            }
    }

    function sl(e, t) {
        if (t.subtreeFlags & 8772)
            for (t = t.child; t !== null;) cf(e, t.alternate, t), t = t.sibling
    }

    function ea(e) {
        for (e = e.child; e !== null;) {
            var t = e;
            switch (t.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                    Bl(4, t, t.return), ea(t);
                    break;
                case 1:
                    kt(t, t.return);
                    var l = t.stateNode;
                    typeof l.componentWillUnmount == "function" && lf(t, t.return, l), ea(t);
                    break;
                case 27:
                    Cn(t.stateNode);
                case 26:
                case 5:
                    kt(t, t.return), ea(t);
                    break;
                case 22:
                    t.memoizedState === null && ea(t);
                    break;
                case 30:
                    ea(t);
                    break;
                default:
                    ea(t)
            }
            e = e.sibling
        }
    }

    function il(e, t, l) {
        for (l = l && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null;) {
            var a = t.alternate,
                n = e,
                u = t,
                s = u.flags;
            switch (u.tag) {
                case 0:
                case 11:
                case 15:
                    il(n, u, l), vn(4, u);
                    break;
                case 1:
                    if (il(n, u, l), a = u, n = a.stateNode, typeof n.componentDidMount == "function") try {
                        n.componentDidMount()
                    } catch (S) {
                        Oe(a, a.return, S)
                    }
                    if (a = u, n = a.updateQueue, n !== null) {
                        var c = a.stateNode;
                        try {
                            var f = n.shared.hiddenCallbacks;
                            if (f !== null)
                                for (n.shared.hiddenCallbacks = null, n = 0; n < f.length; n++) Xo(f[n], c)
                        } catch (S) {
                            Oe(a, a.return, S)
                        }
                    }
                    l && s & 64 && tf(u), Sn(u, u.return);
                    break;
                case 27:
                    uf(u);
                case 26:
                case 5:
                    il(n, u, l), l && a === null && s & 4 && af(u), Sn(u, u.return);
                    break;
                case 12:
                    il(n, u, l);
                    break;
                case 31:
                    il(n, u, l), l && s & 4 && ff(n, u);
                    break;
                case 13:
                    il(n, u, l), l && s & 4 && df(n, u);
                    break;
                case 22:
                    u.memoizedState === null && il(n, u, l), Sn(u, u.return);
                    break;
                case 30:
                    break;
                default:
                    il(n, u, l)
            }
            t = t.sibling
        }
    }

    function zi(e, t) {
        var l = null;
        e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== l && (e != null && e.refCount++, l != null && nn(l))
    }

    function Hi(e, t) {
        e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && nn(e))
    }

    function Yt(e, t, l, a) {
        if (t.subtreeFlags & 10256)
            for (t = t.child; t !== null;) gf(e, t, l, a), t = t.sibling
    }

    function gf(e, t, l, a) {
        var n = t.flags;
        switch (t.tag) {
            case 0:
            case 11:
            case 15:
                Yt(e, t, l, a), n & 2048 && vn(9, t);
                break;
            case 1:
                Yt(e, t, l, a);
                break;
            case 3:
                Yt(e, t, l, a), n & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && nn(e)));
                break;
            case 12:
                if (n & 2048) {
                    Yt(e, t, l, a), e = t.stateNode;
                    try {
                        var u = t.memoizedProps,
                            s = u.id,
                            c = u.onPostCommit;
                        typeof c == "function" && c(s, t.alternate === null ? "mount" : "update", e.passiveEffectDuration, -0)
                    } catch (f) {
                        Oe(t, t.return, f)
                    }
                } else Yt(e, t, l, a);
                break;
            case 31:
                Yt(e, t, l, a);
                break;
            case 13:
                Yt(e, t, l, a);
                break;
            case 23:
                break;
            case 22:
                u = t.stateNode, s = t.alternate, t.memoizedState !== null ? u._visibility & 2 ? Yt(e, t, l, a) : bn(e, t) : u._visibility & 2 ? Yt(e, t, l, a) : (u._visibility |= 2, Va(e, t, l, a, (t.subtreeFlags & 10256) !== 0 || !1)), n & 2048 && zi(s, t);
                break;
            case 24:
                Yt(e, t, l, a), n & 2048 && Hi(t.alternate, t);
                break;
            default:
                Yt(e, t, l, a)
        }
    }

    function Va(e, t, l, a, n) {
        for (n = n && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null;) {
            var u = e,
                s = t,
                c = l,
                f = a,
                S = s.flags;
            switch (s.tag) {
                case 0:
                case 11:
                case 15:
                    Va(u, s, c, f, n), vn(8, s);
                    break;
                case 23:
                    break;
                case 22:
                    var A = s.stateNode;
                    s.memoizedState !== null ? A._visibility & 2 ? Va(u, s, c, f, n) : bn(u, s) : (A._visibility |= 2, Va(u, s, c, f, n)), n && S & 2048 && zi(s.alternate, s);
                    break;
                case 24:
                    Va(u, s, c, f, n), n && S & 2048 && Hi(s.alternate, s);
                    break;
                default:
                    Va(u, s, c, f, n)
            }
            t = t.sibling
        }
    }

    function bn(e, t) {
        if (t.subtreeFlags & 10256)
            for (t = t.child; t !== null;) {
                var l = e,
                    a = t,
                    n = a.flags;
                switch (a.tag) {
                    case 22:
                        bn(l, a), n & 2048 && zi(a.alternate, a);
                        break;
                    case 24:
                        bn(l, a), n & 2048 && Hi(a.alternate, a);
                        break;
                    default:
                        bn(l, a)
                }
                t = t.sibling
            }
    }
    var xn = 8192;

    function ja(e, t, l) {
        if (e.subtreeFlags & xn)
            for (e = e.child; e !== null;) yf(e, t, l), e = e.sibling
    }

    function yf(e, t, l) {
        switch (e.tag) {
            case 26:
                ja(e, t, l), e.flags & xn && e.memoizedState !== null && sh(l, wt, e.memoizedState, e.memoizedProps);
                break;
            case 5:
                ja(e, t, l);
                break;
            case 3:
            case 4:
                var a = wt;
                wt = Yu(e.stateNode.containerInfo), ja(e, t, l), wt = a;
                break;
            case 22:
                e.memoizedState === null && (a = e.alternate, a !== null && a.memoizedState !== null ? (a = xn, xn = 16777216, ja(e, t, l), xn = a) : ja(e, t, l));
                break;
            default:
                ja(e, t, l)
        }
    }

    function pf(e) {
        var t = e.alternate;
        if (t !== null && (e = t.child, e !== null)) {
            t.child = null;
            do t = e.sibling, e.sibling = null, e = t; while (e !== null)
        }
    }

    function En(e) {
        var t = e.deletions;
        if ((e.flags & 16) !== 0) {
            if (t !== null)
                for (var l = 0; l < t.length; l++) {
                    var a = t[l];
                    $e = a, Sf(a, e)
                }
            pf(e)
        }
        if (e.subtreeFlags & 10256)
            for (e = e.child; e !== null;) vf(e), e = e.sibling
    }

    function vf(e) {
        switch (e.tag) {
            case 0:
            case 11:
            case 15:
                En(e), e.flags & 2048 && Bl(9, e, e.return);
                break;
            case 3:
                En(e);
                break;
            case 12:
                En(e);
                break;
            case 22:
                var t = e.stateNode;
                e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Vu(e)) : En(e);
                break;
            default:
                En(e)
        }
    }

    function Vu(e) {
        var t = e.deletions;
        if ((e.flags & 16) !== 0) {
            if (t !== null)
                for (var l = 0; l < t.length; l++) {
                    var a = t[l];
                    $e = a, Sf(a, e)
                }
            pf(e)
        }
        for (e = e.child; e !== null;) {
            switch (t = e, t.tag) {
                case 0:
                case 11:
                case 15:
                    Bl(8, t, t.return), Vu(t);
                    break;
                case 22:
                    l = t.stateNode, l._visibility & 2 && (l._visibility &= -3, Vu(t));
                    break;
                default:
                    Vu(t)
            }
            e = e.sibling
        }
    }

    function Sf(e, t) {
        for (; $e !== null;) {
            var l = $e;
            switch (l.tag) {
                case 0:
                case 11:
                case 15:
                    Bl(8, l, t);
                    break;
                case 23:
                case 22:
                    if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
                        var a = l.memoizedState.cachePool.pool;
                        a != null && a.refCount++
                    }
                    break;
                case 24:
                    nn(l.memoizedState.cache)
            }
            if (a = l.child, a !== null) a.return = l, $e = a;
            else e: for (l = e; $e !== null;) {
                a = $e;
                var n = a.sibling,
                    u = a.return;
                if (of(a), a === l) {
                    $e = null;
                    break e
                }
                if (n !== null) {
                    n.return = u, $e = n;
                    break e
                }
                $e = u
            }
        }
    }
    var x0 = {
            getCacheForType: function(e) {
                var t = lt(Ze),
                    l = t.data.get(e);
                return l === void 0 && (l = e(), t.data.set(e, l)), l
            },
            cacheSignal: function() {
                return lt(Ze).controller.signal
            }
        },
        E0 = typeof WeakMap == "function" ? WeakMap : Map,
        Ve = 0,
        Ue = null,
        pe = null,
        Se = 0,
        De = 0,
        Mt = null,
        Nl = !1,
        Da = !1,
        _i = !1,
        cl = 0,
        Qe = 0,
        Al = 0,
        ta = 0,
        Ri = 0,
        Bt = 0,
        Oa = 0,
        Mn = null,
        gt = null,
        Ui = !1,
        ju = 0,
        bf = 0,
        Du = 1 / 0,
        Ou = null,
        Tl = null,
        We = 0,
        Cl = null,
        za = null,
        ol = 0,
        Li = 0,
        Gi = null,
        xf = null,
        Bn = 0,
        qi = null;

    function Nt() {
        return (Ve & 2) !== 0 && Se !== 0 ? Se & -Se : p.T !== null ? Zi() : _c()
    }

    function Ef() {
        if (Bt === 0)
            if ((Se & 536870912) === 0 || xe) {
                var e = qn;
                qn <<= 1, (qn & 3932160) === 0 && (qn = 262144), Bt = e
            } else Bt = 536870912;
        return e = xt.current, e !== null && (e.flags |= 32), Bt
    }

    function yt(e, t, l) {
        (e === Ue && (De === 2 || De === 9) || e.cancelPendingCommit !== null) && (Ha(e, 0), Vl(e, Se, Bt, !1)), Xa(e, l), ((Ve & 2) === 0 || e !== Ue) && (e === Ue && ((Ve & 2) === 0 && (ta |= l), Qe === 4 && Vl(e, Se, Bt, !1)), Zt(e))
    }

    function Mf(e, t, l) {
        if ((Ve & 6) !== 0) throw Error(r(327));
        var a = !l && (t & 127) === 0 && (t & e.expiredLanes) === 0 || Qa(e, t),
            n = a ? N0(e, t) : Yi(e, t, !0),
            u = a;
        do {
            if (n === 0) {
                Da && !a && Vl(e, t, 0, !1);
                break
            } else {
                if (l = e.current.alternate, u && !M0(l)) {
                    n = Yi(e, t, !1), u = !1;
                    continue
                }
                if (n === 2) {
                    if (u = t, e.errorRecoveryDisabledLanes & u) var s = 0;
                    else s = e.pendingLanes & -536870913, s = s !== 0 ? s : s & 536870912 ? 536870912 : 0;
                    if (s !== 0) {
                        t = s;
                        e: {
                            var c = e;n = Mn;
                            var f = c.current.memoizedState.isDehydrated;
                            if (f && (Ha(c, s).flags |= 256), s = Yi(c, s, !1), s !== 2) {
                                if (_i && !f) {
                                    c.errorRecoveryDisabledLanes |= u, ta |= u, n = 4;
                                    break e
                                }
                                u = gt, gt = n, u !== null && (gt === null ? gt = u : gt.push.apply(gt, u))
                            }
                            n = s
                        }
                        if (u = !1, n !== 2) continue
                    }
                }
                if (n === 1) {
                    Ha(e, 0), Vl(e, t, 0, !0);
                    break
                }
                e: {
                    switch (a = e, u = n, u) {
                        case 0:
                        case 1:
                            throw Error(r(345));
                        case 4:
                            if ((t & 4194048) !== t) break;
                        case 6:
                            Vl(a, t, Bt, !Nl);
                            break e;
                        case 2:
                            gt = null;
                            break;
                        case 3:
                        case 5:
                            break;
                        default:
                            throw Error(r(329))
                    }
                    if ((t & 62914560) === t && (n = ju + 300 - ut(), 10 < n)) {
                        if (Vl(a, t, Bt, !Nl), Yn(a, 0, !0) !== 0) break e;
                        ol = t, a.timeoutHandle = ed(Bf.bind(null, a, l, gt, Ou, Ui, t, Bt, ta, Oa, Nl, u, "Throttled", -0, 0), n);
                        break e
                    }
                    Bf(a, l, gt, Ou, Ui, t, Bt, ta, Oa, Nl, u, null, -0, 0)
                }
            }
            break
        } while (!0);
        Zt(e)
    }

    function Bf(e, t, l, a, n, u, s, c, f, S, A, V, x, B) {
        if (e.timeoutHandle = -1, V = t.subtreeFlags, V & 8192 || (V & 16785408) === 16785408) {
            V = {
                stylesheets: null,
                count: 0,
                imgCount: 0,
                imgBytes: 0,
                suspenseyImages: [],
                waitingForImages: !0,
                waitingForViewTransition: !1,
                unsuspend: Jt
            }, yf(t, u, V);
            var k = (u & 62914560) === u ? ju - ut() : (u & 4194048) === u ? bf - ut() : 0;
            if (k = ih(V, k), k !== null) {
                ol = u, e.cancelPendingCommit = k(Of.bind(null, e, t, u, l, a, n, s, c, f, A, V, null, x, B)), Vl(e, u, s, !S);
                return
            }
        }
        Of(e, t, u, l, a, n, s, c, f)
    }

    function M0(e) {
        for (var t = e;;) {
            var l = t.tag;
            if ((l === 0 || l === 11 || l === 15) && t.flags & 16384 && (l = t.updateQueue, l !== null && (l = l.stores, l !== null)))
                for (var a = 0; a < l.length; a++) {
                    var n = l[a],
                        u = n.getSnapshot;
                    n = n.value;
                    try {
                        if (!St(u(), n)) return !1
                    } catch {
                        return !1
                    }
                }
            if (l = t.child, t.subtreeFlags & 16384 && l !== null) l.return = t, t = l;
            else {
                if (t === e) break;
                for (; t.sibling === null;) {
                    if (t.return === null || t.return === e) return !0;
                    t = t.return
                }
                t.sibling.return = t.return, t = t.sibling
            }
        }
        return !0
    }

    function Vl(e, t, l, a) {
        t &= ~Ri, t &= ~ta, e.suspendedLanes |= t, e.pingedLanes &= ~t, a && (e.warmLanes |= t), a = e.expirationTimes;
        for (var n = t; 0 < n;) {
            var u = 31 - vt(n),
                s = 1 << u;
            a[u] = -1, n &= ~s
        }
        l !== 0 && Oc(e, l, t)
    }

    function zu() {
        return (Ve & 6) === 0 ? (Nn(0), !1) : !0
    }

    function wi() {
        if (pe !== null) {
            if (De === 0) var e = pe.return;
            else e = pe, $t = Zl = null, ai(e), Ba = null, sn = 0, e = pe;
            for (; e !== null;) ef(e.alternate, e), e = e.return;
            pe = null
        }
    }

    function Ha(e, t) {
        var l = e.timeoutHandle;
        l !== -1 && (e.timeoutHandle = -1, Q0(l)), l = e.cancelPendingCommit, l !== null && (e.cancelPendingCommit = null, l()), ol = 0, wi(), Ue = e, pe = l = Wt(e.current, null), Se = t, De = 0, Mt = null, Nl = !1, Da = Qa(e, t), _i = !1, Oa = Bt = Ri = ta = Al = Qe = 0, gt = Mn = null, Ui = !1, (t & 8) !== 0 && (t |= t & 32);
        var a = e.entangledLanes;
        if (a !== 0)
            for (e = e.entanglements, a &= t; 0 < a;) {
                var n = 31 - vt(a),
                    u = 1 << n;
                t |= e[n], a &= ~u
            }
        return cl = t, eu(), l
    }

    function Nf(e, t) {
        me = null, p.H = gn, t === Ma || t === cu ? (t = qo(), De = 3) : t === ks ? (t = qo(), De = 4) : De = t === Si ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, Mt = t, pe === null && (Qe = 1, Eu(e, Ot(t, e.current)))
    }

    function Af() {
        var e = xt.current;
        return e === null ? !0 : (Se & 4194048) === Se ? Rt === null : (Se & 62914560) === Se || (Se & 536870912) !== 0 ? e === Rt : !1
    }

    function Tf() {
        var e = p.H;
        return p.H = gn, e === null ? gn : e
    }

    function Cf() {
        var e = p.A;
        return p.A = x0, e
    }

    function Hu() {
        Qe = 4, Nl || (Se & 4194048) !== Se && xt.current !== null || (Da = !0), (Al & 134217727) === 0 && (ta & 134217727) === 0 || Ue === null || Vl(Ue, Se, Bt, !1)
    }

    function Yi(e, t, l) {
        var a = Ve;
        Ve |= 2;
        var n = Tf(),
            u = Cf();
        (Ue !== e || Se !== t) && (Ou = null, Ha(e, t)), t = !1;
        var s = Qe;
        e: do try {
                if (De !== 0 && pe !== null) {
                    var c = pe,
                        f = Mt;
                    switch (De) {
                        case 8:
                            wi(), s = 6;
                            break e;
                        case 3:
                        case 2:
                        case 9:
                        case 6:
                            xt.current === null && (t = !0);
                            var S = De;
                            if (De = 0, Mt = null, _a(e, c, f, S), l && Da) {
                                s = 0;
                                break e
                            }
                            break;
                        default:
                            S = De, De = 0, Mt = null, _a(e, c, f, S)
                    }
                }
                B0(), s = Qe;
                break
            } catch (A) {
                Nf(e, A)
            }
            while (!0);
            return t && e.shellSuspendCounter++, $t = Zl = null, Ve = a, p.H = n, p.A = u, pe === null && (Ue = null, Se = 0, eu()), s
    }

    function B0() {
        for (; pe !== null;) Vf(pe)
    }

    function N0(e, t) {
        var l = Ve;
        Ve |= 2;
        var a = Tf(),
            n = Cf();
        Ue !== e || Se !== t ? (Ou = null, Du = ut() + 500, Ha(e, t)) : Da = Qa(e, t);
        e: do try {
                if (De !== 0 && pe !== null) {
                    t = pe;
                    var u = Mt;
                    t: switch (De) {
                        case 1:
                            De = 0, Mt = null, _a(e, t, u, 1);
                            break;
                        case 2:
                        case 9:
                            if (Lo(u)) {
                                De = 0, Mt = null, jf(t);
                                break
                            }
                            t = function() {
                                De !== 2 && De !== 9 || Ue !== e || (De = 7), Zt(e)
                            }, u.then(t, t);
                            break e;
                        case 3:
                            De = 7;
                            break e;
                        case 4:
                            De = 5;
                            break e;
                        case 7:
                            Lo(u) ? (De = 0, Mt = null, jf(t)) : (De = 0, Mt = null, _a(e, t, u, 7));
                            break;
                        case 5:
                            var s = null;
                            switch (pe.tag) {
                                case 26:
                                    s = pe.memoizedState;
                                case 5:
                                case 27:
                                    var c = pe;
                                    if (s ? gd(s) : c.stateNode.complete) {
                                        De = 0, Mt = null;
                                        var f = c.sibling;
                                        if (f !== null) pe = f;
                                        else {
                                            var S = c.return;
                                            S !== null ? (pe = S, _u(S)) : pe = null
                                        }
                                        break t
                                    }
                            }
                            De = 0, Mt = null, _a(e, t, u, 5);
                            break;
                        case 6:
                            De = 0, Mt = null, _a(e, t, u, 6);
                            break;
                        case 8:
                            wi(), Qe = 6;
                            break e;
                        default:
                            throw Error(r(462))
                    }
                }
                A0();
                break
            } catch (A) {
                Nf(e, A)
            }
            while (!0);
            return $t = Zl = null, p.H = a, p.A = n, Ve = l, pe !== null ? 0 : (Ue = null, Se = 0, eu(), Qe)
    }

    function A0() {
        for (; pe !== null && !ze();) Vf(pe)
    }

    function Vf(e) {
        var t = $r(e.alternate, e, cl);
        e.memoizedProps = e.pendingProps, t === null ? _u(e) : pe = t
    }

    function jf(e) {
        var t = e,
            l = t.alternate;
        switch (t.tag) {
            case 15:
            case 0:
                t = Zr(l, t, t.pendingProps, t.type, void 0, Se);
                break;
            case 11:
                t = Zr(l, t, t.pendingProps, t.type.render, t.ref, Se);
                break;
            case 5:
                ai(t);
            default:
                ef(l, t), t = pe = To(t, cl), t = $r(l, t, cl)
        }
        e.memoizedProps = e.pendingProps, t === null ? _u(e) : pe = t
    }

    function _a(e, t, l, a) {
        $t = Zl = null, ai(t), Ba = null, sn = 0;
        var n = t.return;
        try {
            if (h0(e, n, t, l, Se)) {
                Qe = 1, Eu(e, Ot(l, e.current)), pe = null;
                return
            }
        } catch (u) {
            if (n !== null) throw pe = n, u;
            Qe = 1, Eu(e, Ot(l, e.current)), pe = null;
            return
        }
        t.flags & 32768 ? (xe || a === 1 ? e = !0 : Da || (Se & 536870912) !== 0 ? e = !1 : (Nl = e = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = xt.current, a !== null && a.tag === 13 && (a.flags |= 16384))), Df(t, e)) : _u(t)
    }

    function _u(e) {
        var t = e;
        do {
            if ((t.flags & 32768) !== 0) {
                Df(t, Nl);
                return
            }
            e = t.return;
            var l = p0(t.alternate, t, cl);
            if (l !== null) {
                pe = l;
                return
            }
            if (t = t.sibling, t !== null) {
                pe = t;
                return
            }
            pe = t = e
        } while (t !== null);
        Qe === 0 && (Qe = 5)
    }

    function Df(e, t) {
        do {
            var l = v0(e.alternate, e);
            if (l !== null) {
                l.flags &= 32767, pe = l;
                return
            }
            if (l = e.return, l !== null && (l.flags |= 32768, l.subtreeFlags = 0, l.deletions = null), !t && (e = e.sibling, e !== null)) {
                pe = e;
                return
            }
            pe = e = l
        } while (e !== null);
        Qe = 6, pe = null
    }

    function Of(e, t, l, a, n, u, s, c, f) {
        e.cancelPendingCommit = null;
        do Ru(); while (We !== 0);
        if ((Ve & 6) !== 0) throw Error(r(327));
        if (t !== null) {
            if (t === e.current) throw Error(r(177));
            if (u = t.lanes | t.childLanes, u |= js, um(e, l, u, s, c, f), e === Ue && (pe = Ue = null, Se = 0), za = t, Cl = e, ol = l, Li = u, Gi = n, xf = a, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, j0(Ln, function() {
                    return Uf(), null
                })) : (e.callbackNode = null, e.callbackPriority = 0), a = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || a) {
                a = p.T, p.T = null, n = H.p, H.p = 2, s = Ve, Ve |= 4;
                try {
                    S0(e, t, l)
                } finally {
                    Ve = s, H.p = n, p.T = a
                }
            }
            We = 1, zf(), Hf(), _f()
        }
    }

    function zf() {
        if (We === 1) {
            We = 0;
            var e = Cl,
                t = za,
                l = (t.flags & 13878) !== 0;
            if ((t.subtreeFlags & 13878) !== 0 || l) {
                l = p.T, p.T = null;
                var a = H.p;
                H.p = 2;
                var n = Ve;
                Ve |= 4;
                try {
                    mf(t, e);
                    var u = ec,
                        s = vo(e.containerInfo),
                        c = u.focusedElem,
                        f = u.selectionRange;
                    if (s !== c && c && c.ownerDocument && po(c.ownerDocument.documentElement, c)) {
                        if (f !== null && Ns(c)) {
                            var S = f.start,
                                A = f.end;
                            if (A === void 0 && (A = S), "selectionStart" in c) c.selectionStart = S, c.selectionEnd = Math.min(A, c.value.length);
                            else {
                                var V = c.ownerDocument || document,
                                    x = V && V.defaultView || window;
                                if (x.getSelection) {
                                    var B = x.getSelection(),
                                        k = c.textContent.length,
                                        ae = Math.min(f.start, k),
                                        Re = f.end === void 0 ? ae : Math.min(f.end, k);
                                    !B.extend && ae > Re && (s = Re, Re = ae, ae = s);
                                    var h = yo(c, ae),
                                        m = yo(c, Re);
                                    if (h && m && (B.rangeCount !== 1 || B.anchorNode !== h.node || B.anchorOffset !== h.offset || B.focusNode !== m.node || B.focusOffset !== m.offset)) {
                                        var v = V.createRange();
                                        v.setStart(h.node, h.offset), B.removeAllRanges(), ae > Re ? (B.addRange(v), B.extend(m.node, m.offset)) : (v.setEnd(m.node, m.offset), B.addRange(v))
                                    }
                                }
                            }
                        }
                        for (V = [], B = c; B = B.parentNode;) B.nodeType === 1 && V.push({
                            element: B,
                            left: B.scrollLeft,
                            top: B.scrollTop
                        });
                        for (typeof c.focus == "function" && c.focus(), c = 0; c < V.length; c++) {
                            var C = V[c];
                            C.element.scrollLeft = C.left, C.element.scrollTop = C.top
                        }
                    }
                    Ju = !!Pi, ec = Pi = null
                } finally {
                    Ve = n, H.p = a, p.T = l
                }
            }
            e.current = t, We = 2
        }
    }

    function Hf() {
        if (We === 2) {
            We = 0;
            var e = Cl,
                t = za,
                l = (t.flags & 8772) !== 0;
            if ((t.subtreeFlags & 8772) !== 0 || l) {
                l = p.T, p.T = null;
                var a = H.p;
                H.p = 2;
                var n = Ve;
                Ve |= 4;
                try {
                    cf(e, t.alternate, t)
                } finally {
                    Ve = n, H.p = a, p.T = l
                }
            }
            We = 3
        }
    }

    function _f() {
        if (We === 4 || We === 3) {
            We = 0, Ct();
            var e = Cl,
                t = za,
                l = ol,
                a = xf;
            (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? We = 5 : (We = 0, za = Cl = null, Rf(e, e.pendingLanes));
            var n = e.pendingLanes;
            if (n === 0 && (Tl = null), ss(l), t = t.stateNode, pt && typeof pt.onCommitFiberRoot == "function") try {
                pt.onCommitFiberRoot(Ya, t, void 0, (t.current.flags & 128) === 128)
            } catch {}
            if (a !== null) {
                t = p.T, n = H.p, H.p = 2, p.T = null;
                try {
                    for (var u = e.onRecoverableError, s = 0; s < a.length; s++) {
                        var c = a[s];
                        u(c.value, {
                            componentStack: c.stack
                        })
                    }
                } finally {
                    p.T = t, H.p = n
                }
            }(ol & 3) !== 0 && Ru(), Zt(e), n = e.pendingLanes, (l & 261930) !== 0 && (n & 42) !== 0 ? e === qi ? Bn++ : (Bn = 0, qi = e) : Bn = 0, Nn(0)
        }
    }

    function Rf(e, t) {
        (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, nn(t)))
    }

    function Ru() {
        return zf(), Hf(), _f(), Uf()
    }

    function Uf() {
        if (We !== 5) return !1;
        var e = Cl,
            t = Li;
        Li = 0;
        var l = ss(ol),
            a = p.T,
            n = H.p;
        try {
            H.p = 32 > l ? 32 : l, p.T = null, l = Gi, Gi = null;
            var u = Cl,
                s = ol;
            if (We = 0, za = Cl = null, ol = 0, (Ve & 6) !== 0) throw Error(r(331));
            var c = Ve;
            if (Ve |= 4, vf(u.current), gf(u, u.current, s, l), Ve = c, Nn(0, !1), pt && typeof pt.onPostCommitFiberRoot == "function") try {
                pt.onPostCommitFiberRoot(Ya, u)
            } catch {}
            return !0
        } finally {
            H.p = n, p.T = a, Rf(e, t)
        }
    }

    function Lf(e, t, l) {
        t = Ot(l, t), t = vi(e.stateNode, t, 2), e = xl(e, t, 2), e !== null && (Xa(e, 2), Zt(e))
    }

    function Oe(e, t, l) {
        if (e.tag === 3) Lf(e, e, l);
        else
            for (; t !== null;) {
                if (t.tag === 3) {
                    Lf(t, e, l);
                    break
                } else if (t.tag === 1) {
                    var a = t.stateNode;
                    if (typeof t.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (Tl === null || !Tl.has(a))) {
                        e = Ot(l, e), l = Lr(2), a = xl(t, l, 2), a !== null && (Gr(l, a, t, e), Xa(a, 2), Zt(a));
                        break
                    }
                }
                t = t.return
            }
    }

    function Qi(e, t, l) {
        var a = e.pingCache;
        if (a === null) {
            a = e.pingCache = new E0;
            var n = new Set;
            a.set(t, n)
        } else n = a.get(t), n === void 0 && (n = new Set, a.set(t, n));
        n.has(l) || (_i = !0, n.add(l), e = T0.bind(null, e, t, l), t.then(e, e))
    }

    function T0(e, t, l) {
        var a = e.pingCache;
        a !== null && a.delete(t), e.pingedLanes |= e.suspendedLanes & l, e.warmLanes &= ~l, Ue === e && (Se & l) === l && (Qe === 4 || Qe === 3 && (Se & 62914560) === Se && 300 > ut() - ju ? (Ve & 2) === 0 && Ha(e, 0) : Ri |= l, Oa === Se && (Oa = 0)), Zt(e)
    }

    function Gf(e, t) {
        t === 0 && (t = Dc()), e = Ql(e, t), e !== null && (Xa(e, t), Zt(e))
    }

    function C0(e) {
        var t = e.memoizedState,
            l = 0;
        t !== null && (l = t.retryLane), Gf(e, l)
    }

    function V0(e, t) {
        var l = 0;
        switch (e.tag) {
            case 31:
            case 13:
                var a = e.stateNode,
                    n = e.memoizedState;
                n !== null && (l = n.retryLane);
                break;
            case 19:
                a = e.stateNode;
                break;
            case 22:
                a = e.stateNode._retryCache;
                break;
            default:
                throw Error(r(314))
        }
        a !== null && a.delete(t), Gf(e, l)
    }

    function j0(e, t) {
        return Tt(e, t)
    }
    var Uu = null,
        Ra = null,
        Xi = !1,
        Lu = !1,
        ki = !1,
        jl = 0;

    function Zt(e) {
        e !== Ra && e.next === null && (Ra === null ? Uu = Ra = e : Ra = Ra.next = e), Lu = !0, Xi || (Xi = !0, O0())
    }

    function Nn(e, t) {
        if (!ki && Lu) {
            ki = !0;
            do
                for (var l = !1, a = Uu; a !== null;) {
                    if (e !== 0) {
                        var n = a.pendingLanes;
                        if (n === 0) var u = 0;
                        else {
                            var s = a.suspendedLanes,
                                c = a.pingedLanes;
                            u = (1 << 31 - vt(42 | e) + 1) - 1, u &= n & ~(s & ~c), u = u & 201326741 ? u & 201326741 | 1 : u ? u | 2 : 0
                        }
                        u !== 0 && (l = !0, Qf(a, u))
                    } else u = Se, u = Yn(a, a === Ue ? u : 0, a.cancelPendingCommit !== null || a.timeoutHandle !== -1), (u & 3) === 0 || Qa(a, u) || (l = !0, Qf(a, u));
                    a = a.next
                }
            while (l);
            ki = !1
        }
    }

    function D0() {
        qf()
    }

    function qf() {
        Lu = Xi = !1;
        var e = 0;
        jl !== 0 && Y0() && (e = jl);
        for (var t = ut(), l = null, a = Uu; a !== null;) {
            var n = a.next,
                u = wf(a, t);
            u === 0 ? (a.next = null, l === null ? Uu = n : l.next = n, n === null && (Ra = l)) : (l = a, (e !== 0 || (u & 3) !== 0) && (Lu = !0)), a = n
        }
        We !== 0 && We !== 5 || Nn(e), jl !== 0 && (jl = 0)
    }

    function wf(e, t) {
        for (var l = e.suspendedLanes, a = e.pingedLanes, n = e.expirationTimes, u = e.pendingLanes & -62914561; 0 < u;) {
            var s = 31 - vt(u),
                c = 1 << s,
                f = n[s];
            f === -1 ? ((c & l) === 0 || (c & a) !== 0) && (n[s] = nm(c, t)) : f <= t && (e.expiredLanes |= c), u &= ~c
        }
        if (t = Ue, l = Se, l = Yn(e, e === t ? l : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), a = e.callbackNode, l === 0 || e === t && (De === 2 || De === 9) || e.cancelPendingCommit !== null) return a !== null && a !== null && Gt(a), e.callbackNode = null, e.callbackPriority = 0;
        if ((l & 3) === 0 || Qa(e, l)) {
            if (t = l & -l, t === e.callbackPriority) return t;
            switch (a !== null && Gt(a), ss(l)) {
                case 2:
                case 8:
                    l = Vc;
                    break;
                case 32:
                    l = Ln;
                    break;
                case 268435456:
                    l = jc;
                    break;
                default:
                    l = Ln
            }
            return a = Yf.bind(null, e), l = Tt(l, a), e.callbackPriority = t, e.callbackNode = l, t
        }
        return a !== null && a !== null && Gt(a), e.callbackPriority = 2, e.callbackNode = null, 2
    }

    function Yf(e, t) {
        if (We !== 0 && We !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
        var l = e.callbackNode;
        if (Ru() && e.callbackNode !== l) return null;
        var a = Se;
        return a = Yn(e, e === Ue ? a : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), a === 0 ? null : (Mf(e, a, t), wf(e, ut()), e.callbackNode != null && e.callbackNode === l ? Yf.bind(null, e) : null)
    }

    function Qf(e, t) {
        if (Ru()) return null;
        Mf(e, t, !0)
    }

    function O0() {
        X0(function() {
            (Ve & 6) !== 0 ? Tt(Cc, D0) : qf()
        })
    }

    function Zi() {
        if (jl === 0) {
            var e = xa;
            e === 0 && (e = Gn, Gn <<= 1, (Gn & 261888) === 0 && (Gn = 256)), jl = e
        }
        return jl
    }

    function Xf(e) {
        return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Zn("" + e)
    }

    function kf(e, t) {
        var l = t.ownerDocument.createElement("input");
        return l.name = t.name, l.value = t.value, e.id && l.setAttribute("form", e.id), t.parentNode.insertBefore(l, t), e = new FormData(e), l.parentNode.removeChild(l), e
    }

    function z0(e, t, l, a, n) {
        if (t === "submit" && l && l.stateNode === n) {
            var u = Xf((n[rt] || null).action),
                s = a.submitter;
            s && (t = (t = s[rt] || null) ? Xf(t.formAction) : s.getAttribute("formAction"), t !== null && (u = t, s = null));
            var c = new Wn("action", "action", null, a, n);
            e.push({
                event: c,
                listeners: [{
                    instance: null,
                    listener: function() {
                        if (a.defaultPrevented) {
                            if (jl !== 0) {
                                var f = s ? kf(n, s) : new FormData(n);
                                di(l, {
                                    pending: !0,
                                    data: f,
                                    method: n.method,
                                    action: u
                                }, null, f)
                            }
                        } else typeof u == "function" && (c.preventDefault(), f = s ? kf(n, s) : new FormData(n), di(l, {
                            pending: !0,
                            data: f,
                            method: n.method,
                            action: u
                        }, u, f))
                    },
                    currentTarget: n
                }]
            })
        }
    }
    for (var Ki = 0; Ki < Vs.length; Ki++) {
        var Ji = Vs[Ki],
            H0 = Ji.toLowerCase(),
            _0 = Ji[0].toUpperCase() + Ji.slice(1);
        qt(H0, "on" + _0)
    }
    qt(xo, "onAnimationEnd"), qt(Eo, "onAnimationIteration"), qt(Mo, "onAnimationStart"), qt("dblclick", "onDoubleClick"), qt("focusin", "onFocus"), qt("focusout", "onBlur"), qt(Fm, "onTransitionRun"), qt($m, "onTransitionStart"), qt(Pm, "onTransitionCancel"), qt(Bo, "onTransitionEnd"), ia("onMouseEnter", ["mouseout", "mouseover"]), ia("onMouseLeave", ["mouseout", "mouseover"]), ia("onPointerEnter", ["pointerout", "pointerover"]), ia("onPointerLeave", ["pointerout", "pointerover"]), Gl("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), Gl("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), Gl("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), Gl("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), Gl("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), Gl("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
    var An = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),
        R0 = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(An));

    function Zf(e, t) {
        t = (t & 4) !== 0;
        for (var l = 0; l < e.length; l++) {
            var a = e[l],
                n = a.event;
            a = a.listeners;
            e: {
                var u = void 0;
                if (t)
                    for (var s = a.length - 1; 0 <= s; s--) {
                        var c = a[s],
                            f = c.instance,
                            S = c.currentTarget;
                        if (c = c.listener, f !== u && n.isPropagationStopped()) break e;
                        u = c, n.currentTarget = S;
                        try {
                            u(n)
                        } catch (A) {
                            Pn(A)
                        }
                        n.currentTarget = null, u = f
                    } else
                        for (s = 0; s < a.length; s++) {
                            if (c = a[s], f = c.instance, S = c.currentTarget, c = c.listener, f !== u && n.isPropagationStopped()) break e;
                            u = c, n.currentTarget = S;
                            try {
                                u(n)
                            } catch (A) {
                                Pn(A)
                            }
                            n.currentTarget = null, u = f
                        }
            }
        }
    }

    function ve(e, t) {
        var l = t[is];
        l === void 0 && (l = t[is] = new Set);
        var a = e + "__bubble";
        l.has(a) || (Kf(t, e, 2, !1), l.add(a))
    }

    function Ii(e, t, l) {
        var a = 0;
        t && (a |= 4), Kf(l, e, a, t)
    }
    var Gu = "_reactListening" + Math.random().toString(36).slice(2);

    function Wi(e) {
        if (!e[Gu]) {
            e[Gu] = !0, Lc.forEach(function(l) {
                l !== "selectionchange" && (R0.has(l) || Ii(l, !1, e), Ii(l, !0, e))
            });
            var t = e.nodeType === 9 ? e : e.ownerDocument;
            t === null || t[Gu] || (t[Gu] = !0, Ii("selectionchange", !1, t))
        }
    }

    function Kf(e, t, l, a) {
        switch (Ed(t)) {
            case 2:
                var n = rh;
                break;
            case 8:
                n = fh;
                break;
            default:
                n = fc
        }
        l = n.bind(null, t, l, e), n = void 0, !ys || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (n = !0), a ? n !== void 0 ? e.addEventListener(t, l, {
            capture: !0,
            passive: n
        }) : e.addEventListener(t, l, !0) : n !== void 0 ? e.addEventListener(t, l, {
            passive: n
        }) : e.addEventListener(t, l, !1)
    }

    function Fi(e, t, l, a, n) {
        var u = a;
        if ((t & 1) === 0 && (t & 2) === 0 && a !== null) e: for (;;) {
            if (a === null) return;
            var s = a.tag;
            if (s === 3 || s === 4) {
                var c = a.stateNode.containerInfo;
                if (c === n) break;
                if (s === 4)
                    for (s = a.return; s !== null;) {
                        var f = s.tag;
                        if ((f === 3 || f === 4) && s.stateNode.containerInfo === n) return;
                        s = s.return
                    }
                for (; c !== null;) {
                    if (s = na(c), s === null) return;
                    if (f = s.tag, f === 5 || f === 6 || f === 26 || f === 27) {
                        a = u = s;
                        continue e
                    }
                    c = c.parentNode
                }
            }
            a = a.return
        }
        Wc(function() {
            var S = u,
                A = hs(l),
                V = [];
            e: {
                var x = No.get(e);
                if (x !== void 0) {
                    var B = Wn,
                        k = e;
                    switch (e) {
                        case "keypress":
                            if (Jn(l) === 0) break e;
                        case "keydown":
                        case "keyup":
                            B = Vm;
                            break;
                        case "focusin":
                            k = "focus", B = bs;
                            break;
                        case "focusout":
                            k = "blur", B = bs;
                            break;
                        case "beforeblur":
                        case "afterblur":
                            B = bs;
                            break;
                        case "click":
                            if (l.button === 2) break e;
                        case "auxclick":
                        case "dblclick":
                        case "mousedown":
                        case "mousemove":
                        case "mouseup":
                        case "mouseout":
                        case "mouseover":
                        case "contextmenu":
                            B = Pc;
                            break;
                        case "drag":
                        case "dragend":
                        case "dragenter":
                        case "dragexit":
                        case "dragleave":
                        case "dragover":
                        case "dragstart":
                        case "drop":
                            B = pm;
                            break;
                        case "touchcancel":
                        case "touchend":
                        case "touchmove":
                        case "touchstart":
                            B = Om;
                            break;
                        case xo:
                        case Eo:
                        case Mo:
                            B = bm;
                            break;
                        case Bo:
                            B = Hm;
                            break;
                        case "scroll":
                        case "scrollend":
                            B = gm;
                            break;
                        case "wheel":
                            B = Rm;
                            break;
                        case "copy":
                        case "cut":
                        case "paste":
                            B = Em;
                            break;
                        case "gotpointercapture":
                        case "lostpointercapture":
                        case "pointercancel":
                        case "pointerdown":
                        case "pointermove":
                        case "pointerout":
                        case "pointerover":
                        case "pointerup":
                            B = to;
                            break;
                        case "toggle":
                        case "beforetoggle":
                            B = Lm
                    }
                    var ae = (t & 4) !== 0,
                        Re = !ae && (e === "scroll" || e === "scrollend"),
                        h = ae ? x !== null ? x + "Capture" : null : x;
                    ae = [];
                    for (var m = S, v; m !== null;) {
                        var C = m;
                        if (v = C.stateNode, C = C.tag, C !== 5 && C !== 26 && C !== 27 || v === null || h === null || (C = Ka(m, h), C != null && ae.push(Tn(m, C, v))), Re) break;
                        m = m.return
                    }
                    0 < ae.length && (x = new B(x, k, null, l, A), V.push({
                        event: x,
                        listeners: ae
                    }))
                }
            }
            if ((t & 7) === 0) {
                e: {
                    if (x = e === "mouseover" || e === "pointerover", B = e === "mouseout" || e === "pointerout", x && l !== ms && (k = l.relatedTarget || l.fromElement) && (na(k) || k[aa])) break e;
                    if ((B || x) && (x = A.window === A ? A : (x = A.ownerDocument) ? x.defaultView || x.parentWindow : window, B ? (k = l.relatedTarget || l.toElement, B = S, k = k ? na(k) : null, k !== null && (Re = M(k), ae = k.tag, k !== Re || ae !== 5 && ae !== 27 && ae !== 6) && (k = null)) : (B = null, k = S), B !== k)) {
                        if (ae = Pc, C = "onMouseLeave", h = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (ae = to, C = "onPointerLeave", h = "onPointerEnter", m = "pointer"), Re = B == null ? x : Za(B), v = k == null ? x : Za(k), x = new ae(C, m + "leave", B, l, A), x.target = Re, x.relatedTarget = v, C = null, na(A) === S && (ae = new ae(h, m + "enter", k, l, A), ae.target = v, ae.relatedTarget = Re, C = ae), Re = C, B && k) t: {
                            for (ae = U0, h = B, m = k, v = 0, C = h; C; C = ae(C)) v++;C = 0;
                            for (var P = m; P; P = ae(P)) C++;
                            for (; 0 < v - C;) h = ae(h),
                            v--;
                            for (; 0 < C - v;) m = ae(m),
                            C--;
                            for (; v--;) {
                                if (h === m || m !== null && h === m.alternate) {
                                    ae = h;
                                    break t
                                }
                                h = ae(h), m = ae(m)
                            }
                            ae = null
                        }
                        else ae = null;
                        B !== null && Jf(V, x, B, ae, !1), k !== null && Re !== null && Jf(V, Re, k, ae, !0)
                    }
                }
                e: {
                    if (x = S ? Za(S) : window, B = x.nodeName && x.nodeName.toLowerCase(), B === "select" || B === "input" && x.type === "file") var Ne = oo;
                    else if (io(x))
                        if (ro) Ne = Jm;
                        else {
                            Ne = Zm;
                            var I = km
                        }
                    else B = x.nodeName,
                    !B || B.toLowerCase() !== "input" || x.type !== "checkbox" && x.type !== "radio" ? S && ds(S.elementType) && (Ne = oo) : Ne = Km;
                    if (Ne && (Ne = Ne(e, S))) {
                        co(V, Ne, l, A);
                        break e
                    }
                    I && I(e, x, S),
                    e === "focusout" && S && x.type === "number" && S.memoizedProps.value != null && fs(x, "number", x.value)
                }
                switch (I = S ? Za(S) : window, e) {
                    case "focusin":
                        (io(I) || I.contentEditable === "true") && (ma = I, As = S, tn = null);
                        break;
                    case "focusout":
                        tn = As = ma = null;
                        break;
                    case "mousedown":
                        Ts = !0;
                        break;
                    case "contextmenu":
                    case "mouseup":
                    case "dragend":
                        Ts = !1, So(V, l, A);
                        break;
                    case "selectionchange":
                        if (Wm) break;
                    case "keydown":
                    case "keyup":
                        So(V, l, A)
                }
                var ge;
                if (Es) e: {
                    switch (e) {
                        case "compositionstart":
                            var be = "onCompositionStart";
                            break e;
                        case "compositionend":
                            be = "onCompositionEnd";
                            break e;
                        case "compositionupdate":
                            be = "onCompositionUpdate";
                            break e
                    }
                    be = void 0
                }
                else da ? uo(e, l) && (be = "onCompositionEnd") : e === "keydown" && l.keyCode === 229 && (be = "onCompositionStart");be && (lo && l.locale !== "ko" && (da || be !== "onCompositionStart" ? be === "onCompositionEnd" && da && (ge = Fc()) : (hl = A, ps = "value" in hl ? hl.value : hl.textContent, da = !0)), I = qu(S, be), 0 < I.length && (be = new eo(be, e, null, l, A), V.push({
                    event: be,
                    listeners: I
                }), ge ? be.data = ge : (ge = so(l), ge !== null && (be.data = ge)))),
                (ge = qm ? wm(e, l) : Ym(e, l)) && (be = qu(S, "onBeforeInput"), 0 < be.length && (I = new eo("onBeforeInput", "beforeinput", null, l, A), V.push({
                    event: I,
                    listeners: be
                }), I.data = ge)),
                z0(V, e, S, l, A)
            }
            Zf(V, t)
        })
    }

    function Tn(e, t, l) {
        return {
            instance: e,
            listener: t,
            currentTarget: l
        }
    }

    function qu(e, t) {
        for (var l = t + "Capture", a = []; e !== null;) {
            var n = e,
                u = n.stateNode;
            if (n = n.tag, n !== 5 && n !== 26 && n !== 27 || u === null || (n = Ka(e, l), n != null && a.unshift(Tn(e, n, u)), n = Ka(e, t), n != null && a.push(Tn(e, n, u))), e.tag === 3) return a;
            e = e.return
        }
        return []
    }

    function U0(e) {
        if (e === null) return null;
        do e = e.return; while (e && e.tag !== 5 && e.tag !== 27);
        return e || null
    }

    function Jf(e, t, l, a, n) {
        for (var u = t._reactName, s = []; l !== null && l !== a;) {
            var c = l,
                f = c.alternate,
                S = c.stateNode;
            if (c = c.tag, f !== null && f === a) break;
            c !== 5 && c !== 26 && c !== 27 || S === null || (f = S, n ? (S = Ka(l, u), S != null && s.unshift(Tn(l, S, f))) : n || (S = Ka(l, u), S != null && s.push(Tn(l, S, f)))), l = l.return
        }
        s.length !== 0 && e.push({
            event: t,
            listeners: s
        })
    }
    var L0 = /\r\n?/g,
        G0 = /\u0000|\uFFFD/g;

    function If(e) {
        return (typeof e == "string" ? e : "" + e).replace(L0, `
`).replace(G0, "")
    }

    function Wf(e, t) {
        return t = If(t), If(e) === t
    }

    function _e(e, t, l, a, n, u) {
        switch (l) {
            case "children":
                typeof a == "string" ? t === "body" || t === "textarea" && a === "" || oa(e, a) : (typeof a == "number" || typeof a == "bigint") && t !== "body" && oa(e, "" + a);
                break;
            case "className":
                Xn(e, "class", a);
                break;
            case "tabIndex":
                Xn(e, "tabindex", a);
                break;
            case "dir":
            case "role":
            case "viewBox":
            case "width":
            case "height":
                Xn(e, l, a);
                break;
            case "style":
                Jc(e, a, u);
                break;
            case "data":
                if (t !== "object") {
                    Xn(e, "data", a);
                    break
                }
            case "src":
            case "href":
                if (a === "" && (t !== "a" || l !== "href")) {
                    e.removeAttribute(l);
                    break
                }
                if (a == null || typeof a == "function" || typeof a == "symbol" || typeof a == "boolean") {
                    e.removeAttribute(l);
                    break
                }
                a = Zn("" + a), e.setAttribute(l, a);
                break;
            case "action":
            case "formAction":
                if (typeof a == "function") {
                    e.setAttribute(l, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
                    break
                } else typeof u == "function" && (l === "formAction" ? (t !== "input" && _e(e, t, "name", n.name, n, null), _e(e, t, "formEncType", n.formEncType, n, null), _e(e, t, "formMethod", n.formMethod, n, null), _e(e, t, "formTarget", n.formTarget, n, null)) : (_e(e, t, "encType", n.encType, n, null), _e(e, t, "method", n.method, n, null), _e(e, t, "target", n.target, n, null)));
                if (a == null || typeof a == "symbol" || typeof a == "boolean") {
                    e.removeAttribute(l);
                    break
                }
                a = Zn("" + a), e.setAttribute(l, a);
                break;
            case "onClick":
                a != null && (e.onclick = Jt);
                break;
            case "onScroll":
                a != null && ve("scroll", e);
                break;
            case "onScrollEnd":
                a != null && ve("scrollend", e);
                break;
            case "dangerouslySetInnerHTML":
                if (a != null) {
                    if (typeof a != "object" || !("__html" in a)) throw Error(r(61));
                    if (l = a.__html, l != null) {
                        if (n.children != null) throw Error(r(60));
                        e.innerHTML = l
                    }
                }
                break;
            case "multiple":
                e.multiple = a && typeof a != "function" && typeof a != "symbol";
                break;
            case "muted":
                e.muted = a && typeof a != "function" && typeof a != "symbol";
                break;
            case "suppressContentEditableWarning":
            case "suppressHydrationWarning":
            case "defaultValue":
            case "defaultChecked":
            case "innerHTML":
            case "ref":
                break;
            case "autoFocus":
                break;
            case "xlinkHref":
                if (a == null || typeof a == "function" || typeof a == "boolean" || typeof a == "symbol") {
                    e.removeAttribute("xlink:href");
                    break
                }
                l = Zn("" + a), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", l);
                break;
            case "contentEditable":
            case "spellCheck":
            case "draggable":
            case "value":
            case "autoReverse":
            case "externalResourcesRequired":
            case "focusable":
            case "preserveAlpha":
                a != null && typeof a != "function" && typeof a != "symbol" ? e.setAttribute(l, "" + a) : e.removeAttribute(l);
                break;
            case "inert":
            case "allowFullScreen":
            case "async":
            case "autoPlay":
            case "controls":
            case "default":
            case "defer":
            case "disabled":
            case "disablePictureInPicture":
            case "disableRemotePlayback":
            case "formNoValidate":
            case "hidden":
            case "loop":
            case "noModule":
            case "noValidate":
            case "open":
            case "playsInline":
            case "readOnly":
            case "required":
            case "reversed":
            case "scoped":
            case "seamless":
            case "itemScope":
                a && typeof a != "function" && typeof a != "symbol" ? e.setAttribute(l, "") : e.removeAttribute(l);
                break;
            case "capture":
            case "download":
                a === !0 ? e.setAttribute(l, "") : a !== !1 && a != null && typeof a != "function" && typeof a != "symbol" ? e.setAttribute(l, a) : e.removeAttribute(l);
                break;
            case "cols":
            case "rows":
            case "size":
            case "span":
                a != null && typeof a != "function" && typeof a != "symbol" && !isNaN(a) && 1 <= a ? e.setAttribute(l, a) : e.removeAttribute(l);
                break;
            case "rowSpan":
            case "start":
                a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a) ? e.removeAttribute(l) : e.setAttribute(l, a);
                break;
            case "popover":
                ve("beforetoggle", e), ve("toggle", e), Qn(e, "popover", a);
                break;
            case "xlinkActuate":
                Kt(e, "http://www.w3.org/1999/xlink", "xlink:actuate", a);
                break;
            case "xlinkArcrole":
                Kt(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", a);
                break;
            case "xlinkRole":
                Kt(e, "http://www.w3.org/1999/xlink", "xlink:role", a);
                break;
            case "xlinkShow":
                Kt(e, "http://www.w3.org/1999/xlink", "xlink:show", a);
                break;
            case "xlinkTitle":
                Kt(e, "http://www.w3.org/1999/xlink", "xlink:title", a);
                break;
            case "xlinkType":
                Kt(e, "http://www.w3.org/1999/xlink", "xlink:type", a);
                break;
            case "xmlBase":
                Kt(e, "http://www.w3.org/XML/1998/namespace", "xml:base", a);
                break;
            case "xmlLang":
                Kt(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", a);
                break;
            case "xmlSpace":
                Kt(e, "http://www.w3.org/XML/1998/namespace", "xml:space", a);
                break;
            case "is":
                Qn(e, "is", a);
                break;
            case "innerText":
            case "textContent":
                break;
            default:
                (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N") && (l = mm.get(l) || l, Qn(e, l, a))
        }
    }

    function $i(e, t, l, a, n, u) {
        switch (l) {
            case "style":
                Jc(e, a, u);
                break;
            case "dangerouslySetInnerHTML":
                if (a != null) {
                    if (typeof a != "object" || !("__html" in a)) throw Error(r(61));
                    if (l = a.__html, l != null) {
                        if (n.children != null) throw Error(r(60));
                        e.innerHTML = l
                    }
                }
                break;
            case "children":
                typeof a == "string" ? oa(e, a) : (typeof a == "number" || typeof a == "bigint") && oa(e, "" + a);
                break;
            case "onScroll":
                a != null && ve("scroll", e);
                break;
            case "onScrollEnd":
                a != null && ve("scrollend", e);
                break;
            case "onClick":
                a != null && (e.onclick = Jt);
                break;
            case "suppressContentEditableWarning":
            case "suppressHydrationWarning":
            case "innerHTML":
            case "ref":
                break;
            case "innerText":
            case "textContent":
                break;
            default:
                if (!Gc.hasOwnProperty(l)) e: {
                    if (l[0] === "o" && l[1] === "n" && (n = l.endsWith("Capture"), t = l.slice(2, n ? l.length - 7 : void 0), u = e[rt] || null, u = u != null ? u[l] : null, typeof u == "function" && e.removeEventListener(t, u, n), typeof a == "function")) {
                        typeof u != "function" && u !== null && (l in e ? e[l] = null : e.hasAttribute(l) && e.removeAttribute(l)), e.addEventListener(t, a, n);
                        break e
                    }
                    l in e ? e[l] = a : a === !0 ? e.setAttribute(l, "") : Qn(e, l, a)
                }
        }
    }

    function nt(e, t, l) {
        switch (t) {
            case "div":
            case "span":
            case "svg":
            case "path":
            case "a":
            case "g":
            case "p":
            case "li":
                break;
            case "img":
                ve("error", e), ve("load", e);
                var a = !1,
                    n = !1,
                    u;
                for (u in l)
                    if (l.hasOwnProperty(u)) {
                        var s = l[u];
                        if (s != null) switch (u) {
                            case "src":
                                a = !0;
                                break;
                            case "srcSet":
                                n = !0;
                                break;
                            case "children":
                            case "dangerouslySetInnerHTML":
                                throw Error(r(137, t));
                            default:
                                _e(e, t, u, s, l, null)
                        }
                    } n && _e(e, t, "srcSet", l.srcSet, l, null), a && _e(e, t, "src", l.src, l, null);
                return;
            case "input":
                ve("invalid", e);
                var c = u = s = n = null,
                    f = null,
                    S = null;
                for (a in l)
                    if (l.hasOwnProperty(a)) {
                        var A = l[a];
                        if (A != null) switch (a) {
                            case "name":
                                n = A;
                                break;
                            case "type":
                                s = A;
                                break;
                            case "checked":
                                f = A;
                                break;
                            case "defaultChecked":
                                S = A;
                                break;
                            case "value":
                                u = A;
                                break;
                            case "defaultValue":
                                c = A;
                                break;
                            case "children":
                            case "dangerouslySetInnerHTML":
                                if (A != null) throw Error(r(137, t));
                                break;
                            default:
                                _e(e, t, a, A, l, null)
                        }
                    } Xc(e, u, c, f, S, s, n, !1);
                return;
            case "select":
                ve("invalid", e), a = s = u = null;
                for (n in l)
                    if (l.hasOwnProperty(n) && (c = l[n], c != null)) switch (n) {
                        case "value":
                            u = c;
                            break;
                        case "defaultValue":
                            s = c;
                            break;
                        case "multiple":
                            a = c;
                        default:
                            _e(e, t, n, c, l, null)
                    }
                t = u, l = s, e.multiple = !!a, t != null ? ca(e, !!a, t, !1) : l != null && ca(e, !!a, l, !0);
                return;
            case "textarea":
                ve("invalid", e), u = n = a = null;
                for (s in l)
                    if (l.hasOwnProperty(s) && (c = l[s], c != null)) switch (s) {
                        case "value":
                            a = c;
                            break;
                        case "defaultValue":
                            n = c;
                            break;
                        case "children":
                            u = c;
                            break;
                        case "dangerouslySetInnerHTML":
                            if (c != null) throw Error(r(91));
                            break;
                        default:
                            _e(e, t, s, c, l, null)
                    }
                Zc(e, a, n, u);
                return;
            case "option":
                for (f in l)
                    if (l.hasOwnProperty(f) && (a = l[f], a != null)) switch (f) {
                        case "selected":
                            e.selected = a && typeof a != "function" && typeof a != "symbol";
                            break;
                        default:
                            _e(e, t, f, a, l, null)
                    }
                return;
            case "dialog":
                ve("beforetoggle", e), ve("toggle", e), ve("cancel", e), ve("close", e);
                break;
            case "iframe":
            case "object":
                ve("load", e);
                break;
            case "video":
            case "audio":
                for (a = 0; a < An.length; a++) ve(An[a], e);
                break;
            case "image":
                ve("error", e), ve("load", e);
                break;
            case "details":
                ve("toggle", e);
                break;
            case "embed":
            case "source":
            case "link":
                ve("error", e), ve("load", e);
            case "area":
            case "base":
            case "br":
            case "col":
            case "hr":
            case "keygen":
            case "meta":
            case "param":
            case "track":
            case "wbr":
            case "menuitem":
                for (S in l)
                    if (l.hasOwnProperty(S) && (a = l[S], a != null)) switch (S) {
                        case "children":
                        case "dangerouslySetInnerHTML":
                            throw Error(r(137, t));
                        default:
                            _e(e, t, S, a, l, null)
                    }
                return;
            default:
                if (ds(t)) {
                    for (A in l) l.hasOwnProperty(A) && (a = l[A], a !== void 0 && $i(e, t, A, a, l, void 0));
                    return
                }
        }
        for (c in l) l.hasOwnProperty(c) && (a = l[c], a != null && _e(e, t, c, a, l, null))
    }

    function q0(e, t, l, a) {
        switch (t) {
            case "div":
            case "span":
            case "svg":
            case "path":
            case "a":
            case "g":
            case "p":
            case "li":
                break;
            case "input":
                var n = null,
                    u = null,
                    s = null,
                    c = null,
                    f = null,
                    S = null,
                    A = null;
                for (B in l) {
                    var V = l[B];
                    if (l.hasOwnProperty(B) && V != null) switch (B) {
                        case "checked":
                            break;
                        case "value":
                            break;
                        case "defaultValue":
                            f = V;
                        default:
                            a.hasOwnProperty(B) || _e(e, t, B, null, a, V)
                    }
                }
                for (var x in a) {
                    var B = a[x];
                    if (V = l[x], a.hasOwnProperty(x) && (B != null || V != null)) switch (x) {
                        case "type":
                            u = B;
                            break;
                        case "name":
                            n = B;
                            break;
                        case "checked":
                            S = B;
                            break;
                        case "defaultChecked":
                            A = B;
                            break;
                        case "value":
                            s = B;
                            break;
                        case "defaultValue":
                            c = B;
                            break;
                        case "children":
                        case "dangerouslySetInnerHTML":
                            if (B != null) throw Error(r(137, t));
                            break;
                        default:
                            B !== V && _e(e, t, x, B, a, V)
                    }
                }
                rs(e, s, c, f, S, A, u, n);
                return;
            case "select":
                B = s = c = x = null;
                for (u in l)
                    if (f = l[u], l.hasOwnProperty(u) && f != null) switch (u) {
                        case "value":
                            break;
                        case "multiple":
                            B = f;
                        default:
                            a.hasOwnProperty(u) || _e(e, t, u, null, a, f)
                    }
                for (n in a)
                    if (u = a[n], f = l[n], a.hasOwnProperty(n) && (u != null || f != null)) switch (n) {
                        case "value":
                            x = u;
                            break;
                        case "defaultValue":
                            c = u;
                            break;
                        case "multiple":
                            s = u;
                        default:
                            u !== f && _e(e, t, n, u, a, f)
                    }
                t = c, l = s, a = B, x != null ? ca(e, !!l, x, !1) : !!a != !!l && (t != null ? ca(e, !!l, t, !0) : ca(e, !!l, l ? [] : "", !1));
                return;
            case "textarea":
                B = x = null;
                for (c in l)
                    if (n = l[c], l.hasOwnProperty(c) && n != null && !a.hasOwnProperty(c)) switch (c) {
                        case "value":
                            break;
                        case "children":
                            break;
                        default:
                            _e(e, t, c, null, a, n)
                    }
                for (s in a)
                    if (n = a[s], u = l[s], a.hasOwnProperty(s) && (n != null || u != null)) switch (s) {
                        case "value":
                            x = n;
                            break;
                        case "defaultValue":
                            B = n;
                            break;
                        case "children":
                            break;
                        case "dangerouslySetInnerHTML":
                            if (n != null) throw Error(r(91));
                            break;
                        default:
                            n !== u && _e(e, t, s, n, a, u)
                    }
                kc(e, x, B);
                return;
            case "option":
                for (var k in l)
                    if (x = l[k], l.hasOwnProperty(k) && x != null && !a.hasOwnProperty(k)) switch (k) {
                        case "selected":
                            e.selected = !1;
                            break;
                        default:
                            _e(e, t, k, null, a, x)
                    }
                for (f in a)
                    if (x = a[f], B = l[f], a.hasOwnProperty(f) && x !== B && (x != null || B != null)) switch (f) {
                        case "selected":
                            e.selected = x && typeof x != "function" && typeof x != "symbol";
                            break;
                        default:
                            _e(e, t, f, x, a, B)
                    }
                return;
            case "img":
            case "link":
            case "area":
            case "base":
            case "br":
            case "col":
            case "embed":
            case "hr":
            case "keygen":
            case "meta":
            case "param":
            case "source":
            case "track":
            case "wbr":
            case "menuitem":
                for (var ae in l) x = l[ae], l.hasOwnProperty(ae) && x != null && !a.hasOwnProperty(ae) && _e(e, t, ae, null, a, x);
                for (S in a)
                    if (x = a[S], B = l[S], a.hasOwnProperty(S) && x !== B && (x != null || B != null)) switch (S) {
                        case "children":
                        case "dangerouslySetInnerHTML":
                            if (x != null) throw Error(r(137, t));
                            break;
                        default:
                            _e(e, t, S, x, a, B)
                    }
                return;
            default:
                if (ds(t)) {
                    for (var Re in l) x = l[Re], l.hasOwnProperty(Re) && x !== void 0 && !a.hasOwnProperty(Re) && $i(e, t, Re, void 0, a, x);
                    for (A in a) x = a[A], B = l[A], !a.hasOwnProperty(A) || x === B || x === void 0 && B === void 0 || $i(e, t, A, x, a, B);
                    return
                }
        }
        for (var h in l) x = l[h], l.hasOwnProperty(h) && x != null && !a.hasOwnProperty(h) && _e(e, t, h, null, a, x);
        for (V in a) x = a[V], B = l[V], !a.hasOwnProperty(V) || x === B || x == null && B == null || _e(e, t, V, x, a, B)
    }

    function Ff(e) {
        switch (e) {
            case "css":
            case "script":
            case "font":
            case "img":
            case "image":
            case "input":
            case "link":
                return !0;
            default:
                return !1
        }
    }

    function w0() {
        if (typeof performance.getEntriesByType == "function") {
            for (var e = 0, t = 0, l = performance.getEntriesByType("resource"), a = 0; a < l.length; a++) {
                var n = l[a],
                    u = n.transferSize,
                    s = n.initiatorType,
                    c = n.duration;
                if (u && c && Ff(s)) {
                    for (s = 0, c = n.responseEnd, a += 1; a < l.length; a++) {
                        var f = l[a],
                            S = f.startTime;
                        if (S > c) break;
                        var A = f.transferSize,
                            V = f.initiatorType;
                        A && Ff(V) && (f = f.responseEnd, s += A * (f < c ? 1 : (c - S) / (f - S)))
                    }
                    if (--a, t += 8 * (u + s) / (n.duration / 1e3), e++, 10 < e) break
                }
            }
            if (0 < e) return t / e / 1e6
        }
        return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5
    }
    var Pi = null,
        ec = null;

    function wu(e) {
        return e.nodeType === 9 ? e : e.ownerDocument
    }

    function $f(e) {
        switch (e) {
            case "http://www.w3.org/2000/svg":
                return 1;
            case "http://www.w3.org/1998/Math/MathML":
                return 2;
            default:
                return 0
        }
    }

    function Pf(e, t) {
        if (e === 0) switch (t) {
            case "svg":
                return 1;
            case "math":
                return 2;
            default:
                return 0
        }
        return e === 1 && t === "foreignObject" ? 0 : e
    }

    function tc(e, t) {
        return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null
    }
    var lc = null;

    function Y0() {
        var e = window.event;
        return e && e.type === "popstate" ? e === lc ? !1 : (lc = e, !0) : (lc = null, !1)
    }
    var ed = typeof setTimeout == "function" ? setTimeout : void 0,
        Q0 = typeof clearTimeout == "function" ? clearTimeout : void 0,
        td = typeof Promise == "function" ? Promise : void 0,
        X0 = typeof queueMicrotask == "function" ? queueMicrotask : typeof td < "u" ? function(e) {
            return td.resolve(null).then(e).catch(k0)
        } : ed;

    function k0(e) {
        setTimeout(function() {
            throw e
        })
    }

    function Dl(e) {
        return e === "head"
    }

    function ld(e, t) {
        var l = t,
            a = 0;
        do {
            var n = l.nextSibling;
            if (e.removeChild(l), n && n.nodeType === 8)
                if (l = n.data, l === "/$" || l === "/&") {
                    if (a === 0) {
                        e.removeChild(n), qa(t);
                        return
                    }
                    a--
                } else if (l === "$" || l === "$?" || l === "$~" || l === "$!" || l === "&") a++;
            else if (l === "html") Cn(e.ownerDocument.documentElement);
            else if (l === "head") {
                l = e.ownerDocument.head, Cn(l);
                for (var u = l.firstChild; u;) {
                    var s = u.nextSibling,
                        c = u.nodeName;
                    u[ka] || c === "SCRIPT" || c === "STYLE" || c === "LINK" && u.rel.toLowerCase() === "stylesheet" || l.removeChild(u), u = s
                }
            } else l === "body" && Cn(e.ownerDocument.body);
            l = n
        } while (l);
        qa(t)
    }

    function ad(e, t) {
        var l = e;
        e = 0;
        do {
            var a = l.nextSibling;
            if (l.nodeType === 1 ? t ? (l._stashedDisplay = l.style.display, l.style.display = "none") : (l.style.display = l._stashedDisplay || "", l.getAttribute("style") === "" && l.removeAttribute("style")) : l.nodeType === 3 && (t ? (l._stashedText = l.nodeValue, l.nodeValue = "") : l.nodeValue = l._stashedText || ""), a && a.nodeType === 8)
                if (l = a.data, l === "/$") {
                    if (e === 0) break;
                    e--
                } else l !== "$" && l !== "$?" && l !== "$~" && l !== "$!" || e++;
            l = a
        } while (l)
    }

    function ac(e) {
        var t = e.firstChild;
        for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
            var l = t;
            switch (t = t.nextSibling, l.nodeName) {
                case "HTML":
                case "HEAD":
                case "BODY":
                    ac(l), cs(l);
                    continue;
                case "SCRIPT":
                case "STYLE":
                    continue;
                case "LINK":
                    if (l.rel.toLowerCase() === "stylesheet") continue
            }
            e.removeChild(l)
        }
    }

    function Z0(e, t, l, a) {
        for (; e.nodeType === 1;) {
            var n = l;
            if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
                if (!a && (e.nodeName !== "INPUT" || e.type !== "hidden")) break
            } else if (a) {
                if (!e[ka]) switch (t) {
                    case "meta":
                        if (!e.hasAttribute("itemprop")) break;
                        return e;
                    case "link":
                        if (u = e.getAttribute("rel"), u === "stylesheet" && e.hasAttribute("data-precedence")) break;
                        if (u !== n.rel || e.getAttribute("href") !== (n.href == null || n.href === "" ? null : n.href) || e.getAttribute("crossorigin") !== (n.crossOrigin == null ? null : n.crossOrigin) || e.getAttribute("title") !== (n.title == null ? null : n.title)) break;
                        return e;
                    case "style":
                        if (e.hasAttribute("data-precedence")) break;
                        return e;
                    case "script":
                        if (u = e.getAttribute("src"), (u !== (n.src == null ? null : n.src) || e.getAttribute("type") !== (n.type == null ? null : n.type) || e.getAttribute("crossorigin") !== (n.crossOrigin == null ? null : n.crossOrigin)) && u && e.hasAttribute("async") && !e.hasAttribute("itemprop")) break;
                        return e;
                    default:
                        return e
                }
            } else if (t === "input" && e.type === "hidden") {
                var u = n.name == null ? null : "" + n.name;
                if (n.type === "hidden" && e.getAttribute("name") === u) return e
            } else return e;
            if (e = Ut(e.nextSibling), e === null) break
        }
        return null
    }

    function K0(e, t, l) {
        if (t === "") return null;
        for (; e.nodeType !== 3;)
            if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !l || (e = Ut(e.nextSibling), e === null)) return null;
        return e
    }

    function nd(e, t) {
        for (; e.nodeType !== 8;)
            if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = Ut(e.nextSibling), e === null)) return null;
        return e
    }

    function nc(e) {
        return e.data === "$?" || e.data === "$~"
    }

    function uc(e) {
        return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading"
    }

    function J0(e, t) {
        var l = e.ownerDocument;
        if (e.data === "$~") e._reactRetry = t;
        else if (e.data !== "$?" || l.readyState !== "loading") t();
        else {
            var a = function() {
                t(), l.removeEventListener("DOMContentLoaded", a)
            };
            l.addEventListener("DOMContentLoaded", a), e._reactRetry = a
        }
    }

    function Ut(e) {
        for (; e != null; e = e.nextSibling) {
            var t = e.nodeType;
            if (t === 1 || t === 3) break;
            if (t === 8) {
                if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F") break;
                if (t === "/$" || t === "/&") return null
            }
        }
        return e
    }
    var sc = null;

    function ud(e) {
        e = e.nextSibling;
        for (var t = 0; e;) {
            if (e.nodeType === 8) {
                var l = e.data;
                if (l === "/$" || l === "/&") {
                    if (t === 0) return Ut(e.nextSibling);
                    t--
                } else l !== "$" && l !== "$!" && l !== "$?" && l !== "$~" && l !== "&" || t++
            }
            e = e.nextSibling
        }
        return null
    }

    function sd(e) {
        e = e.previousSibling;
        for (var t = 0; e;) {
            if (e.nodeType === 8) {
                var l = e.data;
                if (l === "$" || l === "$!" || l === "$?" || l === "$~" || l === "&") {
                    if (t === 0) return e;
                    t--
                } else l !== "/$" && l !== "/&" || t++
            }
            e = e.previousSibling
        }
        return null
    }

    function id(e, t, l) {
        switch (t = wu(l), e) {
            case "html":
                if (e = t.documentElement, !e) throw Error(r(452));
                return e;
            case "head":
                if (e = t.head, !e) throw Error(r(453));
                return e;
            case "body":
                if (e = t.body, !e) throw Error(r(454));
                return e;
            default:
                throw Error(r(451))
        }
    }

    function Cn(e) {
        for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
        cs(e)
    }
    var Lt = new Map,
        cd = new Set;

    function Yu(e) {
        return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument
    }
    var rl = H.d;
    H.d = {
        f: I0,
        r: W0,
        D: F0,
        C: $0,
        L: P0,
        m: eh,
        X: lh,
        S: th,
        M: ah
    };

    function I0() {
        var e = rl.f(),
            t = zu();
        return e || t
    }

    function W0(e) {
        var t = ua(e);
        t !== null && t.tag === 5 && t.type === "form" ? Br(t) : rl.r(e)
    }
    var Ua = typeof document > "u" ? null : document;

    function od(e, t, l) {
        var a = Ua;
        if (a && typeof t == "string" && t) {
            var n = jt(t);
            n = 'link[rel="' + e + '"][href="' + n + '"]', typeof l == "string" && (n += '[crossorigin="' + l + '"]'), cd.has(n) || (cd.add(n), e = {
                rel: e,
                crossOrigin: l,
                href: t
            }, a.querySelector(n) === null && (t = a.createElement("link"), nt(t, "link", e), Fe(t), a.head.appendChild(t)))
        }
    }

    function F0(e) {
        rl.D(e), od("dns-prefetch", e, null)
    }

    function $0(e, t) {
        rl.C(e, t), od("preconnect", e, t)
    }

    function P0(e, t, l) {
        rl.L(e, t, l);
        var a = Ua;
        if (a && e && t) {
            var n = 'link[rel="preload"][as="' + jt(t) + '"]';
            t === "image" && l && l.imageSrcSet ? (n += '[imagesrcset="' + jt(l.imageSrcSet) + '"]', typeof l.imageSizes == "string" && (n += '[imagesizes="' + jt(l.imageSizes) + '"]')) : n += '[href="' + jt(e) + '"]';
            var u = n;
            switch (t) {
                case "style":
                    u = La(e);
                    break;
                case "script":
                    u = Ga(e)
            }
            Lt.has(u) || (e = _({
                rel: "preload",
                href: t === "image" && l && l.imageSrcSet ? void 0 : e,
                as: t
            }, l), Lt.set(u, e), a.querySelector(n) !== null || t === "style" && a.querySelector(Vn(u)) || t === "script" && a.querySelector(jn(u)) || (t = a.createElement("link"), nt(t, "link", e), Fe(t), a.head.appendChild(t)))
        }
    }

    function eh(e, t) {
        rl.m(e, t);
        var l = Ua;
        if (l && e) {
            var a = t && typeof t.as == "string" ? t.as : "script",
                n = 'link[rel="modulepreload"][as="' + jt(a) + '"][href="' + jt(e) + '"]',
                u = n;
            switch (a) {
                case "audioworklet":
                case "paintworklet":
                case "serviceworker":
                case "sharedworker":
                case "worker":
                case "script":
                    u = Ga(e)
            }
            if (!Lt.has(u) && (e = _({
                    rel: "modulepreload",
                    href: e
                }, t), Lt.set(u, e), l.querySelector(n) === null)) {
                switch (a) {
                    case "audioworklet":
                    case "paintworklet":
                    case "serviceworker":
                    case "sharedworker":
                    case "worker":
                    case "script":
                        if (l.querySelector(jn(u))) return
                }
                a = l.createElement("link"), nt(a, "link", e), Fe(a), l.head.appendChild(a)
            }
        }
    }

    function th(e, t, l) {
        rl.S(e, t, l);
        var a = Ua;
        if (a && e) {
            var n = sa(a).hoistableStyles,
                u = La(e);
            t = t || "default";
            var s = n.get(u);
            if (!s) {
                var c = {
                    loading: 0,
                    preload: null
                };
                if (s = a.querySelector(Vn(u))) c.loading = 5;
                else {
                    e = _({
                        rel: "stylesheet",
                        href: e,
                        "data-precedence": t
                    }, l), (l = Lt.get(u)) && ic(e, l);
                    var f = s = a.createElement("link");
                    Fe(f), nt(f, "link", e), f._p = new Promise(function(S, A) {
                        f.onload = S, f.onerror = A
                    }), f.addEventListener("load", function() {
                        c.loading |= 1
                    }), f.addEventListener("error", function() {
                        c.loading |= 2
                    }), c.loading |= 4, Qu(s, t, a)
                }
                s = {
                    type: "stylesheet",
                    instance: s,
                    count: 1,
                    state: c
                }, n.set(u, s)
            }
        }
    }

    function lh(e, t) {
        rl.X(e, t);
        var l = Ua;
        if (l && e) {
            var a = sa(l).hoistableScripts,
                n = Ga(e),
                u = a.get(n);
            u || (u = l.querySelector(jn(n)), u || (e = _({
                src: e,
                async: !0
            }, t), (t = Lt.get(n)) && cc(e, t), u = l.createElement("script"), Fe(u), nt(u, "link", e), l.head.appendChild(u)), u = {
                type: "script",
                instance: u,
                count: 1,
                state: null
            }, a.set(n, u))
        }
    }

    function ah(e, t) {
        rl.M(e, t);
        var l = Ua;
        if (l && e) {
            var a = sa(l).hoistableScripts,
                n = Ga(e),
                u = a.get(n);
            u || (u = l.querySelector(jn(n)), u || (e = _({
                src: e,
                async: !0,
                type: "module"
            }, t), (t = Lt.get(n)) && cc(e, t), u = l.createElement("script"), Fe(u), nt(u, "link", e), l.head.appendChild(u)), u = {
                type: "script",
                instance: u,
                count: 1,
                state: null
            }, a.set(n, u))
        }
    }

    function rd(e, t, l, a) {
        var n = (n = ye.current) ? Yu(n) : null;
        if (!n) throw Error(r(446));
        switch (e) {
            case "meta":
            case "title":
                return null;
            case "style":
                return typeof l.precedence == "string" && typeof l.href == "string" ? (t = La(l.href), l = sa(n).hoistableStyles, a = l.get(t), a || (a = {
                    type: "style",
                    instance: null,
                    count: 0,
                    state: null
                }, l.set(t, a)), a) : {
                    type: "void",
                    instance: null,
                    count: 0,
                    state: null
                };
            case "link":
                if (l.rel === "stylesheet" && typeof l.href == "string" && typeof l.precedence == "string") {
                    e = La(l.href);
                    var u = sa(n).hoistableStyles,
                        s = u.get(e);
                    if (s || (n = n.ownerDocument || n, s = {
                            type: "stylesheet",
                            instance: null,
                            count: 0,
                            state: {
                                loading: 0,
                                preload: null
                            }
                        }, u.set(e, s), (u = n.querySelector(Vn(e))) && !u._p && (s.instance = u, s.state.loading = 5), Lt.has(e) || (l = {
                            rel: "preload",
                            as: "style",
                            href: l.href,
                            crossOrigin: l.crossOrigin,
                            integrity: l.integrity,
                            media: l.media,
                            hrefLang: l.hrefLang,
                            referrerPolicy: l.referrerPolicy
                        }, Lt.set(e, l), u || nh(n, e, l, s.state))), t && a === null) throw Error(r(528, ""));
                    return s
                }
                if (t && a !== null) throw Error(r(529, ""));
                return null;
            case "script":
                return t = l.async, l = l.src, typeof l == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Ga(l), l = sa(n).hoistableScripts, a = l.get(t), a || (a = {
                    type: "script",
                    instance: null,
                    count: 0,
                    state: null
                }, l.set(t, a)), a) : {
                    type: "void",
                    instance: null,
                    count: 0,
                    state: null
                };
            default:
                throw Error(r(444, e))
        }
    }

    function La(e) {
        return 'href="' + jt(e) + '"'
    }

    function Vn(e) {
        return 'link[rel="stylesheet"][' + e + "]"
    }

    function fd(e) {
        return _({}, e, {
            "data-precedence": e.precedence,
            precedence: null
        })
    }

    function nh(e, t, l, a) {
        e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? a.loading = 1 : (t = e.createElement("link"), a.preload = t, t.addEventListener("load", function() {
            return a.loading |= 1
        }), t.addEventListener("error", function() {
            return a.loading |= 2
        }), nt(t, "link", l), Fe(t), e.head.appendChild(t))
    }

    function Ga(e) {
        return '[src="' + jt(e) + '"]'
    }

    function jn(e) {
        return "script[async]" + e
    }

    function dd(e, t, l) {
        if (t.count++, t.instance === null) switch (t.type) {
            case "style":
                var a = e.querySelector('style[data-href~="' + jt(l.href) + '"]');
                if (a) return t.instance = a, Fe(a), a;
                var n = _({}, l, {
                    "data-href": l.href,
                    "data-precedence": l.precedence,
                    href: null,
                    precedence: null
                });
                return a = (e.ownerDocument || e).createElement("style"), Fe(a), nt(a, "style", n), Qu(a, l.precedence, e), t.instance = a;
            case "stylesheet":
                n = La(l.href);
                var u = e.querySelector(Vn(n));
                if (u) return t.state.loading |= 4, t.instance = u, Fe(u), u;
                a = fd(l), (n = Lt.get(n)) && ic(a, n), u = (e.ownerDocument || e).createElement("link"), Fe(u);
                var s = u;
                return s._p = new Promise(function(c, f) {
                    s.onload = c, s.onerror = f
                }), nt(u, "link", a), t.state.loading |= 4, Qu(u, l.precedence, e), t.instance = u;
            case "script":
                return u = Ga(l.src), (n = e.querySelector(jn(u))) ? (t.instance = n, Fe(n), n) : (a = l, (n = Lt.get(u)) && (a = _({}, l), cc(a, n)), e = e.ownerDocument || e, n = e.createElement("script"), Fe(n), nt(n, "link", a), e.head.appendChild(n), t.instance = n);
            case "void":
                return null;
            default:
                throw Error(r(443, t.type))
        } else t.type === "stylesheet" && (t.state.loading & 4) === 0 && (a = t.instance, t.state.loading |= 4, Qu(a, l.precedence, e));
        return t.instance
    }

    function Qu(e, t, l) {
        for (var a = l.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'), n = a.length ? a[a.length - 1] : null, u = n, s = 0; s < a.length; s++) {
            var c = a[s];
            if (c.dataset.precedence === t) u = c;
            else if (u !== n) break
        }
        u ? u.parentNode.insertBefore(e, u.nextSibling) : (t = l.nodeType === 9 ? l.head : l, t.insertBefore(e, t.firstChild))
    }

    function ic(e, t) {
        e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title)
    }

    function cc(e, t) {
        e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity)
    }
    var Xu = null;

    function md(e, t, l) {
        if (Xu === null) {
            var a = new Map,
                n = Xu = new Map;
            n.set(l, a)
        } else n = Xu, a = n.get(l), a || (a = new Map, n.set(l, a));
        if (a.has(e)) return a;
        for (a.set(e, null), l = l.getElementsByTagName(e), n = 0; n < l.length; n++) {
            var u = l[n];
            if (!(u[ka] || u[et] || e === "link" && u.getAttribute("rel") === "stylesheet") && u.namespaceURI !== "http://www.w3.org/2000/svg") {
                var s = u.getAttribute(t) || "";
                s = e + s;
                var c = a.get(s);
                c ? c.push(u) : a.set(s, [u])
            }
        }
        return a
    }

    function hd(e, t, l) {
        e = e.ownerDocument || e, e.head.insertBefore(l, t === "title" ? e.querySelector("head > title") : null)
    }

    function uh(e, t, l) {
        if (l === 1 || t.itemProp != null) return !1;
        switch (e) {
            case "meta":
            case "title":
                return !0;
            case "style":
                if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") break;
                return !0;
            case "link":
                if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) break;
                switch (t.rel) {
                    case "stylesheet":
                        return e = t.disabled, typeof t.precedence == "string" && e == null;
                    default:
                        return !0
                }
            case "script":
                if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string") return !0
        }
        return !1
    }

    function gd(e) {
        return !(e.type === "stylesheet" && (e.state.loading & 3) === 0)
    }

    function sh(e, t, l, a) {
        if (l.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (l.state.loading & 4) === 0) {
            if (l.instance === null) {
                var n = La(a.href),
                    u = t.querySelector(Vn(n));
                if (u) {
                    t = u._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = ku.bind(e), t.then(e, e)), l.state.loading |= 4, l.instance = u, Fe(u);
                    return
                }
                u = t.ownerDocument || t, a = fd(a), (n = Lt.get(n)) && ic(a, n), u = u.createElement("link"), Fe(u);
                var s = u;
                s._p = new Promise(function(c, f) {
                    s.onload = c, s.onerror = f
                }), nt(u, "link", a), l.instance = u
            }
            e.stylesheets === null && (e.stylesheets = new Map), e.stylesheets.set(l, t), (t = l.state.preload) && (l.state.loading & 3) === 0 && (e.count++, l = ku.bind(e), t.addEventListener("load", l), t.addEventListener("error", l))
        }
    }
    var oc = 0;

    function ih(e, t) {
        return e.stylesheets && e.count === 0 && Ku(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(l) {
            var a = setTimeout(function() {
                if (e.stylesheets && Ku(e, e.stylesheets), e.unsuspend) {
                    var u = e.unsuspend;
                    e.unsuspend = null, u()
                }
            }, 6e4 + t);
            0 < e.imgBytes && oc === 0 && (oc = 62500 * w0());
            var n = setTimeout(function() {
                if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Ku(e, e.stylesheets), e.unsuspend)) {
                    var u = e.unsuspend;
                    e.unsuspend = null, u()
                }
            }, (e.imgBytes > oc ? 50 : 800) + t);
            return e.unsuspend = l,
                function() {
                    e.unsuspend = null, clearTimeout(a), clearTimeout(n)
                }
        } : null
    }

    function ku() {
        if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
            if (this.stylesheets) Ku(this, this.stylesheets);
            else if (this.unsuspend) {
                var e = this.unsuspend;
                this.unsuspend = null, e()
            }
        }
    }
    var Zu = null;

    function Ku(e, t) {
        e.stylesheets = null, e.unsuspend !== null && (e.count++, Zu = new Map, t.forEach(ch, e), Zu = null, ku.call(e))
    }

    function ch(e, t) {
        if (!(t.state.loading & 4)) {
            var l = Zu.get(e);
            if (l) var a = l.get(null);
            else {
                l = new Map, Zu.set(e, l);
                for (var n = e.querySelectorAll("link[data-precedence],style[data-precedence]"), u = 0; u < n.length; u++) {
                    var s = n[u];
                    (s.nodeName === "LINK" || s.getAttribute("media") !== "not all") && (l.set(s.dataset.precedence, s), a = s)
                }
                a && l.set(null, a)
            }
            n = t.instance, s = n.getAttribute("data-precedence"), u = l.get(s) || a, u === a && l.set(null, n), l.set(s, n), this.count++, a = ku.bind(this), n.addEventListener("load", a), n.addEventListener("error", a), u ? u.parentNode.insertBefore(n, u.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(n, e.firstChild)), t.state.loading |= 4
        }
    }
    var Dn = {
        $$typeof: U,
        Provider: null,
        Consumer: null,
        _currentValue: J,
        _currentValue2: J,
        _threadCount: 0
    };

    function oh(e, t, l, a, n, u, s, c, f) {
        this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = ns(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = ns(0), this.hiddenUpdates = ns(null), this.identifierPrefix = a, this.onUncaughtError = n, this.onCaughtError = u, this.onRecoverableError = s, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = f, this.incompleteTransitions = new Map
    }

    function yd(e, t, l, a, n, u, s, c, f, S, A, V) {
        return e = new oh(e, t, l, s, f, S, A, V, c), t = 1, u === !0 && (t |= 24), u = bt(3, null, null, t), e.current = u, u.stateNode = e, t = Ys(), t.refCount++, e.pooledCache = t, t.refCount++, u.memoizedState = {
            element: a,
            isDehydrated: l,
            cache: t
        }, Zs(u), e
    }

    function pd(e) {
        return e ? (e = ya, e) : ya
    }

    function vd(e, t, l, a, n, u) {
        n = pd(n), a.context === null ? a.context = n : a.pendingContext = n, a = bl(t), a.payload = {
            element: l
        }, u = u === void 0 ? null : u, u !== null && (a.callback = u), l = xl(e, a, t), l !== null && (yt(l, e, t), on(l, e, t))
    }

    function Sd(e, t) {
        if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
            var l = e.retryLane;
            e.retryLane = l !== 0 && l < t ? l : t
        }
    }

    function rc(e, t) {
        Sd(e, t), (e = e.alternate) && Sd(e, t)
    }

    function bd(e) {
        if (e.tag === 13 || e.tag === 31) {
            var t = Ql(e, 67108864);
            t !== null && yt(t, e, 67108864), rc(e, 67108864)
        }
    }

    function xd(e) {
        if (e.tag === 13 || e.tag === 31) {
            var t = Nt();
            t = us(t);
            var l = Ql(e, t);
            l !== null && yt(l, e, t), rc(e, t)
        }
    }
    var Ju = !0;

    function rh(e, t, l, a) {
        var n = p.T;
        p.T = null;
        var u = H.p;
        try {
            H.p = 2, fc(e, t, l, a)
        } finally {
            H.p = u, p.T = n
        }
    }

    function fh(e, t, l, a) {
        var n = p.T;
        p.T = null;
        var u = H.p;
        try {
            H.p = 8, fc(e, t, l, a)
        } finally {
            H.p = u, p.T = n
        }
    }

    function fc(e, t, l, a) {
        if (Ju) {
            var n = dc(a);
            if (n === null) Fi(e, t, a, Iu, l), Md(e, a);
            else if (mh(n, e, t, l, a)) a.stopPropagation();
            else if (Md(e, a), t & 4 && -1 < dh.indexOf(e)) {
                for (; n !== null;) {
                    var u = ua(n);
                    if (u !== null) switch (u.tag) {
                        case 3:
                            if (u = u.stateNode, u.current.memoizedState.isDehydrated) {
                                var s = Ll(u.pendingLanes);
                                if (s !== 0) {
                                    var c = u;
                                    for (c.pendingLanes |= 2, c.entangledLanes |= 2; s;) {
                                        var f = 1 << 31 - vt(s);
                                        c.entanglements[1] |= f, s &= ~f
                                    }
                                    Zt(u), (Ve & 6) === 0 && (Du = ut() + 500, Nn(0))
                                }
                            }
                            break;
                        case 31:
                        case 13:
                            c = Ql(u, 2), c !== null && yt(c, u, 2), zu(), rc(u, 2)
                    }
                    if (u = dc(a), u === null && Fi(e, t, a, Iu, l), u === n) break;
                    n = u
                }
                n !== null && a.stopPropagation()
            } else Fi(e, t, a, null, l)
        }
    }

    function dc(e) {
        return e = hs(e), mc(e)
    }
    var Iu = null;

    function mc(e) {
        if (Iu = null, e = na(e), e !== null) {
            var t = M(e);
            if (t === null) e = null;
            else {
                var l = t.tag;
                if (l === 13) {
                    if (e = D(t), e !== null) return e;
                    e = null
                } else if (l === 31) {
                    if (e = O(t), e !== null) return e;
                    e = null
                } else if (l === 3) {
                    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
                    e = null
                } else t !== e && (e = null)
            }
        }
        return Iu = e, null
    }

    function Ed(e) {
        switch (e) {
            case "beforetoggle":
            case "cancel":
            case "click":
            case "close":
            case "contextmenu":
            case "copy":
            case "cut":
            case "auxclick":
            case "dblclick":
            case "dragend":
            case "dragstart":
            case "drop":
            case "focusin":
            case "focusout":
            case "input":
            case "invalid":
            case "keydown":
            case "keypress":
            case "keyup":
            case "mousedown":
            case "mouseup":
            case "paste":
            case "pause":
            case "play":
            case "pointercancel":
            case "pointerdown":
            case "pointerup":
            case "ratechange":
            case "reset":
            case "resize":
            case "seeked":
            case "submit":
            case "toggle":
            case "touchcancel":
            case "touchend":
            case "touchstart":
            case "volumechange":
            case "change":
            case "selectionchange":
            case "textInput":
            case "compositionstart":
            case "compositionend":
            case "compositionupdate":
            case "beforeblur":
            case "afterblur":
            case "beforeinput":
            case "blur":
            case "fullscreenchange":
            case "focus":
            case "hashchange":
            case "popstate":
            case "select":
            case "selectstart":
                return 2;
            case "drag":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "mousemove":
            case "mouseout":
            case "mouseover":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "scroll":
            case "touchmove":
            case "wheel":
            case "mouseenter":
            case "mouseleave":
            case "pointerenter":
            case "pointerleave":
                return 8;
            case "message":
                switch (Fd()) {
                    case Cc:
                        return 2;
                    case Vc:
                        return 8;
                    case Ln:
                    case $d:
                        return 32;
                    case jc:
                        return 268435456;
                    default:
                        return 32
                }
            default:
                return 32
        }
    }
    var hc = !1,
        Ol = null,
        zl = null,
        Hl = null,
        On = new Map,
        zn = new Map,
        _l = [],
        dh = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");

    function Md(e, t) {
        switch (e) {
            case "focusin":
            case "focusout":
                Ol = null;
                break;
            case "dragenter":
            case "dragleave":
                zl = null;
                break;
            case "mouseover":
            case "mouseout":
                Hl = null;
                break;
            case "pointerover":
            case "pointerout":
                On.delete(t.pointerId);
                break;
            case "gotpointercapture":
            case "lostpointercapture":
                zn.delete(t.pointerId)
        }
    }

    function Hn(e, t, l, a, n, u) {
        return e === null || e.nativeEvent !== u ? (e = {
            blockedOn: t,
            domEventName: l,
            eventSystemFlags: a,
            nativeEvent: u,
            targetContainers: [n]
        }, t !== null && (t = ua(t), t !== null && bd(t)), e) : (e.eventSystemFlags |= a, t = e.targetContainers, n !== null && t.indexOf(n) === -1 && t.push(n), e)
    }

    function mh(e, t, l, a, n) {
        switch (t) {
            case "focusin":
                return Ol = Hn(Ol, e, t, l, a, n), !0;
            case "dragenter":
                return zl = Hn(zl, e, t, l, a, n), !0;
            case "mouseover":
                return Hl = Hn(Hl, e, t, l, a, n), !0;
            case "pointerover":
                var u = n.pointerId;
                return On.set(u, Hn(On.get(u) || null, e, t, l, a, n)), !0;
            case "gotpointercapture":
                return u = n.pointerId, zn.set(u, Hn(zn.get(u) || null, e, t, l, a, n)), !0
        }
        return !1
    }

    function Bd(e) {
        var t = na(e.target);
        if (t !== null) {
            var l = M(t);
            if (l !== null) {
                if (t = l.tag, t === 13) {
                    if (t = D(l), t !== null) {
                        e.blockedOn = t, Rc(e.priority, function() {
                            xd(l)
                        });
                        return
                    }
                } else if (t === 31) {
                    if (t = O(l), t !== null) {
                        e.blockedOn = t, Rc(e.priority, function() {
                            xd(l)
                        });
                        return
                    }
                } else if (t === 3 && l.stateNode.current.memoizedState.isDehydrated) {
                    e.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
                    return
                }
            }
        }
        e.blockedOn = null
    }

    function Wu(e) {
        if (e.blockedOn !== null) return !1;
        for (var t = e.targetContainers; 0 < t.length;) {
            var l = dc(e.nativeEvent);
            if (l === null) {
                l = e.nativeEvent;
                var a = new l.constructor(l.type, l);
                ms = a, l.target.dispatchEvent(a), ms = null
            } else return t = ua(l), t !== null && bd(t), e.blockedOn = l, !1;
            t.shift()
        }
        return !0
    }

    function Nd(e, t, l) {
        Wu(e) && l.delete(t)
    }

    function hh() {
        hc = !1, Ol !== null && Wu(Ol) && (Ol = null), zl !== null && Wu(zl) && (zl = null), Hl !== null && Wu(Hl) && (Hl = null), On.forEach(Nd), zn.forEach(Nd)
    }

    function Fu(e, t) {
        e.blockedOn === t && (e.blockedOn = null, hc || (hc = !0, o.unstable_scheduleCallback(o.unstable_NormalPriority, hh)))
    }
    var $u = null;

    function Ad(e) {
        $u !== e && ($u = e, o.unstable_scheduleCallback(o.unstable_NormalPriority, function() {
            $u === e && ($u = null);
            for (var t = 0; t < e.length; t += 3) {
                var l = e[t],
                    a = e[t + 1],
                    n = e[t + 2];
                if (typeof a != "function") {
                    if (mc(a || l) === null) continue;
                    break
                }
                var u = ua(l);
                u !== null && (e.splice(t, 3), t -= 3, di(u, {
                    pending: !0,
                    data: n,
                    method: l.method,
                    action: a
                }, a, n))
            }
        }))
    }

    function qa(e) {
        function t(f) {
            return Fu(f, e)
        }
        Ol !== null && Fu(Ol, e), zl !== null && Fu(zl, e), Hl !== null && Fu(Hl, e), On.forEach(t), zn.forEach(t);
        for (var l = 0; l < _l.length; l++) {
            var a = _l[l];
            a.blockedOn === e && (a.blockedOn = null)
        }
        for (; 0 < _l.length && (l = _l[0], l.blockedOn === null);) Bd(l), l.blockedOn === null && _l.shift();
        if (l = (e.ownerDocument || e).$$reactFormReplay, l != null)
            for (a = 0; a < l.length; a += 3) {
                var n = l[a],
                    u = l[a + 1],
                    s = n[rt] || null;
                if (typeof u == "function") s || Ad(l);
                else if (s) {
                    var c = null;
                    if (u && u.hasAttribute("formAction")) {
                        if (n = u, s = u[rt] || null) c = s.formAction;
                        else if (mc(n) !== null) continue
                    } else c = s.action;
                    typeof c == "function" ? l[a + 1] = c : (l.splice(a, 3), a -= 3), Ad(l)
                }
            }
    }

    function Td() {
        function e(u) {
            u.canIntercept && u.info === "react-transition" && u.intercept({
                handler: function() {
                    return new Promise(function(s) {
                        return n = s
                    })
                },
                focusReset: "manual",
                scroll: "manual"
            })
        }

        function t() {
            n !== null && (n(), n = null), a || setTimeout(l, 20)
        }

        function l() {
            if (!a && !navigation.transition) {
                var u = navigation.currentEntry;
                u && u.url != null && navigation.navigate(u.url, {
                    state: u.getState(),
                    info: "react-transition",
                    history: "replace"
                })
            }
        }
        if (typeof navigation == "object") {
            var a = !1,
                n = null;
            return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(l, 100),
                function() {
                    a = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), n !== null && (n(), n = null)
                }
        }
    }

    function gc(e) {
        this._internalRoot = e
    }
    Pu.prototype.render = gc.prototype.render = function(e) {
        var t = this._internalRoot;
        if (t === null) throw Error(r(409));
        var l = t.current,
            a = Nt();
        vd(l, a, e, t, null, null)
    }, Pu.prototype.unmount = gc.prototype.unmount = function() {
        var e = this._internalRoot;
        if (e !== null) {
            this._internalRoot = null;
            var t = e.containerInfo;
            vd(e.current, 2, null, e, null, null), zu(), t[aa] = null
        }
    };

    function Pu(e) {
        this._internalRoot = e
    }
    Pu.prototype.unstable_scheduleHydration = function(e) {
        if (e) {
            var t = _c();
            e = {
                blockedOn: null,
                target: e,
                priority: t
            };
            for (var l = 0; l < _l.length && t !== 0 && t < _l[l].priority; l++);
            _l.splice(l, 0, e), l === 0 && Bd(e)
        }
    };
    var Cd = g.version;
    if (Cd !== "19.2.3") throw Error(r(527, Cd, "19.2.3"));
    H.findDOMNode = function(e) {
        var t = e._reactInternals;
        if (t === void 0) throw typeof e.render == "function" ? Error(r(188)) : (e = Object.keys(e).join(","), Error(r(268, e)));
        return e = y(t), e = e !== null ? R(e) : null, e = e === null ? null : e.stateNode, e
    };
    var gh = {
        bundleType: 0,
        version: "19.2.3",
        rendererPackageName: "react-dom",
        currentDispatcherRef: p,
        reconcilerVersion: "19.2.3"
    };
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
        var es = __REACT_DEVTOOLS_GLOBAL_HOOK__;
        if (!es.isDisabled && es.supportsFiber) try {
            Ya = es.inject(gh), pt = es
        } catch {}
    }
    return Rn.createRoot = function(e, t) {
        if (!E(e)) throw Error(r(299));
        var l = !1,
            a = "",
            n = Hr,
            u = _r,
            s = Rr;
        return t != null && (t.unstable_strictMode === !0 && (l = !0), t.identifierPrefix !== void 0 && (a = t.identifierPrefix), t.onUncaughtError !== void 0 && (n = t.onUncaughtError), t.onCaughtError !== void 0 && (u = t.onCaughtError), t.onRecoverableError !== void 0 && (s = t.onRecoverableError)), t = yd(e, 1, !1, null, null, l, a, null, n, u, s, Td), e[aa] = t.current, Wi(e), new gc(t)
    }, Rn.hydrateRoot = function(e, t, l) {
        if (!E(e)) throw Error(r(299));
        var a = !1,
            n = "",
            u = Hr,
            s = _r,
            c = Rr,
            f = null;
        return l != null && (l.unstable_strictMode === !0 && (a = !0), l.identifierPrefix !== void 0 && (n = l.identifierPrefix), l.onUncaughtError !== void 0 && (u = l.onUncaughtError), l.onCaughtError !== void 0 && (s = l.onCaughtError), l.onRecoverableError !== void 0 && (c = l.onRecoverableError), l.formState !== void 0 && (f = l.formState)), t = yd(e, 1, !0, t, l ?? null, a, n, f, u, s, c, Td), t.context = pd(null), l = t.current, a = Nt(), a = us(a), n = bl(a), n.callback = null, xl(l, n, a), l = a, t.current.lanes = l, Xa(t, l), Zt(t), e[aa] = t.current, Wi(e), new Pu(t)
    }, Rn.version = "19.2.3", Rn
}
var Ld;

function Nh() {
    if (Ld) return vc.exports;
    Ld = 1;

    function o() {
        if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(o)
        } catch (g) {
            console.error(g)
        }
    }
    return o(), vc.exports = Bh(), vc.exports
}
var Ah = Nh(),
    Gd = {},
    Th = "@vercel/analytics",
    Ch = "1.6.1",
    Vh = () => {
        window.va || (window.va = function(...g) {
            (window.vaq = window.vaq || []).push(g)
        })
    };

function kd() {
    return typeof window < "u"
}

function Zd() {
    try {
        const o = "production"
    } catch {}
    return "production"
}

function jh(o = "auto") {
    if (o === "auto") {
        window.vam = Zd();
        return
    }
    window.vam = o
}

function Dh() {
    return (kd() ? window.vam : Zd()) || "production"
}

function Bc() {
    return Dh() === "development"
}

function Oh(o) {
    return o.scriptSrc ? o.scriptSrc : Bc() ? "https://va.vercel-scripts.com/v1/script.debug.js" : o.basePath ? `${o.basePath}/insights/script.js` : "/_vercel/insights/script.js"
}

function zh(o = {
    debug: !0
}) {
    var g;
    if (!kd()) return;
    jh(o.mode), Vh(), o.beforeSend && ((g = window.va) == null || g.call(window, "beforeSend", o.beforeSend));
    const j = Oh(o);
    if (document.head.querySelector(`script[src*="${j}"]`)) return;
    const r = document.createElement("script");
    r.src = j, r.defer = !0, r.dataset.sdkn = Th + (o.framework ? `/${o.framework}` : ""), r.dataset.sdkv = Ch, o.disableAutoTrack && (r.dataset.disableAutoTrack = "1"), o.endpoint ? r.dataset.endpoint = o.endpoint : o.basePath && (r.dataset.endpoint = `${o.basePath}/insights`), o.dsn && (r.dataset.dsn = o.dsn), r.onerror = () => {
        const E = Bc() ? "Please check if any ad blockers are enabled and try again." : "Be sure to enable Web Analytics for your project and deploy again. See https://vercel.com/docs/analytics/quickstart for more information.";
        console.log(`[Vercel Web Analytics] Failed to load script from ${j}. ${E}`)
    }, Bc() && o.debug === !1 && (r.dataset.debug = "false"), document.head.appendChild(r)
}

function Hh({
    route: o,
    path: g
}) {
    var j;
    (j = window.va) == null || j.call(window, "pageview", {
        route: o,
        path: g
    })
}

function _h() {
    if (!(typeof process > "u" || typeof Gd > "u")) return Gd.REACT_APP_VERCEL_OBSERVABILITY_BASEPATH
}

function Rh(o) {
    return ue.useEffect(() => {
        var g;
        o.beforeSend && ((g = window.va) == null || g.call(window, "beforeSend", o.beforeSend))
    }, [o.beforeSend]), ue.useEffect(() => {
        zh({
            framework: o.framework || "react",
            basePath: o.basePath ?? _h(),
            ...o.route !== void 0 && {
                disableAutoTrack: !0
            },
            ...o
        })
    }, []), ue.useEffect(() => {
        o.route && o.path && Hh({
            route: o.route,
            path: o.path
        })
    }, [o.route, o.path]), null
}

function Uh({
    epicMonsterStrength: o,
    onEpicMonsterStrengthChange: g
}) {
    const j = E => {
            const M = parseFloat(E.target.value) || 0;
            g(M)
        },
        r = E => {
            E.currentTarget.select()
        };
    return i.jsx("div", {
        className: "space-y-6",
        children: i.jsxs("div", {
            className: "space-y-4",
            children: [i.jsxs("div", {
                className: "flex items-center justify-between",
                children: [i.jsx("label", {
                    className: "text-sm font-medium text-foreground",
                    children: "Strength against Epic %"
                }), i.jsxs("span", {
                    className: "text-sm text-muted-foreground font-mono",
                    children: [o.toLocaleString(), "%"]
                })]
            }), i.jsxs("div", {
                className: "relative",
                children: [i.jsx("input", {
                    type: "number",
                    value: o,
                    onChange: j,
                    onClick: r,
                    className: "w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
                    placeholder: "Enter bonus percentage",
                    min: "0",
                    step: "0.1"
                }), i.jsx("div", {
                    className: "absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground",
                    children: i.jsx("span", {
                        className: "text-sm",
                        children: "%"
                    })
                })]
            })]
        })
    })
}
const Lh = {
        "guardsman-melee": "Guardsman Melee",
        "guardsman-ranged": "Guardsman Ranged",
        "guardsman-mounted": "Guardsman Mounted",
        "guardsman-flying": "Guardsman Flying",
        "specialist-melee": "Specialist Melee",
        "specialist-ranged": "Specialist Ranged",
        "specialist-mounted": "Specialist Mounted",
        "specialist-flying": "Specialist Flying",
        "mercenary-melee": "Mercenary Melee",
        "mercenary-ranged": "Mercenary Ranged",
        "mercenary-mounted": "Mercenary Mounted",
        "mercenary-flying": "Mercenary Flying",
        "monster-melee": "Monster Melee",
        "monster-ranged": "Monster Ranged",
        "monster-mounted": "Monster Mounted",
        "monster-flying": "Monster Flying"
    },
    Kd = {
        "guardsman-melee": {
            health: 0,
            strength: 0
        },
        "guardsman-ranged": {
            health: 0,
            strength: 0
        },
        "guardsman-mounted": {
            health: 0,
            strength: 0
        },
        "guardsman-flying": {
            health: 0,
            strength: 0
        },
        "specialist-melee": {
            health: 0,
            strength: 0
        },
        "specialist-ranged": {
            health: 0,
            strength: 0
        },
        "specialist-mounted": {
            health: 0,
            strength: 0
        },
        "specialist-flying": {
            health: 0,
            strength: 0
        },
        "mercenary-melee": {
            health: 0,
            strength: 0
        },
        "mercenary-ranged": {
            health: 0,
            strength: 0
        },
        "mercenary-mounted": {
            health: 0,
            strength: 0
        },
        "mercenary-flying": {
            health: 0,
            strength: 0
        },
        "monster-melee": {
            health: 0,
            strength: 0
        },
        "monster-ranged": {
            health: 0,
            strength: 0
        },
        "monster-mounted": {
            health: 0,
            strength: 0
        },
        "monster-flying": {
            health: 0,
            strength: 0
        }
    };

function Gh({
    troopStats: o,
    onStatChange: g,
    epicMonsterHunterStrength: j,
    onEpicMonsterHunterStrengthChange: r,
    epicMonsterHunterHealth: E,
    onEpicMonsterHunterHealthChange: M,
    armyOffsetStrength: D,
    onArmyOffsetStrengthChange: O,
    armyOffsetHealth: b,
    onArmyOffsetHealthChange: y
}) {
    const R = (K, $) => w => {
            const ee = parseFloat(w.target.value) || 0;
            g(K, $, ee)
        },
        _ = K => {
            const $ = parseFloat(K.target.value) || 0;
            O($)
        },
        W = K => {
            const $ = parseFloat(K.target.value) || 0;
            y($)
        },
        le = K => {
            K.currentTarget.select()
        },
        se = {
            guardsman: ["guardsman-melee", "guardsman-ranged", "guardsman-mounted", "guardsman-flying"],
            specialist: ["specialist-melee", "specialist-ranged", "specialist-mounted", "specialist-flying"],
            monster: ["monster-melee", "monster-ranged", "monster-mounted", "monster-flying"]
        };
    return i.jsxs("div", {
        className: "space-y-4",
        children: [i.jsx("div", {
            className: "bg-card/50 border border-border rounded-lg p-4",
            children: i.jsxs("div", {
                className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                children: [i.jsxs("div", {
                    className: "bg-secondary/20 border border-border rounded p-3 hover:bg-secondary/30 transition-colors",
                    children: [i.jsxs("div", {
                        className: "flex items-center justify-between mb-2",
                        children: [i.jsx("h4", {
                            className: "text-sm font-medium text-foreground",
                            children: "Epic Monster Hunter"
                        }), i.jsx("span", {
                            className: "text-xs text-muted-foreground capitalize",
                            children: "Melee"
                        })]
                    }), i.jsxs("div", {
                        className: "grid grid-cols-2 gap-2",
                        children: [i.jsxs("div", {
                            children: [i.jsx("label", {
                                className: "block text-xs text-muted-foreground mb-1",
                                children: "Strength %"
                            }), i.jsxs("div", {
                                className: "relative",
                                children: [i.jsx("input", {
                                    type: "number",
                                    value: j,
                                    onChange: K => r(parseFloat(K.target.value) || 0),
                                    onClick: le,
                                    className: "w-full px-2 py-1 bg-input border border-border rounded text-foreground font-mono text-xs focus:outline-none focus:ring-1 focus:ring-ring focus:border-transparent",
                                    step: "any"
                                }), i.jsx("div", {
                                    className: "absolute right-2 top-1/2 transform -translate-y-1/2",
                                    children: i.jsx("span", {
                                        className: "text-xs text-muted-foreground",
                                        children: "%"
                                    })
                                })]
                            })]
                        }), i.jsxs("div", {
                            children: [i.jsx("label", {
                                className: "block text-xs text-muted-foreground mb-1",
                                children: "Health %"
                            }), i.jsxs("div", {
                                className: "relative",
                                children: [i.jsx("input", {
                                    type: "number",
                                    value: E,
                                    onChange: K => M(parseFloat(K.target.value) || 0),
                                    onClick: le,
                                    className: "w-full px-2 py-1 bg-input border border-border rounded text-foreground font-mono text-xs focus:outline-none focus:ring-1 focus:ring-ring focus:border-transparent",
                                    step: "any"
                                }), i.jsx("div", {
                                    className: "absolute right-2 top-1/2 transform -translate-y-1/2",
                                    children: i.jsx("span", {
                                        className: "text-xs text-muted-foreground",
                                        children: "%"
                                    })
                                })]
                            })]
                        })]
                    })]
                }), i.jsxs("div", {
                    className: "bg-secondary/20 border border-border rounded p-3 hover:bg-secondary/30 transition-colors",
                    children: [i.jsxs("div", {
                        className: "flex items-center justify-between mb-2",
                        children: [i.jsx("h4", {
                            className: "text-sm font-medium text-foreground",
                            children: "Army Offset"
                        }), i.jsx("span", {
                            className: "text-xs text-muted-foreground capitalize",
                            children: "Bonus"
                        })]
                    }), i.jsxs("div", {
                        className: "grid grid-cols-2 gap-2",
                        children: [i.jsxs("div", {
                            children: [i.jsx("label", {
                                className: "block text-xs text-muted-foreground mb-1",
                                children: "Strength %"
                            }), i.jsxs("div", {
                                className: "relative",
                                children: [i.jsx("input", {
                                    type: "number",
                                    value: D,
                                    onChange: _,
                                    onClick: le,
                                    className: "w-full px-2 py-1 bg-input border border-border rounded text-foreground font-mono text-xs focus:outline-none focus:ring-1 focus:ring-ring focus:border-transparent",
                                    step: "any"
                                }), i.jsx("div", {
                                    className: "absolute right-2 top-1/2 transform -translate-y-1/2",
                                    children: i.jsx("span", {
                                        className: "text-xs text-muted-foreground",
                                        children: "%"
                                    })
                                })]
                            })]
                        }), i.jsxs("div", {
                            children: [i.jsx("label", {
                                className: "block text-xs text-muted-foreground mb-1",
                                children: "Health %"
                            }), i.jsxs("div", {
                                className: "relative",
                                children: [i.jsx("input", {
                                    type: "number",
                                    value: b,
                                    onChange: W,
                                    onClick: le,
                                    className: "w-full px-2 py-1 bg-input border border-border rounded text-foreground font-mono text-xs focus:outline-none focus:ring-1 focus:ring-ring focus:border-transparent",
                                    step: "any"
                                }), i.jsx("div", {
                                    className: "absolute right-2 top-1/2 transform -translate-y-1/2",
                                    children: i.jsx("span", {
                                        className: "text-xs text-muted-foreground",
                                        children: "%"
                                    })
                                })]
                            })]
                        })]
                    })]
                })]
            })
        }), i.jsx("div", {
            className: "bg-card/50 border border-border rounded-lg p-4",
            children: i.jsx("div", {
                className: "grid grid-cols-1 md:grid-cols-3 gap-4",
                children: ["guardsman", "specialist", "monster"].map(K => i.jsxs("div", {
                    className: "space-y-3",
                    children: [i.jsx("div", {
                        className: "pb-2 border-b border-border",
                        children: i.jsx("h3", {
                            className: "text-sm font-medium text-foreground",
                            children: K === "guardsman" ? "Guardsman" : K === "specialist" ? "Specialist" : "Monster"
                        })
                    }), i.jsx("div", {
                        className: "space-y-3",
                        children: se[K].map($ => i.jsxs("div", {
                            className: "bg-secondary/20 border border-border rounded p-3 hover:bg-secondary/30 transition-colors",
                            children: [i.jsxs("div", {
                                className: "flex items-center justify-between mb-2",
                                children: [i.jsx("h4", {
                                    className: "text-sm font-medium text-foreground",
                                    children: Lh[$].replace("Guardsman ", "").replace("Specialist ", "").replace("Monster ", "")
                                }), i.jsx("span", {
                                    className: "text-xs text-muted-foreground capitalize",
                                    children: $.split("-")[1]
                                })]
                            }), i.jsxs("div", {
                                className: "grid grid-cols-2 gap-2",
                                children: [i.jsxs("div", {
                                    children: [i.jsx("label", {
                                        className: "block text-xs text-muted-foreground mb-1",
                                        children: "Strength %"
                                    }), i.jsxs("div", {
                                        className: "relative",
                                        children: [i.jsx("input", {
                                            type: "number",
                                            value: o[$].strength,
                                            onChange: R($, "strength"),
                                            onClick: le,
                                            className: "w-full px-2 py-1 bg-input border border-border rounded text-foreground font-mono text-xs focus:outline-none focus:ring-1 focus:ring-ring focus:border-transparent",
                                            min: "0",
                                            step: "0.1"
                                        }), i.jsx("div", {
                                            className: "absolute right-2 top-1/2 transform -translate-y-1/2",
                                            children: i.jsx("span", {
                                                className: "text-xs text-muted-foreground",
                                                children: "%"
                                            })
                                        })]
                                    })]
                                }), i.jsxs("div", {
                                    children: [i.jsx("label", {
                                        className: "block text-xs text-muted-foreground mb-1",
                                        children: "Health %"
                                    }), i.jsxs("div", {
                                        className: "relative",
                                        children: [i.jsx("input", {
                                            type: "number",
                                            value: o[$].health,
                                            onChange: R($, "health"),
                                            onClick: le,
                                            className: "w-full px-2 py-1 bg-input border border-border rounded text-foreground font-mono text-xs focus:outline-none focus:ring-1 focus:ring-ring focus:border-transparent",
                                            min: "0",
                                            step: "0.1"
                                        }), i.jsx("div", {
                                            className: "absolute right-2 top-1/2 transform -translate-y-1/2",
                                            children: i.jsx("span", {
                                                className: "text-xs text-muted-foreground",
                                                children: "%"
                                            })
                                        })]
                                    })]
                                })]
                            })]
                        }, $))
                    })]
                }, K))
            })
        })]
    })
}

function z(o) {
    return o.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
}
const Un = [{
    id: z("Archer I"),
    name: "Archer I",
    level: 1,
    category: "GUARDSMAN",
    unitType: "RANGED",
    baseAttack: 50,
    baseHealth: 150,
    leadershipCost: 1,
    meleeVsBonus: 52,
    rangedVsBonus: 0,
    mountedVsBonus: 0,
    flyingVsBonus: 67,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 0,
    mercenary: !1
}, {
    id: z("Spearmen I"),
    name: "Spearmen I",
    level: 1,
    category: "GUARDSMAN",
    unitType: "MELEE",
    baseAttack: 50,
    baseHealth: 150,
    leadershipCost: 1,
    meleeVsBonus: 0,
    rangedVsBonus: 0,
    mountedVsBonus: 39,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 0,
    mercenary: !1
}, {
    id: z("Rider I"),
    name: "Rider I",
    level: 1,
    category: "GUARDSMAN",
    unitType: "MOUNTED",
    baseAttack: 100,
    baseHealth: 300,
    leadershipCost: 2,
    meleeVsBonus: 0,
    rangedVsBonus: 65,
    mountedVsBonus: 0,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 0,
    mercenary: !1
}, {
    id: z("Archer II"),
    name: "Archer II",
    level: 2,
    category: "GUARDSMAN",
    unitType: "RANGED",
    baseAttack: 90,
    baseHealth: 270,
    leadershipCost: 1,
    meleeVsBonus: 78,
    rangedVsBonus: 0,
    mountedVsBonus: 0,
    flyingVsBonus: 101,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 0,
    mercenary: !1
}, {
    id: z("Spearmen II"),
    name: "Spearmen II",
    level: 2,
    category: "GUARDSMAN",
    unitType: "MELEE",
    baseAttack: 90,
    baseHealth: 270,
    leadershipCost: 1,
    meleeVsBonus: 0,
    rangedVsBonus: 0,
    mountedVsBonus: 59,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 0,
    mercenary: !1
}, {
    id: z("Rider II"),
    name: "Rider II",
    level: 2,
    category: "GUARDSMAN",
    unitType: "MOUNTED",
    baseAttack: 180,
    baseHealth: 540,
    leadershipCost: 2,
    meleeVsBonus: 0,
    rangedVsBonus: 98,
    mountedVsBonus: 0,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 0,
    mercenary: !1
}, {
    id: z("Archer III"),
    name: "Archer III",
    level: 3,
    category: "GUARDSMAN",
    unitType: "RANGED",
    baseAttack: 160,
    baseHealth: 480,
    leadershipCost: 1,
    meleeVsBonus: 117,
    rangedVsBonus: 0,
    mountedVsBonus: 0,
    flyingVsBonus: 151,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 0,
    mercenary: !1
}, {
    id: z("Spearmen III"),
    name: "Spearmen III",
    level: 3,
    category: "GUARDSMAN",
    unitType: "MELEE",
    baseAttack: 160,
    baseHealth: 480,
    leadershipCost: 1,
    meleeVsBonus: 0,
    rangedVsBonus: 0,
    mountedVsBonus: 88,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 0,
    mercenary: !1
}, {
    id: z("Rider III"),
    name: "Rider III",
    level: 3,
    category: "GUARDSMAN",
    unitType: "MOUNTED",
    baseAttack: 320,
    baseHealth: 960,
    leadershipCost: 2,
    meleeVsBonus: 0,
    rangedVsBonus: 146,
    mountedVsBonus: 0,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 0,
    mercenary: !1
}, {
    id: z("Archer IV"),
    name: "Archer IV",
    level: 4,
    category: "GUARDSMAN",
    unitType: "RANGED",
    baseAttack: 290,
    baseHealth: 870,
    leadershipCost: 1,
    meleeVsBonus: 176,
    rangedVsBonus: 0,
    mountedVsBonus: 0,
    flyingVsBonus: 226,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 0,
    mercenary: !1
}, {
    id: z("Spearmen IV"),
    name: "Spearmen IV",
    level: 4,
    category: "GUARDSMAN",
    unitType: "MELEE",
    baseAttack: 290,
    baseHealth: 870,
    leadershipCost: 1,
    meleeVsBonus: 0,
    rangedVsBonus: 0,
    mountedVsBonus: 132,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 0,
    mercenary: !1
}, {
    id: z("Rider IV"),
    name: "Rider IV",
    level: 4,
    category: "GUARDSMAN",
    unitType: "MOUNTED",
    baseAttack: 580,
    baseHealth: 1740,
    leadershipCost: 2,
    meleeVsBonus: 0,
    rangedVsBonus: 219,
    mountedVsBonus: 0,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 0,
    mercenary: !1
}, {
    id: z("Archer V"),
    name: "Archer V",
    level: 5,
    category: "GUARDSMAN",
    unitType: "RANGED",
    baseAttack: 520,
    baseHealth: 1560,
    leadershipCost: 1,
    meleeVsBonus: 263,
    rangedVsBonus: 0,
    mountedVsBonus: 0,
    flyingVsBonus: 339,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 0,
    mercenary: !1
}, {
    id: z("Spearmen V"),
    name: "Spearmen V",
    level: 5,
    category: "GUARDSMAN",
    unitType: "MELEE",
    baseAttack: 520,
    baseHealth: 1560,
    leadershipCost: 1,
    meleeVsBonus: 0,
    rangedVsBonus: 0,
    mountedVsBonus: 197,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 0,
    mercenary: !1
}, {
    id: z("Rider V"),
    name: "Rider V",
    level: 5,
    category: "GUARDSMAN",
    unitType: "MOUNTED",
    baseAttack: 1050,
    baseHealth: 3150,
    leadershipCost: 2,
    meleeVsBonus: 0,
    rangedVsBonus: 329,
    mountedVsBonus: 0,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 0,
    mercenary: !1
}, {
    id: z("Griffin V"),
    name: "Griffin V",
    level: 5,
    category: "GUARDSMAN",
    unitType: "FLYING",
    baseAttack: 520,
    baseHealth: 1560,
    leadershipCost: 20,
    meleeVsBonus: 0,
    rangedVsBonus: 0,
    mountedVsBonus: 888,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 0,
    mercenary: !1
}, {
    id: z("Battle Griffin VI"),
    name: "Battle Griffin VI",
    level: 6,
    category: "GUARDSMAN",
    unitType: "FLYING",
    baseAttack: 19e3,
    baseHealth: 57e3,
    leadershipCost: 20,
    meleeVsBonus: 0,
    rangedVsBonus: 0,
    mountedVsBonus: 592,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 0,
    mercenary: !1
}, {
    id: z("Mounted Knight VI"),
    name: "Mounted Knight VI",
    level: 6,
    category: "GUARDSMAN",
    unitType: "MOUNTED",
    baseAttack: 1900,
    baseHealth: 5700,
    leadershipCost: 2,
    meleeVsBonus: 0,
    rangedVsBonus: 494,
    mountedVsBonus: 0,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 0,
    mercenary: !1
}, {
    id: z("Heavy Arbalester VI"),
    name: "Heavy Arbalester VI",
    level: 6,
    category: "GUARDSMAN",
    unitType: "RANGED",
    baseAttack: 940,
    baseHealth: 2820,
    leadershipCost: 1,
    meleeVsBonus: 395,
    rangedVsBonus: 0,
    mountedVsBonus: 0,
    flyingVsBonus: 509,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 0,
    mercenary: !1
}, {
    id: z("Heavy Halberdier VI"),
    name: "Heavy Halberdier VI",
    level: 6,
    category: "GUARDSMAN",
    unitType: "MELEE",
    baseAttack: 940,
    baseHealth: 2820,
    leadershipCost: 1,
    meleeVsBonus: 0,
    rangedVsBonus: 0,
    mountedVsBonus: 296,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 0,
    mercenary: !1
}, {
    id: z("Battle Griffin VII"),
    name: "Battle Griffin VII",
    level: 7,
    category: "GUARDSMAN",
    unitType: "FLYING",
    baseAttack: 34e3,
    baseHealth: 102e3,
    leadershipCost: 20,
    meleeVsBonus: 0,
    rangedVsBonus: 0,
    mountedVsBonus: 888,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 0,
    mercenary: !1
}, {
    id: z("Mounted Knight VII"),
    name: "Mounted Knight VII",
    level: 7,
    category: "GUARDSMAN",
    unitType: "MOUNTED",
    baseAttack: 3400,
    baseHealth: 10200,
    leadershipCost: 2,
    meleeVsBonus: 0,
    rangedVsBonus: 740,
    mountedVsBonus: 0,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 0,
    mercenary: !1
}, {
    id: z("Heavy Arbalester VII"),
    name: "Heavy Arbalester VII",
    level: 7,
    category: "GUARDSMAN",
    unitType: "RANGED",
    baseAttack: 1700,
    baseHealth: 5100,
    leadershipCost: 1,
    meleeVsBonus: 592,
    rangedVsBonus: 0,
    mountedVsBonus: 0,
    flyingVsBonus: 763,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 0,
    mercenary: !1
}, {
    id: z("Heavy Halberdier VII"),
    name: "Heavy Halberdier VII",
    level: 7,
    category: "GUARDSMAN",
    unitType: "MELEE",
    baseAttack: 1700,
    baseHealth: 5100,
    leadershipCost: 1,
    meleeVsBonus: 0,
    rangedVsBonus: 0,
    mountedVsBonus: 444,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 0,
    mercenary: !1
}, {
    id: z("Purifier I"),
    name: "Purifier I",
    level: 8,
    category: "GUARDSMAN",
    unitType: "RANGED",
    baseAttack: 3060,
    baseHealth: 9180,
    leadershipCost: 1,
    meleeVsBonus: 888,
    rangedVsBonus: 0,
    mountedVsBonus: 0,
    flyingVsBonus: 1145,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 0,
    mercenary: !1
}, {
    id: z("Punisher I"),
    name: "Punisher I",
    level: 8,
    category: "GUARDSMAN",
    unitType: "MELEE",
    baseAttack: 3060,
    baseHealth: 9180,
    leadershipCost: 1,
    meleeVsBonus: 0,
    rangedVsBonus: 0,
    mountedVsBonus: 667,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 0,
    mercenary: !1
}, {
    id: z("Smiter I"),
    name: "Smiter I",
    level: 8,
    category: "GUARDSMAN",
    unitType: "MOUNTED",
    baseAttack: 6120,
    baseHealth: 18360,
    leadershipCost: 2,
    meleeVsBonus: 0,
    rangedVsBonus: 1111,
    mountedVsBonus: 0,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 0,
    mercenary: !1
}, {
    id: z("Corax I"),
    name: "Corax I",
    level: 8,
    category: "GUARDSMAN",
    unitType: "FLYING",
    baseAttack: 61200,
    baseHealth: 183600,
    leadershipCost: 20,
    meleeVsBonus: 0,
    rangedVsBonus: 0,
    mountedVsBonus: 1333,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 0,
    mercenary: !1
}, {
    id: z("Purifier II"),
    name: "Purifier II",
    level: 9,
    category: "GUARDSMAN",
    unitType: "RANGED",
    baseAttack: 5510,
    baseHealth: 16530,
    leadershipCost: 1,
    meleeVsBonus: 1333,
    rangedVsBonus: 0,
    mountedVsBonus: 0,
    flyingVsBonus: 1717,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 0,
    mercenary: !1
}, {
    id: z("Punisher II"),
    name: "Punisher II",
    level: 9,
    category: "GUARDSMAN",
    unitType: "MELEE",
    baseAttack: 5510,
    baseHealth: 16530,
    leadershipCost: 1,
    meleeVsBonus: 0,
    rangedVsBonus: 0,
    mountedVsBonus: 1e3,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 0,
    mercenary: !1
}, {
    id: z("Smiter II"),
    name: "Smiter II",
    level: 9,
    category: "GUARDSMAN",
    unitType: "MOUNTED",
    baseAttack: 11020,
    baseHealth: 33060,
    leadershipCost: 2,
    meleeVsBonus: 0,
    rangedVsBonus: 1667,
    mountedVsBonus: 0,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 0,
    mercenary: !1
}, {
    id: z("Corax II"),
    name: "Corax II",
    level: 9,
    category: "GUARDSMAN",
    unitType: "FLYING",
    baseAttack: 110200,
    baseHealth: 330600,
    leadershipCost: 20,
    meleeVsBonus: 0,
    rangedVsBonus: 0,
    mountedVsBonus: 1999,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 0,
    mercenary: !1
}, {
    id: z("Swordman I"),
    name: "Swordman I",
    level: 1,
    category: "SPECIALIST",
    unitType: "MELEE",
    baseAttack: 50,
    baseHealth: 150,
    leadershipCost: 1,
    meleeVsBonus: 0,
    rangedVsBonus: 0,
    mountedVsBonus: 20,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 0,
    mercenary: !1
}, {
    id: z("Swordman II"),
    name: "Swordman II",
    level: 2,
    category: "SPECIALIST",
    unitType: "MELEE",
    baseAttack: 90,
    baseHealth: 270,
    leadershipCost: 1,
    meleeVsBonus: 0,
    rangedVsBonus: 0,
    mountedVsBonus: 29,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 0,
    mercenary: !1
}, {
    id: z("Swordman III"),
    name: "Swordman III",
    level: 3,
    category: "SPECIALIST",
    unitType: "MELEE",
    baseAttack: 160,
    baseHealth: 480,
    leadershipCost: 1,
    meleeVsBonus: 0,
    rangedVsBonus: 0,
    mountedVsBonus: 44,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 0,
    mercenary: !1
}, {
    id: z("Swordman IV"),
    name: "Swordman IV",
    level: 4,
    category: "SPECIALIST",
    unitType: "MELEE",
    baseAttack: 290,
    baseHealth: 870,
    leadershipCost: 1,
    meleeVsBonus: 0,
    rangedVsBonus: 0,
    mountedVsBonus: 66,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 0,
    mercenary: !1
}, {
    id: z("Deadshot V"),
    name: "Deadshot V",
    level: 5,
    category: "SPECIALIST",
    unitType: "RANGED",
    baseAttack: 520,
    baseHealth: 1560,
    leadershipCost: 1,
    meleeVsBonus: 132,
    rangedVsBonus: 0,
    mountedVsBonus: 0,
    flyingVsBonus: 170,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 0,
    mercenary: !1
}, {
    id: z("Swordman V"),
    name: "Swordman V",
    level: 5,
    category: "SPECIALIST",
    unitType: "MELEE",
    baseAttack: 520,
    baseHealth: 1560,
    leadershipCost: 1,
    meleeVsBonus: 0,
    rangedVsBonus: 0,
    mountedVsBonus: 99,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 0,
    mercenary: !1
}, {
    id: z("Lion Rider V"),
    name: "Lion Rider V",
    level: 5,
    category: "SPECIALIST",
    unitType: "MOUNTED",
    baseAttack: 1050,
    baseHealth: 3150,
    leadershipCost: 2,
    meleeVsBonus: 0,
    rangedVsBonus: 165,
    mountedVsBonus: 0,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 0,
    mercenary: !1
}, {
    id: z("Vulture V"),
    name: "Vulture V",
    level: 5,
    category: "SPECIALIST",
    unitType: "FLYING",
    baseAttack: 520,
    baseHealth: 1560,
    leadershipCost: 1,
    meleeVsBonus: 0,
    rangedVsBonus: 0,
    mountedVsBonus: 197,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 0,
    mercenary: !1
}, {
    id: z("Lion Rider VI"),
    name: "Lion Rider VI",
    level: 6,
    category: "SPECIALIST",
    unitType: "MOUNTED",
    baseAttack: 1900,
    baseHealth: 5700,
    leadershipCost: 2,
    meleeVsBonus: 0,
    rangedVsBonus: 247,
    mountedVsBonus: 0,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 0,
    mercenary: !1
}, {
    id: z("Vulture VI"),
    name: "Vulture VI",
    level: 6,
    category: "SPECIALIST",
    unitType: "FLYING",
    baseAttack: 940,
    baseHealth: 2820,
    leadershipCost: 1,
    meleeVsBonus: 0,
    rangedVsBonus: 0,
    mountedVsBonus: 296,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 0,
    mercenary: !1
}, {
    id: z("Deadshot VI"),
    name: "Deadshot VI",
    level: 6,
    category: "SPECIALIST",
    unitType: "RANGED",
    baseAttack: 940,
    baseHealth: 2820,
    leadershipCost: 1,
    meleeVsBonus: 197,
    rangedVsBonus: 0,
    mountedVsBonus: 0,
    flyingVsBonus: 254,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 0,
    mercenary: !1
}, {
    id: z("Heavy Knight VI"),
    name: "Heavy Knight VI",
    level: 6,
    category: "SPECIALIST",
    unitType: "MELEE",
    baseAttack: 940,
    baseHealth: 2820,
    leadershipCost: 1,
    meleeVsBonus: 0,
    rangedVsBonus: 0,
    mountedVsBonus: 148,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 0,
    mercenary: !1
}, {
    id: z("Heavy Knight VII"),
    name: "Heavy Knight VII",
    level: 7,
    category: "SPECIALIST",
    unitType: "MELEE",
    baseAttack: 1700,
    baseHealth: 5100,
    leadershipCost: 1,
    meleeVsBonus: 0,
    rangedVsBonus: 0,
    mountedVsBonus: 222,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 0,
    mercenary: !1
}, {
    id: z("Vulture VII"),
    name: "Vulture VII",
    level: 7,
    category: "SPECIALIST",
    unitType: "FLYING",
    baseAttack: 1700,
    baseHealth: 5100,
    leadershipCost: 1,
    meleeVsBonus: 0,
    rangedVsBonus: 0,
    mountedVsBonus: 444,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 0,
    mercenary: !1
}, {
    id: z("Deadshot VII"),
    name: "Deadshot VII",
    level: 7,
    category: "SPECIALIST",
    unitType: "RANGED",
    baseAttack: 1700,
    baseHealth: 5100,
    leadershipCost: 1,
    meleeVsBonus: 296,
    rangedVsBonus: 0,
    mountedVsBonus: 0,
    flyingVsBonus: 382,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 0,
    mercenary: !1
}, {
    id: z("Lion Rider VII"),
    name: "Lion Rider VII",
    level: 7,
    category: "SPECIALIST",
    unitType: "MOUNTED",
    baseAttack: 3400,
    baseHealth: 10200,
    leadershipCost: 2,
    meleeVsBonus: 0,
    rangedVsBonus: 370,
    mountedVsBonus: 0,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 0,
    mercenary: !1
}, {
    id: z("Legitimist I"),
    name: "Legitimist I",
    level: 8,
    category: "SPECIALIST",
    unitType: "RANGED",
    baseAttack: 3060,
    baseHealth: 9180,
    leadershipCost: 1,
    meleeVsBonus: 444,
    rangedVsBonus: 0,
    mountedVsBonus: 0,
    flyingVsBonus: 572,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 0,
    mercenary: !1
}, {
    id: z("Duelist I"),
    name: "Duelist I",
    level: 8,
    category: "SPECIALIST",
    unitType: "MELEE",
    baseAttack: 3060,
    baseHealth: 9180,
    leadershipCost: 1,
    meleeVsBonus: 0,
    rangedVsBonus: 0,
    mountedVsBonus: 333,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 0,
    mercenary: !1
}, {
    id: z("Whitemane I"),
    name: "Whitemane I",
    level: 8,
    category: "SPECIALIST",
    unitType: "MOUNTED",
    baseAttack: 6120,
    baseHealth: 18360,
    leadershipCost: 2,
    meleeVsBonus: 0,
    rangedVsBonus: 555,
    mountedVsBonus: 0,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 0,
    mercenary: !1
}, {
    id: z("Royal Lion I"),
    name: "Royal Lion I",
    level: 8,
    category: "SPECIALIST",
    unitType: "FLYING",
    baseAttack: 61200,
    baseHealth: 183600,
    leadershipCost: 20,
    meleeVsBonus: 0,
    rangedVsBonus: 0,
    mountedVsBonus: 667,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 0,
    mercenary: !1
}, {
    id: z("Legitimist II"),
    name: "Legitimist II",
    level: 9,
    category: "SPECIALIST",
    unitType: "RANGED",
    baseAttack: 5510,
    baseHealth: 16530,
    leadershipCost: 1,
    meleeVsBonus: 667,
    rangedVsBonus: 0,
    mountedVsBonus: 0,
    flyingVsBonus: 859,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 0,
    mercenary: !1
}, {
    id: z("Duelist II"),
    name: "Duelist II",
    level: 9,
    category: "SPECIALIST",
    unitType: "MELEE",
    baseAttack: 5510,
    baseHealth: 16530,
    leadershipCost: 1,
    meleeVsBonus: 0,
    rangedVsBonus: 0,
    mountedVsBonus: 500,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 0,
    mercenary: !1
}, {
    id: z("Whitemane II"),
    name: "Whitemane II",
    level: 9,
    category: "SPECIALIST",
    unitType: "MOUNTED",
    baseAttack: 11020,
    baseHealth: 33060,
    leadershipCost: 2,
    meleeVsBonus: 0,
    rangedVsBonus: 833,
    mountedVsBonus: 0,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 0,
    mercenary: !1
}, {
    id: z("Royal Lion II"),
    name: "Royal Lion II",
    level: 9,
    category: "SPECIALIST",
    unitType: "FLYING",
    baseAttack: 110200,
    baseHealth: 330600,
    leadershipCost: 20,
    meleeVsBonus: 0,
    rangedVsBonus: 0,
    mountedVsBonus: 1e3,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 0,
    mercenary: !1
}, {
    id: z("Highlinder"),
    name: "Highlinder",
    level: 7,
    category: "GUARDSMAN",
    unitType: "RANGED",
    baseAttack: 11e3,
    baseHealth: 33e3,
    leadershipCost: 0,
    meleeVsBonus: 1333,
    rangedVsBonus: 0,
    mountedVsBonus: 0,
    flyingVsBonus: 1717,
    epicVsBonus: 0,
    authorityCost: 1,
    dominanceCost: 0,
    mercenary: !0
}, {
    id: z("Superior Epic Monster Hunters"),
    name: "Superior Epic Monster Hunters",
    level: 7,
    category: "GUARDSMAN",
    unitType: "MELEE",
    baseAttack: 25e3,
    baseHealth: 75e3,
    leadershipCost: 0,
    meleeVsBonus: 0,
    rangedVsBonus: 0,
    mountedVsBonus: 0,
    flyingVsBonus: 0,
    epicVsBonus: 1e3,
    authorityCost: 1,
    dominanceCost: 0,
    mercenary: !0
}, {
    id: z("Warden"),
    name: "Warden",
    level: 7,
    category: "SPECIALIST",
    unitType: "MOUNTED",
    baseAttack: 47e4,
    baseHealth: 141e4,
    leadershipCost: 0,
    meleeVsBonus: 0,
    rangedVsBonus: 70,
    mountedVsBonus: 0,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 43,
    dominanceCost: 0,
    mercenary: !0
}, {
    id: z("Wyvern"),
    name: "Wyvern",
    level: 7,
    category: "SPECIALIST",
    unitType: "FLYING",
    baseAttack: 69e4,
    baseHealth: 207e4,
    leadershipCost: 0,
    meleeVsBonus: 75,
    rangedVsBonus: 0,
    mountedVsBonus: 0,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 63,
    dominanceCost: 0,
    mercenary: !0
}, {
    id: z("Pounder"),
    name: "Pounder",
    level: 7,
    category: "SPECIALIST",
    unitType: "RANGED",
    baseAttack: 11e3,
    baseHealth: 33e3,
    leadershipCost: 0,
    meleeVsBonus: 667,
    rangedVsBonus: 0,
    mountedVsBonus: 0,
    flyingVsBonus: 859,
    epicVsBonus: 0,
    authorityCost: 1,
    dominanceCost: 0,
    mercenary: !0
}, {
    id: z("Eternal Cannoneer"),
    name: "Eternal Cannoneer",
    level: 7,
    category: "SPECIALIST",
    unitType: "RANGED",
    baseAttack: 44e4,
    baseHealth: 132e4,
    leadershipCost: 0,
    meleeVsBonus: 0,
    rangedVsBonus: 0,
    mountedVsBonus: 0,
    flyingVsBonus: 65,
    epicVsBonus: 0,
    authorityCost: 40,
    dominanceCost: 0,
    mercenary: !0
}, {
    id: z("Quicksand"),
    name: "Quicksand",
    level: 7,
    category: "GUARDSMAN",
    unitType: "MOUNTED",
    baseAttack: 22e3,
    baseHealth: 66e3,
    leadershipCost: 0,
    meleeVsBonus: 0,
    rangedVsBonus: 1667,
    mountedVsBonus: 0,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 2,
    dominanceCost: 0,
    mercenary: !0
}, {
    id: z("Demonic Salamander"),
    name: "Demonic Salamander",
    level: 7,
    category: "SPECIALIST",
    unitType: "MELEE",
    baseAttack: 41e4,
    baseHealth: 123e4,
    leadershipCost: 0,
    meleeVsBonus: 0,
    rangedVsBonus: 0,
    mountedVsBonus: 65,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 38,
    dominanceCost: 0,
    mercenary: !0
}, {
    id: z("Jago"),
    name: "Jago",
    level: 7,
    category: "SPECIALIST",
    unitType: "FLYING",
    baseAttack: 22e4,
    baseHealth: 66e4,
    leadershipCost: 0,
    meleeVsBonus: 0,
    rangedVsBonus: 0,
    mountedVsBonus: 1e3,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 20,
    dominanceCost: 0,
    mercenary: !0
}, {
    id: z("Warregal"),
    name: "Warregal",
    level: 7,
    category: "GUARDSMAN",
    unitType: "FLYING",
    baseAttack: 22e4,
    baseHealth: 66e4,
    leadershipCost: 0,
    meleeVsBonus: 0,
    rangedVsBonus: 0,
    mountedVsBonus: 1999,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 20,
    dominanceCost: 0,
    mercenary: !0
}, {
    id: z("Scarface"),
    name: "Scarface",
    level: 7,
    category: "SPECIALIST",
    unitType: "MELEE",
    baseAttack: 11e3,
    baseHealth: 33e3,
    leadershipCost: 0,
    meleeVsBonus: 0,
    rangedVsBonus: 0,
    mountedVsBonus: 500,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 1,
    dominanceCost: 0,
    mercenary: !0
}, {
    id: z("Slavic Warrior"),
    name: "Slavic Warrior",
    level: 7,
    category: "GUARDSMAN",
    unitType: "MELEE",
    baseAttack: 11e3,
    baseHealth: 33e3,
    leadershipCost: 0,
    meleeVsBonus: 0,
    rangedVsBonus: 0,
    mountedVsBonus: 1e3,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 1,
    dominanceCost: 0,
    mercenary: !0
}, {
    id: z("Galopper"),
    name: "Galopper",
    level: 7,
    category: "SPECIALIST",
    unitType: "MOUNTED",
    baseAttack: 22e3,
    baseHealth: 66e3,
    leadershipCost: 0,
    meleeVsBonus: 0,
    rangedVsBonus: 833,
    mountedVsBonus: 0,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 2,
    dominanceCost: 0,
    mercenary: !0
}, {
    id: z("Devastator II"),
    name: "Devastator II",
    level: 9,
    category: "MONSTER",
    unitType: "MOUNTED",
    baseAttack: 117e4,
    baseHealth: 351e4,
    leadershipCost: 0,
    meleeVsBonus: 0,
    rangedVsBonus: 1922,
    mountedVsBonus: 0,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 53,
    mercenary: !1
}, {
    id: z("Fire Phoenix II"),
    name: "Fire Phoenix II",
    level: 9,
    category: "MONSTER",
    unitType: "FLYING",
    baseAttack: 119e4,
    baseHealth: 357e4,
    leadershipCost: 0,
    meleeVsBonus: 1051,
    rangedVsBonus: 0,
    mountedVsBonus: 0,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 54,
    mercenary: !1
}, {
    id: z("Kraken II"),
    name: "Kraken II",
    level: 9,
    category: "MONSTER",
    unitType: "MELEE",
    baseAttack: 121e4,
    baseHealth: 363e4,
    leadershipCost: 0,
    meleeVsBonus: 0,
    rangedVsBonus: 0,
    mountedVsBonus: 1486,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 55,
    mercenary: !1
}, {
    id: z("Trickster II"),
    name: "Trickster II",
    level: 9,
    category: "MONSTER",
    unitType: "RANGED",
    baseAttack: 115e4,
    baseHealth: 345e4,
    leadershipCost: 0,
    meleeVsBonus: 0,
    rangedVsBonus: 0,
    mountedVsBonus: 0,
    flyingVsBonus: 1410,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 52,
    mercenary: !1
}, {
    id: z("Devastator I"),
    name: "Devastator I",
    level: 8,
    category: "MONSTER",
    unitType: "MOUNTED",
    baseAttack: 65e4,
    baseHealth: 195e4,
    leadershipCost: 0,
    meleeVsBonus: 0,
    rangedVsBonus: 1281,
    mountedVsBonus: 0,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 53,
    mercenary: !1
}, {
    id: z("Fire Phoenix I"),
    name: "Fire Phoenix I",
    level: 8,
    category: "MONSTER",
    unitType: "FLYING",
    baseAttack: 66e4,
    baseHealth: 198e4,
    leadershipCost: 0,
    meleeVsBonus: 701,
    rangedVsBonus: 0,
    mountedVsBonus: 0,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 54,
    mercenary: !1
}, {
    id: z("Kraken I"),
    name: "Kraken I",
    level: 8,
    category: "MONSTER",
    unitType: "MELEE",
    baseAttack: 67e4,
    baseHealth: 201e4,
    leadershipCost: 0,
    meleeVsBonus: 0,
    rangedVsBonus: 0,
    mountedVsBonus: 991,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 55,
    mercenary: !1
}, {
    id: z("Trickster I"),
    name: "Trickster I",
    level: 8,
    category: "MONSTER",
    unitType: "RANGED",
    baseAttack: 64e4,
    baseHealth: 192e4,
    leadershipCost: 0,
    meleeVsBonus: 0,
    rangedVsBonus: 0,
    mountedVsBonus: 0,
    flyingVsBonus: 940,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 52,
    mercenary: !1
}, {
    id: z("Ancient Terror"),
    name: "Ancient Terror",
    level: 7,
    category: "MONSTER",
    unitType: "MOUNTED",
    baseAttack: 28e4,
    baseHealth: 84e4,
    leadershipCost: 0,
    meleeVsBonus: 0,
    rangedVsBonus: 752,
    mountedVsBonus: 0,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 41,
    mercenary: !1
}, {
    id: z("Destructive Colossum"),
    name: "Destructive Colossum",
    level: 7,
    category: "MONSTER",
    unitType: "RANGED",
    baseAttack: 29e4,
    baseHealth: 87e4,
    leadershipCost: 0,
    meleeVsBonus: 752,
    rangedVsBonus: 0,
    mountedVsBonus: 0,
    flyingVsBonus: 547,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 43,
    mercenary: !1
}, {
    id: z("Black Dragon"),
    name: "Black Dragon",
    level: 7,
    category: "MONSTER",
    unitType: "FLYING",
    baseAttack: 3e5,
    baseHealth: 9e5,
    leadershipCost: 0,
    meleeVsBonus: 570,
    rangedVsBonus: 0,
    mountedVsBonus: 0,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 44,
    mercenary: !1
}, {
    id: z("Wind Lord"),
    name: "Wind Lord",
    level: 7,
    category: "MONSTER",
    unitType: "MELEE",
    baseAttack: 31e4,
    baseHealth: 93e4,
    leadershipCost: 0,
    meleeVsBonus: 0,
    rangedVsBonus: 0,
    mountedVsBonus: 387,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 45,
    mercenary: !1
}, {
    id: z("Jungle Destroyer"),
    name: "Jungle Destroyer",
    level: 6,
    category: "MONSTER",
    unitType: "MELEE",
    baseAttack: 13e4,
    baseHealth: 39e4,
    leadershipCost: 0,
    meleeVsBonus: 0,
    rangedVsBonus: 0,
    mountedVsBonus: 623,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 34,
    mercenary: !1
}, {
    id: z("Ruby Golem"),
    name: "Ruby Golem",
    level: 6,
    category: "MONSTER",
    unitType: "MELEE",
    baseAttack: 13e4,
    baseHealth: 39e4,
    leadershipCost: 0,
    meleeVsBonus: 486,
    rangedVsBonus: 0,
    mountedVsBonus: 380,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 35,
    mercenary: !1
}, {
    id: z("Troll Rider"),
    name: "Troll Rider",
    level: 6,
    category: "MONSTER",
    unitType: "MOUNTED",
    baseAttack: 11e4,
    baseHealth: 33e4,
    leadershipCost: 0,
    meleeVsBonus: 0,
    rangedVsBonus: 380,
    mountedVsBonus: 0,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 30,
    mercenary: !1
}, {
    id: z("Crystal Dragon"),
    name: "Crystal Dragon",
    level: 6,
    category: "MONSTER",
    unitType: "MELEE",
    baseAttack: 12e4,
    baseHealth: 36e4,
    leadershipCost: 0,
    meleeVsBonus: 0,
    rangedVsBonus: 0,
    mountedVsBonus: 258,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 33,
    mercenary: !1
}, {
    id: z("Desert Vanquisher"),
    name: "Desert Vanquisher",
    level: 5,
    category: "MONSTER",
    unitType: "MOUNTED",
    baseAttack: 42e3,
    baseHealth: 126e3,
    leadershipCost: 0,
    meleeVsBonus: 0,
    rangedVsBonus: 253,
    mountedVsBonus: 0,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 20,
    mercenary: !1
}, {
    id: z("Flaming Centaur"),
    name: "Flaming Centaur",
    level: 5,
    category: "MONSTER",
    unitType: "MOUNTED",
    baseAttack: 44e3,
    baseHealth: 132e3,
    leadershipCost: 0,
    meleeVsBonus: 0,
    rangedVsBonus: 415,
    mountedVsBonus: 0,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 21,
    mercenary: !1
}, {
    id: z("Ettin"),
    name: "Ettin",
    level: 5,
    category: "MONSTER",
    unitType: "MELEE",
    baseAttack: 48e3,
    baseHealth: 144e3,
    leadershipCost: 0,
    meleeVsBonus: 0,
    rangedVsBonus: 0,
    mountedVsBonus: 334,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 23,
    mercenary: !1
}, {
    id: z("Fearsome Manticore"),
    name: "Fearsome Manticore",
    level: 5,
    category: "MONSTER",
    unitType: "FLYING",
    baseAttack: 46e3,
    baseHealth: 138e3,
    leadershipCost: 0,
    meleeVsBonus: 0,
    rangedVsBonus: 0,
    mountedVsBonus: 0,
    flyingVsBonus: 253,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 22,
    mercenary: !1
}, {
    id: z("Magic Dragon"),
    name: "Magic Dragon",
    level: 4,
    category: "MONSTER",
    unitType: "RANGED",
    baseAttack: 15e3,
    baseHealth: 45e3,
    leadershipCost: 0,
    meleeVsBonus: 169,
    rangedVsBonus: 216,
    mountedVsBonus: 0,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 13,
    mercenary: !1
}, {
    id: z("Ice Phoenix"),
    name: "Ice Phoenix",
    level: 4,
    category: "MONSTER",
    unitType: "FLYING",
    baseAttack: 17e3,
    baseHealth: 51e3,
    leadershipCost: 0,
    meleeVsBonus: 0,
    rangedVsBonus: 0,
    mountedVsBonus: 0,
    flyingVsBonus: 223,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 15,
    mercenary: !1
}, {
    id: z("Many-Armed Guardian"),
    name: "Many-Armed Guardian",
    level: 4,
    category: "MONSTER",
    unitType: "MELEE",
    baseAttack: 13e3,
    baseHealth: 39e3,
    leadershipCost: 0,
    meleeVsBonus: 0,
    rangedVsBonus: 0,
    mountedVsBonus: 115,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 11,
    mercenary: !1
}, {
    id: z("Gordon Medusa"),
    name: "Gordon Medusa",
    level: 4,
    category: "MONSTER",
    unitType: "RANGED",
    baseAttack: 12e3,
    baseHealth: 36e3,
    leadershipCost: 0,
    meleeVsBonus: 277,
    rangedVsBonus: 0,
    mountedVsBonus: 0,
    flyingVsBonus: 108,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 10,
    mercenary: !1
}, {
    id: z("Emerald Dragon"),
    name: "Emerald Dragon",
    level: 3,
    category: "MONSTER",
    unitType: "FLYING",
    baseAttack: 4500,
    baseHealth: 13500,
    leadershipCost: 0,
    meleeVsBonus: 0,
    rangedVsBonus: 0,
    mountedVsBonus: 185,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 7,
    mercenary: !1
}, {
    id: z("Water Elemental"),
    name: "Water Elemental",
    level: 3,
    category: "MONSTER",
    unitType: "RANGED",
    baseAttack: 1900,
    baseHealth: 5700,
    leadershipCost: 0,
    meleeVsBonus: 113,
    rangedVsBonus: 0,
    mountedVsBonus: 0,
    flyingVsBonus: 144,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 3,
    mercenary: !1
}, {
    id: z("Stone Gargoyle"),
    name: "Stone Gargoyle",
    level: 3,
    category: "MONSTER",
    unitType: "FLYING",
    baseAttack: 5200,
    baseHealth: 15600,
    leadershipCost: 0,
    meleeVsBonus: 185,
    rangedVsBonus: 0,
    mountedVsBonus: 0,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 8,
    mercenary: !1
}, {
    id: z("Battle Boar"),
    name: "Battle Boar",
    level: 3,
    category: "MONSTER",
    unitType: "MOUNTED",
    baseAttack: 3900,
    baseHealth: 11700,
    leadershipCost: 0,
    meleeVsBonus: 0,
    rangedVsBonus: 113,
    mountedVsBonus: 144,
    flyingVsBonus: 0,
    epicVsBonus: 0,
    authorityCost: 0,
    dominanceCost: 6,
    mercenary: !1
}];

function qh() {
    return Un
}

function ts(o) {
    return Un.find(g => g.name === o)
}

function wh(o) {
    switch (o) {
        case "G":
            return "GUARDSMAN";
        case "S":
            return "SPECIALIST";
        case "M":
            return "MONSTER";
        default:
            return "GUARDSMAN"
    }
}

function Yh(o) {
    switch (o) {
        case "melee":
            return "MELEE";
        case "ranged":
            return "RANGED";
        case "mounted":
            return "MOUNTED";
        case "flying":
            return "FLYING";
        default:
            return "MELEE"
    }
}

function Jd(o, g, j) {
    const r = [];
    ["G", "S", "M"].forEach(M => {
        const D = g[M],
            O = wh(M),
            b = o.filter(R => R.category === O && !R.mercenary);
        ["melee", "ranged", "mounted", "flying"].forEach(R => {
            const _ = Yh(R),
                W = R === "melee" && D.missingMelee || R === "ranged" && D.missingRanged || R === "mounted" && D.missingMounted || R === "flying" && D.missingFlying,
                le = b.filter(K => K.unitType === _);
            if (le.length === 0) return;
            const se = [...le].sort((K, $) => $.level - K.level);
            if (W) {
                const K = D.selected - 1,
                    $ = D.selected - D.stack;
                for (let w = K; w >= $; w--) {
                    const ee = se.filter(U => U.level === w);
                    ee.length > 0 && r.push(...ee)
                }
            } else {
                const K = D.selected,
                    $ = D.selected - D.stack + 1;
                for (let w = K; w >= $; w--) {
                    const ee = se.filter(U => U.level === w);
                    ee.length > 0 && r.push(...ee)
                }
            }
        })
    });
    const E = o.filter(M => M.mercenary);
    if (j && j.length > 0) {
        const M = E.filter(D => j.includes(D.id));
        r.push(...M)
    }
    return r
}
const Qh = ["melee", "ranged", "mounted", "flying"],
    Ec = Un.filter(o => o.mercenary).sort((o, g) => o.name.localeCompare(g.name));

function Xh({
    troopSelector: o,
    onTroopSelectorChange: g,
    onMissingTypeChange: j,
    leadership: r,
    onLeadershipChange: E,
    selectedMercenaries: M,
    onMercenariesChange: D
}) {
    const [O, b] = ue.useState({}), [y, R] = ue.useState(null), [_, W] = ue.useState(!1);
    ue.useEffect(() => {
        const L = T => {
                const Ee = T.target;
                Object.values(O).some(F => F) && (Ee.closest('button[aria-label*="Preview"]') || b({})), y !== null && (Ee.closest(`[data-dropdown="${y}"]`) || R(null)), _ && (Ee.closest("[data-mercenaries-dropdown]") || W(!1))
            },
            G = T => {
                T.key === "Escape" && (y !== null && R(null), _ && W(!1))
            };
        return document.addEventListener("mousedown", L), document.addEventListener("keydown", G), () => {
            document.removeEventListener("mousedown", L), document.removeEventListener("keydown", G)
        }
    }, [O, y, _]);
    const le = ue.useMemo(() => {
            const L = Jd(Un, o, M),
                G = {
                    G: {},
                    S: {},
                    M: {}
                };
            return L.forEach(T => {
                if (T.mercenary) return;
                const Ee = T.category === "GUARDSMAN" ? "G" : T.category === "SPECIALIST" ? "S" : "M";
                G[Ee][T.level] || (G[Ee][T.level] = {
                    count: 0,
                    totalPossible: 0
                }), G[Ee][T.level].count++
            }), Object.keys(G).forEach(T => {
                const Ee = T === "G" ? "GUARDSMAN" : T === "S" ? "SPECIALIST" : "MONSTER",
                    Y = Un.filter(te => te.category === Ee);
                [...new Set(Y.map(te => te.level))].forEach(te => {
                    G[T][te] || (G[T][te] = {
                        count: 0,
                        totalPossible: 0
                    }), Y.filter(re => re.level === te).length > 0 && (G[T][te].totalPossible = 4)
                })
            }), G
        }, [o]),
        se = L => G => {
            const T = parseInt(G.target.value) || 1;
            g(L, "selected", T)
        },
        K = L => {
            const G = parseFloat(L.target.value) || 0;
            E(G)
        },
        $ = L => {
            L.currentTarget.select()
        },
        w = L => {
            const G = M.includes(L) ? M.filter(T => T !== L) : [...M, L];
            D(G)
        },
        ee = (L, G) => {
            if (L === "M") return;
            const T = o[L],
                Y = !(G === "melee" && T.missingMelee || G === "ranged" && T.missingRanged || G === "mounted" && T.missingMounted || G === "flying" && T.missingFlying),
                F = (T.missingMelee ? 1 : 0) + (T.missingRanged ? 1 : 0) + (T.missingMounted ? 1 : 0) + (T.missingFlying ? 1 : 0);
            Y && F >= 3 || j(L, G, Y)
        },
        U = (L, G) => {
            const T = o[L],
                Ee = O[L] || !1,
                Y = le[L] || {},
                F = Object.keys(Y).map(Number).sort((q, d) => d - q).filter(q => {
                    const {
                        count: d,
                        totalPossible: N
                    } = Y[q];
                    return N > 0 && d > 0
                }),
                te = (T.missingMelee ? 1 : 0) + (T.missingRanged ? 1 : 0) + (T.missingMounted ? 1 : 0) + (T.missingFlying ? 1 : 0),
                ce = [];
            T.missingMelee && ce.push("melee"), T.missingRanged && ce.push("ranged"), T.missingMounted && ce.push("mounted"), T.missingFlying && ce.push("flying");
            const re = ce.length > 0 ? ce.map(q => q.charAt(0).toUpperCase() + q.slice(1)).join(", ") : "All included",
                je = y === L,
                p = () => R(je ? null : L),
                H = () => {
                    b(q => ({
                        ...q,
                        [L]: !q[L]
                    }))
                },
                J = () => {
                    b(q => ({
                        ...q,
                        [L]: !0
                    }))
                },
                he = () => {
                    b(q => ({
                        ...q,
                        [L]: !1
                    }))
                };
            return i.jsxs("div", {
                className: "space-y-5",
                children: [i.jsxs("div", {
                    className: "space-y-2",
                    children: [i.jsxs("div", {
                        className: "flex items-center gap-2",
                        children: [i.jsxs("label", {
                            className: "block text-sm font-medium text-foreground",
                            children: [G, " Max Level"]
                        }), F.length > 0 && i.jsxs("div", {
                            className: "relative",
                            children: [i.jsx("button", {
                                type: "button",
                                className: "text-muted-foreground hover:text-foreground transition-colors",
                                "aria-label": `Preview ${G} troop inclusion`,
                                onClick: H,
                                onMouseEnter: J,
                                onMouseLeave: he,
                                children: i.jsxs("svg", {
                                    className: "w-4 h-4",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: [i.jsx("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    }), i.jsx("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    })]
                                })
                            }), Ee && i.jsxs("div", {
                                className: "absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded whitespace-nowrap z-50",
                                children: [i.jsx("div", {
                                    className: "font-mono space-y-1",
                                    children: F.map(q => {
                                        const {
                                            count: d,
                                            totalPossible: N
                                        } = Y[q];
                                        return i.jsxs("div", {
                                            className: "flex justify-between gap-4",
                                            children: [i.jsxs("span", {
                                                children: [L, q]
                                            }), i.jsxs("span", {
                                                children: ["(", d, "/", N, ")"]
                                            })]
                                        }, q)
                                    })
                                }), i.jsx("div", {
                                    className: "absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"
                                })]
                            })]
                        })]
                    }), i.jsxs("div", {
                        className: "relative",
                        children: [i.jsx("select", {
                            value: T.selected,
                            onChange: se(L),
                            className: "w-full px-3 py-2 bg-input border border-border rounded text-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent appearance-none",
                            children: [1, 2, 3, 4, 5, 6, 7, 8, 9].map(q => i.jsxs("option", {
                                value: q,
                                children: [L, q]
                            }, q))
                        }), i.jsx("div", {
                            className: "absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none",
                            children: i.jsx("svg", {
                                className: "w-4 h-4 text-muted-foreground",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: i.jsx("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M19 9l-7 7-7-7"
                                })
                            })
                        })]
                    })]
                }), i.jsxs("div", {
                    className: "space-y-2",
                    children: [i.jsx("label", {
                        className: "block text-xs text-muted-foreground",
                        children: "Stack Size"
                    }), i.jsx("div", {
                        className: "flex gap-1.5",
                        children: [1, 2, 3].map(q => i.jsx("button", {
                            type: "button",
                            onClick: () => g(L, "stack", q),
                            className: `flex-1 py-1.5 text-xs font-mono rounded border transition-colors ${T.stack===q?"bg-primary text-primary-foreground border-primary":"bg-input text-foreground border-border hover:bg-input/80"}`,
                            children: q
                        }, q))
                    })]
                }), L !== "M" && i.jsxs("div", {
                    className: "space-y-2",
                    children: [i.jsxs("div", {
                        className: "flex items-center justify-between",
                        children: [i.jsx("label", {
                            className: "block text-xs text-muted-foreground",
                            children: "Missing Unit Types"
                        }), i.jsxs("span", {
                            className: "text-xs text-muted-foreground font-mono",
                            children: [te, "/3"]
                        })]
                    }), i.jsxs("div", {
                        className: "relative",
                        "data-dropdown": L,
                        children: [i.jsxs("button", {
                            type: "button",
                            onClick: p,
                            className: "w-full px-3 py-2 bg-input border border-border rounded text-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent text-left flex items-center justify-between",
                            "aria-expanded": je,
                            "aria-haspopup": "listbox",
                            children: [i.jsx("span", {
                                className: ce.length > 0 ? "text-foreground" : "text-muted-foreground",
                                children: re
                            }), i.jsx("svg", {
                                className: `w-4 h-4 text-muted-foreground transition-transform ${je?"rotate-180":""}`,
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: i.jsx("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M19 9l-7 7-7-7"
                                })
                            })]
                        }), je && i.jsxs("div", {
                            className: "absolute z-50 mt-1 w-full max-h-60 overflow-y-auto bg-input border border-border rounded shadow-lg",
                            children: [i.jsx("div", {
                                className: "p-2 space-y-1",
                                children: Qh.map(q => {
                                    const d = q === "melee" && T.missingMelee || q === "ranged" && T.missingRanged || q === "mounted" && T.missingMounted || q === "flying" && T.missingFlying,
                                        N = !d && te >= 3;
                                    return i.jsxs("label", {
                                        className: `flex items-center gap-3 p-2 rounded cursor-pointer transition-colors ${d?"bg-destructive/10 hover:bg-destructive/20":"hover:bg-secondary/50"} ${N?"opacity-50 cursor-not-allowed":""}`,
                                        children: [i.jsxs("div", {
                                            className: "relative",
                                            children: [i.jsx("input", {
                                                type: "checkbox",
                                                checked: d,
                                                onChange: () => ee(L, q),
                                                disabled: N,
                                                className: "sr-only peer"
                                            }), i.jsx("div", {
                                                className: `w-4 h-4 rounded border flex items-center justify-center transition-colors ${d?"bg-destructive border-destructive":"bg-input border-border peer-hover:border-foreground/50"} ${N?"peer-hover:border-border":""}`,
                                                children: d && i.jsx("svg", {
                                                    className: "w-3 h-3 text-white",
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    viewBox: "0 0 24 24",
                                                    children: i.jsx("path", {
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        strokeWidth: 3,
                                                        d: "M5 13l4 4L19 7"
                                                    })
                                                })
                                            })]
                                        }), i.jsx("span", {
                                            className: "text-sm capitalize select-none",
                                            children: q
                                        }), N && !d && i.jsx("span", {
                                            className: "text-xs text-muted-foreground ml-auto",
                                            children: "Max"
                                        })]
                                    }, q)
                                })
                            }), i.jsx("div", {
                                className: "border-t border-border p-2",
                                children: i.jsx("p", {
                                    className: "text-xs text-muted-foreground",
                                    children: "Select up to 3 unit types to exclude"
                                })
                            })]
                        })]
                    }), i.jsx("p", {
                        className: "text-xs text-muted-foreground",
                        children: "Unit types to exclude from stacking"
                    })]
                })]
            })
        },
        X = () => {
            W(!_)
        },
        ie = L => {
            const G = Ec.find(T => T.id === L);
            return G ? G.name : L
        };
    return i.jsxs("div", {
        className: "space-y-4",
        children: [i.jsx("div", {
            className: "bg-card/50 border border-border rounded-lg p-4",
            children: i.jsxs("div", {
                className: "grid grid-cols-1 md:grid-cols-3 gap-8",
                children: [U("G", "Guardsman"), U("S", "Specialist"), U("M", "Monster")]
            })
        }), i.jsx("div", {
            className: "bg-card/50 border border-border rounded-lg p-4",
            children: i.jsxs("div", {
                className: "grid grid-cols-1 md:grid-cols-2 gap-8",
                children: [i.jsxs("div", {
                    className: "space-y-4",
                    children: [i.jsxs("div", {
                        className: "flex items-center justify-between",
                        children: [i.jsx("label", {
                            className: "text-sm font-medium text-foreground",
                            children: "Leadership"
                        }), i.jsx("span", {
                            className: "text-sm text-muted-foreground font-mono",
                            children: r.toLocaleString()
                        })]
                    }), i.jsxs("div", {
                        className: "relative",
                        children: [i.jsx("input", {
                            type: "number",
                            value: r,
                            onChange: K,
                            onClick: $,
                            className: "w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent",
                            placeholder: "Enter leadership value",
                            min: "0",
                            step: "any"
                        }), i.jsx("div", {
                            className: "absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground",
                            children: i.jsx("span", {
                                className: "text-sm",
                                children: "leadership"
                            })
                        })]
                    })]
                }), i.jsxs("div", {
                    className: "space-y-4",
                    "data-mercenaries-dropdown": !0,
                    children: [i.jsxs("div", {
                        className: "flex items-center justify-between",
                        children: [i.jsx("label", {
                            className: "text-sm font-medium text-foreground",
                            children: "Mercenaries"
                        }), i.jsxs("span", {
                            className: "text-sm text-muted-foreground font-mono",
                            children: [M.length, "/", Ec.length]
                        })]
                    }), i.jsxs("div", {
                        className: "relative",
                        children: [i.jsxs("button", {
                            type: "button",
                            onClick: X,
                            className: "w-full px-4 py-3 bg-input border border-border rounded-lg text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent text-left flex items-center justify-between",
                            "aria-expanded": _,
                            "aria-haspopup": "listbox",
                            children: [i.jsx("span", {
                                className: M.length > 0 ? "text-foreground" : "text-muted-foreground",
                                children: M.length === 0 ? "Select mercenaries" : M.length === 1 ? ie(M[0]) : `${M.length} selected`
                            }), i.jsx("svg", {
                                className: `w-4 h-4 text-muted-foreground transition-transform ${_?"rotate-180":""}`,
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: i.jsx("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M19 9l-7 7-7-7"
                                })
                            })]
                        }), _ && i.jsxs("div", {
                            className: "absolute z-50 mt-1 w-full max-h-60 overflow-y-auto bg-input border border-border rounded shadow-lg",
                            children: [i.jsx("div", {
                                className: "p-2 space-y-1",
                                children: Ec.map(L => {
                                    const G = M.includes(L.id);
                                    return i.jsxs("label", {
                                        className: "flex items-center gap-3 p-2 rounded cursor-pointer transition-colors hover:bg-secondary/50",
                                        children: [i.jsxs("div", {
                                            className: "relative",
                                            children: [i.jsx("input", {
                                                type: "checkbox",
                                                checked: G,
                                                onChange: () => w(L.id),
                                                className: "sr-only peer"
                                            }), i.jsx("div", {
                                                className: `w-4 h-4 rounded border flex items-center justify-center transition-colors ${G?"bg-primary border-primary":"bg-input border-border peer-hover:border-foreground/50"}`,
                                                children: G && i.jsx("svg", {
                                                    className: "w-3 h-3 text-white",
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    viewBox: "0 0 24 24",
                                                    children: i.jsx("path", {
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        strokeWidth: 3,
                                                        d: "M5 13l4 4L19 7"
                                                    })
                                                })
                                            })]
                                        }), i.jsx("span", {
                                            className: "text-sm select-none",
                                            children: L.name
                                        })]
                                    }, L.id)
                                })
                            }), i.jsx("div", {
                                className: "border-t border-border p-2",
                                children: i.jsx("p", {
                                    className: "text-xs text-muted-foreground",
                                    children: "Select mercenary unit types to include"
                                })
                            })]
                        })]
                    }), i.jsx("p", {
                        className: "text-xs text-muted-foreground",
                        children: "Mercenary unit types to include in stacking"
                    })]
                })]
            })
        })]
    })
}

function kh({
    outputs: o,
    onReorder: g
}) {
    const [j, r] = ue.useState(!1), [E, M] = ue.useState(null), [D, O] = ue.useState(!1), [b, y] = ue.useState(null), [R, _] = ue.useState(null);
    ue.useEffect(() => {
        const Y = F => {
            F.key === "Escape" && D && O(!1)
        };
        return window.addEventListener("keydown", Y), () => {
            window.removeEventListener("keydown", Y)
        }
    }, [D]);
    const W = () => {
            let Y = 0,
                F = 0,
                te = 0;
            return o.forEach(ce => {
                if (ce.quantity === 0) return;
                const re = ts(ce.name);
                re && (Y += re.leadershipCost * ce.quantity, F += re.dominanceCost * ce.quantity, te += re.authorityCost * ce.quantity)
            }), {
                leadershipTotal: Y,
                dominanceTotal: F,
                authorityTotal: te
            }
        },
        le = () => {
            const Y = [],
                F = [],
                te = [];
            return o.forEach(ce => {
                if (ce.quantity === 0) return;
                const re = ts(ce.name);
                re && (re.mercenary ? te.push(ce) : re.category === "MONSTER" ? Y.push(ce) : re.leadershipCost > 0 && F.push(ce))
            }), {
                mercenariesSection: te,
                monstersSection: Y,
                leadershipSection: F
            }
        },
        se = () => {
            const {
                mercenariesSection: Y,
                monstersSection: F,
                leadershipSection: te
            } = le(), ce = [];
            return Y.length > 0 && ce.push(...Y.map(re => `${re.name} ${re.quantity.toLocaleString()}`)), F.length > 0 && ce.push(...F.map(re => `${re.name} ${re.quantity.toLocaleString()}`)), te.length > 0 && ce.push(...te.map(re => `${re.name} ${re.quantity.toLocaleString()}`)), ce.length === 0 ? "No troops to display" : ce.join(`
`)
        },
        K = async () => {
            try {
                await navigator.clipboard.writeText(se()), r(!0), setTimeout(() => r(!1), 2e3)
            } catch (Y) {
                console.error("Failed to copy text: ", Y)
            }
        }, $ = async (Y, F) => {
            try {
                await navigator.clipboard.writeText(F.toLocaleString()), M(Y), setTimeout(() => M(null), 2e3)
            } catch (te) {
                console.error("Failed to copy troop text: ", te)
            }
        }, w = (Y, F) => {
            Y.dataTransfer.setData("text/plain", F.toString()), y(F), Y.currentTarget.classList.add("opacity-50")
        }, ee = Y => {
            y(null), _(null), Y.currentTarget.classList.remove("opacity-50")
        }, U = (Y, F) => {
            Y.preventDefault();
            const te = ie(F);
            b !== null && b !== te && te !== -1 && _(te)
        }, X = Y => {
            Y.preventDefault(), _(null)
        }, ie = Y => o.findIndex(F => F.id === Y.id && F.name === Y.name && F.quantity === Y.quantity), L = (Y, F) => {
            Y.preventDefault();
            const te = parseInt(Y.dataTransfer.getData("text/plain")),
                ce = ie(F);
            if (te === ce || te === -1 || ce === -1 || !g) return;
            const re = o[te];
            if (!re) return;
            const je = ts(re.name),
                p = ts(F.name);
            if (!je || !p) return;
            const H = N => N.mercenary ? "mercenaries" : N.category === "MONSTER" ? "monsters" : N.category === "GUARDSMAN" || N.category === "SPECIALIST" ? "leadership" : null,
                J = H(je),
                he = H(p);
            if (J !== he) {
                _(null);
                return
            }
            const q = [...o],
                [d] = q.splice(te, 1);
            q.splice(ce, 0, d), g(q), _(null)
        }, {
            leadershipTotal: G,
            dominanceTotal: T,
            authorityTotal: Ee
        } = W();
    return i.jsxs("div", {
        className: "space-y-3",
        children: [i.jsxs("div", {
            className: "flex items-center justify-between mb-3",
            children: [i.jsx("div", {
                className: "flex items-center gap-3",
                children: i.jsx("h2", {
                    className: "text-lg font-semibold",
                    children: "Troop Distribution"
                })
            }), i.jsx("button", {
                onClick: K,
                disabled: o.length === 0 || o.every(Y => Y.quantity === 0),
                className: "flex items-center gap-1 px-2 py-1 text-xs bg-primary/10 hover:bg-primary/20 text-primary rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                children: j ? i.jsxs(i.Fragment, {
                    children: [i.jsx("svg", {
                        className: "w-3 h-3",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        xmlns: "http://www.w3.org/2000/svg",
                        children: i.jsx("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M5 13l4 4L19 7"
                        })
                    }), "Copied!"]
                }) : i.jsxs(i.Fragment, {
                    children: [i.jsx("svg", {
                        className: "w-3 h-3",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        xmlns: "http://www.w3.org/2000/svg",
                        children: i.jsx("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        })
                    }), "Copy"]
                })
            })]
        }), (() => {
            const {
                mercenariesSection: Y,
                monstersSection: F,
                leadershipSection: te
            } = le(), ce = Y.length > 0, re = F.length > 0, je = te.length > 0;
            return !ce && !re && !je ? i.jsx("div", {
                className: "text-center py-4 text-sm text-muted-foreground",
                children: "Enter troop stats to see distribution"
            }) : i.jsxs("div", {
                className: "space-y-4",
                children: [i.jsxs("div", {
                    className: "space-y-1 text-sm",
                    children: [i.jsxs("div", {
                        className: "flex items-center",
                        children: [i.jsx("span", {
                            className: "text-muted-foreground w-24",
                            children: "Leadership:"
                        }), i.jsx("span", {
                            className: "font-mono font-medium text-foreground",
                            children: G.toLocaleString()
                        })]
                    }), i.jsxs("div", {
                        className: "flex items-center",
                        children: [i.jsx("span", {
                            className: "text-muted-foreground w-24",
                            children: "Authority:"
                        }), i.jsx("span", {
                            className: "font-mono font-medium text-foreground",
                            children: Ee.toLocaleString()
                        })]
                    }), i.jsxs("div", {
                        className: "flex items-center",
                        children: [i.jsx("span", {
                            className: "text-muted-foreground w-24",
                            children: "Dominance:"
                        }), i.jsx("span", {
                            className: "font-mono font-medium text-foreground",
                            children: T.toLocaleString()
                        })]
                    })]
                }), o.length > 0 && i.jsx("div", {
                    className: "pt-2",
                    children: i.jsxs("button", {
                        onClick: () => O(!0),
                        className: "flex items-center gap-1 px-3 py-1.5 text-sm bg-primary/10 hover:bg-primary/20 text-primary rounded transition-colors",
                        children: [i.jsx("svg", {
                            className: "w-4 h-4",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            xmlns: "http://www.w3.org/2000/svg",
                            children: i.jsx("path", {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: 2,
                                d: "M13 10V3L4 14h7v7l9-11h-7z"
                            })
                        }), "View Battle Simulation"]
                    })
                }), ce && i.jsxs("div", {
                    className: "space-y-1",
                    children: [Y.map(p => {
                        const H = ie(p),
                            J = b === H,
                            he = R === H;
                        return i.jsxs("div", {
                            className: `flex items-center justify-between ${J?"opacity-50":""} ${he?"bg-primary/5 border-l-2 border-primary pl-2":""}`,
                            draggable: !0,
                            onDragStart: q => w(q, H),
                            onDragEnd: ee,
                            onDragOver: q => U(q, p),
                            onDragLeave: X,
                            onDrop: q => L(q, p),
                            children: [i.jsxs("div", {
                                className: "flex items-center gap-2",
                                children: [i.jsx("svg", {
                                    className: "w-3.5 h-3.5 text-muted-foreground cursor-move",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    children: i.jsx("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M4 8h16M4 16h16"
                                    })
                                }), i.jsx("span", {
                                    className: "text-sm text-foreground truncate",
                                    children: p.name
                                })]
                            }), i.jsxs("div", {
                                className: "flex items-center gap-2",
                                children: [i.jsx("span", {
                                    className: "text-sm font-mono text-foreground",
                                    children: p.quantity.toLocaleString()
                                }), i.jsx("button", {
                                    onClick: () => $(p.name, p.quantity),
                                    className: "flex items-center gap-1 px-2 py-1 text-xs bg-primary/10 hover:bg-primary/20 text-primary rounded transition-colors",
                                    title: "Copy quantity",
                                    children: E === p.name ? i.jsx("svg", {
                                        className: "w-3.5 h-3.5",
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24",
                                        xmlns: "http://www.w3.org/2000/svg",
                                        children: i.jsx("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M5 13l4 4L19 7"
                                        })
                                    }) : i.jsx("svg", {
                                        className: "w-3.5 h-3.5",
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24",
                                        xmlns: "http://www.w3.org/2000/svg",
                                        children: i.jsx("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                        })
                                    })
                                })]
                            })]
                        }, p.id)
                    }), i.jsx("div", {
                        className: "border-t border-border/50 my-2"
                    })]
                }), re && i.jsxs("div", {
                    className: "space-y-1",
                    children: [F.map(p => {
                        const H = ie(p),
                            J = b === H,
                            he = R === H;
                        return i.jsxs("div", {
                            className: `flex items-center justify-between ${J?"opacity-50":""} ${he?"bg-primary/5 border-l-2 border-primary pl-2":""}`,
                            draggable: !0,
                            onDragStart: q => w(q, H),
                            onDragEnd: ee,
                            onDragOver: q => U(q, p),
                            onDragLeave: X,
                            onDrop: q => L(q, p),
                            children: [i.jsxs("div", {
                                className: "flex items-center gap-2",
                                children: [i.jsx("svg", {
                                    className: "w-3.5 h-3.5 text-muted-foreground cursor-move",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    children: i.jsx("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M4 8h16M4 16h16"
                                    })
                                }), i.jsx("span", {
                                    className: "text-sm text-foreground truncate",
                                    children: p.name
                                })]
                            }), i.jsxs("div", {
                                className: "flex items-center gap-2",
                                children: [i.jsx("span", {
                                    className: "text-sm font-mono text-foreground",
                                    children: p.quantity.toLocaleString()
                                }), i.jsx("button", {
                                    onClick: () => $(p.name, p.quantity),
                                    className: "flex items-center gap-1 px-2 py-1 text-xs bg-primary/10 hover:bg-primary/20 text-primary rounded transition-colors",
                                    title: "Copy quantity",
                                    children: E === p.name ? i.jsx("svg", {
                                        className: "w-3.5 h-3.5",
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24",
                                        xmlns: "http://www.w3.org/2000/svg",
                                        children: i.jsx("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M5 13l4 4L19 7"
                                        })
                                    }) : i.jsx("svg", {
                                        className: "w-3.5 h-3.5",
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24",
                                        xmlns: "http://www.w3.org/2000/svg",
                                        children: i.jsx("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                        })
                                    })
                                })]
                            })]
                        }, p.id)
                    }), i.jsx("div", {
                        className: "border-t border-border/50 my-2"
                    })]
                }), je && i.jsx("div", {
                    className: "space-y-1",
                    children: te.map(p => {
                        const H = ie(p),
                            J = b === H,
                            he = R === H;
                        return i.jsxs("div", {
                            className: `flex items-center justify-between ${J?"opacity-50":""} ${he?"bg-primary/5 border-l-2 border-primary pl-2":""}`,
                            draggable: !0,
                            onDragStart: q => w(q, H),
                            onDragEnd: ee,
                            onDragOver: q => U(q, p),
                            onDragLeave: X,
                            onDrop: q => L(q, p),
                            children: [i.jsxs("div", {
                                className: "flex items-center gap-2",
                                children: [i.jsx("svg", {
                                    className: "w-3.5 h-3.5 text-muted-foreground cursor-move",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    children: i.jsx("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M4 8h16M4 16h16"
                                    })
                                }), i.jsx("span", {
                                    className: "text-sm text-foreground truncate",
                                    children: p.name
                                })]
                            }), i.jsxs("div", {
                                className: "flex items-center gap-2",
                                children: [i.jsx("span", {
                                    className: "text-sm font-mono text-foreground",
                                    children: p.quantity.toLocaleString()
                                }), i.jsx("button", {
                                    onClick: () => $(p.name, p.quantity),
                                    className: "flex items-center gap-1 px-2 py-1 text-xs bg-primary/10 hover:bg-primary/20 text-primary rounded transition-colors",
                                    title: "Copy quantity",
                                    children: E === p.name ? i.jsx("svg", {
                                        className: "w-3.5 h-3.5",
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24",
                                        xmlns: "http://www.w3.org/2000/svg",
                                        children: i.jsx("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M5 13l4 4L19 7"
                                        })
                                    }) : i.jsx("svg", {
                                        className: "w-3.5 h-3.5",
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24",
                                        xmlns: "http://www.w3.org/2000/svg",
                                        children: i.jsx("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                        })
                                    })
                                })]
                            })]
                        }, p.id)
                    })
                })]
            })
        })(), D && i.jsx("div", {
            className: "fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 bg-black/50 backdrop-blur-sm",
            onClick: () => O(!1),
            children: i.jsxs("div", {
                className: "relative w-full max-w-[95vw] md:max-w-4xl max-h-[80vh] bg-background rounded-lg shadow-lg border border-border overflow-hidden",
                onClick: Y => Y.stopPropagation(),
                children: [i.jsxs("div", {
                    className: "flex items-center justify-between p-4 border-b border-border",
                    children: [i.jsx("h2", {
                        className: "text-lg font-semibold text-foreground",
                        children: "Battle Simulation"
                    }), i.jsx("button", {
                        onClick: () => O(!1),
                        className: "p-1 rounded hover:bg-muted transition-colors",
                        children: i.jsx("svg", {
                            className: "w-5 h-5",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            xmlns: "http://www.w3.org/2000/svg",
                            children: i.jsx("path", {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: 2,
                                d: "M6 18L18 6M6 6l12 12"
                            })
                        })
                    })]
                }), i.jsx("div", {
                    className: "p-4 overflow-auto max-h-[calc(80vh-80px)]",
                    children: i.jsx("div", {
                        className: "overflow-x-auto",
                        children: i.jsxs("table", {
                            className: "w-full text-sm",
                            children: [i.jsx("thead", {
                                children: i.jsxs("tr", {
                                    className: "border-b border-border bg-muted/30",
                                    children: [i.jsx("th", {
                                        className: "text-left py-2 px-3 text-muted-foreground font-medium",
                                        children: "Stack #"
                                    }), i.jsx("th", {
                                        className: "text-left py-2 px-3 text-muted-foreground font-medium",
                                        children: "Troop"
                                    }), i.jsx("th", {
                                        className: "text-left py-2 px-3 text-muted-foreground font-medium",
                                        children: "Quantity"
                                    }), i.jsx("th", {
                                        className: "text-left py-2 px-3 text-muted-foreground font-medium",
                                        children: "Total Health"
                                    }), i.jsx("th", {
                                        className: "text-left py-2 px-3 text-muted-foreground font-medium",
                                        children: "Total Strength"
                                    }), i.jsx("th", {
                                        className: "text-left py-2 px-3 text-muted-foreground font-medium",
                                        children: "Damage estimated"
                                    })]
                                })
                            }), i.jsx("tbody", {
                                children: o.filter(Y => Y.quantity > 0).sort((Y, F) => Y.stackNumber - F.stackNumber).map(Y => i.jsxs("tr", {
                                    className: "border-b border-border/50 last:border-b-0 hover:bg-muted/10",
                                    children: [i.jsx("td", {
                                        className: "py-2 px-3 font-mono text-foreground",
                                        children: Y.stackNumber
                                    }), i.jsx("td", {
                                        className: "py-2 px-3 text-foreground",
                                        children: Y.name
                                    }), i.jsx("td", {
                                        className: "py-2 px-3 font-mono text-foreground",
                                        children: Y.quantity.toLocaleString()
                                    }), i.jsx("td", {
                                        className: "py-2 px-3 font-mono text-foreground",
                                        children: Y.totalHealth.toLocaleString()
                                    }), i.jsx("td", {
                                        className: "py-2 px-3 font-mono text-foreground",
                                        children: Y.totalStrength.toLocaleString()
                                    }), i.jsx("td", {
                                        className: "py-2 px-3 font-mono text-foreground",
                                        children: Y.totalStrengthWithFeatureBonus?.toLocaleString() || Y.totalStrength.toLocaleString()
                                    })]
                                }, Y.id))
                            })]
                        })
                    })
                }), i.jsx("div", {
                    className: "p-4 border-t border-border flex justify-end",
                    children: i.jsx("button", {
                        onClick: () => O(!1),
                        className: "px-4 py-2 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors",
                        children: "Close"
                    })
                })]
            })
        })]
    })
}
const qd = ["Hero", "Alexander", "Amanitore", "Aurora", "Ayade", "Beowulf", "Bernarnd", "Brann", "Brunhild", "Cleopatra", "Doria", "Dustan", "Farhad", "Heimdall", "Helen", "Hercules", "Ingrid", "Leonidas", "Logos", "Lucius", "Minamoto", "Proscope", "Ramses II", "Skadi", "Sofia", "Storr", "Tangel", "Wu Zetian", "Xi Guiying", "Ye Ho-Sung"];

function Zh({
    isOpen: o,
    onClose: g,
    onSave: j,
    error: r,
    isLoading: E = !1
}) {
    const [M, D] = ue.useState([]), [O, b] = ue.useState(""), [y, R] = ue.useState(null), [_, W] = ue.useState(""), [le, se] = ue.useState(!1), K = ue.useRef(null);
    ue.useEffect(() => {
        o && (D([]), b(""), R(null), W(""), se(!1))
    }, [o]), ue.useEffect(() => {
        const U = X => {
            X.key === "Escape" && (le ? se(!1) : o && g())
        };
        return o && document.addEventListener("keydown", U), () => {
            document.removeEventListener("keydown", U)
        }
    }, [o, g, le]), ue.useEffect(() => {
        const U = X => {
            K.current && !K.current.contains(X.target) && se(!1)
        };
        return le && document.addEventListener("mousedown", U), () => {
            document.removeEventListener("mousedown", U)
        }
    }, [le]);
    const $ = U => {
            D(X => X.findIndex(L => L.name === U) >= 0 ? X.filter(L => L.name !== U) : X.length >= 3 ? (R("Maximum 3 captains allowed"), X) : [...X, {
                name: U,
                level: 1
            }]), R(null), le && se(!1), W("")
        },
        w = (U, X) => {
            D(ie => ie.map(L => L.name === U ? {
                ...L,
                level: Math.max(1, Math.min(X, 500))
            } : L))
        },
        ee = U => {
            if (U.preventDefault(), R(null), M.length === 0) {
                R("Please select at least 1 captain");
                return
            }
            if (M.length > 3) {
                R("Maximum 3 captains allowed");
                return
            }
            j(M, O.trim() || void 0)
        };
    return o ? i.jsx("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 bg-black/50",
        children: i.jsx("div", {
            className: "bg-background rounded-xl border border-border shadow-lg max-w-[95vw] md:max-w-2xl w-full max-h-[90vh] overflow-y-auto",
            children: i.jsxs("div", {
                className: "p-6",
                children: [i.jsxs("div", {
                    className: "flex items-center justify-between mb-6",
                    children: [i.jsx("h2", {
                        className: "text-xl font-semibold",
                        children: "Save Configuration"
                    }), i.jsx("button", {
                        onClick: g,
                        className: "text-muted-foreground hover:text-foreground transition-colors p-1 rounded hover:bg-secondary/30",
                        "aria-label": "Close",
                        children: i.jsx("svg", {
                            className: "w-5 h-5",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            children: i.jsx("path", {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: 2,
                                d: "M6 18L18 6M6 6l12 12"
                            })
                        })
                    })]
                }), i.jsxs("form", {
                    onSubmit: ee,
                    className: "space-y-6",
                    children: [i.jsxs("div", {
                        children: [i.jsxs("div", {
                            className: "flex items-center justify-between mb-3",
                            children: [i.jsxs("label", {
                                className: "block text-sm font-medium",
                                children: ["Select Captains (", M.length, "/3) *"]
                            }), i.jsxs("span", {
                                className: "text-xs text-muted-foreground",
                                children: [M.length, " selected"]
                            })]
                        }), i.jsx("div", {
                            className: "mb-3",
                            children: i.jsxs("div", {
                                className: "flex flex-wrap gap-2",
                                children: [M.map(U => i.jsxs("div", {
                                    className: "px-3 py-1 text-sm bg-primary/10 text-primary rounded-full border border-primary/20 flex items-center gap-2",
                                    children: [i.jsx("span", {
                                        children: U.name
                                    }), i.jsxs("div", {
                                        className: "flex items-center gap-1",
                                        children: [i.jsx("span", {
                                            className: "text-xs text-muted-foreground",
                                            children: "Lv."
                                        }), i.jsx("input", {
                                            type: "number",
                                            min: "1",
                                            max: "500",
                                            value: U.level,
                                            onChange: X => w(U.name, parseInt(X.target.value) || 1),
                                            className: "w-16 px-2 py-1 text-sm bg-background border border-border rounded text-center",
                                            onClick: X => X.stopPropagation()
                                        })]
                                    }), i.jsx("button", {
                                        type: "button",
                                        onClick: () => $(U.name),
                                        className: "text-primary/70 hover:text-primary",
                                        "aria-label": `Remove ${U.name}`,
                                        children: i.jsx("svg", {
                                            className: "w-3 h-3",
                                            fill: "none",
                                            stroke: "currentColor",
                                            viewBox: "0 0 24 24",
                                            children: i.jsx("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: 2,
                                                d: "M6 18L18 6M6 6l12 12"
                                            })
                                        })
                                    })]
                                }, U.name)), M.length === 0 && i.jsx("div", {
                                    className: "text-sm text-muted-foreground italic",
                                    children: "No captains selected"
                                })]
                            })
                        }), i.jsxs("div", {
                            className: "relative",
                            ref: K,
                            children: [i.jsx("input", {
                                type: "text",
                                placeholder: "Search captains...",
                                value: _,
                                onChange: U => {
                                    const X = U.target.value;
                                    W(X), X.trim() !== "" && !le && se(!0)
                                },
                                onFocus: () => {
                                    le || se(!0)
                                },
                                className: "w-full px-3 py-2 bg-card border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary pr-10"
                            }), i.jsx("div", {
                                className: "absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1",
                                children: i.jsx("svg", {
                                    className: "w-4 h-4 text-muted-foreground",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24",
                                    children: i.jsx("path", {
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        strokeWidth: 2,
                                        d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    })
                                })
                            }), le && i.jsx("div", {
                                className: "absolute z-50 mt-1 w-full max-h-[200px] overflow-y-auto bg-background border border-border rounded shadow-lg",
                                children: i.jsxs("div", {
                                    className: "p-1",
                                    children: [qd.filter(U => _ === "" || U.toLowerCase().includes(_.toLowerCase())).map(U => i.jsxs("button", {
                                        type: "button",
                                        onClick: () => $(U),
                                        className: `w-full px-3 py-2 text-sm text-left transition-colors flex items-center justify-between ${M.some(X=>X.name===U)?"bg-primary/10 text-primary":"hover:bg-secondary/30"} ${M.length>=3&&!M.some(X=>X.name===U)?"opacity-50 cursor-not-allowed":""}`,
                                        disabled: M.length >= 3 && !M.some(X => X.name === U),
                                        children: [i.jsx("span", {
                                            children: U
                                        }), M.some(X => X.name === U) && i.jsx("svg", {
                                            className: "w-4 h-4 text-primary",
                                            fill: "none",
                                            stroke: "currentColor",
                                            viewBox: "0 0 24 24",
                                            children: i.jsx("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: 2,
                                                d: "M5 13l4 4L19 7"
                                            })
                                        })]
                                    }, U)), qd.filter(U => _ === "" || U.toLowerCase().includes(_.toLowerCase())).length === 0 && i.jsxs("div", {
                                        className: "px-3 py-2 text-sm text-muted-foreground text-center",
                                        children: ['No captains found matching "', _, '"']
                                    })]
                                })
                            })]
                        })]
                    }), i.jsxs("div", {
                        children: [i.jsx("label", {
                            htmlFor: "config-description",
                            className: "block text-sm font-medium mb-2",
                            children: "Notes (Optional)"
                        }), i.jsx("textarea", {
                            id: "config-description",
                            value: O,
                            onChange: U => b(U.target.value),
                            className: "w-full px-3 py-2 bg-card border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary min-h-[80px] resize-y",
                            placeholder: "Optional notes about this configuration...",
                            disabled: E
                        })]
                    }), (r || y) && i.jsx("div", {
                        className: "p-3 bg-red-500/10 border border-red-500/20 rounded text-red-500 text-sm",
                        children: r || y
                    }), i.jsxs("div", {
                        className: "flex justify-end gap-3 pt-4 border-t border-border",
                        children: [i.jsx("button", {
                            type: "button",
                            onClick: g,
                            className: "px-4 py-2 text-sm border border-border rounded hover:bg-secondary/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
                            disabled: E,
                            children: "Cancel"
                        }), i.jsx("button", {
                            type: "submit",
                            className: "px-4 py-2 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2",
                            disabled: E,
                            children: E ? i.jsxs(i.Fragment, {
                                children: [i.jsx("div", {
                                    className: "w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
                                }), "Saving..."]
                            }) : "Save Configuration"
                        })]
                    })]
                })]
            })
        })
    }) : null
}

function Kh({
    savedConfigurations: o,
    onOpenSaveModal: g,
    onLoadConfiguration: j,
    onImportConfigurations: r,
    isLoading: E = !1,
    loadedConfiguration: M = null,
    isConfigurationModified: D = !1
}) {
    const [O, b] = ue.useState(!1), [y, R] = ue.useState(!1), _ = ue.useRef(null);
    ue.useEffect(() => {
        const w = U => {
                _.current && !_.current.contains(U.target) && (b(!1), R(!1))
            },
            ee = U => {
                U.key === "Escape" && (b(!1), R(!1))
            };
        return document.addEventListener("mousedown", w), document.addEventListener("keydown", ee), () => {
            document.removeEventListener("mousedown", w), document.removeEventListener("keydown", ee)
        }
    }, []);
    const W = w => {
            j(w), b(!1), R(!1)
        },
        le = w => new Date(w).toLocaleDateString(void 0, {
            month: "short",
            day: "numeric"
        }),
        se = w => {
            if (!w.captains) return "No captains";
            if (Array.isArray(w.captains) && w.captains.length > 0) {
                if (typeof w.captains[0] == "string") return w.captains.join(", ");
                if (typeof w.captains[0] == "object" && "name" in w.captains[0]) return w.captains.map(ee => `${ee.name} (Lv. ${ee.level})`).join(", ")
            }
            return "No captains"
        },
        K = () => {
            if (!M) return "New configuration";
            const w = se(M),
                ee = M.description ? ` - ${M.description}` : "";
            return D ? `${w}${ee} • Unsaved` : `${w}${ee}`
        },
        $ = () => {
            if (!M) return "New config";
            const w = M.captains[0],
                ee = `${w.name} (Lv. ${w.level})`,
                U = M.captains.length - 1,
                X = U > 0 ? ` +${U}` : "";
            return `${ee}${X}`
        };
    return i.jsxs("div", {
        className: "fixed top-4 right-4 md:top-6 md:right-6 z-40",
        ref: _,
        children: [i.jsxs("div", {
            className: "flex items-center gap-2",
            children: [i.jsx("div", {
                className: "bg-background/80 backdrop-blur-sm border border-border rounded-lg px-3 py-1.5 shadow-lg",
                children: i.jsxs("div", {
                    className: "flex items-center gap-2",
                    children: [!E && i.jsx("div", {
                        className: "flex-shrink-0",
                        children: M ? D ? i.jsx("div", {
                            className: "w-2 h-2 bg-amber-500 rounded-full animate-pulse"
                        }) : i.jsx("div", {
                            className: "w-2 h-2 bg-green-500 rounded-full"
                        }) : i.jsx("div", {
                            className: "w-2 h-2 bg-blue-500 rounded-full"
                        })
                    }), i.jsx("span", {
                        className: "text-sm font-medium text-foreground whitespace-nowrap",
                        children: E ? "Loading..." : $()
                    })]
                })
            }), i.jsx("button", {
                onClick: () => b(!O),
                disabled: E,
                className: "w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed",
                title: K(),
                children: E ? i.jsx("div", {
                    className: "w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"
                }) : i.jsx("svg", {
                    className: "w-5 h-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24",
                    children: i.jsx("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    })
                })
            })]
        }), O && i.jsx("div", {
            className: "absolute top-full right-0 mt-2 w-56 md:w-64 bg-background border border-border rounded-lg shadow-lg z-50",
            children: i.jsxs("div", {
                className: "p-2 space-y-1",
                children: [i.jsxs("button", {
                    onClick: () => {
                        g(), b(!1)
                    },
                    disabled: E,
                    className: "w-full px-3 py-2 text-sm text-left hover:bg-secondary/30 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2",
                    children: [i.jsx("svg", {
                        className: "w-4 h-4",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        children: i.jsx("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                        })
                    }), "Save Configuration"]
                }), i.jsxs("div", {
                    className: "relative",
                    children: [i.jsxs("button", {
                        onClick: () => R(!y),
                        disabled: E || o.length === 0,
                        className: "w-full px-3 py-2 text-sm text-left hover:bg-secondary/30 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 justify-between",
                        children: [i.jsxs("div", {
                            className: "flex items-center gap-2",
                            children: [i.jsx("svg", {
                                className: "w-4 h-4",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24",
                                children: i.jsx("path", {
                                    strokeLinecap: "round",
                                    strokeLinejoin: "round",
                                    strokeWidth: 2,
                                    d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                })
                            }), "Load Configuration"]
                        }), o.length > 0 && i.jsx("span", {
                            className: "text-xs bg-primary/20 text-primary px-1.5 py-0.5 rounded",
                            children: o.length
                        })]
                    }), y && o.length > 0 && i.jsx("div", {
                        className: "absolute left-0 top-full mt-1 w-full max-h-60 overflow-y-auto bg-background border border-border rounded shadow-lg",
                        children: i.jsx("div", {
                            className: "p-2 space-y-1",
                            children: o.map(w => i.jsxs("div", {
                                className: "p-2 hover:bg-secondary/20 rounded cursor-pointer group",
                                onClick: () => W(w),
                                children: [i.jsx("div", {
                                    className: "font-medium text-sm truncate",
                                    children: se(w)
                                }), w.description && i.jsx("div", {
                                    className: "text-xs text-muted-foreground truncate mt-0.5",
                                    children: w.description
                                }), i.jsx("div", {
                                    className: "text-xs text-muted-foreground mt-1",
                                    children: le(w.updatedAt)
                                })]
                            }, w.id))
                        })
                    })]
                }), i.jsx("div", {
                    className: "border-t border-border my-1"
                }), i.jsx("div", {
                    className: "px-1",
                    children: i.jsxs("button", {
                        onClick: () => {
                            if (o.length === 0) return;
                            const w = {
                                    version: "1.0.0",
                                    exportedAt: new Date().toISOString(),
                                    configurationCount: o.length,
                                    configurations: o
                                },
                                ee = new Blob([JSON.stringify(w, null, 2)], {
                                    type: "application/json"
                                }),
                                U = URL.createObjectURL(ee),
                                X = document.createElement("a");
                            X.href = U, X.download = `troop-calculator-backup-${new Date().toISOString().split("T")[0]}.json`, document.body.appendChild(X), X.click(), document.body.removeChild(X), URL.revokeObjectURL(U), b(!1)
                        },
                        disabled: E || o.length === 0,
                        className: "w-full px-3 py-2 text-sm text-left hover:bg-secondary/30 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2",
                        children: [i.jsx("svg", {
                            className: "w-4 h-4",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            children: i.jsx("path", {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: 2,
                                d: "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            })
                        }), "Export Backup"]
                    })
                }), i.jsx("div", {
                    className: "px-1",
                    children: i.jsxs("button", {
                        onClick: () => {
                            const w = document.createElement("input");
                            w.type = "file", w.accept = ".json,application/json", w.onchange = async ee => {
                                const U = ee.target.files?.[0];
                                if (U) try {
                                    const X = await U.text(),
                                        ie = JSON.parse(X);
                                    if (!ie.version || !Array.isArray(ie.configurations)) throw new Error("Invalid backup file");
                                    const L = ie.configurations.filter(G => G.id && Array.isArray(G.captains) && G.state);
                                    if (L.length === 0) throw new Error("No valid configurations found");
                                    r(L), b(!1)
                                } catch {}
                            }, w.click()
                        },
                        disabled: E,
                        className: "w-full px-3 py-2 text-sm text-left hover:bg-secondary/30 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2",
                        children: [i.jsx("svg", {
                            className: "w-4 h-4",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24",
                            children: i.jsx("path", {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                strokeWidth: 2,
                                d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            })
                        }), "Import Backup"]
                    })
                })]
            })
        })]
    })
}

function Jh(o, g) {
    const j = o.epicVsBonus > 0 ? 0 : g.attackBonuses?.[o.category]?.[o.unitType] || 0,
        r = g.epicMonsterStrengthBonus || 0,
        E = g.armyOffsetStrength || 0,
        M = o.epicVsBonus > 0 && g.epicMonsterHunterStrength || 0;
    return j + r + E + M
}

function Ih(o, g) {
    const j = o.epicVsBonus > 0 ? 0 : g.healthBonuses?.[o.category]?.[o.unitType] || 0,
        r = g.armyOffsetHealth || 0,
        E = o.epicVsBonus > 0 && g.epicMonsterHunterHealth || 0;
    return j + r + E
}

function Wh(o) {
    return Math.max(o.meleeVsBonus, o.rangedVsBonus, o.mountedVsBonus, o.flyingVsBonus, o.epicVsBonus) / 100
}

function Fh(o, g, j) {
    let r;
    o.mercenary ? r = 3 : o.category === "MONSTER" ? r = 2 : r = 1;
    const E = g / j,
        M = o.level,
        O = {
            MELEE: 1,
            MOUNTED: 2,
            FLYING: 3,
            RANGED: 4
        } [o.unitType];
    return r * 1e12 + E * 1e8 + M * 1e4 + O
}

function $h(o, g) {
    const j = Jh(o, g),
        r = Ih(o, g),
        E = Wh(o),
        M = Math.round(o.baseHealth * (1 + r)),
        D = Math.round(o.baseAttack * (1 + j)),
        O = Math.round(o.baseAttack * (1 + j + E)),
        b = Fh(o, D, M);
    return {
        troop: o,
        adjustedHealth: M,
        adjustedStrength: D,
        strengthWithFeatureBonuses: O,
        sortingKey: b
    }
}

function Mc(o) {
    return [...o].sort((g, j) => g.sortingKey - j.sortingKey)
}

function Ph(o, g) {
    const j = o.map(D => $h(D, g)),
        r = [],
        E = [],
        M = [];
    for (const D of j) {
        const O = D.troop;
        O.mercenary ? M.push(D) : O.category === "MONSTER" ? E.push(D) : (O.category === "GUARDSMAN" || O.category === "SPECIALIST") && r.push(D)
    }
    return {
        leadershipStats: Mc(r),
        monsterStats: Mc(E),
        mercenaryStats: Mc(M)
    }
}

function eg(o, g, j, r) {
    const E = Math.ceil((o + 1) / j),
        M = Math.ceil((g + 1) / r);
    return Math.max(E, M, 1)
}

function tg(o, g, j, r) {
    const E = Math.floor((o - 1) / j),
        M = Math.floor((g - 1) / r),
        D = Math.min(E, M);
    return Math.max(D, 0)
}

function lg(o, g) {
    if (o.length === 0) return {};
    const j = o.length,
        r = o[j - 1],
        E = Math.floor(g / r.troop.leadershipCost);
    let M = 1,
        D = E,
        O = null;
    for (; M <= D;) {
        const b = Math.floor((M + D) / 2),
            y = wd(o, g, b);
        y ? (O = y, M = b + 1) : D = b - 1
    }
    return O || wd(o, g, 1)
}

function wd(o, g, j) {
    const r = o.length,
        E = new Array(r);
    let M = 0;
    const D = r - 1;
    if (E[D] = j, M = E[D] * o[D].troop.leadershipCost, M > g) return null;
    for (let b = D - 1; b >= 0; b--) {
        const y = o[b + 1].adjustedStrength * E[b + 1],
            R = o[b + 1].adjustedHealth * E[b + 1];
        if (E[b] = eg(y, R, o[b].adjustedStrength, o[b].adjustedHealth), M += E[b] * o[b].troop.leadershipCost, M > g) return null
    }
    const O = {};
    for (let b = 0; b < r; b++) E[b] > 0 && (O[o[b].troop.id] = E[b]);
    return O
}

function ag(o, g, j) {
    if (o.length === 0) return {};
    const r = o.length,
        E = new Array(r),
        M = {},
        D = o[0],
        O = Math.floor((g - 1) / D.adjustedStrength),
        b = Math.floor((j - 1) / D.adjustedHealth);
    if (E[0] = Math.min(O, b), E[0] < 1) return {};
    for (let y = 1; y < r; y++) {
        const R = o[y - 1].adjustedStrength * E[y - 1],
            _ = o[y - 1].adjustedHealth * E[y - 1],
            W = Math.floor((R - 1) / o[y].adjustedStrength),
            le = Math.floor((_ - 1) / o[y].adjustedHealth);
        E[y] = Math.min(W, le), E[y] < 1 && (E[y] = 0)
    }
    for (let y = 0; y < r; y++) E[y] > 0 && (M[o[y].troop.id] = E[y]);
    return M
}

function ng(o, g, j) {
    const r = {};
    for (const E of o) {
        const M = tg(g, j, E.adjustedStrength, E.adjustedHealth);
        M > 0 && (r[E.troop.id] = M)
    }
    return r
}

function Yd(o, g) {
    const j = new Map(g.map(M => [M.troop.id, M]));
    let r = 1 / 0,
        E = 1 / 0;
    for (const [M, D] of Object.entries(o))
        if (D > 0) {
            const O = j.get(M);
            if (O) {
                const b = O.adjustedStrength * D,
                    y = O.adjustedHealth * D;
                b < r && (r = b, E = y)
            }
        } return {
        strength: r === 1 / 0 ? 0 : r,
        health: E === 1 / 0 ? 0 : E
    }
}

function ug(o, g) {
    const j = [],
        r = new Map(Object.entries(o)),
        E = [];
    for (const O of g) {
        const b = r.get(O.troop.id) || 0;
        b > 0 && E.push({
            stats: O,
            quantity: b,
            totalHealth: O.adjustedHealth * b,
            totalStrength: O.adjustedStrength * b,
            totalStrengthWithFeatureBonus: O.strengthWithFeatureBonuses * b
        })
    }
    const M = [...E].sort((O, b) => b.totalStrength !== O.totalStrength ? b.totalStrength - O.totalStrength : b.totalHealth - O.totalHealth),
        D = new Map;
    M.forEach((O, b) => {
        D.set(O.stats.troop.id, b + 1)
    });
    for (const O of g) {
        const b = r.get(O.troop.id) || 0;
        if (b > 0) {
            const y = E.find(R => R.stats.troop.id === O.troop.id);
            y && j.push({
                id: O.troop.id,
                name: O.troop.name,
                quantity: b,
                baseStrength: O.troop.baseAttack,
                baseHealth: O.troop.baseHealth,
                totalHealth: y.totalHealth,
                totalStrength: y.totalStrength,
                totalStrengthWithFeatureBonus: y.totalStrengthWithFeatureBonus,
                stackNumber: D.get(O.troop.id) || 1
            })
        }
    }
    return j.sort((O, b) => b.baseStrength !== O.baseStrength ? b.baseStrength - O.baseStrength : O.name.localeCompare(b.name)), {
        troops: j
    }
}
async function sg(o, g, j) {
    const r = {
            attackBonuses: {},
            healthBonuses: {},
            epicMonsterStrengthBonus: o.bonuses.epicMonsterStrengthBonus,
            armyOffsetStrength: o.bonuses.armyOffsetStrength,
            armyOffsetHealth: o.bonuses.armyOffsetHealth,
            epicMonsterHunterStrength: o.bonuses.epicMonsterHunterStrength,
            epicMonsterHunterHealth: o.bonuses.epicMonsterHunterHealth
        },
        E = ["GUARDSMAN", "SPECIALIST", "MERCENARY", "MONSTER"],
        M = ["MELEE", "RANGED", "MOUNTED", "FLYING"];
    E.forEach(ie => {
        r.attackBonuses[ie] = {}, r.healthBonuses[ie] = {}, M.forEach(L => {
            const G = o.bonuses.attackBonuses[ie]?.[L] || 0,
                T = o.bonuses.healthBonuses[ie]?.[L] || 0;
            r.attackBonuses[ie][L] = G, r.healthBonuses[ie][L] = T
        })
    });
    const D = qh(),
        O = g ? Jd(D, g, j) : D,
        {
            leadershipStats: b,
            monsterStats: y,
            mercenaryStats: R
        } = Ph(O, r),
        _ = lg(b, o.leadershipLimit) || {},
        {
            strength: W,
            health: le
        } = Yd(_, b);
    let se = {},
        K = W,
        $ = le;
    if (y.length > 0 && W > 0) {
        se = ag(y, W, le);
        const ie = Yd(se, y);
        ie.strength > 0 && (K = ie.strength, $ = ie.health)
    }
    let w = {};
    R.length > 0 && K > 0 && (w = ng(R, K, $));
    const ee = {},
        U = [_, se, w];
    for (const ie of U)
        for (const [L, G] of Object.entries(ie)) G > 0 && (ee[L] = (ee[L] || 0) + G);
    const X = [...b, ...y, ...R];
    return ug(ee, X)
}

function ig(o) {
    const [g, j] = o.split("-"), r = ["GUARDSMAN", "SPECIALIST", "MERCENARY", "MONSTER"], E = ["MELEE", "RANGED", "MOUNTED", "FLYING"], M = g.toUpperCase(), D = j.toUpperCase();
    return r.includes(M) || console.warn(`Invalid troop category: ${M}, defaulting to GUARDSMAN`), E.includes(D) || console.warn(`Invalid troop class: ${D}, defaulting to MELEE`), {
        category: r.includes(M) ? M : "GUARDSMAN",
        troopClass: E.includes(D) ? D : "MELEE"
    }
}

function cg(o, g, j, r, E, M, D, O) {
    const b = ["GUARDSMAN", "SPECIALIST", "MERCENARY", "MONSTER"],
        y = ["MELEE", "RANGED", "MOUNTED", "FLYING"],
        R = {},
        _ = {};
    b.forEach(ee => {
        R[ee] = {}, _[ee] = {}, y.forEach(U => {
            R[ee][U] = 0, _[ee][U] = 0
        })
    }), Object.entries(g).forEach(([ee, U]) => {
        const {
            category: X,
            troopClass: ie
        } = ig(ee);
        R[X][ie] = U.strength / 100, _[X][ie] = U.health / 100
    });
    const W = j / 100,
        le = r / 100,
        se = E / 100,
        K = M / 100,
        $ = D / 100;
    return {
        request: {
            leadershipLimit: o,
            bonuses: {
                attackBonuses: R,
                healthBonuses: _,
                epicMonsterStrengthBonus: W,
                armyOffsetStrength: le,
                armyOffsetHealth: se,
                epicMonsterHunterStrength: K,
                epicMonsterHunterHealth: $
            }
        },
        troopSelector: O
    }
}
const Te = {
        leadership: 0,
        epicMonsterStrength: 0,
        armyOffsetStrength: 0,
        armyOffsetHealth: 0,
        epicMonsterHunterStrength: 0,
        epicMonsterHunterHealth: 0,
        troopStats: Kd,
        troopSelector: {
            G: {
                selected: 7,
                stack: 2,
                missingMelee: !1,
                missingRanged: !1,
                missingMounted: !1,
                missingFlying: !1
            },
            S: {
                selected: 7,
                stack: 2,
                missingMelee: !1,
                missingRanged: !1,
                missingMounted: !1,
                missingFlying: !1
            },
            M: {
                selected: 7,
                stack: 2,
                missingMelee: !1,
                missingRanged: !1,
                missingMounted: !1,
                missingFlying: !1
            }
        },
        selectedMercenaries: ["superior-epic-monster-hunters"]
    },
    as = ["guardsman-melee", "guardsman-ranged", "guardsman-mounted", "guardsman-flying", "specialist-melee", "specialist-ranged", "specialist-mounted", "specialist-flying", "monster-melee", "monster-ranged", "monster-mounted", "monster-flying"];

function og(o) {
    const g = new URLSearchParams;
    if (o.leadership !== Te.leadership && g.set("l", o.leadership.toString()), o.epicMonsterStrength !== Te.epicMonsterStrength && g.set("e", o.epicMonsterStrength.toString()), o.armyOffsetStrength !== Te.armyOffsetStrength && g.set("as", o.armyOffsetStrength.toString()), o.armyOffsetHealth !== Te.armyOffsetHealth && g.set("ah", o.armyOffsetHealth.toString()), o.epicMonsterHunterStrength !== Te.epicMonsterHunterStrength && g.set("ehs", o.epicMonsterHunterStrength.toString()), o.epicMonsterHunterHealth !== Te.epicMonsterHunterHealth && g.set("ehh", o.epicMonsterHunterHealth.toString()), as.some(r => {
            const E = o.troopStats[r],
                M = Te.troopStats[r];
            return E.health !== M.health || E.strength !== M.strength
        })) {
        const r = as.map(E => {
            const M = o.troopStats[E],
                D = Math.round(M.health * 10) / 10,
                O = Math.round(M.strength * 10) / 10;
            return `${D}:${O}`
        });
        g.set("t", r.join(","))
    }
    return o.troopSelector.G.selected !== Te.troopSelector.G.selected && g.set("G_selected", o.troopSelector.G.selected.toString()), o.troopSelector.G.stack !== Te.troopSelector.G.stack && g.set("G_stack", o.troopSelector.G.stack.toString()), o.troopSelector.G.missingMelee !== Te.troopSelector.G.missingMelee && g.set("G_missing_melee", o.troopSelector.G.missingMelee.toString()), o.troopSelector.G.missingRanged !== Te.troopSelector.G.missingRanged && g.set("G_missing_ranged", o.troopSelector.G.missingRanged.toString()), o.troopSelector.G.missingMounted !== Te.troopSelector.G.missingMounted && g.set("G_missing_mounted", o.troopSelector.G.missingMounted.toString()), o.troopSelector.G.missingFlying !== Te.troopSelector.G.missingFlying && g.set("G_missing_flying", o.troopSelector.G.missingFlying.toString()), o.troopSelector.S.selected !== Te.troopSelector.S.selected && g.set("S_selected", o.troopSelector.S.selected.toString()), o.troopSelector.S.stack !== Te.troopSelector.S.stack && g.set("S_stack", o.troopSelector.S.stack.toString()), o.troopSelector.S.missingMelee !== Te.troopSelector.S.missingMelee && g.set("S_missing_melee", o.troopSelector.S.missingMelee.toString()), o.troopSelector.S.missingRanged !== Te.troopSelector.S.missingRanged && g.set("S_missing_ranged", o.troopSelector.S.missingRanged.toString()), o.troopSelector.S.missingMounted !== Te.troopSelector.S.missingMounted && g.set("S_missing_mounted", o.troopSelector.S.missingMounted.toString()), o.troopSelector.S.missingFlying !== Te.troopSelector.S.missingFlying && g.set("S_missing_flying", o.troopSelector.S.missingFlying.toString()), o.troopSelector.M.selected !== Te.troopSelector.M.selected && g.set("M_selected", o.troopSelector.M.selected.toString()), o.troopSelector.M.stack !== Te.troopSelector.M.stack && g.set("M_stack", o.troopSelector.M.stack.toString()), o.selectedMercenaries && o.selectedMercenaries.length > 0 && g.set("merc", o.selectedMercenaries.join(",")), g
}

function rg(o) {
    const g = {
            leadership: Te.leadership,
            epicMonsterStrength: Te.epicMonsterStrength,
            armyOffsetStrength: Te.armyOffsetStrength,
            armyOffsetHealth: Te.armyOffsetHealth,
            epicMonsterHunterStrength: Te.epicMonsterHunterStrength,
            epicMonsterHunterHealth: Te.epicMonsterHunterHealth,
            troopStats: {
                ...Te.troopStats
            },
            troopSelector: {
                G: {
                    ...Te.troopSelector.G
                },
                S: {
                    ...Te.troopSelector.S
                },
                M: {
                    ...Te.troopSelector.M
                }
            },
            selectedMercenaries: Te.selectedMercenaries
        },
        j = o.get("l");
    if (j) {
        const T = parseFloat(j);
        !isNaN(T) && T >= 0 && (g.leadership = T)
    }
    const r = o.get("e");
    if (r) {
        const T = parseFloat(r);
        !isNaN(T) && T >= 0 && (g.epicMonsterStrength = T)
    }
    const E = o.get("as");
    if (E) {
        const T = parseFloat(E);
        isNaN(T) || (g.armyOffsetStrength = T)
    }
    const M = o.get("ah");
    if (M) {
        const T = parseFloat(M);
        isNaN(T) || (g.armyOffsetHealth = T)
    }
    const D = o.get("ehs");
    if (D) {
        const T = parseFloat(D);
        isNaN(T) || (g.epicMonsterHunterStrength = T)
    }
    const O = o.get("ehh");
    if (O) {
        const T = parseFloat(O);
        isNaN(T) || (g.epicMonsterHunterHealth = T)
    }
    const b = o.get("t");
    if (b) {
        const T = b.split(",");
        T.length === as.length && as.forEach((Ee, Y) => {
            const F = T[Y];
            if (F) {
                const [te, ce] = F.split(":"), re = parseFloat(te), je = parseFloat(ce);
                !isNaN(re) && !isNaN(je) && re >= 0 && je >= 0 && (g.troopStats[Ee] = {
                    health: re,
                    strength: je
                })
            }
        })
    }
    const y = o.get("G_selected");
    if (y) {
        const T = parseInt(y, 10);
        !isNaN(T) && T >= 1 && T <= 9 && (g.troopSelector.G.selected = T)
    }
    const R = o.get("G_stack");
    if (R) {
        const T = parseInt(R, 10);
        !isNaN(T) && T >= 1 && T <= 3 && (g.troopSelector.G.stack = T)
    }
    o.get("G_missing_melee") === "true" && (g.troopSelector.G.missingMelee = !0), o.get("G_missing_ranged") === "true" && (g.troopSelector.G.missingRanged = !0), o.get("G_missing_mounted") === "true" && (g.troopSelector.G.missingMounted = !0), o.get("G_missing_flying") === "true" && (g.troopSelector.G.missingFlying = !0);
    const K = o.get("S_selected");
    if (K) {
        const T = parseInt(K, 10);
        !isNaN(T) && T >= 1 && T <= 9 && (g.troopSelector.S.selected = T)
    }
    const $ = o.get("S_stack");
    if ($) {
        const T = parseInt($, 10);
        !isNaN(T) && T >= 1 && T <= 3 && (g.troopSelector.S.stack = T)
    }
    o.get("S_missing_melee") === "true" && (g.troopSelector.S.missingMelee = !0), o.get("S_missing_ranged") === "true" && (g.troopSelector.S.missingRanged = !0), o.get("S_missing_mounted") === "true" && (g.troopSelector.S.missingMounted = !0), o.get("S_missing_flying") === "true" && (g.troopSelector.S.missingFlying = !0);
    const ie = o.get("M_selected");
    if (ie) {
        const T = parseInt(ie, 10);
        !isNaN(T) && T >= 1 && T <= 9 && (g.troopSelector.M.selected = T)
    }
    const L = o.get("M_stack");
    if (L) {
        const T = parseInt(L, 10);
        !isNaN(T) && T >= 1 && T <= 3 && (g.troopSelector.M.stack = T)
    }
    const G = o.get("merc");
    if (G) {
        const Ee = G.split(",").filter(Y => ["mercenary-melee", "mercenary-ranged", "mercenary-mounted", "mercenary-flying"].includes(Y));
        Ee.length > 0 && (g.selectedMercenaries = Ee)
    }
    return g
}

function fg(o) {
    const j = og(o).toString(),
        r = j ? `${window.location.pathname}?${j}` : window.location.pathname;
    window.history.replaceState(null, "", r)
}

function fl() {
    const o = new URLSearchParams(window.location.search);
    return rg(o)
}
const Id = "tb-troop-calculator-configs",
    Wd = "1.0.0";

function Tc() {
    const o = localStorage.getItem(Id);
    if (o) try {
        const g = JSON.parse(o);
        if (g.version && Array.isArray(g.configurations)) {
            const j = g.configurations.map(r => {
                if (Array.isArray(r.captains) && r.captains.length > 0) {
                    if (typeof r.captains[0] == "object" && r.captains[0].name) return r;
                    if (typeof r.captains[0] == "string") return {
                        ...r,
                        captains: r.captains.map(E => ({
                            name: E,
                            level: 1
                        }))
                    }
                }
                return {
                    ...r,
                    captains: r.captains && Array.isArray(r.captains) ? r.captains : []
                }
            });
            return {
                ...g,
                configurations: j
            }
        }
    } catch (g) {
        console.error("Failed to parse stored configurations:", g)
    }
    return {
        version: Wd,
        configurations: []
    }
}

function Nc(o) {
    try {
        localStorage.setItem(Id, JSON.stringify(o))
    } catch (g) {
        if (console.error("Failed to save configurations:", g), g instanceof DOMException) {
            if (g.name === "QuotaExceededError" || g.code === 22) throw new Error("Storage quota exceeded. Please delete some configurations or export them for backup.");
            if (g.name === "SecurityError" || g.code === 18) throw new Error("Storage access denied. Check browser privacy settings.")
        }
        throw new Error("Failed to save configuration. Storage may be full or inaccessible.")
    }
}

function dg() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

function Qd(o, g, j) {
    if (!o || o.length === 0) throw new Error("At least 1 captain is required");
    if (o.length > 3) throw new Error("Maximum 3 captains allowed");
    for (const b of o)
        if (b.level < 1 || b.level > 500) throw new Error(`Captain level must be between 1 and 500. Invalid level for ${b.name}: ${b.level}`);
    const r = Tc(),
        E = new Date().toISOString(),
        M = [...o].sort((b, y) => b.name.localeCompare(y.name)),
        D = {
            id: dg(),
            captains: M,
            description: j?.trim(),
            createdAt: E,
            updatedAt: E,
            state: {
                ...g
            },
            version: Wd
        },
        O = r.configurations.findIndex(b => JSON.stringify(b.captains.sort((y, R) => y.name.localeCompare(R.name)).map(y => y.name)) === JSON.stringify(D.captains.map(y => y.name)));
    if (O >= 0) {
        const b = r.configurations[O],
            y = {
                ...b,
                captains: M,
                description: j?.trim() || b.description,
                state: {
                    ...g
                },
                updatedAt: E
            };
        return r.configurations[O] = y, Nc(r), y
    }
    return r.configurations.push(D), Nc(r), D
}

function ls() {
    return [...Tc().configurations].sort((g, j) => new Date(j.updatedAt).getTime() - new Date(g.updatedAt).getTime())
}

function Xd(o) {
    const g = Tc();
    g.lastSessionId = o, Nc(g)
}
const mg = "/assets/logo-DvHkEPl_.png";

function hg() {
    const [o, g] = ue.useState(() => fl().leadership), [j, r] = ue.useState(() => fl().epicMonsterStrength), [E, M] = ue.useState(() => fl().armyOffsetStrength), [D, O] = ue.useState(() => fl().armyOffsetHealth), [b, y] = ue.useState(() => fl().epicMonsterHunterStrength || 0), [R, _] = ue.useState(() => fl().epicMonsterHunterHealth || 0), [W, le] = ue.useState(() => fl().troopStats), [se, K] = ue.useState(() => fl().troopSelector), [$, w] = ue.useState(() => fl().selectedMercenaries || []), [ee, U] = ue.useState([]), [X, ie] = ue.useState(!1), [L, G] = ue.useState(null), [T, Ee] = ue.useState(void 0), [Y, F] = ue.useState(void 0), [te, ce] = ue.useState(() => ls()), [re, je] = ue.useState(!1), [p, H] = ue.useState(null), [J, he] = ue.useState(null), [q, d] = ue.useState(!1), N = ["guardsman-melee", "guardsman-ranged", "guardsman-mounted", "guardsman-flying", "specialist-melee", "specialist-ranged", "specialist-mounted", "specialist-flying", "monster-melee", "monster-ranged", "monster-mounted", "monster-flying"], Q = (ne, oe, Ce, Me, ot) => {
        const it = {
                ...ne
            },
            At = ne[Ce][Me],
            Tt = oe ? ne[oe][Me] : void 0;
        it[Ce] = {
            ...ne[Ce],
            [Me]: ot
        };
        let Gt = oe;
        return oe === void 0 && At === 0 ? (Gt = Ce, N.forEach(ze => {
            ze !== Ce && ne[ze][Me] === 0 && (it[ze] = {
                ...it[ze],
                [Me]: ot
            })
        })) : oe === Ce && At === Tt && (ot === 0 ? Gt = void 0 : N.forEach(ze => {
            ne[ze][Me] === Tt && (it[ze] = {
                ...it[ze],
                [Me]: ot
            })
        })), {
            updatedStats: it,
            newMasterField: Gt
        }
    }, Z = (ne, oe, Ce) => {
        const Me = oe === "strength" ? T : Y,
            ot = oe === "strength" ? Ee : F;
        le(it => {
            const {
                updatedStats: At,
                newMasterField: Tt
            } = Q(it, Me, ne, oe, Ce);
            return Tt !== Me && ot(Tt), At
        })
    }, fe = (ne, oe, Ce) => {
        K(Me => ({
            ...Me,
            [ne]: {
                ...Me[ne],
                [oe]: Ce
            }
        }))
    }, ye = (ne, oe, Ce) => {
        K(Me => ({
            ...Me,
            [ne]: {
                ...Me[ne],
                missingMelee: oe === "melee" ? Ce : Me[ne].missingMelee,
                missingRanged: oe === "ranged" ? Ce : Me[ne].missingRanged,
                missingMounted: oe === "mounted" ? Ce : Me[ne].missingMounted,
                missingFlying: oe === "flying" ? Ce : Me[ne].missingFlying
            }
        }))
    }, Be = () => {
        le(Kd), Ee(void 0), F(void 0), y(0), _(0), M(0), O(0)
    }, Pe = () => {
        H(null), je(!0)
    }, qe = () => {
        je(!1), H(null)
    }, Ul = (ne, oe) => {
        try {
            const Me = Qd(ne, {
                leadership: o,
                epicMonsterStrength: j,
                armyOffsetStrength: E,
                armyOffsetHealth: D,
                epicMonsterHunterStrength: b,
                epicMonsterHunterHealth: R,
                troopStats: W,
                troopSelector: se,
                selectedMercenaries: $
            }, oe?.trim() || void 0);
            Xd(Me.id), ce(ls()), he(Me), d(!1), qe()
        } catch (Ce) {
            H(Ce instanceof Error ? Ce.message : "Failed to save configuration")
        }
    }, la = ne => {
        try {
            const {
                state: oe
            } = ne;
            g(oe.leadership), r(oe.epicMonsterStrength), M(oe.armyOffsetStrength), O(oe.armyOffsetHealth), y(oe.epicMonsterHunterStrength), _(oe.epicMonsterHunterHealth), le(oe.troopStats), K(oe.troopSelector), w(oe.selectedMercenaries || []), Ee(void 0), F(void 0), Xd(ne.id), he(ne), d(!1)
        } catch (oe) {
            console.error("Failed to load configuration:", oe)
        }
    };
    ue.useEffect(() => {
        if (!J) {
            d(!1);
            return
        }
        const ne = J.state,
            oe = o !== ne.leadership || j !== ne.epicMonsterStrength || E !== ne.armyOffsetStrength || D !== ne.armyOffsetHealth || b !== ne.epicMonsterHunterStrength || R !== ne.epicMonsterHunterHealth || JSON.stringify(W) !== JSON.stringify(ne.troopStats) || JSON.stringify(se) !== JSON.stringify(ne.troopSelector) || JSON.stringify($) !== JSON.stringify(ne.selectedMercenaries || []);
        d(oe)
    }, [o, j, E, D, b, R, W, se, $, J]);
    const wa = ne => {
        try {
            const oe = ls(),
                Ce = new Set(oe.map(ze => ze.id)),
                Me = ne.filter(ze => !Ce.has(ze.id)),
                ot = Me.filter(ze => {
                    if (!ze.id || !Array.isArray(ze.captains) || !ze.state) return console.warn("Skipping invalid configuration:", ze), !1;
                    if (ze.captains.some(ut => ut.level < 1 || ut.level > 500)) return console.warn("Skipping configuration with invalid captain levels:", ze), !1;
                    const Ct = ze.state;
                    return typeof Ct.leadership != "number" || typeof Ct.epicMonsterStrength != "number" || typeof Ct.armyOffsetStrength != "number" || typeof Ct.armyOffsetHealth != "number" || typeof Ct.epicMonsterHunterStrength != "number" || typeof Ct.epicMonsterHunterHealth != "number" || typeof Ct.troopStats != "object" || typeof Ct.troopSelector != "object" ? (console.warn("Skipping configuration with invalid state structure:", ze), !1) : !0
                });
            if (ot.length === 0) {
                console.warn("No valid configurations to import");
                return
            }
            let it = 0,
                At = 0;
            for (const ze of ot) try {
                Qd(ze.captains, ze.state, ze.description), it++
            } catch (Ct) {
                console.error(`Failed to import configuration ${ze.id}:`, Ct), At++
            }
            ce(ls());
            const Tt = Me.length - ot.length;
            let Gt = `Imported ${it} configuration${it!==1?"s":""}`;
            At > 0 && (Gt += ` (${At} failed)`), Tt > 0 && (Gt += ` (skipped ${Tt} invalid)`), console.log(Gt)
        } catch (oe) {
            console.error("Failed to import configurations:", oe)
        }
    };
    return ue.useEffect(() => {
        fg({
            leadership: o,
            epicMonsterStrength: j,
            armyOffsetStrength: E,
            armyOffsetHealth: D,
            epicMonsterHunterStrength: b,
            epicMonsterHunterHealth: R,
            troopStats: W,
            troopSelector: se,
            selectedMercenaries: $
        })
    }, [o, j, E, D, b, R, W, se, $]), ue.useEffect(() => {
        const oe = setTimeout(async () => {
            ie(!0), G(null);
            try {
                const {
                    request: Ce,
                    troopSelector: Me
                } = cg(o, W, j, E, D, b, R, se), ot = await sg(Ce, Me, $);
                U(ot.troops)
            } catch (Ce) {
                console.error("Local optimization failed:", Ce);
                const Me = Ce instanceof Error ? Ce.message : "Failed to optimize troops";
                G(Me)
            } finally {
                ie(!1)
            }
        }, 500);
        return () => clearTimeout(oe)
    }, [o, W, j, E, D, b, R, se, $]), i.jsxs("div", {
        className: "min-h-screen bg-background text-foreground p-4 md:p-8",
        children: [i.jsx(Rh, {}), i.jsxs("div", {
            className: "max-w-6xl mx-auto",
            children: [i.jsx("header", {
                className: "mb-10 md:mb-16",
                children: i.jsx("div", {
                    className: "flex flex-col items-start",
                    children: i.jsx("div", {
                        children: i.jsx("img", {
                            src: mg,
                            alt: "Total Battle Troop Calculator",
                            className: "max-w-full"
                        })
                    })
                })
            }), i.jsxs("div", {
                className: "grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8",
                children: [i.jsxs("div", {
                    className: "lg:col-span-2 space-y-6 md:space-y-8",
                    children: [i.jsxs("div", {
                        className: "bg-card rounded-xl border border-border p-6",
                        children: [i.jsx("h2", {
                            className: "text-xl font-semibold mb-6",
                            children: "Army Configuration"
                        }), i.jsx("div", {
                            className: "space-y-8",
                            children: i.jsx(Xh, {
                                troopSelector: se,
                                onTroopSelectorChange: fe,
                                onMissingTypeChange: ye,
                                leadership: o,
                                onLeadershipChange: g,
                                selectedMercenaries: $,
                                onMercenariesChange: w
                            })
                        })]
                    }), i.jsx("div", {
                        className: "bg-card rounded-xl border border-border overflow-hidden",
                        children: i.jsxs("div", {
                            className: "p-6",
                            children: [i.jsx("h2", {
                                className: "text-xl font-semibold mb-6",
                                children: "Army Bonuses"
                            }), i.jsxs("div", {
                                className: "space-y-8",
                                children: [i.jsx(Uh, {
                                    epicMonsterStrength: j,
                                    onEpicMonsterStrengthChange: r
                                }), i.jsx(Gh, {
                                    troopStats: W,
                                    onStatChange: Z,
                                    epicMonsterHunterStrength: b,
                                    onEpicMonsterHunterStrengthChange: y,
                                    epicMonsterHunterHealth: R,
                                    onEpicMonsterHunterHealthChange: _,
                                    armyOffsetStrength: E,
                                    onArmyOffsetStrengthChange: M,
                                    armyOffsetHealth: D,
                                    onArmyOffsetHealthChange: O
                                }), i.jsx("div", {
                                    className: "pt-4 border-t border-border",
                                    children: i.jsx("button", {
                                        onClick: Be,
                                        className: "w-full py-2 text-sm bg-secondary/30 hover:bg-secondary/40 text-foreground rounded border border-border transition-colors",
                                        children: "Reset All Stats"
                                    })
                                })]
                            })]
                        })
                    })]
                }), i.jsx("div", {
                    className: "lg:col-span-1",
                    children: i.jsx("div", {
                        className: "bg-card rounded-xl border border-border p-6 h-full",
                        children: i.jsxs("div", {
                            className: "space-y-4",
                            children: [i.jsx("div", {
                                className: "flex items-center justify-between mb-2",
                                children: i.jsxs("div", {
                                    className: "flex items-center gap-2",
                                    children: [X && i.jsxs("div", {
                                        className: "flex items-center gap-2 text-sm text-muted-foreground",
                                        children: [i.jsx("div", {
                                            className: "w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin"
                                        }), i.jsx("span", {
                                            children: "Optimizing..."
                                        })]
                                    }), L && i.jsxs("div", {
                                        className: "flex items-center gap-2",
                                        children: [i.jsx("div", {
                                            className: "text-sm text-red-500/80",
                                            children: L
                                        }), i.jsx("button", {
                                            onClick: () => {
                                                G(null)
                                            },
                                            className: "text-xs px-2 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-500 rounded transition-colors",
                                            title: "Retry optimization",
                                            children: "Retry"
                                        })]
                                    })]
                                })
                            }), X ? i.jsxs("div", {
                                className: "text-center py-12",
                                children: [i.jsx("div", {
                                    className: "w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"
                                }), i.jsx("p", {
                                    className: "text-muted-foreground",
                                    children: "Optimizing troop distribution..."
                                })]
                            }) : i.jsx(kh, {
                                outputs: ee,
                                onReorder: U
                            })]
                        })
                    })
                })]
            })]
        }), i.jsx(Zh, {
            isOpen: re,
            onClose: qe,
            onSave: Ul,
            error: p
        }), i.jsx(Kh, {
            savedConfigurations: te,
            onOpenSaveModal: Pe,
            onLoadConfiguration: la,
            onImportConfigurations: wa,
            isLoading: X,
            loadedConfiguration: J,
            isConfigurationModified: q
        })]
    })
}
Ah.createRoot(document.getElementById("root")).render(i.jsx(ue.StrictMode, {
    children: i.jsx(hg, {})
}));

! function (e, t) {
	"object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e.Vimeo = e.Vimeo || {}, e.Vimeo.Player = t())
}(this, function () {
	"use strict";

	function e(e, t) {
		return t = {
			exports: {}
		}, e(t, t.exports), t.exports
	}

	function t(e, t, n) {
		var r = T.get(e.element) || {};
		t in r || (r[t] = []), r[t].push(n), T.set(e.element, r)
	}

	function n(e, t) {
		var n = T.get(e.element) || {};
		return n[t] || []
	}

	function r(e, t, n) {
		var r = T.get(e.element) || {};
		if (!r[t]) return !0;
		if (!n) return r[t] = [], T.set(e.element, r), !0;
		var o = r[t].indexOf(n);
		return -1 !== o && r[t].splice(o, 1), T.set(e.element, r), r[t] && 0 === r[t].length
	}

	function o(e, t) {
		var n = T.get(e);
		T.set(t, n), T["delete"](e)
	}

	function i(e, t) {
		return 0 === e.indexOf(t.toLowerCase()) ? e : "" + t.toLowerCase() + e.substr(0, 1).toUpperCase() + e.substr(1)
	}

	function a(e) {
		return e instanceof window.HTMLElement
	}

	function u(e) {
		return !isNaN(parseFloat(e)) && isFinite(e) && Math.floor(e) == e
	}

	function s(e) {
		return /^(https?:)?\/\/(player.)?vimeo.com/.test(e)
	}

	function c() {
		var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
			t = e.id,
			n = e.url,
			r = t || n;
		if (!r) throw new Error("An id or url must be passed, either in an options object or as a data-vimeo-id or data-vimeo-url attribute.");
		if (u(r)) return "https://vimeo.com/" + r;
		if (s(r)) return r.replace("http:", "https:");
		if (t) throw new TypeError("â€œ" + t + "â€ is not a valid video id.");
		throw new TypeError("â€œ" + r + "â€ is not a vimeo.com url.")
	}

	function f(e) {
		for (var t = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1], n = _, r = Array.isArray(n), o = 0, n = r ? n : n[Symbol.iterator]();;) {
			var i;
			if (r) {
				if (o >= n.length) break;
				i = n[o++]
			} else {
				if (o = n.next(), o.done) break;
				i = o.value
			}
			var a = i,
				u = e.getAttribute("data-vimeo-" + a);
			(u || "" === u) && (t[a] = "" === u ? 1 : u)
		}
		return t
	}

	function l(e) {
		var t = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
		return new Promise(function (n, r) {
			if (!s(e)) throw new TypeError("â€œ" + e + "â€ is not a vimeo.com url.");
			var o = "https://vimeo.com/api/oembed.json?url=" + encodeURIComponent(e);
			for (var i in t) t.hasOwnProperty(i) && (o += "&" + i + "=" + encodeURIComponent(t[i]));
			var a = "XDomainRequest" in window ? new XDomainRequest : new XMLHttpRequest;
			a.open("GET", o, !0), a.onload = function () {
				if (404 === a.status) return void r(new Error("â€œ" + e + "â€ was not found."));
				if (403 === a.status) return void r(new Error("â€œ" + e + "â€ is not embeddable."));
				try {
					var t = JSON.parse(a.responseText);
					n(t)
				} catch (o) {
					r(o)
				}
			}, a.onerror = function () {
				var e = a.status ? " (" + a.status + ")" : "";
				r(new Error("There was an error fetching the embed code from Vimeo" + e + "."))
			}, a.send()
		})
	}

	function h(e, t) {
		var n = e.html;
		if (!t) throw new TypeError("An element must be provided");
		if (null !== t.getAttribute("data-vimeo-initialized")) return t.querySelector("iframe");
		var r = document.createElement("div");
		r.innerHTML = n;
		var o = r.firstChild;
		return t.appendChild(o), t.setAttribute("data-vimeo-initialized", "true"), o
	}

	function d() {
		var e = arguments.length <= 0 || void 0 === arguments[0] ? document : arguments[0],
			t = [].slice.call(e.querySelectorAll("[data-vimeo-id], [data-vimeo-url]")),
			n = function (e) {
				"console" in window && console.error && console.error("There was an error creating an embed: " + e)
			},
			r = function () {
				if (i) {
					if (a >= o.length) return "break";
					u = o[a++]
				} else {
					if (a = o.next(), a.done) return "break";
					u = a.value
				}
				var e = u;
				try {
					if (null !== e.getAttribute("data-vimeo-defer")) return "continue";
					var t = c(e),
						r = f(e);
					l(t, r).then(function (t) {
						return h(t, e)
					})["catch"](n)
				} catch (s) {
					n(s)
				}
			};
		e: for (var o = t, i = Array.isArray(o), a = 0, o = i ? o : o[Symbol.iterator]();;) {
			var u, s = r();
			switch (s) {
			case "break":
				break e;
			case "continue":
				continue
			}
		}
	}

	function p(e) {
		return "string" == typeof e && (e = JSON.parse(e)), e
	}

	function v(e, t, n) {
		if (e.element.contentWindow.postMessage) {
			var r = {
				method: t
			};
			void 0 !== n && (r.value = n);
			var o = parseFloat(navigator.userAgent.toLowerCase().replace(/^.*msie (\d+).*$/, "$1"));
			o >= 8 && 10 > o && (r = JSON.stringify(r)), e.element.contentWindow.postMessage(r, e.origin)
		}
	}

	function y(e, t) {
		t = p(t);
		var o = [],
			i = void 0;
		if (t.event) {
			if ("error" === t.event)
				for (var a = n(e, t.data.method), u = a, s = Array.isArray(u), c = 0, u = s ? u : u[Symbol.iterator]();;) {
					var f;
					if (s) {
						if (c >= u.length) break;
						f = u[c++]
					} else {
						if (c = u.next(), c.done) break;
						f = c.value
					}
					var l = f,
						h = new Error(t.data.message);
					h.name = t.data.name, l.reject(h), r(e, t.data.method, l)
				}
			o = n(e, "event:" + t.event), i = t.data
		} else t.method && (o = n(e, t.method), i = t.value, r(e, t.method));
		for (var d = o, v = Array.isArray(d), y = 0, d = v ? d : d[Symbol.iterator]();;) {
			var m;
			if (v) {
				if (y >= d.length) break;
				m = d[y++]
			} else {
				if (y = d.next(), y.done) break;
				m = y.value
			}
			var g = m;
			try {
				if ("function" == typeof g) {
					g.call(e, i);
					continue
				}
				g.resolve(i)
			} catch (w) {}
		}
	}
	var m = "undefined" != typeof Array.prototype.indexOf,
		g = "undefined" != typeof window.postMessage;
	if (!m || !g) throw new Error("Sorry, the Vimeo Player API is not available in this browser.");
	var w = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {},
		b = (e(function (e, t) {
			! function (e) {
				function t(e, t) {
					function r(e) {
						return this && this.constructor === r ? (this._keys = [], this._values = [], this._itp = [], this.objectOnly = t, void(e && n.call(this, e))) : new r(e)
					}
					return t || w(e, "size", {
						get: y
					}), e.constructor = r, r.prototype = e, r
				}

				function n(e) {
					this.add ? e.forEach(this.add, this) : e.forEach(function (e) {
						this.set(e[0], e[1])
					}, this)
				}

				function r(e) {
					return this.has(e) && (this._keys.splice(g, 1), this._values.splice(g, 1), this._itp.forEach(function (e) {
						g < e[0] && e[0]--
					})), g > -1
				}

				function o(e) {
					return this.has(e) ? this._values[g] : void 0
				}

				function i(e, t) {
					if (this.objectOnly && t !== Object(t)) throw new TypeError("Invalid value used as weak collection key");
					if (t != t || 0 === t)
						for (g = e.length; g-- && !b(e[g], t););
					else g = e.indexOf(t);
					return g > -1
				}

				function a(e) {
					return i.call(this, this._values, e)
				}

				function u(e) {
					return i.call(this, this._keys, e)
				}

				function s(e, t) {
					return this.has(e) ? this._values[g] = t : this._values[this._keys.push(e) - 1] = t, this
				}

				function c(e) {
					return this.has(e) || this._values.push(e), this
				}

				function f() {
					(this._keys || 0).length = this._values.length = 0
				}

				function l() {
					return v(this._itp, this._keys)
				}

				function h() {
					return v(this._itp, this._values)
				}

				function d() {
					return v(this._itp, this._keys, this._values)
				}

				function p() {
					return v(this._itp, this._values, this._values)
				}

				function v(e, t, n) {
					var r = [0],
						o = !1;
					return e.push(r), {
						next: function () {
							var i, a = r[0];
							return !o && a < t.length ? (i = n ? [t[a], n[a]] : t[a], r[0]++) : (o = !0, e.splice(e.indexOf(r), 1)), {
								done: o,
								value: i
							}
						}
					}
				}

				function y() {
					return this._values.length
				}

				function m(e, t) {
					for (var n = this.entries();;) {
						var r = n.next();
						if (r.done) break;
						e.call(t, r.value[1], r.value[0], this)
					}
				}
				var g, w = Object.defineProperty,
					b = function (e, t) {
						return e === t || e !== e && t !== t
					};
				"undefined" == typeof WeakMap && (e.WeakMap = t({
					"delete": r,
					clear: f,
					get: o,
					has: u,
					set: s
				}, !0)), "undefined" != typeof Map && "function" == typeof (new Map).values && (new Map).values().next || (e.Map = t({
					"delete": r,
					has: u,
					get: o,
					set: s,
					keys: l,
					values: h,
					entries: d,
					forEach: m,
					clear: f
				})), "undefined" != typeof Set && "function" == typeof (new Set).values && (new Set).values().next || (e.Set = t({
					has: a,
					add: c,
					"delete": r,
					clear: f,
					keys: h,
					values: h,
					entries: p,
					forEach: m
				})), "undefined" == typeof WeakSet && (e.WeakSet = t({
					"delete": r,
					add: c,
					clear: f,
					has: a
				}, !0))
			}("undefined" != typeof t && "undefined" != typeof global ? w : window)
		}), e(function (e) {
			! function (t, n, r) {
				n[t] = n[t] || r(), "undefined" != typeof e && e.exports ? e.exports = n[t] : "function" == typeof define && define.amd && define(function () {
					return n[t]
				})
			}("Promise", "undefined" != typeof global ? global : w, function () {
				function e(e, t) {
					h.add(e, t), l || (l = p(h.drain))
				}

				function t(e) {
					var t, n = typeof e;
					return null == e || "object" != n && "function" != n || (t = e.then), "function" == typeof t ? t : !1
				}

				function n() {
					for (var e = 0; e < this.chain.length; e++) r(this, 1 === this.state ? this.chain[e].success : this.chain[e].failure, this.chain[e]);
					this.chain.length = 0
				}

				function r(e, n, r) {
					var o, i;
					try {
						n === !1 ? r.reject(e.msg) : (o = n === !0 ? e.msg : n.call(void 0, e.msg), o === r.promise ? r.reject(TypeError("Promise-chain cycle")) : (i = t(o)) ? i.call(o, r.resolve, r.reject) : r.resolve(o))
					} catch (a) {
						r.reject(a)
					}
				}

				function o(r) {
					var a, s = this;
					if (!s.triggered) {
						s.triggered = !0, s.def && (s = s.def);
						try {
							(a = t(r)) ? e(function () {
								var e = new u(s);
								try {
									a.call(r, function () {
										o.apply(e, arguments)
									}, function () {
										i.apply(e, arguments)
									})
								} catch (t) {
									i.call(e, t)
								}
							}) : (s.msg = r, s.state = 1, s.chain.length > 0 && e(n, s))
						} catch (c) {
							i.call(new u(s), c)
						}
					}
				}

				function i(t) {
					var r = this;
					r.triggered || (r.triggered = !0, r.def && (r = r.def), r.msg = t, r.state = 2, r.chain.length > 0 && e(n, r))
				}

				function a(e, t, n, r) {
					for (var o = 0; o < t.length; o++)! function (o) {
						e.resolve(t[o]).then(function (e) {
							n(o, e)
						}, r)
					}(o)
				}

				function u(e) {
					this.def = e, this.triggered = !1
				}

				function s(e) {
					this.promise = e, this.state = 0, this.triggered = !1, this.chain = [], this.msg = void 0
				}

				function c(t) {
					if ("function" != typeof t) throw TypeError("Not a function");
					if (0 !== this.__NPO__) throw TypeError("Not a promise");
					this.__NPO__ = 1;
					var r = new s(this);
					this.then = function (t, o) {
						var i = {
							success: "function" == typeof t ? t : !0,
							failure: "function" == typeof o ? o : !1
						};
						return i.promise = new this.constructor(function (e, t) {
							if ("function" != typeof e || "function" != typeof t) throw TypeError("Not a function");
							i.resolve = e, i.reject = t
						}), r.chain.push(i), 0 !== r.state && e(n, r), i.promise
					}, this["catch"] = function (e) {
						return this.then(void 0, e)
					};
					try {
						t.call(void 0, function (e) {
							o.call(r, e)
						}, function (e) {
							i.call(r, e)
						})
					} catch (a) {
						i.call(r, a)
					}
				}
				var f, l, h, d = Object.prototype.toString,
					p = "undefined" != typeof setImmediate ? function (e) {
						return setImmediate(e)
					} : setTimeout;
				try {
					Object.defineProperty({}, "x", {}), f = function (e, t, n, r) {
						return Object.defineProperty(e, t, {
							value: n,
							writable: !0,
							configurable: r !== !1
						})
					}
				} catch (v) {
					f = function (e, t, n) {
						return e[t] = n, e
					}
				}
				h = function () {
					function e(e, t) {
						this.fn = e, this.self = t, this.next = void 0
					}
					var t, n, r;
					return {
						add: function (o, i) {
							r = new e(o, i), n ? n.next = r : t = r, n = r, r = void 0
						},
						drain: function () {
							var e = t;
							for (t = n = l = void 0; e;) e.fn.call(e.self), e = e.next
						}
					}
				}();
				var y = f({}, "constructor", c, !1);
				return c.prototype = y, f(y, "__NPO__", 0, !1), f(c, "resolve", function (e) {
					var t = this;
					return e && "object" == typeof e && 1 === e.__NPO__ ? e : new t(function (t, n) {
						if ("function" != typeof t || "function" != typeof n) throw TypeError("Not a function");
						t(e)
					})
				}), f(c, "reject", function (e) {
					return new this(function (t, n) {
						if ("function" != typeof t || "function" != typeof n) throw TypeError("Not a function");
						n(e)
					})
				}), f(c, "all", function (e) {
					var t = this;
					return "[object Array]" != d.call(e) ? t.reject(TypeError("Not an array")) : 0 === e.length ? t.resolve([]) : new t(function (n, r) {
						if ("function" != typeof n || "function" != typeof r) throw TypeError("Not a function");
						var o = e.length,
							i = Array(o),
							u = 0;
						a(t, e, function (e, t) {
							i[e] = t, ++u === o && n(i)
						}, r)
					})
				}), f(c, "race", function (e) {
					var t = this;
					return "[object Array]" != d.call(e) ? t.reject(TypeError("Not an array")) : new t(function (n, r) {
						if ("function" != typeof n || "function" != typeof r) throw TypeError("Not a function");
						a(t, e, function (e, t) {
							n(t)
						}, r)
					})
				}), c
			})
		})),
		E = b && "object" == typeof b && "default" in b ? b["default"] : b,
		T = new WeakMap,
		_ = ["id", "url", "width", "maxwidth", "height", "maxheight", "portrait", "title", "byline", "color", "autoplay", "autopause", "loop", "responsive"],
		k = function (e, t) {
			if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
		},
		x = new WeakMap,
		j = new WeakMap,
		A = function () {
			function e(t) {
				var n = this,
					r = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
				if (k(this, e), "jQuery" in window && t instanceof jQuery && (t.length > 1 && "console" in window && console.warn && console.warn("A jQuery object with multiple elements was passed, using the first element."), t = t[0]), "string" == typeof t && (t = document.getElementById(t)), !a(t)) throw new TypeError("You must pass either a valid element or a valid id.");
				if ("IFRAME" !== t.nodeName) {
					var i = t.querySelector("iframe");
					i && (t = i)
				}
				if ("IFRAME" === t.nodeName && !s(t.getAttribute("src") || "")) throw new Error("The player element passed isnâ€™t a Vimeo embed.");
				if (x.has(t)) return x.get(t);
				this.element = t, this.origin = "*";
				var u = new E(function (e, i) {
					var a = function (t) {
						if (s(t.origin) && n.element.contentWindow === t.source) {
							"*" === n.origin && (n.origin = t.origin);
							var r = p(t.data),
								o = "event" in r && "ready" === r.event,
								i = "method" in r && "ping" === r.method;
							return o || i ? (n.element.setAttribute("data-ready", "true"), void e()) : void y(n, r)
						}
					};
					if (window.addEventListener ? window.addEventListener("message", a, !1) : window.attachEvent && window.attachEvent("onmessage", a), "IFRAME" !== n.element.nodeName) {
						var u = f(t, r),
							d = c(u);
						l(d, u).then(function (e) {
							var r = h(e, t);
							return n.element = r, o(t, r), e
						})["catch"](function (e) {
							return i(e)
						})
					}
				});
				return j.set(this, u), x.set(this.element, this), "IFRAME" === this.element.nodeName && v(this, "ping"), this
			}
			return e.prototype.then = function (e) {
				var t = arguments.length <= 1 || void 0 === arguments[1] ? function () {} : arguments[1];
				return this.ready().then(e, t)
			}, e.prototype.callMethod = function (e) {
				var n = this,
					r = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
				return new E(function (o, i) {
					return n.ready().then(function () {
						t(n, e, {
							resolve: o,
							reject: i
						}), v(n, e, r)
					})
				})
			}, e.prototype.get = function (e) {
				var n = this;
				return new E(function (r, o) {
					return e = i(e, "get"), n.ready().then(function () {
						t(n, e, {
							resolve: r,
							reject: o
						}), v(n, e)
					})
				})
			}, e.prototype.set = function (e, n) {
				var r = this;
				return E.resolve(n).then(function (n) {
					if (e = i(e, "set"), void 0 === n || null === n) throw new TypeError("There must be a value to set.");
					return r.ready().then(function () {
						return new E(function (o, i) {
							t(r, e, {
								resolve: o,
								reject: i
							}), v(r, e, n)
						})
					})
				})
			}, e.prototype.on = function (e, r) {
				if (!e) throw new TypeError("You must pass an event name.");
				if (!r) throw new TypeError("You must pass a callback function.");
				if ("function" != typeof r) throw new TypeError("The callback must be a function.");
				var o = n(this, "event:" + e);
				0 === o.length && this.callMethod("addEventListener", e)["catch"](function () {}), t(this, "event:" + e, r)
			}, e.prototype.off = function (e, t) {
				if (!e) throw new TypeError("You must pass an event name.");
				if (t && "function" != typeof t) throw new TypeError("The callback must be a function.");
				var n = r(this, "event:" + e, t);
				n && this.callMethod("removeEventListener", e)["catch"](function (e) {})
			}, e.prototype.loadVideo = function (e) {
				return this.callMethod("loadVideo", e)
			}, e.prototype.ready = function () {
				var e = j.get(this);
				return E.resolve(e)
			}, e.prototype.enableTextTrack = function (e, t) {
				if (!e) throw new TypeError("You must pass a language.");
				return this.callMethod("enableTextTrack", {
					language: e,
					kind: t
				})
			}, e.prototype.disableTextTrack = function () {
				return this.callMethod("disableTextTrack")
			}, e.prototype.pause = function () {
				return this.callMethod("pause")
			}, e.prototype.play = function () {
				return this.callMethod("play")
			}, e.prototype.unload = function () {
				return this.callMethod("unload")
			}, e.prototype.getAutopause = function () {
				return this.get("autopause")
			}, e.prototype.setAutopause = function (e) {
				return this.set("autopause", e)
			}, e.prototype.getColor = function () {
				return this.get("color")
			}, e.prototype.setColor = function (e) {
				return this.set("color", e)
			}, e.prototype.getCurrentTime = function () {
				return this.get("currentTime")
			}, e.prototype.setCurrentTime = function (e) {
				return this.set("currentTime", e)
			}, e.prototype.getDuration = function () {
				return this.get("duration")
			}, e.prototype.getEnded = function () {
				return this.get("ended")
			}, e.prototype.getLoop = function () {
				return this.get("loop")
			}, e.prototype.setLoop = function (e) {
				return this.set("loop", e)
			}, e.prototype.getPaused = function () {
				return this.get("paused")
			}, e.prototype.getTextTracks = function () {
				return this.get("textTracks")
			}, e.prototype.getVideoEmbedCode = function () {
				return this.get("videoEmbedCode")
			}, e.prototype.getVideoId = function () {
				return this.get("videoId")
			}, e.prototype.getVideoTitle = function () {
				return this.get("videoTitle")
			}, e.prototype.getVideoWidth = function () {
				return this.get("videoWidth")
			}, e.prototype.getVideoHeight = function () {
				return this.get("videoHeight")
			}, e.prototype.getVideoUrl = function () {
				return this.get("videoUrl")
			}, e.prototype.getVolume = function () {
				return this.get("volume")
			}, e.prototype.setVolume = function (e) {
				return this.set("volume", e)
			}, e
		}();
	return d(), A
});
(function () {
	"use strict";

	function isVimeoUrl(url) {
		return /^(https?:)?\/\/(player.)?vimeo.com/.test(url)
	}

	function sec2time(sec) {
		var pad = function (n, s) {
				return ('000' + n).slice(s * -1);
			},
			t = parseFloat(sec).toFixed(3),
			h = Math.floor(t / 60 / 60),
			m = Math.floor(t / 60) % 60,
			s = Math.floor(t - m * 60),
			ms = t.slice(-3);
		return pad(h, 2) + ':' + pad(m, 2) + ':' + pad(s, 2);
	}

	function fireEvent(action, id, channel, title, duration, value) {
		if (id == null || title == null || duration == 0) {
			return
		}
		var category = "Vimeo Video" + " | " + channel;
		category += window.channel ? " | " + window.channel : "";
		var label = title + " | " + id + " | " + sec2time(duration);
		if (window.dataLayer) {
			window.dataLayer.push({
				event: "vimeo",
				event_category: category,
				event_action: action,
				event_label: label,
				event_value: value
			})
		} else if (window.ga) {
			window.ga("send", "event", category, action, label, value)
		} else if (window._gaq) {
			window._gaq.push(["_trackEvent", category, action, label, value])
		}
	}

	function trackPlayer(iframe) {
		var player = new window.Vimeo.Player(iframe);
		var progress = 0;
		var duration = 0;
		var value = 0;
		var time = 0;
		var id;
		var title;
		var url = window.location != window.parent.location ? document.referrer : document.location.href;
		url = url.replace("https://", "").replace("http://", "");
		var channel = url.split("/", 2).join("/");
		iframe.setAttribute("data-vimeo-tracked", true);
		player.off("play");
		player.off("timeupdate");
		player.off("ended");
		player.off("emailcapture");
		player.getVideoId().then(function (v) {
			id = v;
			fireEvent("load", id, channel, title, duration, value)
		});
		player.getVideoTitle().then(function (v) {
			title = v;
			fireEvent("load", id, channel, title, duration, value)
		});
		player.getDuration().then(function (v) {
			duration = v;
			fireEvent("load", id, channel, title, duration, value)
		});
		player.on("play", function (data) {
			value = data.seconds;
			fireEvent("play", id, channel, title, duration, value);
			player.off("play")
		});
		player.on("pause", function (data) {
			value = data.seconds;
			fireEvent("pause", id, channel, title, duration, value)
		});
		player.on("ended", function (data) {
			value = data.seconds;
			fireEvent("progress - 100%", id, channel, title, duration, value)
		});
		player.on("emailcapture", function (data) {
			value = data.seconds;
			fireEvent("emailcapture", id, channel, title, duration, value)
		});
		player.on("timeupdate", function (data) {
			var prev_progress = progress;
			value = data.seconds;
			time += .25;
			if (data.percent >= .25 && progress < .25) {
				progress = .25
			} else if (data.percent >= .5 && progress < .5) {
				progress = .5
			} else if (data.percent >= .75 && progress < .75) {
				progress = .75
			}
			if (prev_progress !== progress) {
				fireEvent("progress - " + progress * 100 + "%", id, channel, title, duration, value)
			}
		});
		window.onbeforeunload = function (e) {
			fireEvent("leave", id, channel, title, duration, time) /*player.getCurrentTime().then(function(v){value=v;fireEvent("leave",id,title,duration,value)})*/
		}
	}

	function init() {
		if (!window.ga && !window._gaq && !window.dataLayer) {
			console.warn("No analytics libraries detected when looking for _gaq, ga, and dataLayer");
			return
		}
		var iframes = document.querySelectorAll("iframe");
		for (var i = 0; i < iframes.length; i++) {
			if (isVimeoUrl(iframes[i].getAttribute("src"))) {
				trackPlayer(iframes[i])
			}
		}
	}
	init();
	window.__vimeoRefresh = init
})();
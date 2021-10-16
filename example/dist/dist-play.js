(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function e(t, i, r) {
  function n(s, o) {
    if (!i[s]) {
      if (!t[s]) {
        var l = "function" == typeof require && require;
        if (!o && l) return l(s, !0);
        if (a) return a(s, !0);
        var h = new Error("Cannot find module '" + s + "'");
        throw h.code = "MODULE_NOT_FOUND", h;
      }

      var u = i[s] = {
        exports: {}
      };
      t[s][0].call(u.exports, function (e) {
        return n(t[s][1][e] || e);
      }, u, u.exports, e, t, i, r);
    }

    return i[s].exports;
  }

  for (var a = "function" == typeof require && require, s = 0; s < r.length; s++) {
    n(r[s]);
  }

  return n;
}({
  1: [function (e, t, i) {
    var r,
        n,
        a = (r = new Date(), n = 4, {
      setLogLevel: function setLogLevel(e) {
        n = e == this.debug ? 1 : e == this.info ? 2 : e == this.warn ? 3 : (this.error, 4);
      },
      debug: function debug(e, t) {
        void 0 === console.debug && (console.debug = console.log), 1 >= n && console.debug("[" + a.getDurationString(new Date() - r, 1e3) + "]", "[" + e + "]", t);
      },
      log: function log(e, t) {
        this.debug(e.msg);
      },
      info: function info(e, t) {
        2 >= n && console.info("[" + a.getDurationString(new Date() - r, 1e3) + "]", "[" + e + "]", t);
      },
      warn: function warn(e, t) {
        3 >= n && a.getDurationString(new Date() - r, 1e3);
      },
      error: function error(e, t) {
        4 >= n && console.error("[" + a.getDurationString(new Date() - r, 1e3) + "]", "[" + e + "]", t);
      }
    });
    a.getDurationString = function (e, t) {
      var i;

      function r(e, t) {
        for (var i = ("" + e).split("."); i[0].length < t;) {
          i[0] = "0" + i[0];
        }

        return i.join(".");
      }

      e < 0 ? (i = !0, e = -e) : i = !1;
      var n = e / (t || 1),
          a = Math.floor(n / 3600);
      n -= 3600 * a;
      var s = Math.floor(n / 60),
          o = 1e3 * (n -= 60 * s);
      return o -= 1e3 * (n = Math.floor(n)), o = Math.floor(o), (i ? "-" : "") + a + ":" + r(s, 2) + ":" + r(n, 2) + "." + r(o, 3);
    }, a.printRanges = function (e) {
      var t = e.length;

      if (t > 0) {
        for (var i = "", r = 0; r < t; r++) {
          r > 0 && (i += ","), i += "[" + a.getDurationString(e.start(r)) + "," + a.getDurationString(e.end(r)) + "]";
        }

        return i;
      }

      return "(empty)";
    }, void 0 !== i && (i.Log = a);

    var s = function s(e) {
      if (!(e instanceof ArrayBuffer)) throw "Needs an array buffer";
      this.buffer = e, this.dataview = new DataView(e), this.position = 0;
    };

    s.prototype.getPosition = function () {
      return this.position;
    }, s.prototype.getEndPosition = function () {
      return this.buffer.byteLength;
    }, s.prototype.getLength = function () {
      return this.buffer.byteLength;
    }, s.prototype.seek = function (e) {
      var t = Math.max(0, Math.min(this.buffer.byteLength, e));
      return this.position = isNaN(t) || !isFinite(t) ? 0 : t, !0;
    }, s.prototype.isEos = function () {
      return this.getPosition() >= this.getEndPosition();
    }, s.prototype.readAnyInt = function (e, t) {
      var i = 0;

      if (this.position + e <= this.buffer.byteLength) {
        switch (e) {
          case 1:
            i = t ? this.dataview.getInt8(this.position) : this.dataview.getUint8(this.position);
            break;

          case 2:
            i = t ? this.dataview.getInt16(this.position) : this.dataview.getUint16(this.position);
            break;

          case 3:
            if (t) throw "No method for reading signed 24 bits values";
            i = this.dataview.getUint8(this.position) << 16, i |= this.dataview.getUint8(this.position) << 8, i |= this.dataview.getUint8(this.position);
            break;

          case 4:
            i = t ? this.dataview.getInt32(this.position) : this.dataview.getUint32(this.position);
            break;

          case 8:
            if (t) throw "No method for reading signed 64 bits values";
            i = this.dataview.getUint32(this.position) << 32, i |= this.dataview.getUint32(this.position);
            break;

          default:
            throw "readInt method not implemented for size: " + e;
        }

        return this.position += e, i;
      }

      throw "Not enough bytes in buffer";
    }, s.prototype.readUint8 = function () {
      return this.readAnyInt(1, !1);
    }, s.prototype.readUint16 = function () {
      return this.readAnyInt(2, !1);
    }, s.prototype.readUint24 = function () {
      return this.readAnyInt(3, !1);
    }, s.prototype.readUint32 = function () {
      return this.readAnyInt(4, !1);
    }, s.prototype.readUint64 = function () {
      return this.readAnyInt(8, !1);
    }, s.prototype.readString = function (e) {
      if (this.position + e <= this.buffer.byteLength) {
        for (var t = "", i = 0; i < e; i++) {
          t += String.fromCharCode(this.readUint8());
        }

        return t;
      }

      throw "Not enough bytes in buffer";
    }, s.prototype.readCString = function () {
      for (var e = [];;) {
        var t = this.readUint8();
        if (0 === t) break;
        e.push(t);
      }

      return String.fromCharCode.apply(null, e);
    }, s.prototype.readInt8 = function () {
      return this.readAnyInt(1, !0);
    }, s.prototype.readInt16 = function () {
      return this.readAnyInt(2, !0);
    }, s.prototype.readInt32 = function () {
      return this.readAnyInt(4, !0);
    }, s.prototype.readInt64 = function () {
      return this.readAnyInt(8, !1);
    }, s.prototype.readUint8Array = function (e) {
      for (var t = new Uint8Array(e), i = 0; i < e; i++) {
        t[i] = this.readUint8();
      }

      return t;
    }, s.prototype.readInt16Array = function (e) {
      for (var t = new Int16Array(e), i = 0; i < e; i++) {
        t[i] = this.readInt16();
      }

      return t;
    }, s.prototype.readUint16Array = function (e) {
      for (var t = new Int16Array(e), i = 0; i < e; i++) {
        t[i] = this.readUint16();
      }

      return t;
    }, s.prototype.readUint32Array = function (e) {
      for (var t = new Uint32Array(e), i = 0; i < e; i++) {
        t[i] = this.readUint32();
      }

      return t;
    }, s.prototype.readInt32Array = function (e) {
      for (var t = new Int32Array(e), i = 0; i < e; i++) {
        t[i] = this.readInt32();
      }

      return t;
    }, void 0 !== i && (i.MP4BoxStream = s);

    var o = function o(e, t, i) {
      this._byteOffset = t || 0, e instanceof ArrayBuffer ? this.buffer = e : "object" == _typeof(e) ? (this.dataView = e, t && (this._byteOffset += t)) : this.buffer = new ArrayBuffer(e || 0), this.position = 0, this.endianness = null == i ? o.LITTLE_ENDIAN : i;
    };

    o.prototype = {}, o.prototype.getPosition = function () {
      return this.position;
    }, o.prototype._realloc = function (e) {
      if (this._dynamicSize) {
        var t = this._byteOffset + this.position + e,
            i = this._buffer.byteLength;
        if (t <= i) t > this._byteLength && (this._byteLength = t);else {
          for (i < 1 && (i = 1); t > i;) {
            i *= 2;
          }

          var r = new ArrayBuffer(i),
              n = new Uint8Array(this._buffer);
          new Uint8Array(r, 0, n.length).set(n), this.buffer = r, this._byteLength = t;
        }
      }
    }, o.prototype._trimAlloc = function () {
      if (this._byteLength != this._buffer.byteLength) {
        var e = new ArrayBuffer(this._byteLength),
            t = new Uint8Array(e),
            i = new Uint8Array(this._buffer, 0, t.length);
        t.set(i), this.buffer = e;
      }
    }, o.BIG_ENDIAN = !1, o.LITTLE_ENDIAN = !0, o.prototype._byteLength = 0, Object.defineProperty(o.prototype, "byteLength", {
      get: function get() {
        return this._byteLength - this._byteOffset;
      }
    }), Object.defineProperty(o.prototype, "buffer", {
      get: function get() {
        return this._trimAlloc(), this._buffer;
      },
      set: function set(e) {
        this._buffer = e, this._dataView = new DataView(this._buffer, this._byteOffset), this._byteLength = this._buffer.byteLength;
      }
    }), Object.defineProperty(o.prototype, "byteOffset", {
      get: function get() {
        return this._byteOffset;
      },
      set: function set(e) {
        this._byteOffset = e, this._dataView = new DataView(this._buffer, this._byteOffset), this._byteLength = this._buffer.byteLength;
      }
    }), Object.defineProperty(o.prototype, "dataView", {
      get: function get() {
        return this._dataView;
      },
      set: function set(e) {
        this._byteOffset = e.byteOffset, this._buffer = e.buffer, this._dataView = new DataView(this._buffer, this._byteOffset), this._byteLength = this._byteOffset + e.byteLength;
      }
    }), o.prototype.seek = function (e) {
      var t = Math.max(0, Math.min(this.byteLength, e));
      this.position = isNaN(t) || !isFinite(t) ? 0 : t;
    }, o.prototype.isEof = function () {
      return this.position >= this._byteLength;
    }, o.prototype.mapUint8Array = function (e) {
      this._realloc(1 * e);

      var t = new Uint8Array(this._buffer, this.byteOffset + this.position, e);
      return this.position += 1 * e, t;
    }, o.prototype.readInt32Array = function (e, t) {
      e = null == e ? this.byteLength - this.position / 4 : e;
      var i = new Int32Array(e);
      return o.memcpy(i.buffer, 0, this.buffer, this.byteOffset + this.position, e * i.BYTES_PER_ELEMENT), o.arrayToNative(i, null == t ? this.endianness : t), this.position += i.byteLength, i;
    }, o.prototype.readInt16Array = function (e, t) {
      e = null == e ? this.byteLength - this.position / 2 : e;
      var i = new Int16Array(e);
      return o.memcpy(i.buffer, 0, this.buffer, this.byteOffset + this.position, e * i.BYTES_PER_ELEMENT), o.arrayToNative(i, null == t ? this.endianness : t), this.position += i.byteLength, i;
    }, o.prototype.readInt8Array = function (e) {
      e = null == e ? this.byteLength - this.position : e;
      var t = new Int8Array(e);
      return o.memcpy(t.buffer, 0, this.buffer, this.byteOffset + this.position, e * t.BYTES_PER_ELEMENT), this.position += t.byteLength, t;
    }, o.prototype.readUint32Array = function (e, t) {
      e = null == e ? this.byteLength - this.position / 4 : e;
      var i = new Uint32Array(e);
      return o.memcpy(i.buffer, 0, this.buffer, this.byteOffset + this.position, e * i.BYTES_PER_ELEMENT), o.arrayToNative(i, null == t ? this.endianness : t), this.position += i.byteLength, i;
    }, o.prototype.readUint16Array = function (e, t) {
      e = null == e ? this.byteLength - this.position / 2 : e;
      var i = new Uint16Array(e);
      return o.memcpy(i.buffer, 0, this.buffer, this.byteOffset + this.position, e * i.BYTES_PER_ELEMENT), o.arrayToNative(i, null == t ? this.endianness : t), this.position += i.byteLength, i;
    }, o.prototype.readUint8Array = function (e) {
      e = null == e ? this.byteLength - this.position : e;
      var t = new Uint8Array(e);
      return o.memcpy(t.buffer, 0, this.buffer, this.byteOffset + this.position, e * t.BYTES_PER_ELEMENT), this.position += t.byteLength, t;
    }, o.prototype.readFloat64Array = function (e, t) {
      e = null == e ? this.byteLength - this.position / 8 : e;
      var i = new Float64Array(e);
      return o.memcpy(i.buffer, 0, this.buffer, this.byteOffset + this.position, e * i.BYTES_PER_ELEMENT), o.arrayToNative(i, null == t ? this.endianness : t), this.position += i.byteLength, i;
    }, o.prototype.readFloat32Array = function (e, t) {
      e = null == e ? this.byteLength - this.position / 4 : e;
      var i = new Float32Array(e);
      return o.memcpy(i.buffer, 0, this.buffer, this.byteOffset + this.position, e * i.BYTES_PER_ELEMENT), o.arrayToNative(i, null == t ? this.endianness : t), this.position += i.byteLength, i;
    }, o.prototype.readInt32 = function (e) {
      var t = this._dataView.getInt32(this.position, null == e ? this.endianness : e);

      return this.position += 4, t;
    }, o.prototype.readInt16 = function (e) {
      var t = this._dataView.getInt16(this.position, null == e ? this.endianness : e);

      return this.position += 2, t;
    }, o.prototype.readInt8 = function () {
      var e = this._dataView.getInt8(this.position);

      return this.position += 1, e;
    }, o.prototype.readUint32 = function (e) {
      var t = this._dataView.getUint32(this.position, null == e ? this.endianness : e);

      return this.position += 4, t;
    }, o.prototype.readUint16 = function (e) {
      var t = this._dataView.getUint16(this.position, null == e ? this.endianness : e);

      return this.position += 2, t;
    }, o.prototype.readUint8 = function () {
      var e = this._dataView.getUint8(this.position);

      return this.position += 1, e;
    }, o.prototype.readFloat32 = function (e) {
      var t = this._dataView.getFloat32(this.position, null == e ? this.endianness : e);

      return this.position += 4, t;
    }, o.prototype.readFloat64 = function (e) {
      var t = this._dataView.getFloat64(this.position, null == e ? this.endianness : e);

      return this.position += 8, t;
    }, o.endianness = new Int8Array(new Int16Array([1]).buffer)[0] > 0, o.memcpy = function (e, t, i, r, n) {
      var a = new Uint8Array(e, t, n),
          s = new Uint8Array(i, r, n);
      a.set(s);
    }, o.arrayToNative = function (e, t) {
      return t == this.endianness ? e : this.flipArrayEndianness(e);
    }, o.nativeToEndian = function (e, t) {
      return this.endianness == t ? e : this.flipArrayEndianness(e);
    }, o.flipArrayEndianness = function (e) {
      for (var t = new Uint8Array(e.buffer, e.byteOffset, e.byteLength), i = 0; i < e.byteLength; i += e.BYTES_PER_ELEMENT) {
        for (var r = i + e.BYTES_PER_ELEMENT - 1, n = i; r > n; r--, n++) {
          var a = t[n];
          t[n] = t[r], t[r] = a;
        }
      }

      return e;
    }, o.prototype.failurePosition = 0, String.fromCharCodeUint8 = function (e) {
      for (var t = [], i = 0; i < e.length; i++) {
        t[i] = e[i];
      }

      return String.fromCharCode.apply(null, t);
    }, o.prototype.readString = function (e, t) {
      return null == t || "ASCII" == t ? String.fromCharCodeUint8.apply(null, [this.mapUint8Array(null == e ? this.byteLength - this.position : e)]) : new TextDecoder(t).decode(this.mapUint8Array(e));
    }, o.prototype.readCString = function (e) {
      var t = this.byteLength - this.position,
          i = new Uint8Array(this._buffer, this._byteOffset + this.position),
          r = t;
      null != e && (r = Math.min(e, t));

      for (var n = 0; n < r && 0 !== i[n]; n++) {
        ;
      }

      var a = String.fromCharCodeUint8.apply(null, [this.mapUint8Array(n)]);
      return null != e ? this.position += r - n : n != t && (this.position += 1), a;
    };
    var l = Math.pow(2, 32);
    o.prototype.readInt64 = function () {
      return this.readInt32() * l + this.readUint32();
    }, o.prototype.readUint64 = function () {
      return this.readUint32() * l + this.readUint32();
    }, o.prototype.readInt64 = function () {
      return this.readUint32() * l + this.readUint32();
    }, o.prototype.readUint24 = function () {
      return (this.readUint8() << 16) + (this.readUint8() << 8) + this.readUint8();
    }, void 0 !== i && (i.DataStream = o), o.prototype.save = function (e) {
      var t = new Blob([this.buffer]);
      if (!window.URL || !URL.createObjectURL) throw "DataStream.save: Can't create object URL.";
      var i = window.URL.createObjectURL(t),
          r = document.createElement("a");
      document.body.appendChild(r), r.setAttribute("href", i), r.setAttribute("download", e), r.setAttribute("target", "_self"), r.click(), window.URL.revokeObjectURL(i);
    }, o.prototype._dynamicSize = !0, Object.defineProperty(o.prototype, "dynamicSize", {
      get: function get() {
        return this._dynamicSize;
      },
      set: function set(e) {
        e || this._trimAlloc(), this._dynamicSize = e;
      }
    }), o.prototype.shift = function (e) {
      var t = new ArrayBuffer(this._byteLength - e),
          i = new Uint8Array(t),
          r = new Uint8Array(this._buffer, e, i.length);
      i.set(r), this.buffer = t, this.position -= e;
    }, o.prototype.writeInt32Array = function (e, t) {
      if (this._realloc(4 * e.length), e instanceof Int32Array && this.byteOffset + this.position % e.BYTES_PER_ELEMENT === 0) o.memcpy(this._buffer, this.byteOffset + this.position, e.buffer, 0, e.byteLength), this.mapInt32Array(e.length, t);else for (var i = 0; i < e.length; i++) {
        this.writeInt32(e[i], t);
      }
    }, o.prototype.writeInt16Array = function (e, t) {
      if (this._realloc(2 * e.length), e instanceof Int16Array && this.byteOffset + this.position % e.BYTES_PER_ELEMENT === 0) o.memcpy(this._buffer, this.byteOffset + this.position, e.buffer, 0, e.byteLength), this.mapInt16Array(e.length, t);else for (var i = 0; i < e.length; i++) {
        this.writeInt16(e[i], t);
      }
    }, o.prototype.writeInt8Array = function (e) {
      if (this._realloc(1 * e.length), e instanceof Int8Array && this.byteOffset + this.position % e.BYTES_PER_ELEMENT === 0) o.memcpy(this._buffer, this.byteOffset + this.position, e.buffer, 0, e.byteLength), this.mapInt8Array(e.length);else for (var t = 0; t < e.length; t++) {
        this.writeInt8(e[t]);
      }
    }, o.prototype.writeUint32Array = function (e, t) {
      if (this._realloc(4 * e.length), e instanceof Uint32Array && this.byteOffset + this.position % e.BYTES_PER_ELEMENT === 0) o.memcpy(this._buffer, this.byteOffset + this.position, e.buffer, 0, e.byteLength), this.mapUint32Array(e.length, t);else for (var i = 0; i < e.length; i++) {
        this.writeUint32(e[i], t);
      }
    }, o.prototype.writeUint16Array = function (e, t) {
      if (this._realloc(2 * e.length), e instanceof Uint16Array && this.byteOffset + this.position % e.BYTES_PER_ELEMENT === 0) o.memcpy(this._buffer, this.byteOffset + this.position, e.buffer, 0, e.byteLength), this.mapUint16Array(e.length, t);else for (var i = 0; i < e.length; i++) {
        this.writeUint16(e[i], t);
      }
    }, o.prototype.writeUint8Array = function (e) {
      if (this._realloc(1 * e.length), e instanceof Uint8Array && this.byteOffset + this.position % e.BYTES_PER_ELEMENT === 0) o.memcpy(this._buffer, this.byteOffset + this.position, e.buffer, 0, e.byteLength), this.mapUint8Array(e.length);else for (var t = 0; t < e.length; t++) {
        this.writeUint8(e[t]);
      }
    }, o.prototype.writeFloat64Array = function (e, t) {
      if (this._realloc(8 * e.length), e instanceof Float64Array && this.byteOffset + this.position % e.BYTES_PER_ELEMENT === 0) o.memcpy(this._buffer, this.byteOffset + this.position, e.buffer, 0, e.byteLength), this.mapFloat64Array(e.length, t);else for (var i = 0; i < e.length; i++) {
        this.writeFloat64(e[i], t);
      }
    }, o.prototype.writeFloat32Array = function (e, t) {
      if (this._realloc(4 * e.length), e instanceof Float32Array && this.byteOffset + this.position % e.BYTES_PER_ELEMENT === 0) o.memcpy(this._buffer, this.byteOffset + this.position, e.buffer, 0, e.byteLength), this.mapFloat32Array(e.length, t);else for (var i = 0; i < e.length; i++) {
        this.writeFloat32(e[i], t);
      }
    }, o.prototype.writeInt32 = function (e, t) {
      this._realloc(4), this._dataView.setInt32(this.position, e, null == t ? this.endianness : t), this.position += 4;
    }, o.prototype.writeInt16 = function (e, t) {
      this._realloc(2), this._dataView.setInt16(this.position, e, null == t ? this.endianness : t), this.position += 2;
    }, o.prototype.writeInt8 = function (e) {
      this._realloc(1), this._dataView.setInt8(this.position, e), this.position += 1;
    }, o.prototype.writeUint32 = function (e, t) {
      this._realloc(4), this._dataView.setUint32(this.position, e, null == t ? this.endianness : t), this.position += 4;
    }, o.prototype.writeUint16 = function (e, t) {
      this._realloc(2), this._dataView.setUint16(this.position, e, null == t ? this.endianness : t), this.position += 2;
    }, o.prototype.writeUint8 = function (e) {
      this._realloc(1), this._dataView.setUint8(this.position, e), this.position += 1;
    }, o.prototype.writeFloat32 = function (e, t) {
      this._realloc(4), this._dataView.setFloat32(this.position, e, null == t ? this.endianness : t), this.position += 4;
    }, o.prototype.writeFloat64 = function (e, t) {
      this._realloc(8), this._dataView.setFloat64(this.position, e, null == t ? this.endianness : t), this.position += 8;
    }, o.prototype.writeUCS2String = function (e, t, i) {
      null == i && (i = e.length);

      for (var r = 0; r < e.length && r < i; r++) {
        this.writeUint16(e.charCodeAt(r), t);
      }

      for (; r < i; r++) {
        this.writeUint16(0);
      }
    }, o.prototype.writeString = function (e, t, i) {
      var r = 0;
      if (null == t || "ASCII" == t) {
        if (null != i) {
          var n = Math.min(e.length, i);

          for (r = 0; r < n; r++) {
            this.writeUint8(e.charCodeAt(r));
          }

          for (; r < i; r++) {
            this.writeUint8(0);
          }
        } else for (r = 0; r < e.length; r++) {
          this.writeUint8(e.charCodeAt(r));
        }
      } else this.writeUint8Array(new TextEncoder(t).encode(e.substring(0, i)));
    }, o.prototype.writeCString = function (e, t) {
      var i = 0;

      if (null != t) {
        var r = Math.min(e.length, t);

        for (i = 0; i < r; i++) {
          this.writeUint8(e.charCodeAt(i));
        }

        for (; i < t; i++) {
          this.writeUint8(0);
        }
      } else {
        for (i = 0; i < e.length; i++) {
          this.writeUint8(e.charCodeAt(i));
        }

        this.writeUint8(0);
      }
    }, o.prototype.writeStruct = function (e, t) {
      for (var i = 0; i < e.length; i += 2) {
        var r = e[i + 1];
        this.writeType(r, t[e[i]], t);
      }
    }, o.prototype.writeType = function (e, t, i) {
      var r;
      if ("function" == typeof e) return e(this, t);
      if ("object" == _typeof(e) && !(e instanceof Array)) return e.set(this, t, i);
      var n = null,
          a = "ASCII",
          s = this.position;

      switch ("string" == typeof e && /:/.test(e) && (r = e.split(":"), e = r[0], n = parseInt(r[1])), "string" == typeof e && /,/.test(e) && (r = e.split(","), e = r[0], a = parseInt(r[1])), e) {
        case "uint8":
          this.writeUint8(t);
          break;

        case "int8":
          this.writeInt8(t);
          break;

        case "uint16":
          this.writeUint16(t, this.endianness);
          break;

        case "int16":
          this.writeInt16(t, this.endianness);
          break;

        case "uint32":
          this.writeUint32(t, this.endianness);
          break;

        case "int32":
          this.writeInt32(t, this.endianness);
          break;

        case "float32":
          this.writeFloat32(t, this.endianness);
          break;

        case "float64":
          this.writeFloat64(t, this.endianness);
          break;

        case "uint16be":
          this.writeUint16(t, o.BIG_ENDIAN);
          break;

        case "int16be":
          this.writeInt16(t, o.BIG_ENDIAN);
          break;

        case "uint32be":
          this.writeUint32(t, o.BIG_ENDIAN);
          break;

        case "int32be":
          this.writeInt32(t, o.BIG_ENDIAN);
          break;

        case "float32be":
          this.writeFloat32(t, o.BIG_ENDIAN);
          break;

        case "float64be":
          this.writeFloat64(t, o.BIG_ENDIAN);
          break;

        case "uint16le":
          this.writeUint16(t, o.LITTLE_ENDIAN);
          break;

        case "int16le":
          this.writeInt16(t, o.LITTLE_ENDIAN);
          break;

        case "uint32le":
          this.writeUint32(t, o.LITTLE_ENDIAN);
          break;

        case "int32le":
          this.writeInt32(t, o.LITTLE_ENDIAN);
          break;

        case "float32le":
          this.writeFloat32(t, o.LITTLE_ENDIAN);
          break;

        case "float64le":
          this.writeFloat64(t, o.LITTLE_ENDIAN);
          break;

        case "cstring":
          this.writeCString(t, n);
          break;

        case "string":
          this.writeString(t, a, n);
          break;

        case "u16string":
          this.writeUCS2String(t, this.endianness, n);
          break;

        case "u16stringle":
          this.writeUCS2String(t, o.LITTLE_ENDIAN, n);
          break;

        case "u16stringbe":
          this.writeUCS2String(t, o.BIG_ENDIAN, n);
          break;

        default:
          if (3 == e.length) {
            for (var l = e[1], h = 0; h < t.length; h++) {
              this.writeType(l, t[h]);
            }

            break;
          }

          this.writeStruct(e, t);
      }

      null != n && (this.position = s, this._realloc(n), this.position = s + n);
    }, o.prototype.writeUint64 = function (e) {
      var t = Math.floor(e / l);
      this.writeUint32(t), this.writeUint32(4294967295 & e);
    }, o.prototype.writeUint24 = function (e) {
      this.writeUint8((16711680 & e) >> 16), this.writeUint8((65280 & e) >> 8), this.writeUint8(255 & e);
    }, o.prototype.adjustUint32 = function (e, t) {
      var i = this.position;
      this.seek(e), this.writeUint32(t), this.seek(i);
    }, o.prototype.mapInt32Array = function (e, t) {
      this._realloc(4 * e);

      var i = new Int32Array(this._buffer, this.byteOffset + this.position, e);
      return o.arrayToNative(i, null == t ? this.endianness : t), this.position += 4 * e, i;
    }, o.prototype.mapInt16Array = function (e, t) {
      this._realloc(2 * e);

      var i = new Int16Array(this._buffer, this.byteOffset + this.position, e);
      return o.arrayToNative(i, null == t ? this.endianness : t), this.position += 2 * e, i;
    }, o.prototype.mapInt8Array = function (e) {
      this._realloc(1 * e);

      var t = new Int8Array(this._buffer, this.byteOffset + this.position, e);
      return this.position += 1 * e, t;
    }, o.prototype.mapUint32Array = function (e, t) {
      this._realloc(4 * e);

      var i = new Uint32Array(this._buffer, this.byteOffset + this.position, e);
      return o.arrayToNative(i, null == t ? this.endianness : t), this.position += 4 * e, i;
    }, o.prototype.mapUint16Array = function (e, t) {
      this._realloc(2 * e);

      var i = new Uint16Array(this._buffer, this.byteOffset + this.position, e);
      return o.arrayToNative(i, null == t ? this.endianness : t), this.position += 2 * e, i;
    }, o.prototype.mapFloat64Array = function (e, t) {
      this._realloc(8 * e);

      var i = new Float64Array(this._buffer, this.byteOffset + this.position, e);
      return o.arrayToNative(i, null == t ? this.endianness : t), this.position += 8 * e, i;
    }, o.prototype.mapFloat32Array = function (e, t) {
      this._realloc(4 * e);

      var i = new Float32Array(this._buffer, this.byteOffset + this.position, e);
      return o.arrayToNative(i, null == t ? this.endianness : t), this.position += 4 * e, i;
    };

    var h = function h(e) {
      this.buffers = [], this.bufferIndex = -1, e && (this.insertBuffer(e), this.bufferIndex = 0);
    };

    (h.prototype = new o(new ArrayBuffer(), 0, o.BIG_ENDIAN)).initialized = function () {
      var e;
      return this.bufferIndex > -1 || (this.buffers.length > 0 ? 0 === (e = this.buffers[0]).fileStart ? (this.buffer = e, this.bufferIndex = 0, a.debug("MultiBufferStream", "Stream ready for parsing"), !0) : (a.warn("MultiBufferStream", "The first buffer should have a fileStart of 0"), this.logBufferLevel(), !1) : (a.warn("MultiBufferStream", "No buffer to start parsing from"), this.logBufferLevel(), !1));
    }, ArrayBuffer.concat = function (e, t) {
      a.debug("ArrayBuffer", "Trying to create a new buffer of size: " + (e.byteLength + t.byteLength));
      var i = new Uint8Array(e.byteLength + t.byteLength);
      return i.set(new Uint8Array(e), 0), i.set(new Uint8Array(t), e.byteLength), i.buffer;
    }, h.prototype.reduceBuffer = function (e, t, i) {
      var r;
      return (r = new Uint8Array(i)).set(new Uint8Array(e, t, i)), r.buffer.fileStart = e.fileStart + t, r.buffer.usedBytes = 0, r.buffer;
    }, h.prototype.insertBuffer = function (e) {
      for (var t = !0, i = 0; i < this.buffers.length; i++) {
        var r = this.buffers[i];

        if (e.fileStart <= r.fileStart) {
          if (e.fileStart === r.fileStart) {
            if (e.byteLength > r.byteLength) {
              this.buffers.splice(i, 1), i--;
              continue;
            }

            a.warn("MultiBufferStream", "Buffer (fileStart: " + e.fileStart + " - Length: " + e.byteLength + ") already appended, ignoring");
          } else e.fileStart + e.byteLength <= r.fileStart || (e = this.reduceBuffer(e, 0, r.fileStart - e.fileStart)), a.debug("MultiBufferStream", "Appending new buffer (fileStart: " + e.fileStart + " - Length: " + e.byteLength + ")"), this.buffers.splice(i, 0, e), 0 === i && (this.buffer = e);

          t = !1;
          break;
        }

        if (e.fileStart < r.fileStart + r.byteLength) {
          var n = r.fileStart + r.byteLength - e.fileStart,
              s = e.byteLength - n;

          if (!(s > 0)) {
            t = !1;
            break;
          }

          e = this.reduceBuffer(e, n, s);
        }
      }

      t && (a.debug("MultiBufferStream", "Appending new buffer (fileStart: " + e.fileStart + " - Length: " + e.byteLength + ")"), this.buffers.push(e), 0 === i && (this.buffer = e));
    }, h.prototype.logBufferLevel = function (e) {
      var t,
          i,
          r,
          n,
          s,
          o = [],
          l = "";

      for (r = 0, n = 0, t = 0; t < this.buffers.length; t++) {
        i = this.buffers[t], 0 === t ? (s = {}, o.push(s), s.start = i.fileStart, s.end = i.fileStart + i.byteLength, l += "[" + s.start + "-") : s.end === i.fileStart ? s.end = i.fileStart + i.byteLength : ((s = {}).start = i.fileStart, l += o[o.length - 1].end - 1 + "], [" + s.start + "-", s.end = i.fileStart + i.byteLength, o.push(s)), r += i.usedBytes, n += i.byteLength;
      }

      o.length > 0 && (l += s.end - 1 + "]");
      var h = e ? a.info : a.debug;
      0 === this.buffers.length ? h("MultiBufferStream", "No more buffer in memory") : h("MultiBufferStream", this.buffers.length + " stored buffer(s) (" + r + "/" + n + " bytes): " + l);
    }, h.prototype.cleanBuffers = function () {
      var e, t;

      for (e = 0; e < this.buffers.length; e++) {
        (t = this.buffers[e]).usedBytes === t.byteLength && (a.debug("MultiBufferStream", "Removing buffer #" + e), this.buffers.splice(e, 1), e--);
      }
    }, h.prototype.mergeNextBuffer = function () {
      var e;

      if (this.bufferIndex + 1 < this.buffers.length) {
        if ((e = this.buffers[this.bufferIndex + 1]).fileStart === this.buffer.fileStart + this.buffer.byteLength) {
          var t = this.buffer.byteLength,
              i = this.buffer.usedBytes,
              r = this.buffer.fileStart;
          return this.buffers[this.bufferIndex] = ArrayBuffer.concat(this.buffer, e), this.buffer = this.buffers[this.bufferIndex], this.buffers.splice(this.bufferIndex + 1, 1), this.buffer.usedBytes = i, this.buffer.fileStart = r, a.debug("ISOFile", "Concatenating buffer for box parsing (length: " + t + "->" + this.buffer.byteLength + ")"), !0;
        }

        return !1;
      }

      return !1;
    }, h.prototype.findPosition = function (e, t, i) {
      var r,
          n = null,
          s = -1;

      for (r = !0 === e ? 0 : this.bufferIndex; r < this.buffers.length && (n = this.buffers[r]).fileStart <= t;) {
        s = r, i && (n.fileStart + n.byteLength <= t ? n.usedBytes = n.byteLength : n.usedBytes = t - n.fileStart, this.logBufferLevel()), r++;
      }

      return -1 !== s && (n = this.buffers[s]).fileStart + n.byteLength >= t ? (a.debug("MultiBufferStream", "Found position in existing buffer #" + s), s) : -1;
    }, h.prototype.findEndContiguousBuf = function (e) {
      var t,
          i,
          r,
          n = void 0 !== e ? e : this.bufferIndex;
      if (i = this.buffers[n], this.buffers.length > n + 1) for (t = n + 1; t < this.buffers.length && (r = this.buffers[t]).fileStart === i.fileStart + i.byteLength; t++) {
        i = r;
      }
      return i.fileStart + i.byteLength;
    }, h.prototype.getEndFilePositionAfter = function (e) {
      var t = this.findPosition(!0, e, !1);
      return -1 !== t ? this.findEndContiguousBuf(t) : e;
    }, h.prototype.addUsedBytes = function (e) {
      this.buffer.usedBytes += e, this.logBufferLevel();
    }, h.prototype.setAllUsedBytes = function () {
      this.buffer.usedBytes = this.buffer.byteLength, this.logBufferLevel();
    }, h.prototype.seek = function (e, t, i) {
      var r;
      return -1 !== (r = this.findPosition(t, e, i)) ? (this.buffer = this.buffers[r], this.bufferIndex = r, this.position = e - this.buffer.fileStart, a.debug("MultiBufferStream", "Repositioning parser at buffer position: " + this.position), !0) : (a.debug("MultiBufferStream", "Position " + e + " not found in buffered data"), !1);
    }, h.prototype.getPosition = function () {
      if (-1 === this.bufferIndex || null === this.buffers[this.bufferIndex]) throw "Error accessing position in the MultiBufferStream";
      return this.buffers[this.bufferIndex].fileStart + this.position;
    }, h.prototype.getLength = function () {
      return this.byteLength;
    }, h.prototype.getEndPosition = function () {
      if (-1 === this.bufferIndex || null === this.buffers[this.bufferIndex]) throw "Error accessing position in the MultiBufferStream";
      return this.buffers[this.bufferIndex].fileStart + this.byteLength;
    }, void 0 !== i && (i.MultiBufferStream = h);

    var u = function u() {
      var e = [];
      e[3] = "ES_Descriptor", e[4] = "DecoderConfigDescriptor", e[5] = "DecoderSpecificInfo", e[6] = "SLConfigDescriptor", this.getDescriptorName = function (t) {
        return e[t];
      };
      var t = this,
          i = {};
      return this.parseOneDescriptor = function (t) {
        var r,
            n,
            s,
            o = 0;

        for (r = t.readUint8(), s = t.readUint8(); 128 & s;) {
          o = (127 & s) << 7, s = t.readUint8();
        }

        return o += 127 & s, a.debug("MPEG4DescriptorParser", "Found " + (e[r] || "Descriptor " + r) + ", size " + o + " at position " + t.getPosition()), (n = e[r] ? new i[e[r]](o) : new i.Descriptor(o)).parse(t), n;
      }, i.Descriptor = function (e, t) {
        this.tag = e, this.size = t, this.descs = [];
      }, i.Descriptor.prototype.parse = function (e) {
        this.data = e.readUint8Array(this.size);
      }, i.Descriptor.prototype.findDescriptor = function (e) {
        for (var t = 0; t < this.descs.length; t++) {
          if (this.descs[t].tag == e) return this.descs[t];
        }

        return null;
      }, i.Descriptor.prototype.parseRemainingDescriptors = function (e) {
        for (var i = e.position; e.position < i + this.size;) {
          var r = t.parseOneDescriptor(e);
          this.descs.push(r);
        }
      }, i.ES_Descriptor = function (e) {
        i.Descriptor.call(this, 3, e);
      }, i.ES_Descriptor.prototype = new i.Descriptor(), i.ES_Descriptor.prototype.parse = function (e) {
        if (this.ES_ID = e.readUint16(), this.flags = e.readUint8(), this.size -= 3, 128 & this.flags ? (this.dependsOn_ES_ID = e.readUint16(), this.size -= 2) : this.dependsOn_ES_ID = 0, 64 & this.flags) {
          var t = e.readUint8();
          this.URL = e.readString(t), this.size -= t + 1;
        } else this.URL = "";

        32 & this.flags ? (this.OCR_ES_ID = e.readUint16(), this.size -= 2) : this.OCR_ES_ID = 0, this.parseRemainingDescriptors(e);
      }, i.ES_Descriptor.prototype.getOTI = function (e) {
        var t = this.findDescriptor(4);
        return t ? t.oti : 0;
      }, i.ES_Descriptor.prototype.getAudioConfig = function (e) {
        var t = this.findDescriptor(4);
        if (!t) return null;
        var i = t.findDescriptor(5);

        if (i && i.data) {
          var r = (248 & i.data[0]) >> 3;
          return 31 === r && i.data.length >= 2 && (r = 32 + ((7 & i.data[0]) << 3) + ((224 & i.data[1]) >> 5)), r;
        }

        return null;
      }, i.DecoderConfigDescriptor = function (e) {
        i.Descriptor.call(this, 4, e);
      }, i.DecoderConfigDescriptor.prototype = new i.Descriptor(), i.DecoderConfigDescriptor.prototype.parse = function (e) {
        this.oti = e.readUint8(), this.streamType = e.readUint8(), this.bufferSize = e.readUint24(), this.maxBitrate = e.readUint32(), this.avgBitrate = e.readUint32(), this.size -= 13, this.parseRemainingDescriptors(e);
      }, i.DecoderSpecificInfo = function (e) {
        i.Descriptor.call(this, 5, e);
      }, i.DecoderSpecificInfo.prototype = new i.Descriptor(), i.SLConfigDescriptor = function (e) {
        i.Descriptor.call(this, 6, e);
      }, i.SLConfigDescriptor.prototype = new i.Descriptor(), this;
    };

    void 0 !== i && (i.MPEG4DescriptorParser = u);
    var d = {
      ERR_INVALID_DATA: -1,
      ERR_NOT_ENOUGH_DATA: 0,
      OK: 1,
      BASIC_BOXES: ["mdat", "idat", "free", "skip", "meco", "strk"],
      FULL_BOXES: ["hmhd", "nmhd", "iods", "xml ", "bxml", "ipro", "mere"],
      CONTAINER_BOXES: [["moov", ["trak", "pssh"]], ["trak"], ["edts"], ["mdia"], ["minf"], ["dinf"], ["stbl", ["sgpd", "sbgp"]], ["mvex", ["trex"]], ["moof", ["traf"]], ["traf", ["trun", "sgpd", "sbgp"]], ["vttc"], ["tref"], ["iref"], ["mfra", ["tfra"]], ["meco"], ["hnti"], ["hinf"], ["strk"], ["strd"], ["sinf"], ["rinf"], ["schi"], ["trgr"], ["udta", ["kind"]], ["iprp", ["ipma"]], ["ipco"]],
      boxCodes: [],
      fullBoxCodes: [],
      containerBoxCodes: [],
      sampleEntryCodes: {},
      sampleGroupEntryCodes: [],
      trackGroupTypes: [],
      UUIDBoxes: {},
      UUIDs: [],
      initialize: function initialize() {
        d.FullBox.prototype = new d.Box(), d.ContainerBox.prototype = new d.Box(), d.SampleEntry.prototype = new d.Box(), d.TrackGroupTypeBox.prototype = new d.FullBox(), d.BASIC_BOXES.forEach(function (e) {
          d.createBoxCtor(e);
        }), d.FULL_BOXES.forEach(function (e) {
          d.createFullBoxCtor(e);
        }), d.CONTAINER_BOXES.forEach(function (e) {
          d.createContainerBoxCtor(e[0], null, e[1]);
        });
      },
      Box: function Box(e, t, i) {
        this.type = e, this.size = t, this.uuid = i;
      },
      FullBox: function FullBox(e, t, i) {
        d.Box.call(this, e, t, i), this.flags = 0, this.version = 0;
      },
      ContainerBox: function ContainerBox(e, t, i) {
        d.Box.call(this, e, t, i), this.boxes = [];
      },
      SampleEntry: function SampleEntry(e, t, i, r) {
        d.ContainerBox.call(this, e, t), this.hdr_size = i, this.start = r;
      },
      SampleGroupEntry: function SampleGroupEntry(e) {
        this.grouping_type = e;
      },
      TrackGroupTypeBox: function TrackGroupTypeBox(e, t) {
        d.FullBox.call(this, e, t);
      },
      createBoxCtor: function createBoxCtor(e, t) {
        d.boxCodes.push(e), d[e + "Box"] = function (t) {
          d.Box.call(this, e, t);
        }, d[e + "Box"].prototype = new d.Box(), t && (d[e + "Box"].prototype.parse = t);
      },
      createFullBoxCtor: function createFullBoxCtor(e, t) {
        d[e + "Box"] = function (t) {
          d.FullBox.call(this, e, t);
        }, d[e + "Box"].prototype = new d.FullBox(), d[e + "Box"].prototype.parse = function (e) {
          this.parseFullHeader(e), t && t.call(this, e);
        };
      },
      addSubBoxArrays: function addSubBoxArrays(e) {
        if (e) {
          this.subBoxNames = e;

          for (var t = e.length, i = 0; i < t; i++) {
            this[e[i] + "s"] = [];
          }
        }
      },
      createContainerBoxCtor: function createContainerBoxCtor(e, t, i) {
        d[e + "Box"] = function (t) {
          d.ContainerBox.call(this, e, t), d.addSubBoxArrays.call(this, i);
        }, d[e + "Box"].prototype = new d.ContainerBox(), t && (d[e + "Box"].prototype.parse = t);
      },
      createMediaSampleEntryCtor: function createMediaSampleEntryCtor(e, t, i) {
        d.sampleEntryCodes[e] = [], d[e + "SampleEntry"] = function (e, t) {
          d.SampleEntry.call(this, e, t), d.addSubBoxArrays.call(this, i);
        }, d[e + "SampleEntry"].prototype = new d.SampleEntry(), t && (d[e + "SampleEntry"].prototype.parse = t);
      },
      createSampleEntryCtor: function createSampleEntryCtor(e, t, i, r) {
        d.sampleEntryCodes[e].push(t), d[t + "SampleEntry"] = function (i) {
          d[e + "SampleEntry"].call(this, t, i), d.addSubBoxArrays.call(this, r);
        }, d[t + "SampleEntry"].prototype = new d[e + "SampleEntry"](), i && (d[t + "SampleEntry"].prototype.parse = i);
      },
      createEncryptedSampleEntryCtor: function createEncryptedSampleEntryCtor(e, t, i) {
        d.createSampleEntryCtor.call(this, e, t, i, ["sinf"]);
      },
      createSampleGroupCtor: function createSampleGroupCtor(e, t) {
        d[e + "SampleGroupEntry"] = function (t) {
          d.SampleGroupEntry.call(this, e, t);
        }, d[e + "SampleGroupEntry"].prototype = new d.SampleGroupEntry(), t && (d[e + "SampleGroupEntry"].prototype.parse = t);
      },
      createTrackGroupCtor: function createTrackGroupCtor(e, t) {
        d[e + "TrackGroupTypeBox"] = function (t) {
          d.TrackGroupTypeBox.call(this, e, t);
        }, d[e + "TrackGroupTypeBox"].prototype = new d.TrackGroupTypeBox(), t && (d[e + "TrackGroupTypeBox"].prototype.parse = t);
      },
      createUUIDBox: function createUUIDBox(e, t, i, r) {
        d.UUIDs.push(e), d.UUIDBoxes[e] = function (r) {
          t ? d.FullBox.call(this, "uuid", r, e) : i ? d.ContainerBox.call(this, "uuid", r, e) : d.Box.call(this, "uuid", r, e);
        }, d.UUIDBoxes[e].prototype = t ? new d.FullBox() : i ? new d.ContainerBox() : new d.Box(), r && (d.UUIDBoxes[e].prototype.parse = t ? function (e) {
          this.parseFullHeader(e), r && r.call(this, e);
        } : r);
      }
    };
    d.initialize(), d.TKHD_FLAG_ENABLED = 1, d.TKHD_FLAG_IN_MOVIE = 2, d.TKHD_FLAG_IN_PREVIEW = 4, d.TFHD_FLAG_BASE_DATA_OFFSET = 1, d.TFHD_FLAG_SAMPLE_DESC = 2, d.TFHD_FLAG_SAMPLE_DUR = 8, d.TFHD_FLAG_SAMPLE_SIZE = 16, d.TFHD_FLAG_SAMPLE_FLAGS = 32, d.TFHD_FLAG_DUR_EMPTY = 65536, d.TFHD_FLAG_DEFAULT_BASE_IS_MOOF = 131072, d.TRUN_FLAGS_DATA_OFFSET = 1, d.TRUN_FLAGS_FIRST_FLAG = 4, d.TRUN_FLAGS_DURATION = 256, d.TRUN_FLAGS_SIZE = 512, d.TRUN_FLAGS_FLAGS = 1024, d.TRUN_FLAGS_CTS_OFFSET = 2048, d.Box.prototype.add = function (e) {
      return this.addBox(new d[e + "Box"]());
    }, d.Box.prototype.addBox = function (e) {
      return this.boxes.push(e), this[e.type + "s"] ? this[e.type + "s"].push(e) : this[e.type] = e, e;
    }, d.Box.prototype.set = function (e, t) {
      return this[e] = t, this;
    }, d.Box.prototype.addEntry = function (e, t) {
      var i = t || "entries";
      return this[i] || (this[i] = []), this[i].push(e), this;
    }, void 0 !== i && (i.BoxParser = d), d.parseUUID = function (e) {
      return d.parseHex16(e);
    }, d.parseHex16 = function (e) {
      for (var t = "", i = 0; i < 16; i++) {
        var r = e.readUint8().toString(16);
        t += 1 === r.length ? "0" + r : r;
      }

      return t;
    }, d.parseOneBox = function (e, t, i) {
      var r,
          n,
          s,
          o = e.getPosition(),
          l = 0;
      if (e.getEndPosition() - o < 8) return a.debug("BoxParser", "Not enough data in stream to parse the type and size of the box"), {
        code: d.ERR_NOT_ENOUGH_DATA
      };
      if (i && i < 8) return a.debug("BoxParser", "Not enough bytes left in the parent box to parse a new box"), {
        code: d.ERR_NOT_ENOUGH_DATA
      };
      var h = e.readUint32(),
          u = e.readString(4),
          f = u;

      if (a.debug("BoxParser", "Found box of type '" + u + "' and size " + h + " at position " + o), l = 8, "uuid" == u) {
        if (e.getEndPosition() - e.getPosition() < 16 || i - l < 16) return e.seek(o), a.debug("BoxParser", "Not enough bytes left in the parent box to parse a UUID box"), {
          code: d.ERR_NOT_ENOUGH_DATA
        };
        l += 16, f = s = d.parseUUID(e);
      }

      if (1 == h) {
        if (e.getEndPosition() - e.getPosition() < 8 || i && i - l < 8) return e.seek(o), a.warn("BoxParser", 'Not enough data in stream to parse the extended size of the "' + u + '" box'), {
          code: d.ERR_NOT_ENOUGH_DATA
        };
        h = e.readUint64(), l += 8;
      } else if (0 === h) if (i) h = i;else if ("mdat" !== u) return a.error("BoxParser", "Unlimited box size not supported for type: '" + u + "'"), r = new d.Box(u, h), {
        code: d.OK,
        box: r,
        size: r.size
      };

      return h < l ? (a.error("BoxParser", "Box of type " + u + " has an invalid size " + h + " (too small to be a box)"), {
        code: d.ERR_NOT_ENOUGH_DATA,
        type: u,
        size: h,
        hdr_size: l,
        start: o
      }) : i && h > i ? (a.error("BoxParser", "Box of type '" + u + "' has a size " + h + " greater than its container size " + i), {
        code: d.ERR_NOT_ENOUGH_DATA,
        type: u,
        size: h,
        hdr_size: l,
        start: o
      }) : o + h > e.getEndPosition() ? (e.seek(o), a.info("BoxParser", "Not enough data in stream to parse the entire '" + u + "' box"), {
        code: d.ERR_NOT_ENOUGH_DATA,
        type: u,
        size: h,
        hdr_size: l,
        start: o
      }) : t ? {
        code: d.OK,
        type: u,
        size: h,
        hdr_size: l,
        start: o
      } : (d[u + "Box"] ? r = new d[u + "Box"](h) : "uuid" !== u ? (a.warn("BoxParser", "Unknown box type: '" + u + "'"), (r = new d.Box(u, h)).has_unparsed_data = !0) : d.UUIDBoxes[s] ? r = new d.UUIDBoxes[s](h) : (a.warn("BoxParser", "Unknown uuid type: '" + s + "'"), (r = new d.Box(u, h)).uuid = s, r.has_unparsed_data = !0), r.hdr_size = l, r.start = o, r.write === d.Box.prototype.write && "mdat" !== r.type && (a.info("BoxParser", "'" + f + "' box writing not yet implemented, keeping unparsed data in memory for later write"), r.parseDataAndRewind(e)), r.parse(e), (n = e.getPosition() - (r.start + r.size)) < 0 ? (a.warn("BoxParser", "Parsing of box '" + f + "' did not read the entire indicated box data size (missing " + -n + " bytes), seeking forward"), e.seek(r.start + r.size)) : n > 0 && (a.error("BoxParser", "Parsing of box '" + f + "' read " + n + " more bytes than the indicated box data size, seeking backwards"), e.seek(r.start + r.size)), {
        code: d.OK,
        box: r,
        size: r.size
      });
    }, d.Box.prototype.parse = function (e) {
      "mdat" != this.type ? this.data = e.readUint8Array(this.size - this.hdr_size) : 0 === this.size ? e.seek(e.getEndPosition()) : e.seek(this.start + this.size);
    }, d.Box.prototype.parseDataAndRewind = function (e) {
      this.data = e.readUint8Array(this.size - this.hdr_size), e.position -= this.size - this.hdr_size;
    }, d.FullBox.prototype.parseDataAndRewind = function (e) {
      this.parseFullHeader(e), this.data = e.readUint8Array(this.size - this.hdr_size), this.hdr_size -= 4, e.position -= this.size - this.hdr_size;
    }, d.FullBox.prototype.parseFullHeader = function (e) {
      this.version = e.readUint8(), this.flags = e.readUint24(), this.hdr_size += 4;
    }, d.FullBox.prototype.parse = function (e) {
      this.parseFullHeader(e), this.data = e.readUint8Array(this.size - this.hdr_size);
    }, d.ContainerBox.prototype.parse = function (e) {
      for (var t, i; e.getPosition() < this.start + this.size;) {
        if ((t = d.parseOneBox(e, !1, this.size - (e.getPosition() - this.start))).code !== d.OK) return;
        if (i = t.box, this.boxes.push(i), this.subBoxNames && -1 != this.subBoxNames.indexOf(i.type)) this[this.subBoxNames[this.subBoxNames.indexOf(i.type)] + "s"].push(i);else {
          var r = "uuid" !== i.type ? i.type : i.uuid;
          this[r] ? a.warn("Box of type " + r + " already stored in field of this type") : this[r] = i;
        }
      }
    }, d.Box.prototype.parseLanguage = function (e) {
      this.language = e.readUint16();
      var t = [];
      t[0] = this.language >> 10 & 31, t[1] = this.language >> 5 & 31, t[2] = 31 & this.language, this.languageString = String.fromCharCode(t[0] + 96, t[1] + 96, t[2] + 96);
    }, d.SAMPLE_ENTRY_TYPE_VISUAL = "Visual", d.SAMPLE_ENTRY_TYPE_AUDIO = "Audio", d.SAMPLE_ENTRY_TYPE_HINT = "Hint", d.SAMPLE_ENTRY_TYPE_METADATA = "Metadata", d.SAMPLE_ENTRY_TYPE_SUBTITLE = "Subtitle", d.SAMPLE_ENTRY_TYPE_SYSTEM = "System", d.SAMPLE_ENTRY_TYPE_TEXT = "Text", d.SampleEntry.prototype.parseHeader = function (e) {
      e.readUint8Array(6), this.data_reference_index = e.readUint16(), this.hdr_size += 8;
    }, d.SampleEntry.prototype.parse = function (e) {
      this.parseHeader(e), this.data = e.readUint8Array(this.size - this.hdr_size);
    }, d.SampleEntry.prototype.parseDataAndRewind = function (e) {
      this.parseHeader(e), this.data = e.readUint8Array(this.size - this.hdr_size), this.hdr_size -= 8, e.position -= this.size - this.hdr_size;
    }, d.SampleEntry.prototype.parseFooter = function (e) {
      d.ContainerBox.prototype.parse.call(this, e);
    }, d.createMediaSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_HINT), d.createMediaSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_METADATA), d.createMediaSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_SUBTITLE), d.createMediaSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_SYSTEM), d.createMediaSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_TEXT), d.createMediaSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_VISUAL, function (e) {
      var t;
      this.parseHeader(e), e.readUint16(), e.readUint16(), e.readUint32Array(3), this.width = e.readUint16(), this.height = e.readUint16(), this.horizresolution = e.readUint32(), this.vertresolution = e.readUint32(), e.readUint32(), this.frame_count = e.readUint16(), t = Math.min(31, e.readUint8()), this.compressorname = e.readString(t), t < 31 && e.readString(31 - t), this.depth = e.readUint16(), e.readUint16(), this.parseFooter(e);
    }), d.createMediaSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_AUDIO, function (e) {
      this.parseHeader(e), e.readUint32Array(2), this.channel_count = e.readUint16(), this.samplesize = e.readUint16(), e.readUint16(), e.readUint16(), this.samplerate = e.readUint32() / 65536, this.parseFooter(e);
    }), d.createSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_VISUAL, "avc1"), d.createSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_VISUAL, "avc2"), d.createSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_VISUAL, "avc3"), d.createSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_VISUAL, "avc4"), d.createSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_VISUAL, "av01"), d.createSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_VISUAL, "hvc1"), d.createSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_VISUAL, "hev1"), d.createSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_AUDIO, "mp4a"), d.createSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_AUDIO, "ac-3"), d.createSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_AUDIO, "ec-3"), d.createEncryptedSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_VISUAL, "encv"), d.createEncryptedSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_AUDIO, "enca"), d.createEncryptedSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_SUBTITLE, "encu"), d.createEncryptedSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_SYSTEM, "encs"), d.createEncryptedSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_TEXT, "enct"), d.createEncryptedSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_METADATA, "encm"), d.createBoxCtor("av1C", function (e) {
      var t = e.readUint8();
      if (t >> 7 & !1) a.error("av1C marker problem");else if (this.version = 127 & t, 1 === this.version) {
        if (t = e.readUint8(), this.seq_profile = t >> 5 & 7, this.seq_level_idx_0 = 31 & t, t = e.readUint8(), this.seq_tier_0 = t >> 7 & 1, this.high_bitdepth = t >> 6 & 1, this.twelve_bit = t >> 5 & 1, this.monochrome = t >> 4 & 1, this.chroma_subsampling_x = t >> 3 & 1, this.chroma_subsampling_y = t >> 2 & 1, this.chroma_sample_position = 3 & t, t = e.readUint8(), this.reserved_1 = t >> 5 & 7, 0 === this.reserved_1) {
          if (this.initial_presentation_delay_present = t >> 4 & 1, 1 === this.initial_presentation_delay_present) this.initial_presentation_delay_minus_one = 15 & t;else if (this.reserved_2 = 15 & t, 0 !== this.reserved_2) return void a.error("av1C reserved_2 parsing problem");
          var i = this.size - this.hdr_size - 4;
          this.configOBUs = e.readUint8Array(i);
        } else a.error("av1C reserved_1 parsing problem");
      } else a.error("av1C version " + this.version + " not supported");
    }), d.createBoxCtor("avcC", function (e) {
      var t, i;

      for (this.configurationVersion = e.readUint8(), this.AVCProfileIndication = e.readUint8(), this.profile_compatibility = e.readUint8(), this.AVCLevelIndication = e.readUint8(), this.lengthSizeMinusOne = 3 & e.readUint8(), this.nb_SPS_nalus = 31 & e.readUint8(), i = this.size - this.hdr_size - 6, this.SPS = [], t = 0; t < this.nb_SPS_nalus; t++) {
        this.SPS[t] = {}, this.SPS[t].length = e.readUint16(), this.SPS[t].nalu = e.readUint8Array(this.SPS[t].length), i -= 2 + this.SPS[t].length;
      }

      for (this.nb_PPS_nalus = e.readUint8(), i--, this.PPS = [], t = 0; t < this.nb_PPS_nalus; t++) {
        this.PPS[t] = {}, this.PPS[t].length = e.readUint16(), this.PPS[t].nalu = e.readUint8Array(this.PPS[t].length), i -= 2 + this.PPS[t].length;
      }

      i > 0 && (this.ext = e.readUint8Array(i));
    }), d.createBoxCtor("btrt", function (e) {
      this.bufferSizeDB = e.readUint32(), this.maxBitrate = e.readUint32(), this.avgBitrate = e.readUint32();
    }), d.createBoxCtor("clap", function (e) {
      this.cleanApertureWidthN = e.readUint32(), this.cleanApertureWidthD = e.readUint32(), this.cleanApertureHeightN = e.readUint32(), this.cleanApertureHeightD = e.readUint32(), this.horizOffN = e.readUint32(), this.horizOffD = e.readUint32(), this.vertOffN = e.readUint32(), this.vertOffD = e.readUint32();
    }), d.createBoxCtor("clli", function (e) {
      this.max_content_light_level = e.readUint16(), this.max_pic_average_light_level = e.readUint16();
    }), d.createFullBoxCtor("co64", function (e) {
      var t, i;
      if (t = e.readUint32(), this.chunk_offsets = [], 0 === this.version) for (i = 0; i < t; i++) {
        this.chunk_offsets.push(e.readUint64());
      }
    }), d.createFullBoxCtor("CoLL", function (e) {
      this.maxCLL = e.readUint16(), this.maxFALL = e.readUint16();
    }), d.createBoxCtor("colr", function (e) {
      if (this.colour_type = e.readString(4), "nclx" === this.colour_type) {
        this.colour_primaries = e.readUint16(), this.transfer_characteristics = e.readUint16(), this.matrix_coefficients = e.readUint16();
        var t = e.readUint8();
        this.full_range_flag = t >> 7;
      } else ("rICC" === this.colour_type || "prof" === this.colour_type) && (this.ICC_profile = e.readUint8Array(this.size - 4));
    }), d.createFullBoxCtor("cprt", function (e) {
      this.parseLanguage(e), this.notice = e.readCString();
    }), d.createFullBoxCtor("cslg", function (e) {
      0 === this.version && (this.compositionToDTSShift = e.readInt32(), this.leastDecodeToDisplayDelta = e.readInt32(), this.greatestDecodeToDisplayDelta = e.readInt32(), this.compositionStartTime = e.readInt32(), this.compositionEndTime = e.readInt32());
    }), d.createFullBoxCtor("ctts", function (e) {
      var t, i;
      if (t = e.readUint32(), this.sample_counts = [], this.sample_offsets = [], 0 === this.version) for (i = 0; i < t; i++) {
        this.sample_counts.push(e.readUint32());
        var r = e.readInt32();
        r < 0 && a.warn("BoxParser", "ctts box uses negative values without using version 1"), this.sample_offsets.push(r);
      } else if (1 == this.version) for (i = 0; i < t; i++) {
        this.sample_counts.push(e.readUint32()), this.sample_offsets.push(e.readInt32());
      }
    }), d.createBoxCtor("dac3", function (e) {
      var t = e.readUint8(),
          i = e.readUint8(),
          r = e.readUint8();
      this.fscod = t >> 6, this.bsid = t >> 1 & 31, this.bsmod = (1 & t) << 2 | i >> 6 & 3, this.acmod = i >> 3 & 7, this.lfeon = i >> 2 & 1, this.bit_rate_code = 3 & i | r >> 5 & 7;
    }), d.createBoxCtor("dec3", function (e) {
      var t = e.readUint16();
      this.data_rate = t >> 3, this.num_ind_sub = 7 & t, this.ind_subs = [];

      for (var i = 0; i < this.num_ind_sub + 1; i++) {
        var r = {};
        this.ind_subs.push(r);
        var n = e.readUint8(),
            a = e.readUint8(),
            s = e.readUint8();
        r.fscod = n >> 6, r.bsid = n >> 1 & 31, r.bsmod = (1 & n) << 4 | a >> 4 & 15, r.acmod = a >> 1 & 7, r.lfeon = 1 & a, r.num_dep_sub = s >> 1 & 15, r.num_dep_sub > 0 && (r.chan_loc = (1 & s) << 8 | e.readUint8());
      }
    }), d.createFullBoxCtor("dfLa", function (e) {
      var t = [],
          i = ["STREAMINFO", "PADDING", "APPLICATION", "SEEKTABLE", "VORBIS_COMMENT", "CUESHEET", "PICTURE", "RESERVED"];

      for (this.parseFullHeader(e);;) {
        var r = e.readUint8(),
            n = Math.min(127 & r, i.length - 1);
        if (n ? e.readUint8Array(e.readUint24()) : (e.readUint8Array(13), this.samplerate = e.readUint32() >> 12, e.readUint8Array(20)), t.push(i[n]), 128 & r) break;
      }

      this.numMetadataBlocks = t.length + " (" + t.join(", ") + ")";
    }), d.createBoxCtor("dimm", function (e) {
      this.bytessent = e.readUint64();
    }), d.createBoxCtor("dmax", function (e) {
      this.time = e.readUint32();
    }), d.createBoxCtor("dmed", function (e) {
      this.bytessent = e.readUint64();
    }), d.createFullBoxCtor("dref", function (e) {
      var t, i;
      this.entries = [];

      for (var r = e.readUint32(), n = 0; n < r; n++) {
        if ((t = d.parseOneBox(e, !1, this.size - (e.getPosition() - this.start))).code !== d.OK) return;
        i = t.box, this.entries.push(i);
      }
    }), d.createBoxCtor("drep", function (e) {
      this.bytessent = e.readUint64();
    }), d.createFullBoxCtor("elng", function (e) {
      this.extended_language = e.readString(this.size - this.hdr_size);
    }), d.createFullBoxCtor("elst", function (e) {
      this.entries = [];

      for (var t = e.readUint32(), i = 0; i < t; i++) {
        var r = {};
        this.entries.push(r), 1 === this.version ? (r.segment_duration = e.readUint64(), r.media_time = e.readInt64()) : (r.segment_duration = e.readUint32(), r.media_time = e.readInt32()), r.media_rate_integer = e.readInt16(), r.media_rate_fraction = e.readInt16();
      }
    }), d.createFullBoxCtor("emsg", function (e) {
      1 == this.version ? (this.timescale = e.readUint32(), this.presentation_time = e.readUint64(), this.event_duration = e.readUint32(), this.id = e.readUint32(), this.scheme_id_uri = e.readCString(), this.value = e.readCString()) : (this.scheme_id_uri = e.readCString(), this.value = e.readCString(), this.timescale = e.readUint32(), this.presentation_time_delta = e.readUint32(), this.event_duration = e.readUint32(), this.id = e.readUint32());
      var t = this.size - this.hdr_size - (16 + (this.scheme_id_uri.length + 1) + (this.value.length + 1));
      1 == this.version && (t -= 4), this.message_data = e.readUint8Array(t);
    }), d.createFullBoxCtor("esds", function (e) {
      var t = e.readUint8Array(this.size - this.hdr_size);

      if (void 0 !== u) {
        var i = new u();
        this.esd = i.parseOneDescriptor(new o(t.buffer, 0, o.BIG_ENDIAN));
      }
    }), d.createBoxCtor("fiel", function (e) {
      this.fieldCount = e.readUint8(), this.fieldOrdering = e.readUint8();
    }), d.createBoxCtor("frma", function (e) {
      this.data_format = e.readString(4);
    }), d.createBoxCtor("ftyp", function (e) {
      var t = this.size - this.hdr_size;
      this.major_brand = e.readString(4), this.minor_version = e.readUint32(), t -= 8, this.compatible_brands = [];

      for (var i = 0; t >= 4;) {
        this.compatible_brands[i] = e.readString(4), t -= 4, i++;
      }
    }), d.createFullBoxCtor("hdlr", function (e) {
      0 === this.version && (e.readUint32(), this.handler = e.readString(4), e.readUint32Array(3), this.name = e.readString(this.size - this.hdr_size - 20), "\0" === this.name[this.name.length - 1] && (this.name = this.name.slice(0, -1)));
    }), d.createBoxCtor("hvcC", function (e) {
      var t, i, r, n;
      this.configurationVersion = e.readUint8(), n = e.readUint8(), this.general_profile_space = n >> 6, this.general_tier_flag = (32 & n) >> 5, this.general_profile_idc = 31 & n, this.general_profile_compatibility = e.readUint32(), this.general_constraint_indicator = e.readUint8Array(6), this.general_level_idc = e.readUint8(), this.min_spatial_segmentation_idc = 4095 & e.readUint16(), this.parallelismType = 3 & e.readUint8(), this.chroma_format_idc = 3 & e.readUint8(), this.bit_depth_luma_minus8 = 7 & e.readUint8(), this.bit_depth_chroma_minus8 = 7 & e.readUint8(), this.avgFrameRate = e.readUint16(), n = e.readUint8(), this.constantFrameRate = n >> 6, this.numTemporalLayers = (13 & n) >> 3, this.temporalIdNested = (4 & n) >> 2, this.lengthSizeMinusOne = 3 & n, this.nalu_arrays = [];
      var a = e.readUint8();

      for (t = 0; t < a; t++) {
        var s = [];
        this.nalu_arrays.push(s), n = e.readUint8(), s.completeness = (128 & n) >> 7, s.nalu_type = 63 & n;
        var o = e.readUint16();

        for (i = 0; i < o; i++) {
          var l = {};
          s.push(l), r = e.readUint16(), l.data = e.readUint8Array(r);
        }
      }
    }), d.createFullBoxCtor("iinf", function (e) {
      var t;
      0 === this.version ? this.entry_count = e.readUint16() : this.entry_count = e.readUint32(), this.item_infos = [];

      for (var i = 0; i < this.entry_count; i++) {
        if ((t = d.parseOneBox(e, !1, this.size - (e.getPosition() - this.start))).code !== d.OK) return;
        "infe" !== t.box.type && a.error("BoxParser", "Expected 'infe' box, got " + t.box.type), this.item_infos[i] = t.box;
      }
    }), d.createFullBoxCtor("iloc", function (e) {
      var t;
      t = e.readUint8(), this.offset_size = t >> 4 & 15, this.length_size = 15 & t, t = e.readUint8(), this.base_offset_size = t >> 4 & 15, 1 === this.version || 2 === this.version ? this.index_size = 15 & t : this.index_size = 0, this.items = [];
      var i = 0;
      if (this.version < 2) i = e.readUint16();else {
        if (2 !== this.version) throw "version of iloc box not supported";
        i = e.readUint32();
      }

      for (var r = 0; r < i; r++) {
        var n = {};
        if (this.items.push(n), this.version < 2) n.item_ID = e.readUint16();else {
          if (2 !== this.version) throw "version of iloc box not supported";
          n.item_ID = e.readUint16();
        }

        switch (1 === this.version || 2 === this.version ? n.construction_method = 15 & e.readUint16() : n.construction_method = 0, n.data_reference_index = e.readUint16(), this.base_offset_size) {
          case 0:
            n.base_offset = 0;
            break;

          case 4:
            n.base_offset = e.readUint32();
            break;

          case 8:
            n.base_offset = e.readUint64();
            break;

          default:
            throw "Error reading base offset size";
        }

        var a = e.readUint16();
        n.extents = [];

        for (var s = 0; s < a; s++) {
          var o = {};
          if (n.extents.push(o), 1 === this.version || 2 === this.version) switch (this.index_size) {
            case 0:
              o.extent_index = 0;
              break;

            case 4:
              o.extent_index = e.readUint32();
              break;

            case 8:
              o.extent_index = e.readUint64();
              break;

            default:
              throw "Error reading extent index";
          }

          switch (this.offset_size) {
            case 0:
              o.extent_offset = 0;
              break;

            case 4:
              o.extent_offset = e.readUint32();
              break;

            case 8:
              o.extent_offset = e.readUint64();
              break;

            default:
              throw "Error reading extent index";
          }

          switch (this.length_size) {
            case 0:
              o.extent_length = 0;
              break;

            case 4:
              o.extent_length = e.readUint32();
              break;

            case 8:
              o.extent_length = e.readUint64();
              break;

            default:
              throw "Error reading extent index";
          }
        }
      }
    }), d.createFullBoxCtor("infe", function (e) {
      if (0 !== this.version && 1 !== this.version || (this.item_ID = e.readUint16(), this.item_protection_index = e.readUint16(), this.item_name = e.readCString(), this.content_type = e.readCString(), this.content_encoding = e.readCString()), 1 === this.version) return this.extension_type = e.readString(4), a.warn("BoxParser", "Cannot parse extension type"), void e.seek(this.start + this.size);
      this.version >= 2 && (2 === this.version ? this.item_ID = e.readUint16() : 3 === this.version && (this.item_ID = e.readUint32()), this.item_protection_index = e.readUint16(), this.item_type = e.readString(4), this.item_name = e.readCString(), "mime" === this.item_type ? (this.content_type = e.readCString(), this.content_encoding = e.readCString()) : "uri " === this.item_type && (this.item_uri_type = e.readCString()));
    }), d.createFullBoxCtor("ipma", function (e) {
      var t, i;

      for (entry_count = e.readUint32(), this.associations = [], t = 0; t < entry_count; t++) {
        var r = {};
        this.associations.push(r), this.version < 1 ? r.id = e.readUint16() : r.id = e.readUint32();
        var n = e.readUint8();

        for (r.props = [], i = 0; i < n; i++) {
          var a = e.readUint8(),
              s = {};
          r.props.push(s), s.essential = (128 & a) >> 7 == 1, 1 & this.flags ? s.property_index = (127 & a) << 8 | e.readUint8() : s.property_index = 127 & a;
        }
      }
    }), d.createFullBoxCtor("iref", function (e) {
      var t, i;

      for (this.references = []; e.getPosition() < this.start + this.size;) {
        if ((t = d.parseOneBox(e, !0, this.size - (e.getPosition() - this.start))).code !== d.OK) return;
        (i = 0 === this.version ? new d.SingleItemTypeReferenceBox(t.type, t.size, t.hdr_size, t.start) : new d.SingleItemTypeReferenceBoxLarge(t.type, t.size, t.hdr_size, t.start)).write === d.Box.prototype.write && "mdat" !== i.type && (a.warn("BoxParser", i.type + " box writing not yet implemented, keeping unparsed data in memory for later write"), i.parseDataAndRewind(e)), i.parse(e), this.references.push(i);
      }
    }), d.createBoxCtor("irot", function (e) {
      this.angle = 3 & e.readUint8();
    }), d.createFullBoxCtor("ispe", function (e) {
      this.image_width = e.readUint32(), this.image_height = e.readUint32();
    }), d.createFullBoxCtor("kind", function (e) {
      this.schemeURI = e.readCString(), this.value = e.readCString();
    }), d.createFullBoxCtor("leva", function (e) {
      var t = e.readUint8();
      this.levels = [];

      for (var i = 0; i < t; i++) {
        var r = {};
        this.levels[i] = r, r.track_ID = e.readUint32();
        var n = e.readUint8();

        switch (r.padding_flag = n >> 7, r.assignment_type = 127 & n, r.assignment_type) {
          case 0:
            r.grouping_type = e.readString(4);
            break;

          case 1:
            r.grouping_type = e.readString(4), r.grouping_type_parameter = e.readUint32();
            break;

          case 2:
          case 3:
            break;

          case 4:
            r.sub_track_id = e.readUint32();
            break;

          default:
            a.warn("BoxParser", "Unknown leva assignement type");
        }
      }
    }), d.createBoxCtor("maxr", function (e) {
      this.period = e.readUint32(), this.bytes = e.readUint32();
    }), d.createBoxCtor("mdcv", function (e) {
      this.display_primaries = [], this.display_primaries[0] = {}, this.display_primaries[0].x = e.readUint16(), this.display_primaries[0].y = e.readUint16(), this.display_primaries[1] = {}, this.display_primaries[1].x = e.readUint16(), this.display_primaries[1].y = e.readUint16(), this.display_primaries[2] = {}, this.display_primaries[2].x = e.readUint16(), this.display_primaries[2].y = e.readUint16(), this.white_point = {}, this.white_point.x = e.readUint16(), this.white_point.y = e.readUint16(), this.max_display_mastering_luminance = e.readUint32(), this.min_display_mastering_luminance = e.readUint32();
    }), d.createFullBoxCtor("mdhd", function (e) {
      1 == this.version ? (this.creation_time = e.readUint64(), this.modification_time = e.readUint64(), this.timescale = e.readUint32(), this.duration = e.readUint64()) : (this.creation_time = e.readUint32(), this.modification_time = e.readUint32(), this.timescale = e.readUint32(), this.duration = e.readUint32()), this.parseLanguage(e), e.readUint16();
    }), d.createFullBoxCtor("mehd", function (e) {
      1 & this.flags && (a.warn("BoxParser", "mehd box incorrectly uses flags set to 1, converting version to 1"), this.version = 1), 1 == this.version ? this.fragment_duration = e.readUint64() : this.fragment_duration = e.readUint32();
    }), d.createFullBoxCtor("meta", function (e) {
      this.boxes = [], d.ContainerBox.prototype.parse.call(this, e);
    }), d.createFullBoxCtor("mfhd", function (e) {
      this.sequence_number = e.readUint32();
    }), d.createFullBoxCtor("mfro", function (e) {
      this._size = e.readUint32();
    }), d.createFullBoxCtor("mvhd", function (e) {
      1 == this.version ? (this.creation_time = e.readUint64(), this.modification_time = e.readUint64(), this.timescale = e.readUint32(), this.duration = e.readUint64()) : (this.creation_time = e.readUint32(), this.modification_time = e.readUint32(), this.timescale = e.readUint32(), this.duration = e.readUint32()), this.rate = e.readUint32(), this.volume = e.readUint16() >> 8, e.readUint16(), e.readUint32Array(2), this.matrix = e.readUint32Array(9), e.readUint32Array(6), this.next_track_id = e.readUint32();
    }), d.createBoxCtor("npck", function (e) {
      this.packetssent = e.readUint32();
    }), d.createBoxCtor("nump", function (e) {
      this.packetssent = e.readUint64();
    }), d.createFullBoxCtor("padb", function (e) {
      var t = e.readUint32();
      this.padbits = [];

      for (var i = 0; i < Math.floor((t + 1) / 2); i++) {
        this.padbits = e.readUint8();
      }
    }), d.createBoxCtor("pasp", function (e) {
      this.hSpacing = e.readUint32(), this.vSpacing = e.readUint32();
    }), d.createBoxCtor("payl", function (e) {
      this.text = e.readString(this.size - this.hdr_size);
    }), d.createBoxCtor("payt", function (e) {
      this.payloadID = e.readUint32();
      var t = e.readUint8();
      this.rtpmap_string = e.readString(t);
    }), d.createFullBoxCtor("pdin", function (e) {
      var t = (this.size - this.hdr_size) / 8;
      this.rate = [], this.initial_delay = [];

      for (var i = 0; i < t; i++) {
        this.rate[i] = e.readUint32(), this.initial_delay[i] = e.readUint32();
      }
    }), d.createFullBoxCtor("pitm", function (e) {
      0 === this.version ? this.item_id = e.readUint16() : this.item_id = e.readUint32();
    }), d.createFullBoxCtor("pixi", function (e) {
      var t;

      for (this.num_channels = e.readUint8(), this.bits_per_channels = [], t = 0; t < this.num_channels; t++) {
        this.bits_per_channels[t] = e.readUint8();
      }
    }), d.createBoxCtor("pmax", function (e) {
      this.bytes = e.readUint32();
    }), d.createFullBoxCtor("prft", function (e) {
      this.ref_track_id = e.readUint32(), this.ntp_timestamp = e.readUint64(), 0 === this.version ? this.media_time = e.readUint32() : this.media_time = e.readUint64();
    }), d.createFullBoxCtor("pssh", function (e) {
      if (this.system_id = d.parseHex16(e), this.version > 0) {
        var t = e.readUint32();
        this.kid = [];

        for (var i = 0; i < t; i++) {
          this.kid[i] = d.parseHex16(e);
        }
      }

      var r = e.readUint32();
      r > 0 && (this.data = e.readUint8Array(r));
    }), d.createFullBoxCtor("clef", function (e) {
      this.width = e.readUint32(), this.height = e.readUint32();
    }), d.createFullBoxCtor("enof", function (e) {
      this.width = e.readUint32(), this.height = e.readUint32();
    }), d.createFullBoxCtor("prof", function (e) {
      this.width = e.readUint32(), this.height = e.readUint32();
    }), d.createContainerBoxCtor("tapt", null, ["clef", "prof", "enof"]), d.createBoxCtor("rtp ", function (e) {
      this.descriptionformat = e.readString(4), this.sdptext = e.readString(this.size - this.hdr_size - 4);
    }), d.createFullBoxCtor("saio", function (e) {
      1 & this.flags && (this.aux_info_type = e.readUint32(), this.aux_info_type_parameter = e.readUint32());
      var t = e.readUint32();
      this.offset = [];

      for (var i = 0; i < t; i++) {
        0 === this.version ? this.offset[i] = e.readUint32() : this.offset[i] = e.readUint64();
      }
    }), d.createFullBoxCtor("saiz", function (e) {
      1 & this.flags && (this.aux_info_type = e.readUint32(), this.aux_info_type_parameter = e.readUint32()), this.default_sample_info_size = e.readUint8();
      var t = e.readUint32();
      if (this.sample_info_size = [], 0 === this.default_sample_info_size) for (var i = 0; i < t; i++) {
        this.sample_info_size[i] = e.readUint8();
      }
    }), d.createSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_METADATA, "mett", function (e) {
      this.parseHeader(e), this.content_encoding = e.readCString(), this.mime_format = e.readCString(), this.parseFooter(e);
    }), d.createSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_METADATA, "metx", function (e) {
      this.parseHeader(e), this.content_encoding = e.readCString(), this.namespace = e.readCString(), this.schema_location = e.readCString(), this.parseFooter(e);
    }), d.createSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_SUBTITLE, "sbtt", function (e) {
      this.parseHeader(e), this.content_encoding = e.readCString(), this.mime_format = e.readCString(), this.parseFooter(e);
    }), d.createSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_SUBTITLE, "stpp", function (e) {
      this.parseHeader(e), this.namespace = e.readCString(), this.schema_location = e.readCString(), this.auxiliary_mime_types = e.readCString(), this.parseFooter(e);
    }), d.createSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_SUBTITLE, "stxt", function (e) {
      this.parseHeader(e), this.content_encoding = e.readCString(), this.mime_format = e.readCString(), this.parseFooter(e);
    }), d.createSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_SUBTITLE, "tx3g", function (e) {
      this.parseHeader(e), this.displayFlags = e.readUint32(), this.horizontal_justification = e.readInt8(), this.vertical_justification = e.readInt8(), this.bg_color_rgba = e.readUint8Array(4), this.box_record = e.readInt16Array(4), this.style_record = e.readUint8Array(12), this.parseFooter(e);
    }), d.createSampleEntryCtor(d.SAMPLE_ENTRY_TYPE_METADATA, "wvtt", function (e) {
      this.parseHeader(e), this.parseFooter(e);
    }), d.createSampleGroupCtor("alst", function (e) {
      var t,
          i = e.readUint16();

      for (this.first_output_sample = e.readUint16(), this.sample_offset = [], t = 0; t < i; t++) {
        this.sample_offset[t] = e.readUint32();
      }

      var r = this.description_length - 4 - 4 * i;

      for (this.num_output_samples = [], this.num_total_samples = [], t = 0; t < r / 4; t++) {
        this.num_output_samples[t] = e.readUint16(), this.num_total_samples[t] = e.readUint16();
      }
    }), d.createSampleGroupCtor("avll", function (e) {
      this.layerNumber = e.readUint8(), this.accurateStatisticsFlag = e.readUint8(), this.avgBitRate = e.readUint16(), this.avgFrameRate = e.readUint16();
    }), d.createSampleGroupCtor("avss", function (e) {
      this.subSequenceIdentifier = e.readUint16(), this.layerNumber = e.readUint8();
      var t = e.readUint8();
      this.durationFlag = t >> 7, this.avgRateFlag = t >> 6 & 1, this.durationFlag && (this.duration = e.readUint32()), this.avgRateFlag && (this.accurateStatisticsFlag = e.readUint8(), this.avgBitRate = e.readUint16(), this.avgFrameRate = e.readUint16()), this.dependency = [];

      for (var i = e.readUint8(), r = 0; r < i; r++) {
        var n = {};
        this.dependency.push(n), n.subSeqDirectionFlag = e.readUint8(), n.layerNumber = e.readUint8(), n.subSequenceIdentifier = e.readUint16();
      }
    }), d.createSampleGroupCtor("dtrt", function (e) {
      a.warn("BoxParser", "Sample Group type: " + this.grouping_type + " not fully parsed");
    }), d.createSampleGroupCtor("mvif", function (e) {
      a.warn("BoxParser", "Sample Group type: " + this.grouping_type + " not fully parsed");
    }), d.createSampleGroupCtor("prol", function (e) {
      this.roll_distance = e.readInt16();
    }), d.createSampleGroupCtor("rap ", function (e) {
      var t = e.readUint8();
      this.num_leading_samples_known = t >> 7, this.num_leading_samples = 127 & t;
    }), d.createSampleGroupCtor("rash", function (e) {
      if (this.operation_point_count = e.readUint16(), this.description_length !== 2 + (1 === this.operation_point_count ? 2 : 6 * this.operation_point_count) + 9) a.warn("BoxParser", "Mismatch in " + this.grouping_type + " sample group length"), this.data = e.readUint8Array(this.description_length - 2);else {
        if (1 === this.operation_point_count) this.target_rate_share = e.readUint16();else {
          this.target_rate_share = [], this.available_bitrate = [];

          for (var t = 0; t < this.operation_point_count; t++) {
            this.available_bitrate[t] = e.readUint32(), this.target_rate_share[t] = e.readUint16();
          }
        }
        this.maximum_bitrate = e.readUint32(), this.minimum_bitrate = e.readUint32(), this.discard_priority = e.readUint8();
      }
    }), d.createSampleGroupCtor("roll", function (e) {
      this.roll_distance = e.readInt16();
    }), d.SampleGroupEntry.prototype.parse = function (e) {
      a.warn("BoxParser", "Unknown Sample Group type: " + this.grouping_type), this.data = e.readUint8Array(this.description_length);
    }, d.createSampleGroupCtor("scif", function (e) {
      a.warn("BoxParser", "Sample Group type: " + this.grouping_type + " not fully parsed");
    }), d.createSampleGroupCtor("scnm", function (e) {
      a.warn("BoxParser", "Sample Group type: " + this.grouping_type + " not fully parsed");
    }), d.createSampleGroupCtor("seig", function (e) {
      this.reserved = e.readUint8();
      var t = e.readUint8();
      this.crypt_byte_block = t >> 4, this.skip_byte_block = 15 & t, this.isProtected = e.readUint8(), this.Per_Sample_IV_Size = e.readUint8(), this.KID = d.parseHex16(e), this.constant_IV_size = 0, this.constant_IV = 0, 1 === this.isProtected && 0 === this.Per_Sample_IV_Size && (this.constant_IV_size = e.readUint8(), this.constant_IV = e.readUint8Array(this.constant_IV_size));
    }), d.createSampleGroupCtor("stsa", function (e) {
      a.warn("BoxParser", "Sample Group type: " + this.grouping_type + " not fully parsed");
    }), d.createSampleGroupCtor("sync", function (e) {
      var t = e.readUint8();
      this.NAL_unit_type = 63 & t;
    }), d.createSampleGroupCtor("tele", function (e) {
      var t = e.readUint8();
      this.level_independently_decodable = t >> 7;
    }), d.createSampleGroupCtor("tsas", function (e) {
      a.warn("BoxParser", "Sample Group type: " + this.grouping_type + " not fully parsed");
    }), d.createSampleGroupCtor("tscl", function (e) {
      a.warn("BoxParser", "Sample Group type: " + this.grouping_type + " not fully parsed");
    }), d.createSampleGroupCtor("vipr", function (e) {
      a.warn("BoxParser", "Sample Group type: " + this.grouping_type + " not fully parsed");
    }), d.createFullBoxCtor("sbgp", function (e) {
      this.grouping_type = e.readString(4), 1 === this.version ? this.grouping_type_parameter = e.readUint32() : this.grouping_type_parameter = 0, this.entries = [];

      for (var t = e.readUint32(), i = 0; i < t; i++) {
        var r = {};
        this.entries.push(r), r.sample_count = e.readInt32(), r.group_description_index = e.readInt32();
      }
    }), d.createFullBoxCtor("schm", function (e) {
      this.scheme_type = e.readString(4), this.scheme_version = e.readUint32(), 1 & this.flags && (this.scheme_uri = e.readString(this.size - this.hdr_size - 8));
    }), d.createBoxCtor("sdp ", function (e) {
      this.sdptext = e.readString(this.size - this.hdr_size);
    }), d.createFullBoxCtor("sdtp", function (e) {
      var t,
          i = this.size - this.hdr_size;
      this.is_leading = [], this.sample_depends_on = [], this.sample_is_depended_on = [], this.sample_has_redundancy = [];

      for (var r = 0; r < i; r++) {
        t = e.readUint8(), this.is_leading[r] = t >> 6, this.sample_depends_on[r] = t >> 4 & 3, this.sample_is_depended_on[r] = t >> 2 & 3, this.sample_has_redundancy[r] = 3 & t;
      }
    }), d.createFullBoxCtor("senc"), d.createFullBoxCtor("sgpd", function (e) {
      this.grouping_type = e.readString(4), a.debug("BoxParser", "Found Sample Groups of type " + this.grouping_type), 1 === this.version ? this.default_length = e.readUint32() : this.default_length = 0, this.version >= 2 && (this.default_group_description_index = e.readUint32()), this.entries = [];

      for (var t = e.readUint32(), i = 0; i < t; i++) {
        var r;
        r = d[this.grouping_type + "SampleGroupEntry"] ? new d[this.grouping_type + "SampleGroupEntry"](this.grouping_type) : new d.SampleGroupEntry(this.grouping_type), this.entries.push(r), 1 === this.version && 0 === this.default_length ? r.description_length = e.readUint32() : r.description_length = this.default_length, r.write === d.SampleGroupEntry.prototype.write && (a.info("BoxParser", "SampleGroup for type " + this.grouping_type + " writing not yet implemented, keeping unparsed data in memory for later write"), r.data = e.readUint8Array(r.description_length), e.position -= r.description_length), r.parse(e);
      }
    }), d.createFullBoxCtor("sidx", function (e) {
      this.reference_ID = e.readUint32(), this.timescale = e.readUint32(), 0 === this.version ? (this.earliest_presentation_time = e.readUint32(), this.first_offset = e.readUint32()) : (this.earliest_presentation_time = e.readUint64(), this.first_offset = e.readUint64()), e.readUint16(), this.references = [];

      for (var t = e.readUint16(), i = 0; i < t; i++) {
        var r = {};
        this.references.push(r);
        var n = e.readUint32();
        r.reference_type = n >> 31 & 1, r.referenced_size = 2147483647 & n, r.subsegment_duration = e.readUint32(), n = e.readUint32(), r.starts_with_SAP = n >> 31 & 1, r.SAP_type = n >> 28 & 7, r.SAP_delta_time = 268435455 & n;
      }
    }), d.SingleItemTypeReferenceBox = function (e, t, i, r) {
      d.Box.call(this, e, t), this.hdr_size = i, this.start = r;
    }, d.SingleItemTypeReferenceBox.prototype = new d.Box(), d.SingleItemTypeReferenceBox.prototype.parse = function (e) {
      this.from_item_ID = e.readUint16();
      var t = e.readUint16();
      this.references = [];

      for (var i = 0; i < t; i++) {
        this.references[i] = e.readUint16();
      }
    }, d.SingleItemTypeReferenceBoxLarge = function (e, t, i, r) {
      d.Box.call(this, e, t), this.hdr_size = i, this.start = r;
    }, d.SingleItemTypeReferenceBoxLarge.prototype = new d.Box(), d.SingleItemTypeReferenceBoxLarge.prototype.parse = function (e) {
      this.from_item_ID = e.readUint32();
      var t = e.readUint16();
      this.references = [];

      for (var i = 0; i < t; i++) {
        this.references[i] = e.readUint32();
      }
    }, d.createFullBoxCtor("SmDm", function (e) {
      this.primaryRChromaticity_x = e.readUint16(), this.primaryRChromaticity_y = e.readUint16(), this.primaryGChromaticity_x = e.readUint16(), this.primaryGChromaticity_y = e.readUint16(), this.primaryBChromaticity_x = e.readUint16(), this.primaryBChromaticity_y = e.readUint16(), this.whitePointChromaticity_x = e.readUint16(), this.whitePointChromaticity_y = e.readUint16(), this.luminanceMax = e.readUint32(), this.luminanceMin = e.readUint32();
    }), d.createFullBoxCtor("smhd", function (e) {
      this.balance = e.readUint16(), e.readUint16();
    }), d.createFullBoxCtor("ssix", function (e) {
      this.subsegments = [];

      for (var t = e.readUint32(), i = 0; i < t; i++) {
        var r = {};
        this.subsegments.push(r), r.ranges = [];

        for (var n = e.readUint32(), a = 0; a < n; a++) {
          var s = {};
          r.ranges.push(s), s.level = e.readUint8(), s.range_size = e.readUint24();
        }
      }
    }), d.createFullBoxCtor("stco", function (e) {
      var t;
      if (t = e.readUint32(), this.chunk_offsets = [], 0 === this.version) for (var i = 0; i < t; i++) {
        this.chunk_offsets.push(e.readUint32());
      }
    }), d.createFullBoxCtor("stdp", function (e) {
      var t = (this.size - this.hdr_size) / 2;
      this.priority = [];

      for (var i = 0; i < t; i++) {
        this.priority[i] = e.readUint16();
      }
    }), d.createFullBoxCtor("sthd"), d.createFullBoxCtor("stri", function (e) {
      this.switch_group = e.readUint16(), this.alternate_group = e.readUint16(), this.sub_track_id = e.readUint32();
      var t = (this.size - this.hdr_size - 8) / 4;
      this.attribute_list = [];

      for (var i = 0; i < t; i++) {
        this.attribute_list[i] = e.readUint32();
      }
    }), d.createFullBoxCtor("stsc", function (e) {
      var t, i;
      if (t = e.readUint32(), this.first_chunk = [], this.samples_per_chunk = [], this.sample_description_index = [], 0 === this.version) for (i = 0; i < t; i++) {
        this.first_chunk.push(e.readUint32()), this.samples_per_chunk.push(e.readUint32()), this.sample_description_index.push(e.readUint32());
      }
    }), d.createFullBoxCtor("stsd", function (e) {
      var t, i, r, n;

      for (this.entries = [], r = e.readUint32(), t = 1; t <= r; t++) {
        if ((i = d.parseOneBox(e, !0, this.size - (e.getPosition() - this.start))).code !== d.OK) return;
        d[i.type + "SampleEntry"] ? ((n = new d[i.type + "SampleEntry"](i.size)).hdr_size = i.hdr_size, n.start = i.start) : (a.warn("BoxParser", "Unknown sample entry type: " + i.type), n = new d.SampleEntry(i.type, i.size, i.hdr_size, i.start)), n.write === d.SampleEntry.prototype.write && (a.info("BoxParser", "SampleEntry " + n.type + " box writing not yet implemented, keeping unparsed data in memory for later write"), n.parseDataAndRewind(e)), n.parse(e), this.entries.push(n);
      }
    }), d.createFullBoxCtor("stsg", function (e) {
      this.grouping_type = e.readUint32();
      var t = e.readUint16();
      this.group_description_index = [];

      for (var i = 0; i < t; i++) {
        this.group_description_index[i] = e.readUint32();
      }
    }), d.createFullBoxCtor("stsh", function (e) {
      var t, i;
      if (t = e.readUint32(), this.shadowed_sample_numbers = [], this.sync_sample_numbers = [], 0 === this.version) for (i = 0; i < t; i++) {
        this.shadowed_sample_numbers.push(e.readUint32()), this.sync_sample_numbers.push(e.readUint32());
      }
    }), d.createFullBoxCtor("stss", function (e) {
      var t, i;
      if (i = e.readUint32(), 0 === this.version) for (this.sample_numbers = [], t = 0; t < i; t++) {
        this.sample_numbers.push(e.readUint32());
      }
    }), d.createFullBoxCtor("stsz", function (e) {
      var t;
      if (this.sample_sizes = [], 0 === this.version) for (this.sample_size = e.readUint32(), this.sample_count = e.readUint32(), t = 0; t < this.sample_count; t++) {
        0 === this.sample_size ? this.sample_sizes.push(e.readUint32()) : this.sample_sizes[t] = this.sample_size;
      }
    }), d.createFullBoxCtor("stts", function (e) {
      var t, i, r;
      if (t = e.readUint32(), this.sample_counts = [], this.sample_deltas = [], 0 === this.version) for (i = 0; i < t; i++) {
        this.sample_counts.push(e.readUint32()), (r = e.readInt32()) < 0 && (a.warn("BoxParser", "File uses negative stts sample delta, using value 1 instead, sync may be lost!"), r = 1), this.sample_deltas.push(r);
      }
    }), d.createFullBoxCtor("stvi", function (e) {
      var t = e.readUint32();
      this.single_view_allowed = 3 & t, this.stereo_scheme = e.readUint32();
      var i,
          r,
          n = e.readUint32();

      for (this.stereo_indication_type = e.readString(n), this.boxes = []; e.getPosition() < this.start + this.size;) {
        if ((i = d.parseOneBox(e, !1, this.size - (e.getPosition() - this.start))).code !== d.OK) return;
        r = i.box, this.boxes.push(r), this[r.type] = r;
      }
    }), d.createBoxCtor("styp", function (e) {
      d.ftypBox.prototype.parse.call(this, e);
    }), d.createFullBoxCtor("stz2", function (e) {
      var t, i;
      if (this.sample_sizes = [], 0 === this.version) if (this.reserved = e.readUint24(), this.field_size = e.readUint8(), i = e.readUint32(), 4 === this.field_size) for (t = 0; t < i; t += 2) {
        var r = e.readUint8();
        this.sample_sizes[t] = r >> 4 & 15, this.sample_sizes[t + 1] = 15 & r;
      } else if (8 === this.field_size) for (t = 0; t < i; t++) {
        this.sample_sizes[t] = e.readUint8();
      } else if (16 === this.field_size) for (t = 0; t < i; t++) {
        this.sample_sizes[t] = e.readUint16();
      } else a.error("BoxParser", "Error in length field in stz2 box");
    }), d.createFullBoxCtor("subs", function (e) {
      var t, i, r, n;

      for (r = e.readUint32(), this.entries = [], t = 0; t < r; t++) {
        var a = {};
        if (this.entries[t] = a, a.sample_delta = e.readUint32(), a.subsamples = [], (n = e.readUint16()) > 0) for (i = 0; i < n; i++) {
          var s = {};
          a.subsamples.push(s), 1 == this.version ? s.size = e.readUint32() : s.size = e.readUint16(), s.priority = e.readUint8(), s.discardable = e.readUint8(), s.codec_specific_parameters = e.readUint32();
        }
      }
    }), d.createFullBoxCtor("tenc", function (e) {
      if (e.readUint8(), 0 === this.version) e.readUint8();else {
        var t = e.readUint8();
        this.default_crypt_byte_block = t >> 4 & 15, this.default_skip_byte_block = 15 & t;
      }
      this.default_isProtected = e.readUint8(), this.default_Per_Sample_IV_Size = e.readUint8(), this.default_KID = d.parseHex16(e), 1 === this.default_isProtected && 0 === this.default_Per_Sample_IV_Size && (this.default_constant_IV_size = e.readUint8(), this.default_constant_IV = e.readUint8Array(this.default_constant_IV_size));
    }), d.createFullBoxCtor("tfdt", function (e) {
      1 == this.version ? this.baseMediaDecodeTime = e.readUint64() : this.baseMediaDecodeTime = e.readUint32();
    }), d.createFullBoxCtor("tfhd", function (e) {
      var t = 0;
      this.track_id = e.readUint32(), this.size - this.hdr_size > t && this.flags & d.TFHD_FLAG_BASE_DATA_OFFSET ? (this.base_data_offset = e.readUint64(), t += 8) : this.base_data_offset = 0, this.size - this.hdr_size > t && this.flags & d.TFHD_FLAG_SAMPLE_DESC ? (this.default_sample_description_index = e.readUint32(), t += 4) : this.default_sample_description_index = 0, this.size - this.hdr_size > t && this.flags & d.TFHD_FLAG_SAMPLE_DUR ? (this.default_sample_duration = e.readUint32(), t += 4) : this.default_sample_duration = 0, this.size - this.hdr_size > t && this.flags & d.TFHD_FLAG_SAMPLE_SIZE ? (this.default_sample_size = e.readUint32(), t += 4) : this.default_sample_size = 0, this.size - this.hdr_size > t && this.flags & d.TFHD_FLAG_SAMPLE_FLAGS ? (this.default_sample_flags = e.readUint32(), t += 4) : this.default_sample_flags = 0;
    }), d.createFullBoxCtor("tfra", function (e) {
      this.track_ID = e.readUint32(), e.readUint24();
      var t = e.readUint8();
      this.length_size_of_traf_num = t >> 4 & 3, this.length_size_of_trun_num = t >> 2 & 3, this.length_size_of_sample_num = 3 & t, this.entries = [];

      for (var i = e.readUint32(), r = 0; r < i; r++) {
        1 === this.version ? (this.time = e.readUint64(), this.moof_offset = e.readUint64()) : (this.time = e.readUint32(), this.moof_offset = e.readUint32()), this.traf_number = e["readUint" + 8 * (this.length_size_of_traf_num + 1)](), this.trun_number = e["readUint" + 8 * (this.length_size_of_trun_num + 1)](), this.sample_number = e["readUint" + 8 * (this.length_size_of_sample_num + 1)]();
      }
    }), d.createFullBoxCtor("tkhd", function (e) {
      1 == this.version ? (this.creation_time = e.readUint64(), this.modification_time = e.readUint64(), this.track_id = e.readUint32(), e.readUint32(), this.duration = e.readUint64()) : (this.creation_time = e.readUint32(), this.modification_time = e.readUint32(), this.track_id = e.readUint32(), e.readUint32(), this.duration = e.readUint32()), e.readUint32Array(2), this.layer = e.readInt16(), this.alternate_group = e.readInt16(), this.volume = e.readInt16() >> 8, e.readUint16(), this.matrix = e.readInt32Array(9), this.width = e.readUint32(), this.height = e.readUint32();
    }), d.createBoxCtor("tmax", function (e) {
      this.time = e.readUint32();
    }), d.createBoxCtor("tmin", function (e) {
      this.time = e.readUint32();
    }), d.createBoxCtor("totl", function (e) {
      this.bytessent = e.readUint32();
    }), d.createBoxCtor("tpay", function (e) {
      this.bytessent = e.readUint32();
    }), d.createBoxCtor("tpyl", function (e) {
      this.bytessent = e.readUint64();
    }), d.TrackGroupTypeBox.prototype.parse = function (e) {
      this.parseFullHeader(e), this.track_group_id = e.readUint32();
    }, d.createTrackGroupCtor("msrc"), d.TrackReferenceTypeBox = function (e, t, i, r) {
      d.Box.call(this, e, t), this.hdr_size = i, this.start = r;
    }, d.TrackReferenceTypeBox.prototype = new d.Box(), d.TrackReferenceTypeBox.prototype.parse = function (e) {
      this.track_ids = e.readUint32Array((this.size - this.hdr_size) / 4);
    }, d.trefBox.prototype.parse = function (e) {
      for (var t, i; e.getPosition() < this.start + this.size;) {
        if ((t = d.parseOneBox(e, !0, this.size - (e.getPosition() - this.start))).code !== d.OK) return;
        (i = new d.TrackReferenceTypeBox(t.type, t.size, t.hdr_size, t.start)).write === d.Box.prototype.write && "mdat" !== i.type && (a.info("BoxParser", "TrackReference " + i.type + " box writing not yet implemented, keeping unparsed data in memory for later write"), i.parseDataAndRewind(e)), i.parse(e), this.boxes.push(i);
      }
    }, d.createFullBoxCtor("trep", function (e) {
      for (this.track_ID = e.readUint32(), this.boxes = []; e.getPosition() < this.start + this.size;) {
        if (ret = d.parseOneBox(e, !1, this.size - (e.getPosition() - this.start)), ret.code !== d.OK) return;
        box = ret.box, this.boxes.push(box);
      }
    }), d.createFullBoxCtor("trex", function (e) {
      this.track_id = e.readUint32(), this.default_sample_description_index = e.readUint32(), this.default_sample_duration = e.readUint32(), this.default_sample_size = e.readUint32(), this.default_sample_flags = e.readUint32();
    }), d.createBoxCtor("trpy", function (e) {
      this.bytessent = e.readUint64();
    }), d.createFullBoxCtor("trun", function (e) {
      var t = 0;
      if (this.sample_count = e.readUint32(), t += 4, this.size - this.hdr_size > t && this.flags & d.TRUN_FLAGS_DATA_OFFSET ? (this.data_offset = e.readInt32(), t += 4) : this.data_offset = 0, this.size - this.hdr_size > t && this.flags & d.TRUN_FLAGS_FIRST_FLAG ? (this.first_sample_flags = e.readUint32(), t += 4) : this.first_sample_flags = 0, this.sample_duration = [], this.sample_size = [], this.sample_flags = [], this.sample_composition_time_offset = [], this.size - this.hdr_size > t) for (var i = 0; i < this.sample_count; i++) {
        this.flags & d.TRUN_FLAGS_DURATION && (this.sample_duration[i] = e.readUint32()), this.flags & d.TRUN_FLAGS_SIZE && (this.sample_size[i] = e.readUint32()), this.flags & d.TRUN_FLAGS_FLAGS && (this.sample_flags[i] = e.readUint32()), this.flags & d.TRUN_FLAGS_CTS_OFFSET && (0 === this.version ? this.sample_composition_time_offset[i] = e.readUint32() : this.sample_composition_time_offset[i] = e.readInt32());
      }
    }), d.createFullBoxCtor("tsel", function (e) {
      this.switch_group = e.readUint32();
      var t = (this.size - this.hdr_size - 4) / 4;
      this.attribute_list = [];

      for (var i = 0; i < t; i++) {
        this.attribute_list[i] = e.readUint32();
      }
    }), d.createFullBoxCtor("txtC", function (e) {
      this.config = e.readCString();
    }), d.createFullBoxCtor("url ", function (e) {
      1 !== this.flags && (this.location = e.readCString());
    }), d.createFullBoxCtor("urn ", function (e) {
      this.name = e.readCString(), this.size - this.hdr_size - this.name.length - 1 > 0 && (this.location = e.readCString());
    }), d.createUUIDBox("a5d40b30e81411ddba2f0800200c9a66", !0, !1, function (e) {
      this.LiveServerManifest = e.readString(this.size - this.hdr_size).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    }), d.createUUIDBox("d08a4f1810f34a82b6c832d8aba183d3", !0, !1, function (e) {
      this.system_id = d.parseHex16(e);
      var t = e.readUint32();
      t > 0 && (this.data = e.readUint8Array(t));
    }), d.createUUIDBox("a2394f525a9b4f14a2446c427c648df4", !0, !1), d.createUUIDBox("8974dbce7be74c5184f97148f9882554", !0, !1, function (e) {
      this.default_AlgorithmID = e.readUint24(), this.default_IV_size = e.readUint8(), this.default_KID = d.parseHex16(e);
    }), d.createUUIDBox("d4807ef2ca3946958e5426cb9e46a79f", !0, !1, function (e) {
      this.fragment_count = e.readUint8(), this.entries = [];

      for (var t = 0; t < this.fragment_count; t++) {
        var i = {},
            r = 0,
            n = 0;
        1 === this.version ? (r = e.readUint64(), n = e.readUint64()) : (r = e.readUint32(), n = e.readUint32()), i.absolute_time = r, i.absolute_duration = n, this.entries.push(i);
      }
    }), d.createUUIDBox("6d1d9b0542d544e680e2141daff757b2", !0, !1, function (e) {
      1 === this.version ? (this.absolute_time = e.readUint64(), this.duration = e.readUint64()) : (this.absolute_time = e.readUint32(), this.duration = e.readUint32());
    }), d.createFullBoxCtor("vmhd", function (e) {
      this.graphicsmode = e.readUint16(), this.opcolor = e.readUint16Array(3);
    }), d.createFullBoxCtor("vpcC", function (e) {
      var t;
      1 === this.version ? (this.profile = e.readUint8(), this.level = e.readUint8(), t = e.readUint8(), this.bitDepth = t >> 4, this.chromaSubsampling = t >> 1 & 7, this.videoFullRangeFlag = 1 & t, this.colourPrimaries = e.readUint8(), this.transferCharacteristics = e.readUint8(), this.matrixCoefficients = e.readUint8(), this.codecIntializationDataSize = e.readUint16(), this.codecIntializationData = e.readUint8Array(this.codecIntializationDataSize)) : (this.profile = e.readUint8(), this.level = e.readUint8(), t = e.readUint8(), this.bitDepth = t >> 4 & 15, this.colorSpace = 15 & t, t = e.readUint8(), this.chromaSubsampling = t >> 4 & 15, this.transferFunction = t >> 1 & 7, this.videoFullRangeFlag = 1 & t, this.codecIntializationDataSize = e.readUint16(), this.codecIntializationData = e.readUint8Array(this.codecIntializationDataSize));
    }), d.createBoxCtor("vttC", function (e) {
      this.text = e.readString(this.size - this.hdr_size);
    }), d.SampleEntry.prototype.isVideo = function () {
      return !1;
    }, d.SampleEntry.prototype.isAudio = function () {
      return !1;
    }, d.SampleEntry.prototype.isSubtitle = function () {
      return !1;
    }, d.SampleEntry.prototype.isMetadata = function () {
      return !1;
    }, d.SampleEntry.prototype.isHint = function () {
      return !1;
    }, d.SampleEntry.prototype.getCodec = function () {
      return this.type.replace(".", "");
    }, d.SampleEntry.prototype.getWidth = function () {
      return "";
    }, d.SampleEntry.prototype.getHeight = function () {
      return "";
    }, d.SampleEntry.prototype.getChannelCount = function () {
      return "";
    }, d.SampleEntry.prototype.getSampleRate = function () {
      return "";
    }, d.SampleEntry.prototype.getSampleSize = function () {
      return "";
    }, d.VisualSampleEntry.prototype.isVideo = function () {
      return !0;
    }, d.VisualSampleEntry.prototype.getWidth = function () {
      return this.width;
    }, d.VisualSampleEntry.prototype.getHeight = function () {
      return this.height;
    }, d.AudioSampleEntry.prototype.isAudio = function () {
      return !0;
    }, d.AudioSampleEntry.prototype.getChannelCount = function () {
      return this.channel_count;
    }, d.AudioSampleEntry.prototype.getSampleRate = function () {
      return this.samplerate;
    }, d.AudioSampleEntry.prototype.getSampleSize = function () {
      return this.samplesize;
    }, d.SubtitleSampleEntry.prototype.isSubtitle = function () {
      return !0;
    }, d.MetadataSampleEntry.prototype.isMetadata = function () {
      return !0;
    }, d.decimalToHex = function (e, t) {
      var i = Number(e).toString(16);

      for (t = null == t ? t = 2 : t; i.length < t;) {
        i = "0" + i;
      }

      return i;
    }, d.avc1SampleEntry.prototype.getCodec = d.avc2SampleEntry.prototype.getCodec = d.avc3SampleEntry.prototype.getCodec = d.avc4SampleEntry.prototype.getCodec = function () {
      var e = d.SampleEntry.prototype.getCodec.call(this);
      return this.avcC ? e + "." + d.decimalToHex(this.avcC.AVCProfileIndication) + d.decimalToHex(this.avcC.profile_compatibility) + d.decimalToHex(this.avcC.AVCLevelIndication) : e;
    }, d.hev1SampleEntry.prototype.getCodec = d.hvc1SampleEntry.prototype.getCodec = function () {
      var e,
          t = d.SampleEntry.prototype.getCodec.call(this);

      if (this.hvcC) {
        switch (t += ".", this.hvcC.general_profile_space) {
          case 0:
            t += "";
            break;

          case 1:
            t += "A";
            break;

          case 2:
            t += "B";
            break;

          case 3:
            t += "C";
        }

        t += this.hvcC.general_profile_idc, t += ".";
        var i = this.hvcC.general_profile_compatibility,
            r = 0;

        for (e = 0; e < 32 && (r |= 1 & i, 31 != e); e++) {
          r <<= 1, i >>= 1;
        }

        t += d.decimalToHex(r, 0), t += ".", 0 === this.hvcC.general_tier_flag ? t += "L" : t += "H", t += this.hvcC.general_level_idc;
        var n = !1,
            a = "";

        for (e = 5; e >= 0; e--) {
          (this.hvcC.general_constraint_indicator[e] || n) && (a = "." + d.decimalToHex(this.hvcC.general_constraint_indicator[e], 0) + a, n = !0);
        }

        t += a;
      }

      return t;
    }, d.mp4aSampleEntry.prototype.getCodec = function () {
      var e = d.SampleEntry.prototype.getCodec.call(this);

      if (this.esds && this.esds.esd) {
        var t = this.esds.esd.getOTI(),
            i = this.esds.esd.getAudioConfig();
        return e + "." + d.decimalToHex(t) + (i ? "." + i : "");
      }

      return e;
    }, d.stxtSampleEntry.prototype.getCodec = function () {
      var e = d.SampleEntry.prototype.getCodec.call(this);
      return this.mime_format ? e + "." + this.mime_format : e;
    }, d.av01SampleEntry.prototype.getCodec = function () {
      var e,
          t = d.SampleEntry.prototype.getCodec.call(this);
      return 2 === this.av1C.seq_profile && 1 === this.av1C.high_bitdepth ? e = 1 === this.av1C.twelve_bit ? "12" : "10" : this.av1C.seq_profile <= 2 && (e = 1 === this.av1C.high_bitdepth ? "10" : "08"), t + "." + this.av1C.seq_profile + "." + this.av1C.seq_level_idx_0 + (this.av1C.seq_tier_0 ? "H" : "M") + "." + e;
    }, d.Box.prototype.writeHeader = function (e, t) {
      this.size += 8, this.size > l && (this.size += 8), "uuid" === this.type && (this.size += 16), a.debug("BoxWriter", "Writing box " + this.type + " of size: " + this.size + " at position " + e.getPosition() + (t || "")), this.size > l ? e.writeUint32(1) : (this.sizePosition = e.getPosition(), e.writeUint32(this.size)), e.writeString(this.type, null, 4), "uuid" === this.type && e.writeUint8Array(this.uuid), this.size > l && e.writeUint64(this.size);
    }, d.FullBox.prototype.writeHeader = function (e) {
      this.size += 4, d.Box.prototype.writeHeader.call(this, e, " v=" + this.version + " f=" + this.flags), e.writeUint8(this.version), e.writeUint24(this.flags);
    }, d.Box.prototype.write = function (e) {
      "mdat" === this.type ? this.data && (this.size = this.data.length, this.writeHeader(e), e.writeUint8Array(this.data)) : (this.size = this.data ? this.data.length : 0, this.writeHeader(e), this.data && e.writeUint8Array(this.data));
    }, d.ContainerBox.prototype.write = function (e) {
      this.size = 0, this.writeHeader(e);

      for (var t = 0; t < this.boxes.length; t++) {
        this.boxes[t] && (this.boxes[t].write(e), this.size += this.boxes[t].size);
      }

      a.debug("BoxWriter", "Adjusting box " + this.type + " with new size " + this.size), e.adjustUint32(this.sizePosition, this.size);
    }, d.TrackReferenceTypeBox.prototype.write = function (e) {
      this.size = 4 * this.track_ids.length, this.writeHeader(e), e.writeUint32Array(this.track_ids);
    }, d.avcCBox.prototype.write = function (e) {
      var t;

      for (this.size = 7, t = 0; t < this.SPS.length; t++) {
        this.size += 2 + this.SPS[t].length;
      }

      for (t = 0; t < this.PPS.length; t++) {
        this.size += 2 + this.PPS[t].length;
      }

      for (this.ext && (this.size += this.ext.length), this.writeHeader(e), e.writeUint8(this.configurationVersion), e.writeUint8(this.AVCProfileIndication), e.writeUint8(this.profile_compatibility), e.writeUint8(this.AVCLevelIndication), e.writeUint8(this.lengthSizeMinusOne + 252), e.writeUint8(this.SPS.length + 224), t = 0; t < this.SPS.length; t++) {
        e.writeUint16(this.SPS[t].length), e.writeUint8Array(this.SPS[t].nalu);
      }

      for (e.writeUint8(this.PPS.length), t = 0; t < this.PPS.length; t++) {
        e.writeUint16(this.PPS[t].length), e.writeUint8Array(this.PPS[t].nalu);
      }

      this.ext && e.writeUint8Array(this.ext);
    }, d.co64Box.prototype.write = function (e) {
      var t;

      for (this.version = 0, this.flags = 0, this.size = 4 + 8 * this.chunk_offsets.length, this.writeHeader(e), e.writeUint32(this.chunk_offsets.length), t = 0; t < this.chunk_offsets.length; t++) {
        e.writeUint64(this.chunk_offsets[t]);
      }
    }, d.cslgBox.prototype.write = function (e) {
      this.version = 0, this.flags = 0, this.size = 20, this.writeHeader(e), e.writeInt32(this.compositionToDTSShift), e.writeInt32(this.leastDecodeToDisplayDelta), e.writeInt32(this.greatestDecodeToDisplayDelta), e.writeInt32(this.compositionStartTime), e.writeInt32(this.compositionEndTime);
    }, d.cttsBox.prototype.write = function (e) {
      var t;

      for (this.version = 0, this.flags = 0, this.size = 4 + 8 * this.sample_counts.length, this.writeHeader(e), e.writeUint32(this.sample_counts.length), t = 0; t < this.sample_counts.length; t++) {
        e.writeUint32(this.sample_counts[t]), 1 === this.version ? e.writeInt32(this.sample_offsets[t]) : e.writeUint32(this.sample_offsets[t]);
      }
    }, d.drefBox.prototype.write = function (e) {
      this.version = 0, this.flags = 0, this.size = 4, this.writeHeader(e), e.writeUint32(this.entries.length);

      for (var t = 0; t < this.entries.length; t++) {
        this.entries[t].write(e), this.size += this.entries[t].size;
      }

      a.debug("BoxWriter", "Adjusting box " + this.type + " with new size " + this.size), e.adjustUint32(this.sizePosition, this.size);
    }, d.elngBox.prototype.write = function (e) {
      this.version = 0, this.flags = 0, this.size = this.extended_language.length, this.writeHeader(e), e.writeString(this.extended_language);
    }, d.elstBox.prototype.write = function (e) {
      this.version = 0, this.flags = 0, this.size = 4 + 12 * this.entries.length, this.writeHeader(e), e.writeUint32(this.entries.length);

      for (var t = 0; t < this.entries.length; t++) {
        var i = this.entries[t];
        e.writeUint32(i.segment_duration), e.writeInt32(i.media_time), e.writeInt16(i.media_rate_integer), e.writeInt16(i.media_rate_fraction);
      }
    }, d.emsgBox.prototype.write = function (e) {
      this.version = 0, this.flags = 0, this.size = 16 + this.message_data.length + (this.scheme_id_uri.length + 1) + (this.value.length + 1), this.writeHeader(e), e.writeCString(this.scheme_id_uri), e.writeCString(this.value), e.writeUint32(this.timescale), e.writeUint32(this.presentation_time_delta), e.writeUint32(this.event_duration), e.writeUint32(this.id), e.writeUint8Array(this.message_data);
    }, d.ftypBox.prototype.write = function (e) {
      this.size = 8 + 4 * this.compatible_brands.length, this.writeHeader(e), e.writeString(this.major_brand, null, 4), e.writeUint32(this.minor_version);

      for (var t = 0; t < this.compatible_brands.length; t++) {
        e.writeString(this.compatible_brands[t], null, 4);
      }
    }, d.hdlrBox.prototype.write = function (e) {
      this.size = 20 + this.name.length + 1, this.version = 0, this.flags = 0, this.writeHeader(e), e.writeUint32(0), e.writeString(this.handler, null, 4), e.writeUint32(0), e.writeUint32(0), e.writeUint32(0), e.writeCString(this.name);
    }, d.kindBox.prototype.write = function (e) {
      this.version = 0, this.flags = 0, this.size = this.schemeURI.length + 1 + (this.value.length + 1), this.writeHeader(e), e.writeCString(this.schemeURI), e.writeCString(this.value);
    }, d.mdhdBox.prototype.write = function (e) {
      this.size = 20, this.flags = 0, this.version = 0, this.writeHeader(e), e.writeUint32(this.creation_time), e.writeUint32(this.modification_time), e.writeUint32(this.timescale), e.writeUint32(this.duration), e.writeUint16(this.language), e.writeUint16(0);
    }, d.mehdBox.prototype.write = function (e) {
      this.version = 0, this.flags = 0, this.size = 4, this.writeHeader(e), e.writeUint32(this.fragment_duration);
    }, d.mfhdBox.prototype.write = function (e) {
      this.version = 0, this.flags = 0, this.size = 4, this.writeHeader(e), e.writeUint32(this.sequence_number);
    }, d.mvhdBox.prototype.write = function (e) {
      this.version = 0, this.flags = 0, this.size = 96, this.writeHeader(e), e.writeUint32(this.creation_time), e.writeUint32(this.modification_time), e.writeUint32(this.timescale), e.writeUint32(this.duration), e.writeUint32(this.rate), e.writeUint16(this.volume << 8), e.writeUint16(0), e.writeUint32(0), e.writeUint32(0), e.writeUint32Array(this.matrix), e.writeUint32(0), e.writeUint32(0), e.writeUint32(0), e.writeUint32(0), e.writeUint32(0), e.writeUint32(0), e.writeUint32(this.next_track_id);
    }, d.SampleEntry.prototype.writeHeader = function (e) {
      this.size = 8, d.Box.prototype.writeHeader.call(this, e), e.writeUint8(0), e.writeUint8(0), e.writeUint8(0), e.writeUint8(0), e.writeUint8(0), e.writeUint8(0), e.writeUint16(this.data_reference_index);
    }, d.SampleEntry.prototype.writeFooter = function (e) {
      for (var t = 0; t < this.boxes.length; t++) {
        this.boxes[t].write(e), this.size += this.boxes[t].size;
      }

      a.debug("BoxWriter", "Adjusting box " + this.type + " with new size " + this.size), e.adjustUint32(this.sizePosition, this.size);
    }, d.SampleEntry.prototype.write = function (e) {
      this.writeHeader(e), e.writeUint8Array(this.data), this.size += this.data.length, a.debug("BoxWriter", "Adjusting box " + this.type + " with new size " + this.size), e.adjustUint32(this.sizePosition, this.size);
    }, d.VisualSampleEntry.prototype.write = function (e) {
      this.writeHeader(e), this.size += 70, e.writeUint16(0), e.writeUint16(0), e.writeUint32(0), e.writeUint32(0), e.writeUint32(0), e.writeUint16(this.width), e.writeUint16(this.height), e.writeUint32(this.horizresolution), e.writeUint32(this.vertresolution), e.writeUint32(0), e.writeUint16(this.frame_count), e.writeUint8(Math.min(31, this.compressorname.length)), e.writeString(this.compressorname, null, 31), e.writeUint16(this.depth), e.writeInt16(-1), this.writeFooter(e);
    }, d.AudioSampleEntry.prototype.write = function (e) {
      this.writeHeader(e), this.size += 20, e.writeUint32(0), e.writeUint32(0), e.writeUint16(this.channel_count), e.writeUint16(this.samplesize), e.writeUint16(0), e.writeUint16(0), e.writeUint32(this.samplerate << 16), this.writeFooter(e);
    }, d.stppSampleEntry.prototype.write = function (e) {
      this.writeHeader(e), this.size += this.namespace.length + 1 + this.schema_location.length + 1 + this.auxiliary_mime_types.length + 1, e.writeCString(this.namespace), e.writeCString(this.schema_location), e.writeCString(this.auxiliary_mime_types), this.writeFooter(e);
    }, d.SampleGroupEntry.prototype.write = function (e) {
      e.writeUint8Array(this.data);
    }, d.sbgpBox.prototype.write = function (e) {
      this.version = 1, this.flags = 0, this.size = 12 + 8 * this.entries.length, this.writeHeader(e), e.writeString(this.grouping_type, null, 4), e.writeUint32(this.grouping_type_parameter), e.writeUint32(this.entries.length);

      for (var t = 0; t < this.entries.length; t++) {
        var i = this.entries[t];
        e.writeInt32(i.sample_count), e.writeInt32(i.group_description_index);
      }
    }, d.sgpdBox.prototype.write = function (e) {
      var t, i;

      for (this.flags = 0, this.size = 12, t = 0; t < this.entries.length; t++) {
        i = this.entries[t], 1 === this.version && (0 === this.default_length && (this.size += 4), this.size += i.data.length);
      }

      for (this.writeHeader(e), e.writeString(this.grouping_type, null, 4), 1 === this.version && e.writeUint32(this.default_length), this.version >= 2 && e.writeUint32(this.default_sample_description_index), e.writeUint32(this.entries.length), t = 0; t < this.entries.length; t++) {
        i = this.entries[t], 1 === this.version && 0 === this.default_length && e.writeUint32(i.description_length), i.write(e);
      }
    }, d.sidxBox.prototype.write = function (e) {
      this.version = 0, this.flags = 0, this.size = 20 + 12 * this.references.length, this.writeHeader(e), e.writeUint32(this.reference_ID), e.writeUint32(this.timescale), e.writeUint32(this.earliest_presentation_time), e.writeUint32(this.first_offset), e.writeUint16(0), e.writeUint16(this.references.length);

      for (var t = 0; t < this.references.length; t++) {
        var i = this.references[t];
        e.writeUint32(i.reference_type << 31 | i.referenced_size), e.writeUint32(i.subsegment_duration), e.writeUint32(i.starts_with_SAP << 31 | i.SAP_type << 28 | i.SAP_delta_time);
      }
    }, d.stcoBox.prototype.write = function (e) {
      this.version = 0, this.flags = 0, this.size = 4 + 4 * this.chunk_offsets.length, this.writeHeader(e), e.writeUint32(this.chunk_offsets.length), e.writeUint32Array(this.chunk_offsets);
    }, d.stscBox.prototype.write = function (e) {
      var t;

      for (this.version = 0, this.flags = 0, this.size = 4 + 12 * this.first_chunk.length, this.writeHeader(e), e.writeUint32(this.first_chunk.length), t = 0; t < this.first_chunk.length; t++) {
        e.writeUint32(this.first_chunk[t]), e.writeUint32(this.samples_per_chunk[t]), e.writeUint32(this.sample_description_index[t]);
      }
    }, d.stsdBox.prototype.write = function (e) {
      var t;

      for (this.version = 0, this.flags = 0, this.size = 0, this.writeHeader(e), e.writeUint32(this.entries.length), this.size += 4, t = 0; t < this.entries.length; t++) {
        this.entries[t].write(e), this.size += this.entries[t].size;
      }

      a.debug("BoxWriter", "Adjusting box " + this.type + " with new size " + this.size), e.adjustUint32(this.sizePosition, this.size);
    }, d.stshBox.prototype.write = function (e) {
      var t;

      for (this.version = 0, this.flags = 0, this.size = 4 + 8 * this.shadowed_sample_numbers.length, this.writeHeader(e), e.writeUint32(this.shadowed_sample_numbers.length), t = 0; t < this.shadowed_sample_numbers.length; t++) {
        e.writeUint32(this.shadowed_sample_numbers[t]), e.writeUint32(this.sync_sample_numbers[t]);
      }
    }, d.stssBox.prototype.write = function (e) {
      this.version = 0, this.flags = 0, this.size = 4 + 4 * this.sample_numbers.length, this.writeHeader(e), e.writeUint32(this.sample_numbers.length), e.writeUint32Array(this.sample_numbers);
    }, d.stszBox.prototype.write = function (e) {
      var t,
          i = !0;
      if (this.version = 0, this.flags = 0, this.sample_sizes.length > 0) for (t = 0; t + 1 < this.sample_sizes.length;) {
        if (this.sample_sizes[t + 1] !== this.sample_sizes[0]) {
          i = !1;
          break;
        }

        t++;
      } else i = !1;
      this.size = 8, i || (this.size += 4 * this.sample_sizes.length), this.writeHeader(e), i ? e.writeUint32(this.sample_sizes[0]) : e.writeUint32(0), e.writeUint32(this.sample_sizes.length), i || e.writeUint32Array(this.sample_sizes);
    }, d.sttsBox.prototype.write = function (e) {
      var t;

      for (this.version = 0, this.flags = 0, this.size = 4 + 8 * this.sample_counts.length, this.writeHeader(e), e.writeUint32(this.sample_counts.length), t = 0; t < this.sample_counts.length; t++) {
        e.writeUint32(this.sample_counts[t]), e.writeUint32(this.sample_deltas[t]);
      }
    }, d.tfdtBox.prototype.write = function (e) {
      this.version = 0, this.flags = 0, this.size = 4, 1 === this.version && (this.size += 4), this.writeHeader(e), 1 === this.version ? e.writeUint64(this.baseMediaDecodeTime) : e.writeUint32(this.baseMediaDecodeTime);
    }, d.tfhdBox.prototype.write = function (e) {
      this.version = 0, this.size = 4, this.flags & d.TFHD_FLAG_BASE_DATA_OFFSET && (this.size += 8), this.flags & d.TFHD_FLAG_SAMPLE_DESC && (this.size += 4), this.flags & d.TFHD_FLAG_SAMPLE_DUR && (this.size += 4), this.flags & d.TFHD_FLAG_SAMPLE_SIZE && (this.size += 4), this.flags & d.TFHD_FLAG_SAMPLE_FLAGS && (this.size += 4), this.writeHeader(e), e.writeUint32(this.track_id), this.flags & d.TFHD_FLAG_BASE_DATA_OFFSET && e.writeUint64(this.base_data_offset), this.flags & d.TFHD_FLAG_SAMPLE_DESC && e.writeUint32(this.default_sample_description_index), this.flags & d.TFHD_FLAG_SAMPLE_DUR && e.writeUint32(this.default_sample_duration), this.flags & d.TFHD_FLAG_SAMPLE_SIZE && e.writeUint32(this.default_sample_size), this.flags & d.TFHD_FLAG_SAMPLE_FLAGS && e.writeUint32(this.default_sample_flags);
    }, d.tkhdBox.prototype.write = function (e) {
      this.version = 0, this.size = 80, this.writeHeader(e), e.writeUint32(this.creation_time), e.writeUint32(this.modification_time), e.writeUint32(this.track_id), e.writeUint32(0), e.writeUint32(this.duration), e.writeUint32(0), e.writeUint32(0), e.writeInt16(this.layer), e.writeInt16(this.alternate_group), e.writeInt16(this.volume << 8), e.writeUint16(0), e.writeInt32Array(this.matrix), e.writeUint32(this.width), e.writeUint32(this.height);
    }, d.trexBox.prototype.write = function (e) {
      this.version = 0, this.flags = 0, this.size = 20, this.writeHeader(e), e.writeUint32(this.track_id), e.writeUint32(this.default_sample_description_index), e.writeUint32(this.default_sample_duration), e.writeUint32(this.default_sample_size), e.writeUint32(this.default_sample_flags);
    }, d.trunBox.prototype.write = function (e) {
      this.version = 0, this.size = 4, this.flags & d.TRUN_FLAGS_DATA_OFFSET && (this.size += 4), this.flags & d.TRUN_FLAGS_FIRST_FLAG && (this.size += 4), this.flags & d.TRUN_FLAGS_DURATION && (this.size += 4 * this.sample_duration.length), this.flags & d.TRUN_FLAGS_SIZE && (this.size += 4 * this.sample_size.length), this.flags & d.TRUN_FLAGS_FLAGS && (this.size += 4 * this.sample_flags.length), this.flags & d.TRUN_FLAGS_CTS_OFFSET && (this.size += 4 * this.sample_composition_time_offset.length), this.writeHeader(e), e.writeUint32(this.sample_count), this.flags & d.TRUN_FLAGS_DATA_OFFSET && (this.data_offset_position = e.getPosition(), e.writeInt32(this.data_offset)), this.flags & d.TRUN_FLAGS_FIRST_FLAG && e.writeUint32(this.first_sample_flags);

      for (var t = 0; t < this.sample_count; t++) {
        this.flags & d.TRUN_FLAGS_DURATION && e.writeUint32(this.sample_duration[t]), this.flags & d.TRUN_FLAGS_SIZE && e.writeUint32(this.sample_size[t]), this.flags & d.TRUN_FLAGS_FLAGS && e.writeUint32(this.sample_flags[t]), this.flags & d.TRUN_FLAGS_CTS_OFFSET && (0 === this.version ? e.writeUint32(this.sample_composition_time_offset[t]) : e.writeInt32(this.sample_composition_time_offset[t]));
      }
    }, d["url Box"].prototype.write = function (e) {
      this.version = 0, this.location ? (this.flags = 0, this.size = this.location.length + 1) : (this.flags = 1, this.size = 0), this.writeHeader(e), this.location && e.writeCString(this.location);
    }, d["urn Box"].prototype.write = function (e) {
      this.version = 0, this.flags = 0, this.size = this.name.length + 1 + (this.location ? this.location.length + 1 : 0), this.writeHeader(e), e.writeCString(this.name), this.location && e.writeCString(this.location);
    }, d.vmhdBox.prototype.write = function (e) {
      this.version = 0, this.flags = 1, this.size = 8, this.writeHeader(e), e.writeUint16(this.graphicsmode), e.writeUint16Array(this.opcolor);
    }, d.cttsBox.prototype.unpack = function (e) {
      var t, i, r;

      for (r = 0, t = 0; t < this.sample_counts.length; t++) {
        for (i = 0; i < this.sample_counts[t]; i++) {
          e[r].pts = e[r].dts + this.sample_offsets[t], r++;
        }
      }
    }, d.sttsBox.prototype.unpack = function (e) {
      var t, i, r;

      for (r = 0, t = 0; t < this.sample_counts.length; t++) {
        for (i = 0; i < this.sample_counts[t]; i++) {
          e[r].dts = 0 === r ? 0 : e[r - 1].dts + this.sample_deltas[t], r++;
        }
      }
    }, d.stcoBox.prototype.unpack = function (e) {
      var t;

      for (t = 0; t < this.chunk_offsets.length; t++) {
        e[t].offset = this.chunk_offsets[t];
      }
    }, d.stscBox.prototype.unpack = function (e) {
      var t, i, r, n, a;

      for (n = 0, a = 0, t = 0; t < this.first_chunk.length; t++) {
        for (i = 0; i < (t + 1 < this.first_chunk.length ? this.first_chunk[t + 1] : 1 / 0); i++) {
          for (a++, r = 0; r < this.samples_per_chunk[t]; r++) {
            if (!e[n]) return;
            e[n].description_index = this.sample_description_index[t], e[n].chunk_index = a, n++;
          }
        }
      }
    }, d.stszBox.prototype.unpack = function (e) {
      var t;

      for (t = 0; t < this.sample_sizes.length; t++) {
        e[t].size = this.sample_sizes[t];
      }
    }, d.DIFF_BOXES_PROP_NAMES = ["boxes", "entries", "references", "subsamples", "items", "item_infos", "extents", "associations", "subsegments", "ranges", "seekLists", "seekPoints", "esd", "levels"], d.DIFF_PRIMITIVE_ARRAY_PROP_NAMES = ["compatible_brands", "matrix", "opcolor", "sample_counts", "sample_counts", "sample_deltas", "first_chunk", "samples_per_chunk", "sample_sizes", "chunk_offsets", "sample_offsets", "sample_description_index", "sample_duration"], d.boxEqualFields = function (e, t) {
      if (e && !t) return !1;
      var i;

      for (i in e) {
        if (!(d.DIFF_BOXES_PROP_NAMES.indexOf(i) > -1 || e[i] instanceof d.Box || t[i] instanceof d.Box || void 0 === e[i] || void 0 === t[i] || "function" == typeof e[i] || "function" == typeof t[i] || e.subBoxNames && e.subBoxNames.indexOf(i.slice(0, 4)) > -1 || t.subBoxNames && t.subBoxNames.indexOf(i.slice(0, 4)) > -1 || "data" === i || "start" === i || "size" === i || "creation_time" === i || "modification_time" === i || d.DIFF_PRIMITIVE_ARRAY_PROP_NAMES.indexOf(i) > -1 || e[i] === t[i])) return !1;
      }

      return !0;
    }, d.boxEqual = function (e, t) {
      if (!d.boxEqualFields(e, t)) return !1;

      for (var i = 0; i < d.DIFF_BOXES_PROP_NAMES.length; i++) {
        var r = d.DIFF_BOXES_PROP_NAMES[i];
        if (e[r] && t[r] && !d.boxEqual(e[r], t[r])) return !1;
      }

      return !0;
    };

    var f = function f() {};

    f.prototype.parseSample = function (e) {
      var t,
          i,
          r = new s(e.buffer);

      for (t = []; !r.isEos();) {
        (i = d.parseOneBox(r, !1)).code === d.OK && "vttc" === i.box.type && t.push(i.box);
      }

      return t;
    }, f.prototype.getText = function (e, t, i) {
      function r(e, t, i) {
        return i = i || "0", (e += "").length >= t ? e : new Array(t - e.length + 1).join(i) + e;
      }

      function n(e) {
        var t = Math.floor(e / 3600),
            i = Math.floor((e - 3600 * t) / 60),
            n = Math.floor(e - 3600 * t - 60 * i),
            a = Math.floor(1e3 * (e - 3600 * t - 60 * i - n));
        return r(t, 2) + ":" + r(i, 2) + ":" + r(n, 2) + "." + r(a, 3);
      }

      for (var a = this.parseSample(i), s = "", o = 0; o < a.length; o++) {
        var l = a[o];
        s += n(e) + " --\x3e " + n(t) + "\r\n", s += l.payl.text;
      }

      return s;
    };

    var c = function c() {};

    c.prototype.parseSample = function (e) {
      var t,
          i = {};
      i.resources = [];
      var r = new s(e.data.buffer);

      if (e.subsamples && 0 !== e.subsamples.length) {
        if (i.documentString = r.readString(e.subsamples[0].size), e.subsamples.length > 1) for (t = 1; t < e.subsamples.length; t++) {
          i.resources[t] = r.readUint8Array(e.subsamples[t].size);
        }
      } else i.documentString = r.readString(e.data.length);

      return "undefined" != typeof DOMParser && (i.document = new DOMParser().parseFromString(i.documentString, "application/xml")), i;
    };

    var p = function p() {};

    p.prototype.parseSample = function (e) {
      return new s(e.data.buffer).readString(e.data.length);
    }, p.prototype.parseConfig = function (e) {
      var t = new s(e.buffer);
      return t.readUint32(), t.readCString();
    }, void 0 !== i && (i.XMLSubtitlein4Parser = c, i.Textin4Parser = p);

    var m = function m(e) {
      this.stream = e || new h(), this.boxes = [], this.mdats = [], this.moofs = [], this.isProgressive = !1, this.moovStartFound = !1, this.onMoovStart = null, this.moovStartSent = !1, this.onReady = null, this.readySent = !1, this.onSegment = null, this.onSamples = null, this.onError = null, this.sampleListBuilt = !1, this.fragmentedTracks = [], this.extractedTracks = [], this.isFragmentationInitialized = !1, this.sampleProcessingStarted = !1, this.nextMoofNumber = 0, this.itemListBuilt = !1, this.onSidx = null, this.sidxSent = !1;
    };

    m.prototype.setSegmentOptions = function (e, t, i) {
      var r = this.getTrackById(e);

      if (r) {
        var n = {};
        this.fragmentedTracks.push(n), n.id = e, n.user = t, n.trak = r, r.nextSample = 0, n.segmentStream = null, n.nb_samples = 1e3, n.rapAlignement = !0, i && (i.nbSamples && (n.nb_samples = i.nbSamples), i.rapAlignement && (n.rapAlignement = i.rapAlignement));
      }
    }, m.prototype.unsetSegmentOptions = function (e) {
      for (var t = -1, i = 0; i < this.fragmentedTracks.length; i++) {
        this.fragmentedTracks[i].id == e && (t = i);
      }

      t > -1 && this.fragmentedTracks.splice(t, 1);
    }, m.prototype.setExtractionOptions = function (e, t, i) {
      var r = this.getTrackById(e);

      if (r) {
        var n = {};
        this.extractedTracks.push(n), n.id = e, n.user = t, n.trak = r, r.nextSample = 0, n.nb_samples = 1e3, n.samples = [], i && i.nbSamples && (n.nb_samples = i.nbSamples);
      }
    }, m.prototype.unsetExtractionOptions = function (e) {
      for (var t = -1, i = 0; i < this.extractedTracks.length; i++) {
        this.extractedTracks[i].id == e && (t = i);
      }

      t > -1 && this.extractedTracks.splice(t, 1);
    }, m.prototype.parse = function () {
      var e, t;
      if (!this.restoreParsePosition || this.restoreParsePosition()) for (;;) {
        if (this.hasIncompleteMdat && this.hasIncompleteMdat()) {
          if (this.processIncompleteMdat()) continue;
          return;
        }

        if (this.saveParsePosition && this.saveParsePosition(), (e = d.parseOneBox(this.stream, !1)).code === d.ERR_NOT_ENOUGH_DATA) {
          if (this.processIncompleteBox) {
            if (this.processIncompleteBox(e)) continue;
            return;
          }

          return;
        }

        var i;

        switch (i = "uuid" !== (t = e.box).type ? t.type : t.uuid, this.boxes.push(t), i) {
          case "mdat":
            this.mdats.push(t);
            break;

          case "moof":
            this.moofs.push(t);
            break;

          case "moov":
            this.moovStartFound = !0, 0 === this.mdats.length && (this.isProgressive = !0);

          default:
            void 0 !== this[i] && a.warn("ISOFile", "Duplicate Box of type: " + i + ", overriding previous occurrence"), this[i] = t;
        }

        this.updateUsedBytes && this.updateUsedBytes(t, e);
      }
    }, m.prototype.checkBuffer = function (e) {
      if (null == e) throw "Buffer must be defined and non empty";
      if (void 0 === e.fileStart) throw "Buffer must have a fileStart property";
      return 0 === e.byteLength ? (a.warn("ISOFile", "Ignoring empty buffer (fileStart: " + e.fileStart + ")"), this.stream.logBufferLevel(), !1) : (a.info("ISOFile", "Processing buffer (fileStart: " + e.fileStart + ")"), e.usedBytes = 0, this.stream.insertBuffer(e), this.stream.logBufferLevel(), !!this.stream.initialized() || (a.warn("ISOFile", "Not ready to start parsing"), !1));
    }, m.prototype.appendBuffer = function (e, t) {
      var i;
      if (this.checkBuffer(e)) return this.parse(), this.moovStartFound && !this.moovStartSent && (this.moovStartSent = !0, this.onMoovStart && this.onMoovStart()), this.moov ? (this.sampleListBuilt || (this.buildSampleLists(), this.sampleListBuilt = !0), this.updateSampleLists(), this.onReady && !this.readySent && (this.readySent = !0, this.onReady(this.getInfo())), this.processSamples(t), this.nextSeekPosition ? (i = this.nextSeekPosition, this.nextSeekPosition = void 0) : i = this.nextParsePosition, this.stream.getEndFilePositionAfter && (i = this.stream.getEndFilePositionAfter(i))) : i = this.nextParsePosition ? this.nextParsePosition : 0, this.sidx && this.onSidx && !this.sidxSent && (this.onSidx(this.sidx), this.sidxSent = !0), this.meta && (this.flattenItemInfo && !this.itemListBuilt && (this.flattenItemInfo(), this.itemListBuilt = !0), this.processItems && this.processItems(this.onItem)), this.stream.cleanBuffers && (a.info("ISOFile", "Done processing buffer (fileStart: " + e.fileStart + ") - next buffer to fetch should have a fileStart position of " + i), this.stream.logBufferLevel(), this.stream.cleanBuffers(), this.stream.logBufferLevel(!0), a.info("ISOFile", "Sample data size in memory: " + this.getAllocatedSampleDataSize())), i;
    }, m.prototype.getInfo = function () {
      var e,
          t,
          i,
          r,
          n,
          a = {},
          s = new Date("1904-01-01T00:00:00Z").getTime();
      if (this.moov) for (a.hasMoov = !0, a.duration = this.moov.mvhd.duration, a.timescale = this.moov.mvhd.timescale, a.isFragmented = null != this.moov.mvex, a.isFragmented && this.moov.mvex.mehd && (a.fragment_duration = this.moov.mvex.mehd.fragment_duration), a.isProgressive = this.isProgressive, a.hasIOD = null != this.moov.iods, a.brands = [], a.brands.push(this.ftyp.major_brand), a.brands = a.brands.concat(this.ftyp.compatible_brands), a.created = new Date(s + 1e3 * this.moov.mvhd.creation_time), a.modified = new Date(s + 1e3 * this.moov.mvhd.modification_time), a.tracks = [], a.audioTracks = [], a.videoTracks = [], a.subtitleTracks = [], a.metadataTracks = [], a.hintTracks = [], a.otherTracks = [], e = 0; e < this.moov.traks.length; e++) {
        if (n = (i = this.moov.traks[e]).mdia.minf.stbl.stsd.entries[0], r = {}, a.tracks.push(r), r.id = i.tkhd.track_id, r.name = i.mdia.hdlr.name, r.references = [], i.tref) for (t = 0; t < i.tref.boxes.length; t++) {
          ref = {}, r.references.push(ref), ref.type = i.tref.boxes[t].type, ref.track_ids = i.tref.boxes[t].track_ids;
        }
        i.edts && (r.edits = i.edts.elst.entries), r.created = new Date(s + 1e3 * i.tkhd.creation_time), r.modified = new Date(s + 1e3 * i.tkhd.modification_time), r.movie_duration = i.tkhd.duration, r.movie_timescale = a.timescale, r.layer = i.tkhd.layer, r.alternate_group = i.tkhd.alternate_group, r.volume = i.tkhd.volume, r.matrix = i.tkhd.matrix, r.track_width = i.tkhd.width / 65536, r.track_height = i.tkhd.height / 65536, r.timescale = i.mdia.mdhd.timescale, r.cts_shift = i.mdia.minf.stbl.cslg, r.duration = i.mdia.mdhd.duration, r.samples_duration = i.samples_duration, r.codec = n.getCodec(), r.kind = i.udta && i.udta.kinds.length ? i.udta.kinds[0] : {
          schemeURI: "",
          value: ""
        }, r.language = i.mdia.elng ? i.mdia.elng.extended_language : i.mdia.mdhd.languageString, r.nb_samples = i.samples.length, r.size = i.samples_size, r.bitrate = 8 * r.size * r.timescale / r.samples_duration, n.isAudio() ? (r.type = "audio", a.audioTracks.push(r), r.audio = {}, r.audio.sample_rate = n.getSampleRate(), r.audio.channel_count = n.getChannelCount(), r.audio.sample_size = n.getSampleSize()) : n.isVideo() ? (r.type = "video", a.videoTracks.push(r), r.video = {}, r.video.width = n.getWidth(), r.video.height = n.getHeight()) : n.isSubtitle() ? (r.type = "subtitles", a.subtitleTracks.push(r)) : n.isHint() ? (r.type = "metadata", a.hintTracks.push(r)) : n.isMetadata() ? (r.type = "metadata", a.metadataTracks.push(r)) : (r.type = "metadata", a.otherTracks.push(r));
      } else a.hasMoov = !1;

      if (a.mime = "", a.hasMoov && a.tracks) {
        for (a.videoTracks && a.videoTracks.length > 0 ? a.mime += 'video/mp4; codecs="' : a.audioTracks && a.audioTracks.length > 0 ? a.mime += 'audio/mp4; codecs="' : a.mime += 'application/mp4; codecs="', e = 0; e < a.tracks.length; e++) {
          0 !== e && (a.mime += ","), a.mime += a.tracks[e].codec;
        }

        a.mime += '"; profiles="', a.mime += this.ftyp.compatible_brands.join(), a.mime += '"';
      }

      return a;
    }, m.prototype.processSamples = function (e) {
      var t, i;

      if (this.sampleProcessingStarted) {
        if (this.isFragmentationInitialized && null !== this.onSegment) for (t = 0; t < this.fragmentedTracks.length; t++) {
          var r = this.fragmentedTracks[t];

          for (i = r.trak; i.nextSample < i.samples.length && this.sampleProcessingStarted;) {
            a.debug("ISOFile", "Creating media fragment on track #" + r.id + " for sample " + i.nextSample);
            var n = this.createFragment(r.id, i.nextSample, r.segmentStream);
            if (!n) break;
            if (r.segmentStream = n, i.nextSample++, (i.nextSample % r.nb_samples == 0 || e || i.nextSample >= i.samples.length) && (a.info("ISOFile", "Sending fragmented data on track #" + r.id + " for samples [" + Math.max(0, i.nextSample - r.nb_samples) + "," + (i.nextSample - 1) + "]"), a.info("ISOFile", "Sample data size in memory: " + this.getAllocatedSampleDataSize()), this.onSegment && this.onSegment(r.id, r.user, r.segmentStream.buffer, i.nextSample, e || i.nextSample >= i.samples.length), r.segmentStream = null, r !== this.fragmentedTracks[t])) break;
          }
        }
        if (null !== this.onSamples) for (t = 0; t < this.extractedTracks.length; t++) {
          var s = this.extractedTracks[t];

          for (i = s.trak; i.nextSample < i.samples.length && this.sampleProcessingStarted;) {
            a.debug("ISOFile", "Exporting on track #" + s.id + " sample #" + i.nextSample);
            var o = this.getSample(i, i.nextSample);
            if (!o) break;
            if (i.nextSample++, s.samples.push(o), (i.nextSample % s.nb_samples == 0 || i.nextSample >= i.samples.length) && (a.debug("ISOFile", "Sending samples on track #" + s.id + " for sample " + i.nextSample), this.onSamples && this.onSamples(s.id, s.user, s.samples), s.samples = [], s !== this.extractedTracks[t])) break;
          }
        }
      }
    }, m.prototype.getBox = function (e) {
      var t = this.getBoxes(e, !0);
      return t.length ? t[0] : null;
    }, m.prototype.getBoxes = function (e, t) {
      var i = [];
      return m._sweep.call(this, e, i, t), i;
    }, m._sweep = function (e, t, i) {
      for (var r in this.type && this.type == e && t.push(this), this.boxes) {
        if (t.length && i) return;

        m._sweep.call(this.boxes[r], e, t, i);
      }
    }, m.prototype.getTrackSamplesInfo = function (e) {
      var t = this.getTrackById(e);
      return t ? t.samples : void 0;
    }, m.prototype.getTrackSample = function (e, t) {
      var i = this.getTrackById(e);
      return this.getSample(i, t);
    }, m.prototype.releaseUsedSamples = function (e, t) {
      var i = 0,
          r = this.getTrackById(e);
      r.lastValidSample || (r.lastValidSample = 0);

      for (var n = r.lastValidSample; n < t; n++) {
        i += this.releaseSample(r, n);
      }

      a.info("ISOFile", "Track #" + e + " released samples up to " + t + " (released size: " + i + ", remaining: " + this.samplesDataSize + ")"), r.lastValidSample = t;
    }, m.prototype.start = function () {
      this.sampleProcessingStarted = !0, this.processSamples(!1);
    }, m.prototype.stop = function () {
      this.sampleProcessingStarted = !1;
    }, m.prototype.flush = function () {
      a.info("ISOFile", "Flushing remaining samples"), this.updateSampleLists(), this.processSamples(!0), this.stream.cleanBuffers(), this.stream.logBufferLevel(!0);
    }, m.prototype.seekTrack = function (e, t, i) {
      var r,
          n,
          s,
          o,
          l = 0,
          h = 0;
      if (0 === i.samples.length) return a.info("ISOFile", "No sample in track, cannot seek! Using time " + a.getDurationString(0, 1) + " and offset: 0"), {
        offset: 0,
        time: 0
      };

      for (r = 0; r < i.samples.length; r++) {
        if (n = i.samples[r], 0 === r) h = 0, o = n.timescale;else if (n.cts > e * n.timescale) {
          h = r - 1;
          break;
        }
        t && n.is_sync && (l = r);
      }

      for (t && (h = l), e = i.samples[h].cts, i.nextSample = h; i.samples[h].alreadyRead === i.samples[h].size && i.samples[h + 1];) {
        h++;
      }

      return s = i.samples[h].offset + i.samples[h].alreadyRead, a.info("ISOFile", "Seeking to " + (t ? "RAP" : "") + " sample #" + i.nextSample + " on track " + i.tkhd.track_id + ", time " + a.getDurationString(e, o) + " and offset: " + s), {
        offset: s,
        time: e / o
      };
    }, m.prototype.seek = function (e, t) {
      var i,
          r,
          n,
          s = this.moov,
          o = {
        offset: 1 / 0,
        time: 1 / 0
      };

      if (this.moov) {
        for (n = 0; n < s.traks.length; n++) {
          i = s.traks[n], (r = this.seekTrack(e, t, i)).offset < o.offset && (o.offset = r.offset), r.time < o.time && (o.time = r.time);
        }

        return a.info("ISOFile", "Seeking at time " + a.getDurationString(o.time, 1) + " needs a buffer with a fileStart position of " + o.offset), o.offset === 1 / 0 ? o = {
          offset: this.nextParsePosition,
          time: 0
        } : o.offset = this.stream.getEndFilePositionAfter(o.offset), a.info("ISOFile", "Adjusted seek position (after checking data already in buffer): " + o.offset), o;
      }

      throw "Cannot seek: moov not received!";
    }, m.prototype.equal = function (e) {
      for (var t = 0; t < this.boxes.length && t < e.boxes.length;) {
        var i = this.boxes[t],
            r = e.boxes[t];
        if (!d.boxEqual(i, r)) return !1;
        t++;
      }

      return !0;
    }, void 0 !== i && (i.ISOFile = m), m.prototype.lastBoxStartPosition = 0, m.prototype.parsingMdat = null, m.prototype.nextParsePosition = 0, m.prototype.discardMdatData = !1, m.prototype.processIncompleteBox = function (e) {
      var t;
      return "mdat" === e.type ? (t = new d[e.type + "Box"](e.size), this.parsingMdat = t, this.boxes.push(t), this.mdats.push(t), t.start = e.start, t.hdr_size = e.hdr_size, this.stream.addUsedBytes(t.hdr_size), this.lastBoxStartPosition = t.start + t.size, this.stream.seek(t.start + t.size, !1, this.discardMdatData) ? (this.parsingMdat = null, !0) : (this.moovStartFound ? this.nextParsePosition = this.stream.findEndContiguousBuf() : this.nextParsePosition = t.start + t.size, !1)) : ("moov" === e.type && (this.moovStartFound = !0, 0 === this.mdats.length && (this.isProgressive = !0)), !!this.stream.mergeNextBuffer && this.stream.mergeNextBuffer() ? (this.nextParsePosition = this.stream.getEndPosition(), !0) : (e.type ? this.moovStartFound ? this.nextParsePosition = this.stream.getEndPosition() : this.nextParsePosition = this.stream.getPosition() + e.size : this.nextParsePosition = this.stream.getEndPosition(), !1));
    }, m.prototype.hasIncompleteMdat = function () {
      return null !== this.parsingMdat;
    }, m.prototype.processIncompleteMdat = function () {
      var e;
      return e = this.parsingMdat, this.stream.seek(e.start + e.size, !1, this.discardMdatData) ? (a.debug("ISOFile", "Found 'mdat' end in buffered data"), this.parsingMdat = null, !0) : (this.nextParsePosition = this.stream.findEndContiguousBuf(), !1);
    }, m.prototype.restoreParsePosition = function () {
      return this.stream.seek(this.lastBoxStartPosition, !0, this.discardMdatData);
    }, m.prototype.saveParsePosition = function () {
      this.lastBoxStartPosition = this.stream.getPosition();
    }, m.prototype.updateUsedBytes = function (e, t) {
      this.stream.addUsedBytes && ("mdat" === e.type ? (this.stream.addUsedBytes(e.hdr_size), this.discardMdatData && this.stream.addUsedBytes(e.size - e.hdr_size)) : this.stream.addUsedBytes(e.size));
    }, m.prototype.add = d.Box.prototype.add, m.prototype.addBox = d.Box.prototype.addBox, m.prototype.init = function (e) {
      var t = e || {},
          i = (this.add("ftyp").set("major_brand", t.brands && t.brands[0] || "iso4").set("minor_version", 0).set("compatible_brands", t.brands || ["iso4"]), this.add("moov"));
      return i.add("mvhd").set("timescale", t.timescale || 600).set("rate", t.rate || 1).set("creation_time", 0).set("modification_time", 0).set("duration", t.duration || 0).set("volume", 1).set("matrix", [0, 0, 0, 0, 0, 0, 0, 0, 0]).set("next_track_id", 1), i.add("mvex"), this;
    }, m.prototype.addTrack = function (e) {
      this.moov || this.init(e);
      var t = e || {};
      t.width = t.width || 320, t.height = t.height || 320, t.id = t.id || this.moov.mvhd.next_track_id, t.type = t.type || "avc1";
      var i = this.moov.add("trak");
      this.moov.mvhd.next_track_id = t.id + 1, i.add("tkhd").set("flags", d.TKHD_FLAG_ENABLED | d.TKHD_FLAG_IN_MOVIE | d.TKHD_FLAG_IN_PREVIEW).set("creation_time", 0).set("modification_time", 0).set("track_id", t.id).set("duration", t.duration || 0).set("layer", t.layer || 0).set("alternate_group", 0).set("volume", 1).set("matrix", [0, 0, 0, 0, 0, 0, 0, 0, 0]).set("width", t.width).set("height", t.height);
      var r = i.add("mdia");
      r.add("mdhd").set("creation_time", 0).set("modification_time", 0).set("timescale", t.timescale || 1).set("duration", t.media_duration || 0).set("language", t.language || 0), r.add("hdlr").set("handler", t.hdlr || "vide").set("name", t.name || "Track created with MP4Box.js"), r.add("elng").set("extended_language", t.language || "fr-FR");
      var n = r.add("minf");

      if (void 0 !== d[t.type + "SampleEntry"]) {
        var a = new d[t.type + "SampleEntry"]();
        a.data_reference_index = 1;
        var s = "";

        for (var o in d.sampleEntryCodes) {
          for (var l = d.sampleEntryCodes[o], h = 0; h < l.length; h++) {
            if (l.indexOf(t.type) > -1) {
              s = o;
              break;
            }
          }
        }

        switch (s) {
          case "Visual":
            n.add("vmhd").set("graphicsmode", 0).set("opcolor", [0, 0, 0]), a.set("width", t.width).set("height", t.height).set("horizresolution", 72 << 16).set("vertresolution", 72 << 16).set("frame_count", 1).set("compressorname", t.type + " Compressor").set("depth", 24);
            break;

          case "Audio":
            n.add("smhd").set("balance", t.balance || 0), a.set("channel_count", t.channel_count || 2).set("samplesize", t.samplesize || 16).set("samplerate", t.samplerate || 65536);
            break;

          case "Hint":
            n.add("hmhd");
            break;

          case "Subtitle":
            switch (n.add("sthd"), t.type) {
              case "stpp":
                a.set("namespace", t.namespace || "nonamespace").set("schema_location", t.schema_location || "").set("auxiliary_mime_types", t.auxiliary_mime_types || "");
            }

            break;

          case "Metadata":
          case "System":
          default:
            n.add("nmhd");
        }

        t.description && a.addBox(t.description), t.description_boxes && t.description_boxes.forEach(function (e) {
          a.addBox(e);
        }), n.add("dinf").add("dref").addEntry(new d["url Box"]().set("flags", 1));
        var u = n.add("stbl");
        return u.add("stsd").addEntry(a), u.add("stts").set("sample_counts", []).set("sample_deltas", []), u.add("stsc").set("first_chunk", []).set("samples_per_chunk", []).set("sample_description_index", []), u.add("stco").set("chunk_offsets", []), u.add("stsz").set("sample_sizes", []), this.moov.mvex.add("trex").set("track_id", t.id).set("default_sample_description_index", t.default_sample_description_index || 1).set("default_sample_duration", t.default_sample_duration || 0).set("default_sample_size", t.default_sample_size || 0).set("default_sample_flags", t.default_sample_flags || 0), this.buildTrakSampleLists(i), t.id;
      }
    }, d.Box.prototype.computeSize = function (e) {
      var t = e || new o();
      t.endianness = o.BIG_ENDIAN, this.write(t);
    }, m.prototype.addSample = function (e, t, i) {
      var r = i || {},
          n = {},
          a = this.getTrackById(e);

      if (null !== a) {
        n.number = a.samples.length, n.track_id = a.tkhd.track_id, n.timescale = a.mdia.mdhd.timescale, n.description_index = r.sample_description_index ? r.sample_description_index - 1 : 0, n.description = a.mdia.minf.stbl.stsd.entries[n.description_index], n.data = t, n.size = t.length, n.alreadyRead = n.size, n.duration = r.duration || 1, n.cts = r.cts || 0, n.dts = r.dts || 0, n.is_sync = r.is_sync || !1, n.is_leading = r.is_leading || 0, n.depends_on = r.depends_on || 0, n.is_depended_on = r.is_depended_on || 0, n.has_redundancy = r.has_redundancy || 0, n.degradation_priority = r.degradation_priority || 0, n.offset = 0, n.subsamples = r.subsamples, a.samples.push(n), a.samples_size += n.size, a.samples_duration += n.duration, this.processSamples();
        var s = m.createSingleSampleMoof(n);
        return this.addBox(s), s.computeSize(), s.trafs[0].truns[0].data_offset = s.size + 8, this.add("mdat").data = t, n;
      }
    }, m.createSingleSampleMoof = function (e) {
      var t = new d.moofBox();
      t.add("mfhd").set("sequence_number", this.nextMoofNumber), this.nextMoofNumber++;
      var i = t.add("traf");
      return i.add("tfhd").set("track_id", e.track_id).set("flags", d.TFHD_FLAG_DEFAULT_BASE_IS_MOOF), i.add("tfdt").set("baseMediaDecodeTime", e.dts), i.add("trun").set("flags", d.TRUN_FLAGS_DATA_OFFSET | d.TRUN_FLAGS_DURATION | d.TRUN_FLAGS_SIZE | d.TRUN_FLAGS_FLAGS | d.TRUN_FLAGS_CTS_OFFSET).set("data_offset", 0).set("first_sample_flags", 0).set("sample_count", 1).set("sample_duration", [e.duration]).set("sample_size", [e.size]).set("sample_flags", [0]).set("sample_composition_time_offset", [e.cts - e.dts]), t;
    }, m.prototype.lastMoofIndex = 0, m.prototype.samplesDataSize = 0, m.prototype.resetTables = function () {
      var e, t, i, r, n, a;

      for (this.initial_duration = this.moov.mvhd.duration, this.moov.mvhd.duration = 0, e = 0; e < this.moov.traks.length; e++) {
        (t = this.moov.traks[e]).tkhd.duration = 0, t.mdia.mdhd.duration = 0, (t.mdia.minf.stbl.stco || t.mdia.minf.stbl.co64).chunk_offsets = [], (i = t.mdia.minf.stbl.stsc).first_chunk = [], i.samples_per_chunk = [], i.sample_description_index = [], (t.mdia.minf.stbl.stsz || t.mdia.minf.stbl.stz2).sample_sizes = [], (r = t.mdia.minf.stbl.stts).sample_counts = [], r.sample_deltas = [], (n = t.mdia.minf.stbl.ctts) && (n.sample_counts = [], n.sample_offsets = []), a = t.mdia.minf.stbl.stss;
        var s = t.mdia.minf.stbl.boxes.indexOf(a);
        -1 != s && (t.mdia.minf.stbl.boxes[s] = null);
      }
    }, m.initSampleGroups = function (e, t, i, r, n) {
      var a, s, o, l;

      function h(e, t, i) {
        this.grouping_type = e, this.grouping_type_parameter = t, this.sbgp = i, this.last_sample_in_run = -1, this.entry_index = -1;
      }

      for (t && (t.sample_groups_info = []), e.sample_groups_info || (e.sample_groups_info = []), s = 0; s < i.length; s++) {
        for (l = i[s].grouping_type + "/" + i[s].grouping_type_parameter, o = new h(i[s].grouping_type, i[s].grouping_type_parameter, i[s]), t && (t.sample_groups_info[l] = o), e.sample_groups_info[l] || (e.sample_groups_info[l] = o), a = 0; a < r.length; a++) {
          r[a].grouping_type === i[s].grouping_type && (o.description = r[a], o.description.used = !0);
        }

        if (n) for (a = 0; a < n.length; a++) {
          n[a].grouping_type === i[s].grouping_type && (o.fragment_description = n[a], o.fragment_description.used = !0, o.is_fragment = !0);
        }
      }

      if (t) {
        if (n) for (s = 0; s < n.length; s++) {
          !n[s].used && n[s].version >= 2 && (l = n[s].grouping_type + "/0", (o = new h(n[s].grouping_type, 0)).is_fragment = !0, t.sample_groups_info[l] || (t.sample_groups_info[l] = o));
        }
      } else for (s = 0; s < r.length; s++) {
        !r[s].used && r[s].version >= 2 && (l = r[s].grouping_type + "/0", o = new h(r[s].grouping_type, 0), e.sample_groups_info[l] || (e.sample_groups_info[l] = o));
      }
    }, m.setSampleGroupProperties = function (e, t, i, r) {
      var n, a;

      for (n in t.sample_groups = [], r) {
        var s;
        if (t.sample_groups[n] = {}, t.sample_groups[n].grouping_type = r[n].grouping_type, t.sample_groups[n].grouping_type_parameter = r[n].grouping_type_parameter, i >= r[n].last_sample_in_run && (r[n].last_sample_in_run < 0 && (r[n].last_sample_in_run = 0), r[n].entry_index++, r[n].entry_index <= r[n].sbgp.entries.length - 1 && (r[n].last_sample_in_run += r[n].sbgp.entries[r[n].entry_index].sample_count)), r[n].entry_index <= r[n].sbgp.entries.length - 1 ? t.sample_groups[n].group_description_index = r[n].sbgp.entries[r[n].entry_index].group_description_index : t.sample_groups[n].group_description_index = -1, 0 !== t.sample_groups[n].group_description_index) s = r[n].fragment_description ? r[n].fragment_description : r[n].description, t.sample_groups[n].group_description_index > 0 ? (a = t.sample_groups[n].group_description_index > 65535 ? (t.sample_groups[n].group_description_index >> 16) - 1 : t.sample_groups[n].group_description_index - 1, s && a >= 0 && (t.sample_groups[n].description = s.entries[a])) : s && s.version >= 2 && s.default_group_description_index > 0 && (t.sample_groups[n].description = s.entries[s.default_group_description_index - 1]);
      }
    }, m.process_sdtp = function (e, t, i) {
      t && (e ? (t.is_leading = e.is_leading[i], t.depends_on = e.sample_depends_on[i], t.is_depended_on = e.sample_is_depended_on[i], t.has_redundancy = e.sample_has_redundancy[i]) : (t.is_leading = 0, t.depends_on = 0, t.is_depended_on = 0, t.has_redundancy = 0));
    }, m.prototype.buildSampleLists = function () {
      var e, t;

      for (e = 0; e < this.moov.traks.length; e++) {
        t = this.moov.traks[e], this.buildTrakSampleLists(t);
      }
    }, m.prototype.buildTrakSampleLists = function (e) {
      var t, i, r, n, a, s, o, l, h, u, d, f, c, p, _, y, g, v, b, S, E, A, P, w;

      if (e.samples = [], e.samples_duration = 0, e.samples_size = 0, i = e.mdia.minf.stbl.stco || e.mdia.minf.stbl.co64, r = e.mdia.minf.stbl.stsc, n = e.mdia.minf.stbl.stsz || e.mdia.minf.stbl.stz2, a = e.mdia.minf.stbl.stts, s = e.mdia.minf.stbl.ctts, o = e.mdia.minf.stbl.stss, l = e.mdia.minf.stbl.stsd, h = e.mdia.minf.stbl.subs, f = e.mdia.minf.stbl.stdp, u = e.mdia.minf.stbl.sbgps, d = e.mdia.minf.stbl.sgpds, v = -1, b = -1, S = -1, E = -1, A = 0, P = 0, w = 0, m.initSampleGroups(e, null, u, d), void 0 !== n) {
        for (t = 0; t < n.sample_sizes.length; t++) {
          var x = {};
          x.number = t, x.track_id = e.tkhd.track_id, x.timescale = e.mdia.mdhd.timescale, x.alreadyRead = 0, e.samples[t] = x, x.size = n.sample_sizes[t], e.samples_size += x.size, 0 === t ? (p = 1, c = 0, x.chunk_index = p, x.chunk_run_index = c, g = r.samples_per_chunk[c], y = 0, _ = c + 1 < r.first_chunk.length ? r.first_chunk[c + 1] - 1 : 1 / 0) : t < g ? (x.chunk_index = p, x.chunk_run_index = c) : (p++, x.chunk_index = p, y = 0, p <= _ || (_ = ++c + 1 < r.first_chunk.length ? r.first_chunk[c + 1] - 1 : 1 / 0), x.chunk_run_index = c, g += r.samples_per_chunk[c]), x.description_index = r.sample_description_index[x.chunk_run_index] - 1, x.description = l.entries[x.description_index], x.offset = i.chunk_offsets[x.chunk_index - 1] + y, y += x.size, t > v && (b++, v < 0 && (v = 0), v += a.sample_counts[b]), t > 0 ? (e.samples[t - 1].duration = a.sample_deltas[b], e.samples_duration += e.samples[t - 1].duration, x.dts = e.samples[t - 1].dts + e.samples[t - 1].duration) : x.dts = 0, s ? (t >= S && (E++, S < 0 && (S = 0), S += s.sample_counts[E]), x.cts = e.samples[t].dts + s.sample_offsets[E]) : x.cts = x.dts, o ? (t == o.sample_numbers[A] - 1 ? (x.is_sync = !0, A++) : (x.is_sync = !1, x.degradation_priority = 0), h && h.entries[P].sample_delta + w == t + 1 && (x.subsamples = h.entries[P].subsamples, w += h.entries[P].sample_delta, P++)) : x.is_sync = !0, m.process_sdtp(e.mdia.minf.stbl.sdtp, x, x.number), x.degradation_priority = f ? f.priority[t] : 0, h && h.entries[P].sample_delta + w == t && (x.subsamples = h.entries[P].subsamples, w += h.entries[P].sample_delta), (u.length > 0 || d.length > 0) && m.setSampleGroupProperties(e, x, t, e.sample_groups_info);
        }

        t > 0 && (e.samples[t - 1].duration = Math.max(e.mdia.mdhd.duration - e.samples[t - 1].dts, 0), e.samples_duration += e.samples[t - 1].duration);
      }
    }, m.prototype.updateSampleLists = function () {
      var e, t, i, r, n, a, s, o, l, h, u, f, c, p, _;

      if (void 0 !== this.moov) for (; this.lastMoofIndex < this.moofs.length;) {
        if (l = this.moofs[this.lastMoofIndex], this.lastMoofIndex++, "moof" == l.type) for (h = l, e = 0; e < h.trafs.length; e++) {
          for (u = h.trafs[e], f = this.getTrackById(u.tfhd.track_id), c = this.getTrexById(u.tfhd.track_id), r = u.tfhd.flags & d.TFHD_FLAG_SAMPLE_DESC ? u.tfhd.default_sample_description_index : c ? c.default_sample_description_index : 1, n = u.tfhd.flags & d.TFHD_FLAG_SAMPLE_DUR ? u.tfhd.default_sample_duration : c ? c.default_sample_duration : 0, a = u.tfhd.flags & d.TFHD_FLAG_SAMPLE_SIZE ? u.tfhd.default_sample_size : c ? c.default_sample_size : 0, s = u.tfhd.flags & d.TFHD_FLAG_SAMPLE_FLAGS ? u.tfhd.default_sample_flags : c ? c.default_sample_flags : 0, u.sample_number = 0, u.sbgps.length > 0 && m.initSampleGroups(f, u, u.sbgps, f.mdia.minf.stbl.sgpds, u.sgpds), t = 0; t < u.truns.length; t++) {
            var y = u.truns[t];

            for (i = 0; i < y.sample_count; i++) {
              (p = {}).moof_number = this.lastMoofIndex, p.number_in_traf = u.sample_number, u.sample_number++, p.number = f.samples.length, u.first_sample_index = f.samples.length, f.samples.push(p), p.track_id = f.tkhd.track_id, p.timescale = f.mdia.mdhd.timescale, p.description_index = r - 1, p.description = f.mdia.minf.stbl.stsd.entries[p.description_index], p.size = a, y.flags & d.TRUN_FLAGS_SIZE && (p.size = y.sample_size[i]), f.samples_size += p.size, p.duration = n, y.flags & d.TRUN_FLAGS_DURATION && (p.duration = y.sample_duration[i]), f.samples_duration += p.duration, f.first_traf_merged || i > 0 ? p.dts = f.samples[f.samples.length - 2].dts + f.samples[f.samples.length - 2].duration : (u.tfdt ? p.dts = u.tfdt.baseMediaDecodeTime : p.dts = 0, f.first_traf_merged = !0), p.cts = p.dts, y.flags & d.TRUN_FLAGS_CTS_OFFSET && (p.cts = p.dts + y.sample_composition_time_offset[i]), _ = s, y.flags & d.TRUN_FLAGS_FLAGS ? _ = y.sample_flags[i] : 0 === i && y.flags & d.TRUN_FLAGS_FIRST_FLAG && (_ = y.first_sample_flags), p.is_sync = !(_ >> 16 & 1), p.is_leading = _ >> 26 & 3, p.depends_on = _ >> 24 & 3, p.is_depended_on = _ >> 22 & 3, p.has_redundancy = _ >> 20 & 3, p.degradation_priority = 65535 & _;
              var g = !!(u.tfhd.flags & d.TFHD_FLAG_BASE_DATA_OFFSET),
                  v = !!(u.tfhd.flags & d.TFHD_FLAG_DEFAULT_BASE_IS_MOOF),
                  b = !!(y.flags & d.TRUN_FLAGS_DATA_OFFSET),
                  S = 0;
              S = g ? u.tfhd.base_data_offset : v || 0 === t ? h.start : o, p.offset = 0 === t && 0 === i ? b ? S + y.data_offset : S : o, o = p.offset + p.size, (u.sbgps.length > 0 || u.sgpds.length > 0 || f.mdia.minf.stbl.sbgps.length > 0 || f.mdia.minf.stbl.sgpds.length > 0) && m.setSampleGroupProperties(f, p, p.number_in_traf, u.sample_groups_info);
            }
          }

          if (u.subs) {
            f.has_fragment_subsamples = !0;
            var E = u.first_sample_index;

            for (t = 0; t < u.subs.entries.length; t++) {
              E += u.subs.entries[t].sample_delta, (p = f.samples[E - 1]).subsamples = u.subs.entries[t].subsamples;
            }
          }
        }
      }
    }, m.prototype.getSample = function (e, t) {
      var i,
          r = e.samples[t];
      if (!this.moov) return null;

      if (r.data) {
        if (r.alreadyRead == r.size) return r;
      } else r.data = new Uint8Array(r.size), r.alreadyRead = 0, this.samplesDataSize += r.size, a.debug("ISOFile", "Allocating sample #" + t + " on track #" + e.tkhd.track_id + " of size " + r.size + " (total: " + this.samplesDataSize + ")");

      for (;;) {
        var n = this.stream.findPosition(!0, r.offset + r.alreadyRead, !1);
        if (!(n > -1)) return null;
        var s = (i = this.stream.buffers[n]).byteLength - (r.offset + r.alreadyRead - i.fileStart);
        if (r.size - r.alreadyRead <= s) return a.debug("ISOFile", "Getting sample #" + t + " data (alreadyRead: " + r.alreadyRead + " offset: " + (r.offset + r.alreadyRead - i.fileStart) + " read size: " + (r.size - r.alreadyRead) + " full size: " + r.size + ")"), o.memcpy(r.data.buffer, r.alreadyRead, i, r.offset + r.alreadyRead - i.fileStart, r.size - r.alreadyRead), i.usedBytes += r.size - r.alreadyRead, this.stream.logBufferLevel(), r.alreadyRead = r.size, r;
        if (0 === s) return null;
        a.debug("ISOFile", "Getting sample #" + t + " partial data (alreadyRead: " + r.alreadyRead + " offset: " + (r.offset + r.alreadyRead - i.fileStart) + " read size: " + s + " full size: " + r.size + ")"), o.memcpy(r.data.buffer, r.alreadyRead, i, r.offset + r.alreadyRead - i.fileStart, s), r.alreadyRead += s, i.usedBytes += s, this.stream.logBufferLevel();
      }
    }, m.prototype.releaseSample = function (e, t) {
      var i = e.samples[t];
      return i.data ? (this.samplesDataSize -= i.size, i.data = null, i.alreadyRead = 0, i.size) : 0;
    }, m.prototype.getAllocatedSampleDataSize = function () {
      return this.samplesDataSize;
    }, m.prototype.getCodecs = function () {
      var e,
          t = "";

      for (e = 0; e < this.moov.traks.length; e++) {
        e > 0 && (t += ","), t += this.moov.traks[e].mdia.minf.stbl.stsd.entries[0].getCodec();
      }

      return t;
    }, m.prototype.getTrexById = function (e) {
      var t;
      if (!this.moov || !this.moov.mvex) return null;

      for (t = 0; t < this.moov.mvex.trexs.length; t++) {
        var i = this.moov.mvex.trexs[t];
        if (i.track_id == e) return i;
      }

      return null;
    }, m.prototype.getTrackById = function (e) {
      if (void 0 === this.moov) return null;

      for (var t = 0; t < this.moov.traks.length; t++) {
        var i = this.moov.traks[t];
        if (i.tkhd.track_id == e) return i;
      }

      return null;
    }, m.prototype.items = [], m.prototype.itemsDataSize = 0, m.prototype.flattenItemInfo = function () {
      var e,
          t,
          i,
          r = this.items,
          n = this.meta;

      if (null != n && void 0 !== n.hdlr && void 0 !== n.iinf) {
        for (e = 0; e < n.iinf.item_infos.length; e++) {
          (i = {}).id = n.iinf.item_infos[e].item_ID, r[i.id] = i, i.ref_to = [], i.name = n.iinf.item_infos[e].item_name, n.iinf.item_infos[e].protection_index > 0 && (i.protection = n.ipro.protections[n.iinf.item_infos[e].protection_index - 1]), n.iinf.item_infos[e].item_type ? i.type = n.iinf.item_infos[e].item_type : i.type = "mime", i.content_type = n.iinf.item_infos[e].content_type, i.content_encoding = n.iinf.item_infos[e].content_encoding;
        }

        if (n.iloc) for (e = 0; e < n.iloc.items.length; e++) {
          var s = n.iloc.items[e];

          switch (i = r[s.item_ID], 0 !== s.data_reference_index && (a.warn("Item storage with reference to other files: not supported"), i.source = n.dinf.boxes[s.data_reference_index - 1]), s.construction_method) {
            case 0:
              break;

            case 1:
            case 2:
              a.warn("Item storage with construction_method : not supported");
          }

          for (i.extents = [], i.size = 0, t = 0; t < s.extents.length; t++) {
            i.extents[t] = {}, i.extents[t].offset = s.extents[t].extent_offset + s.base_offset, i.extents[t].length = s.extents[t].extent_length, i.extents[t].alreadyRead = 0, i.size += i.extents[t].length;
          }
        }
        if (n.pitm && (r[n.pitm.item_id].primary = !0), n.iref) for (e = 0; e < n.iref.references.length; e++) {
          var o = n.iref.references[e];

          for (t = 0; t < o.references.length; t++) {
            r[o.from_item_ID].ref_to.push({
              type: o.type,
              id: o.references[t]
            });
          }
        }
        if (n.iprp) for (var l = 0; l < n.iprp.ipmas.length; l++) {
          var h = n.iprp.ipmas[l];

          for (e = 0; e < h.associations.length; e++) {
            var u = h.associations[e];

            for (void 0 === (i = r[u.id]).properties && (i.properties = {}, i.properties.boxes = []), t = 0; t < u.props.length; t++) {
              var d = u.props[t];

              if (d.property_index > 0) {
                var f = n.iprp.ipco.boxes[d.property_index - 1];
                i.properties[f.type] = f, i.properties.boxes.push(f);
              }
            }
          }
        }
      }
    }, m.prototype.getItem = function (e) {
      var t, i;
      if (!this.meta) return null;
      if (!(i = this.items[e]).data && i.size) i.data = new Uint8Array(i.size), i.alreadyRead = 0, this.itemsDataSize += i.size, a.debug("ISOFile", "Allocating item #" + e + " of size " + i.size + " (total: " + this.itemsDataSize + ")");else if (i.alreadyRead === i.size) return i;

      for (var r = 0; r < i.extents.length; r++) {
        var n = i.extents[r];

        if (n.alreadyRead !== n.length) {
          var s = this.stream.findPosition(!0, n.offset + n.alreadyRead, !1);
          if (!(s > -1)) return null;
          var l = (t = this.stream.buffers[s]).byteLength - (n.offset + n.alreadyRead - t.fileStart);
          if (!(n.length - n.alreadyRead <= l)) return a.debug("ISOFile", "Getting item #" + e + " extent #" + r + " partial data (alreadyRead: " + n.alreadyRead + " offset: " + (n.offset + n.alreadyRead - t.fileStart) + " read size: " + l + " full extent size: " + n.length + " full item size: " + i.size + ")"), o.memcpy(i.data.buffer, i.alreadyRead, t, n.offset + n.alreadyRead - t.fileStart, l), n.alreadyRead += l, i.alreadyRead += l, t.usedBytes += l, this.stream.logBufferLevel(), null;
          a.debug("ISOFile", "Getting item #" + e + " extent #" + r + " data (alreadyRead: " + n.alreadyRead + " offset: " + (n.offset + n.alreadyRead - t.fileStart) + " read size: " + (n.length - n.alreadyRead) + " full extent size: " + n.length + " full item size: " + i.size + ")"), o.memcpy(i.data.buffer, i.alreadyRead, t, n.offset + n.alreadyRead - t.fileStart, n.length - n.alreadyRead), t.usedBytes += n.length - n.alreadyRead, this.stream.logBufferLevel(), i.alreadyRead += n.length - n.alreadyRead, n.alreadyRead = n.length;
        }
      }

      return i.alreadyRead === i.size ? i : null;
    }, m.prototype.releaseItem = function (e) {
      var t = this.items[e];

      if (t.data) {
        this.itemsDataSize -= t.size, t.data = null, t.alreadyRead = 0;

        for (var i = 0; i < t.extents.length; i++) {
          t.extents[i].alreadyRead = 0;
        }

        return t.size;
      }

      return 0;
    }, m.prototype.processItems = function (e) {
      for (var t in this.items) {
        var i = this.items[t];
        this.getItem(i.id), e && !i.sent && (e(i), i.sent = !0, i.data = null);
      }
    }, m.prototype.hasItem = function (e) {
      for (var t in this.items) {
        var i = this.items[t];
        if (i.name === e) return i.id;
      }

      return -1;
    }, m.prototype.getMetaHandler = function () {
      return this.meta ? this.meta.hdlr.handler : null;
    }, m.prototype.getPrimaryItem = function () {
      return this.meta && this.meta.pitm ? this.getItem(this.meta.pitm.item_id) : null;
    }, m.prototype.itemToFragmentedTrackFile = function (e) {
      var t = e || {},
          i = null;
      if (null == (i = t.itemId ? this.getItem(t.itemId) : this.getPrimaryItem())) return null;
      var r = new m();
      r.discardMdatData = !1;
      var n = {
        type: i.type,
        description_boxes: i.properties.boxes
      };
      i.properties.ispe && (n.width = i.properties.ispe.image_width, n.height = i.properties.ispe.image_height);
      var a = r.addTrack(n);
      return a ? (r.addSample(a, i.data), r) : null;
    }, m.prototype.write = function (e) {
      for (var t = 0; t < this.boxes.length; t++) {
        this.boxes[t].write(e);
      }
    }, m.prototype.createFragment = function (e, t, i) {
      var r = this.getTrackById(e),
          n = this.getSample(r, t);
      if (null == n) return n = r.samples[t], this.nextSeekPosition ? this.nextSeekPosition = Math.min(n.offset + n.alreadyRead, this.nextSeekPosition) : this.nextSeekPosition = r.samples[t].offset + n.alreadyRead, null;
      var s = i || new o();
      s.endianness = o.BIG_ENDIAN;
      var l = m.createSingleSampleMoof(n);
      l.write(s), l.trafs[0].truns[0].data_offset = l.size + 8, a.debug("MP4Box", "Adjusting data_offset with new value " + l.trafs[0].truns[0].data_offset), s.adjustUint32(l.trafs[0].truns[0].data_offset_position, l.trafs[0].truns[0].data_offset);
      var h = new d.mdatBox();
      return h.data = n.data, h.write(s), s;
    }, m.writeInitializationSegment = function (e, t, i, r) {
      var n;
      a.debug("ISOFile", "Generating initialization segment");
      var s = new o();
      s.endianness = o.BIG_ENDIAN, e.write(s);
      var l = t.add("mvex");

      for (i && l.add("mehd").set("fragment_duration", i), n = 0; n < t.traks.length; n++) {
        l.add("trex").set("track_id", t.traks[n].tkhd.track_id).set("default_sample_description_index", 1).set("default_sample_duration", r).set("default_sample_size", 0).set("default_sample_flags", 65536);
      }

      return t.write(s), s.buffer;
    }, m.prototype.save = function (e) {
      var t = new o();
      t.endianness = o.BIG_ENDIAN, this.write(t), t.save(e);
    }, m.prototype.getBuffer = function () {
      var e = new o();
      return e.endianness = o.BIG_ENDIAN, this.write(e), e.buffer;
    }, m.prototype.initializeSegmentation = function () {
      var e, t, i, r;

      for (null === this.onSegment && a.warn("MP4Box", "No segmentation callback set!"), this.isFragmentationInitialized || (this.isFragmentationInitialized = !0, this.nextMoofNumber = 0, this.resetTables()), t = [], e = 0; e < this.fragmentedTracks.length; e++) {
        var n = new d.moovBox();
        n.mvhd = this.moov.mvhd, n.boxes.push(n.mvhd), i = this.getTrackById(this.fragmentedTracks[e].id), n.boxes.push(i), n.traks.push(i), (r = {}).id = i.tkhd.track_id, r.user = this.fragmentedTracks[e].user, r.buffer = m.writeInitializationSegment(this.ftyp, n, this.moov.mvex && this.moov.mvex.mehd ? this.moov.mvex.mehd.fragment_duration : void 0, this.moov.traks[e].samples.length > 0 ? this.moov.traks[e].samples[0].duration : 0), t.push(r);
      }

      return t;
    }, d.Box.prototype.printHeader = function (e) {
      this.size += 8, this.size > l && (this.size += 8), "uuid" === this.type && (this.size += 16), e.log(e.indent + "size:" + this.size), e.log(e.indent + "type:" + this.type);
    }, d.FullBox.prototype.printHeader = function (e) {
      this.size += 4, d.Box.prototype.printHeader.call(this, e), e.log(e.indent + "version:" + this.version), e.log(e.indent + "flags:" + this.flags);
    }, d.Box.prototype.print = function (e) {
      this.printHeader(e);
    }, d.ContainerBox.prototype.print = function (e) {
      this.printHeader(e);

      for (var t = 0; t < this.boxes.length; t++) {
        if (this.boxes[t]) {
          var i = e.indent;
          e.indent += " ", this.boxes[t].print(e), e.indent = i;
        }
      }
    }, m.prototype.print = function (e) {
      e.indent = "";

      for (var t = 0; t < this.boxes.length; t++) {
        this.boxes[t] && this.boxes[t].print(e);
      }
    }, d.mvhdBox.prototype.print = function (e) {
      d.FullBox.prototype.printHeader.call(this, e), e.log(e.indent + "creation_time: " + this.creation_time), e.log(e.indent + "modification_time: " + this.modification_time), e.log(e.indent + "timescale: " + this.timescale), e.log(e.indent + "duration: " + this.duration), e.log(e.indent + "rate: " + this.rate), e.log(e.indent + "volume: " + (this.volume >> 8)), e.log(e.indent + "matrix: " + this.matrix.join(", ")), e.log(e.indent + "next_track_id: " + this.next_track_id);
    }, d.tkhdBox.prototype.print = function (e) {
      d.FullBox.prototype.printHeader.call(this, e), e.log(e.indent + "creation_time: " + this.creation_time), e.log(e.indent + "modification_time: " + this.modification_time), e.log(e.indent + "track_id: " + this.track_id), e.log(e.indent + "duration: " + this.duration), e.log(e.indent + "volume: " + (this.volume >> 8)), e.log(e.indent + "matrix: " + this.matrix.join(", ")), e.log(e.indent + "layer: " + this.layer), e.log(e.indent + "alternate_group: " + this.alternate_group), e.log(e.indent + "width: " + this.width), e.log(e.indent + "height: " + this.height);
    };
    var _ = {
      createFile: function createFile(e, t) {
        var i = void 0 === e || e,
            r = new m(t);
        return r.discardMdatData = !i, r;
      }
    };
    void 0 !== i && (i.createFile = _.createFile);
  }, {}],
  2: [function (e, t, i) {
    "use strict";

    t.exports = {
      DEFAILT_WEBGL_PLAY_ID: "glplayer",
      PLAYER_IN_TYPE_MP4: "mp4",
      PLAYER_IN_TYPE_FLV: "flv",
      PLAYER_IN_TYPE_HTTPFLV: "httpflv",
      PLAYER_IN_TYPE_RAW_265: "raw265",
      PLAYER_IN_TYPE_TS: "ts",
      PLAYER_IN_TYPE_MPEGTS: "mpegts",
      PLAYER_IN_TYPE_M3U8: "hls",
      PLAYER_IN_TYPE_M3U8_VOD: "m3u8",
      PLAYER_IN_TYPE_M3U8_LIVE: "hls",
      APPEND_TYPE_STREAM: 0,
      APPEND_TYPE_FRAME: 1,
      APPEND_TYPE_SEQUENCE: 2,
      DEFAULT_WIDTH: 600,
      DEFAULT_HEIGHT: 600,
      DEFAULT_FPS: 30,
      DEFAULT_FRAME_DUR: 40,
      DEFAULT_FIXED: !1,
      DEFAULT_SAMPLERATE: 44100,
      DEFAULT_CHANNELS: 2,
      DEFAULT_CONSU_SAMPLE_LEN: 20,
      PLAYER_MODE_VOD: "vod",
      PLAYER_MODE_NOTIME_LIVE: "live",
      AUDIO_MODE_ONCE: "ONCE",
      AUDIO_MODE_SWAP: "SWAP",
      DEFAULT_STRING_LIVE: "LIVE",
      CODEC_H265: 0,
      CODEC_H264: 1,
      PLAYER_CORE_TYPE_DEFAULT: 0,
      PLAYER_CORE_TYPE_CNATIVE: 1,
      V_CODEC_NAME_HEVC: 265,
      V_CODEC_NAME_AVC: 264,
      V_CODEC_NAME_UNKN: 500,
      A_CODEC_NAME_AAC: 112,
      A_CODEC_NAME_MP3: 113,
      A_CODEC_NAME_UNKN: 500,
      CACHE_NO_LOADCACHE: 192,
      CACHE_WITH_PLAY_SIGN: 193,
      CACHE_WITH_NOPLAY_SIGN: 194
    };
  }, {}],
  3: [function (e, t, i) {
    "use strict";

    var r = window.AudioContext || window.webkitAudioContext,
        n = e("../consts"),
        a = e("./av-common");

    t.exports = function (e) {
      var t = {
        options: {
          sampleRate: e.sampleRate || n.DEFAULT_SAMPLERATE,
          appendType: e.appendType || n.APPEND_TYPE_STREAM,
          playMode: e.playMode || n.AUDIO_MODE_SWAP
        },
        sourceChannel: -1,
        audioCtx: new r({
          latencyHint: "interactive",
          sampleRate: e.sampleRate
        }),
        gainNode: null,
        sourceList: [],
        startStatus: !1,
        sampleQueue: [],
        nextBuffer: null,
        playTimestamp: 0,
        playStartTime: 0,
        durationMs: -1,
        isLIVE: !1,
        voice: 1,
        onLoadCache: null,
        resetStartParam: function resetStartParam() {
          t.playTimestamp = 0, t.playStartTime = 0;
        },
        setOnLoadCache: function setOnLoadCache(e) {
          t.onLoadCache = e;
        },
        setDurationMs: function setDurationMs() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : -1;
          t.durationMs = e;
        },
        setVoice: function setVoice() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
          t.voice = e, t.gainNode.gain.value = e;
        },
        getAlignVPTS: function getAlignVPTS() {
          return t.playTimestamp + (a.GetMsTime() - t.playStartTime) / 1e3;
        },
        swapSource: function swapSource() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : -1,
              i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : -1;
          if (0 == t.startStatus) return null;
          if (e < 0 || e >= t.sourceList.length) return null;
          if (i < 0 || i >= t.sourceList.length) return null;

          try {
            t.sourceChannel === e && null !== t.sourceList[e] && (t.sourceList[e].disconnect(t.gainNode), t.sourceList[e] = null);
          } catch (t) {
            console.error("[DEFINE ERROR] audioModule disconnect source Index:" + e + " error happened!", t);
          }

          t.sourceChannel = i;
          var r = t.decodeSample(i, e);
          -2 == r && t.isLIVE && (t.getAlignVPTS() >= t.durationMs / 1e3 - .04 ? t.pause() : null !== t.onLoadCache && t.onLoadCache());
        },
        addSample: function addSample() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
          return !(null == e || !e || null == e) && (0 == t.sampleQueue.length && (t.seekPos = e.pts), t.sampleQueue.push(e), !0);
        },
        runNextBuffer: function runNextBuffer() {
          window.setInterval(function () {
            if (!(null != t.nextBuffer || t.sampleQueue.length < n.DEFAULT_CONSU_SAMPLE_LEN)) {
              t.nextBuffer = {
                data: null,
                pts: -1
              };

              for (var e = null, i = 0; i < n.DEFAULT_CONSU_SAMPLE_LEN; i++) {
                e = t.sampleQueue.shift();
                var r = null;
                if (r = t.options.appendType == n.APPEND_TYPE_STREAM ? e : e.data, t.nextBuffer.pts < 0 && (t.nextBuffer.pts = e.pts), null == t.nextBuffer.data) t.nextBuffer.data = new Uint8Array(r);else {
                  var a = new Uint8Array(r.length + t.nextBuffer.data.length);
                  a.set(t.nextBuffer.data, 0), a.set(r, t.nextBuffer.data.length), t.nextBuffer.data = a;
                }
                if (t.sampleQueue.length <= 0) break;
                e = null;
              }
            }
          }, 10);
        },
        decodeSample: function decodeSample() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : -1,
              i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : -1;
          if (e < 0 || e >= t.sourceList.length) return -1;
          if (null != t.sourceList[e] && null != t.sourceList[e] && t.sourceList[e] || (t.sourceList[e] = t.audioCtx.createBufferSource(), t.sourceList[e].onended = function () {
            t.swapSource(e, i);
          }), 0 == t.sampleQueue.length) return t.isLIVE ? (t.sourceList[e].connect(t.gainNode), t.sourceList[e].start(), t.sourceList[e].onended = function () {
            t.swapSource(e, i);
          }, t.sourceList[e].stop(), 0) : -2;
          if (t.sourceList[e].buffer) return t.sourceList[e], t.sourceList[i], t.gainNode, t.swapSource(e, i), 0;
          if (null == t.nextBuffer || t.nextBuffer.data.length < 1) return t.sourceList[e].connect(t.gainNode), t.sourceList[e].start(), t.sourceList[e].startState = !0, t.sourceList[e].stop(), 1;
          var r = t.nextBuffer.data.buffer;
          t.playTimestamp = t.nextBuffer.pts, t.playStartTime = a.GetMsTime();

          try {
            t.audioCtx.decodeAudioData(r, function (i) {
              null !== t.sourceList[e] && (t.sourceList[e].buffer = i, t.sourceList[e].connect(t.gainNode), t.sourceList[e].start(), t.sourceList[e].startState = !0);
            }, function (e) {});
          } catch (e) {
            return t.nextBuffer = null, -3;
          }

          return t.nextBuffer = null, 0;
        },
        decodeWholeSamples: function decodeWholeSamples() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : -1;
          if (t.sourceChannel = e, e < 0 || e >= t.sourceList.length) return -1;
          if (null != t.sourceList[e] && null != t.sourceList[e] && t.sourceList[e] || (t.sourceList[e] = t.audioCtx.createBufferSource(), t.sourceList[e].onended = function () {}), 0 == t.sampleQueue.length) return -2;

          for (var i = null, r = null, a = 0; a < t.sampleQueue.length; a++) {
            r = t.sampleQueue.shift();
            var s = null;
            if (s = t.options.appendType == n.APPEND_TYPE_STREAM ? r : r.data, null == i) i = new Uint8Array(s);else {
              var o = new Uint8Array(s.length + i.length);
              o.set(i, 0), o.set(s, i.length), i = o;
            }
            if (t.sampleQueue.length <= 0) break;
            r = null;
          }

          var l = i;
          if (null == l || l.length < 1) return t.sourceList[e].connect(t.gainNode), t.sourceList[e].start(), t.sourceList[e].stop(), 1;
          var h = l.buffer;

          try {
            t.audioCtx.decodeAudioData(h, function (i) {
              t.sourceList[e].state, t.sourceList[e].buffer = i, t.sourceList[e].connect(t.gainNode), t.sourceList[e].start(), t.sourceList[e].startState = !0, t.sourceList[e].state;
            }, function (e) {
              e.err;
            });
          } catch (e) {
            return -3;
          }

          return 0;
        },
        play: function play() {
          if (0 == t.startStatus) {
            t.startStatus = !0;
            -2 == (t.options.playMode == n.AUDIO_MODE_ONCE ? t.decodeWholeSamples(0) : t.swapSource(0, 1)) && t.pause();
          }
        },
        pause: function pause() {
          t.startStatus = !1;

          for (var e = 0; e < t.sourceList.length; e++) {
            if (void 0 !== t.sourceList[e] && null !== t.sourceList[e]) {
              t.sourceList[e], t.gainNode;

              try {
                void 0 !== t.sourceList[e].buffer && null !== t.sourceList[e].buffer && (t.sourceList[e].stop(), t.sourceList[e].disconnect(t.gainNode)), t.sourceList[e] = null;
              } catch (e) {
                console.error("audio pause error ", e);
              }
            }
          }
        },
        stop: function stop() {
          t.pause(), t.cleanQueue(), t.nextBuffer = null, t.sourceChannel = -1;
        },
        cleanQueue: function cleanQueue() {
          t.sampleQueue.length = 0;

          for (var e = 0; e < t.sourceList.length; e++) {
            try {
              void 0 !== t.sourceList[e].buffer && null !== t.sourceList[e].buffer && (t.sourceList[e].stop(), t.sourceList[e].disconnect(t.gainNode)), t.sourceList[e] = null;
            } catch (e) {}
          }
        }
      };
      return t.sourceList.push(t.audioCtx.createBufferSource()), t.sourceList.push(t.audioCtx.createBufferSource()), t.sourceList[0].onended = function () {
        t.swapSource(0, 1);
      }, t.sourceList[1].onended = function () {
        t.swapSource(1, 0);
      }, t.gainNode = t.audioCtx.createGain(), t.gainNode.gain.value = t.voice, t.gainNode.connect(t.audioCtx.destination), t.options, t.runNextBuffer(), t;
    };
  }, {
    "../consts": 2,
    "./av-common": 5
  }],
  4: [function (e, t, i) {
    "use strict";

    function r(e, t) {
      for (var i = 0; i < t.length; i++) {
        var r = t[i];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
      }
    }

    var n = window.AudioContext || window.webkitAudioContext,
        a = e("../consts"),
        s = function s() {
      return new Date().getTime();
    },
        o = function () {
      function e(t) {
        !function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }(this, e), this._sample_rate = t.sampleRate || a.DEFAULT_SAMPLERATE, this._seg_dur = t.segDur || 2, this._channels = t.channels || a.DEFAULT_CHANNELS, this._swapStartPlay = !0, this._start_time = -1, this._now_seg_dur = -1, this._push_start_idx = 0, this._pcm_array_buf = null, this._once_pop_len = this._sample_rate * this._seg_dur, this._active_node = null, this._ctx = new n(), this._gain = this._ctx.createGain(), this._gain.gain.value = 1, this._gain.connect(this._ctx.destination);
      }

      var t, i, o;
      return t = e, (i = [{
        key: "setVoice",
        value: function value(e) {
          this._gain.gain.value = e;
        }
      }, {
        key: "pushBuffer",
        value: function value(e) {
          var t = e.buffer,
              i = null,
              r = t.byteLength % 4;

          if (0 !== r) {
            var n = new Uint8Array(t.byteLength + r);
            n.set(new Uint8Array(t), 0), i = new Float32Array(n.buffer);
          } else i = new Float32Array(t);

          var a = null;

          if (this._channels >= 2) {
            var s = i.length / 2;
            a = new Float32Array(s);

            for (var o = 0, l = 0; l < i.length; l += 2) {
              a[o] = i[l], o++;
            }
          } else a = new Float32Array(i);

          if (null === this._pcm_array_buf) this._pcm_array_buf = new Float32Array(a);else {
            var h = new Float32Array(this._pcm_array_buf.length + a.length);
            h.set(this._pcm_array_buf, 0), h.set(a, this._pcm_array_buf.length), this._pcm_array_buf = h;
          }
          this._pcm_array_buf.length;
        }
      }, {
        key: "readingLoopWithF32",
        value: function value() {
          if (this._start_time > 0 && s() - this._start_time >= this._now_seg_dur && (s(), this._start_time, this._now_seg_dur, this._start_time = -1, this._now_seg_dur = -1), s(), this._start_time < 0) if (new Date(), null !== this._pcm_array_buf && this._pcm_array_buf.length > this._push_start_idx) {
            this._swapStartPlay = !1;
            var e = this._push_start_idx + this._once_pop_len;
            e > this._pcm_array_buf.length && (e = this._pcm_array_buf.length);

            var t = this._pcm_array_buf.slice(this._push_start_idx, e);

            this._push_start_idx += t.length, this._now_seg_dur = 1 * t.length / this._sample_rate * 1e3, t.length, this._sample_rate, this._now_seg_dur;

            var i = this._ctx.createBuffer(1, t.length, this._sample_rate);

            t.length, new Date(), i.copyToChannel(t, 0), this._active_node = this._ctx.createBufferSource(), this._active_node.buffer = i, this._active_node.connect(this._gain), this._start_time = s(), this._active_node.start(0);
          } else setTimeout(this.readingLoopWithF32, 1);
        }
      }]) && r(t.prototype, i), o && r(t, o), e;
    }();

    i.AudioPcmPlayer = o;
  }, {
    "../consts": 2
  }],
  5: [function (e, t, i) {
    "use strict";

    var r = e("../consts"),
        n = [{
      format: "mp4",
      value: "mp4",
      core: r.PLAYER_CORE_TYPE_CNATIVE
    }, {
      format: "mov",
      value: "mp4",
      core: r.PLAYER_CORE_TYPE_CNATIVE
    }, {
      format: "flv",
      value: "flv",
      core: r.PLAYER_CORE_TYPE_CNATIVE
    }, {
      format: "m3u8",
      value: "hls",
      core: r.PLAYER_CORE_TYPE_DEFAULT
    }, {
      format: "m3u",
      value: "hls",
      core: r.PLAYER_CORE_TYPE_DEFAULT
    }, {
      format: "ts",
      value: "ts",
      core: r.PLAYER_CORE_TYPE_DEFAULT
    }, {
      format: "mpegts",
      value: "ts",
      core: r.PLAYER_CORE_TYPE_DEFAULT
    }, {
      format: "hevc",
      value: "raw265",
      core: r.PLAYER_CORE_TYPE_DEFAULT
    }, {
      format: "h265",
      value: "raw265",
      core: r.PLAYER_CORE_TYPE_DEFAULT
    }];
    t.exports = {
      frameDataAlignCrop: function frameDataAlignCrop(e, t, i, r, n, a, s, o) {
        if (0 == e - r) return [a, s, o];

        for (var l = r * n, h = l / 4, u = new Uint8Array(l), d = new Uint8Array(h), f = new Uint8Array(h), c = r, p = r / 2, m = 0; m < n; m++) {
          u.set(a.subarray(m * e, c), m * n);
        }

        for (var _ = 0; _ < n / 2; _++) {
          d.set(s.subarray(_ * t, p), _ * n / 2);
        }

        for (var y = 0; y < n / 2; y++) {
          f.set(o.subarray(y * i, p), y * n / 2);
        }

        return [u, d, f];
      },
      GetUriFormat: function GetUriFormat(e) {
        for (var t = 0; t < n.length; t++) {
          var i = n[t],
              r = "." + i.format;
          if (e.search(r) >= 0) return i.value;
        }

        return n[0].value;
      },
      GetFormatPlayCore: function GetFormatPlayCore(e) {
        for (var t = 0; t < n.length; t++) {
          var i = n[t];
          if (i.value === e) return i.core;
        }

        return n[0].core;
      },
      GetMsTime: function GetMsTime() {
        return new Date().getTime();
      }
    };
  }, {
    "../consts": 2
  }],
  6: [function (e, t, i) {
    "use strict";

    function r(e, t) {
      for (var i = 0; i < t.length; i++) {
        var r = t[i];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
      }
    }

    e("../demuxer/bufferFrame"), e("../demuxer/buffer"), e("./cache"), e("./cacheYuv");
    var n = e("../render-engine/webgl-420p"),
        a = e("./av-common"),
        s = (e("./audio-native-core"), e("./audio-core")),
        o = e("../consts");
    e("../version");

    var l = function () {
      function e(t) {
        !function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }(this, e), this.config = {
          width: t.width || o.DEFAULT_WIDTH,
          height: t.height || o.DEFAULT_HEIGHT,
          fps: t.fps || o.DEFAULT_FPS,
          sampleRate: t.sampleRate || o.DEFAULT_SAMPLERATE,
          playerId: t.playerId || o.DEFAILT_WEBGL_PLAY_ID,
          token: t.token || null,
          probeSize: t.probeSize || 4096
        }, this.config.probeSize, this.mediaInfo = {
          noFPS: !1,
          fps: o.DEFAULT_FPS,
          width: this.config.width,
          height: this.config.height,
          sampleRate: this.config.sampleRate,
          size: {
            width: -1,
            height: -1
          },
          audioNone: !1
        }, this.duration = -1, this.vCodecID = o.V_CODEC_NAME_HEVC, this.AVSniffPtr = null, this.AVGetInterval = null, this.readyShowDone = !1, this.readyKeyFrame = !1, this.cache_status = !1, this.download_length = 0, this.AVGLObj = null, this.canvasBox = document.querySelector("#" + this.config.playerId), this.canvasBox.style.overflow = "hidden", this.CanvasObj = null, this.CanvasObj = document.createElement("canvas"), this.CanvasObj.style.width = this.canvasBox.clientWidth + "px", this.CanvasObj.style.height = this.canvasBox.clientHeight + "px", this.CanvasObj.style.top = "0px", this.CanvasObj.style.left = "0px", this.canvasBox.appendChild(this.CanvasObj), this.audioWAudio = null, this.audioVoice = 1, this.frameTime = 1e3 / this.config.fps, this.NaluBuf = [], this.YuvBuf = [], this.workerFetch = null, this.playInterval = null;
        this.totalLen = 0, this.pushPkg = 0, this.onProbeFinish = null, this.onLoadCache = null, this.onLoadCacheFinshed = null, this.onReadyShowDone = null, this.onNetworkError = null;
      }

      var t, i, l;
      return t = e, (i = [{
        key: "_workerFetch_onmessage",
        value: function value(e, t) {
          var i = e.data;

          switch (void 0 === i.cmd || null === i.cmd ? "" : i.cmd) {
            case "fetch-chunk":
              var r = i.data;
              t.download_length += r.length, setTimeout(function () {
                var e = Module._malloc(r.length);

                Module.HEAP8.set(r, e), Module.cwrap("pushSniffHttpFlvData", "number", ["number", "number", "number", "number"])(t.AVSniffPtr, e, r.length, t.config.probeSize), Module._free(e), e = null;
              }, 0), t.totalLen += r.length, t.pushPkg++, void 0 !== t.AVGetInterval && null !== t.AVGetInterval || (t.AVGetInterval = window.setInterval(function () {
                Module.cwrap("getBufferLengthApi", "number", ["number"])(t.AVSniffPtr) > t.config.probeSize && (Module.cwrap("getSniffHttpFlvPkg", "number", ["number"])(t.AVSniffPtr), t.pushPkg -= 1);
              }, 5));
              break;

            case "close":
              t.AVGetInterval && clearInterval(t.AVGetInterval), t.AVGetInterval = null;

            case "fetch-fin":
              break;

            case "fetch-error":
              t.onNetworkError && t.onNetworkError(i.data);
          }
        }
      }, {
        key: "_checkDisplaySize",
        value: function value(e, t, i) {
          var r = t - e,
              n = this.config.width + Math.ceil(r / 2),
              a = t / this.config.width > i / this.config.height,
              s = (n / t).toFixed(2),
              o = (this.config.height / i).toFixed(2),
              l = a ? s : o,
              h = this.config.fixed,
              u = h ? n : parseInt(t * l),
              d = h ? this.config.height : parseInt(i * l);

          if (this.CanvasObj.offsetWidth != u || this.CanvasObj.offsetHeight != d) {
            var f = parseInt((this.canvasBox.offsetHeight - d) / 2),
                c = parseInt((this.canvasBox.offsetWidth - u) / 2);
            f = f < 0 ? 0 : f, c = c < 0 ? 0 : c, this.CanvasObj.style.marginTop = f + "px", this.CanvasObj.style.marginLeft = c + "px", this.CanvasObj.style.width = u + "px", this.CanvasObj.style.height = d + "px";
          }

          return this.isCheckDisplay = !0, [u, d];
        }
      }, {
        key: "_ptsFixed2",
        value: function value(e) {
          return Math.ceil(100 * e) / 100;
        }
      }, {
        key: "_callbackProbe",
        value: function value(e, t, i, r, n, a, l, h, u) {
          for (var d = Module.HEAPU8.subarray(u, u + 10), f = 0; f < d.length; f++) {
            String.fromCharCode(d[f]);
          }

          var c = r;
          r > 100 && (c = o.DEFAULT_FPS, this.mediaInfo.noFPS = !0), this.vCodecID = h, this.config.fps = c, this.mediaInfo.fps = c, this.mediaInfo.size.width = t, this.mediaInfo.size.height = i, this.frameTime = Math.floor(1e3 / (this.mediaInfo.fps + 2)), this.CanvasObj.width == t && this.CanvasObj.height == i || (this.CanvasObj.width = t, this.CanvasObj.height = i, this.isCheckDisplay) || this._checkDisplaySize(t, t, i), n >= 0 && !1 === this.mediaInfo.noFPS ? (void 0 !== this.audioWAudio && null !== this.audioWAudio && (this.audioWAudio.stop(), this.audioWAudio = null), this.config.sampleRate = a, this.mediaInfo.sampleRate = a, this.audioWAudio = s({
            sampleRate: this.mediaInfo.sampleRate,
            appendType: o.APPEND_TYPE_FRAME
          }), this.audioWAudio.isLIVE = !0) : this.mediaInfo.audioNone = !0, this.onProbeFinish && this.onProbeFinish();
        }
      }, {
        key: "_callbackYUV",
        value: function value(e, t, i, r, n, a, s, o, l) {
          var h = Module.HEAPU8.subarray(e, e + r * o),
              u = new Uint8Array(h),
              d = Module.HEAPU8.subarray(t, t + n * o / 2),
              f = new Uint8Array(d),
              c = Module.HEAPU8.subarray(i, i + a * o / 2),
              p = {
            bufY: u,
            bufU: f,
            bufV: new Uint8Array(c),
            line_y: r,
            h: o,
            pts: l
          };
          this.YuvBuf.push(p), this.checkCacheState(), Module._free(h), h = null, Module._free(d), d = null, Module._free(c), c = null, !1 === this.readyShowDone && (this.playYUV(), this.readyShowDone = !0, this.onReadyShowDone && this.onReadyShowDone(), this.audioWAudio || this.play());
        }
      }, {
        key: "_callbackNALU",
        value: function value(e, t, i, r, n, a, s) {
          if (!1 === this.readyKeyFrame) {
            if (i <= 0) return;
            this.readyKeyFrame = !0;
          }

          var o = Module.HEAPU8.subarray(e, e + t),
              l = new Uint8Array(o);
          this.NaluBuf.push({
            bufData: l,
            len: t,
            isKey: i,
            w: r,
            h: n,
            pts: 1e3 * a,
            dts: 1e3 * s
          }), Module._free(o), o = null;
        }
      }, {
        key: "_callbackPCM",
        value: function value(e) {}
      }, {
        key: "_callbackAAC",
        value: function value(e, t, i, r, n) {
          var a = this._ptsFixed2(n);

          if (this.audioWAudio) {
            var s = new Uint8Array(7 + i),
                o = Module.HEAPU8.subarray(e, e + 7);
            s.set(o, 0);
            var l = Module.HEAPU8.subarray(t, t + i);
            s.set(l, 7);
            var h = {
              pts: a,
              data: s
            };
            this.audioWAudio.addSample(h), this.checkCacheState();
          }
        }
      }, {
        key: "_decode",
        value: function value() {
          var e = this;
          setTimeout(function () {
            if (null !== e.workerFetch) {
              var t = e.NaluBuf.shift();

              if (null != t) {
                var i = Module._malloc(t.bufData.length);

                Module.HEAP8.set(t.bufData, i), Module.cwrap("decodeHttpFlvVideoFrame", "number", ["number", "number", "number", "number", "number"])(e.AVSniffPtr, i, t.bufData.length, t.pts, t.dts, 0), Module._free(i), i = null;
              }

              e._decode();
            }
          }, 1);
        }
      }, {
        key: "checkCacheState",
        value: function value() {
          var e = this.YuvBuf.length >= 25 && (!0 === this.mediaInfo.audioNone || this.audioWAudio && this.audioWAudio.sampleQueue.length >= 50);
          return !1 === this.cache_status && e && (this.playInterval && this.audioWAudio && this.audioWAudio.play(), this.onLoadCacheFinshed && this.onLoadCacheFinshed(), this.cache_status = !0), e;
        }
      }, {
        key: "setVoice",
        value: function value(e) {
          this.audioVoice = e, this.audioWAudio && this.audioWAudio.setVoice(e);
        }
      }, {
        key: "release",
        value: function value() {
          return this.pause(), this.NaluBuf.length = 0, this.YuvBuf.length = 0, void 0 !== this.workerFetch && null !== this.workerFetch && this.workerFetch.postMessage({
            cmd: "stop",
            data: "stop",
            msg: "stop"
          }), this.workerFetch = null, this.AVGetInterval && clearInterval(this.AVGetInterval), this.AVGetInterval = null, Module.cwrap("releaseHttpFLV", "number", ["number"])(this.AVSniffPtr), this.playInterval && clearInterval(this.playInterval), this.playInterval = null, this.audioWAudio && this.audioWAudio.stop(), this.audioWAudio = null, 0;
        }
      }, {
        key: "isPlayingState",
        value: function value() {
          return null !== this.playInterval && void 0 !== this.playInterval;
        }
      }, {
        key: "pause",
        value: function value() {
          this.audioWAudio && this.audioWAudio.pause(), this.playInterval && clearInterval(this.playInterval), this.playInterval = null;
        }
      }, {
        key: "playYUV",
        value: function value() {
          if (this.YuvBuf.length > 0) {
            var e = this.YuvBuf.shift();
            return n.renderFrame(this.AVGLObj, e.bufY, e.bufU, e.bufV, e.line_y, e.h), !0;
          }

          return !1;
        }
      }, {
        key: "play",
        value: function value() {
          var e = this,
              t = this;
          if (!1 === this.checkCacheState()) return this.onLoadCache && this.onLoadCache(), setTimeout(function () {
            e.play();
          }, 100), !1;

          if (void 0 === this.playInterval || null === this.playInterval) {
            var i = 0,
                r = 0,
                s = 0;
            !1 === this.mediaInfo.audioNone && this.audioWAudio && !1 === this.mediaInfo.noFPS ? (this.playInterval = setInterval(function () {
              if (r = a.GetMsTime(), t.cache_status) {
                if (r - i >= t.frameTime - s) {
                  var e = t.YuvBuf.shift();

                  if (null != e && null !== e) {
                    var o = 0;
                    null !== t.audioWAudio && void 0 !== t.audioWAudio && (o = 1e3 * (e.pts - t.audioWAudio.getAlignVPTS())), s = t.audioWAudio ? o < 0 && -1 * o <= t.frameTime || o >= 0 ? a.GetMsTime() - r + 1 : t.frameTime : a.GetMsTime() - r + 1, n.renderFrame(t.AVGLObj, e.bufY, e.bufU, e.bufV, e.line_y, e.h);
                  }

                  (t.YuvBuf.length <= 0 || t.audioWAudio && t.audioWAudio.sampleQueue.length <= 0) && (t.cache_status = !1, t.onLoadCache && t.onLoadCache(), t.audioWAudio && t.audioWAudio.pause()), i = r;
                }
              } else s = t.frameTime;
            }, 1), this.audioWAudio && this.audioWAudio.play()) : this.playInterval = setInterval(function () {
              var e = t.YuvBuf.shift();
              null != e && null !== e && n.renderFrame(t.AVGLObj, e.bufY, e.bufU, e.bufV, e.line_y, e.h), t.YuvBuf.length <= 0 && (t.cache_status = !1);
            }, t.frameTime);
          }
        }
      }, {
        key: "start",
        value: function value(e) {
          var t,
              i,
              r,
              a = this;
          this.workerFetch = new Worker((t = function () {
            var e = new AbortController(),
                t = e.signal;
            self, self.onmessage = function (i) {
              var r = i.data;

              switch (void 0 === r.cmd || null === r.cmd ? "" : r.cmd) {
                case "start":
                  !function (e) {
                    var i = !1;
                    i || (i = !0, fetch(e, {
                      signal: t
                    }).then(function (e) {
                      return function e(t) {
                        return t.read().then(function (i) {
                          if (!i.done) {
                            var r = i.value;
                            return self.postMessage({
                              cmd: "fetch-chunk",
                              data: r,
                              msg: "fetch-chunk"
                            }), e(t);
                          }

                          self.postMessage({
                            cmd: "fetch-fin",
                            data: null,
                            msg: "fetch-fin"
                          });
                        });
                      }(e.body.getReader());
                    })["catch"](function (e) {
                      e.toString().includes("user aborted") || (console.error("httplive error", e), self.postMessage({
                        cmd: "fetch-error",
                        data: e,
                        msg: "fetch-error"
                      }));
                    }));
                  }(r.data), self.postMessage({
                    cmd: "default",
                    data: "WORKER STARTED",
                    msg: "default"
                  });
                  break;

                case "stop":
                  e.abort(), self.close(), self.postMessage({
                    cmd: "close",
                    data: "close",
                    msg: "close"
                  });
              }
            };
          }.toString(), i = t.match(/^\s*function\s*\(\s*\)\s*\{(([\s\S](?!\}$))*[\s\S])/), r = [i[1]], window.URL.createObjectURL(new Blob(r, {
            type: "text/javascript"
          })))), this.workerFetch.onmessage = function (e) {
            a._workerFetch_onmessage(e, a);
          }, this.workerFetch, this.AVSniffPtr = Module.cwrap("AVSniffHttpFlvInit", "number", ["string", "string"])("base64:QXV0aG9yOmNoYW5neWFubG9uZ3xudW1iZXJ3b2xmLEdpdGh1YjpodHRwczovL2dpdGh1Yi5jb20vbnVtYmVyd29sZixFbWFpbDpwb3JzY2hlZ3QyM0Bmb3htYWlsLmNvbSxRUTo1MzEzNjU4NzIsSG9tZVBhZ2U6aHR0cDovL3h2aWRlby52aWRlbyxEaXNjb3JkOm51bWJlcndvbGYjODY5NCx3ZWNoYXI6bnVtYmVyd29sZjExLEJlaWppbmcsV29ya0luOkJhaWR1", "0.0.0"), this.AVSniffPtr;
          var s = Module.addFunction(this._callbackProbe.bind(this)),
              o = Module.addFunction(this._callbackYUV.bind(this)),
              l = Module.addFunction(this._callbackNALU.bind(this)),
              h = Module.addFunction(this._callbackPCM.bind(this)),
              u = Module.addFunction(this._callbackAAC.bind(this));
          Module.cwrap("initializeSniffHttpFlvModule", "number", ["number", "number", "number", "number", "number", "number"])(this.AVSniffPtr, s, o, l, h, u), this.AVGLObj = n.setupCanvas(this.CanvasObj, {
            preserveDrawingBuffer: !1
          }), this.workerFetch.postMessage({
            cmd: "start",
            data: e,
            msg: "start"
          }), this._decode();
        }
      }]) && r(t.prototype, i), l && r(t, l), e;
    }();

    i.CHttpLiveCore = l;
  }, {
    "../consts": 2,
    "../demuxer/buffer": 13,
    "../demuxer/bufferFrame": 14,
    "../render-engine/webgl-420p": 24,
    "../version": 27,
    "./audio-core": 3,
    "./audio-native-core": 4,
    "./av-common": 5,
    "./cache": 8,
    "./cacheYuv": 9
  }],
  7: [function (e, t, i) {
    "use strict";

    function r(e, t) {
      for (var i = 0; i < t.length; i++) {
        var r = t[i];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
      }
    }

    function n(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }

    var a = e("../demuxer/bufferFrame"),
        s = e("../demuxer/buffer"),
        o = (e("./cache"), e("./cacheYuv"), e("../render-engine/webgl-420p")),
        l = e("./av-common"),
        h = (e("./audio-native-core"), e("./audio-core")),
        u = e("../consts"),
        d = e("../version"),
        f = function e(t, i, r, a, s, o, l, h, u) {
      n(this, e), this.pts = u, this.data_y = t, this.data_u = i, this.data_v = r, this.line1 = a, this.line2 = s, this.line3 = o, this.width = l, this.height = h, this.byteAlignIncr = this.line1 - this.width;
    },
        c = function () {
      function e(t) {
        n(this, e), this.config = {
          width: t.width || u.DEFAULT_WIDTH,
          height: t.height || u.DEFAULT_HEIGHT,
          fps: t.fps || u.DEFAULT_FPS,
          sampleRate: t.sampleRate || u.DEFAULT_SAMPLERATE,
          playerId: t.playerId || u.DEFAILT_WEBGL_PLAY_ID,
          token: t.token || null,
          readyShow: t.readyShow || !1,
          checkProbe: t.checkProbe,
          ignoreAudio: t.ignoreAudio,
          playMode: t.playMode || u.PLAYER_MODE_VOD
        }, this.probeSize = 4524611, this.audioWAudio = null, this.audioVoice = 1, this.frameCallTag = 0, this.seekTarget = 0, this.avSeekVState = !1, this.isNewSeek = !1, this.openFrameCall = !0, this.bufRecvStat = !1, this.bufObject = s(), this.bufLastVDTS = 0, this.bufLastADTS = 0, this.yuvMaxTime = 0, this.playVPipe = [], this._videoQueue = [], this.duration = -1, this.channels = -1, this.width = -1, this.height = -1, this.isPlaying = !1, this.isCheckDisplay = !1, this.frameTime = 1e3 / this.config.fps, this.vCodecID = u.V_CODEC_NAME_UNKN, this.audioIdx = -1, this.audioNone = !1, this.frameDur = 0, this.canvasBox = null, this.canvas = null, this.yuv = null, this.retryAuSampleNo = 0, this.cacheStatus = !1, this.showScreen = !1, this.playPTS = 0, this.vCachePTS = 0, this.aCachePTS = 0, this.reFull = !1, this.bufOK = !1, this.avRecvInterval = null, this.avFeedVideoInterval = null, this.avFeedAudioInterval = null, this.decVFrameInterval = null, this.playFrameInterval = null, this.onProbeFinish = null, this.onPlayingTime = null, this.onPlayingFinish = null, this.onSeekFinish = null, this.onLoadCache = null, this.onLoadCacheFinshed = null, this.onRender = null, this.onCacheProcess = null, this.onReadyShowDone = null, this.corePtr = Module.cwrap("AVSniffStreamInit", "number", ["string", "string"])(this.config.token, d.PLAYER_VERSION), this.corePtr;
        var i = Module.addFunction(this._probeFinCallback.bind(this)),
            r = Module.addFunction(this._frameCallback.bind(this)),
            a = Module.addFunction(this._naluCallback.bind(this)),
            o = Module.addFunction(this._samplesCallback.bind(this)),
            l = Module.addFunction(this._aacFrameCallback.bind(this)),
            h = this.config.playMode === u.PLAYER_MODE_NOTIME_LIVE ? 1 : 0;
        this.config.ignoreAudio, this.config.playMode;
        Module.cwrap("initializeSniffStreamModuleWithAOpt", "number", ["number", "number", "number", "number", "number"])(this.corePtr, i, r, a, o, l, this.config.ignoreAudio, h);
      }

      var t, i, c;
      return t = e, (i = [{
        key: "release",
        value: function value() {
          void 0 !== this.canvas && null !== this.canvas && (this.canvas.remove(), this.canvas = null), null !== this.playFrameInterval && (window.clearInterval(this.playFrameInterval), this.playFrameInterval = null), null !== this.avFeedVideoInterval && (window.clearInterval(this.avFeedVideoInterval), this.avFeedVideoInterval = null), null !== this.avFeedAudioInterval && (window.clearInterval(this.avFeedAudioInterval), this.avFeedAudioInterval = null), null !== this.avRecvInterval && (window.clearInterval(this.avRecvInterval), this.avRecvInterval = null), this._clearDecInterval();
          var e = Module.cwrap("releaseSniffStream", "number", ["number"])(this.corePtr);
          return this.audioWAudio && this.audioWAudio.stop(), this.audioWAudio = null, this.bufRecvStat = !1, this.bufObject.cleanPipeline(), this.playVPipe.length = 0, e;
        }
      }, {
        key: "setScreen",
        value: function value() {
          var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
          this.showScreen = e, this.canvas && (e ? this.canvas.setAttribute("hidden", !0) : this.canvas.removeAttribute("hidden"));
        }
      }, {
        key: "getCachePTS",
        value: function value() {
          return 1 !== this.config.ignoreAudio && this.audioWAudio ? Math.max(this.vCachePTS, this.aCachePTS) : this.vCachePTS;
        }
      }, {
        key: "getMaxPTS",
        value: function value() {
          return Math.max(this.vCachePTS, this.aCachePTS);
        }
      }, {
        key: "isPlayingState",
        value: function value() {
          return this.isPlaying;
        }
      }, {
        key: "pushDone",
        value: function value() {
          this.pushEOF = !0;
        }
      }, {
        key: "_clearDecInterval",
        value: function value() {
          this.decVFrameInterval && window.clearInterval(this.decVFrameInterval), this.decVFrameInterval = null;
        }
      }, {
        key: "_checkPlayFinished",
        value: function value() {
          return !(this.config.playMode !== u.PLAYER_MODE_VOD || !(!0 === this.bufRecvStat && (this.playPTS >= this.bufLastVDTS || this.audioWAudio && this.playPTS >= this.bufLastADTS) || this.duration - this.playPTS < this.frameDur) || (this.pause(), this._clearDecInterval(), this.onPlayingTime && this.onPlayingTime(this.duration), this.onLoadCacheFinshed && this.onLoadCacheFinshed(), this.onPlayingFinish && this.onPlayingFinish(), 0));
        }
      }, {
        key: "play",
        value: function value() {
          var e = this;

          if (!this.playFrameInterval || null === this.playFrameInterval || null == this.playFrameInterval) {
            this._videoQueue.length > 0 && (this.isPlaying = !0);
            var t = 0,
                i = 0,
                r = 0;
            this.config.playMode === u.PLAYER_MODE_NOTIME_LIVE ? this.playFrameInterval = window.setInterval(function () {
              if (e._videoQueue.length > 0) {
                var t = e._videoQueue.shift();

                t.pts, o.renderFrame(e.yuv, t.data_y, t.data_u, t.data_v, t.line1, t.height);
              }
            }, 1e3 * this.frameDur) : this.playFrameInterval = window.setInterval(function () {
              if (i = l.GetMsTime(), e._videoQueue.length > 0 && i - t >= e.frameTime - r) {
                var n = e._videoQueue.shift(),
                    a = 0;

                if (e.isNewSeek || null === e.audioWAudio || void 0 === e.audioWAudio || (a = 1e3 * (n.pts - e.audioWAudio.getAlignVPTS()), e.playPTS = Math.max(e.audioWAudio.getAlignVPTS(), e.playPTS)), t = i, l.GetMsTime(), e.playPTS = Math.max(n.pts, e.playPTS), e.isNewSeek && e.seekTarget - e.frameDur > n.pts) return void (r = e.frameTime);

                if (e.isNewSeek && (e.audioWAudio && e.audioWAudio.setVoice(e.audioVoice), e.audioWAudio && e.audioWAudio.play(), r = 0, e.isNewSeek = !1, e.seekTarget = 0), e.showScreen ? e.onRender && e.onRender(n.line1, n.height, n.data_y, n.data_u, n.data_v) : (n.pts, o.renderFrame(e.yuv, n.data_y, n.data_u, n.data_v, n.line1, n.height)), e.onPlayingTime && e.onPlayingTime(n.pts), !e.isNewSeek && e.audioWAudio && (a < 0 && -1 * a <= e.frameTime || a >= 0)) {
                  if (e.config.playMode === u.PLAYER_MODE_VOD) if (n.pts >= e.duration) e.onLoadCacheFinshed && e.onLoadCacheFinshed(), e.onPlayingFinish && e.onPlayingFinish(), e._clearDecInterval(), e.pause();else if (e._checkPlayFinished()) return;
                  r = l.GetMsTime() - i;
                } else !e.isNewSeek && e.audioWAudio && (a < 0 && e.frameTime, r = e.frameTime);
              }

              e._checkPlayFinished();
            }, 1);
          }

          this.isNewSeek || this.audioWAudio && this.audioWAudio.play();
        }
      }, {
        key: "pause",
        value: function value() {
          this.isPlaying = !1, this._pause();
        }
      }, {
        key: "_pause",
        value: function value() {
          this.playFrameInterval && window.clearInterval(this.playFrameInterval), this.playFrameInterval = null, this.audioWAudio && this.audioWAudio.pause();
        }
      }, {
        key: "seek",
        value: function value(e) {
          var t = this,
              i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          this.openFrameCall = !1, this.pause(), this._clearDecInterval(), null !== this.avFeedVideoInterval && (window.clearInterval(this.avFeedVideoInterval), this.avFeedVideoInterval = null), null !== this.avFeedAudioInterval && (window.clearInterval(this.avFeedAudioInterval), this.avFeedAudioInterval = null), this.yuvMaxTime = 0, this.playVPipe.length = 0, this._videoQueue.length = 0, this.audioWAudio && this.audioWAudio.stop(), e && e(), this.isNewSeek = !0, this.avSeekVState = !0, this.seekTarget = i.seekTime, null !== this.audioWAudio && void 0 !== this.audioWAudio && (this.audioWAudio.setVoice(0), this.audioWAudio.resetStartParam(), this.audioWAudio.stop()), this._avFeedData(i.seekTime), setTimeout(function () {
            t.yuvMaxTime = 0, t._videoQueue.length = 0, t.openFrameCall = !0, t.frameCallTag += 1, t._decVFrameIntervalFunc();
          }, 1e3);
        }
      }, {
        key: "setVoice",
        value: function value(e) {
          this.audioVoice = e, this.audioWAudio && this.audioWAudio.setVoice(e);
        }
      }, {
        key: "cacheIsFull",
        value: function value() {
          return this._videoQueue.length >= 50;
        }
      }, {
        key: "_checkDisplaySize",
        value: function value(e, t, i) {
          var r = t - e,
              n = this.config.width + Math.ceil(r / 2),
              a = t / this.config.width > i / this.config.height,
              s = (n / t).toFixed(2),
              o = (this.config.height / i).toFixed(2),
              l = a ? s : o,
              h = this.config.fixed,
              u = h ? n : parseInt(t * l),
              d = h ? this.config.height : parseInt(i * l);

          if (this.canvas.offsetWidth != u || this.canvas.offsetHeight != d) {
            var f = parseInt((this.canvasBox.offsetHeight - d) / 2),
                c = parseInt((this.canvasBox.offsetWidth - u) / 2);
            f = f < 0 ? 0 : f, c = c < 0 ? 0 : c, this.canvas.style.marginTop = f + "px", this.canvas.style.marginLeft = c + "px", this.canvas.style.width = u + "px", this.canvas.style.height = d + "px";
          }

          return this.isCheckDisplay = !0, [u, d];
        }
      }, {
        key: "_createYUVCanvas",
        value: function value() {
          this.canvasBox = document.querySelector("#" + this.config.playerId), this.canvasBox.style.overflow = "hidden", this.canvas = document.createElement("canvas"), this.canvas.style.width = this.canvasBox.clientWidth + "px", this.canvas.style.height = this.canvasBox.clientHeight + "px", this.canvas.style.top = "0px", this.canvas.style.left = "0px", this.canvasBox.appendChild(this.canvas), this.yuv = o.setupCanvas(this.canvas, {
            preserveDrawingBuffer: !1
          });
        }
      }, {
        key: "_avRecvPackets",
        value: function value() {
          var e = this;
          this.bufObject.cleanPipeline(), null !== this.avRecvInterval && (window.clearInterval(this.avRecvInterval), this.avRecvInterval = null), !0 === this.config.checkProbe ? this.avRecvInterval = window.setInterval(function () {
            Module.cwrap("getSniffStreamPkg", "number", ["number"])(e.corePtr), e._avCheckRecvFinish();
          }, 5) : this.avRecvInterval = window.setInterval(function () {
            Module.cwrap("getSniffStreamPkgNoCheckProbe", "number", ["number"])(e.corePtr), e._avCheckRecvFinish();
          }, 5), this._avFeedData(0, !1);
        }
      }, {
        key: "_avCheckRecvFinish",
        value: function value() {
          this.config.playMode === u.PLAYER_MODE_VOD && this.duration - this.getMaxPTS() < this.frameDur && (this.bufRecvStat = !0, null !== this.avRecvInterval && (window.clearInterval(this.avRecvInterval), this.avRecvInterval = null, this.bufOK = !0));
        }
      }, {
        key: "_afterAvFeedSeekToStartWithFinishedBuffer",
        value: function value(e) {
          var t = this,
              i = window.setInterval(function () {
            t._videoQueue.length, t._videoQueue.length >= 50 && (t.onSeekFinish && t.onSeekFinish(), t.onPlayingTime && t.onPlayingTime(e), t.play(), window.clearInterval(i), i = null);
          }, 10);
          return !0;
        }
      }, {
        key: "_afterAvFeedSeekToStartWithUnFinBuffer",
        value: function value(e) {
          var t = this,
              i = window.setInterval(function () {
            t._videoQueue.length, t._videoQueue.length >= 50 && (t.onSeekFinish && t.onSeekFinish(), t.onPlayingTime && t.onPlayingTime(e), !1 === t.reFull ? t.play() : t.reFull = !1, window.clearInterval(i), i = null);
          }, 10);
          return !0;
        }
      }, {
        key: "_avFeedData",
        value: function value(e) {
          var t = this;

          if (this.playVPipe.length = 0, this.audioWAudio && this.audioWAudio.cleanQueue(), e <= 0 && !1 === this.bufOK) {
            var i = 0;

            if (this.avFeedVideoInterval = window.setInterval(function () {
              var r = t.bufObject.videoBuffer.length;

              if (r - 1 > i || t.duration - t.getMaxPTS() < t.frameDur && r - 1 == i) {
                var n = t.bufObject.videoBuffer[i].length;

                if (n > 0) {
                  for (var s = 0; s < n; s++) {
                    t.playVPipe.push(a.ConstructWithDts(t.bufObject.videoBuffer[i][s].pts, t.bufObject.videoBuffer[i][s].dts, t.bufObject.videoBuffer[i][s].isKey, t.bufObject.videoBuffer[i][s].data, !0));
                  }

                  i += 1;
                }

                t.config.playMode === u.PLAYER_MODE_VOD && t.duration - t.getMaxPTS() < t.frameDur && t.playVPipe.length > 0 && t.playVPipe[t.playVPipe.length - 1].pts >= t.bufLastVDTS && (window.clearInterval(t.avFeedVideoInterval), t.avFeedVideoInterval = null, t.playVPipe[t.playVPipe.length - 1].pts, t.bufLastVDTS, t.bufObject.videoBuffer, t.playVPipe);
              } else t.config.playMode === u.PLAYER_MODE_VOD && t.playVPipe.length > 0 && t.playVPipe[t.playVPipe.length - 1].pts >= t.duration && (window.clearInterval(t.avFeedVideoInterval), t.avFeedVideoInterval = null, t.playVPipe[t.playVPipe.length - 1].pts, t.duration, t.bufObject.videoBuffer, t.playVPipe);

              t.avSeekVState && (t.getMaxPTS(), t.duration, t.config.playMode === u.PLAYER_MODE_VOD && (t._afterAvFeedSeekToStartWithFinishedBuffer(e), t.avSeekVState = !1));
            }, 5), void 0 !== this.audioWAudio && null !== this.audioWAudio && this.config.ignoreAudio < 1) {
              var r = 0;
              this.avFeedAudioInterval = window.setInterval(function () {
                var e = t.bufObject.audioBuffer.length;

                if (e - 1 > r || t.duration - t.getMaxPTS() < t.frameDur && e - 1 == r) {
                  for (var i = t.bufObject.audioBuffer[r].length, n = 0; n < i; n++) {
                    t.audioWAudio.addSample(new a.BufferFrame(t.bufObject.audioBuffer[r][n].pts, t.bufObject.audioBuffer[r][n].isKey, t.bufObject.audioBuffer[r][n].data, !1));
                  }

                  r += 1, t.config.playMode === u.PLAYER_MODE_VOD && t.duration - t.getMaxPTS() < t.frameDur && t.audioWAudio.sampleQueue.length > 0 && t.audioWAudio.sampleQueue[t.audioWAudio.sampleQueue.length - 1].pts >= t.bufLastADTS && (window.clearInterval(t.avFeedAudioInterval), t.avFeedAudioInterval = null, t.audioWAudio.sampleQueue[t.audioWAudio.sampleQueue.length - 1].pts, t.bufObject.audioBuffer);
                } else t.config.playMode === u.PLAYER_MODE_VOD && t.audioWAudio.sampleQueue.length > 0 && t.audioWAudio.sampleQueue[t.audioWAudio.sampleQueue.length - 1].pts >= t.duration && (window.clearInterval(t.avFeedAudioInterval), t.avFeedAudioInterval = null, t.audioWAudio.sampleQueue[t.audioWAudio.sampleQueue.length - 1].pts, t.bufObject.audioBuffer);
              }, 5);
            }
          } else {
            var n = this.bufObject.seekIDR(e),
                s = parseInt(n, 10);
            this.playPTS = 0;
            var o = s;

            if (this.avFeedVideoInterval = window.setInterval(function () {
              var i = t.bufObject.videoBuffer.length;

              if (i - 1 > o || t.duration - t.getMaxPTS() < t.frameDur && i - 1 == o) {
                var r = t.bufObject.videoBuffer[o].length;

                if (r > 0) {
                  for (var n = 0; n < r; n++) {
                    t.playVPipe.push(a.ConstructWithDts(t.bufObject.videoBuffer[o][n].pts, t.bufObject.videoBuffer[o][n].dts, t.bufObject.videoBuffer[o][n].isKey, t.bufObject.videoBuffer[o][n].data, !0));
                  }

                  o += 1;
                }

                t.config.playMode === u.PLAYER_MODE_VOD && t.duration - t.getMaxPTS() < t.frameDur && t.playVPipe.length > 0 && t.playVPipe[t.playVPipe.length - 1].pts >= t.bufLastVDTS && (window.clearInterval(t.avFeedVideoInterval), t.avFeedVideoInterval = null);
              } else t.config.playMode === u.PLAYER_MODE_VOD && t.playVPipe.length > 0 && t.playVPipe[t.playVPipe.length - 1].pts >= t.duration && (window.clearInterval(t.avFeedVideoInterval), t.avFeedVideoInterval = null);

              t.avSeekVState && (t.getMaxPTS(), t.duration, t.config.playMode === u.PLAYER_MODE_VOD && (t._afterAvFeedSeekToStartWithUnFinBuffer(e), t.avSeekVState = !1));
            }, 5), this.audioWAudio && this.config.ignoreAudio < 1) {
              var l = parseInt(e, 10);
              this.avFeedAudioInterval = window.setInterval(function () {
                var e = t.bufObject.audioBuffer.length;

                if (e - 1 > l || t.duration - t.getMaxPTS() < t.frameDur && e - 1 == l) {
                  for (var i = t.bufObject.audioBuffer[l].length, r = 0; r < i; r++) {
                    t.bufObject.audioBuffer[l][r].pts < t.seekTarget || t.audioWAudio.addSample(new a.BufferFrame(t.bufObject.audioBuffer[l][r].pts, t.bufObject.audioBuffer[l][r].isKey, t.bufObject.audioBuffer[l][r].data, !1));
                  }

                  l += 1, t.config.playMode === u.PLAYER_MODE_VOD && t.duration - t.getMaxPTS() < t.frameDur && t.audioWAudio.sampleQueue.length > 0 && t.audioWAudio.sampleQueue[t.audioWAudio.sampleQueue.length - 1].pts >= t.bufLastADTS && (window.clearInterval(t.avFeedAudioInterval), t.avFeedAudioInterval = null);
                } else t.config.playMode === u.PLAYER_MODE_VOD && t.audioWAudio.sampleQueue.length > 0 && t.audioWAudio.sampleQueue[t.audioWAudio.sampleQueue.length - 1].pts >= t.duration && (window.clearInterval(t.avFeedAudioInterval), t.avFeedAudioInterval = null);
              }, 5);
            }
          }
        }
      }, {
        key: "_probeFinCallback",
        value: function value(e, t, i, r, n, a, s, o, l) {
          var d = this;
          this._createYUVCanvas(), u.V_CODEC_NAME_HEVC, this.config.fps = 1 * r, this.frameTime = 1e3 / this.config.fps, this.width = t, this.height = i, this.frameDur = 1 / this.config.fps, this.duration = e - this.frameDur, this.vCodecID = o, this.config.sampleRate = a, this.channels = s, this.audioIdx = n, this.duration < 0 && (this.config.playMode = u.PLAYER_MODE_NOTIME_LIVE, this.frameTime, this.frameDur);

          for (var f = Module.HEAPU8.subarray(l, l + 10), c = 0; c < f.length; c++) {
            String.fromCharCode(f[c]);
          }

          u.V_CODEC_NAME_HEVC === this.vCodecID && (n >= 0 && this.config.ignoreAudio < 1 ? (void 0 !== this.audioWAudio && null !== this.audioWAudio && (this.audioWAudio.stop(), this.audioWAudio = null), this.audioWAudio = h({
            sampleRate: a,
            appendType: u.APPEND_TYPE_FRAME
          }), this.audioWAudio.setDurationMs(1e3 * e), this.onLoadCache && this.audioWAudio.setOnLoadCache(function () {
            if (d.retryAuSampleNo, d.retryAuSampleNo <= 5) {
              d.pause(), d.onLoadCache && d.onLoadCache();
              var e = window.setInterval(function () {
                return d.retryAuSampleNo, d.audioWAudio.sampleQueue.length, d.audioWAudio.sampleQueue.length > 2 ? (d.onLoadCacheFinshed && d.onLoadCacheFinshed(), d.play(), d.retryAuSampleNo = 0, window.clearInterval(e), void (e = null)) : (d.retryAuSampleNo += 1, d.retryAuSampleNo > 5 ? (d.play(), d.onLoadCacheFinshed && d.onLoadCacheFinshed(), window.clearInterval(e), void (e = null)) : void 0);
              }, 1e3);
            }
          })) : this.audioNone = !0, this._avRecvPackets(), this._decVFrameIntervalFunc()), this.onProbeFinish && this.onProbeFinish();
        }
      }, {
        key: "_ptsFixed2",
        value: function value(e) {
          return Math.ceil(100 * e) / 100;
        }
      }, {
        key: "_naluCallback",
        value: function value(e, t, i, r, n, a, s) {
          var o = this._ptsFixed2(a),
              l = Module.HEAPU8.subarray(e, e + t),
              h = new Uint8Array(l);

          this.bufObject.appendFrameWithDts(o, s, h, !0, i), this.bufLastVDTS = Math.max(s, this.bufLastVDTS), this.vCachePTS = Math.max(o, this.vCachePTS), this.onCacheProcess && this.onCacheProcess(this.getCachePTS());
        }
      }, {
        key: "_samplesCallback",
        value: function value(e, t, i, r) {}
      }, {
        key: "_aacFrameCallback",
        value: function value(e, t, i, r, n) {
          var a = this._ptsFixed2(n);

          if (this.audioWAudio) {
            var s = new Uint8Array(7 + i),
                o = Module.HEAPU8.subarray(e, e + 7);
            s.set(o, 0);
            var l = Module.HEAPU8.subarray(t, t + i);
            s.set(l, 7), this.bufObject.appendFrame(a, s, !1, !0), this.bufLastADTS = Math.max(a, this.bufLastADTS), this.aCachePTS = Math.max(a, this.aCachePTS), this.onCacheProcess && this.onCacheProcess(this.getCachePTS());
          }
        }
      }, {
        key: "_decVFrameIntervalFunc",
        value: function value() {
          var e = this;
          null == this.decVFrameInterval && (this.decVFrameInterval = window.setInterval(function () {
            if (e._videoQueue.length < 50 && e.playVPipe.length > 0) {
              var t = e.playVPipe.shift(),
                  i = t.data,
                  r = Module._malloc(i.length);

              Module.HEAP8.set(i, r);
              var n = parseInt(1e3 * t.pts, 10),
                  a = parseInt(1e3 * t.dts, 10);
              e.yuvMaxTime = Math.max(t.pts, e.yuvMaxTime), Module.cwrap("decodeVideoFrame", "number", ["number", "number", "number", "number", "number"])(e.corePtr, r, i.length, n, a, e.frameCallTag), Module._free(r), r = null;
            }
          }, 10));
        }
      }, {
        key: "_frameCallback",
        value: function value(e, t, i, r, n, a, s, l, h, u) {
          if (this._videoQueue.length, !(!1 === this.openFrameCall || u !== this.frameCallTag || h > this.yuvMaxTime + this.frameDur || this.isNewSeek && this.seekTarget - h > 3 * this.frameDur)) {
            var d = this._videoQueue.length;

            if (this.canvas.width == r && this.canvas.height == l || (this.canvas.width = r, this.canvas.height = l, this.isCheckDisplay) || this._checkDisplaySize(s, r, l), !(this.playPTS > h)) {
              var c = Module.HEAPU8.subarray(e, e + r * l),
                  p = Module.HEAPU8.subarray(t, t + n * l / 2),
                  m = Module.HEAPU8.subarray(i, i + a * l / 2),
                  _ = new Uint8Array(c),
                  y = new Uint8Array(p),
                  g = new Uint8Array(m);

              this.config.readyShow && (o.renderFrame(this.yuv, _, y, g, r, l), this.config.readyShow = !1, this.onReadyShowDone && this.onReadyShowDone());
              var v = new f(_, y, g, r, n, a, s, l, h);
              if (d <= 0 || h > this._videoQueue[d - 1].pts) this._videoQueue.push(v);else if (h < this._videoQueue[0].pts) this._videoQueue.splice(0, 0, v);else if (h < this._videoQueue[d - 1].pts) for (var b = 0; b < d; b++) {
                if (h > this._videoQueue[b].pts && b + 1 < d && h < this._videoQueue[b + 1].pts) {
                  this._videoQueue.splice(b + 1, 0, v);

                  break;
                }
              }
              this._videoQueue, this.vCachePTS = Math.max(h, this.vCachePTS), this.onCacheProcess && this.onCacheProcess(this.getCachePTS());
            }
          }
        }
      }, {
        key: "setProbeSize",
        value: function value(e) {
          this.probeSize = e;
        }
      }, {
        key: "pushBuffer",
        value: function value(e) {
          var t = Module._malloc(e.length);

          Module.HEAP8.set(e, t);
          var i = Module.cwrap("pushSniffStreamData", "number", ["number", "number", "number", "number"])(this.corePtr, t, e.length, this.probeSize);
          return i;
        }
      }]) && r(t.prototype, i), c && r(t, c), e;
    }();

    i.CNativeCore = c;
  }, {
    "../consts": 2,
    "../demuxer/buffer": 13,
    "../demuxer/bufferFrame": 14,
    "../render-engine/webgl-420p": 24,
    "../version": 27,
    "./audio-core": 3,
    "./audio-native-core": 4,
    "./av-common": 5,
    "./cache": 8,
    "./cacheYuv": 9
  }],
  8: [function (e, t, i) {
    (function (i) {
      "use strict";

      e("./cacheYuv");
      i.CACHE_APPEND_STATUS_CODE = {
        FAILED: -1,
        OVERFLOW: -2,
        OK: 0,
        NOT_FULL: 1,
        FULL: 2,
        NULL: 3
      }, t.exports = function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 60,
            t = {
          limit: e,
          yuvCache: [],
          appendCacheByCacheYuv: function appendCacheByCacheYuv(e) {
            e.pts;
            return t.yuvCache.length >= t.limit ? CACHE_APPEND_STATUS_CODE.OVERFLOW : (t.yuvCache.push(e), t.yuvCache.length >= t.limit ? CACHE_APPEND_STATUS_CODE.FULL : CACHE_APPEND_STATUS_CODE.NOT_FULL);
          },
          getState: function getState() {
            return t.yuvCache.length <= 0 ? CACHE_APPEND_STATUS_CODE.NULL : t.yuvCache.length >= t.limit ? CACHE_APPEND_STATUS_CODE.FULL : CACHE_APPEND_STATUS_CODE.NOT_FULL;
          },
          cleanPipeline: function cleanPipeline() {
            t.yuvCache.length = 0;
          },
          vYuv: function vYuv() {
            return t.yuvCache.length <= 0 ? null : t.yuvCache.shift();
          }
        };
        return t;
      };
    }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
  }, {
    "./cacheYuv": 9
  }],
  9: [function (e, t, i) {
    "use strict";

    function r(e, t) {
      for (var i = 0; i < t.length; i++) {
        var r = t[i];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
      }
    }

    var n = function () {
      function e(t, i, r, n, a, s) {
        !function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }(this, e), this.pts = t, this.width = i, this.height = r, this.imageBufferY = n, this.imageBufferB = a, this.imageBufferR = s;
      }

      var t, i, n;
      return t = e, (i = [{
        key: "setYuv",
        value: function value(e, t, i, r, n, a) {
          this.pts = e, this.width = t, this.height = i, this.imageBufferY = r, this.imageBufferB = n, this.imageBufferR = a;
        }
      }]) && r(t.prototype, i), n && r(t, n), e;
    }();

    i.CacheYuvStruct = n;
  }, {}],
  10: [function (e, t, i) {
    "use strict";

    t.exports = {
      HEVC_NAL_TRAIL_N: 0,
      HEVC_NAL_TRAIL_R: 1,
      HEVC_NAL_TSA_N: 2,
      HEVC_NAL_TSA_R: 3,
      HEVC_NAL_STSA_N: 4,
      HEVC_NAL_STSA_R: 5,
      HEVC_NAL_RADL_N: 6,
      HEVC_NAL_RADL_R: 7,
      HEVC_NAL_RASL_N: 8,
      HEVC_NAL_RASL_R: 9,
      HEVC_NAL_VCL_N10: 10,
      HEVC_NAL_VCL_R11: 11,
      HEVC_NAL_VCL_N12: 12,
      HEVC_NAL_VCL_R13: 13,
      HEVC_NAL_VCL_N14: 14,
      HEVC_NAL_VCL_R15: 15,
      HEVC_NAL_BLA_W_LP: 16,
      HEVC_NAL_BLA_W_RADL: 17,
      HEVC_NAL_BLA_N_LP: 18,
      HEVC_NAL_IDR_W_RADL: 19,
      HEVC_NAL_IDR_N_LP: 20,
      HEVC_NAL_CRA_NUT: 21,
      HEVC_NAL_IRAP_VCL22: 22,
      HEVC_NAL_IRAP_VCL23: 23,
      HEVC_NAL_RSV_VCL24: 24,
      HEVC_NAL_RSV_VCL25: 25,
      HEVC_NAL_RSV_VCL26: 26,
      HEVC_NAL_RSV_VCL27: 27,
      HEVC_NAL_RSV_VCL28: 28,
      HEVC_NAL_RSV_VCL29: 29,
      HEVC_NAL_RSV_VCL30: 30,
      HEVC_NAL_RSV_VCL31: 31,
      HEVC_NAL_VPS: 32,
      HEVC_NAL_SPS: 33,
      HEVC_NAL_PPS: 34,
      HEVC_NAL_AUD: 35,
      HEVC_NAL_EOS_NUT: 36,
      HEVC_NAL_EOB_NUT: 37,
      HEVC_NAL_FD_NUT: 38,
      HEVC_NAL_SEI_PREFIX: 39,
      HEVC_NAL_SEI_SUFFIX: 40,
      HEVC_NAL_RSV_NVCL41: 41,
      HEVC_NAL_RSV_NVCL42: 42,
      HEVC_NAL_RSV_NVCL43: 43,
      HEVC_NAL_RSV_NVCL44: 44,
      HEVC_NAL_RSV_NVCL45: 45,
      HEVC_NAL_RSV_NVCL46: 46,
      HEVC_NAL_RSV_NVCL47: 47,
      HEVC_NAL_UNSPEC48: 48,
      HEVC_NAL_UNSPEC49: 49,
      HEVC_NAL_UNSPEC50: 50,
      HEVC_NAL_UNSPEC51: 51,
      HEVC_NAL_UNSPEC52: 52,
      HEVC_NAL_UNSPEC53: 53,
      HEVC_NAL_UNSPEC54: 54,
      HEVC_NAL_UNSPEC55: 55,
      HEVC_NAL_UNSPEC56: 56,
      HEVC_NAL_UNSPEC57: 57,
      HEVC_NAL_UNSPEC58: 58,
      HEVC_NAL_UNSPEC59: 59,
      HEVC_NAL_UNSPEC60: 60,
      HEVC_NAL_UNSPEC61: 61,
      HEVC_NAL_UNSPEC62: 62,
      HEVC_NAL_UNSPEC63: 63,
      SOURCE_CODE_VPS: 64,
      SOURCE_CODE_SPS: 66,
      SOURCE_CODE_PPS: 68,
      SOURCE_CODE_SEI: 78,
      SOURCE_CODE_IDR: 38,
      SOURCE_CODE_P: 2,
      SOURCE_CODE_SEI_END: 128,
      DEFINE_STARTCODE: new Uint8Array([0, 0, 0, 1]),
      DEFINE_KEY_FRAME: 21,
      DEFINE_P_FRAME: 9,
      DEFINE_OTHERS_FRAME: 153
    };
  }, {}],
  11: [function (e, t, i) {
    "use strict";

    var r = e("./hevc-header"),
        n = [r.HEVC_NAL_VPS, r.HEVC_NAL_SPS, r.HEVC_NAL_PPS, r.HEVC_NAL_SEI_PREFIX];
    t.exports = {
      IS_HEV_PS_INFO_CHAR: function IS_HEV_PS_INFO_CHAR(e) {
        var t = (126 & e) >> 1;
        return n.indexOf(t);
      },
      GET_NALU_TYPE: function GET_NALU_TYPE(e) {
        var t = (126 & e) >> 1;
        if (t >= 1 && t <= 9) return r.DEFINE_P_FRAME;
        if (t >= 16 && t <= 21) return r.DEFINE_KEY_FRAME;
        var i = n.indexOf(t);
        return i >= 0 ? n[i] : r.DEFINE_OTHERS_FRAME;
      },
      PACK_NALU: function PACK_NALU(e) {
        var t = e.nalu,
            i = e.vlc.vlc;
        null == t.vps && (t.vps = new Uint8Array());
        var r = new Uint8Array(t.vps.length + t.sps.length + t.pps.length + t.sei.length + i.length);
        return r.set(t.vps, 0), r.set(t.sps, t.vps.length), r.set(t.pps, t.vps.length + t.sps.length), r.set(t.sei, t.vps.length + t.sps.length + t.pps.length), r.set(i, t.vps.length + t.sps.length + t.pps.length + t.sei.length), r;
      }
    };
  }, {
    "./hevc-header": 10
  }],
  12: [function (e, t, i) {
    "use strict";

    function r(e) {
      return function (e) {
        if (Array.isArray(e)) {
          for (var t = 0, i = new Array(e.length); t < e.length; t++) {
            i[t] = e[t];
          }

          return i;
        }
      }(e) || function (e) {
        if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e)) return Array.from(e);
      }(e) || function () {
        throw new TypeError("Invalid attempt to spread non-iterable instance");
      }();
    }

    var n = e("./av-common"),
        a = e("./audio-core"),
        s = e("./cache"),
        o = e("./cacheYuv"),
        l = e("../render-engine/webgl-420p"),
        h = e("../consts"),
        u = e("../version");

    t.exports = function (e) {
      var t = {
        config: {
          width: e.width || h.DEFAULT_WIDTH,
          height: e.height || h.DEFAULT_HEIGHT,
          fps: e.fps || h.DEFAULT_FPS,
          fixed: e.fixed || h.DEFAULT_FIXED,
          sampleRate: e.sampleRate || h.DEFAULT_SAMPLERATE,
          appendHevcType: e.appendHevcType || h.APPEND_TYPE_STREAM,
          frameDurMs: e.frameDur || h.DEFAULT_FRAME_DUR,
          playerId: e.playerId || h.DEFAILT_WEBGL_PLAY_ID,
          audioNone: e.audioNone || !1,
          token: e.token || null,
          videoCodec: e.videoCodec || h.CODEC_H265
        },
        vcodecerPtr: null,
        frameList: [],
        cacheInterval: null,
        cacheYuvBuf: s(30),
        nowPacket: null,
        stream: new Uint8Array(),
        audio: null,
        liveStartMs: -1,
        durationMs: -1,
        videoPTS: 0,
        loop: null,
        debugYUVSwitch: !1,
        debugID: null,
        cacheLoop: null,
        playParams: {
          seekPos: -1,
          mode: h.PLAYER_MODE_VOD,
          accurateSeek: !0,
          seekEvent: !1,
          realPlay: !0
        },
        calcuteStartTime: -1,
        fix_poc_err_skip: 0,
        frameTime: 0,
        frameTimeSec: 0,
        preCostTime: 0,
        realVolume: 1,
        isPlaying: !1,
        isCaching: h.CACHE_NO_LOADCACHE,
        isNewSeek: !1,
        flushDecoder: 0,
        isCheckDisplay: !1,
        isPlayLoadingFinish: 0,
        vCachePTS: 0,
        aCachePTS: 0,
        showScreen: !1,
        noCacheFrame: 0,
        onPlayingTime: null,
        onPlayingFinish: null,
        onSeekFinish: null,
        onLoadCache: null,
        onLoadCacheFinshed: null,
        onRender: null,
        setScreen: function setScreen() {
          var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
          null != t && (t.showScreen = e, t.canvas && (e ? t.canvas.setAttribute("hidden", !0) : t.canvas.removeAttribute("hidden")));
        },
        setSize: function setSize(e, i) {
          t.config.width = e || h.DEFAULT_WIDTH, t.config.height = i || h.DEFAULT_HEIGHT;
        },
        setFrameRate: function setFrameRate() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 25;
          t.config.fps = e, t.config.frameDurMs = 1e3 / e;
        },
        setDurationMs: function setDurationMs() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : -1;
          t.durationMs = e, 0 == t.config.audioNone && t.audio.setDurationMs(e);
        },
        setPlayingCall: function setPlayingCall(e) {
          t.onPlayingTime = e;
        },
        setVoice: function setVoice(e) {
          t.realVolume = e, 0 == t.config.audioNone && t.audio.setVoice(t.realVolume);
        },
        isPlayingState: function isPlayingState() {
          return t.isPlaying || t.isCaching === h.CACHE_WITH_PLAY_SIGN;
        },
        appendAACFrame: function appendAACFrame(e) {
          t.audio.addSample(e), t.aCachePTS = Math.max(e.pts, t.aCachePTS);
        },
        appendHevcFrame: function appendHevcFrame(e) {
          var i;
          t.config.appendHevcType == h.APPEND_TYPE_STREAM ? t.stream = new Uint8Array((i = r(t.stream)).concat.apply(i, r(e))) : t.config.appendHevcType == h.APPEND_TYPE_FRAME && (t.frameList.push(e), t.vCachePTS = Math.max(e.pts, t.vCachePTS));
        },
        getCachePTS: function getCachePTS() {
          return Math.max(t.vCachePTS, t.aCachePTS);
        },
        endAudio: function endAudio() {
          0 == t.config.audioNone && t.audio.stop();
        },
        cleanSample: function cleanSample() {
          0 == t.config.audioNone && t.audio.cleanQueue();
        },
        cleanVideoQueue: function cleanVideoQueue() {
          t.config.appendHevcType == h.APPEND_TYPE_STREAM ? t.stream = new Uint8Array() : t.config.appendHevcType == h.APPEND_TYPE_FRAME && (t.frameList = [], t.frameList.length = 0);
        },
        cleanCacheYUV: function cleanCacheYUV() {
          t.cacheYuvBuf.cleanPipeline();
        },
        pause: function pause() {
          t.loop && window.clearInterval(t.loop), t.loop = null, 0 == t.config.audioNone && t.audio.pause(), t.isPlaying = !1, t.isCaching === h.CACHE_WITH_PLAY_SIGN && (t.isCaching = h.CACHE_WITH_NOPLAY_SIGN);
        },
        checkFinished: function checkFinished() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : h.PLAYER_MODE_VOD;
          return e == h.PLAYER_MODE_VOD && t.cacheYuvBuf.yuvCache.length <= 0 && (t.videoPTS.toFixed(1) >= (t.durationMs - t.config.frameDurMs) / 1e3 || t.noCacheFrame >= 10) && (null != t.onPlayingFinish && (h.PLAYER_MODE_VOD, t.frameList.length, t.cacheYuvBuf.yuvCache.length, t.videoPTS.toFixed(1), t.durationMs, t.config.frameDurMs, t.noCacheFrame, t.onPlayingFinish()), !0);
        },
        clearAllCache: function clearAllCache() {
          t.nowPacket = null, t.vCachePTS = 0, t.aCachePTS = 0, t.cleanSample(), t.cleanVideoQueue(), t.cleanCacheYUV();
        },
        seek: function seek(e) {
          var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
              r = t.isPlaying;
          t.pause(), t.stopCacheThread(), t.clearAllCache(), e && e(), t.isNewSeek = !0, t.flushDecoder = 1, t.videoPTS = parseInt(i.seekTime);
          var n = {
            seekPos: i.seekTime || -1,
            mode: i.mode || h.PLAYER_MODE_VOD,
            accurateSeek: i.accurateSeek || !0,
            seekEvent: i.seekEvent || !0,
            realPlay: r
          };
          t.cacheThread(), t.play(n);
        },
        getNalu1Packet: function getNalu1Packet() {
          var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0],
              i = null,
              r = -1;
          if (t.config.appendHevcType == h.APPEND_TYPE_STREAM) i = t.nextNalu();else {
            if (t.config.appendHevcType != h.APPEND_TYPE_FRAME) return null;
            var n = t.frameList.shift();
            if (!n) return null;
            i = n.data, r = n.pts, e && (t.videoPTS = r);
          }
          return {
            nalBuf: i,
            pts: r
          };
        },
        decodeNalu1Frame: function decodeNalu1Frame(e, i) {
          var r = Module._malloc(e.length);

          Module.HEAP8.set(e, r);
          var n = parseInt(1e3 * i);
          Module.cwrap("decodeCodecContext", "number", ["number", "number", "number", "number", "number"])(t.vcodecerPtr, r, e.length, n, t.flushDecoder);
          return t.flushDecoder = 0, Module._free(r), !1;
        },
        cacheThread: function cacheThread() {
          t.cacheLoop = window.setInterval(function () {
            if (t.cacheYuvBuf.getState() != CACHE_APPEND_STATUS_CODE.FULL) {
              var e = t.getNalu1Packet(!1);

              if (null != e) {
                var i = e.nalBuf,
                    r = e.pts;
                t.decodeNalu1Frame(i, r, !0);
              }
            }
          }, 10);
        },
        stopCacheThread: function stopCacheThread() {
          null !== t.cacheLoop && (window.clearInterval(t.cacheLoop), t.cacheLoop = null);
        },
        loadCache: function loadCache() {
          if (!(t.frameList.length <= 3)) {
            var e = t.isPlaying;

            if (t.cacheYuvBuf.yuvCache.length <= 3) {
              t.pause(), null != t.onLoadCache && t.onLoadCache(), t.isCaching = e ? h.CACHE_WITH_PLAY_SIGN : h.CACHE_WITH_NOPLAY_SIGN;
              var i = t.frameList.length > 30 ? 30 : t.frameList.length;
              null === t.cacheInterval && (t.cacheInterval = window.setInterval(function () {
                t.cacheYuvBuf.yuvCache.length >= i && (null != t.onLoadCacheFinshed && t.onLoadCacheFinshed(), window.clearInterval(t.cacheInterval), t.cacheInterval = null, t.isCaching === h.CACHE_WITH_PLAY_SIGN && t.play(t.playParams), t.isCaching = h.CACHE_NO_LOADCACHE);
              }, 40));
            }
          }
        },
        playFunc: function playFunc() {
          var e = !1;

          if (t.playParams.seekEvent || n.GetMsTime() - t.calcuteStartTime >= t.frameTime - t.preCostTime) {
            e = !0;
            var i = !0;
            if (t.calcuteStartTime = n.GetMsTime(), t.config.audioNone) t.playFrameYUV(i, t.playParams.accurateSeek);else {
              t.fix_poc_err_skip > 0 && (t.fix_poc_err_skip--, i = !1);
              var r = t.videoPTS - t.audio.getAlignVPTS();
              if (r > 0) return void (t.playParams.seekEvent && !t.config.audioNone && t.audio.setVoice(0));

              if (i) {
                if (!(i = -1 * r <= 1 * t.frameTimeSec)) {
                  for (var a = parseInt(r / t.frameTimeSec), s = 0; s < a; s++) {
                    t.playFrameYUV(!1, t.playParams.accurateSeek);
                  }

                  t.playFrameYUV(!0, t.playParams.accurateSeek);
                }

                t.playFrameYUV(i, t.playParams.accurateSeek);
              }
            }
          }

          return t.playParams.seekEvent && (t.playParams.seekEvent = !1, t.onSeekFinish(), t.isPlaying || (t.playFrameYUV(!0, t.playParams.accurateSeek), t.pause()), t.config.audioNone || t.audio.setVoice(t.realVolume)), t.onPlayingTime && t.onPlayingTime(t.videoPTS), t.checkFinished(t.playParams.mode), e;
        },
        play: function play(e) {
          if (t.playParams = e, t.calcuteStartTime = n.GetMsTime(), t.noCacheFrame = 0, t.isPlaying = t.playParams.realPlay, !0 === t.config.audioNone && t.playParams.mode == h.PLAYER_MODE_NOTIME_LIVE) {
            t.liveStartMs = n.GetMsTime(), t.frameTime = Math.floor(1e3 / t.config.fps), t.frameTimeSec = t.frameTime / 1e3;
            var i = 0;
            t.loop = window.setInterval(function () {
              (n.GetMsTime() - t.liveStartMs) / t.frameTime >= i && (t.playFrameYUV(!0, t.playParams.accurateSeek), i += 1);
            }, 1);
          } else t.videoPTS >= t.playParams.seekPos && !t.isNewSeek || 0 === t.playParams.seekPos || 0 === t.playParams.seekPos ? (t.frameTime = 1e3 / t.config.fps, t.frameTimeSec = t.frameTime / 1e3, 0 == t.config.audioNone && t.audio.play(), t.realVolume = t.config.audioNone ? 0 : t.audio.voice, t.playParams.seekEvent && (t.fix_poc_err_skip = 10), t.loop = window.setInterval(function () {
            var e = n.GetMsTime();
            t.playFunc(), t.preCostTime = n.GetMsTime() - e;
          }, 1)) : (t.loop = window.setInterval(function () {
            t.playFrameYUV(!1, t.playParams.accurateSeek), t.checkFinished(t.playParams.mode) ? (window.clearInterval(t.loop), t.loop = null) : t.videoPTS >= t.playParams.seekPos && (window.clearInterval(t.loop), t.loop = null, t.play(t.playParams));
          }, 1), t.isNewSeek = !1);
        },
        stop: function stop() {
          t.release(), Module.cwrap("initializeDecoder", "number", ["number"])(t.vcodecerPtr), t.stream = new Uint8Array();
        },
        release: function release() {
          return t.endAudio(), t.cacheLoop && window.clearInterval(t.cacheLoop), t.cacheLoop = null, t.loop && window.clearInterval(t.loop), t.loop = null, t.pause(), Module.cwrap("release", "number", ["number"])(t.vcodecerPtr), t.stream = null, t.frameList.length = 0, t.durationMs = -1, t.videoPTS = 0, t.isPlaying = !1, !0;
        },
        nextNalu: function nextNalu() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
          if (t.stream.length <= 4) return !1;

          for (var i = -1, r = 0; r < t.stream.length; r++) {
            if (r + 5 >= t.stream.length) {
              if (-1 == i) return !1;
              var n = t.stream.subarray(i);
              return t.stream = new Uint8Array(), n;
            }

            var a = "0 0 1" == t.stream.slice(0, 3).join(" "),
                s = "0 0 0 1" == t.stream.slice(0, 4).join(" ");

            if (a || s) {
              if (-1 == i) i = r;else {
                if (e <= 1) {
                  var o = t.stream.subarray(i, r);
                  return t.stream = t.stream.subarray(r), o;
                }

                e -= 1;
              }
              r += 3;
            }
          }

          return !1;
        },
        decodeSendPacket: function decodeSendPacket(e) {
          var i = Module._malloc(e.length);

          Module.HEAP8.set(e, i);
          var r = Module.cwrap("decodeSendPacket", "number", ["number", "number", "number"])(t.vcodecerPtr, i, e.length);
          return Module._free(i), r;
        },
        decodeRecvFrame: function decodeRecvFrame() {
          return Module.cwrap("decodeRecv", "number", ["number"])(t.vcodecerPtr);
        },
        playFrameYUV: function playFrameYUV() {
          var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
              i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
              r = t.cacheYuvBuf.vYuv();
          if (null == r) return t.noCacheFrame += 1, e && !t.playParams.seekEvent && t.loadCache(), !1;
          t.noCacheFrame = 0;
          var n = r.pts;
          return t.videoPTS = n, (!e && i || e) && e && t.drawImage(r.width, r.height, r.imageBufferY, r.imageBufferB, r.imageBufferR), e && !t.playParams.seekEvent && t.isPlaying && t.loadCache(), !0;
        },
        drawImage: function drawImage(e, i, r, n, a) {
          if (t.canvas.width === e && t.canvas.height == i || (t.canvas.width = e, t.canvas.height = i), t.showScreen && null != t.onRender) t.onRender(e, i, r, n, a);else {
            if (!t.isCheckDisplay) t.checkDisplaySize(e, i);
            var s = e * i,
                o = e / 2 * (i / 2),
                h = new Uint8Array(s + 2 * o);
            h.set(r, 0), h.set(n, s), h.set(a, s + o), l.renderFrame(t.yuv, r, n, a, e, i);
          }
        },
        debugYUV: function debugYUV(e) {
          t.debugYUVSwitch = !0, t.debugID = e;
        },
        checkDisplaySize: function checkDisplaySize(e, i) {
          var r = e / t.config.width > i / t.config.height,
              n = (t.config.width / e).toFixed(2),
              a = (t.config.height / i).toFixed(2),
              s = r ? n : a,
              o = t.config.fixed,
              l = o ? t.config.width : parseInt(e * s),
              h = o ? t.config.height : parseInt(i * s);

          if (t.canvas.offsetWidth != l || t.canvas.offsetHeight != h) {
            var u = parseInt((t.canvasBox.offsetHeight - h) / 2),
                d = parseInt((t.canvasBox.offsetWidth - l) / 2);
            t.canvas.style.marginTop = u + "px", t.canvas.style.marginLeft = d + "px", t.canvas.style.width = l + "px", t.canvas.style.height = h + "px";
          }

          return t.isCheckDisplay = !0, [l, h];
        },
        makeWasm: function makeWasm() {
          if (null != t.config.token) {
            t.vcodecerPtr = Module.cwrap("registerPlayer", "number", ["string", "string"])(t.config.token, u.PLAYER_VERSION);
            var e = Module.addFunction(function (e, i, r, n, a, s, l, h, u) {
              var d = Module.HEAPU8.subarray(e, e + n * h),
                  f = Module.HEAPU8.subarray(i, i + a * h / 2),
                  c = Module.HEAPU8.subarray(r, r + s * h / 2),
                  p = new Uint8Array(d),
                  m = new Uint8Array(f),
                  _ = new Uint8Array(c),
                  y = 1 * u / 1e3,
                  g = new o.CacheYuvStruct(y, n, h, p, m, _);

              t.cacheYuvBuf.appendCacheByCacheYuv(g);
            });
            Module.cwrap("setCodecType", "number", ["number", "number", "number"])(t.vcodecerPtr, t.config.videoCodec, e);
            Module.cwrap("initMissile", "number", ["number"])(t.vcodecerPtr);
            Module.cwrap("initializeDecoder", "number", ["number"])(t.vcodecerPtr);
          }
        },
        makeIt: function makeIt() {
          var e = document.querySelector("div#" + t.config.playerId),
              i = document.createElement("canvas");
          i.style.width = e.clientWidth + "px", i.style.height = e.clientHeight + "px", i.style.top = "0px", i.style.left = "0px", e.appendChild(i), t.canvasBox = e, t.canvas = i, t.yuv = l.setupCanvas(i, {
            preserveDrawingBuffer: !1
          }), 0 == t.config.audioNone && (t.audio = a({
            sampleRate: t.config.sampleRate,
            appendType: t.config.appendHevcType
          })), t.isPlayLoadingFinish = 1;
        }
      };
      return t.makeWasm(), t.makeIt(), t.cacheThread(), t;
    };
  }, {
    "../consts": 2,
    "../render-engine/webgl-420p": 24,
    "../version": 27,
    "./audio-core": 3,
    "./av-common": 5,
    "./cache": 8,
    "./cacheYuv": 9
  }],
  13: [function (e, t, i) {
    "use strict";

    var r = e("./bufferFrame");

    t.exports = function () {
      var e = {
        videoBuffer: [],
        audioBuffer: [],
        idrIdxBuffer: [],
        appendFrame: function appendFrame(t, i) {
          var n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2],
              a = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
              s = new r.BufferFrame(t, a, i, n),
              o = parseInt(t);
          return n ? (e.videoBuffer.length - 1 >= o ? e.videoBuffer[o].push(s) : e.videoBuffer.push([s]), a && !e.idrIdxBuffer.includes(t) && e.idrIdxBuffer.push(t)) : e.audioBuffer.length - 1 >= o && null != e.audioBuffer[o] && null != e.audioBuffer[o] ? e.audioBuffer[o] && e.audioBuffer[o].push(s) : e.audioBuffer.push([s]), !0;
        },
        appendFrameWithDts: function appendFrameWithDts(t, i, n) {
          var a = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
              s = arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
              o = r.ConstructWithDts(t, i, s, n, a),
              l = parseInt(i);
          return a ? (e.videoBuffer.length - 1 >= l ? e.videoBuffer[l].push(o) : e.videoBuffer.push([o]), s && !e.idrIdxBuffer.includes(i) && e.idrIdxBuffer.push(i)) : e.audioBuffer.length - 1 >= l && null != e.audioBuffer[l] && null != e.audioBuffer[l] ? e.audioBuffer[l] && e.audioBuffer[l].push(o) : e.audioBuffer.push([o]), !0;
        },
        appendFrameByBufferFrame: function appendFrameByBufferFrame(t) {
          var i = t.pts,
              r = parseInt(i);
          return t.video ? (e.videoBuffer.length - 1 >= r ? e.videoBuffer[r].push(t) : e.videoBuffer.push([t]), isKey && !e.idrIdxBuffer.includes(i) && e.idrIdxBuffer.push(i)) : e.audioBuffer.length - 1 >= r ? e.audioBuffer[r].push(t) : e.audioBuffer.push([t]), !0;
        },
        cleanPipeline: function cleanPipeline() {
          e.videoBuffer.length = 0, e.audioBuffer.length = 0;
        },
        vFrame: function vFrame() {
          var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : -1;
          if (!(t < 0 || t > e.videoBuffer.length - 1)) return e.videoBuffer[t];
        },
        aFrame: function aFrame() {
          var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : -1;
          if (!(t < 0 || t > e.audioBuffer.length - 1)) return e.audioBuffer[t];
        },
        seekIDR: function seekIDR() {
          var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : -1;
          if (e.idrIdxBuffer, e.videoBuffer, t < 0) return null;
          if (e.idrIdxBuffer.includes(t)) return t;

          for (var i = 0; i < e.idrIdxBuffer.length; i++) {
            if (i === e.idrIdxBuffer.length - 1 || e.idrIdxBuffer[i] < t && e.idrIdxBuffer[i + 1] > t || 0 === i && e.idrIdxBuffer[i] >= t) {
              for (var r = 1; r >= 0; r--) {
                var n = i - r;
                if (n >= 0) return e.idrIdxBuffer[n], e.idrIdxBuffer[n];
              }

              return e.idrIdxBuffer[i], j, e.idrIdxBuffer[i];
            }
          }
        }
      };
      return e;
    };
  }, {
    "./bufferFrame": 14
  }],
  14: [function (e, t, i) {
    "use strict";

    function r(e, t) {
      for (var i = 0; i < t.length; i++) {
        var r = t[i];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
      }
    }

    var n = function () {
      function e(t, i, r, n) {
        !function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }(this, e), this.pts = t, this.dts = t, this.isKey = i, this.data = r, this.video = n;
      }

      var t, i, n;
      return t = e, (i = [{
        key: "setFrame",
        value: function value(e, t, i, r) {
          this.pts = e, this.isKey = t, this.data = i, this.video = r;
        }
      }]) && r(t.prototype, i), n && r(t, n), e;
    }();

    i.BufferFrame = n, i.ConstructWithDts = function (e, t, i, r, a) {
      var s = new n(e, i, r, a);
      return s.dts = t, s;
    };
  }, {}],
  15: [function (e, t, i) {
    "use strict";

    function r(e, t) {
      for (var i = 0; i < t.length; i++) {
        var r = t[i];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
      }
    }

    var n = e("./m3u8base"),
        a = e("./mpegts/mpeg.js"),
        s = e("./bufferFrame"),
        o = e("./buffer"),
        l = e("../decoder/hevc-imp"),
        h = e("../consts"),
        u = function () {
      function e() {
        !function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }(this, e), this.hls = new n.M3u8Base(), this.mpegTsObj = new a.MPEG_JS({}), this.mpegTsWasmState = !1, this.mpegTsWasmRetryLoadTimes = 0, this.tsList = [], this.vStartTime = 0, this.aStartTime = 0, this.lockWait = {
          state: !1,
          lockMember: {
            dur: 0
          }
        }, this.timerFeed = null, this.timerTsWasm = null, this.seekPos = -1, this.vPreFramePTS = 0, this.aPreFramePTS = 0, this.audioNone = !1, this.isHevcParam = !1, this.vCodec = !1, this.aCodec = !1, this.aChannel = 0, this.durationMs = -1, this.bufObject = o(), this.fps = -1, this.sampleRate = -1, this.size = {
          width: -1,
          height: -1
        }, this.mediaInfo = null, this.extensionInfo = null, this.onReadyOBJ = null, this.onFinished = null, this.onDemuxed = null, this.onSamples = null, this.onCacheProcess = null;
      }

      var t, i, u;
      return t = e, (i = [{
        key: "getCachePTS",
        value: function value() {
          return Math.max(this.vPreFramePTS, this.aPreFramePTS);
        }
      }, {
        key: "demux",
        value: function value(e) {
          var t = this,
              i = this;
          this.vPreFramePTS = 0, this.aPreFramePTS = 0, this.hls.onTransportStream = function (e, t) {
            i.lockWait.state, i.tsList.length, i.tsList.push({
              streamURI: e,
              streamDur: t
            });
          }, this.hls.onFinished = function (e) {
            e.type == h.PLAYER_IN_TYPE_M3U8_VOD ? i.durationMs = 1e3 * e.duration : i.durationMs = -1, null != i.onFinished && i.onFinished(i.onReadyOBJ, e);
          }, this.mpegTsObj.onDemuxedFailed = function (e, t) {
            console.error("onDemuxedFailed: ", e, t), i.lockWait.state = !1;
          }, this.mpegTsObj.onDemuxed = function () {
            null == i.mediaInfo && (i.mediaInfo = i.mpegTsObj.readMediaInfo(), i.mediaInfo, i.isHevcParam = i.mpegTsObj.isHEVC(), i.vCodec = i.mpegTsObj.vCodec, i.aCodec = i.mediaInfo.aCodec, i.aChannel = i.mediaInfo.sampleChannel, i.fps = i.mediaInfo.vFps, i.sampleRate = i.mediaInfo.sampleRate, (null === i.aCodec || "" === i.aCodec || i.aChannel <= 0) && (i.audioNone = !0)), null == i.extensionInfo && (i.extensionInfo = i.mpegTsObj.readExtensionInfo(), i.extensionInfo.vWidth > 0 && i.extensionInfo.vHeight > 0 && (i.size.width = i.extensionInfo.vWidth, i.size.height = i.extensionInfo.vHeight)), i.mediaInfo.duration, null != i.onDemuxed && i.onDemuxed(i.onReadyOBJ);

            for (var e = !1; void 0 !== i.mpegTsObj && null !== i.mpegTsObj;) {
              var r = i.mpegTsObj.readPacket();
              if (r.size <= 0) break;
              var n = r.dtime > 0 ? r.dtime : r.ptime;

              if (!(n < 0)) {
                if (0 == r.type) {
                  n <= i.vPreFramePTS && (e = !0);
                  var a = l.PACK_NALU(r.layer),
                      o = 1 == r.keyframe,
                      h = 1 == e ? n + i.vStartTime : n,
                      u = new s.BufferFrame(h, o, a, !0);
                  i.bufObject.appendFrame(u.pts, u.data, !0, u.isKey), i.vPreFramePTS = h, null != i.onSamples && i.onSamples(i.onReadyOBJ, u);
                } else if (n <= i.aPreFramePTS && (e = !0), "aac" == i.mediaInfo.aCodec) for (var d = r.data, f = 0; f < d.length; f++) {
                  var c = d[f],
                      p = 1 == e ? c.ptime + i.vStartTime : n,
                      m = new s.BufferFrame(p, !0, c.data, !1);
                  i.bufObject.appendFrameByBufferFrame(m), i.aPreFramePTS = p, null != i.onSamples && i.onSamples(i.onReadyOBJ, m);
                } else {
                  var _ = 1 == e ? n + i.vStartTime : n,
                      y = new s.BufferFrame(_, !0, r.data, !1);

                  i.bufObject.appendFrameByBufferFrame(y), i.aPreFramePTS = _, null != i.onSamples && i.onSamples(i.onReadyOBJ, y);
                }

                t.onCacheProcess && t.onCacheProcess(t.getCachePTS());
              }
            }

            i.vStartTime += parseFloat(i.lockWait.lockMember.dur), i.aStartTime += parseFloat(i.lockWait.lockMember.dur), i.vStartTime, i.lockWait.state = !1;
          }, this.mpegTsObj.onReady = function () {
            i._onTsReady(e);
          }, i.mpegTsObj.initDemuxer(), this.timerTsWasm = window.setInterval(function () {
            i.mpegTsWasmState ? (window.clearInterval(i.timerTsWasm), i.timerTsWasm = null) : i.mpegTsWasmRetryLoadTimes >= 3 ? (i._onTsReady(e), window.clearInterval(i.timerTsWasm), i.timerTsWasm = null) : (i.mpegTsWasmRetryLoadTimes += 1, i.mpegTsObj.initDemuxer());
          }, 3e3);
        }
      }, {
        key: "_onTsReady",
        value: function value(e) {
          var t = this;
          t.hls.fetchM3u8(e), t.mpegTsWasmState = !0, t.timerFeed = window.setInterval(function () {
            if (t.tsList.length > 0 && 0 == t.lockWait.state) try {
              var e = t.tsList.shift();

              if (null != e) {
                var i = e.streamURI,
                    r = e.streamDur;
                t.lockWait.state = !0, t.lockWait.lockMember.dur = r, t.mpegTsObj.isLive = t.hls.isLive(), t.mpegTsObj.demuxURL(i);
              } else console.error("_onTsReady need wait ");
            } catch (e) {
              console.error("onTsReady ERROR:", e), t.lockWait.state = !1;
            }
          }, 50);
        }
      }, {
        key: "release",
        value: function value() {
          this.hls && this.hls.release(), this.hls = null, this.timerFeed && window.clearInterval(this.timerFeed), this.timerFeed = null, this.timerTsWasm && window.clearInterval(this.timerTsWasm), this.timerTsWasm = null;
        }
      }, {
        key: "bindReady",
        value: function value(e) {
          this.onReadyOBJ = e;
        }
      }, {
        key: "popBuffer",
        value: function value() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1,
              t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : -1;
          return t < 0 ? null : 1 === e ? t + 1 > this.bufObject.videoBuffer.length ? null : this.bufObject.vFrame(t) : 2 === e ? t + 1 > this.bufObject.audioBuffer.length ? null : this.bufObject.aFrame(t) : void 0;
        }
      }, {
        key: "getVLen",
        value: function value() {
          return this.bufObject.videoBuffer.length;
        }
      }, {
        key: "getALen",
        value: function value() {
          return this.bufObject.audioBuffer.length;
        }
      }, {
        key: "getLastIdx",
        value: function value() {
          return this.bufObject.videoBuffer.length - 1;
        }
      }, {
        key: "getALastIdx",
        value: function value() {
          return this.bufObject.audioBuffer.length - 1;
        }
      }, {
        key: "getACodec",
        value: function value() {
          return this.aCodec;
        }
      }, {
        key: "getVCodec",
        value: function value() {
          return this.vCodec;
        }
      }, {
        key: "getDurationMs",
        value: function value() {
          return this.durationMs;
        }
      }, {
        key: "getFPS",
        value: function value() {
          return this.fps;
        }
      }, {
        key: "getSampleRate",
        value: function value() {
          return this.sampleRate;
        }
      }, {
        key: "getSampleChannel",
        value: function value() {
          return this.aChannel;
        }
      }, {
        key: "getSize",
        value: function value() {
          return this.size;
        }
      }, {
        key: "seek",
        value: function value(e) {
          if (e >= 0) {
            var t = this.bufObject.seekIDR(e);
            this.seekPos = t;
          }
        }
      }]) && r(t.prototype, i), u && r(t, u), e;
    }();

    i.M3u8 = u;
  }, {
    "../consts": 2,
    "../decoder/hevc-imp": 11,
    "./buffer": 13,
    "./bufferFrame": 14,
    "./m3u8base": 16,
    "./mpegts/mpeg.js": 20
  }],
  16: [function (e, t, i) {
    "use strict";

    function r(e, t) {
      for (var i = 0; i < t.length; i++) {
        var r = t[i];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
      }
    }

    var n = e("../consts"),
        a = [/#EXT-X-PROGRAM-DATE-TIME.+\n/g],
        s = {
      lineDelimiter: /\r?\n/,
      extensionHeader: "#EXTM3U",
      tagPrefix: "#EXT",
      segmentPrefix: "#EXTINF",
      segmentParse: /^#EXTINF: *([0-9.]+)(, *(.+?)?)?$/,
      tagParse: /^#EXT-X-([A-Z-]+)(:(.+))?$/,
      version: "VERSION",
      allowCache: "ALLOW-CACHE",
      combined: "COMBINED",
      endList: "ENDLIST",
      targetDuration: "TARGETDURATION",
      mediaSequence: "MEDIA-SEQUENCE",
      discontinuity: "DISCONTINUITY",
      streamInf: "STREAM-INF",
      isComment: function isComment(e) {
        return e && "#" === e[0] && !e.startsWith(s.tagPrefix);
      },
      isBlank: function isBlank(e) {
        return "" === e;
      },
      canStrip: function canStrip(e) {
        return s.isBlank(e) || s.isComment(e);
      },
      defaultMinDur: 99999,
      hlsSliceLimit: 100
    },
        o = function () {
      function e() {
        !function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }(this, e), this.initState = !0, this.controller = new AbortController(), this._slices = [], this._type = n.PLAYER_IN_TYPE_M3U8_LIVE, this._preURI = "", this.duration = -1, this.onTransportStream = null, this.onFinished = null;
      }

      var t, i, o;
      return t = e, (i = [{
        key: "isLive",
        value: function value() {
          return this._type === n.PLAYER_IN_TYPE_M3U8_LIVE ? 1 : 0;
        }
      }, {
        key: "release",
        value: function value() {
          this.initState = !1;
        }
      }, {
        key: "fetchM3u8",
        value: function value(e) {
          var t = this,
              i = this;
          this.initState && fetch(e).then(function (e) {
            return e.text();
          }).then(function (t) {
            return 1 == i._uriParse(e) ? i._m3u8Parse(t) : null;
          }).then(function (r) {
            null != r && !1 !== r && !0 !== r && t._type == n.PLAYER_IN_TYPE_M3U8_LIVE && setTimeout(function () {
              i.fetchM3u8(e);
            }, 500 * r);
          })["catch"](function (t) {
            console.error("fetchM3u8 ERROR fetch ERROR ==> ", t), setTimeout(function () {
              i.fetchM3u8(e);
            }, 500);
          });
        }
      }, {
        key: "_uriParse",
        value: function value(e) {
          this._preURI = "";
          var t = e.split("//"),
              i = null,
              r = null;
          if (t.length < 1) return !1;
          t.length > 1 ? (i = t[0], r = t[1].split("/"), this._preURI = i + "//") : r = t[0].split("/");

          for (var n = 0; n < r.length - 1; n++) {
            this._preURI += r[n] + "/";
          }

          return !0;
        }
      }, {
        key: "_m3u8Parse",
        value: function value(e) {
          for (var t = e, i = 0; i < a.length; i++) {
            t = e.replace(a[i], "");
          }

          for (var r = t.split(s.lineDelimiter), o = s.defaultMinDur, l = "", h = 0; h < r.length; h++) {
            var u = r[h];

            if (!(u.length < 1)) {
              if (null != l && "" !== l) switch (l) {
                case s.version:
                case s.mediaSequence:
                case s.allowCache:
                case s.discontinuity:
                case s.targetDuration:
                case s.combined:
                  break;

                case s.streamInf:
                  return this.fetchM3u8(u), null;
              }

              var d = this._readTag(u);

              if (null != d) switch (l = d.key, d.key) {
                case s.version:
                case s.mediaSequence:
                case s.allowCache:
                case s.discontinuity:
                case s.targetDuration:
                case s.combined:
                case s.streamInf:
                  break;

                case s.endList:
                  if (this._type = n.PLAYER_IN_TYPE_M3U8_VOD, null != this.onFinished) {
                    var f = {
                      type: this._type,
                      duration: this.duration
                    };
                    this.onFinished(f);
                  }

                  return !0;

                default:
                  d.key;
              }
              var c = s.segmentParse.exec(u);

              if (null != c) {
                var p = c[1];
                this.duration += parseFloat(c[1]), o > p && (o = p);
                var m = r[h += 1],
                    _ = null;
                _ = m.indexOf("http") >= 0 ? m : this._preURI + m, this._slices.indexOf(_) < 0 && (this._slices.push(_), this._slices[this._slices.length - 1], null != this.onTransportStream && this.onTransportStream(_, p));
              }
            }
          }

          if (this._slices.length > s.hlsSliceLimit && this._type == n.PLAYER_IN_TYPE_M3U8_LIVE && (this._slices = this._slices.slice(-1 * s.hlsSliceLimit)), null != this.onFinished) {
            var y = {
              type: this._type,
              duration: -1
            };
            this.onFinished(y);
          }

          return o;
        }
      }, {
        key: "_readTag",
        value: function value(e) {
          var t = s.tagParse.exec(e);
          return null !== t ? {
            key: t[1],
            value: t[3]
          } : null;
        }
      }]) && r(t.prototype, i), o && r(t, o), e;
    }();

    i.M3u8Base = o;
  }, {
    "../consts": 2
  }],
  17: [function (e, t, i) {
    "use strict";

    var r = e("mp4box"),
        n = e("../decoder/hevc-header"),
        a = e("../decoder/hevc-imp"),
        s = e("./buffer"),
        o = e("../consts"),
        l = {
      96e3: 0,
      88200: 1,
      64e3: 2,
      48e3: 3,
      44100: 4,
      32e3: 5,
      24e3: 6,
      22050: 7,
      16e3: 8,
      12e3: 9,
      11025: 10,
      8e3: 11,
      7350: 12,
      Reserved: 13,
      "frequency is written explictly": 15
    },
        h = function h(e) {
      for (var t = [], i = 0; i < e.length; i++) {
        t.push(e[i].toString(16));
      }

      return t;
    };

    function u() {}

    u.prototype.setStartCode = function (e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
          i = null;
      return t ? ((i = e)[0] = n.DEFINE_STARTCODE[0], i[1] = n.DEFINE_STARTCODE[1], i[2] = n.DEFINE_STARTCODE[2], i[3] = n.DEFINE_STARTCODE[3]) : ((i = new Uint8Array(n.DEFINE_STARTCODE.length + e.length)).set(n.DEFINE_STARTCODE, 0), i.set(e, n.DEFINE_STARTCODE.length)), i;
    }, u.prototype.setAACAdts = function (e) {
      var t = null,
          i = this.aacProfile,
          r = l[this.sampleRate],
          n = new Uint8Array(7),
          a = n.length + e.length;
      return n[0] = 255, n[1] = 241, n[2] = (i - 1 << 6) + (r << 2) + 0, n[3] = 128 + (a >> 11), n[4] = (2047 & a) >> 3, n[5] = 31 + ((7 & a) << 5), n[6] = 252, (t = new Uint8Array(a)).set(n, 0), t.set(e, n.length), t;
    }, u.prototype.demux = function () {
      var e = this;
      e.seekPos = -1, e.mp4boxfile = r.createFile(), e.movieInfo = null, e.videoCodec = null, e.durationMs = -1, e.fps = -1, e.sampleRate = -1, e.aacProfile = 2, e.size = {
        width: -1,
        height: -1
      }, e.bufObject = s(), e.audioNone = !1, e.naluHeader = {
        vps: null,
        sps: null,
        pps: null,
        sei: null
      }, e.mp4boxfile.onError = function (e) {}, this.mp4boxfile.onReady = function (t) {
        for (var i in e.movieInfo = t, t.tracks) {
          "VideoHandler" !== t.tracks[i].name && "video" !== t.tracks[i].type || (t.tracks[i].codec, t.tracks[i].codec.indexOf("hev") >= 0 || t.tracks[i].codec.indexOf("hvc") >= 0 ? e.videoCodec = o.CODEC_H265 : t.tracks[i].codec.indexOf("avc") >= 0 && (e.videoCodec = o.CODEC_H264));
        }

        var r = -1;

        if (r = t.videoTracks[0].samples_duration / t.videoTracks[0].timescale, e.durationMs = 1e3 * r, e.fps = t.videoTracks[0].nb_samples / r, e.seekDiffTime = 1 / e.fps, e.size.width = t.videoTracks[0].track_width, e.size.height = t.videoTracks[0].track_height, t.audioTracks.length > 0) {
          e.sampleRate = t.audioTracks[0].audio.sample_rate;
          var n = t.audioTracks[0].codec.split(".");
          e.aacProfile = n[n.length - 1];
        } else e.audioNone = !0;

        null != e.onMp4BoxReady && e.onMp4BoxReady(e.videoCodec), e.videoCodec === o.CODEC_H265 ? (e.initializeAllSourceBuffers(), e.mp4boxfile.start()) : (e.videoCodec, o.CODEC_H264);
      }, e.mp4boxfile.onSamples = function (t, i, r) {
        var s = window.setInterval(function () {
          for (var i = 0; i < r.length; i++) {
            var l = r[i],
                u = l.data,
                d = null;

            if (!(null == u || u.length < 4) && u) {
              var f = l.dts / l.timescale;

              if (1 === t) {
                var c = null,
                    p = l.is_sync;

                if (e.videoCodec === o.CODEC_H265) {
                  c = l.description.hvcC;
                  var m = a.GET_NALU_TYPE(u[4]);
                  p || (p = m == n.DEFINE_KEY_FRAME || l.is_sync);
                } else e.videoCodec === o.CODEC_H264 && (c = l.description.avcC);

                if (p) {
                  if (e.videoCodec == o.CODEC_H265) {
                    var _ = c.nalu_arrays;
                    e.naluHeader.vps = e.setStartCode(_[0][0].data, !1), e.naluHeader.sps = e.setStartCode(_[1][0].data, !1), e.naluHeader.pps = e.setStartCode(_[2][0].data, !1), _.length > 3 ? e.naluHeader.sei = e.setStartCode(_[3][0].data, !1) : e.naluHeader.sei = new Uint8Array(), e.naluHeader;
                  } else e.videoCodec == o.CODEC_H264 && (e.naluHeader.vps = new Uint8Array(), e.naluHeader.sps = e.setStartCode(c.SPS[0].nalu, !1), e.naluHeader.pps = e.setStartCode(c.PPS[0].nalu, !1), e.naluHeader.sei = new Uint8Array());

                  u[4].toString(16), e.naluHeader.vps[4].toString(16), h(e.naluHeader.vps), h(u);
                  var y = e.setStartCode(u.subarray(0, e.naluHeader.vps.length), !0);

                  if (h(y), u[4] === e.naluHeader.vps[4]) {
                    var g = e.naluHeader.vps.length + 4,
                        v = e.naluHeader.vps.length + e.naluHeader.sps.length + 4,
                        b = e.naluHeader.vps.length + e.naluHeader.sps.length + e.naluHeader.pps.length + 4;

                    if (e.naluHeader.sei.length <= 0 && e.naluHeader.sps.length > 0 && u[g] === e.naluHeader.sps[4] && e.naluHeader.pps.length > 0 && u[v] === e.naluHeader.pps[4] && 78 === u[b]) {
                      u[e.naluHeader.vps.length + 4], e.naluHeader.sps[4], u[e.naluHeader.vps.length + e.naluHeader.sps.length + 4], e.naluHeader.pps[4], u[e.naluHeader.vps.length + e.naluHeader.sps.length + e.naluHeader.pps.length + 4];

                      for (var S = 0, E = 0; E < u.length; E++) {
                        if (u[E] === n.SOURCE_CODE_SEI_END && a.GET_NALU_TYPE(u[E + 5]) === n.DEFINE_KEY_FRAME) {
                          S = E;
                          break;
                        }
                      }

                      u[3] = 1, u[g - 1] = 1, u[v - 1] = 1, u[b - 1] = 1, u[2] = 0, u[g - 2] = 0, u[v - 2] = 0, u[b - 2] = 0, u[1] = 0, u[g - 3] = 0, u[v - 3] = 0, u[b - 3] = 0, u[S + 1] = 0, u[S + 2] = 0, u[S + 3] = 0, u[S + 4] = 1, e.naluHeader.vps = null, e.naluHeader.sps = null, e.naluHeader.pps = null, e.naluHeader.vps = new Uint8Array(), e.naluHeader.sps = new Uint8Array(), e.naluHeader.pps = new Uint8Array();
                    } else u[4].toString(16), e.naluHeader.vps[4].toString(16), h(e.naluHeader.vps), h(u), u = u.subarray(e.naluHeader.vps.length + e.naluHeader.sps.length + e.naluHeader.pps.length + e.naluHeader.sei.length);
                  } else if (e.naluHeader.sei.length > 4 && u[4] === e.naluHeader.sei[4]) {
                    var A = u.subarray(0, 10),
                        P = new Uint8Array(e.naluHeader.vps.length + A.length);
                    P.set(A, 0), P.set(e.naluHeader.vps, A.length), P[3] = 1, e.naluHeader.vps = null, e.naluHeader.vps = new Uint8Array(P), P = null, A = null, (u = u.subarray(10))[4], e.naluHeader.vps[4], e.naluHeader.vps;
                  } else if (0 === e.naluHeader.sei.length && 78 === u[4]) {
                    u = e.setStartCode(u, !0);

                    for (var w = 0, x = 0; x < u.length; x++) {
                      if (u[x] === n.SOURCE_CODE_SEI_END && a.GET_NALU_TYPE(u[x + 5]) === n.DEFINE_KEY_FRAME) {
                        w = x;
                        break;
                      }
                    }

                    e.naluHeader.sei = u.subarray(0, w + 1), u = new Uint8Array(u.subarray(w + 1)), e.naluHeader.sei;
                  }

                  h(e.naluHeader.vps), h(e.naluHeader.sps), h(e.naluHeader.pps), h(e.naluHeader.sei), h(u), (d = new Uint8Array(e.naluHeader.vps.length + e.naluHeader.sps.length + e.naluHeader.pps.length + e.naluHeader.sei.length + u.length)).set(e.naluHeader.vps, 0), d.set(e.naluHeader.sps, e.naluHeader.vps.length), d.set(e.naluHeader.pps, e.naluHeader.vps.length + e.naluHeader.sps.length), d.set(e.naluHeader.sei, e.naluHeader.vps.length + e.naluHeader.sps.length + e.naluHeader.pps.length), d.set(e.setStartCode(u, !0), e.naluHeader.vps.length + e.naluHeader.sps.length + e.naluHeader.pps.length + e.naluHeader.sei.length);
                } else d = e.setStartCode(u, !0);

                e.bufObject.appendFrame(f, d, !0, p);
              } else 2 == t && (d = e.setAACAdts(u), e.bufObject.appendFrame(f, d, !1, !0));
            }
          }

          window.clearInterval(s), s = null;
        }, 0);
      };
    }, u.prototype.appendBufferData = function (e) {
      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
      return e.fileStart = t, this.mp4boxfile.appendBuffer(e);
    }, u.prototype.finishBuffer = function () {
      this.mp4boxfile.flush();
    }, u.prototype.play = function () {}, u.prototype.getVideoCoder = function () {
      return this.videoCodec;
    }, u.prototype.getDurationMs = function () {
      return this.durationMs;
    }, u.prototype.getFPS = function () {
      return this.fps;
    }, u.prototype.getSampleRate = function () {
      return this.sampleRate;
    }, u.prototype.getSize = function () {
      return this.size;
    }, u.prototype.seek = function (e) {
      if (e >= 0) {
        var t = this.bufObject.seekIDR(e);
        this.seekPos = t;
      }
    }, u.prototype.popBuffer = function () {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1,
          t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : -1;
      return t < 0 ? null : 1 == e ? this.bufObject.vFrame(t) : 2 == e ? this.bufObject.aFrame(t) : void 0;
    }, u.prototype.addBuffer = function (e) {
      var t = e.id;
      this.mp4boxfile.setExtractionOptions(t);
    }, u.prototype.initializeAllSourceBuffers = function () {
      if (this.movieInfo) {
        for (var e = this.movieInfo, t = 0; t < e.tracks.length; t++) {
          var i = e.tracks[t];
          this.addBuffer(i);
        }

        this.initializeSourceBuffers();
      }
    }, u.prototype.onInitAppended = function (e) {
      var t = e.target;
      "open" === t.ms.readyState && (t.sampleNum = 0, t.removeEventListener("updateend", this.onInitAppended), t.ms.pendingInits--, 0 === t.ms.pendingInits && this.mp4boxfile.start());
    }, u.prototype.initializeSourceBuffers = function () {
      for (var e = this.mp4boxfile.initializeSegmentation(), t = 0; t < e.length; t++) {
        var i = e[t].user;
        0 === t && (i.ms.pendingInits = 0), i.addEventListener("updateend", this.onInitAppended), i.appendBuffer(e[t].buffer), i.segmentIndex = 0, i.ms.pendingInits++;
      }
    }, t.exports = u;
  }, {
    "../consts": 2,
    "../decoder/hevc-header": 10,
    "../decoder/hevc-imp": 11,
    "./buffer": 13,
    mp4box: 1
  }],
  18: [function (e, t, i) {
    "use strict";

    t.exports = {
      DEFAULT_SAMPLERATE: 44100,
      DEFAULT_CHANNEL: 1,
      H264AUD: [0, 0, 0, 1, 9, 224],
      H265AUD: [0, 0, 0, 1, 70, 1, 80],
      DEF_AAC: "aac",
      DEF_MP3: "mp3",
      DEF_H265: "h265",
      DEF_HEVC: "hevc",
      DEF_H264: "h264",
      DEF_AVC: "avc",
      CODEC_OFFSET_TABLE: ["hevc", "h265", "avc", "h264", "aac", "mp3"]
    };
  }, {}],
  19: [function (e, t, i) {
    "use strict";

    function r(e, t) {
      for (var i = 0; i < t.length; i++) {
        var r = t[i];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
      }
    }

    var n = function () {
      function e(t) {
        !function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }(this, e), this.sampleRate = t.sampleRate, this.frameDurMs = Math.floor(1024e3 / this.sampleRate), this.frameDurSec = this.frameDurMs / 1e3;
      }

      var t, i, n;
      return t = e, (i = [{
        key: "updateConfig",
        value: function value(e) {
          this.sampleRate = e.sampleRate, this.frameDurMs = 1024e3 / this.sampleRate, this.frameDurSec = this.frameDurMs / 1e3;
        }
      }, {
        key: "_getPktLen",
        value: function value(e, t, i) {
          return ((3 & e) << 11) + (t << 3) + ((224 & i) >> 5);
        }
      }, {
        key: "sliceAACFrames",
        value: function value(e, t) {
          for (var i = [], r = e, n = 0; n < t.length - 1;) {
            if (255 == t[n] && t[n + 1] >> 4 == 15) {
              var a = this._getPktLen(t[n + 3], t[n + 4], t[n + 5]);

              if (a <= 0) continue;
              var s = t.subarray(n, n + a),
                  o = new Uint8Array(a);
              o.set(s, 0), i.push({
                ptime: r,
                data: o
              }), r += this.frameDurSec, n += a;
            } else n += 1;
          }

          return i;
        }
      }]) && r(t.prototype, i), n && r(t, n), e;
    }();

    i.AACDecoder = n;
  }, {}],
  20: [function (e, t, i) {
    (function (t) {
      "use strict";

      function r(e, t) {
        for (var i = 0; i < t.length; i++) {
          var r = t[i];
          r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
        }
      }

      var n = e("./decoder/aac"),
          a = e("./consts"),
          s = function () {
        function e(t) {
          !function (e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, e), this.configFormat = {}, this.isLive = 0, this.mediaAttr = {
            sampleRate: 0,
            sampleChannel: 0,
            vFps: 0,
            vGop: 0,
            vDuration: 0,
            aDuration: 0,
            duration: 0,
            aCodec: "",
            vCodec: "",
            audioNone: !1
          }, this.extensionInfo = {
            vWidth: 0,
            vHeight: 0
          }, this.controller = new AbortController(), this.offsetDemux = null, this.wasmState = 0, this.onReady = null, this.onDemuxed = null, this.onDemuxedFailed = null, this.aacDec = null;
        }

        var i, s, o;
        return i = e, (s = [{
          key: "initDemuxer",
          value: function value() {
            var e = this;
            return window.WebAssembly ? (Module.run(), 1 === t.STATIC_MEM_wasmDecoderState ? (e.wasmState = 1, e.onReady()) : (Module.onRuntimeInitialized = function () {
              null != e.onReady && 0 == e.wasmState && (e.wasmState = 1, e.onReady());
            }, Module.postRun = function () {
              null != e.onReady && 0 == e.wasmState && (e.wasmState = 1, e.onReady());
            })) : /iPhone|iPad/.test(window.navigator.userAgent), !0;
          }
        }, {
          key: "demuxURL",
          value: function value(e) {
            this._demuxerTsInit(e);
          }
        }, {
          key: "demuxUint8Buf",
          value: function value(e) {
            this._demuxCore(e);
          }
        }, {
          key: "_demuxerTsInit",
          value: function value(e) {
            var t = this,
                i = this.controller.signal;
            fetch(e, {
              signal: i
            }).then(function (e) {
              return e.arrayBuffer();
            }).then(function (i) {
              i.fileStart = 0;
              var r = new Uint8Array(i);
              null != r ? t._demuxCore(r) : console.error("demuxerTsInit ERROR fetch res is null ==> ", e), r = null;
            })["catch"](function (i) {
              console.error("demuxerTsInit ERROR fetch ERROR ==> ", i), t._releaseOffset(), t.onDemuxedFailed && t.onDemuxedFailed(i, e);
            });
          }
        }, {
          key: "_releaseOffset",
          value: function value() {
            void 0 !== this.offsetDemux && null !== this.offsetDemux && (Module._free(this.offsetDemux), this.offsetDemux = null);
          }
        }, {
          key: "_demuxCore",
          value: function value(e) {
            if (this._releaseOffset(), this._refreshDemuxer(), !(e.length <= 0)) {
              this.offsetDemux = Module._malloc(e.length), Module.HEAP8.set(e, this.offsetDemux);
              var t = Module.cwrap("demuxBox", "number", ["number", "number", "number"])(this.offsetDemux, e.length, this.isLive);
              Module._free(this.offsetDemux), this.offsetDemux = null, t >= 0 && (this._setMediaInfo(), this._setExtensionInfo(), null != this.onDemuxed && this.onDemuxed());
            }
          }
        }, {
          key: "_setMediaInfo",
          value: function value() {
            var e = Module.cwrap("getMediaInfo", "number", [])(),
                t = Module.HEAPU32[e / 4],
                i = Module.HEAPU32[e / 4 + 1],
                r = Module.HEAPF64[e / 8 + 1],
                s = Module.HEAPF64[e / 8 + 1 + 1],
                o = Module.HEAPF64[e / 8 + 1 + 1 + 1],
                l = Module.HEAPF64[e / 8 + 1 + 1 + 1 + 1],
                h = Module.HEAPU32[e / 4 + 2 + 2 + 2 + 2 + 2];
            this.mediaAttr.vFps = r, this.mediaAttr.vGop = h, this.mediaAttr.vDuration = s, this.mediaAttr.aDuration = o, this.mediaAttr.duration = l;
            var u = Module.cwrap("getAudioCodecID", "number", [])();
            u >= 0 ? (this.mediaAttr.aCodec = a.CODEC_OFFSET_TABLE[u], this.mediaAttr.sampleRate = t > 0 ? t : a.DEFAULT_SAMPLERATE, this.mediaAttr.sampleChannel = i >= 0 ? i : a.DEFAULT_CHANNEL) : (this.mediaAttr.sampleRate = 0, this.mediaAttr.sampleChannel = 0, this.mediaAttr.audioNone = !0);
            var d = Module.cwrap("getVideoCodecID", "number", [])();
            d >= 0 && (this.mediaAttr.vCodec = a.CODEC_OFFSET_TABLE[d]), null == this.aacDec ? this.aacDec = new n.AACDecoder(this.mediaAttr) : this.aacDec.updateConfig(this.mediaAttr);
          }
        }, {
          key: "_setExtensionInfo",
          value: function value() {
            var e = Module.cwrap("getExtensionInfo", "number", [])(),
                t = Module.HEAPU32[e / 4],
                i = Module.HEAPU32[e / 4 + 1];
            this.extensionInfo.vWidth = t, this.extensionInfo.vHeight = i;
          }
        }, {
          key: "readMediaInfo",
          value: function value() {
            return this.mediaAttr;
          }
        }, {
          key: "readExtensionInfo",
          value: function value() {
            return this.extensionInfo;
          }
        }, {
          key: "readAudioNone",
          value: function value() {
            return this.mediaAttr.audioNone;
          }
        }, {
          key: "_readLayer",
          value: function value() {
            var e = {
              vps: null,
              sps: null,
              pps: null,
              sei: null
            },
                t = {
              vlc: null
            },
                i = Module.cwrap("getSPSLen", "number", [])(),
                r = Module.cwrap("getSPS", "number", [])();

            if (!(i < 0)) {
              e.sps = new Uint8Array(i), e.sps.set(Module.HEAPU8.subarray(r, r + i), 0);
              var n = Module.cwrap("getPPSLen", "number", [])(),
                  s = Module.cwrap("getPPS", "number", [])();
              e.pps = new Uint8Array(n), e.pps.set(Module.HEAPU8.subarray(s, s + n), 0);
              var o = Module.cwrap("getSEILen", "number", [])(),
                  l = Module.cwrap("getSEI", "number", [])();
              e.sei = new Uint8Array(o), e.sei.set(Module.HEAPU8.subarray(l, l + o), 0);
              var h = Module.cwrap("getVLCLen", "number", [])(),
                  u = Module.cwrap("getVLC", "number", [])();

              if (t.vlc = new Uint8Array(h), t.vlc.set(Module.HEAPU8.subarray(u, u + h), 0), this.mediaAttr.vCodec == a.DEF_HEVC || this.mediaAttr.vCodec == a.DEF_H265) {
                var d = Module.cwrap("getVPSLen", "number", [])(),
                    f = Module.cwrap("getVPS", "number", [])();
                e.vps = new Uint8Array(d), e.vps.set(Module.HEAPU8.subarray(f, f + d), 0);
              } else this.mediaAttr.vCodec == a.DEF_AVC || (this.mediaAttr.vCodec, a.DEF_H264);

              return {
                nalu: e,
                vlc: t
              };
            }
          }
        }, {
          key: "isHEVC",
          value: function value() {
            return this.mediaAttr.vCodec == a.DEF_HEVC || this.mediaAttr.vCodec == a.DEF_H265;
          }
        }, {
          key: "readPacket",
          value: function value() {
            var e = Module.cwrap("getPacket", "number", [])(),
                t = Module.HEAPU32[e / 4],
                i = Module.HEAPU32[e / 4 + 1],
                r = Module.HEAPF64[e / 8 + 1],
                n = Module.HEAPF64[e / 8 + 1 + 1],
                s = Module.HEAPU32[e / 4 + 1 + 1 + 2 + 2],
                o = Module.HEAPU32[e / 4 + 1 + 1 + 2 + 2 + 1],
                l = Module.HEAPU8.subarray(o, o + i),
                h = this._readLayer();

            return {
              type: t,
              size: i,
              ptime: r,
              dtime: n,
              keyframe: s,
              src: l,
              data: 1 == t && this.mediaAttr.aCodec == a.DEF_AAC ? this.aacDec.sliceAACFrames(r, l) : l,
              layer: h
            };
          }
        }, {
          key: "_refreshDemuxer",
          value: function value() {
            this.releaseTsDemuxer(), this._initDemuxer();
          }
        }, {
          key: "_initDemuxer",
          value: function value() {
            Module.cwrap("initTsMissile", "number", [])(), Module.cwrap("initializeDemuxer", "number", [])();
          }
        }, {
          key: "releaseTsDemuxer",
          value: function value() {
            Module.cwrap("exitTsMissile", "number", [])();
          }
        }]) && r(i.prototype, s), o && r(i, o), e;
      }();

      i.MPEG_JS = s;
    }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
  }, {
    "./consts": 18,
    "./decoder/aac": 19
  }],
  21: [function (e, t, i) {
    "use strict";

    function r(e, t) {
      for (var i = 0; i < t.length; i++) {
        var r = t[i];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
      }
    }

    var n = e("./mpegts/mpeg.js"),
        a = e("./buffer"),
        s = e("../decoder/hevc-imp"),
        o = function () {
      function e() {
        !function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }(this, e), this.seekPos = -1, this.durationMs = -1, this.fps = -1, this.sampleRate = -1, this.aCodec = "", this.vCodec = "", this.size = {
          width: -1,
          height: -1
        }, this.bufObject = a(), this.mpegTsObj = null, this.bufObject = a(), this.mediaInfo = {}, this.extensionInfo = {}, this.onReady = null, this.onDemuxed = null, this.onReadyOBJ = null;
      }

      var t, i, o;
      return t = e, (i = [{
        key: "initMPEG",
        value: function value() {
          var e = this;
          this.mpegTsObj = new n.MPEG_JS({}), this.mpegTsObj.onDemuxed = function () {
            e.mediaInfo = e.mpegTsObj.readMediaInfo(), e.mediaInfo, e.extensionInfo = e.mpegTsObj.readExtensionInfo(), e.extensionInfo, e.vCodec = e.mediaInfo.vCodec, e.aCodec = e.mediaInfo.aCodec, e.durationMs = 1e3 * e.mediaInfo.duration, e.fps = e.mediaInfo.vFps, e.sampleRate = e.mediaInfo.sampleRate, e.extensionInfo.vWidth > 0 && e.extensionInfo.vHeight > 0 && (e.size.width = e.extensionInfo.vWidth, e.size.height = e.extensionInfo.vHeight);

            for (var t = null; !((t = e.mpegTsObj.readPacket()).size <= 0);) {
              var i = t.dtime;

              if (0 == t.type) {
                var r = s.PACK_NALU(t.layer),
                    n = 1 == t.keyframe;
                e.bufObject.appendFrame(i, r, !0, n);
              } else if ("aac" == e.mediaInfo.aCodec) for (var a = t.data, o = 0; o < a.length; o++) {
                var l = a[o];
                e.bufObject.appendFrame(l.ptime, l.data, !1, !0);
              } else e.bufObject.appendFrame(i, t.data, !1, !0);
            }

            e.bufObject.videoBuffer, e.bufObject.audioBuffer, null != e.onDemuxed && e.onDemuxed(e.onReadyOBJ);
          }, this.mpegTsObj.onReady = function () {
            null != e.onReady && e.onReady(e.onReadyOBJ);
          }, this.mpegTsObj.initDemuxer();
        }
      }, {
        key: "bindReady",
        value: function value(e) {
          this.onReadyOBJ = e;
        }
      }, {
        key: "releaseTsDemuxer",
        value: function value() {
          this.mpegTsObj && this.mpegTsObj.releaseTsDemuxer(), this.mpegTsObj = null;
        }
      }, {
        key: "demux",
        value: function value(e) {
          this.mpegTsObj.demuxUint8Buf(e);
        }
      }, {
        key: "popBuffer",
        value: function value() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1,
              t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : -1;
          return t < 0 ? null : 1 == e ? this.bufObject.vFrame(t) : 2 == e ? this.bufObject.aFrame(t) : void 0;
        }
      }, {
        key: "isHEVC",
        value: function value() {
          return this.mpegTsObj.isHEVC();
        }
      }, {
        key: "getACodec",
        value: function value() {
          return this.aCodec;
        }
      }, {
        key: "getVCodec",
        value: function value() {
          return this.vCodec;
        }
      }, {
        key: "getAudioNone",
        value: function value() {
          return this.mpegTsObj.mediaAttr.audioNone;
        }
      }, {
        key: "getDurationMs",
        value: function value() {
          return this.durationMs;
        }
      }, {
        key: "getFPS",
        value: function value() {
          return this.fps;
        }
      }, {
        key: "getSampleRate",
        value: function value() {
          return this.sampleRate;
        }
      }, {
        key: "getSize",
        value: function value() {
          return this.size;
        }
      }, {
        key: "seek",
        value: function value(e) {
          if (e >= 0) {
            var t = this.bufObject.seekIDR(e);
            this.seekPos = t;
          }
        }
      }]) && r(t.prototype, i), o && r(t, o), e;
    }();

    i.MpegTs = o;
  }, {
    "../decoder/hevc-imp": 11,
    "./buffer": 13,
    "./mpegts/mpeg.js": 20
  }],
  22: [function (e, t, i) {
    (function (t) {
      "use strict";

      function r(e, t) {
        for (var i = 0; i < t.length; i++) {
          var r = t[i];
          r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
        }
      }

      var n = e("./decoder/player-core"),
          a = e("./native/mp4-player"),
          s = e("./decoder/c-native-core"),
          o = e("./decoder/c-httplive-core"),
          l = e("./decoder/av-common"),
          h = (e("./demuxer/mpegts/mpeg.js"), e("./demuxer/mp4")),
          u = e("./demuxer/ts"),
          d = e("./demuxer/m3u8"),
          f = e("./consts"),
          c = (e("./utils/static-mem"), e("./utils/ui/ui")),
          p = (e("./decoder/cache"), {
        moovStartFlag: !0,
        readyShow: !0,
        rawFps: 24,
        autoCrop: !1,
        core: f.PLAYER_CORE_TYPE_DEFAULT,
        coreProbePart: 1,
        checkProbe: !0,
        ignoreAudio: 0,
        probeSize: 4096
      }),
          m = function m(e, t) {
        return t - 1e3 / e;
      };

      void 0 !== t.Module && null !== t.Module || (t.Module = {}), Module.onRuntimeInitialized = function () {
        t.STATIC_MEM_wasmDecoderState = 1, t.STATIC_MEM_wasmDecoderState;
      };

      var _ = function () {
        function e(i, r) {
          if (function (e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
          }(this, e), t.STATICE_MEM_playerCount += 1, this.playerIndex = t.STATICE_MEM_playerCount, this.mp4Obj = null, this.mpegTsObj = null, this.hlsObj = null, this.hlsConf = {
            hlsType: f.PLAYER_IN_TYPE_M3U8_VOD
          }, this.videoURL = i, this.configFormat = {
            playerId: r.player || f.DEFAILT_WEBGL_PLAY_ID,
            playerW: r.width || f.DEFAULT_WIDTH,
            playerH: r.height || f.DEFAULT_HEIGHT,
            type: r.type || l.GetUriFormat(this.videoURL),
            accurateSeek: r.accurateSeek || !0,
            playIcon: r.playIcon || "assets/icon-play@300.png",
            loadIcon: r.loadIcon || "assets/icon-loading.gif",
            token: r.token || null,
            extInfo: p
          }, this.mediaExtFormat = this.configFormat.type, null != this.configFormat.token) {
            for (var n in this.configFormat.extInfo.core = l.GetFormatPlayCore(this.configFormat.type), r.extInfo) {
              n in this.configFormat.extInfo && (this.configFormat.extInfo[n] = r.extInfo[n]);
            }

            this.playMode = f.PLAYER_MODE_VOD, this.seekTarget = 0, this.playParam = null, this.timerFeed = null, this.player = null, this.volume = 1, this.rawModePts = 0, this.autoScreenClose = !0, this.feedMP4Data = null, this.onPlayTime = null, this.onLoadFinish = null, this.onSeekStart = null, this.onSeekFinish = null, this.onRender = null, this.onLoadCache = null, this.onLoadCacheFinshed = null, this.onPlayFinish = null, this.onCacheProcess = null, this.onReadyShowDone = null, this.onOpenFullScreen = null, this.onCloseFullScreen = null, this.onNetworkError = null, this.filterConfigParams(), this.configFormat;
            var a = this;
            document.addEventListener("fullscreenchange", function (e) {
              a._isFullScreen() ? a.onOpenFullScreen && a.onOpenFullScreen() : (!0 === a.autoScreenClose && a.closeFullScreen(!0), a.onCloseFullScreen && a.onCloseFullScreen());
            }), this.screenW = window.screen.width, this.screenH = window.screen.height;
          }
        }

        var i, _, y;

        return i = e, (_ = [{
          key: "filterConfigParams",
          value: function value() {
            void 0 !== this.configFormat.extInfo.checkProbe && null !== this.configFormat.extInfo.checkProbe || (this.configFormat.extInfo.checkProbe = !0), this.configFormat.type === f.PLAYER_IN_TYPE_FLV ? (this.configFormat.extInfo.core = f.PLAYER_CORE_TYPE_CNATIVE, this.configFormat.type = f.PLAYER_IN_TYPE_MP4) : this.configFormat.type === f.PLAYER_IN_TYPE_HTTPFLV && (this.configFormat.extInfo.core = f.PLAYER_CORE_TYPE_CNATIVE, this.configFormat.type = f.PLAYER_IN_TYPE_MP4, this.playMode = f.PLAYER_MODE_NOTIME_LIVE);
          }
        }, {
          key: "do",
          value: function value() {
            var e = this,
                i = !1;
            this.configFormat.type === f.PLAYER_IN_TYPE_RAW_265 && (i = !0, this.playMode = f.PLAYER_MODE_NOTIME_LIVE), this.playParam = {
              durationMs: 0,
              fps: 0,
              sampleRate: 0,
              size: {
                width: 0,
                height: 0
              },
              audioNone: i,
              videoCodec: f.CODEC_H265
            }, c.UI.createPlayerRender(this.configFormat.playerId, this.configFormat.playerW, this.configFormat.playerH);
            var r = window.setInterval(function () {
              t.STATICE_MEM_playerIndexPtr === e.playerIndex && (t.STATICE_MEM_playerIndexPtr, e.playerIndex, window.WebAssembly ? (t.STATIC_MEM_wasmDecoderState, 1 == t.STATIC_MEM_wasmDecoderState && (e._makeMP4Player(), t.STATICE_MEM_playerIndexPtr += 1, window.clearInterval(r), r = null)) : (/iPhone|iPad/.test(window.navigator.userAgent), t.STATICE_MEM_playerIndexPtr += 1, window.clearInterval(r), r = null));
            }, 500);
          }
        }, {
          key: "release",
          value: function value() {
            this.player, this.playParam.videoCodec === f.CODEC_H265 && this.player && (this.configFormat.type == f.PLAYER_IN_TYPE_M3U8 && this.hlsObj.release(), this.player.release());
          }
        }, {
          key: "debugYUV",
          value: function value(e) {
            this.player.debugYUV(e);
          }
        }, {
          key: "setRenderScreen",
          value: function value() {
            var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
            this.player.setScreen(e);
          }
        }, {
          key: "play",
          value: function value() {
            if (this.playParam.videoCodec === f.CODEC_H265) {
              var e = {
                seekPos: this._getSeekTarget(),
                mode: this.playMode,
                accurateSeek: this.configFormat.accurateSeek,
                seekEvent: !1,
                realPlay: !0
              };
              this.player.play(e);
            } else this.player.play();

            return !0;
          }
        }, {
          key: "pause",
          value: function value() {
            return this.player.pause(), !0;
          }
        }, {
          key: "isPlaying",
          value: function value() {
            return this.player.isPlayingState();
          }
        }, {
          key: "setVoice",
          value: function value(e) {
            if (e < 0) return !1;
            this.volume = e, this.player && this.player.setVoice(e);
          }
        }, {
          key: "getVolume",
          value: function value() {
            return this.volume;
          }
        }, {
          key: "mediaInfo",
          value: function value() {
            var e = {
              meta: this.playParam,
              videoType: this.playMode
            };
            return e.meta.isHEVC = 0 === this.playParam.videoCodec, e;
          }
        }, {
          key: "_seekHLS",
          value: function value(e, t, i) {
            setTimeout(function () {
              t.player.getCachePTS(), t.player.getCachePTS() > e ? i() : t._seekHLS(e, t, i);
            }, 100);
          }
        }, {
          key: "seek",
          value: function value(e) {
            var t = this;
            this.seekTarget = e, this.onSeekStart && this.onSeekStart(e), this.timerFeed && (window.clearInterval(this.timerFeed), this.timerFeed = null);

            var i = this._getSeekTarget();

            return this.playParam.videoCodec === f.CODEC_H264 && this.configFormat.type == f.PLAYER_IN_TYPE_MP4 ? (this.player.seek(e), this.onSeekFinish && this.onSeekFinish()) : this.configFormat.extInfo.core === f.PLAYER_CORE_TYPE_CNATIVE ? (this.pause(), this._seekHLS(e, this, function () {
              t.player.seek(function () {}, {
                seekTime: i,
                mode: t.playMode,
                accurateSeek: t.configFormat.accurateSeek
              });
            })) : this._seekHLS(e, this, function () {
              t.player.seek(function () {
                t.configFormat.type == f.PLAYER_IN_TYPE_MP4 ? t.mp4Obj.seek(e) : t.configFormat.type == f.PLAYER_IN_TYPE_TS || t.configFormat.type == f.PLAYER_IN_TYPE_MPEGTS ? t.mpegTsObj.seek(e) : t.configFormat.type == f.PLAYER_IN_TYPE_M3U8 && (t.hlsObj.onSamples = null, t.hlsObj.seek(e));
                var i,
                    r = (i = 0, i = t.configFormat.accurateSeek ? e : t._getBoxBufSeekIDR(), parseInt(i)),
                    n = parseInt(t._getBoxBufSeekIDR()) || 0;

                t._avFeedMP4Data(n, r);
              }, {
                seekTime: i,
                mode: t.playMode,
                accurateSeek: t.configFormat.accurateSeek
              });
            }), !0;
          }
        }, {
          key: "fullScreen",
          value: function value() {
            this.autoScreenClose = !0;
            var e = document.querySelector("#" + this.configFormat.playerId),
                t = e.getElementsByTagName("canvas")[0];
            e.style.width = this.screenW + "px", e.style.height = this.screenH + "px";

            var i = this._checkScreenDisplaySize(this.screenW, this.screenH, this.playParam.size.width, this.playParam.size.height);

            t.style.marginTop = i[0] + "px", t.style.marginLeft = i[1] + "px", t.style.width = i[2] + "px", t.style.height = i[3] + "px", this._requestFullScreen(e);
          }
        }, {
          key: "closeFullScreen",
          value: function value() {
            var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
            !1 === e && (this.autoScreenClose = !1, this._exitFull());
            var t = document.querySelector("#" + this.configFormat.playerId),
                i = t.getElementsByTagName("canvas")[0];
            t.style.width = this.configFormat.playerW + "px", t.style.height = this.configFormat.playerH + "px";

            var r = this._checkScreenDisplaySize(this.configFormat.playerW, this.configFormat.playerH, this.playParam.size.width, this.playParam.size.height);

            i.style.marginTop = r[0] + "px", i.style.marginLeft = r[1] + "px", i.style.width = r[2] + "px", i.style.height = r[3] + "px";
          }
        }, {
          key: "_checkScreenDisplaySize",
          value: function value(e, t, i, r) {
            var n = i / e > r / t,
                a = (e / i).toFixed(2),
                s = (t / r).toFixed(2),
                o = n ? a : s,
                l = this.fixed ? e : parseInt(i * o),
                h = this.fixed ? t : parseInt(r * o);
            return [parseInt((t - h) / 2), parseInt((e - l) / 2), l, h];
          }
        }, {
          key: "_isFullScreen",
          value: function value() {
            var e = document.fullscreenElement || document.mozFullscreenElement || document.webkitFullscreenElement;
            return document.fullscreenEnabled || document.mozFullscreenEnabled || document.webkitFullscreenEnabled, null != e;
          }
        }, {
          key: "_requestFullScreen",
          value: function value(e) {
            e.requestFullscreen ? e.requestFullscreen() : e.mozRequestFullScreen ? e.mozRequestFullScreen() : e.msRequestFullscreen ? e.msRequestFullscreen() : e.webkitRequestFullscreen && e.webkitRequestFullScreen();
          }
        }, {
          key: "_exitFull",
          value: function value() {
            document.exitFullscreen ? document.exitFullscreen() : document.webkitExitFullscreen ? document.webkitExitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.msExitFullscreen && document.msExitFullscreen();
          }
        }, {
          key: "_durationText",
          value: function value(e) {
            if (e < 0) return "Play";
            var t = Math.round(e);
            return Math.floor(t / 3600) + ":" + Math.floor(t % 3600 / 60) + ":" + Math.floor(t % 60);
          }
        }, {
          key: "_getSeekTarget",
          value: function value() {
            return this.configFormat.accurateSeek ? this.seekTarget : this._getBoxBufSeekIDR();
          }
        }, {
          key: "_getBoxBufSeekIDR",
          value: function value() {
            return this.configFormat.type == f.PLAYER_IN_TYPE_MP4 ? this.mp4Obj.seekPos : this.configFormat.type == f.PLAYER_IN_TYPE_TS || this.configFormat.type == f.PLAYER_IN_TYPE_MPEGTS ? this.mpegTsObj.seekPos : this.configFormat.type == f.PLAYER_IN_TYPE_M3U8 ? this.hlsObj.seekPos : void 0;
          }
        }, {
          key: "_playControl",
          value: function value() {
            this.isPlaying() ? this.pause() : this.play();
          }
        }, {
          key: "_avFeedMP4Data",
          value: function value() {
            var e = this,
                t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
                n = parseInt(this.playParam.durationMs / 1e3);
            this.player.clearAllCache(), this.timerFeed = window.setInterval(function () {
              var a = null,
                  s = null,
                  o = !0,
                  l = !0;
              if (e.configFormat.type == f.PLAYER_IN_TYPE_MP4 ? (a = e.mp4Obj.popBuffer(1, t), s = e.mp4Obj.audioNone ? null : e.mp4Obj.popBuffer(2, i)) : e.configFormat.type == f.PLAYER_IN_TYPE_TS || e.configFormat.type == f.PLAYER_IN_TYPE_MPEGTS ? (a = e.mpegTsObj.popBuffer(1, t), s = e.mpegTsObj.getAudioNone() ? null : e.mpegTsObj.popBuffer(2, i)) : e.configFormat.type == f.PLAYER_IN_TYPE_M3U8 && (a = e.hlsObj.popBuffer(1, t), s = e.hlsObj.audioNone ? null : e.hlsObj.popBuffer(2, i), t < n - 1 && t >= e.hlsObj.getLastIdx() && (o = !1), i < n - 1 && i >= e.hlsObj.getALastIdx() && (l = !1)), !0 === o && null != a) for (var h = 0; h < a.length; h++) {
                e.player.appendHevcFrame(a[h]);
              }
              if (!0 === l && null != s) for (var u = 0; u < s.length; u++) {
                e.player.appendAACFrame(s[u]);
              }
              if (e.playMode !== f.PLAYER_MODE_NOTIME_LIVE && e.configFormat.type !== f.PLAYER_IN_TYPE_M3U8 && e.onCacheProcess && e.onCacheProcess(e.player.getCachePTS()), !0 === o && null != a && (a.length, e.configFormat.extInfo.readyShow && (e.configFormat.type === f.PLAYER_IN_TYPE_M3U8 ? e.configFormat.extInfo.readyShow = !1 : e.configFormat.extInfo.core === f.PLAYER_CORE_TYPE_CNATIVE || e.player.cacheYuvBuf.getState() != CACHE_APPEND_STATUS_CODE.NULL && (e.player.playFrameYUV(!0, !0), e.configFormat.extInfo.readyShow = !1, e.onReadyShowDone && e.onReadyShowDone())), t++), !0 === l && null != s && i++, t > n) return window.clearInterval(e.timerFeed), e.timerFeed = null, e.player.vCachePTS, e.player.aCachePTS, void (null != r && r());
            }, 5);
          }
        }, {
          key: "_makeMP4Player",
          value: function value() {
            null != this.configFormat.extInfo.core && null !== this.configFormat.extInfo.core && this.configFormat.extInfo.core === f.PLAYER_CORE_TYPE_CNATIVE ? this._cDemuxDecoderEntry() : this.configFormat.type == f.PLAYER_IN_TYPE_MP4 ? this.configFormat.extInfo.moovStartFlag ? this._mp4EntryVodStream() : this._mp4Entry() : this.configFormat.type == f.PLAYER_IN_TYPE_TS || this.configFormat.type == f.PLAYER_IN_TYPE_MPEGTS ? this._mpegTsEntry() : this.configFormat.type == f.PLAYER_IN_TYPE_M3U8 ? this._m3u8Entry() : this.configFormat.type === f.PLAYER_IN_TYPE_RAW_265 && this._raw265Entry();
          }
        }, {
          key: "_makeMP4PlayerViewEvent",
          value: function value(e, t, i, r) {
            var a = this,
                s = arguments.length > 4 && void 0 !== arguments[4] && arguments[4],
                o = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : null,
                l = this;

            if (this.playParam.durationMs = e, this.playParam.fps = t, this.playParam.sampleRate = i, this.playParam.size = r, this.playParam.audioNone = s, this.playParam.videoCodec = o || f.CODEC_H265, this.playParam, (this.configFormat.type == f.PLAYER_IN_TYPE_M3U8 && this.hlsConf.hlsType == f.PLAYER_IN_TYPE_M3U8_LIVE || this.configFormat.type == f.PLAYER_IN_TYPE_RAW_265) && (this.playMode = f.PLAYER_MODE_NOTIME_LIVE), l.configFormat.extInfo.autoCrop) {
              var h = document.querySelector("#" + this.configFormat.playerId),
                  u = r.width / r.height,
                  d = this.configFormat.playerW / this.configFormat.playerH;
              u > d ? h.style.height = this.configFormat.playerW / u + "px" : u < d && (h.style.width = this.configFormat.playerH * u + "px");
            }

            this.player = n({
              width: this.configFormat.playerW,
              height: this.configFormat.playerH,
              sampleRate: i,
              fps: t,
              appendHevcType: f.APPEND_TYPE_FRAME,
              fixed: !1,
              playerId: this.configFormat.playerId,
              audioNone: s,
              token: this.configFormat.token,
              videoCodec: o
            }), this.player.onPlayingTime = function (t) {
              l._durationText(t), l._durationText(e / 1e3), null != l.onPlayTime && l.onPlayTime(t);
            }, this.player.onPlayingFinish = function () {
              a.pause(), a.seek(0), null != a.onPlayFinish && a.onPlayFinish();
            }, this.player.onSeekFinish = function () {
              null != l.onSeekFinish && l.onSeekFinish();
            }, this.player.onRender = function (e, t, i, r, n) {
              null != a.onRender && a.onRender(e, t, i, r, n);
            }, this.player.onLoadCache = function () {
              null != a.onLoadCache && a.onLoadCache();
            }, this.player.onLoadCacheFinshed = function () {
              null != a.onLoadCacheFinshed && a.onLoadCacheFinshed();
            }, l.player.setDurationMs(e), l.player.setFrameRate(t), null != l.onLoadFinish && (l.onLoadFinish(), l.configFormat.type == f.PLAYER_IN_TYPE_M3U8 && l.onReadyShowDone && l.onReadyShowDone());
          }
        }, {
          key: "_makeNativePlayer",
          value: function value(e, t, i, r, n, s) {
            var o = this;
            this.playParam.durationMs = e, this.playParam.fps = t, this.playParam.sampleRate = i, this.playParam.size = r, this.playParam.audioNone = n, this.playParam.videoCodec = s || f.CODEC_H264, this.configFormat.type == f.PLAYER_IN_TYPE_M3U8 && this.hlsConf.hlsType == f.PLAYER_IN_TYPE_M3U8_LIVE && (this.playMode = f.PLAYER_MODE_NOTIME_LIVE), this.player = new a.Mp4Player({
              width: this.configFormat.playerW,
              height: this.configFormat.playerH,
              sampleRate: i,
              fps: t,
              appendHevcType: f.APPEND_TYPE_FRAME,
              fixed: !1,
              playerId: this.configFormat.playerId,
              audioNone: n,
              token: this.configFormat.token,
              videoCodec: s
            }), this.player.makeIt(this.videoURL), this.player.onPlayingTime = function (t) {
              o._durationText(t), o._durationText(e / 1e3), null != o.onPlayTime && o.onPlayTime(t);
            }, this.player.onPlayingFinish = function () {
              null != o.onPlayFinish && o.onPlayFinish();
            }, this.player.onLoadFinish = function () {
              o.playParam.durationMs = 1e3 * o.player.duration, o.onLoadFinish && o.onLoadFinish();
            };
          }
        }, {
          key: "_initMp4BoxObject",
          value: function value() {
            var e = this;
            this.timerFeed = null, this.mp4Obj = new h(), this.mp4Obj.onMp4BoxReady = function (t) {
              var i = e.mp4Obj.getFPS(),
                  r = m(i, e.mp4Obj.getDurationMs()),
                  n = e.mp4Obj.getSampleRate(),
                  a = e.mp4Obj.getSize(),
                  s = e.mp4Obj.getVideoCoder();
              t === f.CODEC_H265 ? (e._makeMP4PlayerViewEvent(r, i, n, a, e.mp4Obj.audioNone, s), parseInt(r / 1e3), e._avFeedMP4Data(0, 0)) : e._makeNativePlayer(r, i, n, a, e.mp4Obj.audioNone, s);
            };
          }
        }, {
          key: "_mp4Entry",
          value: function value() {
            var e = this,
                t = this;
            fetch(this.videoURL).then(function (e) {
              return e.arrayBuffer();
            }).then(function (i) {
              t._initMp4BoxObject(), e.mp4Obj.demux(), e.mp4Obj.appendBufferData(i, 0), e.mp4Obj.finishBuffer(), e.mp4Obj.seek(-1);
            });
          }
        }, {
          key: "_mp4EntryVodStream",
          value: function value() {
            var e = this,
                t = this;
            this.timerFeed = null, this.mp4Obj = new h(), this._initMp4BoxObject(), this.mp4Obj.demux();
            var i = 0,
                r = !1,
                n = window.setInterval(function () {
              r || (r = !0, fetch(e.videoURL).then(function (e) {
                return function e(r) {
                  return r.read().then(function (a) {
                    if (a.done) return t.mp4Obj.finishBuffer(), t.mp4Obj.seek(-1), void window.clearInterval(n);
                    var s = a.value;
                    return t.mp4Obj.appendBufferData(s.buffer, i), i += s.byteLength, e(r);
                  });
                }(e.body.getReader());
              })["catch"](function (e) {}));
            }, 1);
          }
        }, {
          key: "_cDemuxDecoderEntry",
          value: function value() {
            var e = this,
                t = this,
                i = new AbortController(),
                r = i.signal,
                n = {
              width: this.configFormat.playerW,
              height: this.configFormat.playerH,
              playerId: this.configFormat.playerId,
              token: this.configFormat.token,
              readyShow: this.configFormat.extInfo.readyShow,
              checkProbe: this.configFormat.extInfo.checkProbe,
              ignoreAudio: this.configFormat.extInfo.ignoreAudio,
              playMode: this.playMode
            };
            this.player = new s.CNativeCore(n), this.player.onReadyShowDone = function () {
              t.configFormat.extInfo.readyShow = !1, t.onReadyShowDone && t.onReadyShowDone();
            }, this.player.onProbeFinish = function () {
              t.player.mediaInfo, t.player.config, t.playParam.fps = t.player.config.fps, t.playParam.durationMs = m(t.playParam.fps, 1e3 * t.player.duration), t.player.duration < 0 && (t.playMode = f.PLAYER_MODE_NOTIME_LIVE), t.playParam.sampleRate = t.player.config.sampleRate, t.playParam.size = {
                width: t.player.width,
                height: t.player.height
              }, t.playParam.audioNone = t.player.audioNone, t.player.vCodecID === f.V_CODEC_NAME_HEVC ? (t.playParam.audioIdx < 0 && (t.playParam.audioNone = !0), t.playParam.videoCodec = f.CODEC_H265, t.onLoadFinish && t.onLoadFinish()) : (t.playParam.videoCodec = f.CODEC_H264, i.abort(), t.player.release(), t.player = null, t.mediaExtFormat === f.PLAYER_IN_TYPE_MP4 ? t._makeNativePlayer(t.playParam.durationMs, t.playParam.fps, t.playParam.sampleRate, t.playParam.size, !1, t.playParam.videoCodec) : t.onLoadFinish && t.onLoadFinish());
            }, this.player.onPlayingTime = function (e) {
              t._durationText(e), t._durationText(t.player.duration), null != t.onPlayTime && t.onPlayTime(e);
            }, this.player.onPlayingFinish = function () {
              t.pause(), null != t.onPlayTime && t.onPlayTime(0), t.onPlayFinish && t.onPlayFinish(), t.player.reFull = !0, t.seek(0);
            }, this.player.onCacheProcess = function (t) {
              e.onCacheProcess && e.onCacheProcess(t);
            }, this.player.onLoadCache = function () {
              null != e.onLoadCache && e.onLoadCache();
            }, this.player.onLoadCacheFinshed = function () {
              null != e.onLoadCacheFinshed && e.onLoadCacheFinshed();
            }, this.player.onRender = function (t, i, r, n, a) {
              null != e.onRender && e.onRender(t, i, r, n, a);
            }, this.player.onSeekFinish = function () {
              null != e.onSeekFinish && e.onSeekFinish();
            };
            var a = 0;
            fetch(this.videoURL, {
              signal: r
            }).then(function (e) {
              if (e.headers.has("Content-Length")) a = e.headers.get("Content-Length"), t.player && t.player.setProbeSize(a * t.configFormat.extInfo.coreProbePart);else {
                if (t.mediaExtFormat === f.PLAYER_IN_TYPE_FLV) return i.abort(), t.player.release(), t.player = null, t._cLiveFLVDecoderEntry(n), !0;
                t.player && t.player.setProbeSize(4096);
              }
              return function e(i) {
                return i.read().then(function (r) {
                  if (!r.done) {
                    r.value.buffer;
                    var n = new Uint8Array(r.value.buffer);
                    return t.player && t.player.pushBuffer(n) < 0 ? (t.player.release(), t.player = null, t._mp4EntryVodStream(), !1) : e(i);
                  }

                  t.player && t.player.pushDone();
                });
              }(e.body.getReader());
            })["catch"](function (e) {
              e.toString().includes("user aborted") || console.error("cdemuxdecoder error", e);
            });
          }
        }, {
          key: "_cLiveFLVDecoderEntry",
          value: function value(e) {
            var t = this,
                i = this;
            e.probeSize = this.configFormat.extInfo.probeSize, this.player = new o.CHttpLiveCore(e), e.probeSize, this.player.onProbeFinish = function () {
              i.playParam.fps = i.player.mediaInfo.fps, i.playParam.durationMs = -1, i.playMode = f.PLAYER_MODE_NOTIME_LIVE, i.playParam.sampleRate = i.player.mediaInfo.sampleRate, i.playParam.size = {
                width: i.player.mediaInfo.width,
                height: i.player.mediaInfo.height
              }, i.playParam.audioNone = i.player.mediaInfo.audioNone, i.player.mediaInfo, i.player.vCodecID === f.V_CODEC_NAME_HEVC ? (i.playParam.audioIdx < 0 && (i.playParam.audioNone = !0), i.playParam.videoCodec = f.CODEC_H265) : (i.playParam.videoCodec = f.CODEC_H264, i.player.release(), i.player = null), i.onLoadFinish && i.onLoadFinish();
            }, this.player.onNetworkError = function (e) {
              i.onNetworkError && i.onNetworkError(e);
            }, this.player.onReadyShowDone = function () {
              i.configFormat.extInfo.readyShow = !1, i.onReadyShowDone && i.onReadyShowDone();
            }, this.player.onLoadCache = function () {
              null != t.onLoadCache && t.onLoadCache();
            }, this.player.onLoadCacheFinshed = function () {
              null != t.onLoadCacheFinshed && t.onLoadCacheFinshed();
            }, this.player.start(this.videoURL);
          }
        }, {
          key: "_mpegTsEntry",
          value: function value() {
            var e = this,
                t = new AbortController(),
                i = t.signal;
            this.timerFeed = null, this.mpegTsObj = new u.MpegTs(), this.mpegTsObj.bindReady(e), this.mpegTsObj.onDemuxed = this._mpegTsEntryReady.bind(this), this.mpegTsObj.onReady = function () {
              fetch(e.videoURL, {
                signal: i
              }).then(function (e) {
                return e.arrayBuffer();
              }).then(function (i) {
                if (void 0 !== e.mpegTsObj && null !== e.mpegTsObj) {
                  i.fileStart = 0;
                  var r = new Uint8Array(i);
                  e.mpegTsObj.demux(r);
                } else t.abort();
              });
            }, this.mpegTsObj.initMPEG();
          }
        }, {
          key: "_mpegTsEntryReady",
          value: function value(e) {
            var t = e,
                i = (t.mpegTsObj.getVCodec(), t.mpegTsObj.getACodec()),
                r = t.mpegTsObj.getDurationMs(),
                n = t.mpegTsObj.getFPS(),
                a = t.mpegTsObj.getSampleRate(),
                s = t.mpegTsObj.getSize(),
                o = this.mpegTsObj.isHEVC();
            if (!o) return this.mpegTsObj.releaseTsDemuxer(), this.mpegTsObj = null, this.playParam.durationMs = r, this.playParam.fps = n, this.playParam.sampleRate = a, this.playParam.size = s, this.playParam.audioNone = "" == i, this.playParam.videoCodec = o ? 0 : 1, this.playParam, void (this.onLoadFinish && this.onLoadFinish());
            t._makeMP4PlayerViewEvent(r, n, a, s, "" == i), parseInt(r / 1e3), t._avFeedMP4Data(0, 0);
          }
        }, {
          key: "_m3u8Entry",
          value: function value() {
            var e = this,
                t = this,
                i = !1,
                r = 0;
            this.hlsObj = new d.M3u8(), this.hlsObj.bindReady(t), this.hlsObj.onFinished = function (e, n) {
              0 == i && (r = t.hlsObj.getDurationMs(), t.hlsConf.hlsType = n.type, i = !0);
            }, this.hlsObj.onCacheProcess = function (t) {
              e.playMode !== f.PLAYER_MODE_NOTIME_LIVE && e.onCacheProcess && e.onCacheProcess(t);
            }, this.hlsObj.onDemuxed = function (e) {
              if (null == t.player) {
                var i = t.hlsObj.isHevcParam,
                    n = (t.hlsObj.getVCodec(), t.hlsObj.getACodec()),
                    a = t.hlsObj.getFPS(),
                    s = t.hlsObj.getSampleRate(),
                    o = t.hlsObj.getSize(),
                    l = !1;
                if (l = t.hlsObj.getSampleChannel() <= 0 || "" === n, !i) return t.hlsObj.release(), t.hlsObj.mpegTsObj && t.hlsObj.mpegTsObj.releaseTsDemuxer(), t.hlsObj = null, t.playParam.durationMs = -1, t.playParam.fps = a, t.playParam.sampleRate = s, t.playParam.size = o, t.playParam.audioNone = "" == n, t.playParam.videoCodec = i ? 0 : 1, t.playParam, void (t.onLoadFinish && t.onLoadFinish());

                t._makeMP4PlayerViewEvent(r, a, s, o, l);
              }
            }, this.hlsObj.onSamples = this._hlsOnSamples.bind(this), this.hlsObj.demux(this.videoURL);
          }
        }, {
          key: "_hlsOnSamples",
          value: function value(e, t) {
            1 == t.video ? this.player.appendHevcFrame(t) : !1 === this.hlsObj.audioNone && this.player.appendAACFrame(t);
          }
        }, {
          key: "_raw265Entry",
          value: function value() {
            this._makeMP4PlayerViewEvent(-1, this.configFormat.extInfo.rawFps, -1, {
              width: this.configFormat.playerW,
              height: this.configFormat.playerH
            }, !0, f.CODEC_H265), this.timerFeed && (window.clearInterval(this.timerFeed), this.timerFeed = null);
          }
        }, {
          key: "append265NaluFrame",
          value: function value(e) {
            var t = {
              data: e,
              pts: this.rawModePts
            };
            this.player.appendHevcFrame(t), this.configFormat.extInfo.readyShow && this.player.cacheYuvBuf.getState() != CACHE_APPEND_STATUS_CODE.NULL && (this.player.playFrameYUV(!0, !0), this.configFormat.extInfo.readyShow = !1, this.onReadyShowDone && this.onReadyShowDone()), this.rawModePts += 1 / this.configFormat.extInfo.rawFps;
          }
        }]) && r(i.prototype, _), y && r(i, y), e;
      }();

      i.H265webjs = _, t.new265webjs = function (e, t) {
        return new _(e, t);
      };
    }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
  }, {
    "./consts": 2,
    "./decoder/av-common": 5,
    "./decoder/c-httplive-core": 6,
    "./decoder/c-native-core": 7,
    "./decoder/cache": 8,
    "./decoder/player-core": 12,
    "./demuxer/m3u8": 15,
    "./demuxer/mp4": 17,
    "./demuxer/mpegts/mpeg.js": 20,
    "./demuxer/ts": 21,
    "./native/mp4-player": 23,
    "./utils/static-mem": 25,
    "./utils/ui/ui": 26
  }],
  23: [function (e, t, i) {
    "use strict";

    function r(e, t) {
      for (var i = 0; i < t.length; i++) {
        var r = t[i];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
      }
    }

    var n = e("../consts"),
        a = function () {
      function e(t) {
        !function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }(this, e), this.configFormat = {
          width: t.width || n.DEFAULT_WIDTH,
          height: t.height || n.DEFAULT_HEIGHT,
          fps: t.fps || n.DEFAULT_FPS,
          fixed: t.fixed || n.DEFAULT_FIXED,
          sampleRate: t.sampleRate || n.DEFAULT_SAMPLERATE,
          appendHevcType: t.appendHevcType || n.APPEND_TYPE_STREAM,
          frameDurMs: t.frameDur || n.DEFAULT_FRAME_DUR,
          playerId: t.playerId || n.DEFAILT_WEBGL_PLAY_ID,
          audioNone: t.audioNone || !1,
          token: t.token || null,
          videoCodec: t.videoCodec || n.CODEC_H265
        }, this.video = null, this.isPlaying = !1, this.duration = -1, this.onLoadFinish = null, this.onPlayingTime = null, this.onPlayingFinish = null;
      }

      var t, i, a;
      return t = e, (i = [{
        key: "makeIt",
        value: function value(e) {
          var t = this,
              i = document.querySelector("div#" + this.configFormat.playerId);
          this.video = document.createElement("video"), this.video.ontimeupdate = function () {
            t.onPlayingTime && t.onPlayingTime(t.video.currentTime);
          }, this.video.onended = function () {
            t.onPlayingFinish && t.onPlayingFinish();
          }, this.video.onloadedmetadata = function () {
            t.duration = t.video.duration, t.onLoadFinish && t.onLoadFinish();
          }, this.video.src = e, this.video.style.width = "100%", this.video.style.height = "100%", i.appendChild(this.video);
        }
      }, {
        key: "play",
        value: function value() {
          this.video.play();
        }
      }, {
        key: "seek",
        value: function value(e) {
          this.video.currentTime = e;
        }
      }, {
        key: "pause",
        value: function value() {
          this.video.pause();
        }
      }, {
        key: "setVoice",
        value: function value(e) {
          this.video.volume = e;
        }
      }, {
        key: "isPlayingState",
        value: function value() {
          return !this.video.paused;
        }
      }]) && r(t.prototype, i), a && r(t, a), e;
    }();

    i.Mp4Player = a;
  }, {
    "../consts": 2
  }],
  24: [function (e, t, i) {
    "use strict";

    function r(e) {
      this.gl = e, this.texture = e.createTexture(), e.bindTexture(e.TEXTURE_2D, this.texture), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE);
    }

    r.prototype.bind = function (e, t, i) {
      var r = this.gl;
      r.activeTexture([r.TEXTURE0, r.TEXTURE1, r.TEXTURE2][e]), r.bindTexture(r.TEXTURE_2D, this.texture), r.uniform1i(r.getUniformLocation(t, i), e);
    }, r.prototype.fill = function (e, t, i) {
      var r = this.gl;
      r.bindTexture(r.TEXTURE_2D, this.texture), r.texImage2D(r.TEXTURE_2D, 0, r.LUMINANCE, e, t, 0, r.LUMINANCE, r.UNSIGNED_BYTE, i);
    }, t.exports = {
      renderFrame: function renderFrame(e, t, i, r, n, a) {
        e.viewport(0, 0, e.canvas.width, e.canvas.height), e.clearColor(0, 0, 0, 0), e.clear(e.COLOR_BUFFER_BIT), e.y.fill(n, a, t), e.u.fill(n >> 1, a >> 1, i), e.v.fill(n >> 1, a >> 1, r), e.drawArrays(e.TRIANGLE_STRIP, 0, 4);
      },
      setupCanvas: function setupCanvas(e, t) {
        var i = e.getContext("webgl") || e.getContext("experimental-webgl");
        if (!i) return i;
        var n = i.createProgram(),
            a = ["attribute highp vec4 aVertexPosition;", "attribute vec2 aTextureCoord;", "varying highp vec2 vTextureCoord;", "void main(void) {", " gl_Position = aVertexPosition;", " vTextureCoord = aTextureCoord;", "}"].join("\n"),
            s = i.createShader(i.VERTEX_SHADER);
        i.shaderSource(s, a), i.compileShader(s);
        var o = ["precision highp float;", "varying lowp vec2 vTextureCoord;", "uniform sampler2D YTexture;", "uniform sampler2D UTexture;", "uniform sampler2D VTexture;", "const mat4 YUV2RGB = mat4", "(", " 1.1643828125, 0, 1.59602734375, -.87078515625,", " 1.1643828125, -.39176171875, -.81296875, .52959375,", " 1.1643828125, 2.017234375, 0, -1.081390625,", " 0, 0, 0, 1", ");", "void main(void) {", " gl_FragColor = vec4( texture2D(YTexture, vTextureCoord).x, texture2D(UTexture, vTextureCoord).x, texture2D(VTexture, vTextureCoord).x, 1) * YUV2RGB;", "}"].join("\n"),
            l = i.createShader(i.FRAGMENT_SHADER);
        i.shaderSource(l, o), i.compileShader(l), i.attachShader(n, s), i.attachShader(n, l), i.linkProgram(n), i.useProgram(n), i.getProgramParameter(n, i.LINK_STATUS);
        var h = i.getAttribLocation(n, "aVertexPosition");
        i.enableVertexAttribArray(h);
        var u = i.getAttribLocation(n, "aTextureCoord");
        i.enableVertexAttribArray(u);
        var d = i.createBuffer();
        i.bindBuffer(i.ARRAY_BUFFER, d), i.bufferData(i.ARRAY_BUFFER, new Float32Array([1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1, 0]), i.STATIC_DRAW), i.vertexAttribPointer(h, 3, i.FLOAT, !1, 0, 0);
        var f = i.createBuffer();
        return i.bindBuffer(i.ARRAY_BUFFER, f), i.bufferData(i.ARRAY_BUFFER, new Float32Array([1, 0, 0, 0, 1, 1, 0, 1]), i.STATIC_DRAW), i.vertexAttribPointer(u, 2, i.FLOAT, !1, 0, 0), i.y = new r(i), i.u = new r(i), i.v = new r(i), i.y.bind(0, n, "YTexture"), i.u.bind(1, n, "UTexture"), i.v.bind(2, n, "VTexture"), i;
      }
    };
  }, {}],
  25: [function (e, t, i) {
    (function (e) {
      "use strict";

      e.STATIC_MEM_wasmDecoderState = -1, e.STATICE_MEM_playerCount = -1, e.STATICE_MEM_playerIndexPtr = 0;
    }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
  }, {}],
  26: [function (e, t, i) {
    "use strict";

    function r(e, t) {
      for (var i = 0; i < t.length; i++) {
        var r = t[i];
        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
      }
    }

    var n = function () {
      function e() {
        !function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }(this, e);
      }

      var t, i, n;
      return t = e, n = [{
        key: "createPlayerRender",
        value: function value(e, t, i) {
          var r = document.querySelector("div#" + e);
          return r.style.position = "relative", r.style.backgroundColor = "black", r.style.width = t + "px", r.style.height = i + "px", r;
        }
      }], (i = null) && r(t.prototype, i), n && r(t, n), e;
    }();

    i.UI = n;
  }, {}],
  27: [function (e, t, i) {
    "use strict";

    t.exports = {
      PLAYER_VERSION: "4.0.0"
    };
  }, {}]
}, {}, [22]);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
(function (global){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/********************************************************* 
 * LICENSE: GPL-3.0 https://www.gnu.org/licenses/gpl-3.0.txt
 * 
 * Author: Numberwolf - ChangYanlong
 * QQ: 531365872
 * QQ Group:925466059
 * Wechat: numberwolf11
 * Discord: numberwolf#8694
 * E-Mail: porschegt23@foxmail.com
 * Github: https://github.com/numberwolf/h265web.js
 * 
 * 作者: 小老虎(Numberwolf)(常炎隆)
 * QQ: 531365872
 * QQ群: 531365872
 * 微信: numberwolf11
 * Discord: numberwolf#8694
 * 邮箱: porschegt23@foxmail.com
 * 博客: https://www.jianshu.com/u/9c09c1e00fd1
 * Github: https://github.com/numberwolf/h265web.js
 * 
 **********************************************************/
require('./h265webjs-v20211016');

var h265webjs =
/*#__PURE__*/
function () {
  function h265webjs() {
    _classCallCheck(this, h265webjs);
  }

  _createClass(h265webjs, null, [{
    key: "createPlayer",
    value: function createPlayer(videoURL, config) {
      return window.new265webjs(videoURL, config);
    }
  }, {
    key: "clear",
    value: function clear() {
      global.STATICE_MEM_playerCount = -1;
      global.STATICE_MEM_playerIndexPtr = 0;
    }
  }]);

  return h265webjs;
}();

exports["default"] = h265webjs;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./h265webjs-v20211016":1}],3:[function(require,module,exports){
(function (global){
"use strict";

var _index = _interopRequireDefault(require("./dist/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/********************************************************* 
 * LICENSE: GPL-3.0 https://www.gnu.org/licenses/gpl-3.0.txt
 * 
 * Author: Numberwolf - ChangYanlong
 * QQ: 531365872
 * QQ Group:925466059
 * Wechat: numberwolf11
 * Discord: numberwolf#8694
 * E-Mail: porschegt23@foxmail.com
 * Github: https://github.com/numberwolf/h265web.js
 * 
 * 作者: 小老虎(Numberwolf)(常炎隆)
 * QQ: 531365872
 * QQ群: 531365872
 * 微信: numberwolf11
 * Discord: numberwolf#8694
 * 邮箱: porschegt23@foxmail.com
 * 博客: https://www.jianshu.com/u/9c09c1e00fd1
 * Github: https://github.com/numberwolf/h265web.js
 * 
 **********************************************************/
// const H265webjs = require('./src/h265webjs');
var SHOW_LOADING = "loading...";
var SHOW_DONE = "done.";

function durationFormatSubVal(val) {
  var valStr = val.toString();

  if (valStr.length < 2) {
    return '0' + valStr;
  }

  return valStr;
}

function durationText(duration) {
  if (duration < 0) {
    return "Play";
  }

  var durationSecInt = Math.round(duration);
  return durationFormatSubVal(Math.floor(durationSecInt / 3600)) + ":" + durationFormatSubVal(Math.floor(durationSecInt % 3600 / 60)) + ":" + durationFormatSubVal(Math.floor(durationSecInt % 60));
}

var getMsTime = function getMsTime() {
  return new Date().getTime();
};
/***************************************************
 *
 *
 *
 * 1. H.265/HEVC MP4/FLV/HLS/TS 
 * Demo for create player(MP4/FLV/HLS/TS)
 * 点播/直播播放器创建Demo(MP4/FLV/HLS/TS)
 *
 *
 *
 ***************************************************/
// clear cache count


_index["default"].clear();

global.makeH265webjs = function (videoURL, config) {
  var playerId = config.player;

  var playerObj = _index["default"].createPlayer(videoURL, config);

  var playerDom = document.querySelector('#' + playerId);
  var playerCont = document.querySelector('#player-container');
  var controllerCont = document.querySelector('#controller');
  var progressCont = document.querySelector('#progress-contaniner');
  var progressContW = progressCont.offsetWidth;
  var cachePts = progressCont.querySelector('#cachePts');
  var progressPts = progressCont.querySelector('#progressPts');
  var progressVoice = document.querySelector('#progressVoice');
  var playBar = document.querySelector('#playBar');
  var playBtn = playBar.getElementsByTagName('a')[0];
  var showLabel = document.querySelector('#showLabel');
  var ptsLabel = document.querySelector('#ptsLabel');
  var coverToast = document.querySelector('#coverLayer');
  var coverBtn = document.querySelector('#coverLayerBtn');
  var muteBtn = document.querySelector('#muteBtn'); // let debugYUVBtn     = document.querySelector('#debugYUVBtn');
  // let debugYUVATag    = document.querySelector('#debugYUVUrl');

  var fullScreenBtn = document.querySelector('#fullScreenBtn');
  var mediaInfo = null;
  playBtn.disabled = true; // playBar.textContent = '>';

  showLabel.textContent = SHOW_LOADING;
  playerCont.style.width = config.width + 'px';
  playerCont.style.height = config.height + 'px';
  controllerCont.style.width = config.width + 'px';
  var muteState = false; // controllerCont.style.left = playerContainer.clientLeft;
  // controllerCont.style.bottom = playerContainer.clientBottom;
  // alert(playerContainer.clientLeft);

  var playAction = function playAction() {
    console.log("is playing:", playerObj.isPlaying());

    if (playerObj.isPlaying()) {
      console.log("bar pause============>"); // playBar.textContent = '>';

      playBar.setAttribute('class', 'playBtn');
      playerObj.pause();
    } else {
      // playBar.textContent = '||';
      playBar.setAttribute('class', 'pauseBtn');
      playerObj.play();
    }
  };

  playerCont.onmouseover = function () {
    controllerCont.hidden = false;
  };

  playerCont.onmouseout = function () {
    controllerCont.hidden = true;
  };

  playerDom.onmouseup = function () {
    playAction();
  };

  playBtn.onclick = function () {
    playAction();
  };

  muteBtn.onclick = function () {
    console.log(playerObj.getVolume());

    if (muteState === true) {
      playerObj.setVoice(1.0);
      progressVoice.value = 100;
    } else {
      playerObj.setVoice(0.0);
      progressVoice.value = 0;
    }

    muteState = !muteState;
  };

  fullScreenBtn.onclick = function () {
    playerObj.fullScreen(); // setTimeout(() => {
    //     playerObj.closeFullScreen();
    // }, 2000);
  };

  progressCont.addEventListener('click', function (e) {
    showLabel.textContent = SHOW_LOADING;
    var x = e.pageX - progressCont.getBoundingClientRect().left; // or e.offsetX (less support, though)

    var y = e.pageY - progressCont.getBoundingClientRect().top; // or e.offsetY

    var clickedValue = x * progressCont.max / progressCont.offsetWidth; // alert(clickedValue);

    playerObj.seek(clickedValue);
  });
  progressVoice.addEventListener('click', function (e) {
    var x = e.pageX - progressVoice.getBoundingClientRect().left; // or e.offsetX (less support, though)

    var y = e.pageY - progressVoice.getBoundingClientRect().top; // or e.offsetY

    var clickedValue = x * progressVoice.max / progressVoice.offsetWidth;
    progressVoice.value = clickedValue;
    var volume = clickedValue / 100; // alert(volume);
    // console.log(
    //     progressVoice.offsetLeft, // 209
    //     x, y, // 324 584
    //     progressVoice.max, progressVoice.offsetWidth);

    playerObj.setVoice(volume);
  });

  playerObj.onSeekStart = function (pts) {
    showLabel.textContent = SHOW_LOADING + " seek to:" + parseInt(pts);
  };

  playerObj.onSeekFinish = function () {
    showLabel.textContent = SHOW_DONE;
  };

  playerObj.onPlayFinish = function () {
    console.log("============= FINISHED ==============="); // playBar.textContent = '>';

    playBar.setAttribute('class', 'playBtn'); // playerObj.release();
    // console.log("=========> release ok");
  };

  playerObj.onRender = function (width, height, imageBufferY, imageBufferB, imageBufferR) {
    console.log("on render");
  };

  playerObj.onOpenFullScreen = function () {
    console.log("onOpenFullScreen");
  };

  playerObj.onCloseFullScreen = function () {
    console.log("onCloseFullScreen");
  };

  playerObj.onSeekFinish = function () {
    showLabel.textContent = SHOW_DONE;
  };

  playerObj.onLoadCache = function () {
    showLabel.textContent = "Caching...";
  };

  playerObj.onLoadCacheFinshed = function () {
    showLabel.textContent = SHOW_DONE;
  };

  playerObj.onReadyShowDone = function () {
    console.log("onReadyShowDone");
    showLabel.textContent = "Cover Img OK";
  };

  playerObj.onLoadFinish = function () {
    playerObj.setVoice(1.0);
    mediaInfo = playerObj.mediaInfo();
    console.log("mediaInfo===========>", mediaInfo);
    /*
    meta:
        durationMs: 144400
        fps: 25
        sampleRate: 44100
        size: {
            width: 864,
            height: 480
        },
        audioNone : false
    videoType: "vod"
    */

    if (mediaInfo.meta.isHEVC === false) {
      console.log("is not HEVC/H.265 media!");
      coverToast.removeAttribute('hidden');
      coverBtn.style.width = '100%';
      coverBtn.style.fontSize = '50px';
      coverBtn.innerHTML = 'is not HEVC/H.265 media!';
      return;
    }

    console.log("is HEVC/H.265 media.");
    playBtn.disabled = false;

    if (mediaInfo.meta.audioNone) {
      progressVoice.value = 0;
      progressVoice.style.display = 'none';
    } else {
      playerObj.setVoice(0.5);
    }

    if (mediaInfo.videoType == "vod") {
      cachePts.max = mediaInfo.meta.durationMs / 1000;
      progressCont.max = mediaInfo.meta.durationMs / 1000;
      ptsLabel.textContent = durationText(0) + '/' + durationText(progressCont.max);
    } else {
      cachePts.hidden = true;
      progressCont.hidden = true;
      ptsLabel.textContent = 'LIVE';

      if (mediaInfo.meta.audioNone === true) {
        // playBar.textContent = '||';
        playerObj.play();
      } else {
        coverToast.removeAttribute('hidden');

        coverBtn.onclick = function () {
          // playBar.textContent = '||';
          playerObj.play();
          coverToast.setAttribute('hidden', 'hidden');
        };
      }
    }

    showLabel.textContent = SHOW_DONE;
  };

  playerObj.onCacheProcess = function (cPts) {
    // console.log("onCacheProcess => ", cPts);
    try {
      // cachePts.value = cPts;
      var precent = cPts / progressCont.max;
      var cacheWidth = precent * progressContW; // console.log(precent, precent * progressCont.offsetWidth);

      cachePts.style.width = cacheWidth + 'px';
    } catch (err) {
      console.log(err);
    }
  };

  playerObj.onPlayTime = function (videoPTS) {
    if (mediaInfo.videoType == "vod") {
      // progressPts.value = videoPTS;
      var precent = videoPTS / progressCont.max;
      var progWidth = precent * progressContW; // console.log(precent, precent * progressCont.offsetWidth);

      progressPts.style.width = progWidth + 'px';
      ptsLabel.textContent = durationText(videoPTS) + '/' + durationText(progressCont.max);
    } else {
      // ptsLabel.textContent = durationText(videoPTS) + '/LIVE';
      ptsLabel.textContent = '/LIVE';
    }
  };

  playerObj["do"]();
  return playerObj;
};
/***************************************************
 *
 *
 *
 * 2. RAW HEVC DEMO
 * HEVC/H.265, Demo for VOD, 点播文件播放demo
 *
 *
 *
 ***************************************************/


var workerFetch = new Worker('./dist/worker-fetch-dist.js');
var workerParse = new Worker('./dist/worker-parse-dist.js');
console.log("workerFetch:", workerFetch);
console.log("workerParse:", workerParse);
/*
 * 创建265流播放器
 */

global.makeH265webjsRaw = function (url265, config) {
  var playerId = config.player;

  var playerObj = _index["default"].createPlayer(null, config);

  var playerDom = document.querySelector('#' + playerId);
  var playerCont = document.querySelector('#player-container');
  var controllerCont = document.querySelector('#controller');
  var progressCont = document.querySelector('#progress-contaniner');
  var progressContW = progressCont.offsetWidth;
  var cachePts = progressCont.querySelector('#cachePts');
  var progressPts = progressCont.querySelector('#progressPts');
  var progressVoice = document.querySelector('#progressVoice');
  var playBar = document.querySelector('#playBar');
  var playBtn = playBar.getElementsByTagName('a')[0];
  var showLabel = document.querySelector('#showLabel');
  var ptsLabel = document.querySelector('#ptsLabel');
  var coverToast = document.querySelector('#coverLayer');
  var coverBtn = document.querySelector('#coverLayerBtn');
  var muteBtn = document.querySelector('#muteBtn'); // let debugYUVBtn     = document.querySelector('#debugYUVBtn');
  // let debugYUVATag    = document.querySelector('#debugYUVUrl');

  var fullScreenBtn = document.querySelector('#fullScreenBtn');
  var mediaInfo = null;
  playBtn.disabled = true;
  playBtn.textContent = '>';
  var muteState = false; // controllerCont.style.left = playerContainer.clientLeft;
  // controllerCont.style.bottom = playerContainer.clientBottom;
  // alert(playerContainer.clientLeft);

  var playAction = function playAction() {
    console.log("is playing:", playerObj.isPlaying());

    if (playerObj.isPlaying()) {
      console.log("bar pause============>"); // playBar.textContent = '>';

      playBar.setAttribute('class', 'playBtn');
      playerObj.pause();
    } else {
      // playBar.textContent = '||';
      playBar.setAttribute('class', 'pauseBtn');
      playerObj.play();
    }
  };

  playerCont.onmouseover = function () {
    controllerCont.hidden = false;
  };

  playerCont.onmouseout = function () {
    controllerCont.hidden = true;
  };

  playerDom.onmouseup = function () {
    playAction();
  };

  playBtn.onclick = function () {
    playAction();
  };

  muteBtn.onclick = function () {
    console.log(playerObj.getVolume());

    if (muteState === true) {
      playerObj.setVoice(1.0);
      progressVoice.value = 100;
    } else {
      playerObj.setVoice(0.0);
      progressVoice.value = 0;
    }

    muteState = !muteState;
  };

  fullScreenBtn.onclick = function () {
    playerObj.fullScreen();
  };

  playerObj.onRender = function (width, height, imageBufferY, imageBufferB, imageBufferR) {
    // screenView.render(width, height, imageBufferY, imageBufferB, imageBufferR);
    console.log("on render");
  };

  playerObj.onPlayTime = function (videoPTS) {
    if (mediaInfo.videoType == "vod") {
      // progressPts.value = videoPTS;
      var precent = videoPTS / progressCont.max;
      var progWidth = precent * progressContW; // console.log(precent, precent * progressCont.offsetWidth);

      progressPts.style.width = progWidth + 'px';
      ptsLabel.textContent = durationText(videoPTS) + '/' + durationText(progressCont.max);
    } else {
      // ptsLabel.textContent = durationText(videoPTS) + '/LIVE';
      ptsLabel.textContent = '/RAW';
    }
  };

  playerObj.onReadyShowDone = function () {
    console.log("onReadyShowDone");
    showLabel.textContent = "Done";
    playBar.setAttribute('class', 'pauseBtn');
  };

  playerObj.onLoadFinish = function () {
    playerObj.setVoice(1.0);
    mediaInfo = playerObj.mediaInfo();
    console.log("mediaInfo===========>", mediaInfo);
    showLabel.textContent = "loading cover";
    /*
        meta:
            durationMs: 144400
            fps: 25
            sampleRate: 44100
            size: {
                width: 864,
                height: 480
            },
            audioNone : false
        videoType: "vod"
    */

    playBar.disabled = false;

    if (mediaInfo.meta.audioNone) {
      progressVoice.value = 0;
      progressVoice.style.display = 'none';
    }

    if (mediaInfo.videoType == "vod") {
      progressPts.max = mediaInfo.meta.durationMs / 1000;
      ptsLabel.textContent = '0:0:0/' + durationText(progressPts.max);
    } else {
      cachePts.hidden = true;
      progressCont.hidden = true;
      ptsLabel.textContent = 'RAW';

      if (mediaInfo.meta.audioNone === true) {
        // playBar.textContent = '||';
        playerObj.play();
      } else {
        coverToast.removeAttribute('hidden');

        coverBtn.onclick = function () {
          // playBar.textContent = '||';
          playerObj.play();
          coverToast.setAttribute('hidden', 'hidden');
        };
      }
    } // showLabel.textContent = SHOW_DONE;


    var fetchFinished = false;
    var stopNaluInterval = false;

    var naluGetFunc = function naluGetFunc() {
      setTimeout(function () {
        workerParse.postMessage({
          cmd: "get-nalu",
          data: null,
          msg: "get-nalu"
        });

        if (stopNaluInterval === true) {
          return;
        } // naluGetFunc();

      }, 1000);
    };

    workerFetch.onmessage = function (event) {
      // console.log("play -> workerFetch recv:", event, playerObj);
      var body = event.data;
      var cmd = null;

      if (body.cmd === undefined || body.cmd === null) {
        cmd = '';
      } else {
        cmd = body.cmd;
      } // console.log("play -> workerFetch recv cmd:", cmd);


      switch (cmd) {
        case 'fetch-chunk':
          // console.log("play -> workerFetch append chunk");
          var chunk = body.data;
          workerParse.postMessage({
            cmd: "append-chunk",
            data: chunk,
            msg: "append-chunk"
          });
          break;

        case 'fetch-fin':
          fetchFinished = true;
          break;

        default:
          break;
      }
    };

    workerParse.onmessage = function (event) {
      // return-nalu
      // console.log("play -> workerParse recv:", event, playerObj);
      var body = event.data;
      var cmd = null;

      if (body.cmd === undefined || body.cmd === null) {
        cmd = '';
      } else {
        cmd = body.cmd;
      } // console.log("play -> workerParse recv cmd:", cmd);


      switch (cmd) {
        case 'return-nalu':
          var nalBuf = body.data;

          if (nalBuf === false || nalBuf === null || nalBuf === undefined) {
            if (fetchFinished === true) {
              stopNaluInterval = true;
            }
          } else {
            // console.warn("play -> workerParse nalu");
            playerObj.append265NaluFrame(nalBuf);
            workerParse.postMessage({
              cmd: "get-nalu",
              data: null,
              msg: "get-nalu"
            });
          }

          break;

        default:
          break;
      }
    };

    workerFetch.postMessage({
      cmd: "start",
      data: url265,
      msg: "start"
    });
    naluGetFunc();
  }; // onloadfinish


  playerObj["do"]();
  return playerObj;
};
/***************************************************
 *
 *
 *
 * 3. RAW HEVC
 * HEVC/H.265 Demo for LIVE, 直播Demo
 *
 *
 *
 ***************************************************/


var workerFetch = new Worker('./dist/worker-fetch-dist.js');
var workerParse = new Worker('./dist/worker-parse-dist.js');
console.log("workerFetch:", workerFetch);
console.log("workerParse:", workerParse);
/*
 * 创建265流播放器
 */

global.makeH265webjsRawLIVE = function (url265, config) {
  var playerId = config.player;

  var playerObj = _index["default"].createPlayer(null, config);

  var playerDom = document.querySelector('#' + playerId);
  var playerCont = document.querySelector('#player-container');
  var controllerCont = document.querySelector('#controller');
  var progressCont = document.querySelector('#progress-contaniner');
  var progressContW = progressCont.offsetWidth;
  var cachePts = progressCont.querySelector('#cachePts');
  var progressPts = progressCont.querySelector('#progressPts');
  var progressVoice = document.querySelector('#progressVoice');
  var playBar = document.querySelector('#playBar');
  var playBtn = playBar.getElementsByTagName('a')[0];
  var showLabel = document.querySelector('#showLabel');
  var ptsLabel = document.querySelector('#ptsLabel');
  var coverToast = document.querySelector('#coverLayer');
  var coverBtn = document.querySelector('#coverLayerBtn');
  var muteBtn = document.querySelector('#muteBtn'); // let debugYUVBtn     = document.querySelector('#debugYUVBtn');
  // let debugYUVATag    = document.querySelector('#debugYUVUrl');

  var fullScreenBtn = document.querySelector('#fullScreenBtn');
  var mediaInfo = null;
  playBtn.disabled = true;
  playBtn.textContent = '>';
  var muteState = false; // controllerCont.style.left = playerContainer.clientLeft;
  // controllerCont.style.bottom = playerContainer.clientBottom;
  // alert(playerContainer.clientLeft);

  var playAction = function playAction() {
    console.log("is playing:", playerObj.isPlaying());

    if (playerObj.isPlaying()) {
      console.log("bar pause============>"); // playBar.textContent = '>';

      playBar.setAttribute('class', 'playBtn');
      playerObj.pause();
    } else {
      // playBar.textContent = '||';
      playBar.setAttribute('class', 'pauseBtn');
      playerObj.play();
    }
  };

  playerCont.onmouseover = function () {
    controllerCont.hidden = false;
  };

  playerCont.onmouseout = function () {
    controllerCont.hidden = true;
  };

  playerDom.onmouseup = function () {
    playAction();
  };

  playBtn.onclick = function () {
    playAction();
  };

  muteBtn.onclick = function () {
    console.log(playerObj.getVolume());

    if (muteState === true) {
      playerObj.setVoice(1.0);
      progressVoice.value = 100;
    } else {
      playerObj.setVoice(0.0);
      progressVoice.value = 0;
    }

    muteState = !muteState;
  };

  fullScreenBtn.onclick = function () {
    playerObj.fullScreen();
  };

  playerObj.onRender = function (width, height, imageBufferY, imageBufferB, imageBufferR) {
    // screenView.render(width, height, imageBufferY, imageBufferB, imageBufferR);
    console.log("on render");
  };

  playerObj.onPlayTime = function (videoPTS) {
    if (mediaInfo.videoType == "vod") {
      // progressPts.value = videoPTS;
      var precent = videoPTS / progressCont.max;
      var progWidth = precent * progressContW; // console.log(precent, precent * progressCont.offsetWidth);

      progressPts.style.width = progWidth + 'px';
      ptsLabel.textContent = durationText(videoPTS) + '/' + durationText(progressCont.max);
    } else {
      // ptsLabel.textContent = durationText(videoPTS) + '/LIVE';
      ptsLabel.textContent = '/RAW';
    }
  };

  playerObj.onReadyShowDone = function () {
    console.log("onReadyShowDone");
    showLabel.textContent = "Done";
    playBar.setAttribute('class', 'pauseBtn');
  };

  playerObj.onLoadFinish = function () {
    playerObj.setVoice(1.0);
    mediaInfo = playerObj.mediaInfo();
    console.log("mediaInfo===========>", mediaInfo);
    showLabel.textContent = "loading cover";
    /*
        meta:
            durationMs: 144400
            fps: 25
            sampleRate: 44100
            size: {
                width: 864,
                height: 480
            },
            audioNone : false
        videoType: "vod"
    */

    playBar.disabled = false;

    if (mediaInfo.meta.audioNone) {
      progressVoice.value = 0;
      progressVoice.style.display = 'none';
    }

    if (mediaInfo.videoType == "vod") {
      progressPts.max = mediaInfo.meta.durationMs / 1000;
      ptsLabel.textContent = '0:0:0/' + durationText(progressPts.max);
    } else {
      cachePts.hidden = true;
      progressCont.hidden = true;
      ptsLabel.textContent = 'RAW';

      if (mediaInfo.meta.audioNone === true) {
        // playBar.textContent = '||';
        playerObj.play();
      } else {
        coverToast.removeAttribute('hidden');

        coverBtn.onclick = function () {
          // playBar.textContent = '||';
          playerObj.play();
          coverToast.setAttribute('hidden', 'hidden');
        };
      }
    } // showLabel.textContent = SHOW_DONE;

    /*****************************************
     *
     *  在这里把websocket 传输的一帧一帧的265 frame push进来
     *
     *****************************************/
    // @TODO : playerObj.append265NaluFrame(nalBuf);

  }; // onloadfinish


  playerObj["do"]();
  return playerObj;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./dist/index":2}]},{},[3]);

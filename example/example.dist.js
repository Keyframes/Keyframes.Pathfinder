(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _core = _interopRequireDefault(require("@keyframes/core"));

var _keyframes = _interopRequireDefault(require("../src/keyframes.pathfinder"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

_core.default.plugin(_keyframes.default);

var rules1 = {
  name: 'curvey'
};
var rules2 = {
  name: 'curveyplus'
};
var rules3 = {
  name: 'circular'
};
_core.default.pathfinderOpts.bezierSteps = 100;
rules1 = _core.default.bezierPath(rules1, [-50, 1], [800, 1], [400, 600]);
rules2 = _core.default.bezierPath(rules2, [-50, 100], [800, 100], [400, -100], [50, 600]);
rules3 = _core.default.circlePath(rules3, [100, 100], 40);

_core.default.define([rules1, rules2, rules3]);

window.onload = function () {
  var b1 = new _core.default(document.querySelectorAll('.block1')[0]);
  var b2 = new _core.default(document.querySelectorAll('.block2')[0]);
  var b3 = new _core.default(document.querySelectorAll('.block3')[0]);
  b1.play('curvey 10s linear 0s infinite');
  b2.play('curveyplus 10s linear 0s infinite');
  b3.play('circular 5s linear 0s infinite');
};

},{"../src/keyframes.pathfinder":3,"@keyframes/core":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Keyframes =
/*#__PURE__*/
function () {
  function Keyframes(elem) {
    _classCallCheck(this, Keyframes);

    this.elem = elem;
  }

  _createClass(Keyframes, [{
    key: "isSupported",
    value: function isSupported() {
      return document.body.style.animationName !== undefined;
    }
  }, {
    key: "reset",
    value: function reset(callback) {
      this.elem.style.animationPlayState = 'running';
      this.elem.style.animation = 'none';

      if (callback) {
        setTimeout(callback, 0);
      }
    }
  }, {
    key: "pause",
    value: function pause() {
      this.elem.style.animationPlayState = 'paused';
    }
  }, {
    key: "resume",
    value: function resume() {
      this.elem.style.animationPlayState = 'running';
    }
  }, {
    key: "play",
    value: function play(frameOptions, callback) {
      var _this = this;

      var animObjToStr = function animObjToStr(obj) {
        var newObj = Object.assign({}, {
          duration: '0s',
          timingFunction: 'ease',
          delay: '0s',
          iterationCount: 1,
          direction: 'normal',
          fillMode: 'forwards'
        }, obj);
        return [newObj.name, newObj.duration, newObj.timingFunction, newObj.delay, newObj.iterationCount, newObj.direction, newObj.fillMode].join(' ');
      };

      var animationcss = '';

      if (frameOptions.constructor === Array) {
        var frameOptionsStrings = [];

        for (var i = 0; i < frameOptions.length; i += 1) {
          frameOptionsStrings.push(typeof frameOptions[i] === 'string' ? frameOptions[i] : animObjToStr(frameOptions[i]));
        }

        animationcss = frameOptionsStrings.join(', ');
      } else if (typeof frameOptions === 'string') {
        animationcss = frameOptions;
      } else {
        animationcss = animObjToStr(frameOptions);
      }

      var addEvent = function addEvent(type, eventCallback) {
        var listenerName = "".concat(type, "Listener");

        _this.elem.removeEventListener(type, _this[listenerName]);

        _this[listenerName] = eventCallback;

        _this.elem.addEventListener(type, _this[listenerName]);
      };

      this.elem.style.animationPlayState = 'running';
      this.elem.style.animation = animationcss;
      this.frameOptions = frameOptions;
      addEvent('animationiteration', callback || frameOptions.complete);
      addEvent('animationend', callback || frameOptions.complete);
    }
  }], [{
    key: "createKeyframeTag",
    value: function createKeyframeTag(id, css) {
      var elem = document.createElement('style');
      elem.innerHTML = css;
      elem.setAttribute('class', 'keyframe-style');
      elem.setAttribute('id', id);
      elem.setAttribute('type', 'text/css');
      document.getElementsByTagName('head')[0].appendChild(elem);
    }
  }, {
    key: "generate",
    value: function generate(frameData) {
      var frameName = frameData.name || '';
      var css = "@keyframes ".concat(frameName, " {");

      for (var key in frameData) {
        if (key !== 'name' && key !== 'media' && key !== 'complete') {
          css += "".concat(key, " {");

          for (var property in frameData[key]) {
            css += "".concat(property, ":").concat(frameData[key][property], ";");
          }

          css += '}';
        }
      }

      if (frameData.media) {
        css = "@media ".concat(frameData.media, "{").concat(css, "}");
      }

      var frameStyle = document.getElementById(frameName);

      if (frameStyle) {
        frameStyle.innerHTML = css;
      } else {
        Keyframes.createKeyframeTag(frameName, css);
      }
    }
  }, {
    key: "define",
    value: function define(frameData) {
      if (frameData.length) {
        for (var i = 0; i < frameData.length; i += 1) {
          this.generate(frameData[i]);
        }
      } else {
        this.generate(frameData);
      }
    }
  }, {
    key: "plugin",
    value: function plugin(pluginFunc) {
      pluginFunc(Keyframes);
    }
  }]);

  return Keyframes;
}();

exports.default = Keyframes;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(Keyframes) {
  function getCirclePoint(radians, radius, center) {
    return {
      x: center.x + radius * Math.cos(radians),
      y: center.y + radius * Math.sin(radians)
    };
  } //= ===================================\\
  // 13thParallel.org Beziér Curve Code \\
  //   by Dan Pupius (www.pupius.net)   \\
  //= ===================================\\


  var coord = function coord(x, y) {
    return {
      x: x || 0,
      y: y || 0
    };
  };

  function B1(t) {
    return t * t * t;
  }

  function B2(t) {
    return 3 * t * t * (1 - t);
  }

  function B3(t) {
    return 3 * t * (1 - t) * (1 - t);
  }

  function B4(t) {
    return (1 - t) * (1 - t) * (1 - t);
  }

  function getBezier(percent, C1, C2, C3, C4) {
    var pos = coord();
    pos.x = C1.x * B1(percent) + C2.x * B2(percent) + C3.x * B3(percent) + C4.x * B4(percent);
    pos.y = C1.y * B1(percent) + C2.y * B2(percent) + C3.y * B3(percent) + C4.y * B4(percent);
    return pos;
  }

  Keyframes.bezierPath = function (kfro, p1, p2, p3, p4) {
    var opts = Keyframes.pathfinderOpts;

    if (p4 == null) {
      p4 = p1;
    }

    p1 = coord(p1[0], p1[1]);
    p2 = coord(p2[0], p2[1]);
    p3 = coord(p3[0], p3[1]);
    p4 = coord(p4[0], p4[1]);
    var points = {};
    var step = 1 / opts.bezierSteps;

    for (var i = 0; i <= 1.01; i += step) {
      var newpos = getBezier(i, p1, p4, p3, p2);
      points["".concat(100 - Math.round(i * 100), "%")] = {
        transform: "translate(".concat(newpos.x, "px,").concat(newpos.y, "px)")
      };
    }

    return Object.assign({}, kfro, points);
  };

  Keyframes.circlePath = function (kfro, center, radius) {
    var opts = Keyframes.pathfinderOpts;
    var newCenter = coord(center[0], center[1]);
    var points = {};
    var pieandahalf = 1.5 * Math.PI;
    var notmuchpie = Math.PI / 180;
    var step = 100 / opts.circleSteps;
    var degreestep = 360 / opts.circleSteps;

    for (var i = 0; i <= opts.circleSteps; i += 1) {
      var degree = degreestep * i;
      var radians = pieandahalf + degree * notmuchpie;
      var newpos = getCirclePoint(radians, radius, newCenter);
      points["".concat(Math.round(step * i), "%")] = {
        transform: "translate(".concat(newpos.x, "px,").concat(newpos.y, "px)")
      };
    }

    for (step in kfro) {
      var rules = kfro[step];

      for (var newstep in points) {
        var newrules = points[newstep];

        if (step === newstep) {
          if (newrules.transform && rules.transform) {
            points[newstep].transform = "".concat(newrules.transform, " ").concat(rules.transform);
            break;
          }
        }
      }
    }

    return Object.assign({}, kfro, points);
  };

  Keyframes.pathfinderOpts = {
    bezierSteps: 100,
    circleSteps: 100
  };
};

exports.default = _default;

},{}]},{},[1]);

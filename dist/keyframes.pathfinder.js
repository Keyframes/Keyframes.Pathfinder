(function () {
  function getCirclePoint(radians, radius, center) {
    return {
      x: center.x + radius * Math.cos(radians),
      y: center.y + radius * Math.sin(radians)
    };
  }

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
})();
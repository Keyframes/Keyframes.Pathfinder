Keyframes.Pathfinder
====================

This plugin for jQuery.Keyframes generates complex movement paths.

## Simple Bezier Curve
![](http://i.imgur.com/8rwTSrv.png)

```$.keyframe.bezierPath( rules, [startX,startY], [endX,endY], [pullX,pullY] );```

Super simple example:
```javascript
var rules = $.keyframe.bezierPath( { name: 'curvy' } , [1,1], [400,1], [200,300] );
$.keyframe.define([rules]);
$(window).load(function(){
  $('.block').playKeyframe('curvey 5s ease 0 1 normal forwards');
});
```

## Advanced Bezier Curve

![](http://i.imgur.com/QJ8ewHu.png)

```$.keyframe.bezierPath( rules, [startX,startY], [endX,endY], [pull1X,pull1Y], [pull2X,pull2Y] );```

Simple example:
```javascript
var rules = $.keyframe.bezierPath( { name: 'curvyplus' }, [1,100], [800,100], [400,-100], [50, 600]);
$.keyframe.define([rules]);
$(window).load(function()
  $('.block').playKeyframe('curveyplus 5s ease 0 1');
});
```

## Circular Paths
![](http://img19.imageshack.us/img19/8696/lp4r.png)

```$.keyframe.circlePath( rules, [centerX, centerY], radius);```

Simple Example:
```javascript
var rules = $.keyframe.circlePath( { name: 'circular' }, [100, 100], 40);
$.keyframe.define([rules]);
$(window).load(function()
  $('.block').playKeyframe('circular 5s linear 0 infinite');
});
```

## Options

By default the paths are set to 100 steps, but you can change them to suit your needs...
```javascript
$.keyframe.pathfinderOpts.bezierSteps = 100;
$.keyframe.pathfinderOpts.circleSteps = 100;
```

## Toys

http://jsfiddle.net/krazyjakee/N652c/ - Bubbles in space game.
http://jsfiddle.net/krazyjakee/fwnuys9j/ - CSS3 Loader

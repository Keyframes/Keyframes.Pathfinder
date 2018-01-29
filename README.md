Keyframes.Pathfinder
====================

This plugin for Keyframes generates complex movement paths.

## Simple Bezier Curve
![](https://raw.githubusercontent.com/Keyframes/Keyframes.Pathfinder/6c225cfb/screenshots/a.png)

```Keyframes.bezierPath( rules, [startX,startY], [endX,endY], [pullX,pullY] );```

Super simple example:
```javascript
var rules = Keyframes.bezierPath( { name: 'curvy' } , [1,1], [400,1], [200,300] );
Keyframes.define([rules]);
window.onload = () => {
  const block = document.querySelectorAll('.block1')[0];
  block.play('curvey 5s ease 0 1 normal forwards');
};
```

## Advanced Bezier Curve

![](https://raw.githubusercontent.com/Keyframes/Keyframes.Pathfinder/6c225cfb/screenshots/b.png)

```Keyframes.bezierPath( rules, [startX,startY], [endX,endY], [pull1X,pull1Y], [pull2X,pull2Y] );```

Simple example:
```javascript
var rules = Keyframes.bezierPath( { name: 'curvyplus' }, [1,100], [800,100], [400,-100], [50, 600]);
Keyframes.define([rules]);
window.onload = () => {
  const block = document.querySelectorAll('.block1')[0];
  block.play('curveyplus 5s ease 0 1');
};
```

## Circular Paths

```Keyframes.circlePath( rules, [centerX, centerY], radius);```

Simple Example:
```javascript
var rules = Keyframes.circlePath( { name: 'circular' }, [100, 100], 40);
Keyframes.define([rules]);
window.onload = () => {
  const block = document.querySelectorAll('.block1')[0];
  block.play('circular 5s linear 0 infinite');
};
```

## Options

By default the paths are set to 100 steps, but you can change them to suit your needs...
```javascript
Keyframes.pathfinderOpts.bezierSteps = 100;
Keyframes.pathfinderOpts.circleSteps = 100;
```

## Toys

http://jsfiddle.net/krazyjakee/N652c/ - Bubbles in space game.

http://jsfiddle.net/krazyjakee/fwnuys9j/ - CSS3 Loader

import Keyframes from '@keyframes/core';
import Pathfinder from '../src/keyframes.pathfinder';

Keyframes.plugin(Pathfinder);

let rules1 = {
    name: 'curvey',
};

let rules2 = {
    name: 'curveyplus',
};

let rules3 = {
    name: 'circular',
};

Keyframes.pathfinderOpts.bezierSteps = 100;

/* Bird 1 uses a simple bezier path */
rules1 = Keyframes.bezierPath(rules1, [-50, 1], [800, 1], [400, 600]);

/* Bird 2 uses a 4th coordinate */
rules2 = Keyframes.bezierPath(rules2, [-50, 100], [800, 100], [400, -100], [50, 600]);

/* Bird 3 uses a circle path */
rules3 = Keyframes.circlePath(rules3, [100, 100], 40);

Keyframes.define([rules1, rules2, rules3]);

window.onload = function () {
    const b1 = new Keyframes(document.querySelectorAll('.block1')[0]);
    const b2 = new Keyframes(document.querySelectorAll('.block2')[0]);
    const b3 = new Keyframes(document.querySelectorAll('.block3')[0]);
    b1.play('curvey 10s linear 0s infinite');
    b2.play('curveyplus 10s linear 0s infinite');
    b3.play('circular 5s linear 0s infinite');
};

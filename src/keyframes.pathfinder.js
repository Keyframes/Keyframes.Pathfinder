/* global Keyframes */
export default () => {
    function getCirclePoint(radians, radius, center) {
        return {
            x: (center.x + radius * Math.cos(radians)),
            y: (center.y + radius * Math.sin(radians)),
        };
    }

    //= ===================================\\
    // 13thParallel.org Beziér Curve Code \\
    //   by Dan Pupius (www.pupius.net)   \\
    //= ===================================\\

    const coord = function (x, y) {
        return { x: x || 0, y: y || 0 };
    };

    function B1(t) { return t * t * t; }
    function B2(t) { return 3 * t * t * (1 - t); }
    function B3(t) { return 3 * t * (1 - t) * (1 - t); }
    function B4(t) { return (1 - t) * (1 - t) * (1 - t); }

    function getBezier(percent, C1, C2, C3, C4) {
        const pos = coord();
        pos.x = C1.x * B1(percent) + C2.x * B2(percent) + C3.x * B3(percent) + C4.x * B4(percent);
        pos.y = C1.y * B1(percent) + C2.y * B2(percent) + C3.y * B3(percent) + C4.y * B4(percent);
        return pos;
    }

    Keyframes.bezierPath = (kfro, p1, p2, p3, p4) => {
        const opts = Keyframes.pathfinderOpts;
        if (p4 == null) {
            p4 = p1;
        }

        p1 = coord(p1[0], p1[1]);
        p2 = coord(p2[0], p2[1]);
        p3 = coord(p3[0], p3[1]);
        p4 = coord(p4[0], p4[1]);

        const points = {};
        const step = 1 / opts.bezierSteps;

        for (let i = 0; i <= 1.01; i += step) {
            const newpos = getBezier(i, p1, p4, p3, p2);
            points[`${100 - Math.round(i * 100)}%`] = { transform: `translate(${newpos.x}px,${newpos.y}px)` };
        }

        return Object.assign({}, kfro, points);
    };

    Keyframes.circlePath = (kfro, center, radius) => {
        const opts = Keyframes.pathfinderOpts;

        const newCenter = coord(center[0], center[1]);
        const points = {};
        const pieandahalf = 1.5 * Math.PI;
        const notmuchpie = Math.PI / 180;
        let step = 100 / opts.circleSteps;
        const degreestep = 360 / opts.circleSteps;

        for (let i = 0; i <= opts.circleSteps; i += 1) {
            const degree = degreestep * i;
            const radians = pieandahalf + degree * notmuchpie;
            const newpos = getCirclePoint(radians, radius, newCenter);
            points[`${Math.round(step * i)}%`] = { transform: `translate(${newpos.x}px,${newpos.y}px)` };
        }

        for (step in kfro) {
            const rules = kfro[step];
            for (const newstep in points) {
                const newrules = points[newstep];
                if (step === newstep) {
                    if (newrules.transform && rules.transform) {
                        points[newstep].transform = `${newrules.transform} ${rules.transform}`;
                        break;
                    }
                }
            }
        }

        return Object.assign({}, kfro, points);
    };

    Keyframes.pathfinderOpts = {
        bezierSteps: 100,
        circleSteps: 100,
    };
};

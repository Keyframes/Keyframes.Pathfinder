(function() {
    var $createKeyframeStyleTag, animationPlayState, playStateRunning, vendorPrefix;

    $createKeyframeStyleTag = function(params) {
        return $("<style>").attr({
            class: "keyframe-style",
            id: params.id,
            type: "text/css"
        }).appendTo("head");
    };

    $.keyframe = {
        getVendorPrefix: function() {
            var ua;
            ua = navigator.userAgent;
            if (ua.indexOf("Opera") !== -1) {
                return "-o-";
            } else if (ua.indexOf("MSIE") !== -1) {
                return "-ms-";
            } else if (ua.indexOf("WebKit") !== -1) {
                return "-webkit-";
            } else {
                return "";
            }
        },
        isSupported: function() {
            var animationSupport, element, pfx;

            element = $('body').get(0);
            animationSupport = false;

            if (element.style.animationName) {
                animationSupport = true;
            } else {
                pfx = this.getVendorPrefix().slice(1, -1);
                var property = pfx + "AnimationName";

                if (property in element.style) {
                    animationSupport = true;
                }
            }

            return animationSupport;
        },
        getProperty: function(property) {
            var temp = property;

            switch (property) {
                case "transform":
                    temp = this.getVendorPrefix() + temp;
                    break;

                    /**
                     * We can add more support here
                     */
            }

            return temp;
        },
        generate: function(frameData) {
            var $elems, $frameStyle, css, frameName, property;
            frameName = frameData.name || "";
            css = "@" + (this.getVendorPrefix()) + "keyframes " + frameName + " {";

            for (key in frameData) {
                if (key !== "name") {
                    css += key + " {";

                    for (property in frameData[key]) {
                        var pfx_property = this.getProperty(property);
                        css += pfx_property + ":" + frameData[key][property] + ";";
                    }

                    css += "}";
                }
            }

            css += "}";

            $frameStyle = $("style#" + frameData.name);

            if ($frameStyle.length > 0) {
                $frameStyle.html(css);

                $elems = $("*").filter(function() {
                    this.style["" + ($.keyframe.getVendorPrefix().slice(1, -1)) + "AnimationName"] === frameName;
                });

                $elems.each(function() {
                    var $el, options;
                    $el = $(this);
                    options = $el.data("keyframeOptions");
                    $el.resetKeyframe(function() {
                        $el.playKeyframe(options);
                    });
                });
            } else {
                $createKeyframeStyleTag({
                    id: frameName
                }).append(css);
            }
        },
        define: function(frameData) {
            if (frameData.length) {
                for (var i = 0; i < frameData.length; i++) {
                    var frame = frameData[i];
                    this.generate(frame);
                }
            } else {
                return this.generate(frameData);
            }
        }
    };

    vendorPrefix = $.keyframe.getVendorPrefix();
    animationPlayState = "animation-play-state";
    playStateRunning = "running";

    $.fn.resetKeyframe = function(callback) {
        var $el = $(this).css(vendorPrefix + animationPlayState, playStateRunning).css(vendorPrefix + "animation", "none");

        if (callback) {
            setTimeout(callback, 1);
        }
    };

    $.fn.pauseKeyframe = function() {
        var $el = $(this).css(vendorPrefix + animationPlayState, "paused");
    };

    $.fn.resumeKeyframe = function() {
        return $(this).css(vendorPrefix + animationPlayState, playStateRunning);
    };

    $.fn.playKeyframe = function(frameOptions, callback) {
        var animationcss, animationkey, delay, duration, pfx, repeat;

        if (typeof frameOptions === 'string') {
            var frameOptSplit = frameOptions.trim().split(' ');
            frameOptions = {
                name: frameOptSplit[0],
                duration: parseInt(frameOptSplit[1]),
                timingFunction: frameOptSplit[2],
                delay: parseInt(frameOptSplit[3]),
                repeat: frameOptSplit[4],
                complete: callback
            }
        }

        frameOptions = $.extend({
            duration: 0,
            timingFunction: "ease",
            delay: 0,
            repeat: 1,
            direction: "normal",
            fillMode: "forwards",
            complete: callback
        }, frameOptions);

        duration = frameOptions.duration;
        delay = frameOptions.delay;
        repeat = frameOptions.repeat;
        animationcss = "" + frameOptions.name + " " + duration + "ms " + frameOptions.timingFunction + " " + delay + "ms " + repeat + " " + frameOptions.direction + " " + frameOptions.fillMode;
        callback = frameOptions.complete;
        animationkey = vendorPrefix + "animation";
        pfx = ["webkit", "moz", "MS", "o", ""];

        var _prefixEvent = function(element, type, callback) {
            var evt, p, _results;
            p = 0;
            _results = [];
            while (p < pfx.length) {
                if (!pfx[p]) {
                    type = type.toLowerCase();
                }
                evt = pfx[p] + type;
                element.off(evt).on(evt, callback);
                _results.push(p++);
            }
            _results;
        };

        this.each(function() {
            var $el = $(this).addClass("boostKeyframe").css(vendorPrefix + animationPlayState, playStateRunning).css(animationkey, animationcss).data("keyframeOptions", frameOptions);
            if (callback) {
                _prefixEvent($el, 'AnimationIteration', callback);
                _prefixEvent($el, 'AnimationEnd', callback);
            }
        });
    };

    $createKeyframeStyleTag({
        id: "boost-keyframe"
    }).append(" .boostKeyframe{" + vendorPrefix + "transform:scale3d(1,1,1);}");

}).call(this);

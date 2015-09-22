window.backstretch = (function() {

    //config
    var classNameSearch = "backstretch";
    var classNameApplied = "backstretched";
    var classLoaded = "loaded";

    //storage
    var sheet = null;
    var backstretchArray = [];

    //global methods
    function run(parentEl) {
        var node = parentEl || document;
        var queryString = "." + classNameSearch + ":not(" + classNameApplied + ")";
        var els = node.querySelectorAll(queryString);
        if (!sheet) {
            sheet = newSheet();
            addCSSRule(sheet, ".backstretch", "position:relative; overflow:hidden");
            addCSSRule(sheet, ".backstretch img", "position:absolute;");
            window.addEventListener('resize', resizeEls, true);
        }
        for (var i = 0, l = els.length; i < l; i++) {
            new Backstrech(els[i], i);
        }
    };

    function clear(parentEl) {
        var node = parentEl || document;
        var queryString = "." + classNameSearch + "." + classNameApplied;
        var els = node.querySelectorAll(queryString);
        for (var i = els.length; i-- > 0;) {
            removeEl(els[i]);
        }
    };

    function removeEl(el) {
        for (var i = 0, l = backstretchArray.length; i < l; i++) {
            if (backstretchArray[i].parentEl === el) {
                backstretchArray[i].remove();
                backstretchArray.splice(i, 1);
                break;
            }
        }
    };

    //private methods
    function resizeEls() {
        for (var i = 0; i < backstretchArray.length; i++) {
            backstretchArray[i].resize();
        }
    };

    function setStyles(elem, styles) {
        for (var property in styles)
            elem.style[property] = styles[property];
    };

    function newSheet() {
        var style = document.createElement("style");

        // WebKit hack :(
        style.appendChild(document.createTextNode(""));

        // Add the <style> element to the page
        document.head.appendChild(style);

        return style.sheet;
    };

    function addCSSRule(sheet, selector, rules, index) {
        if ("insertRule" in sheet) {
            sheet.insertRule(selector + "{" + rules + "}", index);
        }
        else if ("addRule" in sheet) {
            sheet.addRule(selector, rules, index);
        }
    };

    //backstretch class
    function Backstrech(el) {
        this.parentEl = el;
        this.imgEl = el.getElementsByTagName("img")[0];
        this.init();
    };

    Backstrech.prototype.init = function() {
        backstretchArray.push(this);
        this.parentEl.classList.add(classNameApplied);
        this.load();
    };

    Backstrech.prototype.load = function() {
        var src = this.imgEl.getAttribute('data-src');
        var imgEl = this.imgEl;
        var _this = this;
        imgEl.setAttribute('src', src);
        imgEl.onload = function() {
            _this.imageWidth = imgEl.width;
            _this.imageHeight = imgEl.height;
            _this.imageAspectRatio = _this.imageWidth / _this.imageHeight;
            _this.resize();
            _this.parentEl.classList.add(classLoaded);
        };
    };

    Backstrech.prototype.remove = function() {
        this.parentEl.classList.remove(classNameApplied);
    };

    Backstrech.prototype.resize = function() {
        var h = this.parentEl.offsetHeight || this.parentEl.clientHeight;
        var w = this.parentEl.offsetWidth || this.parentEl.clientWidth;

        var newWidth = w;
        var scale = newWidth / this.imageWidth;
        var newHeight = this.imageHeight * scale;

        if (newHeight < h) {
            newHeight = h;
            scale = newHeight / this.imageHeight;
            newWidth = this.imageWidth * scale;
        }

        var top = -(newHeight - h) / 2;
        var left = -(newWidth - w) / 2;

        setStyles(this.imgEl, {
            width: newWidth + "px",
            height: newHeight + "px",
            top: top + "px",
            left: left + "px"
        });
    };

    return {
        run: run,
        clear: clear,
        removeEl: removeEl
    };
})();
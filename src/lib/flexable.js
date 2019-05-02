/**
 * @file flexable 适配脚本
 * @date 2019/04/01
 * @author hpuhouzhiqiang@gmail.com
 */


(function flexible(window, document) {
    var docEl = document.documentElement;
    var dpr = window.devicePixelRatio || 1;
    // adjust body font size
    function setBodyFontSize() {
        if (document.body) {
            document.body.style.fontSize = (12 * dpr) + 'px';
        } else {
            document.addEventListener('DOMContentLoaded', setBodyFontSize);
        }
    }
    setBodyFontSize();

    // set 1rem = viewWidth / 10
    function setRemUnit() {
        var rem = docEl.clientWidth / 10;
        docEl.style.fontSize = rem + 'px';
    }

    setRemUnit();

    // reset rem unit on page resize
    window.addEventListener('resize', setRemUnit);
    window.addEventListener('pageshow', function (e) {
        if (e.persisted) {
            setRemUnit();
        }
    });

    // detect 0.5px supports
    if (dpr >= 2) {
        var fakeBody = document.createElement('body');
        var testElement = document.createElement('div');
        testElement.style.border = '.5px solid transparent';
        fakeBody.appendChild(testElement);
        docEl.appendChild(fakeBody);
        if (testElement.offsetHeight === 1) {
            docEl.classList.add('hairlines');
        }
        docEl.removeChild(fakeBody);
    }
}(window, document));


(function () {
    // 双指缩放
    document.documentElement.addEventListener('touchmove', function (event) {
        if (event.touches.length > 1) {
            event.preventDefault();
        }

        var inputList = document.getElementsByTagName('input');

        for (var i = 0; i < inputList.length; i++) {
            (function (index) {
                inputList[index].blur();
            })(i);
        }

    }, false);

    // 双击缩放
    var lastTouchEnd = 0;
    document.documentElement.addEventListener('touchend', function (event) {
        var now = Date.now();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
})();

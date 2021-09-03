// ==UserScript==
// @name         [HFR] YouTube embedded videos
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Embed YouTube videos
// @author       Flaie
// @match        https://forum.hardware.fr/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    [...document.querySelectorAll('a')].filter(a => a.parentElement.className !== 'signature').filter(a => a.href.includes('https://') && a.href.includes('youtu'))
        .forEach(a => {
        if (a.href.includes('playlist')) {
            const code = a.href.split('=').pop();
            a.innerHTML = `<br/><iframe frameborder="0" scrolling="no" marginheight="0" marginwidth="0" width="800" height="450" type="text/html" src="https://www.youtube.com/embed/videoseries?list=${code}&autoplay=0&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0&vq=hd1080"></iframe><br/>`;
        } else {
            const code = (a.href.includes('watch') ? a.href.split('=') : a.href.split('/')).pop();
            a.innerHTML = `<br/><iframe frameborder="0" scrolling="no" marginheight="0" marginwidth="0" width="800" height="450" type="text/html" src="https://www.youtube.com/embed/${code}?autoplay=0&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0&vq=hd1080"></iframe><br/>`;
        }
    });

})();

// ==UserScript==
// @name         [HFR] Highlight when I'm quoted
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Highlight me cause I love myself
// @author       Flaie
// @match        https://forum.hardware.fr/forum2.php*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // me
    [...document.getElementsByClassName('s1')].filter(e => e.innerText == 'Flaie a écrit :').map(e => e.closest('table')).map(e => {
        e.style.backgroundColor = '#E3F3FF'; e.style.border = '1px solid #369';
    });
})();

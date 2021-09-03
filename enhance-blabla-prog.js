// ==UserScript==
// @name         [HFR] Enhance Blabla@Prog
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Blocks some annoying users
// @author       Flaie
// @match        https://forum.hardware.fr/forum2.php?config=hfr.inc&cat=10&post=37483*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const aliases = ['faston', 'jumelai'];
    const quotes = aliases.map(a => a + ' a écrit :');

    [...document.getElementsByClassName('s2')].filter(e => aliases.includes(e.innerText)).map(e => e.closest('table')).forEach(e => e.remove());
    [...document.getElementsByClassName('s1')].filter(e => quotes.includes(e.innerText)).map(e => {
        e.parentNode.lastElementChild.innerHTML = '<img src="https://upload.wikimedia.org/wikipedia/en/9/9a/Trollface_non-free.png" width="50"/>'
    });
})();

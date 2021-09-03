// ==UserScript==
// @name         [HFR] Twitter embedded tweets
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Embed tweets in posts
// @author       Flaie
// @match        https://forum.hardware.fr/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const tweets = [...document.querySelectorAll('a')].filter(a => a.href.includes('https://') && a.href.includes('twitter'));

    if (tweets.length > 0) {
        // Load the script
        var script = document.createElement("SCRIPT");
        script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
        script.type = 'text/javascript';
        document.getElementsByTagName("head")[0].appendChild(script);
        script.onload = function() {
            window.jQuery('html > head').append(window.jQuery(`<style>
        .twitter-tweet {
            background: white;
            border: 1px solid #1DA1F2;
            width: 600px;
            border-radius: 20px;
            padding: 10px;
            color: black;
        }

        blockquote.twitter-tweet > a {
            color: ##0f5c8a;
            font-weight: bold;
        }
        </style>`));

        tweets.forEach(a => {
            const id = a.href.split('/').pop().split('?')[0];

            window.jQuery.ajax({
                type:     "GET",
                url:      "https://api.twitter.com/1/statuses/oembed.json?id=" + id.split('?')[0],
                dataType: "jsonp",
                success: (data) => {
                    let d = document.createElement('div');
                    a.parentNode.insertBefore(d, a.parentNode.firstElementChild);
                    a.remove();
                    let html = data.html.split('&mdash;');
                    d.innerHTML = html[0] + ' &mdash; ' + html[1].replace(/(@[^)]+)/g, '<a href="' + data.author_url + '">$1</a>');
                }
            });
        });
    };
    }

})();

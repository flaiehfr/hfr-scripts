// ==UserScript==
// @name         [ReHost] Multiple Upload with Drag & Drop
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Multiple upload on Rehost using drag and drop
// @author       Flaie
// @match        https://rehost.diberie.com/Host
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // inject CSS
    $('html > head').append($(`<style>
        #image-preview .image-view {
            display: inline-block;
        	position:relative;
        	margin-right: 13px;
        	margin-bottom: 13px;
        }
        #image-preview .image-view img {
            max-width: 100px;
            max-height: 100px;
        }
        #image-preview .overlay {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            right: 0;
            z-index: 2;
            background: rgba(255,255,255,0.5);
        }
        </style>`));

    // inject HTML
    $($(".card-body")[0]).parent().prepend(
        $(`<div id="drop-region" style="padding:100px 50px; text-align: center; cursor:pointer">
	        <div style="color: darkred">
		        drag & drop or click <img src="https://forum-images.hardware.fr/icones/redface.gif" />
	        </div>
	        <div id="image-preview" style="margin-top:20px"></div>
        </div>
        <pre id="bbcode" style="text-align: center; font-size: 0.8em"></pre>`));

    const dropRegion = document.getElementById("drop-region"),
          previewRegion = document.getElementById("image-preview");

    // open file selector when clicked on the drop region
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = true;
    dropRegion.addEventListener('click', input.click);

    input.addEventListener("change", () => handleFiles(input.files));

    const preventDefault = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    dropRegion.addEventListener('dragenter', preventDefault, false);
    dropRegion.addEventListener('dragleave', preventDefault, false);
    dropRegion.addEventListener('dragover', preventDefault, false);
    dropRegion.addEventListener('drop', preventDefault, false);

    const handleDrop = (e) => {
        const files = e.dataTransfer.files;

        if (files.length) {
            handleFiles(files);
        }
    }

    dropRegion.addEventListener('drop', handleDrop, false);

    const handleFiles = (files) => {
        for (var i = 0, len = files.length; i < len; i++) {
            previewAnduploadImage(files[i]);
        }
    }

    const previewAnduploadImage = (image) => {
        const imgView = document.createElement("div");
        imgView.className = "image-view";
        previewRegion.appendChild(imgView);

        const img = document.createElement("img");
        imgView.appendChild(img);

        const overlay = document.createElement("div");
        overlay.className = "overlay";
        imgView.appendChild(overlay);

        const reader = new FileReader();
        reader.onload = (e) => img.src = e.target.result;
        reader.readAsDataURL(image);

        // create FormData
        var formData = new FormData();
        formData.append('_' + Math.random().toString(36).substr(2, 9) + ".png", image);

        const xhr = new XMLHttpRequest();
        // upload to TEMP directory
        xhr.open("POST", "/Host/UploadFiles?SelectedAlbumId=42&PrivateMode=false&SendMail=false&Comment=", true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const jsonResponse = JSON.parse(xhr.responseText);
                $("#bbcode").append(jsonResponse.resizedBBLink + "\n");
            }
        }

        xhr.upload.onprogress = (e) => {
            var perc = (e.loaded / e.total * 100) || 100,
                width = 100 - perc;

            overlay.style.width = width;
        }

        xhr.send(formData);
    }
})();

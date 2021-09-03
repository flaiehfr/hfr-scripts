// ==UserScript==
// @name         [ReHost] Upload to TEMP gallery from clipboard
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Upload from clipboard in my TEMP gallery
// @author       You
// @match        https://rehost.diberie.com/Host
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    document.onpaste = function (event) {
        const image = event.clipboardData.items[0].getAsFile();
        const fileData = new FormData();
        fileData.append('_' + Math.random().toString(36).substr(2, 9) + ".png", image);
        const xhr = new XMLHttpRequest();
        // upload to TEMP directory
        xhr.open("POST", "/Host/UploadFiles?SelectedAlbumId=42&PrivateMode=false&SendMail=false&Comment=", true);
        xhr.send(fileData);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const jsonResponse = JSON.parse(xhr.responseText);
                $('#btn_upload').hide();
                $('#btn_uploading').hide();
                $('#btn_uploaded').show();
                $('#btn_newupload').show();

                $('#pnl_Success').show();
                $('#pnl_Error').hide();
                $('#lbl_UploadError').hide();

                $('#img_ThePic').attr("src", jsonResponse.resizedURL)
                    .attr("width", jsonResponse.previewWidht)
                    .attr("height", jsonResponse.previewHeight);

                $('#hdn_PictureId').val(jsonResponse.picID);
                $('#hdn_PictureRotationAngle').val(0);
                $('#DeletePhoto_IdPhoto').val(jsonResponse.picID);
                $('#td_ImageLink').html(jsonResponse.picURL);
                $('#td_ThumbLink').html(jsonResponse.thumbURL);
                $('#td_ResizedLink').html(jsonResponse.resizedURL);
                $('#td_BBImageLink').html(jsonResponse.picBB);
                $('#td_BBThumbLink').html(jsonResponse.thumbBB);
                $('#td_BBThumbLinkLink').html(jsonResponse.thumbBBLink);
                $('#td_BBResizedLinkLink').html(jsonResponse.resizedBBLink);
                $('#td_Comment').html(jsonResponse.comment);
            }
        }
    }
})();

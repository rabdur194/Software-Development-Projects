var dynamicVars;
var images = [];

window.onload = function() {
    
    myFT.on('DOMLoaded', function() {
        myFT.on('instantads', function(event) {
            
            dynamicVars = myFT.instantAds;

            banner.classList.add(checkPlatform()[0] + '-' + checkPlatform()[1]);
            document.head.appendChild(document.createElement("style")).innerHTML = dynamicVars.CSS_txt; //Insert CSS

            
            setImages();
            isImageLoaded();
          
            setMetaData(
                f1Txt, 
                dynamicVars.f1_headline_txt, 
                dynamicVars.f1_headline_copycolor_fontsize_XY
            );
            setMetaData(
                f1DiscTxt, 
                dynamicVars.f1_disclaimer_txt, 
                dynamicVars.f1_disclaimer_copycolor_fontsize_XY
            );
            setMetaData(
                f2Txt, 
                dynamicVars.f2_headline_txt, 
                dynamicVars.f2_headline_txt_copycolor_fontsize_XY
            );
            setMetaData(
                f2DiscTxt, 
                dynamicVars.f2_disclaimer_txt, 
                dynamicVars.f2_disclaimer_txt_copycolor_fontsize_XY
            );
            setMetaData(
                f3Txt, 
                dynamicVars.f3_headline_txt, 
                dynamicVars.f3_headline_txt_copycolor_fontsize_XY
            );
            setMetaData(
                f3DiscTxt, 
                dynamicVars.f3_disclaimer_txt, 
                dynamicVars.f3_disclaimer_txt_copycolor_fontsize_XY
            );
            setMetaData(
                f4Txt, 
                dynamicVars.f4_headline_txt, 
                dynamicVars.f4_headline_txt_copycolor_fontsize_XY
            );
            setMetaData(
                f4DiscTxt, 
                dynamicVars.f4_disclaimer_txt, 
                dynamicVars.f4_disclaimer_txt_copycolor_fontsize_XY
            );
            
            setBgColor(frame1, dynamicVars.f1_background_color);
            setBgColor(frame2, dynamicVars.f2_background_color);
            setBgColor(frame3, dynamicVars.f3_background_color);
            setBgColor(frame4, dynamicVars.f4_background_color);

            setBgColor(f1Disc, dynamicVars.f1_disclaimer_bkgcolor);
            setBgColor(f2Disc, dynamicVars.f2_disclaimer_bkgcolor);
            setBgColor(f3Disc, dynamicVars.f3_disclaimer_bkgcolor);
            setBgColor(f4Disc, dynamicVars.f4_disclaimer_bkgcolor);
         

            setXY(f2IconImg, dynamicVars.f2_icon_img_XY);
            setXY(f3IconImg, dynamicVars.f3_icon_img_XY);


            setCta();
            animateBanner();
            setClicktags();
        });
    })
}

function isImageLoaded() {
    var loadedImages = 0;
    for (var i = 0; i < images.length; i++) {
        images[i].onload = function(event) {
            if (event.target.complete) {
                loadedImages++;
            }
            if (loadedImages === images.length) {
                gsap.set(banner, {
                    autoAlpha: 1
                });
                initBanner();
            }
        }
    }
}

function initBanner() {
    myFT.dispatch('richload_ready');
}

function setImages() {
  
    if (dynamicVars.f1_background_img && dynamicVars.f1_background_img.trim()) {
        f1BgImg.src = dynamicVars.f1_background_img.trim();
        images.push(f1BgImg);
    }
    if (dynamicVars.f2_icon_img && dynamicVars.f2_icon_img.trim()) {
        f2IconImg.src = dynamicVars.f2_icon_img.trim();
        images.push(f2IconImg);
    }
    if (dynamicVars.f3_icon_img && dynamicVars.f3_icon_img.trim()) {
        f3IconImg.src = dynamicVars.f3_icon_img.trim();
        images.push(f3IconImg);
    }
    if (dynamicVars.f4_background_img && dynamicVars.f4_background_img.trim()) {
        f4BgImg.src = dynamicVars.f4_background_img.trim();
        images.push(f4BgImg);
    }
}

function setMetaData(element, copy, copycolor_fontsize_XY) {
    if(copy.split('|').length > 1){
    var text_array= copy.split('|');
    var divText = '';
    for(var i=0; i<text_array.length; i++){
        divText += "<span class='second-headline-"+i+"'>"+text_array[i]+"</span><br/>";
        element.innerHTML = divText;
    }
    }else {
        if (copy && copy.trim()) {
            element.innerHTML = copy.trim();
        }
    }
    if (copycolor_fontsize_XY && 
        copycolor_fontsize_XY.trim() &&
        copycolor_fontsize_XY.trim().split("|").length !== 0 &&
        copycolor_fontsize_XY.trim().split("|")[0]
    ) {
        element.style.setProperty('color', copycolor_fontsize_XY.trim().split("|")[0]);
    }

    if (copycolor_fontsize_XY && 
        copycolor_fontsize_XY.trim() &&
        copycolor_fontsize_XY.trim().split("|").length !== 0 &&
        copycolor_fontsize_XY.trim().split("|")[1]
    ) {
        element.style.setProperty('font-size',  copycolor_fontsize_XY.trim().split("|")[1]+ 'px');
    }
    if (copycolor_fontsize_XY && 
        copycolor_fontsize_XY.trim() &&
        copycolor_fontsize_XY.trim().split("|").length !== 0 &&
        copycolor_fontsize_XY.trim().split("|")[2] &&
        copycolor_fontsize_XY.trim().split("|")[2].split(",").length !== 0 &&
        copycolor_fontsize_XY.trim().split("|")[2].split(",")[0]
    ) {
        element.style.setProperty('left', copycolor_fontsize_XY.trim().split("|")[2].split(",")[0] + 'px');
    }
    if (copycolor_fontsize_XY && 
        copycolor_fontsize_XY.trim() &&
        copycolor_fontsize_XY.trim().split("|").length !== 0 &&
        copycolor_fontsize_XY.trim().split("|")[2] &&
        copycolor_fontsize_XY.trim().split("|")[2].split(",").length !== 0 &&
        copycolor_fontsize_XY.trim().split("|")[2].split(",")[1]
    ) {
        element.style.setProperty('top', copycolor_fontsize_XY.trim().split("|")[2].split(",")[1] + 'px');
    }

}

function setXY(element, xyPos){
	if (xyPos && 
		xyPos.trim() &&
		xyPos.split(",").length !== 0 &&
		xyPos.trim().split(",")[0]
	) {
		element.style.setProperty('left',  xyPos.trim().split(",")[0] + 'px');
	}
	if (xyPos && 
		xyPos.trim() &&
		xyPos.split(",").length !== 0 &&
		xyPos.trim().split(",")[1]
	) {
		element.style.setProperty('top',  xyPos.trim().split(",")[1] + 'px');
	}
}

function setBgColor(element, bgColor){
    if (bgColor && bgColor.trim()) {
        element.style.setProperty('background-color', bgColor);
    }
}


function setCta() {
    if (dynamicVars.CTA_text && dynamicVars.CTA_text.trim()) {
        ctaCopy.innerHTML = dynamicVars.CTA_text.trim();
    }
    if (dynamicVars.CTA_button_color && dynamicVars.CTA_button_color.trim() &&
        dynamicVars.CTA_button_color.trim() !== "white" &&
        dynamicVars.CTA_button_color.trim() !== "#fff" &&
        dynamicVars.CTA_button_color.trim() !== "#ffffff" &&
        dynamicVars.CTA_button_color.trim() !== "transperent"
    ) {
        cta.style.setProperty('background-color', dynamicVars.CTA_button_color.trim());
    }else{
        cta.style.setProperty('background-color', dynamicVars.CTA_button_color.trim());
        // cta.style.setProperty('border',"2px solid #000");
    }

    if (dynamicVars.CTA_fontsize_copycolor_XY && 
        dynamicVars.CTA_fontsize_copycolor_XY.trim() &&
        dynamicVars.CTA_fontsize_copycolor_XY.trim().split("|").length !== 0 &&
        dynamicVars.CTA_fontsize_copycolor_XY.trim().split("|")[0]
    ) {
        ctaCopy.style.setProperty('font-size', dynamicVars.CTA_fontsize_copycolor_XY.trim().split("|")[0] + 'px');
    }
    if (dynamicVars.CTA_fontsize_copycolor_XY && 
        dynamicVars.CTA_fontsize_copycolor_XY.trim() &&
        dynamicVars.CTA_fontsize_copycolor_XY.trim().split("|").length !== 0 &&
        dynamicVars.CTA_fontsize_copycolor_XY.trim().split("|")[1]
    ) {
        ctaCopy.style.setProperty('color', dynamicVars.CTA_fontsize_copycolor_XY.trim().split("|")[1]);
    }
    if (dynamicVars.CTA_fontsize_copycolor_XY && 
        dynamicVars.CTA_fontsize_copycolor_XY.trim() &&
        dynamicVars.CTA_fontsize_copycolor_XY.trim().split("|").length !== 0 &&
        dynamicVars.CTA_fontsize_copycolor_XY.trim().split("|")[2] &&
        dynamicVars.CTA_fontsize_copycolor_XY.trim().split("|")[2].split(",").length !== 0 &&
        dynamicVars.CTA_fontsize_copycolor_XY.trim().split("|")[2].split(",")[0]
    ) {
        cta.style.setProperty('left', dynamicVars.CTA_fontsize_copycolor_XY.trim().split("|")[2].split(",")[0] + 'px');
    }
    if (dynamicVars.CTA_fontsize_copycolor_XY && 
        dynamicVars.CTA_fontsize_copycolor_XY.trim() &&
        dynamicVars.CTA_fontsize_copycolor_XY.trim().split("|").length !== 0 &&
        dynamicVars.CTA_fontsize_copycolor_XY.trim().split("|")[2] &&
        dynamicVars.CTA_fontsize_copycolor_XY.trim().split("|")[2].split(",").length !== 0 &&
        dynamicVars.CTA_fontsize_copycolor_XY.trim().split("|")[2].split(",")[1]
    ) {
        cta.style.setProperty('top', dynamicVars.CTA_fontsize_copycolor_XY.trim().split("|")[2].split(",")[1] + 'px');
    }
}

function setClicktags() {
    myFT.applyClickTag(hotSpot, 1, myFT.instantAds.clicktag1_url);
    myFT.applyClickTag(cta, 2, myFT.instantAds.clicktag2_url);
}

function animateBanner() {

    var animate = gsap.timeline();

    animate.to('#f1Txt', 0.5, { autoAlpha: 1 }, "+=0.50"); 
    animate.to(['#f1Txt','#frame1'], 0.5, { autoAlpha: 0 }, "+=4");

    animate.to('#frame2', 0.5, { autoAlpha: 1 }, "-=0.25");
    
    if(isDifferent(dynamicVars.f1_disclaimer_txt, dynamicVars.f2_disclaimer_txt)){
        animate.to('#f1DiscTxt', 0.5, { autoAlpha: 0 }, "-=0.50");
        animate.to('#f2DiscTxt', 0.5, { autoAlpha: 1 }, "+=0");
    }
    if(isDifferent(dynamicVars.f1_disclaimer_bkgcolor, dynamicVars.f2_disclaimer_bkgcolor)){
        animate.to('#f1Disc', 0.5, { autoAlpha: 0 }, "+=0");
        animate.to('#f2Disc', 0.5, { autoAlpha: 1 }, "-=1.75");
    }

    animate.to('#f1BgImg', 0.1, { autoAlpha: 0 });

    animate.to(['#f2Txt','.second-headline-0'], 0.5, {y:0, autoAlpha: 1 }, "-=1");
    animate.to(['.second-headline-1','.second-headline-2'], 0.5, {y:0, autoAlpha: 1 }, "-=0.5");
    
    animate.to('#f2Txt', 1, {y:200, autoAlpha: 0 }, "+=3.25");


    if(isDifferent(dynamicVars.f2_background_color, dynamicVars.f3_background_color)){
        animate.to('#frame2', 0.5, { autoAlpha: 0 }, "-=1");
        animate.to('#frame3', 0.5, { autoAlpha: 1 }, "-=1");
    }


    if(isDifferent(dynamicVars.f2_disclaimer_txt, dynamicVars.f3_disclaimer_txt)){
        animate.to('#f2DiscTxt', 0.5, { autoAlpha: 0 }, "-=1");
        animate.to('#f3DiscTxt', 0.5, { autoAlpha: 1 }, "-=1");
    }
    if(isDifferent(dynamicVars.f2_disclaimer_bkgcolor, dynamicVars.f3_disclaimer_bkgcolor)){
        animate.to('#f2Disc', 0.5, { autoAlpha: 0 }, "-=1");
        animate.to('#f3Disc', 0.5, { autoAlpha: 1 }, "-=1");
    }

    animate.to('#f3Txt', 0.5, {y: 0, autoAlpha: 1 }, "+=0");
    
    animate.to(['#f3Txt','#f3IconImg'], 0.5, { y:200, autoAlpha: 0 }, "+=2.5");
    animate.to('#frame3', 0.5, { autoAlpha: 0 }, "-=0.5");
    
    animate.to('#frame4', 0.5, { autoAlpha: 1 }, "+=0");

    animate.to('#f4BgImg', 0.5, { autoAlpha: 1 }, "-=1");

    if(isEmpty(dynamicVars.f4_disclaimer_txt)){
        animate.to(['#f3Disc','#f3DiscTxt', '#f2Disc','#f2DiscTxt','#f1Disc','#f1DiscTxt'], 0.5, { y: 400, autoAlpha: 0 }, "-=1");
    } else{
        if(isDifferent(dynamicVars.f3_disclaimer_txt, dynamicVars.f4_disclaimer_txt)){
            animate.to(['#f3DiscTxt', '#f2DiscTxt', '#f1DiscTxt'], 0.5, { autoAlpha: 0 }, "-=1");
            animate.to('#f4DiscTxt', 0.5, { autoAlpha: 1 }, "-=1");
        }
        if(isDifferent(dynamicVars.f3_disclaimer_bkgcolor, dynamicVars.f4_disclaimer_bkgcolor)){
            animate.to(['#f3Disc', '#f2Disc', '#f1Disc'], 0.5, { autoAlpha: 0 }, "-=1");
            animate.to('#f4Disc', 0.5, { autoAlpha: 1 }, "-=1");
        }
    }

    animate.to('#f4Txt', 0.5, {y: 0, autoAlpha: 1 }, "+=0");

    animate.to('#cta', 0.75, { autoAlpha: 1,
        onComplete: function() {
            myFT.dispatch('start_isi_scrolling');
        }}, "+=0");


}

function isDifferent(val1, val2) {
    if (val1 && val1.trim() && val2 && val2.trim() && val1.trim() !== val2.trim()) {
        return true;
    }
    if (!val1 && !val1.trim() && val2 && val2.trim() && val1.trim() !== val2.trim()) {
        return true;
    }
    return false;
}

function isEmpty(val) {
    if (!val && !val.trim()) {
        return true;
    }
    return false;
}

function checkPlatform() {
    try {
        var a = new Array();
        if (navigator.platform.toLowerCase().indexOf("mac") > -1) {
            a[0] = "macOS";
        } else if (navigator.platform.toLowerCase().indexOf("win") > -1) {
            a[0] = "windows";
        } else {
            if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
                a[0] = "iOS";
            } else if (navigator.userAgent.match(/Opera Mini/i)) {
                a[0] = "opera";
            } else if (navigator.userAgent.match(/Android/i)) {
                a[0] = "android";
            } else if (navigator.userAgent.match(/BlackBerry/i)) {
                a[0] = "BlackBerry";
            } else if (navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i)) {
                a[0] = "WindowsPhone";
            }
        }
        var MSIE = window.navigator.userAgent.indexOf("MSIE ");

        var Edge = window.navigator.userAgent.indexOf("Edge/");

        var Trdt = window.navigator.userAgent.indexOf("Trident/");

        if (navigator.userAgent.toLowerCase().indexOf("chrome") > -1) {
            a[1] = "chrome";
        } else if (navigator.userAgent.toLowerCase().indexOf("firefox") > -1) {
            a[1] = "firefox";
        } else if (navigator.vendor && navigator.vendor.toLowerCase().indexOf("apple") > -1) {
            a[1] = "safari";
        } else if (MSIE > 0 || Edge > 0 || Trdt > 0) {

            a[1] = "IE";
        }
        return a;
    } catch (error) {
        console.error("Error on checkPlatform(): " + error.message);
    }
}
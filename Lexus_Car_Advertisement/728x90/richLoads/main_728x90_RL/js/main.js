var adWidth = myFT.manifestProperties.width,
    adHeight = myFT.manifestProperties.height;

window.onload = function() {
    myFT.on("DOMLoaded", function() {
        myFT.on("instantads", function(event) {
            var variables = myFT.instantAds;
            preloadImages(variables);
            setUpDynamicVar(variables);
           
            viewport.style.setProperty('background-color', variables.background_color);
            
            setCta(variables);
            setClickTag(variables);
            viewport.classList.add(checkPlatform()[0] + "-" + checkPlatform()[1]); // Adding browserstack class
        });
    });
};

function preloadImages(variables) {
    var imageCount = 4,
        imageLoaded = 0;

    F1_bg.src = variables.f1_hero_img;
    F1_bg.addEventListener("load", iLoad, false);

    F1_logo.src = variables.logo_img;
    F1_logo.addEventListener("load", iLoad, false);

    F2_bg.src = variables.f2_hero_img;
    F2_bg.addEventListener("load", iLoad, false);

    EF_bg.src = variables.f3_hero_img;
    EF_bg.addEventListener("load", iLoad, false);

    function iLoad() {
        imageLoaded++;
        if (imageLoaded == imageCount) {
            init();
        }
    }
}

function setUpDynamicVar(variables) {
    setDynamicData(
        F1_title,
        variables.f1_header_txt,
        variables.f1_header_txt_copycolor_fontsize_XY
    );

    setDynamicData(
        F1_copy,
        variables.f1_headline_txt,
        variables.f1_headline_txt_copycolor_fontsize_XY
    );

    setDynamicData(
        F2_copy,
        variables.f2_headline_txt,
        variables.f2_headline_txt_copycolor_fontsize_XY
    );
    setDynamicData(
        EF_copy1,
        variables.f3_headline_txt,
        variables.f3_headline_txt_copycolor_fontsize_XY
    );
    setDynamicData(
        EF_copy2,
        variables.f3_subheadline_txt,
        variables.f3_subheadline_txt_copycolor_fontsize_XY
    );
}

function setCta(variables) {
    EF_cta.innerHTML = variables.CTA_text;

    if (variables.CTA_txt_fontsize_copycolor_hovercolor_XY) {
        var ctaStyle = getConfig(
            variables.CTA_txt_fontsize_copycolor_hovercolor_XY
        );

        if (ctaStyle[0]) EF_cta.style.fontSize = ctaStyle[0] + "px";
        if (ctaStyle[1]) EF_cta.style.color = ctaStyle[1];
        if (ctaStyle[2]) {
            EF_cta.addEventListener("mouseover", function() {
                EF_cta.style.color = ctaStyle[2];
            });
            EF_cta.addEventListener("mouseleave", function() {
                EF_cta.style.color = ctaStyle[1];
            });
        }
        if (ctaStyle[3]) EF_cta.style.left = ctaStyle[3] + "px";
        if (ctaStyle[4]) EF_cta.style.top = ctaStyle[4] + "px";
    }
    if (variables.CTA_button_color_outlinecolor_hovercolor_hoveroutlinecolor) {
        var ctaButtonStyle =
            variables.CTA_button_color_outlinecolor_hovercolor_hoveroutlinecolor.split("|");

        if (ctaButtonStyle[0]) EF_cta.style.backgroundColor = ctaButtonStyle[0];
        if (ctaButtonStyle[1]) EF_cta.style.borderColor = ctaButtonStyle[1];
        if (ctaButtonStyle[2]) {
            EF_cta.addEventListener("mouseover", function() {
                EF_cta.style.backgroundColor = ctaButtonStyle[2];
                EF_cta.style.borderColor = ctaButtonStyle[3];
            });
            EF_cta.addEventListener("mouseleave", function() {
                EF_cta.style.backgroundColor = ctaButtonStyle[0];
                EF_cta.style.borderColor = ctaButtonStyle[1];
            });
        }
    }
}


function setClickTag(variables) {
    myFT.applyClickTag(viewport, 1, variables.clicktag1_url);
}

function setDynamicData(element, copy, dynamicStyle) {
    var styling = getConfig(dynamicStyle);

    if (copy && copy.trim()) {
        element.innerHTML = copy.trim();
    }
    if (styling[1] && styling[1].trim()) {
        element.style.setProperty("font-size", styling[1].trim() + "px");
    }
    if (styling[0] && styling[0].trim()) {
        element.style.setProperty("color", styling[0].trim());
    }
    if (styling[2] && styling[2].trim()) {
        element.style.setProperty("left", styling[2].trim() + "px");
    }
    if (styling[3] && styling[3].trim()) {
        element.style.setProperty("top", styling[3].trim() + "px");
    }
}

// Styling String spliter
function getConfig(str) {
    return str.split("|").reduce(function(acc, curr, index, arr) {
        return acc.concat(curr.split(","));
    }, []);
}



//Animation 
var creative = {};

function init() {
    creative.viewport = document.getElementById('viewport');
    gsap.set(['#viewport'], { autoAlpha: 1 });
    frameOne();

}

function frameOne() {
    gsap.set(['.GL', '.F1'], { opacity: 1 });
    gsap.set(['#F1_bg'], { scale: 1.03, x: 0, z: 0.1, rotationZ: 0.01, force3D: true });
    gsap.set(['#F1_title'], { opacity: 1 });

    gsap.set(['#GL_line'], { autoAlpha: 1, clip: "rect(0px 728px 0px 0px)" });

    gsap.to(['#F1_bg'], { duration: 4, scale: 1.2, transformOrigin: "168px 45px", z: 0.1, rotationZ: 0.01, force3D: true });

    gsap.to('#GL_line', { delay: .2, duration: .4, clip: "rect(0px 728px 90px 0px)" })

    gsap.from(['#F1_copy'], { delay: 0.3, duration: 0.85, x: -200, opacity: 0, ease: "power2.inOut" })

    var frameDelay = 3.5;
    gsap.to(['#F1_bg'], { opacity: 0, delay: frameDelay });
    gsap.delayedCall(frameDelay, frameTwo);
}

function frameTwo() {
    gsap.set(['.F2'], { opacity: 1 });
    gsap.set(['#F2_bg'], { scale: 1.03, x: 0, z: 0.1, rotationZ: 0.01, force3D: true });

    gsap.to(['#F2_bg'], { duration: 4, scale: 1.2, transformOrigin: "168px 45px", z: 0.1, rotationZ: 0.01, force3D: true });

    gsap.from(['#F2_copy'], { delay: 0.3, duration: 0.85, x: -200, opacity: 0, ease: "power2.inOut" })
        // gsap.to(['#GL_gradient'], {duration:1.5, opacity:0.5});
    var frameDelay = 3.5;
    gsap.to(['#F1_copy', '.F2'], { opacity: 0, delay: frameDelay });
    gsap.delayedCall(frameDelay, endFrame);
}

function endFrame() {
    gsap.set(['.EF'], { opacity: 1 });
    gsap.set(['#EF_bg', '#EF_copy1', '#EF_copy2'], { scale: 1, x: 0, z: 0.1, rotationZ: 0.01, force3D: true });

    gsap.from(['#EF_bg'], { duration: 3, transformOrigin: "168px 45px", scale: 1.2, x: 0, y: 0, z: 0.1, rotationZ: 0.01, force3D: true });

    gsap.to(['#F1_title'], { duration: 0.4, opacity: 0 });

    gsap.from(['#EF_copy1'], { duration: 0.85, x: -200, opacity: 0, ease: "power2.inOut" })
    gsap.from(['#EF_copy2'], { duration: 0.85, delay: 1, opacity: 0, ease: "power2.inOut" })

    gsap.set(['#F1_logo'], { opacity: 1 });
    gsap.from(['#F1_logo'], { duration: 0.85, delay: 1, opacity: 0, ease: "power2.inOut" })

    var frameDelay = 1.5;
    gsap.delayedCall(frameDelay, ctaAnim);
}

function ctaAnim() {
    gsap.set(['.CTA'], { opacity: 1 });

    var tl = gsap.timeline({ onComplete: addEventListeners });
    tl
        .from(['#EF_cta'], { duration: 0.5, opacity: 0, ease: 'power2.inOut' }, 'cta')
}

// Browser Checking

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
            } else if (
                navigator.userAgent.match(/IEMobile/i) ||
                navigator.userAgent.match(/WPDesktop/i)
            ) {
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
        } else if (
            navigator.vendor &&
            navigator.vendor.toLowerCase().indexOf("apple") > -1
        ) {
            a[1] = "safari";
        } else if (MSIE > 0 || Edge > 0 || Trdt > 0) {
            a[1] = "IE";
        }

        return a;
    } catch (error) {
        console.error("Error on checkPlatform(): " + error.message);
    }
}

//Cross browser code ends...
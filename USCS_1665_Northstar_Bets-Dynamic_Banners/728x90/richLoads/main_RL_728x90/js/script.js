var iaObject = {},
    dom = {},
    main, feedItems, adWidth, adHeight;
var imagesRequested = 0,
    imagesLoaded = 0,
    timeoutcalled = false,
    displayAdCalled = false;
window.onload = function() { //MANDATORY_Basic Initialize
    main = document.getElementById("main");
    main.classList.add(checkPlatform()[0] + "-" + checkPlatform()[1]);
    myFT.on("richload", function() {
        myFT.on("instantads", function() {
            document.body.style.opacity = 1;
            adWidth = myFT.manifestProperties.width;
            adHeight = myFT.manifestProperties.height;
            processIAObject();
        })
    })
}

function checkPlatform() { //MANDATORY_Check browser/user agent and return.
    try {

        var a = new Array(),
            w = window,
            n = w.navigator,
            ua = n.userAgent
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
        var MSIE = ua.indexOf("MSIE "),
            Edge = ua.indexOf("Edge/"),
            Trdt = ua.indexOf("Trident/");
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
        //console.error("Error on checkPlatform(): " + error.message);
    }
}

function getElements() { //SUPPORTING_Grabs all elements in dom and returns an object
    var e = {},
        de = document.querySelectorAll("*[id]"),
        ec = document.querySelectorAll("*[class]");
    for (var i = 0; i < ec.length; i++) {
        var ci = ec[i].classList;
        for (var c = 0; c < ci.length; c++) e[ci[c]] = e[ci[c]] || document.getElementsByClassName(ci[c])
    }
    for (var i = 0; i < de.length; i++) e[de[i].id] = de[i];
    return e
}

function callImg(e) { //IMAGE_LOAD_LISTENER
    if (!timeoutcalled) timeoutcalled = true, setTimeout(function() { displayAd() }, 1000);
    imagesLoaded++
    if (imagesRequested == imagesLoaded) displayAd();
}

function displayAd() { //ALL_IMAGES_LOADED_DISPLAY_AD
    if (!displayAdCalled) {
        displayAdCalled = true;
        main.style.position = "absolute";
        main.style.top = "0px", main.style.left = "0px";
        main.style.width = adWidth + "px", main.style.height = adHeight + "px";
        main.style.overflow = "hidden";
        main.style.boxSizing = "border-box";
        main.style.transitionDuration = ".5s";
        setPreAnimateStyles();
        setTimeout(function() { animateAd(); }, 1000)
    }
}

function processIAObject() { //MANDATORY_iaObject builder + macro processing.
    iaObject = JSON.parse(JSON.stringify(myFT.instantAds));
    var macroHit = true;
    while (macroHit) {
        macroHit = false;
        for (var n in iaObject) {
            for (var s in iaObject) {
                if (s != n) {
                    if (iaObject[n].indexOf("[#" + s + "#]") > -1) {
                        macroHit = true;
                        iaObject[n] = iaObject[n].split("[#" + s + "#]").join(iaObject[s]);
                    }
                    if (iaObject[n].indexOf("[U#" + s + "#]") > -1) {
                        macroHit = true;
                        iaObject[n] = iaObject[n].split("[U#" + s + "#]").join(iaObject[s].toUpperCase());
                    }
                    if (iaObject[n].indexOf("[L#" + s + "#]") > -1) {
                        macroHit = true;
                        iaObject[n] = iaObject[n].split("[L#" + s + "#]").join(iaObject[s].toLowerCase());
                    }
                    if (iaObject[n].indexOf("[C#" + s + "#]") > -1) {
                        macroHit = true;
                        iaObject[n] = iaObject[n].split("[C#" + s + "#]").join(capitalize(iaObject[s]));
                    }
                    if (iaObject[n].indexOf("[N#" + s + "#]") > -1) {
                        macroHit = true;
                        iaObject[n] = iaObject[n].split("[N#" + s + "#]").join(iaObject[s].split(" ").join("&nbsp;"));
                    }
                }
            }
        }
    }

    buildHTML();
}

function capitalize(s) { //MANDATORY_Helps with the captilization part of the macro.
    var sa = s.split(" ");
    for (var i = 0; i < sa.length; i++) { sa[i] = sa[i].substr(0, 1).toUpperCase() + sa[i].substr(1, sa[i].length) }
    return sa.join(" ");
}

function buildHTML() { //MANDATORY - populate all elements in dom - update as needed.
    //Setting the main wrapper style.
    document.head.appendChild(document.createElement("style")).innerHTML = iaObject.Insert_CSS;
    dom = getElements();
    iaObject.cta_holder_color_size_xy = iaObject.CTA_text_color_size_xy + "";
    delete iaObject.CTA_text_size_color_xy;
    var main = dom.main;
    main.style.border = "1px solid #cbcbcb", main.style.boxSizing = "border-box";
    main.style.width = (adWidth) + "px", main.style.height = (adHeight) + "px";
    main.style.boxSizing = "border-box";
    for (var n in dom) {
        if (dom[n].length) {
            for (var i = 0; i < dom[n].length; i++) {
                if (iaObject[n] && (n.toLowerCase.indexOf("image") > -1 || n.toLowerCase.indexOf("img") > -1)) {
                    imagesRequested++
                    dom[n][i].style.position = "absolute";
                    dom[n][i].addEventListener("load", callImg);
                    dom[n][i].src = iaObject[n];
                } else if (iaObject[n] && n.indexOf("color") > -1) {
                    dom[n].style.position = "absolute";
                    dom[n][i].style.backgroundColor = iaObject[n];
                    dom[n][i].style.width = adWidth + "px", dom[n][i].style.height = adHeight + "px";

                } else if (iaObject[n]) {
                    dom[n][i].innerHTML = iaObject[n];
                    dom[n][i].style.lineHeight = "1.1em";
                }
            }
        } else {
            if (iaObject[n] && (n.toLowerCase().indexOf("image") > -1 || n.toLowerCase().indexOf("img") > -1)) {
                imagesRequested++
                dom[n].style.position = "absolute";
                dom[n].addEventListener("load", callImg);
                dom[n].src = iaObject[n];
            } else if (iaObject[n] && n.indexOf("color") > -1) {
                dom[n].style.position = "absolute";
                dom[n].style.backgroundColor = iaObject[n];
                dom[n].style.width = adWidth + "px", dom[n].style.height = adHeight + "px";
            } else if (iaObject[n]) {
                dom[n].innerHTML = iaObject[n];
                dom[n].style.lineHeight = "1em"
            }
        }
    }
    dom = getElements();
    setElementAttributes();
    addClicks();
}

function setElementAttributes() { //MANDATORY - stylize elements per veraible definitions - update as needed.
    var e = [dom.f1_headline_txt, dom.f1_subheadline_txt,
            dom.f2_headline_txt, dom.f2_subheadline_txt,
            dom.f3_headline_txt, dom.f3_subheadline_txt,
            dom.f4_headline_txt, dom.f4_subheadline_txt,
            dom.f4_disclaimer_txt, dom.footnote_txt, dom.cta_holder
        ],
        styleMap = {
            "size": "fontSize",
            "color": "color",
            "fgColor": "color",
            "hex": "color",
            "bgHex": "backgroundColor",
            "fgHex": "color",
            "bgColor": "backgroundColor",
            "align": "textAlign",
            "xy": "left,top",
            "lb": "left,bottom",
            "xyw": "left,top,width",
            "lbw": "left,bottom,width",
            "lt": "left,top",
            "ltw": "left,top,width",
            "ltwh": "left,top,width,height",
            "lbwh": "left,bottom,width,height",
            "xywh": "left,top,width,height",
            "hColor": "H:color",
            "hBgColor": "H:background-color",
            "lines": "numLines",
            "font": "fontFamily",
            "weight": "fontWeight",
            "topGap": "marginTop",
            "bottomGap": "marginBottom",
            "leftGap": "marginLeft",
            "rightGap": "marginRight"
        },

        appends = {
            "size": "px",
            "color": "",
            "fgColor": "",
            "bgColor": "",
            "align": "",
            "xy": "px",
            "lb": "px",
            "xyw": "px",
            "lbw": "px",
            "lt": "px",
            "ltw": "px",
            "ltwh": "px",
            "lbwh": "px",
            "xywh": "px",
            "hColor": "",
            "hBgColor": "",
            "lines": "",
            "font": "",
            "weight": "",
            "topGap": "px",
            "bottomGap": "px",
            "leftGap": "px",
            "rightGap": "px"
        },
        defaults = {}

    //3 Things to update:  1:  position:absolute anything with xy, update positioning to reference default position with offset when using +/-,  3:  any extra pipe delimeters will be interpreted as inline style pairs to be applied to the element in question.

    for (var i = 0; i < e.length; i++) {
        var ens = [],
            ecs = [];
        if (e[i].id) ens.push(e[i].id)
        if (e[i].getAttribute.class) ecs = e[i].getAttribute("class").split(" ");
        for (var c = 0; c < ecs.length; c++) ens.push(ecs[c]);
        for (var n = 0; n < ens.length; n++) {
            var ensval = ens[n];
            for (var v in iaObject) {
                dom.frame1.style.top = dom.frame2.style.top = dom.frame3.style.top = dom.frame4.style.top = "0px";
                if (v.indexOf(ensval + "_") > -1) {
                    var vals = iaObject[v].split("|");
                    var vars = v.split(ensval + "_")[1].split("_");
                    for (var vp = 0; vp < vals.length; vp++) {
                        if (vals[vp].length > 0) { //Actual Value Present
                            if (vars[vp] && vars[vp].length > 0) { //Actual Var Present
                                if (styleMap[vars[vp]]) {
                                    if ("xy,xywh,xyw,lb,lt,lbw,ltw,ltwh,lbwh".indexOf(vars[vp]) > -1) e[i].style.position = "absolute"; //Var matches style map
                                    if (styleMap[vars[vp]].indexOf("M:") == -1 && styleMap[vars[vp]].indexOf("H:") == -1) { //STANDARD
                                        console.log(e[i]);
                                        var fs = styleMap[vars[vp]].split(","); //split the map by commas
                                        var fvs = vals[vp].split(","); //Match/split the values by commas
                                        for (var sn = 0; sn < fs.length; sn++) e[i].style[fs[sn]] = fvs[sn] + (appends[vars[vp]]); ////loop and set values based on appends
                                    } else if (styleMap[vars[vp]].indexOf("H:") > -1) { //HOVER
                                        document.head.appendChild(document.createElement("head")).innerHTML = ens[n] + ":hover{" + styleMap[vars[vp]].split("H:")[1] + ":" + vals[vp] + appends[vars[vp]] + "}" //SET HOVER STYLE
                                    } else if (styleMap[vars[vp]].indexOf("M:") > -1) { //FIRE MACRO FUNCTION AGAINST THE ELEMNT, with the prescribed value
                                        window[styleMap[vars[vp]].split("M:")[1]](e[i], vals[vp]);
                                    }
                                }
                            } else {
                                e[i].style[vals[vp].split(":")[0]] = vals[vp].split(":")[1];
                            }
                        }
                    }
                }
            }
        }
    }
    dom.cta_holder.style.backgroundColor = iaObject.CTA_text_bgColor
    dom.click_hotspot.style.position = "absolute";
    dom.click_hotspot.style.width = adWidth + "px", dom.click_hotspot.style.height = adHeight + "px", dom.click_hotspot.style.top = dom.click_hotspot.style.left = "0px";
    dom.frame1.style.position = dom.frame2.style.position = dom.frame3.style.position = dom.frame4.style.position = "absolute";
}

function setPreAnimateStyles() {
    dom.frame1.style.opacity = dom.frame2.style.opacity = dom.frame3.style.opacity = 0;
    dom.f1_headline_txt.style.opacity = dom.f1_subheadline_txt.style.opacity = 0;
    dom.f2_headline_txt.style.opacity = dom.f2_subheadline_txt.style.opacity = 0;
    dom.f3_headline_txt.style.opacity = dom.f3_subheadline_txt.style.opacity = 0;
    dom.f4_headline_txt.style.opacity = dom.f4_subheadline_txt.style.opacity = 0;
    dom.f4_hero_img.style.opacity = dom.cta_holder.style.opacity = dom.f4_disclaimer_txt.style.opacity = 0;
    dom.footnote_txt.style.opacity = 0;
    dom.frame1.style.position = dom.frame2.style.position = dom.frame3.style.position = dom.frame4.style.position = dom.logo_img.style.position = "absolute";
    dom.frame1.style.top = dom.frame2.style.top = dom.frame3.style.top = dom.frame4.style.top = dom.logo_img.style.top = "0px";
    dom.frame1.style.left = dom.frame2.style.left = dom.frame3.style.left = dom.frame4.style.left = dom.logo_img.style.left = "0px";
    dom.f1_hero_img.style.top = dom.f2_hero_img.style.top = dom.f3_hero_img.style.top = dom.f4_hero_img.style.top = "0px";
    dom.f1_hero_img.style.left = dom.f2_hero_img.style.left = dom.f3_hero_img.style.left = dom.f4_hero_img.style.left = "0px";
    /*MANDATORY - prep elements to pre animation styles - update as needed.*/
}

function animateAd() {
    main.style.transitionDuration = ".5s", dom.frame1.style.opacity = main.style.opacity = 1; //Reveal F1 with .5s fade.
    setTimeout(function() { fadeIn([dom.f1_headline_txt, dom.f1_subheadline_txt]) }, 500); //.5s - reveal f1 hl/sh with .5s fade
    setTimeout(function() { fadeIn([dom.frame2]) }, 3500); //After 3s - reveal f2 with .5s fade
    setTimeout(function() { fadeIn([dom.f2_headline_txt, dom.f2_subheadline_txt]) }, 4000); //.5s - reveal f2 hl/sh with .5s fade
    setTimeout(function() { fadeIn([dom.frame3]) }, 7000); //After 3s - reveal f3 with .5s fade
    setTimeout(function() { fadeIn([dom.f3_headline_txt, dom.f3_subheadline_txt]) }, 7500); //.5s - reveal f3 hl/sh with .5s fade
    setTimeout(function() {
        if (dom.f4_headline_txt.textContent == "") {
            fadeIn([dom.cta_holder,legal_copy])
        } else {
            fadeIn([dom.f4_hero_img])
        }
    }, 10500); //After 3s - reveal f4 with .5s fade (*)
    setTimeout(function() {
        if (dom.f4_headline_txt.textContent != "") {
            fadeIn([dom.f4_hero_img, dom.f4_headline_txt, dom.f4_subheadline_txt, dom.f4_disclaimer_txt, dom.footnote_txt, dom.cta_holder,legal_copy])
        }
    }, 11000); //.5s - reveal f4 hl/sh with .5s fade (*)
    //(*)  If f4HL is not present - do not reveal anything from F4 except CTA which will reveal in first step not 2nd.
}

function fadeIn(a) {
    console.log("FADE IN");
    console.log(a);
    for (var i = 0; i < a.length; i++) {
        console.log(a[i])
        a[i].style.transitionDuration = ".5s";
        a[i].style.transitionDelay = i * .1 + "s";
        a[i].style.opacity = 1;
    }
}

function addClicks() { //MANDATORY - define all interactions.
    dom.cta_holder.addEventListener("click", function() { myFT.clickTag("2", iaObject.clicktag2_url) });
    dom.click_hotspot.addEventListener("click", function() { myFT.clickTag("1", iaObject.clicktag1_url) });
}
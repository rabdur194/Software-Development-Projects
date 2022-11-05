var RL_main = myFT.$("#RL_main"),
    frame1 = myFT.$("#frame1"),

    logo_img = myFT.$("logo_img"),
    textLayer = myFT.$("#textLayer"),

    ctaCont = document.getElementById("ctaCont"),
    ctaBackground = document.getElementById("ctaBackground"),
    cta_text = document.getElementById("cta_text"),
    product_category_txt,
    clickTag,
    //product_img = document.getElementById("product_img"),
    // Toggle to test version specific default
    adError = false,
    globalData,
    myTimerVar1,
    Ad =

    {
        WIDTH: 300,
        HEIGHT: 600,
        gridData: [],
        trackingStr: "",
        feedObj: [],
        feedSuccess: false,
        curSlide: 0,
        maxCount: 0,
        carouselSpeed: 2000,

        initialize: function() {
            trace("Ad Starting");
            var feedParams = new FTFeedParams();
            feedParams.segmentId = "";
            feedParams.feedEndpoint = myFT.instantAds.feedEndpoint;
            feedParams.defaultFeedEndpoint = myFT.instantAds.defaultFeedEndpoint;
            var ftFeed = new FTFeed(myFT, feedParams);
            if (myFT.instantAds.feedEndpoint.indexOf("{") > -1) { Ad.FEED.feedLoaded(JSON.parse(myFT.instantAds.feedEndpoint)); } else
            if (myFT.instantAds.feedEndpoint.indexOf("https://") != 0) { console.log("THIS"), Ad.FEED.feedLoadError() } else { ftFeed.getFeed(Ad.FEED.feedLoaded, Ad.FEED.feedLoadError); }

        },

        DATA: {
            productNameProp: myFT.instantAds.productNameTxt_size_hex_xy.split("|"),
            productPriceProp: myFT.instantAds.productPriceTxt_size_hex_xy.split("|"),
            ctaProp: myFT.instantAds.ctaTxt_size_hex_xy_btnColor.split("|")

        },

        FEED: {
            feedLoaded: function(feedArray, feed_url) {
                trace("Feed Success!");
                Ad.feedObj = feedArray;
                Ad.feedSuccess = true;
                Ad.maxCount = feedArray.length;
                Ad.DRAW.createAd(Ad.feedObj);
            },

            feedLoadError: function(errorMsg) {
                console.log(errorMsg);
                Ad.feedSuccess = false;
                Ad.DRAW.createFail();
            }
        },


        DRAW: {
            preloadImage: function(f) {
                var preloadArray = [];
                var preloadCount = 0;
                var preloadedCount = 0;

                function preloadCheck() {
                    trace("preloaded: " + preloadedCount + "/" + preloadCount);
                    if (preloadedCount >= preloadCount) Ad.DRAW.createAd();
                }
                for (let i in myFT.instantAds) {
                    if (i.indexOf("_img") > -1) {
                        preloadArray.push(i);
                        preloadCount++;
                    }
                }
                for (var j = 0; j < preloadCount; j++) {
                    var o = new Image();
                    o.src = myFT.instantAds[preloadArray[j]]
                    o.addEventListener("load", function() {
                        preloadedCount++;
                        preloadCheck();
                    });
                };
            },

            createAd: function(obj) {

                console.log(obj);

                clickTag = myFT.instantAds.click_url;

                document.head.appendChild(document.createElement("style")).innerHTML = myFT.instantAds.insertCSS;

                var sample_img_contents = document.createElement('img');
                // sample_img_contents.src = obj[0]['city_image'];
                sample_img_contents.src = "./images/wurth_sample_product.png";
                //Product image, name, price. 
                sample_img_contents.style.width = '117px';
                sample_img_contents.style.height = '154px';
                //product_img.appendChild(sample_img_contents);
                //Ad.DRAW.drawText("product_name","PRODUCT NAME<br>PRODUCT NAME", Ad.DATA.productNameProp,textLayer);

                console.log(myFT.instantAds.language);

                //Ad.DRAW.drawText("product_price","<span><sup>$</sup></span>" + "<span>000.00</span>", Ad.DATA.productPriceProp,textLayer);



                cta_text.innerHTML = myFT.instantAds.ctaTxt;
                cta_text.style.fontSize = Ad.DATA.ctaProp[0] + "px";
                cta_text.style.color = Ad.UTILITY.checkHex(Ad.DATA.ctaProp[1]);
                ctaCont.style.top = Number(Ad.DATA.ctaProp[2].split(",")[1]) + 0 + "px";
                ctaCont.style.left = Number(Ad.DATA.ctaProp[2].split(",")[0]) + 0 + "px";
                //ctaBackground.style.borderRadius = '3px';
                ctaBackground.style.backgroundColor = Ad.UTILITY.checkHex(Ad.DATA.ctaProp[3]);
                ctaBackground.borderColor = Ad.UTILITY.checkHex(Ad.DATA.ctaProp[3]);


                myFT.applyButton(hitall, Ad.NAV.cta2click);
                myFT.applyButton(document.getElementById("carouselCont"), Ad.NAV.cta1click);
                myFT.applyButton(ctaCont, Ad.NAV.cta1click);

                // hitall.onmouseover = Ad.NAV.hitOver;
                // hitall.onmouseout = Ad.NAV.hitOut;


                //Building Carousel
                function createSlide(count) {
                    var itemContainer = document.createElement("li")
                    itemText = document.createElement("div"),
                        itemTextPrice = document.createElement("div"),
                        // new div add start
                        contentParent = document.createElement("div"),
                        imgParent = document.createElement("div"),
                        // new div add end
                        itemImg = document.createElement("img"),
                        itemContainer.setAttribute("id", 'slate' + i);
                    itemContainer.setAttribute("class", "js_slide");
                    // new class add start
                    contentParent.setAttribute("class", "content");
                    imgParent.setAttribute("class", "img-container");
                    // new class add end
                    itemText.setAttribute("class", "itemText");
                    itemTextPrice.setAttribute("class", "itemPrice");
                    itemImg.setAttribute("class", "itemImg");
                    itemText.innerHTML = Ad.feedObj[count][(myFT.instantAds.language.toLowerCase() == "fr" ? "item_title_fr" : "powerfeeds_name")];
                    itemTextPrice.innerHTML = "$" + Ad.feedObj[count].powerfeeds_price;
                    itemImg.src = Ad.feedObj[count].powerfeeds_image.replace("w=500&h=500", "w=180&h=180");
                    // new appendChild add start
                    itemContainer.appendChild(contentParent);
                    itemContainer.appendChild(imgParent);
                    contentParent.appendChild(itemText);
                    contentParent.appendChild(itemTextPrice);
                    imgParent.appendChild(itemImg);
                    output.appendChild(itemContainer);
                    // Ad.resizeArray.push(myFT.$(itemText));
                }

                var output = document.getElementById('carouselHolder');
                if (Ad.maxCount > 0) {
                    var i = 0;
                    while (Ad.maxCount > i) {
                        createSlide(i);
                        var ender = (i < (Ad.maxCount - 1)) ? "," : "";
                        Ad.trackingStr += Ad.feedObj[i].powerfeeds_id + ender;
                        i++;
                    };
                    if (Ad.maxCount > 1) {
                        myFT.applyButton(left_arrow, Ad.NAV.navclick_prev);
                        myFT.applyButton(right_arrow, Ad.NAV.navclick_next);
                    } else {
                        carousel_nav.css("display", "none");
                    }
                    //Delayed resize code due not resizing before rendering
                    setTimeout(function() {
                        for (var k = 0; k < Ad.maxCount; k++) {
                            //trace(Ad.resizeArray[k].css("font-size"))
                            //   Ad.DRAW.resizeTextBlock(Ad.resizeArray[k],140,40,true);
                        }
                    }, 200);
                }

                //Fire State Tracking:
                trace("Tracking String: " + Ad.trackingStr)
                Tracker.impressionTrackEvent(Ad.trackingStr);

                //Seting clickTags
                //myFT.applyButton(hitall, Ad.NAV.cta1click);
                // myFT.applyButton(footer, Ad.NAV.cta1click);

                //Begin view
                RL_main.css("display", "block");
                setTimeout(function() {
                    if (Ad.maxCount > 1) {
                        var simple = document.querySelector('.js_slider');
                        lorySlider = lory(simple, {
                            infinite: 1,
                            slidesToScroll: 1,
                            slideSpeed: 600
                        });
                        simple.addEventListener('after.lory.slide', Ad.TIME.handleEvent);
                        simple.addEventListener('on.lory.touchend', Ad.TIME.clearTimers);
                    }
                    Ad.TIME.animateStart();
                }, 400);



                /*
                             
                            setTimeout(function() {
                                RL_main.css("display", "block");
                                setTimeout(function() {
                                    Ad.TIME.animateStart();
                                }, 50);
                            }, 50); 
                            */
                if (Ad.feedObj.length < 2) document.getElementById("left_arrow").style.display = document.getElementById("right_arrow").style.display = "none";
                if (myFT.instantAds.headlineTxt.length > 0 || myFT.instantAds.promoTxt.length > 0) {
                    console.log("Appending to Head");
                    if (myFT.instantAds.headlineTxt.length > 0) {
                        document.head.appendChild(document.createElement("style")).innerHTML = `.itemText,.itemPrice{opacity:0;}`;
                        // document.head.appendChild(document.createElement("style")).innerHTML = `.itemText,.itemPrice{opacity:0;}.itemImg{left:150px;}`;
                        var cc = document.getElementById("carouselCont");
                        // cc.style.marginLeft = (-myFT.manifestProperties.width / 2) + "px";
                        var mh = document.getElementById("maskHolder");
                        // mh.style.marginLeft = myFT.manifestProperties.width / 2 + "px";
                        mh.style.overflow = "hidden";
                        mh.style.width = myFT.manifestProperties.width + "px";
                        // mh.style.width = myFT.manifestProperties.width / 2 + "px";
                        mh.style.height = myFT.manifestProperties.height + "px";
                    }
                    var hl = document.getElementById("headlineTxt"),
                        pt = document.getElementById("promoTxt");
                    hl.innerHTML = myFT.instantAds.headlineTxt, pt.innerHTML = myFT.instantAds.promoTxt;
                    hl.style.fontFamily = pt.style.fontFamily = "wuerthextraboldcond"
                    var hls = myFT.instantAds.headlineTxt_size_hex_xy.split("|"),
                        pts = myFT.instantAds.promoTxt_size_hex_xy.split("|");
                    hl.style.fontSize = (hls[0] || 24) + "px", pt.style.fontSize = (pts[0] || 14) + "px";
                    hl.style.color = (hls[1] || "black"), pt.style.color = (pts[1] || "black");
                    hl.style.position = pt.style.position = "absolute";
                    hl.style.top = (hls[2] || "0,0").split(",")[1] + "px", hl.style.left = (hls[2] || "0,0").split(",")[0] + "px";
                    pt.style.top = (pts[2] || "0,0").split(",")[1] + "px", pt.style.left = (pts[2] || "0,0").split(",")[0] + "px";
                    pt.style.zIndex = 101;
                    hl.style.zIndex = 102;
                    myFT.applyButton(hl, Ad.NAV.cta1click);
                    myFT.applyButton(pt, Ad.NAV.cta1click);



                }
            },

            drawText: function(name, str, prop, target) {
                if (prop != "") {

                    var xyProp = prop[2];
                    var newDiv = document.createElement("div");
                    newDiv.setAttribute("id", name);
                    // newDiv.setAttribute("class", "fivesec");

                    newDiv.style.position = "absolute";

                    //newDiv.style.opacity = 0;


                    newDiv.innerHTML = str;

                    newDiv.style.color = Ad.UTILITY.checkHex(prop[1]);
                    newDiv.style.left = xyProp.split(",")[0] + "px";
                    newDiv.style.top = xyProp.split(",")[1] + "px";
                    newDiv.style.fontWeight = 700;

                    newDiv.style.fontSize = prop[0] + "px";
                    newDiv.style.fontStyle = 'normal';

                    if (name === 'product_price') {
                        newDiv.style.fontFamily = 'wuerthextraboldcond';
                    } else {
                        newDiv.style.fontFamily = 'wuerthbold';
                    }

                    target[0].appendChild(newDiv);
                }
            },
            createFail() {
                console.log("FIRING FAIL");
                var ha = document.getElementById("hitall"),
                    fi = ha.parentElement.insertBefore(document.createElement("img"), ha),
                    hides = ["left_arrow", "right_arrow", "frame1", "hitall", "textLayer"];
                fi.src = myFT.instantAds.feedfail_img, fi.style.cursor = "pointer", fi.style.position = "absolute";
                fi.style.top = fi.style.left = "0px", fi.style.width = myFT.manifestProperties.width + "px", fi.style.height = myFT.manifestProperties.height + "px";
                for (var i = 0; i < hides.length; i++) document.getElementById(hides[i]).style.display = "none";
                fi.addEventListener("click", function() { myFT.clickTag(1, myFT.instantAds.feedfail_URL); });
            }
        },

        TIME: {
            clearTimers: function() {
                clearTimeout(myTimerVar1);
            },
            animateStart: function() {
                Ad.TIME.animateFrame1();
            },
            animateFrame1: function() {

                setTimeout(function() {


                    //ctaCont.css("opacity","1");


                }, 500);
            }
        },

        NAV: {
            cta1click: function(e) {
                clearTimeout(myTimerVar1);
                // if (Ad.frameCount == 2) {
                Tracker.clickTrackEvent(Ad.feedObj[Ad.curSlide].powerfeeds_id);
                myFT.clickTag(2, Ad.feedObj[Ad.curSlide]["final_url_" + myFT.instantAds.language.toLowerCase()]);
                // } else {
                //     myFT.clickTag(1, myFT.instantAds.clickTag);
                // }

            },

            cta2click: function(e) {

                myFT.clickTag(1, clickTag);

            },

            hitOver: function(e) {

            },
            hitOut: function(e) {

            },
            navclick_next: function(e) {
                Ad.TIME.clearTimers();
                lorySlider.next();
            },
            navclick_prev: function(e) {
                Ad.TIME.clearTimers();
                lorySlider.prev();
            }

        },
        UTILITY: {
            checkHex: function(n) {
                var e = n;
                return "transparent" != e ? (n.indexOf("#") < 0 && (e = "#" + n), e) : e
            },
            addCSS: function(e) {
                style = document.createElement("style"), style.styleSheet ? style.styleSheet.cssText = e : style.appendChild(document.createTextNode(e)), document.getElementsByTagName("head")[0].appendChild(style);
            }
        }

    };

//===========GLOBAL UTILITIES=============
function trace(t) {
    (-1 < document.URL.indexOf("http://localhost:18888") || -1 < document.URL.indexOf("https://creativepreview.flashtalking.net")) && console.log(t)
}
myFT.on("instantads", Ad.initialize);
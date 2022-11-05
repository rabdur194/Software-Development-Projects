var newscroller,
    ISI_copy_txt = myFT.$("#isi")[0],
    banner = myFT.$("#banner")[0];    

myFT.on('instantads', function() {

    banner.classList.add( "isi-"+ checkPlatform()[0] + '-' + checkPlatform()[1]);

    if(myFT.instantAds.isi_text){
        ISI_copy_txt.innerHTML = myFT.instantAds.isi_text;  
    }

    if (myFT.instantAds.logo_img && myFT.instantAds.logo_img.trim()) {
        myFT.$("#logoImg")[0].src = myFT.instantAds.logo_img.trim();
    }

    setMetaData(pi_link, myFT.instantAds.footer_txt, myFT.instantAds.footer_txt_copycolor_fontsize_XY);
    setBgColor(footer_links, myFT.instantAds.footer_bkg_color);
    
    init();
});

function setBgColor(element, bgColor){
    if (bgColor && bgColor.trim()) {
        element.style.setProperty('background-color', bgColor);
    }
}

function setMetaData(element, copy, copycolor_fontsize_XY) {
    if (copy && copy.trim()) {
        element.innerHTML = copy.trim();
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


function init() {
    //Check clicks IDs within Creative content and ISI
    myFT.$('#isi').on('click', exits)
   
    //Add Scrolling Animation/Control
    newscroller = new Scroller({
        container: '#isi-container',
        content: '#isi',
        speed: 100        
    });
    myFT.dispatch('richload_ready');
    //notify base, this richload is ready to made visible 
}

   //auto-scrolling of isi controlled from isi.js
   // To trigger the auto-scrolling, start_isi_scrolling event is dispatched from the main richload after 15 sec animation complete
   //       myFT.dispatch('start_isi_scrolling')
   
   //isi.js contains the custom event listener for that event and subsequently initialized auto scrolling

// Handling of all clickthroughs within ISI and footer links 
function exits(e) {
    console.log(e.target.id)
    switch (e.target.id) {
        case 'pi_link':
            myFT.clickTag(3, myFT.instantAds.clicktag3_url);
            break;
        case 'mg_link':
            myFT.clickTag(4, myFT.instantAds.clicktag4_url);
            break;
        case 'pi_link_isi':
            myFT.clickTag(3, myFT.instantAds.clicktag3_url);
            break;
        case 'mg_link_isi':
            myFT.clickTag(4, myFT.instantAds.clicktag4_url);
            break;
        case 'fda_link':
            myFT.clickTag(5, myFT.instantAds.clicktag5_url);
            break;
        default:
            break;
    }
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
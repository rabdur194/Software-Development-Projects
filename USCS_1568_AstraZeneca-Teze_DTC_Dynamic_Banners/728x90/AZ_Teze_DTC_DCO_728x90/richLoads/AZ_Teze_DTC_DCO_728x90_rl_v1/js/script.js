var adWidth = 728, adHeight = 90;

var variables;
var images = [];

function ftInit() {
    myFT.on("instantads", function (e) {
      main.classList.add(checkPlatform()[0] + '-' + checkPlatform()[1]);
      preload();
    });
}

function preload() {

  variables = myFT.instantAds;

  setMetaData(
    headline1, 
    variables.F1headlineTxt_size_hex_xy
  );

  setMetaData(
    headline2, 
    variables.F2headlineTxt_size_hex_xy
  );

  setMetaData(
    headline3, 
    variables.F3headlineTxt_size_hex_xy
  );

  setMetaData(
    headline4, 
    variables.F4headlineTxt_size_hex_xy
  );

  setMetaData(
    legal, 
    variables.F4_legal_Txt_size_hex_xy
  );

  setMetaData(
    cta, 
    variables.cta_txt_size_hex_xy
  );


    var imageCount = 2, imageLoaded = 0;

    bg.src = variables.background_img;
    bg.addEventListener("load", iLoad, false);

    logo.src = variables.logo_img;
    logo.addEventListener("load", iLoad, false);

    
    function iLoad() {
        imageLoaded++;
        if(imageLoaded == imageCount) {
            init();
        }
    }


    ISIText.innerHTML = myFT.instantAds.ISI_txt;

    setClicktags(variables);

}



//  Feedback updated code...........

function init() {
  ssb.scrollbar('ISIContainer'); // scrollbar initialization  
  

  var tl = new TimelineMax();
  tl.set('.main', {opacity: 1});

  tl.to('#bg', 0.25, { autoAlpha: 1 }, "+=0");
  tl.to('#headline1', 0.5, { autoAlpha: 1 },"+=0.0");
  
  tl.to('#bg', 5, { scale: 1.4, x:6, y:4 });
  tl.to('#headline1', 0.5, { autoAlpha: 0 }, "-=2");
  tl.to('#headline2', 0.5, { autoAlpha: 1 }, "-=1.5");

  tl.to(['#headline2','#bg'], 0.5, { autoAlpha: 0 }, "+=2.25"); 

  // tl.to('#logo', 0.5, { autoAlpha: 1 }, "+=0");
  // tl.to('#bg', 2, { scale: 1, x:0, y:0 });
 
  tl.to(['#logo','#indication','#ISIWrapper', '#ISIFooter'], 0.5, { autoAlpha: 1}, "-=0");
  tl.to(['#legal','#headline3'], 0.5, { autoAlpha: 1 }, "+=0");

  tl.to('#headline3', 0.5, { autoAlpha: 0 }, "+=3.25");
  
  tl.to('#headline4', 0.5, { autoAlpha: 1 }, "+=0.0");
  tl.to('#cta', .75, { autoAlpha: 1, onComplete: function(){
    frame4();
  } }, "+=0");


}

function setClicktags() {
  myFT.applyClickTag(banner, 1, variables.clickTag1_url);
  myFT.applyClickTag(cta, 2, variables.clickTag2_url);
  myFT.applyClickTag(document.getElementById('here'), 3, variables.clickTag3_ISI_url);
  myFT.applyClickTag(prescribe, 4, variables.clickTag4_FPI);
  myFT.applyClickTag(prescribeInfo, 4, variables.clickTag4_FPI);
  myFT.applyClickTag(patientInfo, 5, variables.clickTag5_PI);
  myFT.applyClickTag(document.getElementById('prescribeisi'), 4, variables.clickTag4_FPI);
  myFT.applyClickTag(document.getElementById('pi'), 5, variables.clickTag5_PI);

}


function setMetaData(element, txt_fontsize_copycolor_XY) {

  if (txt_fontsize_copycolor_XY && 
      txt_fontsize_copycolor_XY.trim() &&
      txt_fontsize_copycolor_XY.trim().split("|").length !== 0 &&
      txt_fontsize_copycolor_XY.trim().split("|")[0]
  ) {
    element.innerHTML = txt_fontsize_copycolor_XY.trim().split("|")[0];
    console.log(element, txt_fontsize_copycolor_XY);
  }

  if (txt_fontsize_copycolor_XY && 
      txt_fontsize_copycolor_XY.trim() &&
      txt_fontsize_copycolor_XY.trim().split("|").length !== 0 &&
      txt_fontsize_copycolor_XY.trim().split("|")[1]
  ) {
      element.style.setProperty('font-size',  txt_fontsize_copycolor_XY.trim().split("|")[1]+ 'px');
  }

  if (txt_fontsize_copycolor_XY && 
      txt_fontsize_copycolor_XY.trim() &&
      txt_fontsize_copycolor_XY.trim().split("|").length !== 0 &&
      txt_fontsize_copycolor_XY.trim().split("|")[0]
  ) {
      element.style.setProperty('color', txt_fontsize_copycolor_XY.trim().split("|")[2]);
  }

  if (txt_fontsize_copycolor_XY && 
      txt_fontsize_copycolor_XY.trim() &&
      txt_fontsize_copycolor_XY.trim().split("|").length !== 0 &&
      txt_fontsize_copycolor_XY.trim().split("|")[3] &&
      txt_fontsize_copycolor_XY.trim().split("|")[3].split(",").length !== 0 &&
      txt_fontsize_copycolor_XY.trim().split("|")[3].split(",")[0]
  ) {
      element.style.setProperty('left', txt_fontsize_copycolor_XY.trim().split("|")[3].split(",")[0] + 'px');
  }
  if (txt_fontsize_copycolor_XY && 
      txt_fontsize_copycolor_XY.trim() &&
      txt_fontsize_copycolor_XY.trim().split("|").length !== 0 &&
      txt_fontsize_copycolor_XY.trim().split("|")[3] &&
      txt_fontsize_copycolor_XY.trim().split("|")[3].split(",").length !== 0 &&
      txt_fontsize_copycolor_XY.trim().split("|")[3].split(",")[1]
  ) {
      element.style.setProperty('top', txt_fontsize_copycolor_XY.trim().split("|")[3].split(",")[1] + 'px');
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
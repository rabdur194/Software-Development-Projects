var adWidth = 300,
    adHeight = 250,
    feedSuccess = false,
    variables, currentSlide = 0,
    productCount = 0;
var log = false;

myFT.on("instantads", initialize);

function initialize() {
    variables = myFT.instantAds;
    var feedParams = new FTFeedParams();
    feedParams.segmentId = "";
    feedParams.feedEndpoint = variables.feedEndpoint;
    feedParams.defaultFeedEndpoint = variables.defaultFeedEndpoint;
    var ftFeed = new FTFeed(myFT, feedParams);
    ftFeed.getFeed(feedLoaded, feedLoadError);
    document.head.appendChild(document.createElement("style")).innerHTML = variables.insertCSS;
}

function feedLoaded(feedArray, feedUrl) {
    if (feedArray.length == 0) {
        feedLoadError();
        return;
    }

    trace('feed loaded ' + feedUrl);
    feedSuccess = true;
    productCount = feedArray.length;


    var imageSources = [],
        productIds = [];
    for (var i = 0; i < productCount; i++) {
        productIds.push(feedArray[i].powerfeeds_id);

        var listItem = document.createElement('li');
        listItem.classList.add('js_slide');

        var imageDiv = document.createElement('img');
        imageDiv.classList.add('imageDiv');
        imageDiv.id = 'imageDiv' + i;
        imageSources.push(feedArray[i].powerfeeds_image);
        listItem.appendChild(imageDiv);

        listItem.appendChild(createCarouselText('brand', feedArray[i].brand, 18));
        listItem.appendChild(createCarouselText('productName', feedArray[i].powerfeeds_name, 30));
        // listItem.appendChild(createCarouselText('productDescription', feedArray[i].description));
        listItem.appendChild(createCarouselText('price', '$' + feedArray[i].powerfeeds_price, 35));
        var frame2Cta = createCarouselText('cta2', variables.ctaTxt, 35);
        setText(frame2Cta, variables.ctaTxt, variables.ctaTxt2_size_hex_xy_btnColor);
        listItem.appendChild(frame2Cta);

        slideList.appendChild(listItem);
    }

    Tracker.impressionTrackEvent(productIds);

    preloadImage(imageSources);
    setFrame1();
    setText(offerText, variables.promoTxt, variables.promoTxt_size_hex_xy);
    if (!variables.promoTxt || variables.promoTxt.slice().length == 0) {
        header.style.opacity = 0;
    }
    footer.style.backgroundColor = variables.footer_hex;

    f2click.addEventListener('click', function() {
        Tracker.clickTrackEvent(feedArray[currentSlide].powerfeeds_id, 'ft_section', false);
        myFT.clickTag(1, feedArray[currentSlide].link);
    });

    header.addEventListener('click', function() {
        Tracker.clickTrackEvent(feedArray[currentSlide].powerfeeds_id, 'ft_section', false);
        myFT.clickTag(1, feedArray[currentSlide].link);
    });

    f2Logo.addEventListener('click', function() {
        Tracker.clickTrackEvent(feedArray[currentSlide].powerfeeds_id, 'ft_section', false);
        myFT.clickTag(1, feedArray[currentSlide].link);
    });

   
    // cursor:pointer;
}

function feedLoadError() {
    trace('feed error');
    preloadImage([]);
    setFrame1();
}

function setFrame1() {
    setText(f1Headline, variables.headlineTxt, variables.headlineTxt_size_hex_xy);
    setText(f1cta, variables.ctaTxt, variables.ctaTxt_size_hex_xy);
    myFT.applyClickTag(frame1, 1, variables.click_url);
}

function setText(div, text, textParams) {
    //13|#ffffff|14,175
    div.innerHTML = text;
    if (!textParams || textParams.length == 0) {
        return;
    }

    var paramList = textParams.split('|');
    if (paramList[0]) div.style.fontSize = paramList[0] + 'px';
    if (paramList[1]) div.style.color = paramList[1];
    if (paramList[2]) {
        var xy = paramList[2].split(',');
        div.style.left = xy[0] + 'px';
        div.style.top = xy[1] + 'px';
    }
    if (paramList[3]) div.style.backgroundColor = paramList[3];

}

function createCarouselText(className, content, limiter) {
    var div = document.createElement('div');
    div.classList.add(className);
    
    if (content.length > limiter) {
        content = content.slice(0, limiter) + '...'
    }
    div.innerHTML = content;
    return div;
}

function preloadImage(feedImages) {
    var imageCount = 3 + feedImages.length,
        imageLoaded = 0;

    bg.src = variables.background_img;
    bg.addEventListener("load", iLoad, false);

    f1Logo.src = variables.logo1_img;
    f1Logo.addEventListener("load", iLoad, false);

    f2Logo.src = variables.logo2_img;
    f2Logo.addEventListener("load", iLoad, false);

    for (let i = 0; i < feedImages.length; i++) {
        var currentDiv = document.getElementById('imageDiv' + i);
        currentDiv.src = feedImages[i];
        currentDiv.addEventListener("load", iLoad, false);
    }

    function iLoad() {
        imageLoaded++;
        if (imageLoaded == imageCount) {
            animationStart(feedImages.length > 0);
        }
    }

}

function animationStart() {
    trace('animation start');
    TweenMax.set('#container', { opacity: 1 })
    TweenMax.to(bg, .5, { opacity: 1 });
    TweenMax.to(f1Logo, .5, { x: 0, delay: .5 });
    TweenMax.to(f1cta, .5, { x: 0, delay: .5 });
    if (!feedSuccess) return;
    TweenMax.set(frame2, { x: 160, opacity: 1 });
    TweenMax.to(frame1, .5, { x: -160, delay: 3 });

    TweenMax.to(frame2, .5, { x: 0, delay: 3 });
    //TweenMax.to(frame2, .5, {opacity: 1, delay: 2});

    var simple = document.querySelector('.js_slider');
    var lorySlider = lory(simple, { infinite: 1, enableMouseEvents: true });

    simple.addEventListener('after.lory.slide', function(e) {
        currentSlide = e.detail.currentSlide - 1;
    });

    for (let i = 0; i < productCount; i++) {
        var delay = 5000 + 3000 * i;

        setTimeout(function() {
            lorySlider.next();
        }, delay);
    }


}

function trace(string) {
    if (log) {
        console.log(string);
    }
}
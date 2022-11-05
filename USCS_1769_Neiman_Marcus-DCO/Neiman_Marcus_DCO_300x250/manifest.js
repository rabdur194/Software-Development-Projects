FT.manifest({
	"filename": "index.html",
	"width": 300,
	"height": 250,
	"clickTagCount": 1,
	"richLoads": [
		{ "name": "Richload", "src": "Neiman_Marcus_DCO_300x250_RL" }
    ],
	"instantAds": [
		{ "name": "insertCSS","type": "text", 	"default": "" },
		{ "name": "Richload", "type": "richload", "default": "Neiman_Marcus_DCO_300x250_RL" },
		{ "name": "feedEndpoint", "type": "text", "default": "https://fm.flashtalking.com/feed/1693/trending/womens-shoes&numItems=4" },
		{ "name": "defaultFeedEndpoint", "type": "text", "default": "https://fm.flashtalking.com/feed/1693/trending/apparel-accessories-shoes" },
		
		{ "name": "headlineTxt", "type": "text", "default": "" },
		{ "name": "headlineTxt_size_hex_xy", "type": "text", "default": "20|#00ffff|140,105" },

		{ "name": "promoTxt", "type": "text", "default": "FREE SHIPPING + FREE RETURNS EVERYDAY" },
		{ "name": "promoTxt_size_hex_xy", "type": "text", "default": "11|#ffffff|0,8" },

		{ "name": "ctaTxt", "type": "text", "default": "SHOP NOW" },
		{ "name": "ctaTxt_size_hex_xy", "type": "text", "default": "11|#ffffff|0,201" },
		{ "name": "ctaTxt2_size_hex_xy_btnColor", "type": "text", "default": "8|#000000|190,133|#ffffff" },

		{ "name": "logo1_img", "type": "image", "default": "images/logo_1_300x250.png" },
		{ "name": "logo2_img", "type": "image", "default": "images/logo_2_300x250.png" },

		{ "name": "background_img", "type": "image", "default": "images/f1_bg_300x250.jpg" },
		{ "name": "footer_hex", "type": "text", "default": "black" },
		{ "name": "click_url", 				"type": "text", 	"default": "testcta" }
		
	]
});

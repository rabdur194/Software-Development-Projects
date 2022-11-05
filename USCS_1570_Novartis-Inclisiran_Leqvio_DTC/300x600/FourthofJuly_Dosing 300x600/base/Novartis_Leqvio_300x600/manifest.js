FT.manifest({
    "filename": "index.html",
    "width": 300,
    "height": 600,
    "clickTagCount": 5,
    "richLoads": [
        { "name": "main_richload", "src": "FourthofJuly_Dosing_300x600" },
        { "name": "isi_richload", "src": "Novartis_Leqvio_DTC_isi_300x600_RL" }
    ],
    "instantAds": [
        { 
            "name": "main_richload", 
            "type": "richLoad" 
        },
        { 
            "name": "isi_richload",  
            "type": "richLoad" 
        },
        { 
            "name": "isi_text",                      
            "type": "text", 
            "default":`<p><span class='bold'>What is LEQVIO?</span></p>
            <p>
                LEQVIO (inclisiran) is an injectable prescription<br/>
                medicine used along with diet and other lipid-lowering<br/> 
				medicines in adults who need additional lowering of<br/>
				“bad”
                cholesterol (LDL-C) and have known<br/> 
				cardiovascular
                disease and/or
                heterozygous familial<br/>
                hypercholesterolemia
                (HeFH), an inherited
                condition<br/> that causes high
                levels of LDL-C. It is not
                known if<br/> LEQVIO can
                decrease problems related
                to high<br/> cholesterol, such as
                heart attacks or stroke.
            </p>
            <br/>
            <p><span class="bold">IMPORTANT SAFETY INFORMATION</span> </p>
            <p>
                The most common side
                effects of LEQVIO were:<br/>
                injection site reaction
                (including pain, redness
                and<br/> rash), joint pain,
                urinary tract infection,
                diarrhea, chest<br/> cold, pain
                in legs or arms and
                shortness of breath.
            </p>
            <br/>
            <p>
                These are not all the possible side effects of LEQVIO.<br/> 
				Ask your health care provider for medical advice<br/> 
				about side effects. You are encouraged to report<br/> 
				negative side effects of prescription drugs to the FDA.<br/> 
				Visit <span id="fda_link" class="line">www.fda.gov/medwatch,</span> or call 1-800-FDA-1088.
            </p>
            <br/>
            <p class="mt-6">Please <span id="pi_link_isi" class="line">click here</span> for full Prescribing Information.</p>
            <br/>
            <p>
                LEQVIO and the LEQVIO logo are registered<br/>
                trademarks of Novartis AG.
            </p>
            <br/>
            <p>
                Licensed from Alnylam Pharmaceuticals, Inc.
            </p>  
            <footer>
                <img alt='Novartis Logo' id='logo_isi' src='images/logo_isi.png'> 
            </footer>
            <div class='isi-date-disc'><span class='isi-date'>&copy; 2022 Novartis</span> <span class='isi-disc'>2/22 188152</span></div>
            <br/><br/><br/>`
        },
        { 
            "name": "logo_img",     
            "type": "image", 
            "default": "images/300x600_LEQVIO_logo_2x.png" 
        },
        { 
            "name": "f1_background_color",              
            "type": "text", 
            "default": ""   
        },
        { 
            "name": "f1_background_img",       
            "type": "image", 
            "default": "images/300x600_Dosing_f1_bg.png" 
        },
        { 
            "name": "f1_headline_txt",              
            "type": "text", 
            "default": "Celebrate<br/>and lower Bad<br/>cholesterol"   
        },
        { 
            "name": "f1_headline_copycolor_fontsize_XY",  
            "type": "text",  
            "default": "#ffffff|27|35,261"        
        },
        { 
            "name": "f1_disclaimer_txt",  
            "type": "text",  
            "default": "For people with known heart disease on<br/>a statin who need more help lowering<br/>bad cholesterol (LDL-C)."        
        },
        { 
            "name": "f1_disclaimer_copycolor_fontsize_XY",  
            "type": "text",  
            "default": "#ffffff|10.5|47,397"        
        },
        { 
            "name": "f1_disclaimer_bkgcolor",  
            "type": "text",  
            "default": "#732A7B"        
        },
        { 
            "name": "f2_background_color",              
            "type": "text", 
            "default": "#732A7B"
        },
        { 
            "name": "f2_icon_img",     
            "type": "image", 
            "default": "images/1x1.png" 
        },
        { 
            "name": "f2_icon_img_XY",              
            "type": "text", 
            "default": "25,154"   
        },
        { 
            "name": "f2_headline_txt",              
            "type": "text", 
            "default": "2|LEQVIO® is|doses<br/>a year"   
        },
        { 
            "name": "f2_headline_txt_copycolor_fontsize_XY",              
            "type": "text", 
            "default": "#ffffff|27|44,140"   
        },
        { 
            "name": "f2_disclaimer_txt",              
            "type": "text", 
            "default": "LEQVIO® is an injection given by a<br/>health care provider twice a year,<br/>after two initial doses."   
        },
        { 
            "name": "f2_disclaimer_txt_copycolor_fontsize_XY",              
            "type": "text", 
            "default": "#ffffff|10.5|62,397"   
        },
        { 
            "name": "f2_disclaimer_bkgcolor",              
            "type": "text", 
            "default": "#007F94"   
        },
        { 
            "name": "f3_background_color",              
            "type": "text", 
            "default": "#732A7B"   
        },
        { 
            "name": "f3_icon_img",   
            "type": "image", 
            "default": "images/1x1.png" 
        },
        { 
            "name": "f3_icon_img_XY",              
            "type": "text", 
            "default": "87,64"   
        },
        { 
            "name": "f3_headline_txt",  
            "type": "text",  
            "default": "<span class='book-style'>TO LOWER</span><br/>BAD CHOLESTEROL<br/>AND KEEP IT LOW"        
        },
        { 
            "name": "f3_headline_txt_copycolor_fontsize_XY",  
            "type": "text",  
            "default": "#ffffff|27|17,143"        
        },
        { 
            "name": "f3_disclaimer_txt",  
            "type": "text",  
            "default": "LEQVIO® is an injection given by a<br/>health care provider twice a year,<br/>after two initial doses."        
        },
        { 
            "name": "f3_disclaimer_txt_copycolor_fontsize_XY",  
            "type": "text",  
            "default": "#ffffff|10.5|62,397"        
        },
        { 
            "name": "f3_disclaimer_bkgcolor",  
            "type": "text",  
            "default": "#007F94"        
        },
        { 
            "name": "f4_background_color",  
            "type": "text",  
            "default": "#732A7B"        
        },
        { 
            "name": "f4_background_img",   
            "type": "image", 
            "default": "images/300x600_Dosing_f4_bg.png" 
        },
        { 
            "name": "f4_headline_txt",  
            "type": "text",  
            "default": "CELEBRATE LOWER<br/>CHOLESTEROL<br/>WITH LEQVIO®"        
        },
        { 
            "name": "f4_headline_txt_copycolor_fontsize_XY",  
            "type": "text",  
            "default": "#ffffff|27|17,241"        
        },
        { 
            "name": "f4_disclaimer_txt",  
            "type": "text",  
            "default": ""        
        },
        { 
            "name": "f4_disclaimer_txt_copycolor_fontsize_XY",  
            "type": "text",  
            "default": ""        
        },
        { 
            "name": "f4_disclaimer_bkgcolor",  
            "type": "text",  
            "default": ""        
        },
        { 
            "name": "CTA_text",  
            "type": "text",  
            "default": "LEARN MORE <span class='cta-arrow'></span>"      
                
        },
        { 
            "name": "CTA_fontsize_copycolor_XY",  
            "type": "text",  
            "default": "13|#fff|72,365"        
        },
        { 
            "name": "CTA_button_color",  
            "type": "text",  
            "default": "#732A7B"        
        },
        { 
            "name": "footer_txt",  
            "type": "text",  
            "default": "Full Prescribing Information"        
        },
        { 
            "name": "footer_txt_copycolor_fontsize_XY",  
            "type": "text",  
            "default": "#fff|11|74,2"        
        },
        { 
            "name": "footer_bkg_color",  
            "type": "text",  
            "default": "#707070"
        },
        { 
            "name": "clicktag1_url", 
            "type": "text", 
            "default": "http://www.leqvio.com/" 
        },
        { 
            "name": "clicktag2_url", 
            "type": "text", 
            "default": "http://www.leqvio.com/" 
        },
        { 
            "name": "clicktag3_url", 
            "type": "text", 
            "default": "https://www.novartis.us/sites/www.novartis.us/files/leqvio.pdf" 
        },
        { 
            "name": "clicktag4_url", 
            "type": "text", 
            "default": "" 
        },
        { 
            "name": "clicktag5_url", 
            "type": "text", 
            "default": "https://www.fda.gov/safety/medwatch-fda-safety-information-and-adverse-event-reporting-program" 
        },
        { 
            "name": "CSS_txt", 
            "type": "text", 
            "default": "" 
        }
    ]
});
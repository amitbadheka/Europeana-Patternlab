log=function(a){console.log(a)};var EuCarousel=function(a,b){var c,d,e,f=1,a=$(a),g=15,h=g,i=0,j=b.length,k=!1,l=function(){k=!0,a.css("overflow-x","hidden"),e.css("left","0"),a.scrollTo(e.find(".carousel-item:nth-child("+f+")"),1==i?0:1e3,{axis:"x",onAfter:function(){var b=function(){a.css("overflow-x","hidden"),k=!1,n()};if(1==i){e.find(".carousel-item:first").css("margin-left");e.css("left",h+"px")}else e.css("left","0");b()}})},m=function(){log("resizing");var b=a.width(),c=e.find(".carousel-item").first().outerWidth(),d=parseInt(b/(c+g));h=g,h=1==d?(b-c)/2:(b-d*c)/(d-1),h=parseInt(h),i=d,e.find(".carousel-item").css("margin-left",parseInt(h)+"px"),log("w: "+b+", itemW: "+c+", maxFit "+d),1!=d&&e.find(".carousel-item:first").css("margin-left","0px"),e.css("width",b+j*(c+h)),l()},n=function(){1==f?c.hide():c.show(),j>=f+i?d.show():d.hide()},o=function(){k=!0;var b=1>f-i?1:f-i;log("prev index = "+b),f=b,b=e.find(".carousel-item:nth-child("+b+")"),a.css("overflow-x","hidden"),e.css("left","0"),a.scrollTo(b,1==i?0:1e3,{axis:"x",onAfter:function(){var b=function(){a.css("overflow-x","hidden"),k=!1,n()};if(1==i){e.find(".carousel-item:first").css("margin-left");e.css("left",h+"px")}else e.css("left","0");b()}})},p=function(){if(!(f+i>j)){k=!0;var b=f+i;f=b,log("next index = "+b),b=e.find(".carousel-item:nth-child("+b+")"),a.css("overflow-x","hidden"),e.css("left","0"),a.scrollTo(b,1==i?0:1e3,{axis:"x",onAfter:function(){var b=function(){a.css("overflow-x","hidden"),k=!1,n()};if(1==i){e.find(".carousel-item:first").css("margin-left");e.css("left",h+"px")}else e.css("left","0");b()}})}},q=function(){if(e=$('<div class="carousel-items">').appendTo(a),c=$('<a class="carousel-left icon-arrow-4"></a>').appendTo(a),d=$('<a class="carousel-right icon-arrow-2"></a>').appendTo(a),$.each(b,function(a,b){e.append('<a class="carousel-item" href="'+b.link+'" target="'+b.linkTarget+'"><img src="'+b.thumb+'"/><span class="info">'+b.title+"</span></a>")}),$(".carousel-item .info").each(function(a,b){new Ellipsis(b)}),a.css("overflow-y","hidden"),c.click(function(a){return k||(log("go left...."),o()),a.stopPropagation(),!1}),d.click(function(a){return k||(log("go right...."),p()),a.stopPropagation(),!1}),!$("html").hasClass("ie8")){"undefined"!=typeof a.touchwipe&&a.touchwipe({wipeLeft:function(){d.click()},wipeRight:function(){c.click()},wipeUp:function(){},wipeDown:function(){},min_move_x:20,min_move_y:20,preventDefaultEvents:!0})}"undefined"!=typeof $(window).euRsz&&($(window).euRsz(function(){m()}),m())};return q(),{resize:function(){m()},inView:function(){return fnInView()},goLeft:function(){o()},goRight:function(){p()}}};
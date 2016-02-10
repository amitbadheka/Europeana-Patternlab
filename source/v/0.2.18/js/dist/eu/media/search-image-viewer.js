define(["photoswipe","photoswipe_ui"],function(a,b){"use strict";function c(c){return l.length<1?void console.warn("initialiseGallery() - no images to add to the gallery"):($(".media-viewer").trigger("object-media-open",{hide_thumb:!1,type:"image"}),n=new a(p,b,l,m),n.listen("close",function(){$(".media-viewer").trigger("object-media-close",{hide_thumb:!1,type:"image",current:n.currItem.src})}),n.listen("afterChange",function(){this.getCurrentIndex()+1==this.options.getNumItemsFn()&&$(".media-viewer").trigger("object-media-last-image-reached",{doAfterLoad:function(a){for(var b=0,c=0;c<a.length;c++){var e={src:a[c].play_url,w:a[c].technical_metadata.width,h:a[c].technical_metadata.height};d(e)&&(n.items.push(e),b+=1)}b>0&&(n.invalidateCurrItems(),n.updateSize(!0),n.ui.update())}})}),void(c?setTimeout(function(){n.init()},c):n.init()))}function d(a){return a.w?a.h?a.src?a.w<k?(console.warn("img width too small for display (<"+k+"): "+a.src),!1):!0:(console.warn("no data-src given"),!1):(console.warn("no data-h given"),!1):(console.warn("no data-w given"),!1)}function e(a){if(!a)return null;var b={src:a.attr("data-src"),w:a.attr("data-w"),h:a.attr("data-h")},c=d(b);return c||(b=null),b}function f(a,b){if(n&&n.close(),a){for(var e=[],f=0;f<a.length;f+=1)d(a[f])&&e.push(a[f]);if(l=e,0==l.length)return!1;if(b){var h=g(b);h>-1&&(m.index=h)}}return c(100),!0}function g(a){for(var b=-1,c=0;c<l.length;c++)if(l[c].src==a){b=c;break}return b}function h(a){var b=g(a);b>-1&&(o.attr("src",a),m.index=b,c())}var i=require.toUrl("../lib/photoswipe/photoswipe.css"),j=require.toUrl("../lib/photoswipe/default-skin/default-skin.css"),k=400,l=[],m={index:0},n=null,o=$(".photoswipe-wrapper > img"),p=$(".photoswipe-wrapper  > .pswp")[0];return $("head").append('<link rel="stylesheet" href="'+i+'" type="text/css"/>'),$("head").append('<link rel="stylesheet" href="'+j+'" type="text/css"/>'),{init:function(a,b){return f(a,b)},setUrl:function(a){h(a)},getItemFromMarkup:function(a){return e(a)}}});
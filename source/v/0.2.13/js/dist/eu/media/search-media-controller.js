define(["jquery"],function(a){function b(a){console.log("search-media-controller: "+a)}function c(){b("hideAllViewers()"),a(".media-viewer .object-media-iiif").addClass("is-hidden"),a(".media-viewer .object-media-image").addClass("is-hidden"),a(".media-viewer .object-media-text").addClass("is-hidden"),a(".media-viewer .multi-item-poster").addClass("is-hidden"),w&&w.hide(),x&&(x.hide(),x=null),u&&u.hide(),v&&v.hide(),y&&y.hide()}function d(){b("initMedia()")}function e(c){b("remove playability..."),c.$thumb.removeClass("playable"),c.$thumb.find(".media-clickable-indicator").remove(),a(r).removeClass("loading"),a(s).removeClass("loading"),a(".media-viewer .object-media-"+c.player).addClass("is-hidden")}function f(b,c){a(".media-viewer").removeClass("active"),a(".media-viewer .multi-item-poster").removeClass("is-hidden"),"image"==c.type&&(a(window).trigger("updateTechData",{selector:'*[data-uri="'+c.current+'"]'}),a(".multi-item-poster img").attr("src",c.current))}function g(b,c){c.hide_thumb&&(a(p).addClass("open"),a(q).addClass("open")),a(r).removeClass("loading"),a(s).removeClass("loading"),a(".media-viewer").addClass("active"),"image"!=c.type&&a(".media-viewer").trigger({type:"refresh-nav-carousel"})}function h(d,e){c(),a(".media-viewer .object-media-audio").removeClass("is-hidden"),require(["media_viewer_videojs"],function(c){w=c;var d=w.getItemFromMarkup(e.target);d?w.init(d):(a(".media-viewer").trigger({type:"remove-playability",$thumb:e.target,player:"audio"}),b("missing audio item - removed"))})}function i(d,e){b("initMediaIIIF() "+e.url),c(),a(".media-viewer .object-media-iiif").removeClass("is-hidden"),require(["leaflet"],function(a){require(["media_viewer_iiif"],function(a){x=a,x.init(e.url,e.target)})})}function j(d,f){b("initMediaImage()   "+t);var g=[],h=f.target.attr("data-uri");a(r+"[data-type=image]").add(s+"[data-type=image]").each(function(){var c=a(this),d=c.attr("data-uri"),e=c.attr("data-height"),f=c.attr("data-width");d&&f&&e&&f.length>0&&e.length>0?(b("add img: "+d+", w "+f+", h "+e),g.push({src:d,h:parseInt(e),w:parseInt(f)})):b("incomplete image data")}),require(["media_viewer_image"],function(b){t=b,c(),a(".media-viewer .object-media-image").removeClass("is-hidden"),t.init(g,h)||e({$thumb:a(f.target)})})}function k(b,d){c(),y?(y.show(),y.init(d.url)):require(["media_player_midi"],function(b){y=b,a(".media-viewer .object-media-midi").removeClass("is-hidden"),y.init(d.url)})}function l(d,e){b("initMediaPdf(): "+e.url),e.url&&e.url.length>0&&(u?(c(),u.show(),u.init(e.url)):require(["jquery"],function(){require(["pdfjs"],function(){require(["pdf_lang"],function(){require(["media_viewer_pdf"],function(b){c(),a(".media-viewer .object-media-pdf").removeClass("is-hidden"),u=b,u.init(e.url)})})})}))}function m(d,e){c(),a(".media-viewer .object-media-video").removeClass("is-hidden"),require(["media_viewer_videojs"],function(c){v=c;var d=v.getItemFromMarkup(e.target);d?v.init(d):(a(".media-viewer").trigger({type:"remove-playability",$thumb:e.target,player:"video"}),b("missing video item - removed"))})}function n(c){if(a(this).hasClass("disabled"))return b("return because media link disabled"),void c.preventDefault();if(a(this).hasClass("playable")){a(this).addClass("loading");var d=a(this).attr("data-type");console.log("media controller will trigger eventobject-media-"+d),a(".media-viewer").trigger("object-media-"+d,{url:a(this).attr("data-uri"),thumbnail:a(this).data("thumbnail"),target:a(this)}),c.preventDefault()}else b("media item not playable")}var o=".multi-item-poster a",p=".object-media-nav",q=".single-item-thumb",r=p+" a",s=q+" a",t=(a(r).length>1,null),u=null,v=null,w=null,x=null,y=null;a(o).on("click",function(b){var c=a(b.target).closest("a"),d=c.data("uri");a(r).each(function(b,c){var e=a(c);return e.data("uri")==d?(e.click(),!1):void 0})}),a(".media-viewer").on("media_init",d),a(".media-viewer").on("object-media-audio",h),a(".media-viewer").on("object-media-iiif",i),a(".media-viewer").on("object-media-image",j),a(".media-viewer").on("object-media-midi",k),a(".media-viewer").on("object-media-pdf",l),a(".media-viewer").on("object-media-video",m),a(".media-viewer").on("object-media-open",g),a(".media-viewer").on("object-media-close",f),a(".media-viewer").on("remove-playability",e),a(p).on("click","a",n),a(s).on("click",n)});
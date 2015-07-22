define(["jquery","imagesLoaded"],function(a,b){function c(){console.log("hideAllViewers()"),a(".media-viewer .object-media-audio").addClass("is-hidden"),a(".media-viewer .object-media-image").addClass("is-hidden"),a(".media-viewer .object-media-pdf").addClass("is-hidden"),a(".media-viewer .object-media-text").addClass("is-hidden"),a(".media-viewer .object-media-video").addClass("is-hidden")}function d(){console.log("initMedia()")}function e(){a(k).addClass("open")}function f(b,d){c(),a(".media-viewer .object-media-audio").removeClass("is-hidden"),require(["media_viewer_videojs"],function(a){a.init(a.getItemFromMarkup(d.target))})}function g(b,d){if(console.log("initMediaImage()   "+m),m)return c(),a(".media-viewer .object-media-image").removeClass("is-hidden"),void m.setUrl(d.url);var e=[],f=[],g=d.target.attr("data-uri");if(a(l+"[data-type=image]").each(function(){var b=a(this),c=b.attr("data-uri"),d=b.attr("data-height"),g=b.attr("data-width");c&&g&&d?e.push({src:c,h:d,w:g}):c?f.push(c):console.log("incomplete image data")}),f.length>0){a("body").append('<div id="img-measure" style="position:absolute; visibility:hidden;">');for(var h=0;h<f.length;h++)a("#img-measure").append('<img src="'+f[h]+'">');a("#img-measure").imagesLoaded(function(b,d,f){for(var h=0;h<b.length;h++){var i=a(b[h]);e.push({src:i.attr("src"),h:i.height(),w:i.width()})}a("#img-measure").remove(),require(["media_viewer_image"],function(b){m=b,c(),a(".media-viewer .object-media-image").removeClass("is-hidden"),m.init(e,g)})})}else console.log("full img meta-data given:\n	"+JSON.stringify(e)),require(["media_viewer_image"],function(b){m=b,c(),a(".media-viewer .object-media-image").removeClass("is-hidden"),m.init(e,g)})}function h(b,d){console.log("initMediaPdf(): "+d.url),d.url&&d.url.length>0&&require(["jquery"],function(){require(["pdfjs"],function(){require(["pdf_lang"],function(){require(["media_viewer_pdf"],function(b){c(),a(".media-viewer .object-media-pdf").removeClass("is-hidden"),b.init(d.url)})})})})}function i(b,d){c(),a(".media-viewer .object-media-video").removeClass("is-hidden"),require(["media_viewer_videojs"],function(a){a.init(a.getItemFromMarkup(d.target))})}function j(b){b.preventDefault(),b.stopPropagation(),a(".media-viewer").trigger("object-media-"+a(this).attr("data-type"),{url:a(this).attr("data-uri"),target:a(this)})}var k=".object-media-nav",l=k+" a",m=null;a(".media-viewer").on("media_init",d),a(".media-viewer").on("object-media-audio",f),a(".media-viewer").on("object-media-image",g),a(".media-viewer").on("object-media-pdf",h),a(".media-viewer").on("object-media-video",i),a(".media-viewer").on("object-media-open",e),a(l).on("click",j)});
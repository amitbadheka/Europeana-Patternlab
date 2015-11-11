define(["jquery","util_scrollEvents","blacklight","media_controller"],function(a,b){function c(a){console.log(a)}function d(b){require(["eu_hierarchy","jsTree"],function(c){var d=JSON.parse(a(".hierarchy-objects").text()),e=require.toUrl("../lib/jstree/css/style.css"),f=require.toUrl("../lib/jstree/css/style-overrides.css");a("head").append('<link rel="stylesheet" href="'+e+'" type="text/css"/>'),a("head").append('<link rel="stylesheet" href="'+f+'" type="text/css"/>');var g='<div class="hierarchy-top-panel uninitialised">  <div class="hierarchy-prev"><a>'+b.label_up+'</a><span class="count"></span></div>  <div class="hierarchy-title"></div></div><div class="hierarchy-container uninitialised">  <div id="hierarchy"></div></div><div class="hierarchy-bottom-panel">  <div class="hierarchy-next"><a>'+b.label_down+'</a><span class="count"></span></div></div>';a(".hierarchy-objects").html(g);var h=c.create(a("#hierarchy"),16,a(".hierarchy-objects"),window.location.href.split("/record")[0]+"/record",window.location.href.split("/record")[0]+"/record");a(".hierarchy-objects").removeAttr("style"),h.init(d,!0)})}function e(b){var d=function(b,d,e){c("initLeaflet:\n	"+JSON.stringify(b)+"\n	"+JSON.stringify(d));var f="map",g="map-info",h=a("#js-map-place-name").text();require(["leaflet"],function(){a("#"+f).after('<div id="'+g+'"></div>');var c='Tiles &copy; <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png" alt="mapquest logo"/>',i=new L.TileLayer("http://otile{s}.mqcdn.com/tiles/1.0.0/{type}/{z}/{x}/{y}.png",{minZoom:4,maxZoom:18,attribution:c,subdomains:"1234",type:"osm"}),j=L.map(f,{center:new L.LatLng(d[0],b[0]),zoomControl:!0,zoomsliderControl:!1,zoom:8});L.Icon.Default.imagePath=require.toUrl("../css/map/images"),j.addLayer(i),j.invalidateSize();for(var k=[],l=0;l<Math.min(d.length,b.length);l++)L.marker([d[l],b[l]]).addTo(j),k.push(d[l]+"&deg; "+(d[l]>0?e.n:e.s)+", "+b[l]+"&deg; "+(b[l]>0?e.e:e.w));h=h?h.toUpperCase()+" ":"",a("#"+g).html(h+(k.length?" "+k.join(", "):"")),a("head").append('<link rel="stylesheet" href="'+require.toUrl("../css/map/application-map.css")+'" type="text/css"/>')})},e=(b.latitude+"").split(/,*\s+/g),f=(b.longitude+"").split(/,*\s+/g);if(e&&f){for(var g=0;g<e.length;g++)e[g]=e[g].replace(/,/g,".").indexOf(".")>-1?e[g]:e[g]+".00";for(var g=0;g<f.length;g++)f[g]+f[g].replace(/,/g,".").indexOf(".")>-1?f[g]:f[g]+".00";for(var h=[],i=[],g=0;g<Math.min(e.length,f.length);g++)e[g]&&f[g]&&[e[g]+"",f[g]+""].join(",").match(/^\s*-?\d+\.\d+\,\s?-?\d+\.\d+\s*$/)?(h.push(f[g]),i.push(e[g])):c("Map data error: invalid coordinate pair:\n	"+h[g]+"\n	"+i[g]);h.length&&i.length?d(h,i,b.labels):c("Map data missing")}}function f(){k(),h({target:a(".single-item-thumb a")[0]}),m(),a(window).bind("showMLT",function(a,b){j(b)}),a(window).bind("showMediaThumbs",function(a,b){i(b)}),a(window).bind("showMap",function(a,b){e(b)}),a(window).bind("showHierarchy",function(a,b){d(b)}),a(window).bind("updateTechData",function(b,c){h({target:a(c.selector)[0]})}),a(".media-viewer").trigger("media_init"),b.fireAllVisible()}var g=function(a,b){var c=jQuery.Deferred();return require(["eu_carousel","eu_carousel_appender"],function(d,e){var f=e.create({cmp:a.find("ul"),loadUrl:b.loadUrl,template:b.template,total_available:b.total_available});c.resolve(d.create(a,f,b))}),c.promise()},h=function(b){var c=a(b.target),d={href:"",meta:[],fmt:""},e=function(b,c,d){a(".file-info .file-title").attr("href",b),a(".file-info .file-meta li").remove(),a(".file-detail .file-type").html(d.indexOf("/")>-1?d.split("/")[1]:d&&d.length?d:"?"),a.each(c,function(b,c){a(".file-info .file-meta").append("<li>"+c+"</li>")}),b||a(".object-downloads").removeClass("is-expanded")},f=function(b,d){if(d=a(d),0==d.length)return!1;for(var e=!0,f=!1,g="",h=0;h<b.length;h++){var i=c.data(b[h].attr)||b[h].def;i?(g+=i+" ",b[h].label||(f=!0)):e=!1}return e?(d.next(".val").empty(),d.next(".val").text(g.trim()),d.closest("li").removeClass("is-disabled")):(d.next(".val").empty(),d.closest("li").addClass("is-disabled")),f},g=a(".object-techdata"),h=f([{attr:"file-size"},{attr:"file-unit"}],".tech-meta-filesize")|f([{attr:"runtime"},{attr:"runtime-unit",label:!0}],".tech-meta-runtime")|f([{attr:"format"}],".object-techdata .tech-meta-format")|f([{attr:"codec"}],".tech-meta-codec")|f([{attr:"width"},{attr:"use_def",def:"x",label:!0},{attr:"height"},{attr:"size-unit",label:!0}],".tech-meta-dimensions");if(h?g.show():(g.removeClass("is-expanded"),g.hide()),c.data("download-uri")){a(".object-downloads .download-button").removeClass("js-showhide").removeClass("is-disabled"),d.href=c.data("download-uri"),d.fmt=c.data("format"),d.meta=[];for(var i=a(".object-techdata-list").find("li:not(.is-disabled)"),j=0;j<Math.min(2,i.length);j++)d.meta.push(a(i[j]).html())}else a(".object-downloads .download-button").addClass("js-showhide").addClass("is-disabled"),d.href="",d.meta=[],d.fmt="";e(d.href,d.meta,d.fmt)},i=function(b){if(a(".object-media-nav li").length>1){var d=g(a(".media-thumbs"),b);d.done(function(b){a(".media-viewer").on("object-media-last-image-reached",function(a,c){b.loadMore(!1,c.doAfterLoad)}),a(".media-thumbs").on("click","a",h),h({target:a(".media-thumbs a:first")[0]})})}else c("no media carousel needed")},j=function(b){g(a(".more-like-this"),b)},k=function(){a(".agt-title").on("click",function(){$this=a(this),$ul=$this.next("ul"),$ul.toggleClass("is-hidden"),$this.toggleClass("opened")})},l=function(){if("undefined"==typeof Storage&&c("no storage"),"undefined"!=typeof Storage){var b=sessionStorage.eu_portal_channel_label,d=sessionStorage.eu_portal_channel_name,e=sessionStorage.eu_portal_channel_url;if("undefined"!=typeof e&&"undefined"!=e){var f=a(".breadcrumbs li.js-channel"),g=f.find("a");g.text(b),g.attr("href",e),f.removeClass("js-channel")}d&&"undefined"!=d&&a("#main-menu ul a").each(function(b,c){var e=a(c);e.attr("href").indexOf("/channels/"+d)>-1&&e.addClass("is-current")})}},m=function(){var b=window.location.href.split(".html")[0]+"/navigation.json";b.indexOf("/patterns/")>-1||a.ajax({beforeSend:function(b){b.setRequestHeader("X-CSRF-Token",a('meta[name="csrf-token"]').attr("content"))},url:b,type:"GET",contentType:"application/json; charset=utf-8",success:function(b){if(b.back_url){var c=a(".breadcrumbs li.js-return"),d=c.find("a");d.attr("href",b.back_url),c.removeClass("js-return"),l()}if(b.next_prev){if(b.next_prev.next_url){var c=a(".object-nav-lists li.js-next"),d=c.find("a");d.attr("href",b.next_prev.next_url),c.removeClass("js-next"),a(b.next_prev.next_link_attrs).each(function(a,b){d.attr(b.name,b.value)})}if(b.next_prev.prev_url){var c=a(".object-nav-lists li.js-previous"),d=c.find("a");d.attr("href",b.next_prev.prev_url),c.removeClass("js-previous"),a(b.next_prev.prev_link_attrs).each(function(a,b){d.attr(b.name,b.value)})}}Blacklight.activate()},error:function(a){c("failed to load breadcrumbs ("+JSON.stringify(a)+") from url: "+b)}})};return{initPage:function(){f()}}});
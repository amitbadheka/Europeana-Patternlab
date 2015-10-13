define(['jquery', 'util_scrollEvents', 'media_controller'], function($, scrollEvents) {

    function log(msg){
        console.log(msg);
    }

    function showMap(data){
        var initLeaflet = function(longitudes, latitudes, labels){
            log('initLeaflet:\n\t' + JSON.stringify(longitudes) + '\n\t' + JSON.stringify(latitudes))

            var mapId = 'map';
            var mapInfoId = 'map-info';
            var placeName = $('#map-place-name').text();

            require(['leaflet'], function(){

                $('#' + mapId).after('<div id="' + mapInfoId + '"></div>');
                var mqTilesAttr = 'Tiles &copy; <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png" alt="mapquest logo"/>';

                // map quest
                var mq = new L.TileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/{type}/{z}/{x}/{y}.png', {
                    minZoom : 4,
                    maxZoom : 18,
                    attribution : mqTilesAttr,
                    subdomains : '1234',
                    type : 'osm'
                });
                var map = L.map(mapId, {
                    center : new L.LatLng(latitudes[0], longitudes[0]),
                    zoomControl : true,
                    zoom : 8
                });

                L.Icon.Default.imagePath = require.toUrl('../css/map/images');

                map.addLayer(mq);
                map.invalidateSize();

                var coordLabels = [];

                for(var i = 0; i < Math.min(latitudes.length, longitudes.length); i++){
                    L.marker([latitudes[i], longitudes[i]]).addTo(map);
                    coordLabels.push(latitudes[i] + '&deg; ' + (latitudes[i] > 0 ? labels.n : labels.s) + ', ' + longitudes[i] + '&deg; ' + (longitudes[i] > 0 ? labels.e : labels.w));
                }

                placeName = placeName ? placeName.toUpperCase() + ' ' : '';

                $('#' + mapInfoId).html(placeName + (coordLabels.length ? ' ' + coordLabels.join(', ') : ''));

                $('head').append('<link rel="stylesheet" href="' + require.toUrl('../css/map/application-map.css') + '" type="text/css"/>');
            });
        }

        // split multi-values on (whitespace or comma + whitespace)

        var latitude = (data.latitude + '').split(/,*\s+/g);
        var longitude = (data.longitude + '').split(/,*\s+/g);

        if(latitude && longitude){

            // replace any comma-delimited decimals with decimal points / make decimal format

            for(var i = 0; i < latitude.length; i++){
                latitude[i] = latitude[i].replace(/,/g, '.').indexOf('.') > -1 ? latitude[i] : latitude[i] + '.00';
            }
            for(var i = 0; i < longitude.length; i++){
                longitude[i] + longitude[i].replace(/,/g, '.').indexOf('.') > -1 ? longitude[i] : longitude[i] + '.00';
            }

            var longitudes = [];
            var latitudes = [];

            // sanity check
            for(var i = 0; i < Math.min(latitude.length, longitude.length); i++){
                if(latitude[i] && longitude[i] && [latitude[i] + '', longitude[i] + ''].join(',').match(/^\s*-?\d+\.\d+\,\s?-?\d+\.\d+\s*$/)){
                    longitudes.push(longitude[i]);
                    latitudes.push(latitude[i]);
                }
                else{
                    log('Map data error: invalid coordinate pair:\n\t' + longitudes[i] + '\n\t' + latitudes[i]);
                }
            }

            if(longitudes.length && latitudes.length){
                initLeaflet(longitudes, latitudes, data.labels);
            }
            else{
                log('Map data missing');
            }
        }
    }

    var initCarousel = function(el, ops){

        var carousel = jQuery.Deferred();

        require(['eu_carousel', 'eu_carousel_appender'], function(Carousel, CarouselAppender){
            var appender = CarouselAppender.create({
                'cmp':             el.find('ul'),
                'loadUrl':         ops.loadUrl,
                'template':        ops.template,
                'total_available': ops.total_available
            });
            carousel.resolve(Carousel.create(el, appender, ops));
        });
        return carousel.promise();
    }

    // tech-data download handling

    var updateTechData = function(e){

        var tgt          = $(e.target);
        var fileInfoData = {"href": "", "meta": [], "fmt": ""};

        // download section
        var setFileInfoData = function(href, meta, fmt){
            $('.file-info .file-title').attr('href', href);
            $('.file-info .file-meta li').remove();
            $('.file-detail .file-type').html(fmt);
            $.each(meta, function(i, ob){
                $('.file-info .file-meta').append('<li>' + ob + '</li>');
            });
            if(!href){
                $('.object-downloads').removeClass('is-expanded')
            }
        }

        // individual tech-data fields
        var setVal = function(data, writeEl){

            var allFound  = true;
            var anyFound  = false;
            var allConcat = '';

            for(var i=0; i<data.length; i++){
                var val = tgt.data(data[i]['attr']) || data[i]['def'];
                if(val){
                    allConcat += val + ' ';
                    if(!data[i]['label']){
                        anyFound  = true;
                    }
                }
                else{
                    allFound = false;
                }
            }
            if(allFound){
                $( writeEl )[0].nextSibling.nodeValue = allConcat.trim();
                $( writeEl ).closest('li').removeClass('is-disabled');
            }
            else{
                $( writeEl )[0].nextSibling.nodeValue = '';
                $( writeEl ).closest('li').addClass('is-disabled');
            }
            return anyFound;
        }
        var techData        = $('.object-techdata');
        var somethingGotSet = setVal(
                [{attr: 'file-size'},
                 {attr: 'file-unit'}],  '.tech-meta-filesize')
        | setVal(
                [{attr: 'runtime'},
                 {attr: 'runtime-unit', label: true}], '.tech-meta-runtime')
        | setVal(
                [{attr: 'format'}], '.object-techdata .tech-meta-format')
        | setVal(
                [{attr: 'codec'}],  '.tech-meta-codec')
        | setVal(
                [{attr: 'width'},
                 {attr: 'use_def', def: 'x', label: true},
                 {attr: 'height'},
                 {attr: 'size-unit', label: true}], '.tech-meta-dimensions');

        if(somethingGotSet){
            techData.show();
        }
        else{
            techData.removeClass('is-expanded')
            $('.object-techdata').hide();
        }

        // download window
        if(tgt.data('download-uri')){
            $('.object-downloads .download-button').removeClass('js-showhide').removeClass('is-disabled');
            fileInfoData["href"] = tgt.data('download-uri');
            fileInfoData["fmt"]  = tgt.data('format');
            fileInfoData["meta"] = [];

            // take 1st 2 available metadatas
            var availableMeta = $('.object-techdata-list').find('li:not(.is-disabled)');
            for(var i=0; i < Math.min(2, availableMeta.length); i++){
                fileInfoData["meta"].push($(availableMeta[i]).html());
            }
        }
        else{
            $('.object-downloads .download-button').addClass('js-showhide').addClass('is-disabled');
            fileInfoData["href"] = '';
            fileInfoData["meta"] = [];
            fileInfoData["fmt"]  = '';
        }
        setFileInfoData(fileInfoData["href"], fileInfoData["meta"], fileInfoData["fmt"]);
    }

    var showMediaThumbs = function(data){
        if($('.object-media-nav li').length > 1){

            // keep reference to carousel for thumb strip updates
            var promisedCarousel = initCarousel($('.media-thumbs'), data);
            promisedCarousel.done(

                function(carousel){
                    var setOptimalHeight = function(v){
                        if(v){
                            var currHeight    = $('.media-thumbs').outerHeight(true);
                            var deduct        = currHeight - $('.media-thumbs').height();

                            $('.media-thumbs').removeAttr('style');
                            var newH = $('.media-viewer').height() - deduct;

                            $('.media-thumbs').css('height', newH + 'px');
                        }
                        else{
                            $('.media-thumbs').removeAttr('style');
                        }
                        carousel.resize();
                    }

                    carousel.vChange(function(v){
                        setOptimalHeight(v);
                    });

                    $('.media-viewer').on('refresh-nav-carousel', function(){
                        setOptimalHeight(carousel.isVertical());
                    });

                    $('.media-thumbs').on('click', 'a', updateTechData);
                    updateTechData({target:$('.media-thumbs a:first')[0]});
                }
            );
        }
        else{
            log('no media carousel needed');
        }
    }

    var showMLT = function(data){
        initCarousel($('.more-like-this'), data);
    }

    var channelCheck = function(){
        if(typeof(Storage) == "undefined") {
            console.log('no storage');
        }
        if(typeof(Storage) !== "undefined") {

            // get channel data

            var label = sessionStorage.eu_portal_channel_label;
            var name  = sessionStorage.eu_portal_channel_name;
            var url   = sessionStorage.eu_portal_channel_url;

            if(typeof url != 'undefined' && url != 'undefined' ){
                var crumb = $('.breadcrumbs li.js-channel');
                var link  = crumb.find('a');
                link.text(label);
                link.attr('href', url);
                crumb.removeClass('js-channel');
            }

            // menu styling

            if(name && name != 'undefined'){
                $('#main-menu ul a').each(function(i, ob){
                    var $ob = $(ob);
                    if($ob.attr('href').indexOf('/channels/' + name) >-1){
                        $ob.addClass('is-current');
                    }
                });
            }
        }
    }

    function initPage(){

        channelCheck();
        updateTechData({target:$('.single-item-thumb a')[0]});

        // event binding

        $(window).bind('showMLT', function(e, data){
            showMLT(data);
        });

        $(window).bind('showMediaThumbs', function(e, data){
            showMediaThumbs(data);
        });

        $(window).bind('showMap', function(e, data){
            showMap(data);
        });

        $('.media-viewer').trigger('media_init');

        scrollEvents.fireAllVisible();
    };

    return {
        initPage: function(){
            initPage();
        }
    }
});

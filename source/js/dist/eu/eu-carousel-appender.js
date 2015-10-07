define(['jquery'], function($){

    var log = function(msg){
        console.log('carousel-appender: ' + msg);
    };

    var warn = function(msg){
        console.warn('carousel-appender: ' + msg);
    };

    var stringify = function(ob){
        return JSON.stringify(ob, null, 4);
    };

    var templates = {

      "mlt": function(data){

          log('mlt template: ' + data);

          var markup = '';

          $.each(data.documents, function(i, item){
            markup += ''
              + '<li class="js-carousel-item">'
              +   '<div class="mlt-img-div height-to-width" style="background-image: url(' + item.img.src + ')">'
              +     '<div class="inner">'
              +         '<a title="' + item.img.alt + '"'
              +             ' class="link"'
              +             ' href="'  + item.url
              +         '">&nbsp;</a>'
              +     '</div>'
              +   '</div>'
              +   '<span class="js-carousel-title">'
              +     '<a href="' + item.url + '">' + item.title + '</a>';
              +   '</span>'
              + '</li>';
          });
          return {
            "markup": markup,
            "added":  data.documents.length
          }
      },

      "media_thumb": function(data){


          var markup = '';
          $.each(data, function(i, item){

            var img = 'http://delta-api.de.a9sapp.eu/v2/thumbnail-by-url.json?uri=' + item.about;

            markup += ''
              + '<li class="js-carousel-item">'
              +   '<div class="mlt-img-div height-to-width" style="background-image: url(' + img + ')">'
              +     '<div class="inner">'
              +         '<a class="link"'
              +            ' href="'  + item.about
              +         '">&nbsp;</a>'
              +     '</div>'
              +   '</div>'
              + '</li>';
          });
          return {
              "markup": markup,
              "added":  data.length
          }
      }
  };


    var EuCarouselAppender = function(conf){

        var cmp         = conf.cmp;
        var loadUrl     = conf.loadUrl;
        var template    = conf.template;
        var totalLoaded = cmp.find('li').length;

        if(!templates[template]){
          warn('no valid template found (' + template + ')');
          return;
        }

        var append = function(data){
          var appendData = templates[template](data);
          totalLoaded += appendData.added;
          cmp.append(appendData.markup);
        };

        var load = function(callback){

            // url needs params set

            var per_page = 4;
            var page_param = parseInt(Math.floor(totalLoaded / per_page)) + 1;
            var url = loadUrl + '?page=' + page_param + '&per_page=' + per_page;

            log('load more from: ' + url);

            $.getJSON( url, null)
            .done(
                function( data ) {
                    append(data);
                    callback(totalLoaded);
                }
            )
            .fail(function(msg){
                cmp.removeClass('loading');
                log('failed to load data (' + JSON.stringify(msg) + ') from url: ' + url);
                callback(false);
            });
        };

        return {
            append : function(callback){
                log('append...');
                load(callback);
            },
            getDataCount : function(){
                log('data count is ' + totalLoaded);
                return totalLoaded;
            }
        }
    };

    return {
        create : function(conf){
            return new EuCarouselAppender(conf);
        }
    }

});
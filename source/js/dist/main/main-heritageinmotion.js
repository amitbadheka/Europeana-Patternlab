window.GoogleAnalyticsObject = '__ga__';
window.__ga__ = {
    q: [['create', '**** ANALYTICS CODE HERE ****', 'auto']],
    l: Date.now()
};

/*
var release   = null;

var scripts = document.getElementsByTagName('script');
for (var i=0; i<scripts.length; i++){
    var v = scripts[i].getAttribute('js-version');
    if(v){
        release = v;
    }
};
*/

require.config({
  //urlArgs: "cache=" + (release || Math.random()),
  paths: {

    // post grunt locations

    // featureDetect:                 '../global/feature-detect',
    // menus:                         '../global/menus',
    // jqDropdown:                    '../lib/jquery.dropdown',
    // jquery:                        '../lib/jquery',
    // jqScrollto:                    '../lib/jquery.scrollTo',


    featureDetect:                 '../../patternlab/global/feature-detect',

    lightbox:                      '../bower_components/featherlight/src/featherlight',

    ga:                            '//www.google-analytics.com/analytics',

    global:                        '../eu/global',
    heritage_in_motion:            '../eu/heritage_in_motion',
    jqDropdown:                    '../bower_components/jquery-dropdown/jquery.dropdown',
    jquery:                        '../bower_components/jquery/dist/jquery',
    jqScrollto:                    '../bower_components/jquery.scrollTo/jquery.scrollTo',

    menus:                         '../../patternlab/global/menus',
    mootools:                      '../lib/iipmooviewer/js/mootools-core-1.5.1-full-nocompat-yc',

    util_foldable:                 '../eu/util/foldable-list',
    util_resize:                   '../eu/util/resize',
    util_scrollEvents:             '../eu/util/scrollEvents',

    settings:                      '../eu/settings',

    smartmenus:                    '../lib/smartmenus/jquery.smartmenus',
    smartmenus_keyboard:           '../lib/smartmenus/keyboard/jquery.smartmenus.keyboard',

    sticky:                         '../bower_components/sticky/jquery.sticky',

    touch_move:                     '../lib/jquery.event.move',
    touch_swipe:                    '../lib/jquery.event.swipe',
    xeditable:                     '../bower_components/x-editable/dist/jquery-editable/js/jquery-editable-poshytip',
  },
  shim: {
    blacklight:     ['jquery'],
    featureDetect:  ['jquery'],
    jqDropdown:     ['jquery'],
    menus:          ['jquery'],
    placeholder:    ['jquery'],
    smartmenus:     ['jquery'],
    sticky:         ['jquery'],
    xeditable:      ['jquery'],
    ga: {
      exports: "__ga__"
    }
  }
});


require(['jquery', 'global', 'smartmenus', 'heritage_in_motion'], function() {

    require(["ga"], function(ga) {
        ga("send", "pageview");
    });

});
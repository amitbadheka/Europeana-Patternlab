if("undefined"==typeof dom)var dom={};!function(){"use strict";dom.loadScript=function(){return this.loaded={},this.loading={},this},dom.loadScript.prototype.add=function(b){var c=this;"string"==typeof b&&(b={url:b});var d=b.urls;"undefined"==typeof d&&(d=[{url:b.url,verify:b.verify}]);var e=document.getElementsByTagName("head")[0],f=function(b,d){c.loaded[b.url]||d&&a(d)===!1||(c.loaded[b.url]=!0,c.loading[b.url]&&c.loading[b.url](),delete c.loading[b.url],b.onsuccess&&b.onsuccess(),"undefined"!=typeof m&&m())},g=!1,h=[],i=function(a){if("string"==typeof a&&(a={url:a,verify:b.verify}),/([\w\d.\[\]\'\"])$/.test(a.verify)){var d=a.test=a.verify;if("object"==typeof d)for(var i=0;i<d.length;i++)h.push(d[i]);else h.push(d)}if(!c.loaded[a.url]){var k=document.createElement("script");k.onreadystatechange=function(){("loaded"===this.readyState||"complete"===this.readyState)&&f(a)},k.onload=function(){f(a)},k.onerror=function(){if(g=!0,delete c.loading[a.url],"object"==typeof a.test)for(var b in a.test)j(a.test[b]);else j(a.test)},k.setAttribute("type","text/javascript"),k.setAttribute("src",a.url),e.appendChild(k),c.loading[a.url]=function(){}}},j=function(a){for(var b=[],c=0;c<h.length;c++)h[c]!==a&&b.push(h[c]);h=b},k=function(c){if(c)f(c,c.test);else for(var e=0;e<d.length;e++)f(d[e],d[e].test);for(var i=!0,e=0;e<h.length;e++)a(h[e])===!1&&(i=!1);!b.strictOrder&&i?g?b.error&&b.error():b.onsuccess&&b.onsuccess():setTimeout(function(){k(c)},10)};if(b.strictOrder){var l=-1,m=function(){if(l++,d[l]){var a=d[l],e=a.url;c.loading[e]?c.loading[e]=function(){a.onsuccess&&a.onsuccess(),m()}:c.loaded[e]?m():(i(a),k(a))}else g?b.error&&b.error():b.onsuccess&&b.onsuccess()};m()}else for(var l=0;l<d.length;l++)i(d[l]),k(d[l])},dom.loadScript=new dom.loadScript;var a=function(a,b){try{a=a.split('"').join("").split("'").join("").split("]").join("").split("[").join(".");for(var c=a.split("."),d=c.length,e=b||window,f=0;d>f;f++){var g=c[f];if(null==e[g])return!1;e=e[g]}return!0}catch(h){return!1}}}(),"undefined"!=typeof module&&module.exports&&(module.exports=dom.loadScript);
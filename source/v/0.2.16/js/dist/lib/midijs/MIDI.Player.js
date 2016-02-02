if("undefined"==typeof MIDI)var MIDI={};"undefined"==typeof MIDI.Player&&(MIDI.Player={}),function(){"use strict";var a=MIDI.Player;a.callback=void 0,a.currentTime=0,a.endTime=0,a.restart=0,a.playing=!1,a.timeWarp=1,a.start=a.resume=function(){a.currentTime<-1&&(a.currentTime=-1),k(a.currentTime)},a.pause=function(){var b=a.restart;l(),a.restart=b},a.stop=function(){l(),a.restart=0,a.currentTime=0},a.addListener=function(a){g=a},a.removeListener=function(){g=void 0},a.clearAnimation=function(){a.interval&&window.clearInterval(a.interval)},a.setAnimation=function(b){var c="function"==typeof b?b:b.callback,d=b.delay||100,e=0,g=0,h=0;a.clearAnimation(),a.interval=window.setInterval(function(){if(0!==a.endTime){a.playing?(e=h==a.currentTime?g-(new Date).getTime():0,e=0===a.currentTime?0:a.currentTime-e,h!=a.currentTime&&(g=(new Date).getTime(),h=a.currentTime)):e=a.currentTime;var b=a.endTime,d=e/1e3,i=d/60,j=d-60*i,k=60*i+j,l=b/1e3;-1>l-k||c({now:k,end:l,events:f})}},d)};var b=function(){a.replayer=new Replayer(MidiFile(a.currentData),a.timeWarp),a.data=a.replayer.getData(),a.endTime=j()};a.loadFile=function(c,d,e,f){if(a.stop(),-1!==c.indexOf("base64,")){var g=window.atob(c.split(",")[1]);a.currentData=g,a.loadMidiFile(d,e,f)}else{var h=new XMLHttpRequest;h.open("GET",c),h.overrideMimeType("text/plain; charset=x-user-defined"),h.onreadystatechange=function(){if(4===this.readyState)if(200===this.status){for(var c=this.responseText||"",g=[],h=c.length,i=String.fromCharCode,j=0;h>j;j++)g[j]=i(255&c.charCodeAt(j));var k=g.join("");a.currentData=k,b(d,e,f)}else f&&f("Unable to load MIDI file")},h.send()}};var c,d=[],e=0,f={},g=void 0,h=function(b,d,e,h,i,j){var l=window.setInterval(function(){window.clearInterval(l);var h={channel:b,note:d,now:e,end:a.endTime,message:i,velocity:j};128===i?delete f[d]:f[d]=h,g&&g(h),a.currentTime=e,a.currentTime===c&&c<a.endTime&&k(c,!0)},e-h);return l},i=function(){return"WebAudioAPI"===MIDI.lang?MIDI.Player.ctx:(a.ctx||(a.ctx={currentTime:0}),a.ctx)},j=function(){for(var b=a.data,c=b.length,d=.5,e=0;c>e;e++)d+=b[e][1];return d},k=function(b,f){if(a.replayer){f||("undefined"==typeof b&&(b=a.restart),a.playing&&l(),a.playing=!0,a.data=a.replayer.getData(),a.endTime=j());var g,k=0,m=0,n=a.data,o=i(),p=n.length;c=.5,e=o.currentTime;for(var q=0;p>q&&100>m;q++)if(c+=n[q][1],b>=c)k=c;else{b=c-k;var r=n[q][0].event;if("channel"===r.type){var s=r.channel;switch(r.subtype){case"noteOn":if(MIDI.channels[s].mute)break;g=r.noteNumber-(a.MIDIOffset||0),d.push({event:r,source:MIDI.noteOn(s,r.noteNumber,r.velocity,b/1e3+o.currentTime),interval:h(s,g,c,k,144,r.velocity)}),m++;break;case"noteOff":if(MIDI.channels[s].mute)break;g=r.noteNumber-(a.MIDIOffset||0),d.push({event:r,source:MIDI.noteOff(s,r.noteNumber,b/1e3+o.currentTime),interval:h(s,g,c,k-10,128)})}}}}},l=function(){var b=i();for(a.playing=!1,a.restart+=1e3*(b.currentTime-e);d.length;){var c=d.pop();if(window.clearInterval(c.interval),c.source)if("number"==typeof c.source)window.clearTimeout(c.source);else{var h=c.source;h.disconnect(0),"undefined"!=typeof h.noteOff&&h.noteOff(0)}}for(var j in f){var c=f[j];144===f[j].message&&g&&g({channel:c.channel,note:c.note,now:c.now,end:c.end,message:128,velocity:c.velocity})}f={}}}();
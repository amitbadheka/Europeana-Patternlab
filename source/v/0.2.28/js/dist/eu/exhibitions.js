define(["jquery"],function(a){function b(a){console.log("Virtual-Exhibitions: "+a)}function c(){h(),g(),e(),f()}function d(c){require(["purl"],function(){if(a.url().param("sfx")){var d=a(".ve-slide.first");return new c.Scene({triggerElement:d,triggerHook:"onLeave",duration:"1000"}).setPin(d[0]).setTween(TweenMax.to(d.find(".ve-base-intro .ve-title-group"),1,{opacity:0,ease:Cubic.easeOut})).addTo(i),new c.Scene({triggerElement:d,triggerHook:"onLeave",duration:"1000"}).setTween(TweenMax.to(d.find(".ve-base-intro .ve-description"),1,{opacity:0,ease:Cubic.easeOut})).addTo(i),navigator.userAgent.toLowerCase().indexOf("chrome")>-1?void b("chrome sucks"):void new c.Scene({triggerElement:d,triggerHook:"onLeave",duration:"1000"}).setTween(TweenMax.to(d.find(".ve-base-intro"),1,{backgroundSize:"50% auto",ease:Cubic.easeOut})).addTo(i)}})}function e(){a(".slide-nav-next").not(":first").hide(),a(".slide-nav-next:first").css("position","fixed"),a(".slide-nav-next:first").on("click",function(b){if(i){var c=a(".ve-progress-nav .ve-state-button-on").parent(),d=c.next("a"),e=d.attr("href");a(window).scrollTo(e,1400),b.preventDefault()}})}function f(){var b=[],c=a(".ve-foyer-card-state .text-box.description:not(.js-ellipsis)"),d=[];c.each(function(){a(this).addClass("js-ellipsis"),d.push(a(this))}),d.length>0&&require(["util_ellipsis"],function(c){for(var e=c.create(a(d)),f=0;f<e.length;f++)b.push(e[f])})}function g(){function b(a){var b=this;b.stateIndex=0,b.cardStates=a.find(".ve-foyer-card-state"),b.$el=a,a.find(".ve-card-nav-left").on("click",function(){b.left()}),a.find(".ve-card-nav-right").on("click",function(){b.right()}),this.prepNextShift()}b.prototype.updateButton=function(a){this.$el.find(".ve-state-button-on").removeClass("ve-state-button-on").addClass("ve-state-button-off"),this.$el.find(".ve-state-"+a).removeClass("ve-state-button-off").addClass("ve-state-button-on")},b.prototype.prepNextShift=function(b){var c=this.stateIndex==this.states.length-1?0:this.stateIndex+1,d=0==this.stateIndex?this.states.length-1:this.stateIndex-1;c=a(this.cardStates.get(c)),d=a(this.cardStates.get(d)),c.hasClass("hide-left")&&(c.removeClass("animating"),c.removeClass("hide-left"),c.addClass("hide-right")),d.hasClass("hide-right")&&(d.removeClass("animating"),d.removeClass("hide-right"),d.addClass("hide-left"))},b.prototype.shiftState=function(b){var c=a(this.cardStates.get(this.stateIndex));c.addClass("animating"),c.addClass(b>0?"hide-left":"hide-right");var d=this.stateIndex+b;d==this.states.length?d=0:0>d&&(d=this.states.length-1),this.stateIndex=d;var e=a(this.cardStates.get(this.stateIndex));e.removeClass("animating"),b>0?(e.addClass("hide-right"),e.removeClass("hide-left"),e.addClass("animating"),e.removeClass("hide-right")):(e.addClass("hide-left"),e.removeClass("hide-right"),e.addClass("animating"),e.removeClass("hide-left")),this.prepNextShift(),this.updateButton(this.stateIndex)},b.prototype.left=function(){this.shiftState(-1)},b.prototype.right=function(){this.shiftState(1)},b.prototype.states=["title","description","credits"],a(".ve-foyer-card").each(function(){new b(a(this))})}function h(){a(window).width()>j?require(["ScrollMagic","TweenMax","util_resize","jqScrollto"],function(b){require(["gsap"],function(){function c(b){a(".ve-progress-nav .ve-state-button-on").removeClass("ve-state-button-on").addClass("ve-state-button-off");var c=a(".ve-progress-nav .ve-state-button").get(b);a(c).addClass("ve-state-button-on").removeClass("ve-state-button-off")}i=new b.Controller,a(".ve-slide-container section").each(function(a,d){new b.Scene({triggerElement:this,triggerHook:"onCenter"}).on("progress",function(b){"FORWARD"===b.scrollDirection&&c(a)}).addTo(i),new b.Scene({triggerElement:this,triggerHook:"onLeave"}).on("progress",function(b){"REVERSE"===b.scrollDirection&&c(a)}).addTo(i)}),new b.Scene({triggerElement:"#ve-end",triggerHook:"onEnter"}).addTo(i).setTween(TweenMax.to(".ve-progress-nav",1,{right:"-1em",ease:Cubic.easeOut})),a(".ve-progress-nav a").on("click",function(){a(window).scrollTo(a(this).attr("href"),1400)}),d(b)})}):b("too small for scroll-magic")}var i,j=768;return{initPage:function(){c()}}});
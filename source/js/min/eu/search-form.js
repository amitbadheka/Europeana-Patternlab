define(["jquery"],function(a){function b(){var b=a(".search-multiterm"),c=b.find(".js-search-input");a(document).width()>640&&c.width(function(){var b=a(".js-search-tags").width(),c=a(".js-hitarea").width(),d=10;return c-(b+d)}),b.on("click",".js-hitarea",function(a){c.focus()}),b.on("submit",function(a){return"qf[]"==c.attr("name")&&0==c.val().length?!1:void 0})}b()});
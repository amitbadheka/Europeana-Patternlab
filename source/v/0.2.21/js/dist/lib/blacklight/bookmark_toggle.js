!function(a){Blacklight.do_bookmark_toggle_behavior=function(){a(Blacklight.do_bookmark_toggle_behavior.selector).bl_checkbox_submit({css_class:"toggle_bookmark",success:function(b,c){c.bookmarks&&a("[data-role=bookmark-counter]").text(c.bookmarks.count)}})},Blacklight.do_bookmark_toggle_behavior.selector="form.bookmark_toggle",Blacklight.onLoad(function(){Blacklight.do_bookmark_toggle_behavior()})}(jQuery);
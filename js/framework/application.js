
//= require "../widgets/dialogs/growl"



Ergo.declare('Ergo.framework.Application', 'Ergo.core.Object', {
	
	initialize: function(o) {
		Ergo.framework.Application.superclass.initialize.apply(this, arguments);		
		
		var self = this;
		
//		$(window).ready(function() {
			
			// Растягиваем страницу на всю высоту окна	
		var h = $(window).height();
		var dh = $('body').outerHeight(true) - $('body').height();
		$('body').height(h - dh);
		$('body').attr('autoheight', true);	
		

		$(document).ajaxError(function(e, xhr, ajaxOpts, err) {
			if(Ergo.DEBUG)
				growl.error('<div>'+err.message+' (line: '+err.lineNumber+')</div>'+xhr.responseText, true);
			else
				growl.error(xhr.responseText, true);
		});
		
		
		this.root = $.ergo(Ergo.smart_override({
			etype: 'box',
			renderTo: 'body',
			cls: 'application'
		}, o));
		
		
		$(window).resize(function(){
			
			var dh = $('body').outerHeight(true) - $('body').height();
			$('body').hide();
			var h = $(window).height();			
			$('body').height(h - dh);
			$('body').show();
			
			self.root.$layoutChanged();
		});	
		
		this.init_default_growl();	 //<-- инициализируем growl	
			
//		});
		
	},
	
	
	init_default_growl: function() {
		
		this.growl = $.ergo({
			etype: 'growl-box',
			renderTo: 'body'
		});
	
		var self = this;
	
		growl = {
				info: function(m, isHtml) {this.msg(m, 'info', isHtml);},
				error: function(m, isHtml) {this.msg(m, 'critical', isHtml);},
				warn: function(m, isHtml) {this.msg(m, 'warning', isHtml);},
				success: function(m, isHtml) {this.msg(m, 'success', isHtml);},
//				html: function(m, isHtml) { Ergo.growl.addItem({html: m, icon: 'ergo-icon-growlbox-info'}) },
				msg: function(m, type, isHtml) {
					var s = ($.isString(m)) ? m : Ergo.pretty_print(m);
					var o = {
						icon: 'ergo-icon-growlbox-'+type,
						state: type,
						cls: 'ergo-dropdown-shadow'					
					};
					(isHtml) ? o.htmlMessage = s : o.message = s;
					self.growl.items.add(o);
				}
			}
		
		
	}
		
});

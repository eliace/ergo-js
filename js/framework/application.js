
//= require "../widgets/dialogs/growl"



Dino.declare('Dino.framework.Application', 'Dino.core.Object', {
	
	initialize: function(o) {
		Dino.framework.Application.superclass.initialize.apply(this, arguments);		
		
		var self = this;
		
//		$(window).ready(function() {
			
			// Растягиваем страницу на всю высоту окна	
		var h = $(window).height();
		var dh = $('body').outerHeight(true) - $('body').height();
		$('body').height(h - dh);
		$('body').attr('autoheight', true);	
		

		$(document).ajaxError(function(e, xhr, ajaxOpts, err) {
			growl.error('<div>'+err.message+' (line: '+err.lineNumber+')</div>'+xhr.responseText, true);
		});
		
		
		this.root = $.dino(Dino.smart_override({
			dtype: 'box',
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
		
		this.growl = $.dino({
			dtype: 'growl-box',
			renderTo: 'body'
		});
	
		var self = this;
	
		growl = {
				info: function(m, isHtml) {this.msg(m, 'info', isHtml);},
				error: function(m, isHtml) {this.msg(m, 'critical', isHtml);},
				warn: function(m, isHtml) {this.msg(m, 'warning', isHtml);},
//				html: function(m, isHtml) { Dino.growl.addItem({html: m, icon: 'dino-icon-growlbox-info'}) },
				msg: function(m, type, isHtml) {
					var s = (Dino.isString(m)) ? m : Dino.pretty_print(m);
					var o = {
						icon: 'dino-icon-growlbox-'+type,
						state: type,
						cls: 'dino-dropdown-shadow'					
					};
					(isHtml) ? o.htmlMessage = s : o.message = s;
					self.growl.items.add(o);
				}
			}
		
		
	}
		
});

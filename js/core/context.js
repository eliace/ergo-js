
/**
 * Контекст
 *
 * @class
 * @name Ergo.core.Context
 * @extends Ergo.core.Object
 * 
 */
Ergo.defineClass('Ergo.core.Context', 'Ergo.core.Object', /** @lends Ergo.core.Context.prototype */{
	
	defaults: {
		plugins: [Ergo.Observable, Ergo.Statable]		
	},
	
	
	
	
	open_glass_pane: function() {
		var gp = $('<div class="glass-pane" autoheight="ignore"/>')
			.on('mousedown', function(e){
				e.preventDefault();
				return false;				
			});		
			
		$('body').append(gp);	
			
		return gp;
	},
	
	
	close_glass_pane: function() {
		$('.glass-pane').remove();
	}
	
	
});




Ergo.context = new Ergo.core.Context();

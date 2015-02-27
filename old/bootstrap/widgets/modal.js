


Ergo.defineClass('Bootstrap.widgets.Modal', 'Ergo.core.Widget', {
	
	defaults: {
		html: '<div/>',
		cls: 'modal',
		state: 'fade',
		components: {
			content: {
				etype: 'bootstrap:modal-dialog'
			}
		},
		events: {
			'jquery:click': function(e, w) {
				w.close();
			}
		},
		onCloseDialog: function() {
			this.close();
		}
	},
	
	
	open: function() {
		
		var self = this;
		
		if(!this.el.parent().length)
			$('body').append(this.el);
		
		

		$('body').addClass('modal-open');
		$('body').css('padding-right', 17);


		self._backdrop_el = $('<div class="modal-backdrop fade"/>');
		$('body').append(self._backdrop_el);

		self.el.show();					

		self.el[0].offsetWidth;
		
		setTimeout(function(){
			self._backdrop_el[0].offsetWidth;
			self._backdrop_el.addClass('in');		
			setTimeout(function(){
				self.el.addClass('in');
			}, 150);
		}, 300);
		
	},
	
	
	close: function() {
		
		var self = this;


		$('body').removeClass('modal-open');
		$('body').css('padding-right', '');


		self.el[0].offsetWidth;
		self._backdrop_el[0].offsetWidth;


		self.el.removeClass('in');

		setTimeout(function(){

			self.el.hide();
	
			self._backdrop_el.removeClass('in');
			
			setTimeout(function(){
				self._backdrop_el.remove();
			}, 300);
			
		}, 150);

		
	}
	
	
}, 'bootstrap:modal');



Ergo.defineClass('Bootstrap.widgets.ModalDialog', 'Ergo.widgets.Box', {
	
	defaults: {
		html: '<div/>',
		cls: 'modal-dialog',
		layout: {
			etype: 'layout:default',
			html: '<div class="modal-content"/>'
		},
		states: {
			'large:size': 'modal-lg',
			'small:size': 'modal-sm'
		},
		components: {
			header: {
				cls: 'modal-header',
				components: {
					close: {
						etype: 'html:button',
						state: 'close',
						components: {
							content: {
								etype: 'html:span',
								innerHtml: '&times;'
							}							
						},
						onClick: function() {
							this.events.raise('closeDialog');
						}
					},
					title: {
						etype: 'html:h4',
						cls: 'modal-title'
					}
				}
			},
			content: {
				cls: 'modal-body'
			},
			footer: {
				cls: 'modal-footer'
			}
		}
	},
	
	
	setTitle: function(v) {
		this.header.title.opt('text', v);
	}
	
	
}, 'bootstrap:modal-dialog');

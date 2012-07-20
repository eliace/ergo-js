
var data = new Ergo.data.AjaxCollection();


sample('Дерево, связанное с данными через AJAX', {
	
	etype: 'tree',
	cls: 'e-tree',
	
	data: data,
	
	dynamic: true,
	
	node: {
		
		binding: function(v) {
			this.states.toggle('leaf', !v.children);			
		},
		
		transitions: {
			'> expanded': function() {
				
				if(this.data._fetched) {
					
					this.subtree.show();
					
				}
				else {

					this.content.opt('xicon', 'e-icon-ajax-loader');
					
					var self = this;
					
					var v = this.getValue();
					
					$.getJSON('samples/ajax/tree/'+v.id+'.json', function(json) {
						// Эмулируем долгий запрос
						setTimeout(function() {
							// Добавляем данные поддерева
							self.data.set('children', json);
							self.data._fetched = true;
							// Открываем поддерево
							self.subtree.show().then(function(){
								self.content.opt('xicon', false);							
							});						
						}, 1000);
					});
					
				}
				
			}, //this.subtree.show(); },
//			'expanded >': function() { } //this.subtree.hide(); }
		},
		
		components: {
			icon: {
				style: {'display': 'inline-block'}
			},
			content: {
				etype: 'text-item',
				icon: 'e-icon-house',
				style: {'display': 'inline-block'},
				binding: function(v) {
					this.opt('text', v.title);
					this.opt('icon', 'e-icon-'+v.type);
				}
			},
			subtree: {
				hidden: true,
				dataId: 'children',
				dynamic: true,
				mixins: ['effects'],
				effects: {
					show: 'slideDown',
					hide: 'slideUp',
					delay: 400
				}
			}
		}
	}
	
});


data.fetch('samples/ajax/tree/0.json');


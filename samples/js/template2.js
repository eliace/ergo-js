

var Samples = {};



Dino.declare('Samples.widgets.ExpandablePanel', 'Dino.Widget', {
	
	_html: function() { return '<div></div>'; },	
	
	defaultOptions: {
		components: {
			button: {
				weight: 1,
				dtype: 'text-item',
				baseCls: 'js-button',
				leftIconCls: 'ui-icon ui-icon-triangle-1-e',
				contentCls: 'js-title',
				showLeftIcon: true,
				components: {
					leftIcon: {
						states: {
							'active': ['ui-icon-triangle-1-s', 'ui-icon-triangle-1-e']
						}
					},
					rightIcon: {
						state: 'hidden'
					}
				},
				clickable: true,
				onClick: function() {
					var is_active = this.states.toggle('active');
					this.leftIcon.states.toggle('active', is_active);
					this.parent.container.states.toggle('hidden', !is_active);
				}
			}, 
			container: {
				weight: 2,
				dtype: 'box',
				baseCls: 'js-container',
				cls: 'dino-hidden'
			}
		}
	},
	
	
	_opt: function(o) {
		Samples.widgets.ExpandablePanel.superclass._opt.apply(this, arguments);
		
		if('buttonLabel' in o)
			this.button.content.opt('text', o.buttonLabel);
		if('contentText' in o)
			this.container.opt('innerHtml', o.contentText);
	}
	
	
	
	
}, 'expandable-panel');






Samples.constructors = {};

function sample(name, callback) {
	
	Samples.constructors[name] = callback;
	
}







/**
 *
 * name
 * description
 * code
 * css
 * 
 */
function samplePage(samples) {
	
	init_default_growl_panel({hideOnTimeout: true});	
	
	$(document).ajaxError(function(e, xhr, ajaxOpts, err) {
		message.err(xhr.responseText);
	});
	
	
	var pages = [];
	
	for(var i = 0; i < samples.length; i++){
		
		var sample = samples[i];
		
		var id = '#' + sample.id;
		sample.description = sample.description || id + ' .desc';
//		sample.html = sample.html || .id + ' .html';
		sample.code = sample.code || id + ' script';
		sample.css = sample.css || id + ' style';
		
		// Макет страницы виджета
		var page = $.dino({
			dtype: 'box',
			tab: {content: {text: sample.name} },
			items: [{
				tag: 'preview',
				cls: 'preview'
			}, {
				tag: 'description',
				innerHtml: $(sample.description)
			}, {
				tag: 'js',
				dtype: 'expandable-panel',
				buttonLabel: 'JavaScript',
				contentText: '<pre class="sh_javascript">'+Dino.escapeHtml($(sample.code).text())+'</pre>'
				
			}, {
				tag: 'css',
				dtype: 'expandable-panel',
				buttonLabel: 'CSS',
				contentText: '<pre class="sh_css">'+$(sample.css).text()+'</pre>'
			}/*, {
				tag: 'html',
				dtype: 'expandable-panel',
				buttonLabel: 'HTML',
				contentText: '<pre class="sh_html">'+Dino.escapeHtml($(sample.html).html())+'</pre>'
			}*/, {
				tag: 'options'
			}]
		});
		
		// создаем виджет и выполняем сопутсвующий код
//		Samples.PREVIEW = page.getItem('preview');
		
		var w = Samples.constructors[sample.id].call(this);
//		var w = eval($(sample.code).text());
		
		if(w) {
			
			page.getItem('preview').addItem(w);
			
			
/*			
			var html = w.el.parent().html();
			var regexp = /<[^<>]+>/;
			var indent = 0;
			var s = '';
			var last_index = 0;
			for(var m = regexp.exec(html); m; m = regexp.exec(html)){
				
				if(m[0][1] != '/') indent++;
				
				var spaces = '\n';
								
				for(var j = 0; j < indent; j++) spaces += '  ';
				
				if(m.index - last_index > 1) s += spaces + '  ' + html.substr(0, m.index - last_index);				
				
				s += (spaces + m[0]);

				if(m[0][1] == '/') indent--;
				last_index = m.index;
				
				html = html.substr(m.index+m[0].length);
				
			}
			
			page.getItem('html').opt('contentText', '<pre class="sh_html">'+Dino.escapeHtml(s)+'<pre>')
*/			
		}
		
		
		
		pages.push( page );
	}
	
	
	$.dino({
		dtype: 'box',
		renderTo: 'body',
		items: [{
			id: 'dino-sample-page',
			dtype: 'tab-panel',
			tabPosition: 'left',
			components: {
				tabs: {
					cls: 'widget-tabs',
					height: 'ignore'
				},
				pages: {
					cls: 'widget-pages'
				}
			},
			'pages': pages
		}]
	});
	
//	$('#aaa').dino().tabs.activateTab(0);

	// включаем подсветку кода
	sh_highlightDocument();


	
}



Samples.loremipsum = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';



$(document).ready(function(){
	
	var samples = [];
	for(var i in Samples.constructors){
		samples.push({
			id: i,
			name: i
		});
	}
	
	samplePage(samples);
	
});


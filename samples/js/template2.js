

var Samples = {};



Dino.declare('Samples.widgets.ExpandablePanel', 'Dino.Widget', {
	
	defaultOptions: {
		components: {
			button: {
				weight: 1,
				dtype: 'text-item',
				baseCls: 'js-button',
				leftCls: 'ui-icon ui-icon-triangle-1-e',
				contentCls: 'js-title',
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
			this.container.opt('text', o.contentText);
	}
	
	
	
	
}, 'expandable-panel');




/**
 *
 * name
 * description
 * code
 * css
 * 
 */
function samplePage(samples) {
	
	var pages = [];
	
	for(var i = 0; i < samples.length; i++){
		
		var sample = samples[i];
		
		var id = sample.id;
		sample.description = sample.description || sample.id + ' .desc';
		sample.html = sample.html || sample.id + ' .html';
		sample.code = sample.code || sample.id + ' script';
		sample.css = sample.css || sample.id + ' style';
		
		// Макет страницы виджета
		var page = $.dino({
			dtype: 'box',
			tab: {text: sample.name},
			items: [{
				tag: 'preview',
				cls: 'preview'
			}, {
				tag: 'description',
				html: $(sample.description)
			}, {
				tag: 'js',
				dtype: 'expandable-panel',
				buttonLabel: 'JavaScript',
				contentText: '<pre class="sh_javascript">'+Dino.escapeHtml($(sample.code).text())+'<pre>'
				
			}, {
				tag: 'css',
				dtype: 'expandable-panel',
				buttonLabel: 'CSS',
				contentText: '<pre class="sh_css">'+$(sample.css).text()+'<pre>'
			}, {
				tag: 'html',
				dtype: 'expandable-panel',
				buttonLabel: 'HTML',
				contentText: '<pre class="sh_html">'+Dino.escapeHtml($(sample.html).html())+'<pre>'
			}, {
				tag: 'options'
			}]
		});
		
		// создаем виджет и выполняем сопутсвующий код
//		Samples.PREVIEW = page.getItem('preview');
		var w = eval($(sample.code).text());
		
		if(w) page.getItem('preview').addItem(w);
		
//		page.getItem('html').opt('contentText', '<pre class="sh_html">'+Dino.escapeHtml(Samples.PREVIEW.el.html())+'<pre>')
		
		pages.push( page );
	}
	
	
	$.dino({
		dtype: 'box',
		renderTo: 'body',
		items: [{
			id: 'dino-sample-page',
			dtype: 'tab-panel',
			components: {
				tabs: {
					cls: 'widget-tabs'
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

	
	// добавляем гроул
	Samples.growl = $.fn.dino({
		dtype: 'growl-box',
		cls: 'message-panel',
		defaultItem: {
			delay: 600,
			timeout: 4000,
			cls: 'dino-border-all dino-corner-all',
			closeOnClick: true,
			components: {
				button: {
					cls: 'dino-hidden'
				}
			}
		},
//		cls: 'ui-state-hover dino-hidden',
		renderTo: 'body'
	});
	
}



Samples.loremipsum = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

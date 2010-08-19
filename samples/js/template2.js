

var Samples = {};



Dino.declare('Samples.widgets.ExpandablePanel', 'Dino.Widget', {
	
	defaultOptions: {
		components: {
			button: {
				dtype: 'box',
				layout: 'dock-layout',
				baseCls: 'js-button',
				items: [{
					states: {
						'active': 'ui-icon-triangle-1-s',
						'inactive': 'ui-icon-triangle-1-e'
					},
					dock: 'left-center',
					cls: 'ui-icon ui-icon-triangle-1-e js-icon'
				}, {
					cls: 'js-title'
				}],
				clickable: true,
				onClick: function(e){
					var is_active = this.states.toggle('active');
					this.getItem(0).states.toggle('active', is_active)
					this.getItem(0).states.toggle('inactive', !is_active);
					this.parent.container.states.toggle('hidden', !is_active);
				}
			}, 
			container: {
				dtype: 'box',
				baseCls: 'js-container',
				cls: 'dino-hidden',
			}
		}
	},
	
	
	_opt: function(o) {
		Samples.widgets.ExpandablePanel.superclass._opt.apply(this, arguments);
		
		if('buttonLabel' in o)
			this.button.getItem(1).opt('text', o.buttonLabel);
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
			id: 'aaa',
			dtype: 'tab-panel',
			components: {
				tabs: {
					cls: 'widget-tabs'
				},
				pages: {
					cls: 'widget-pages'
				},
			},
			'pages': pages
		}]
	});
	
//	$('#aaa').dino().tabs.activateTab(0);

	// включаем подсветку кода
	sh_highlightDocument();

	
	// добавляем гроул
	Samples.growl = $.fn.dino({
		dtype: 'growl',
		cls: 'ui-state-hover',
		renderTo: 'body',
		delay: 600,
		timeout: 1500
	});
	
}



Samples.loremipsum = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

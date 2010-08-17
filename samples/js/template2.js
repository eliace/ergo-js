

var Samples = {};


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
				items: [{
//					cls: 'js-button-wrapper',
//					content: {
						layout: 'dock-layout',
						baseCls: 'js-button',
						items: [{
							dock: 'left-center',
							cls: 'ui-icon ui-icon-triangle-1-e js-icon'
						}, {
							cls: 'js-title',
							text: 'JavaScript'
						}],
						events: {
							'click': function() {
								var w = $(this).dino();
								w.states.toggle('active');
								var is_active = w.states.is('active');
								w.getParent('js').getItem(1).el.toggleClass('dino-hidden', !is_active);
								w.getItem(0).el.toggleClass('ui-icon-triangle-1-e', !is_active);
								w.getItem(0).el.toggleClass('ui-icon-triangle-1-s', is_active);
							}
						}
//					}
				}, {
					baseCls: 'js-container',
					cls: 'dino-hidden',
					text: '<pre class="sh_javascript">'+Dino.escapeHtml($(sample.code).text())+'<pre>'
				}]
			}, {
				tag: 'css',
				items: [{
//					cls: 'js-button-wrapper',
//					content: {
						layout: 'dock-layout',
						baseCls: 'js-button',
						items: [{
							dock: 'left-center',
							cls: 'ui-icon ui-icon-triangle-1-e js-icon'
						}, {
							cls: 'js-title',
							text: 'CSS'
						}],
						events: {
							'click': function() {
								var w = $(this).dino();
								w.states.toggle('active');
								var is_active = w.states.is('active');
								w.getParent('css').getItem(1).el.toggleClass('dino-hidden', !is_active);
								w.getItem(0).el.toggleClass('ui-icon-triangle-1-e', !is_active);
								w.getItem(0).el.toggleClass('ui-icon-triangle-1-s', is_active);
							}
						}
//					}
				}, {
					baseCls: 'js-container',
					cls: 'dino-hidden',
					text: '<pre class="sh_css">'+$(sample.css).text()+'<pre>'
				}]
			}, {
				tag: 'options'
			}]
		});
		
		// создаем виджет и выполняем сопутсвующий код
		Samples.PREVIEW = page.getItem('preview');		
		eval($(sample.code).text());
		
		pages.push( page );
	}
	
	
	$.dino({
		dtype: 'box',
		renderTo: 'body',
		items: [{
			id: 'aaa',
			dtype: 'tab-panel',
			tabContainer: {
				cls: 'widget-tabs'
			},
			pageContainer: {
				cls: 'widget-pages'
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
		cls: 'ui-state-hover',
		renderTo: 'body',
		delay: 600,
		timeout: 1500
	});
	
}



Samples.loremipsum = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

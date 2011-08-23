
//= require <widgets/box>
//= require <extensions/effects>


/**
 * @class
 * @extends Ergo.containers.ListBox
 */
Ergo.widgets.LoadingPane = Ergo.declare('Ergo.widgets.LoadingPane', 'Ergo.widgets.Box', /** @lends Ergo.widgets.LoadingOverlay.prototype */{
	
	defaults: {
		components: {
			overlay: {
				weight: 1,
				etype: 'box',
				cls: 'dino-loading-overlay',
				opacity: .7				
			},
			message: {
				weight: 2,
				etype: 'box',
				opacity: 1,
				cls: 'dino-loading-message',
				content: {
					etype: 'text-item',
					text: 'Загрузка...',
					icon: 'dino-icon-loader'
				}				
			}
		},
		style: {'display': 'none'},
		showOnRender: false,
		extensions: [Ergo.Effects]
	}
	
}, 'loading-pane');

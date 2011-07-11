
//= require <widgets/box>
//= require <extensions/effects>


/**
 * @class
 * @extends Dino.containers.ListBox
 */
Dino.widgets.LoadingPane = Dino.declare('Dino.widgets.LoadingPane', 'Dino.widgets.Box', /** @lends Dino.widgets.LoadingOverlay.prototype */{
	
	defaults: {
		components: {
			overlay: {
				weight: 1,
				dtype: 'box',
				cls: 'dino-loading-overlay',
				opacity: .7				
			},
			message: {
				weight: 2,
				dtype: 'box',
				opacity: 1,
				cls: 'dino-loading-message',
				content: {
					dtype: 'text-item',
					text: 'Загрузка...',
					icon: 'dino-icon-loader'
				}				
			}
		},
		style: {'display': 'none'},
		showOnRender: false,
		extensions: [Dino.Effects]
	}
	
}, 'loading-pane');




$.ergo({
	renderTo: '#sample',
	// окно
	etype: 'sample-panel',
	title: 'Окна и диалоги',
	stackItems: [{
		items: [{
			etype: 'button-item',
			text: 'Открыть окно',
			onClick: function() {
				var wnd = $.ergo({
					etype: 'panel',
					extensions: ['window'],
					closeOnOuterClick: true,
					width: '50%',
//							height: 300,
					title: 'Простое окно',
					content: {
						text: Ergo.LOREMIPSUM
					}
				});
				wnd.window.open();
			}
		}, {
			etype: 'button-item',
			text: 'Открыть диалог',
			onClick: function() {
				
				var dlg = $.ergo({
					etype: 'dialog',
//							width: '50%',
//							height: '50%',
					maxWidth: '30%'
				});
				dlg.open();
				
				
				setTimeout(function(){
					dlg.content.items.add({
						etype: 'box',
						text: Ergo.LOREMIPSUM
					}, 'content', 'component');
					
												
					dlg.window.resize();
					
				}, 1000);
				
			}
		}]
	}]
});




$.ergo({
	renderTo: '#sample',
	// гроулы
	etype: 'sample-panel',
	title: 'Гроулы',
	stackItems: [{
		items: [{
			etype: 'button-item',
			text: 'Success',
			onClick: function() { growl.success('Нажатие кнопки'); }
		}, {
			etype: 'button-item',
			text: 'Warning',
			onClick: function() { growl.warn('Нажатие кнопки'); }
		}]				
	}]
});



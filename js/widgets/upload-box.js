
//= require <widgets/natives/box>

Ergo.declare('Ergo.widgets.UploadBox', 'Ergo.widgets.Box', {
	
	defaults: {
		style: {'position': 'relative', 'display': 'inline-block'},
		events: {
			'mousedown': function(e, w) { w.content.states.set('clicked'); },
			'mouseup': function(e, w) { w.content.states.clear('clicked'); },
			'mouseenter': function(e, w) { w.content.states.set('hovered'); },
			'mouseleave': function(e, w) { w.content.states.clear('hovered'); }
		},
		
		components: {
			content: {	
			},
			_uploader: {
				opacity: 0,
				html: '<form/>',
				style: {'overflow': 'hidden', 'position': 'absolute', 'left': 0, 'top': 0, 'right': 0, 'bottom': 0},
				content: {
					etype: 'file',
					html: '<input name="file" type="file" size="1">',
					style: {'font-size': 300, 'right': 0, 'top': 0, 'position': 'absolute', 'cursor': 'pointer'},
					events: {
						'change': function(e, w) {
							w.events.fire('action', {file: $(this).val(), after: Ergo.bubble}, e);
						}
					}
				}				
			}
		}		
	}
	
}, 'upload-box');

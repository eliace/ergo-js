


Ergo.declare('Ergo.widgets.UploadItem', 'Ergo.widgets.Box', {
	
	defaults: {
		style: {'position': 'relative', 'display': 'inline-block'},
		events: {
			'mousedown': function(e, w) { w.content.states.set('clicked'); },
			'mouseup': function(e, w) { w.content.states.clear('clicked'); }
		},
		
		components: {
			content: {	
			},
			_uploader: {
				opacity: 0,
				style: {'overflow': 'hidden', 'position': 'absolute', 'left': 0, 'top': 0, 'right': 0, 'bottom': 0},
				content: {
					etype: 'file',
					html: '<input type="file" size="1">',
					style: {'font-size': 300, 'right': 0, 'top': 0, 'position': 'absolute', 'cursor': 'pointer'}								
				}				
			}
		}		
	}
	
}, 'upload-item');
